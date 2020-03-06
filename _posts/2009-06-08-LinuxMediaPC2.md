---
title: "Linux media PC woes: VGA-SCART cable"
date: 2009-06-08 20:48:00 +0100
categories: personal
layout: blogger
---

After deciding to attempt building a
[VGA out-Scart in](http://www.idiots.org.uk/vga_rgb_scart/) cable, I set out to
find the required components to build a prototype.

Since I already had a bunch of cables stowed away, finding the required cabling
was not a problem. A bit of cutting, and taping later, I had this:

Not quite a [monster cable](http://www.monstercable.com/), but quite monstrous
still. The power input there is used to switch the TV to RGB and Widescreen.
Note the nice 1kohm resistor there.

The moment arrives to connect this monstrosity to the associated hardware. VGA
and audio cable connected, I switch the TV on before connecting the molex power.
Upon connecting the power, the TV immediately switches to Video view, and goes
into widescreen mode. At least that bit works.

I can also spot the purple ascii-art gentoo logo of the login screen blurring
past in the scrambled image of the text console. I take this as confirmation
that the RGB-signals are properly connected, and continues to X configuration.

Hours (days really) later I give up. I'm not able to get the TV to sync to the X
signal, and I seriously have no clue as to why. I (wrongly) decide that this
must be due to a lack of a composite sync signal and decides it is time to build
this thing properly, with a small circuit to create a composite sync. That would
also release the ATI requirement, and allow me to change graphics adapter.

After a little shopping, I had the resistors required. Salvaged a generic
transistor from an old C64 joystick autofire contraption. After a bit of
soldering and I had the setup on the right. Didn't look too bad, so I decided to
give it a try. Same result as my previous prototype. Blaming the transistor, and
guessing I had connected it wrong, I desoldered it and tried another of the same
type. Still just a flickering image.

So I decided to order a few transistors. Searching on Elfa.se I found a
transistor with basically the same specs as the one in the circuit description I
was following. Next time I'm ordering electronics, I will learn to check the
size of the components. Surface mount transistors are tiny. Still, I didn't want
to give up, and a bit of more soldering, I managed to connect it. Decided to
redo the sync circuit at this point as well to clean up the mess from the
previous attempts. Reconnect, retry. Same result.

## Revelation

At this point I was pretty sure things should be correct, so I finally decided
to look for other causes of the problem. After a few hours battling with X
Modelines and the ATI driver, it finally dawned on me that the driver was simply
ignoring my requests for a video clock that was slow enough to provide a PAL TV
sync. The Modelines provided by the marvellous little app called `lrmc` should
have worked, but didn't.

Well, out with the ATI adapter, and in with an old nVidia adapter. Compiled the
nv driver, and voila. Image on the screen!

For reference, the working modeline for a widescreen PAL TV is:

```xorg.conf
Modeline "1024x576x25.00i" 19.750000 1024 1056 1152 1264 576 586 592 625 -HSync -VSync interlace
```

Next up, the media PC application.
