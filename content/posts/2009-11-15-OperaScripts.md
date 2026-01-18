---
title: "Opera user javascripts: Remove redirection URLs"
date: 2009-11-15 20:46:00 +0100
categories: personal
---

A little known feature of the Opera web browser is the built-in support for
adding personal Javascripts that are run on each page. The uses for this is left
to the user, so here I will present a few small snippets that I currently use.

## Basics

To enable user javascripts, open the Preferences dialog, go to the Advanced tab,
then the Content page. Click the Javascript options and set the directory where
you want to keep your files. All \*.js files in this directory will be loaded on
all pages.

To avoid all javascripts being run on all pages, it is recommended to wrap all
code in a test checking which server is currently in use. This is easily done
using the location.hostname attribute.

```javascript
if (location.hostname == "www.dagbladet.no") {
  function do_stuff() {
    alert("time to do stuff");
  }
  document.addEventListener("load", do_stuff, false);
}
```

## Dagbladet No-Go

[Dagbladet](https://www.dagbladet.no/) (and some other Norwegian news sites)
employ a redirection service for keeping track of which links are being actively
used by the readers. In essence this is rather harmless, but unfortunately this
redirection service seems to be less stable than the news sites themselves. The
result being that every now and then all links on the page starts failing. The
following little piece of code strips the redirection bit from the URLs, leaving
just the base URLs.

```javascript
if (
  location.hostname == "www.dagbladet.no" ||
  location.hostname == "www.kjendis.no" ||
  location.hostname == "www.se.no"
) {
  function no_go() {
    var anchors = document.getElementsByTagName("a");
    for (var i in anchors) {
      var a = anchors[i];
      if (a.href) {
        var b = a.href.replace(/.*go.dagbladet.no.*(http.*)/, "$1");
        a.href = b;
      }
    }
  }
  document.addEventListener("load", no_go, false);
}
```

This can of course easily be modified for other pages using the same, such as
[vg.no](https://vg.no).
