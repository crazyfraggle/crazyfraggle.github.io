---
layout: parsec
title: "Input and avatars"
date: 2020-02-29 09:00:00 +0100
categories: parsec
---

## Input and avatars

An important difference between a game and simple animation is the ability to
control what you're seeing. Most games have some form of "avatar" that you
control, Steve in Minecraft, Link in Zelda, etc. In Parsec, your avatar is your
ship.

TBD: Image of ship from original game here.

To be able to control this, we need to capture the keyboard input on the page,
and let that control how the ship moves on screen.

## Capturing keyboard input

Capturing keyboard input in a javascript web application is quite straight
forward. In our case, we want to know when a button is pressed, and when it is
released. For this we will assign event handlers to the `window.onkeydown` and
`window.onkeyup` event hooks.

```typescript
window.onkeydown = onKeyPress;
window.onkeyup = onKeyRelease;
```

The actual functions get a `KeyboardEvent` and need to act on this. For this, a
good old switch will do the trick for now.

```typescript
function onKeyPress(event: KeyboardEvent) {
  switch (event.keyCode) {
    case Keys.space: // Fire laser
      break;
    case Keys.up: // Start upwards motion
      break;
    case Keys.down: // Start downwards motion
      break;
    case Keys.left: // Start leftwards motion
      break;
    case Keys.right: // Start rightwards motion
      break;

    default:
      break;
  }
}

function onKeyRelease(event: KeyboardEvent) {
  // Do the reverse of onKeyPress
}
```

### Constants

The keys however are not defined this nicely, so I'll be adding a file for
constants (`constants.ts`) where such things can be defined. This file will be
used for other constants as well soon.

```typescript
export enum Keys {
  space = 32,
  left = 37,
  up = 38,
  right = 39,
  down = 40
}
```

## The ship

For the ship we need to keep a few parameters: the current position, speed and
acceleration, as well as whether the laser is being fired or the ship is in
spawn quarantine. (The ship is indestructible for the first few seconds after
restarting)
