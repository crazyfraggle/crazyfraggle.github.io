---
title: "Picking up again"
date: 2021-08-21 23:00:00 +0100
categories: parsec
---

# Picking up a semi-abandonded project

So, back in 2020, just before that thing hit, I started what was planned to be a
recurring series on making a game. That kinda stalled as my attention and energy
got distracted. I thought now might be a good time to pick that up again.

It turns out there are a few interesting points to returning to a code base that
was left alone more than a year ago...

## Remember where you were, what you were doing

I thought I had gotten a bit further than it turns out I had. This is likely
caused by the fact that this is my second attempt at making this game. Firing up
the 'game' with `npm start` still only showed the passing star field. But what
where those warnings when starting it up?

## Updating project dependencies

This game is intentionally not relying on other source code. This is on part
because I want to learn and play with all the boring/interesting tech myself,
and in part because I want it to be as lightweight as possible. At least for
now.

This means the package.json file only contains 2(!) dependencies, and those are
just `devDependencies`. Still, `npm install` slaps me in the face with the
following:

```
20 vulnerabilities (4 low, 10 moderate, 6 high)
```

This really is the sad state of modern Javascript development. Attempting to fix
using just `npm audit fix` didn't work out, so manually updating to latest
version of `typescript` and `parcel-bundler` (now just `parcel`) seemed like the
best option. We all want the latest and greatest, right?

## Breaking changes

Of course, it's not all that simple. The `parcel` bundler has gotten a bit more
strict, and refuses to accept the project as it is currently set up. But all in
all, it's small changes to get it running. And `parcel` is kind enough to tell
me exactly what needed changing.

So with a few changes, we're back to work. :)
