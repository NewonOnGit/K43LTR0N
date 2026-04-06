"""
Signal Collector for Framework Mind Integration

Collects signals from multiple channels and feeds them to FrameworkMind instances.
Each channel has its own mind, plus a composite mind that sees everything.

Channels:
  - BUILD: Stage completion times, glyph counts, validation scores
  - SERVER: Request latencies, API call timestamps, SSE subscriber counts
  - FONT: Glyph metrics, contour counts, point counts, bbox dimensions
  - SYSTEM: Memory pressure, CPU time, I/O operations
  - META: The minds observing themselves (R-coefficient history)

Architecture:
  SignalCollector
    |-- minds: dict[channel_name, FrameworkMind]
    |-- composite_mind: FrameworkMind (all signals interleaved)
    |-- history: dict[channel_name, list[signals]]
    |-- anomalies: list[{channel, timestamp, value, details}]
"""

import time
import threading
from collections import deque
from datetime import datetime
from typing import Optional
import numpy as np

# Import will work when running from acedit directory
try:
    from framework_mind import FrameworkMind, phi, phi_bar, phi_bar2, L, LANDMARKS
except ImportError:
    import sys
    import os
    sys.path.insert(0, os.path.dirname(__file__))
    from framework_mind import FrameworkMind, phi, phi_bar, phi_bar2, L, LANDMARKS


def _to_json_safe(obj):
    """Convert numpy arrays and other non-JSON-safe types to native Python types."""
    if obj is None:
        return None
    if isinstance(obj, np.ndarray):
        return obj.tolist()
    if isinstance(obj, (np.integer, np.floating)):
        return float(obj)
    if isinstance(obj, dict):
        return {k: _to_json_safe(v) for k, v in obj.items()}
    if isinstance(obj, (list, tuple)):
        return [_to_json_safe(item) for item in obj]
    if isinstance(obj, deque):
        return [_to_json_safe(item) for item in obj]
    return obj


class SignalChannel:
    """A single signal channel with its own FrameworkMind."""

    def __init__(self, name: str, window_size: int = 64):
        self.name = name
        self.mind = FrameworkMind(window_size=window_size)
        self.history = deque(maxlen=1000)  # Last 1000 signals
        self.anomalies = deque(maxlen=100)  # Last 100 anomalies
        self.last_value = None
        self.last_result = None
        self.created_at = time.time()
        self.signal_count = 0

    def feed(self, value: float, metadata: Optional[dict] = None) -> dict:
        """Feed a signal value to this channel's mind."""
        timestamp = time.time()
        result = self.mind.step(value)

        # Record in history
        record = {
            'timestamp': timestamp,
            'value': value,
            'result': result,
            'metadata': metadata or {},
        }
        self.history.append(record)
        self.signal_count += 1
        self.last_value = value
        self.last_result = result

        # Track anomalies
        if result['anomaly']:
            self.anomalies.append({
                'timestamp': timestamp,
                'channel': self.name,
                'value': value,
                'r': result['r'],
                'class': result['class'],
                'error': result['error'],
                'metadata': metadata,
            })

        return result

    def get_state(self) -> dict:
        """Get channel state for API."""
        return _to_json_safe({
            'name': self.name,
            'signal_count': self.signal_count,
            'last_value': self.last_value,
            'last_result': self.last_result,
            'mind_state': self.mind.get_state(),
            'anomaly_count': len(self.anomalies),
            'recent_anomalies': list(self.anomalies)[-10:],
            'uptime': time.time() - self.created_at,
        })


