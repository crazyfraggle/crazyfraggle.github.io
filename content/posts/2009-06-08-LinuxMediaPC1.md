---
title: "Linux media PC woes"
date: 2009-06-08 20:01:00 +0100
categories: personal
---

This is going to be short series of articles describing my struggles to get a
Linux Media PC connected to an old Widescreen CRT TV set. I started writing this
a while ago, but never got around to publish it.

## The setup

I can't afford buying lots of new stuff just to get a simple home theater set,
which is why I'm building this out of the parts I've already got.

Computer: My old file server. It already has the media files and storage. The
only thing needed is a graphics adapter and the right software. It is running
Gentoo Linux as it has been doing for ages now, and I have no intention of
changing this. Specs are Athlon 64, 2GB RAM. To use it for media PC purposes I
plug in my retired ATI x1950 Pro card that was retired from my main computer in
order to get an adapter capable of playing GTA IV.

Display: An old Philips 32" 50Hz Widescreen CRT TV. This is the only display on
this computer, as I haven't needed a display on it until now. Available inputs
on the TV are two SCART ports at the rear, and an S-Video port on the side.

## Configuration

ATI and Linux is in itself a perpetual nightmare. The X.org drivers are
generally late and without support for features beyond the immediate needs for a
simple desktop, and the native binary drivers are prone to errors as well. After
updating and rebuilding quite a bit of the system however, I was still not able
to run the native drivers with the new X.org server. The X server simply core
dumps while probing drivers. The open drivers however seems mature enough for
the old X1950 now, so I decided to try my luck with those.

### First attempt, TV-Out

The logical thing to do when connecting a computer to a TV is to use the TV-Out
on the graphics adapter. Turns out of course that this is not quite supported
yet on the X1950 with the `radeon` drivers. I seemed to almost get an output
using an S-Video cable that I think came with the graphics adapter, but not
quite. That is, I get an output on the TV when booting the machine and still
have it until the X drivers kick in. After that, all black.

### Second attempt, VGA to SCART

Since this computer only connects to the TV, I figured that it should be
possible to connect VGA directly to the SCART input on the TV. After all, VGA
provides RGB output, and SCART supports said input. Googling around a bit
reveals a few different solutions for this. I decided to go for the simplest
approach, since I was using an ATI adapter which should support a composite sync
signal.

More about that later.
