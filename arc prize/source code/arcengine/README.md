# ARCEngine

A Python library for 2D sprite-based game development.

## Installation

Add ARCEngine to your project using one of these methods:

### Using uv (Recommended)

Add ARCEngine to your `pyproject.toml`:

```toml
\[project]
dependencies = \[
    "arcengine @ git+ssh://git@github.com/arcprize/ARCEngine.git@main",
]
```

Then install with uv:

```bash
uv sync
```

## API Documentation

### ARCBaseGame

The base class for ARCEngine games that manages levels and camera.

```python
from arcengine import ARCBaseGame, Level, Camera

# Create a game with levels and optional custom camera
game = ARCBaseGame(game\_id="my\_gane", levels=\[level1, level2], camera=camera)  # camera is optional
```

#### Properties

* `current\_level` (Level): The current active level
* `camera` (Camera): The game's camera
* `game\_id` (str): The game's identifier (should be set by subclasses)
* `action` (GameAction): The current action being performed

#### Methods

##### `\_\_init\_\_(levels, camera=None)`

Initialize a new game.

* `levels`: List of levels to initialize the game with. Each level will be cloned.
* `camera`: Optional camera to use. If not provided, a default 64x64 camera will be created.

Raises `ValueError` if levels list is empty.

##### `set\_level(index)`

Set the current level by index.

* `index`: The index of the level to set as current

Raises `IndexError` if index is out of range.

##### `perform\_action(action\_input)`

Perform an action and return the resulting frame data.

This method should not be overridden. Game logic should be implemented in the `step()` method.

* `action\_input`: The action to perform
* Returns: FrameData containing the rendered frames and game state

##### `complete\_action()`

"""Complete the action. Call this when the provided action is fully resolved"""

##### `win()`

"""Call this when the player has beaten the game."""

##### `lose`

"""Complete the action. Call this when the provided action is fully resolved"""

##### `step()`

Step the game. This is where your game logic should be implemented.

REQUIRED: Call `complete\_action()` when the action is complete. It does not need to be called every step, but once the action is complete. The engine will keep calling step and rendering frames until the action is complete.

##### `is\_action\_complete()`

Check if the current action is complete.

* Returns: True if the action is complete, False otherwise

##### `try\_move(sprite\_name, dx, dy)`

Try to move a sprite and return a list of sprites it collides with.

This method attempts to move the sprite by the given deltas and checks for collisions.
If any collisions are detected, the sprite is not moved and the method returns a list
of sprites that were collided with.

* `sprite\_name`: The name of the sprite to move
* `dx`: The change in x position (positive = right, negative = left)
* `dy`: The change in y position (positive = down, negative = up)
* Returns: A list of sprites that the sprite collided with. If no collisions occurred,
the sprite is moved and an empty list is returned
* Raises: ValueError if no sprite with the given name is found

Example:

```python
# Try to move a sprite right by 1 pixel
collisions = game.try\_move("player", 1, 0)
if not collisions:
    print("Move successful!")
else:
    print(f"Collided with: {\[sprite.name for sprite in collisions]}")
```

### Sprite

The `Sprite` class represents a 2D sprite that can be positioned and scaled in the game world.

```python
from arcengine import Sprite, BlockingMode, InteractionMode

# Create a simple 2x2 sprite
sprite = Sprite(\[
    \[1, 2],
    \[3, 4]
])

# Create a sprite with custom properties
sprite = Sprite(
    pixels=\[\[1, 2], \[3, 4]],
    name="player",
    x=10,
    y=20,
    scale=2,
    rotation=90,
    blocking=BlockingMode.BOUNDING\_BOX,
    layer=1,  # Higher values render on top
    interaction=InteractionMode.TANGIBLE
)
```

#### Properties

* `name` (str): The sprite's unique identifier
* `x` (int): X coordinate in pixels
* `y` (int): Y coordinate in pixels
* `scale` (int): Scale factor. Positive values scale up (2 = double size, 3 = triple size). Negative values scale down (-1 = half size, -2 = one-third size, -3 = one-fourth size).
* `rotation` (int): Rotation in degrees (0, 90, 180, or 270)
* `blocking` (BlockingMode): Collision detection method
* `pixels` (numpy.ndarray): The sprite's pixel data
* `layer` (int): Z-order layer for rendering (higher values render on top)
* `interaction` (InteractionMode): How the sprite interacts with the game world
* `is\_visible` (bool): Whether the sprite should be rendered
* `is\_collidable` (bool): Whether the sprite should participate in collisions

