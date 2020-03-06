---
title: "Irssi charset issues"
date: 2009-09-07 16:33:00 +0100
categories: personal
layout: blogger
---

For future reference, mostly to myself, here's how to get irssi working properly
with utf-8 terminals, on latin1 channels, through screen.

## 1. Make sure your terminal is utf-8

Putty: In the Window->Translation page of the Session configuration, change
"Received data assumed to be in which character set" to "UTF-8".

urxvt: Seems to be Utf-8 by default when the locale is. Check "locale". It
should look something like this:

```shell
LANG=en_US.UTF-8
LC_CTYPE="en_US.UTF-8"
LC_NUMERIC="en_US.UTF-8"
LC_TIME="en_US.UTF-8"
LC_COLLATE="en_US.UTF-8"
LC_MONETARY="en_US.UTF-8"
LC_MESSAGES="en_US.UTF-8"
LC_PAPER="en_US.UTF-8"
LC_NAME="en_US.UTF-8"
LC_ADDRESS="en_US.UTF-8"
LC_TELEPHONE="en_US.UTF-8"
LC_MEASUREMENT="en_US.UTF-8"
LC_IDENTIFICATION="en_US.UTF-8"
LC_ALL=en_US.UTF-8
```

## 2. Start screen in UTF-8 mode

`screen -U` is your friend. It is possible to switch this live using `C-a`
followed by `:utf8 on`.

## 3. Irssi

Never ever use irssi 0.8.12 (default in ubuntu for several revisions). If you
use ubuntu older than 9.10, install irssi from source (or appropriate .deb if
you can find one, I didn't). Set the following options:

```irssi
/set term_charset utf-8
/set recode_out_default_charset iso8859-1
/set recode transliterate off
/set recode fallback iso8859-1
/set recode on
```

The above assumes all channels you use on the server has latin1. To only set
latin1 recode for a single channel use `/recode add #channel iso8859-1`

## 4. Joining a channel with latin1 characters in the name

This is the tricky bit, and I've yet to find a good solution for it. My best tip
so far is to add it to the autojoin list before starting irssi. In
`~/.irssi/config` add/modify the channels setting:

```irssi
channels = ( { name = "#blåbær"; chatnet = "IRCNet"; autojoin = "yes"; }, );
```

Of course, you will need to edit the file with an editor that saves the file as
a latin1 file.
