---
title: "Linux media PC woes: Media application"
date: 2009-06-08 20:48:00 +0100
categories: personal
layout: blogger
---

## Linux media PC woes: Media application

At this point, I finally have a working X display on my TV. 1024x576 widescreen
interlaced. Which flickers quite a bit on static desktop image, but isn't
noticeable when playing video or showing pictures.

I have tested MythTV earlier, and found that I didn't really like it much. Don't
know why not, just wasn't complete enough I think. So this time I did a new
search for linux media PC and came across the linux port of
[XBMC](http://xbmc.org/) - the XBox Media Center. Apparently this was already in
Gentoo Portage, just had to unmask it.

I had already tested this on the ATI adapter briefly, and new that it should
work. So I was surprised to only see a segfault when trying it on the TV with
the nVidia card. Rebuilding latest svn version didn't help either. Core dump on
startup. Every time. I decided to attempt using the proprietary nvidia-drivers
instead. Bingo! I had planned on testing those anyway to get vdpau support
later, so this was okay for me.

So I finally got the media PC up and running, and except for the occassional
hangups of xbmc, which I credit to the fact that I'm running a very fresh svn
copy, it's working fine. The overscan adjustment feature saved me all the
trouble of adjusting the X modeline overscan to fit the TV as well.