#### Methods

##### `\_\_init\_\_(pixels, name=None, x=0, y=0, scale=1, rotation=0, blocking=BlockingMode.NOT\_BLOCKED, layer=0, interaction=InteractionMode.TANGIBLE)`

Initialize a new Sprite.

* `pixels`: 2D list representing the sprite's pixels
* `name`: Optional sprite name (default: generates UUID)
* `x`: X coordinate in pixels (default: 0)
* `y`: Y coordinate in pixels (default: 0)
* `scale`: Scale factor (default: 1)
* `rotation`: Rotation in degrees (default: 0)
* `blocking`: Collision detection method (default: NOT\_BLOCKED)
* `layer`: Z-order layer for rendering (default: 0, higher values render on top)
* `interaction`: How the sprite interacts with the game world (default: TANGIBLE)

Raises `ValueError` if scale is 0, pixels is not a 2D list, rotation is invalid, or if downscaling factor doesn't evenly divide sprite dimensions.

##### `clone(new\_name=None)`

Create an independent copy of this sprite.

* `new\_name`: Optional name for the cloned sprite (default: generates UUID)
* Returns: A new Sprite instance with the same properties but independent state

##### `set\_position(x, y)`

Set the sprite's position.

* `x`: New X coordinate in pixels
* `y`: New Y coordinate in pixels

##### `move(dx, dy)`

Move the sprite by the given deltas.

* `dx`: Change in x position (positive = right, negative = left)
* `dy`: Change in y position (positive = down, negative = up)

##### `set\_scale(scale)`

Set the sprite's scale factor.

* `scale`: The new scale factor:

  * Positive values scale up (2 = double size, 3 = triple size)
  * Negative values scale down (-1 = half size, -2 = one-third size, -3 = one-fourth size)
  * Zero is invalid
* Raises `ValueError` if scale is 0 or if downscaling factor doesn't evenly divide sprite dimensions

For example:

```python
sprite = Sprite(\[\[1, 2], \[3, 4]])

# Upscaling examples
sprite.set\_scale(2)  # Doubles size in both dimensions
sprite.set\_scale(3)  # Triples size in both dimensions

# Downscaling examples
sprite.set\_scale(-1)  # Half size (divide dimensions by 2)
sprite.set\_scale(-2)  # One-third size (divide dimensions by 3)
sprite.set\_scale(-3)  # One-fourth size (divide dimensions by 4)
```

##### `adjust\_scale(delta)`

Adjust the sprite's scale by a delta value, moving one step at a time.

The method will adjust the scale by incrementing or decrementing by 1 repeatedly until reaching the target scale. This ensures smooth transitions and validates each step.

Negative scales indicate downscaling factors:

* scale = -1: half size (divide by 2)
* scale = -2: one-third size (divide by 3)
* scale = -3: one-fourth size (divide by 4)

Examples:

* Current scale 1, delta +2 -> Steps through: 1 -> 2 -> 3
* Current scale 1, delta -2 -> Steps through: 1 -> 0 -> -1 (half size)
* Current scale -2, delta +3 -> Steps through: -2 -> -1 -> 0 -> 1

Raises `ValueError` if any intermediate scale would be 0 or if a downscaling factor doesn't evenly divide sprite dimensions.

##### `set\_rotation(rotation)`

Set the sprite's rotation to a specific value.

* `rotation`: The new rotation in degrees (must be 0, 90, 180, or 270)
* Raises `ValueError` if rotation is not a valid 90-degree increment

##### `rotate(delta)`

Rotate the sprite by a given amount.

* `delta`: The change in rotation in degrees (must result in a valid rotation)
* Raises `ValueError` if resulting rotation is not a valid 90-degree increment

##### `render()`

Render the sprite with current scale and rotation.

* Returns: A 2D numpy array representing the rendered sprite
* Raises `ValueError` if downscaling factor doesn't evenly divide the sprite dimensions

##### `set\_layer(layer)`

Set the sprite's rendering layer.

* `layer`: New layer value. Higher values render on top.

##### `set\_blocking(blocking)`

Set the sprite's blocking behavior.

