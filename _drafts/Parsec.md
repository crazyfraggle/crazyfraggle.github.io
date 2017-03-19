---
layout: parsec
title: "Let's clone a game"
date:  2017-02-28 16:00:00 +0100
categories: parsec
---
## Let's clone a game

I've always wanted to make a game from scratch, just for the fun of it. I don't
have any good ideas for a new one, so I'm going to make a clone/tribute instead.
The game I've chosen is a bit obscure to most people, as it is from the old
Texas Instrument TI99/4A computer.  This was the first computer I ever used,
back when I was just 6-7 years old.  I have fond memories of sitting with my
father, typing in Basic commands that I barely understood the meaning of, to
create small visual effects on the screen.

The TI 99/4A had a cartridge slot for games and applications, and we had two
games with our machine: "TI Invaders" - A quite well made Space invaders clone,
and "TI Parsec", a side scrolling space shoot-em-up. This is the game I'll be
cloning.

## Tech

### Langauge

I've chosen to write the game in Typescript.  There are two reasons for this.

1. Typescript is my main programming language at work these days, and this is an
   opportunity to get better at it, and try out new features of the language. I
   also really like the extensions it brings to javascript coding, even though
   many of these are now native in ES6.
2. I want the game to run in a browser, which means the resulting output will
   need to be Javascript.

### Libraries/frameworks used

Since I wanted to make this from scratch, I've skipped on using any libraries at
all.  This also helps keep the final code size to a minimum.

The game renders to a normal HTML canvas.  Currently no optimization tricks have
been attempted, as they have not been necessary for the game to run smoothly.

