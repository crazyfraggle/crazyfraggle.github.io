---
layout: minecraft
title: "Realms map on Azure"
date: 2019-08-12 16:00:00 +0100
categories: minecraft
---

## Realms map on Azure

This post will describe a procedure to create a Minecraft Realms map, hosted in
Azure using Docker containers for hosting the web page and generating the map.

## The Why

In order to have some overview of what land has been discovered on our Minecraft
Realms server, I wanted to create a map. One that can be viewed and zoomed in
the browser, Google maps style. It is quite easy to generate this from a local
Minecraft world, and also from Realms by downloading a backup locally and then
rendering. However, I want this to be generated automatically without needing
manual downloads.

## The immediate How

There are multiple mapping options for Minecraft available. Some more maintained
than others. I've previously used [pigmap](TBD), but this seems discontinued. A
bit of searching found the excellent [Overviewer](TBD) alternative though. It
supports isometric view, smooth lighting and most importantly incremental
renders.

## TBD: Create Docker image for Overviewer

- Dockerfile definition
- Runtime script
- Create
- Verify
- TBD: Get credentials from outside.
- TBD: Publish image to hub. YW.

## Docker image for web

N GINX

## TODO

- Overviewer
- Docker
- Azure setup
- Realms extraction
- Screenshots

## Sources for inspiration

https://marc.tv/overviewer-minecraft-docker-synology/
http://www.aaronbell.com/how-to-create-overviewer-maps-from-minecraft-realms/
