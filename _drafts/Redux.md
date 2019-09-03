---
layout: parsec
title: "New adventures in redux"
date: 2017-03-24 16:00:00 +0100
categories: parsec
---

## New adventures in redux

I have considered using redux in the Parsec game before, but skipped it, since I
felt I was already halfway there with the current GameObject implementation.
I'm now reconsidering, just to see if there might be any benefits. I think the
main benefit would be the ability to use the excellent redux devtools(TODO:
LINK) to study changes in the game's state.

### Short about redux

Redux' philosophy is that the application state should be stored in a single
immutable "store", that is updated solely as a result of actions dispatched
within the application. The application will then render after changes in the
store.

### Current design

The game is currently made up of a GameState object holding the main state of
the game, and a list of renderObjects that implement a very simple interface:

```typescript
export interface IRenderObject {
  draw(context: CanvasRenderingContext2D): void;
  update(state: GameState, timestamp: number): boolean;
}
```

The update method will be called for each object in sequence on every animation
frame, to update the current state of the object. This is basically the same as
would be done in a redux reducer function for this part of the redux state.

The draw method here is only responsible for drawing the object to the canvas,
and is called in sequence after all updates are performed.

### Reduxed design

The GameState object should translate easily into a redux store. The list of
renderObjects will take some more work, as each object class has it's own update
implementation.