* `blocking`: The new blocking behavior (BlockingMode enum value)
* Raises `ValueError` if blocking is not a BlockingMode enum value

##### `set\_name(name)`

Set the sprite's name.

* `name`: New name for the sprite
* Raises `ValueError` if name is empty

##### `set\_interaction(interaction)`

Set the sprite's interaction mode.

* `interaction`: The new interaction mode (InteractionMode enum value)
* Raises `ValueError` if interaction is not an InteractionMode enum value

##### `collides\_with(other)`

Check if this sprite collides with another sprite.

The collision check follows these rules:

1. A sprite cannot collide with itself
2. Non-collidable sprites (based on interaction mode) never collide
3. For collidable sprites, the collision detection method is based on their blocking mode:

   * NOT\_BLOCKED: Always returns False
   * BOUNDING\_BOX: Simple rectangular collision check
   * PIXEL\_PERFECT: Precise pixel-level collision detection
* `other`: The other sprite to check collision with
* Returns: True if the sprites collide, False otherwise

### BlockingMode

An enumeration defining different collision detection behaviors for sprites:

* `NOT\_BLOCKED`: No collision detection
* `BOUNDING\_BOX`: Collision detection using the sprite's bounding box
* `PIXEL\_PERFECT`: Collision detection using pixel-perfect testing

### InteractionMode

An enumeration defining how a sprite interacts with the game world:

* `TANGIBLE`: Visible and can be collided with
* `INTANGIBLE`: Visible but cannot be collided with (ghost-like)
* `INVISIBLE`: Not visible but can be collided with (invisible wall)
* `REMOVED`: Not visible and cannot be collided with (effectively removed)

### Camera

A camera that defines the viewport into the game world.

```python
from arcengine import Camera, RenderableUserDisplay

# Create a default camera (64x64 viewport)
camera = Camera()

# Create a custom camera
camera = Camera(
    x=10,                    # X position in pixels
    y=20,                    # Y position in pixels
    width=32,                # Viewport width (max 64)
    height=32,               # Viewport height (max 64)
    background=1,            # Background color index
    letter\_box=2,            # Letter box color index
    interfaces=\[],           # Optional list of renderable interfaces
)
```

#### Properties

* `x` (int): X coordinate in pixels
* `y` (int): Y coordinate in pixels
* `width` (int): Viewport width in pixels (max: 64)
* `height` (int): Viewport height in pixels (max: 64)

#### Methods

##### `\_\_init\_\_(x=0, y=0, width=64, height=64, background=5, letter\_box=5, interfaces=\[])`

Initialize a new Camera.

Args:

* `x` (int): X coordinate in pixels (default: 0)
* `y` (int): Y coordinate in pixels (default: 0)
* `width` (int): Viewport width in pixels (default: 64, max: 64)
* `height` (int): Viewport height in pixels (default: 64, max: 64)
* `background` (int): Background color index (default: 5 - Black)
* `letter\_box` (int): Letter box color index (default: 5 - Black)
* `interfaces` (list\[RenderableUserDisplay]): Optional list of renderable interfaces to initialize with

Raises:

* `ValueError`: If width or height exceed 64 pixels or are negative

##### `move(dx, dy)`

Move the camera by the specified delta.

Args:

* `dx` (int): The change in x position
* `dy` (int): The change in y position

##### `render(sprites)`

Render the camera view. The rendered output is always 64x64 pixels. If the camera's viewport is smaller, the view will be scaled up uniformly (maintaining aspect ratio) to fit within 64x64, and the remaining space will be filled with the letter\_box color.

Args:

* `sprites` (list\[Sprite]): List of sprites to render

Returns:

* `np.ndarray`: The rendered view as a 64x64 numpy array

##### `replace\_interface(new\_interfaces)`

Replace the current interfaces with new ones. This method replaces all current interfaces with the provided ones. Each interface in the new list will be cloned to prevent external modification.

Args:

* `new\_interfaces` (list\[RenderableUserDisplay]): List of new interfaces to use. These should be cloned before passing them in.

### RenderableUserDisplay

The `RenderableUserDisplay` class is an abstract base class that defines the interface for UI elements that can be rendered by the camera. It is used as the final step in the camera's rendering pipeline to produce the 64x64 output frame.

