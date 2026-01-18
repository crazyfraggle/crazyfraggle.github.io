---
title: "Android Home Screen Setup"
date: 2019-08-12 16:00:00 +0100
categories: misc
---

## Building an Android home screen with KLWP, Tasker and Javascript

Using KLWP, Tasker and a bit of home brewed javascript, we'll create a live
wallpaper that display relevant information from various sources dependent on
location. The goal is to provide at-a-glance information for my most common
phone tasks, and quick access to relevant apps.

## Android customization

My favorite feature of Android is the ability to customize more or less
anything. The apps we'll look at here are KLWP from Kustom and Tasker.

## About KLWP

KLWP, Kustom Live Wallpaper, is an app that allows you to create a live
wallpaper for your Android home screen. It's part of a family of customization
apps from Kustom.

## About Tasker

Tasker is the classic workhorse for Android automation. Based on various
conditions set, it can perform a multitude of tasks. A classic and easy example
that I use is to enable/disable Wi-fi when in the vicinity of home. In this
example though, we'll be using the more advanced option of running custom
Javascript code.

## Wanted features

THe initial list of features wanted on the home screen for quick access was:

- Clock
- Calendar items
- Todo list
- Media controls
- Weather
- Bus schedule
- Quick launch for photo, strava, etc.

## Design

I'm no designer, so the design needs to be quite clean and simple. I quite like
hexagonal shapes, so we'll be using the build in hexagon render support in KLWP.
We'll call these "hexes" throughout this post.

### Clock

The most important thing to see when glancing at the screen is usually time.
This is important enough that the manufacturers put it on the lock screen too.
In this design, I've copied the concept of the "slow" clock for the central
clock hex. It has a single hand moving slowly around during a 24 hour day. It's
a subtle reminder to myself to take life a bit more slowly. Tapping the clock,
switches it to a digital clock and date display for accuracy. Tapping these
again opens the clock app or the calendar app.

### Media player

The media player hex in idle state shows the album cover for the current song,
as well as a progress indicator running around the edge of the hex. Tapping the
hex displayes the artist and title, and reveals the actual controls. Tapping the
artist/title section opens the player as well.

## Customizing tasker using scripting

TBD

## Extra: Syncing scripts with Syncthing

TBD
