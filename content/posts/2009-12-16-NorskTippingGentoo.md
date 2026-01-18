---
title: "Norsk Tipping på Gentoo Linux"
date: 2009-12-16 18:17:00 +0100
categories: personal
shititspaanorsk: yes
---

Etter at smartkortleseren til Buypass sluttet å fungere i Windows 7 betaen min,
tenkte jeg at det var på tide å se om jeg fikk den til å fungere i OSet jeg
bruker mest til daglig, Gentoo Linux. Litt kjapp googling viste meg at dette i
grunn ikke burde være spesielt vanskelig. Buypass har tilogmed en egen miniguide
for dette.

Nødvendige pakker installeres enkelt med: `sudo emerge -av pcsc-lite ccid`

Legg til nsplugin som make-flagg for java. (evt legg det inn for hele systemet
ved å legge det i `/etc/make.conf`). Installer deretter vanlig Sun Java:
`sudo emerge sun-jre-bin`

Start smartkort-daemonen `sudo /etc/init.d/pcscd start`

Bruk en browser som støtter javapluginsen og gå til Norsk Tipping. (Jeg brukte
chromium-bin, da jeg ikke umiddelbart fikk det til å fungere med Firefox og
Opera)

Til slutt, sørg for at smartkort-daemonen starter etter neste
kjerneoppgradering: `sudo rc-update add pcscd default`

Husk nå å ikke spille bort alle pengene du har. :)