```python
from abc import ABC, abstractmethod
from arcengine import RenderableUserDisplay

class MyCustomUI(RenderableUserDisplay):
    def render\_interface(self, frame: np.ndarray) -> None:
        # Implement custom rendering logic here
        pass
```

#### Methods

##### `render\_interface(frame)`

Render this UI element onto the given frame.

* `frame`: The 64x64 numpy array to render onto

This method is called by the camera during the final step of rendering. Implementations should modify the frame directly.

### ToggleableUserDisplay

The `ToggleableUserDisplay` class is an example implementation of `RenderableUserDisplay` that manages a collection of sprite pairs (enabled/disabled states) and provides methods to toggle between them.

```python
from arcengine import ToggleableUserDisplay, Sprite

# Create a toggleable UI element with sprite pairs
ui\_element = ToggleableUserDisplay(\[
    (enabled\_sprite1, disabled\_sprite1),
    (enabled\_sprite2, disabled\_sprite2)
])

# Enable/disable specific sprite pairs
ui\_element.enable(0)  # Enable first pair
ui\_element.disable(1)  # Disable second pair

# Check if a pair is enabled
is\_enabled = ui\_element.is\_enabled(0)
```

#### Methods

##### `\_\_init\_\_(sprite\_pairs)`

Initialize a new ToggleableUserDisplay.

* `sprite\_pairs`: List of (enabled\_sprite, disabled\_sprite) tuples

##### `is\_enabled(index)`

Check if a sprite pair is enabled.

* `index`: Index of the sprite pair to check
* Returns: True if the pair is enabled, False otherwise
* Raises: IndexError if index is out of range

##### `enable(index)`

Enable a sprite pair.

* `index`: Index of the sprite pair to enable
* Raises: IndexError if index is out of range

##### `disable(index)`

Disable a sprite pair.

* `index`: Index of the sprite pair to disable
* Raises: IndexError if index is out of range

##### `render\_interface(frame)`

Render the UI element onto the given frame.

* `frame`: The 64x64 numpy array to render onto

This method renders all sprite pairs, using the enabled sprite if the pair is enabled, and the disabled sprite if the pair is disabled.

##### `clone()`

Create a deep copy of this UI element.

* Returns: A new ToggleableUserDisplay instance with cloned sprite pairs

### Level

The `Level` class manages a collection of sprites, providing methods to add, remove, and query sprites.

```python
from arcengine import Level, Sprite

# Create an empty level
level = Level()

# Create a level with initial sprites
sprites = \[
    Sprite(\[\[1]], name="player"),
    Sprite(\[\[2]], name="enemy")
]
level = Level(sprites=sprites)
```

#### Methods

##### `\_\_init\_\_(sprites=None)`

Initialize a new Level.

* `sprites`: Optional list of sprites to initialize the level with

##### `add\_sprite(sprite)`

Add a sprite to the level.

* `sprite`: The sprite to add

##### `remove\_sprite(sprite)`

Remove a sprite from the level.

* `sprite`: The sprite to remove

##### `get\_sprites()`

Get all sprites in the level.

* Returns: A copy of the list of all sprites in the level

##### `get\_sprites\_by\_name(name)`

Get all sprites with the given name.

* `name`: The name to search for
* Returns: List of sprites with the given name

##### `clone()`

Create a deep copy of this level.

* Returns: A new Level instance with cloned sprites

## Usage

```python
from arcengine import example

# Add usage examples here
```

## Development

To set up the development environment:

1. Clone the repository:

```bash
   git clone git@github.com:yourusername/ARCEngine.git
   cd ARCEngine
   ```

2. Create and activate a virtual environment using uv:

```bash
   uv venv
   source .venv/bin/activate  # On Windows: .venv\\Scripts\\activate
   ```

3. Install development dependencies:

```bash
   uv sync
   ```

4. Install git hooks:

```bash
pre-commit install
```

You're now ready to contribute! This repo uses [`ruff`](https://github.com/astral-sh/ruff) to lint and format code and [`mypy`](https://github.com/python/mypy) for static type checking. You can run all of the tools manually like this:

```bash
pre-commit run --all-files
```

Note: by default these tools will run automatically before `git commit`. It's also recommended to set up `ruff` [inside your IDE](https://docs.astral.sh/ruff/editors/setup/).

## License

TBD - Currently for Internal Use Only.