class SignalCollector:
    """
    Central signal collector that manages multiple channels
    and a composite mind that sees all signals.
    """

    # Predefined channel names
    CHANNELS = [
        'BUILD',      # Build pipeline signals
        'SERVER',     # Server/API signals
        'FONT',       # Font metric signals
        'SYSTEM',     # System resource signals
        'META',       # Self-observation signals
    ]

    def __init__(self):
        self.channels: dict[str, SignalChannel] = {}
        self.composite_mind = FrameworkMind(window_size=128)
        self.lock = threading.Lock()
        self.created_at = time.time()
        self.total_signals = 0
        self.subscribers = []  # SSE subscribers for mind updates

        # Initialize predefined channels
        for name in self.CHANNELS:
            self.channels[name] = SignalChannel(name)

        # Start meta-observation thread
        self._meta_thread = None
        self._running = False

    def feed(self, channel: str, value: float, metadata: Optional[dict] = None) -> dict:
        """Feed a signal to a specific channel."""
        with self.lock:
            # Create channel if it doesn't exist
            if channel not in self.channels:
                self.channels[channel] = SignalChannel(channel)

            # Feed to channel mind
            result = self.channels[channel].feed(value, metadata)

            # Feed to composite mind (normalized by channel)
            # Use channel index to offset values slightly to preserve channel identity
            channel_idx = list(self.channels.keys()).index(channel)
            composite_value = value + channel_idx * 0.001  # Tiny offset
            self.composite_mind.step(composite_value)

            self.total_signals += 1

            # Notify SSE subscribers
            self._notify_subscribers(channel, value, result)

            return result

    def feed_build_signal(self, signal_type: str, value: float):
        """Convenience method for build pipeline signals."""
        return self.feed('BUILD', value, {'type': signal_type})

    def feed_server_signal(self, signal_type: str, value: float):
        """Convenience method for server signals."""
        return self.feed('SERVER', value, {'type': signal_type})

    def feed_font_signal(self, signal_type: str, value: float):
        """Convenience method for font metric signals."""
        return self.feed('FONT', value, {'type': signal_type})

    def feed_system_signal(self, signal_type: str, value: float):
        """Convenience method for system signals."""
        return self.feed('SYSTEM', value, {'type': signal_type})

    def start_meta_observation(self, interval: float = 1.0):
        """Start the meta-observation thread that feeds R-coefficients back."""
        if self._running:
            return

        self._running = True

        def meta_loop():
            while self._running:
                with self.lock:
                    # Feed each channel's R-coefficient to META channel
                    for name, channel in self.channels.items():
                        if name != 'META' and channel.last_result:
                            r_value = channel.last_result['r']
                            self.channels['META'].feed(r_value, {'source_channel': name})

                time.sleep(interval)

        self._meta_thread = threading.Thread(target=meta_loop, daemon=True)
        self._meta_thread.start()

    def stop_meta_observation(self):
        """Stop the meta-observation thread."""
        self._running = False
        if self._meta_thread:
            self._meta_thread.join(timeout=2.0)

    def subscribe(self, callback):
        """Subscribe to mind updates."""
        self.subscribers.append(callback)
        return len(self.subscribers) - 1

    def unsubscribe(self, idx: int):
        """Unsubscribe from mind updates."""
        if 0 <= idx < len(self.subscribers):
            self.subscribers[idx] = None

    def _notify_subscribers(self, channel: str, value: float, result: dict):
        """Notify all subscribers of a new signal."""
        event = {
            'timestamp': time.time(),
            'channel': channel,
            'value': value,
            'r': result['r'],
            'class': result['class'],
            'anomaly': result['anomaly'],
        }
        for callback in self.subscribers:
            if callback:
                try:
                    callback(event)
                except Exception:
                    pass

    def get_state(self) -> dict:
        """Get full collector state for API."""
        with self.lock:
            channels_state = {
                name: channel.get_state()
                for name, channel in self.channels.items()
            }

            # Compute aggregate classification
            r_values = [
                ch.mind.r for ch in self.channels.values()
                if ch.signal_count > 0
            ]
            avg_r = sum(r_values) / len(r_values) if r_values else 0.0

            # Find nearest landmark for aggregate
            nearest = min(LANDMARKS, key=lambda x: abs(avg_r - x[0]))

            return {
                'uptime': time.time() - self.created_at,
                'total_signals': self.total_signals,
                'channel_count': len(self.channels),
                'channels': channels_state,
                'composite': {
                    'r': float(self.composite_mind.r),
                    'class': self.composite_mind.classify()[0],
                    'pass_count': self.composite_mind.pass_count,
                },
                'aggregate': {
                    'avg_r': float(avg_r),
                    'class': nearest[1],
                    'landmark': float(nearest[0]),
                },
                'meta_running': self._running,
                'subscriber_count': len([s for s in self.subscribers if s]),
                'constants': {
                    'phi': float(phi),
                    'phi_bar': float(phi_bar),
                    'phi_bar2': float(phi_bar2),
                    'L': float(L),
                },
            }

    def get_channel_history(self, channel: str, limit: int = 100) -> list:
        """Get recent history for a channel."""
        if channel not in self.channels:
            return []
        return _to_json_safe(list(self.channels[channel].history)[-limit:])

    def get_all_anomalies(self, limit: int = 50) -> list:
        """Get all recent anomalies across channels."""
        anomalies = []
        for channel in self.channels.values():
            anomalies.extend(channel.anomalies)
        # Sort by timestamp, most recent first
        anomalies.sort(key=lambda x: x['timestamp'], reverse=True)
        return _to_json_safe(anomalies[:limit])

    def reset_channel(self, channel: str):
        """Reset a specific channel's mind."""
        if channel in self.channels:
            self.channels[channel].mind.reset()

    def reset_all(self):
        """Reset all minds."""
        with self.lock:
            for channel in self.channels.values():
                channel.mind.reset()
            self.composite_mind.reset()


# Global singleton
_collector: Optional[SignalCollector] = None


def get_collector() -> SignalCollector:
    """Get or create the global signal collector."""
    global _collector
    if _collector is None:
        _collector = SignalCollector()
        _collector.start_meta_observation()
    return _collector
