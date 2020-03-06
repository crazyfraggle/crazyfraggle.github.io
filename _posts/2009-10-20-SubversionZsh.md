---
title: "Subversion helper functions in zsh"
date: 2009-09-07 16:33:00 +0100
categories: personal
layout: blogger
---

[Subversion](http://subversion.tigris.org/) has taken over the position as the
boring version control system that just works. And even though several good
alternatives have come up from the camp of distributed VCS's, I still prefer the
good old central repository model. The drawback of having a central server is in
my opinion subversion's strong side. Scattering multiple copies around just
makes getting everything into a system and ready for production a whole lot more
difficult.

As an old Linux user, I'm also quite fond of using a proper shell to help my
workday along. And for that I prefer [zsh](http://www.zsh.org/), mostly because
of its strong completion system. Like most unix shells, zsh can be extended with
custom functions, simple or complex. Below are three such functions that I use
frequently. (They can probably easily be ported to bash or other shells as well,
but the syntax used here is for zsh).

## Filtered status view

If you're anything like me, you frequently pollute your repository with dump
files, debug files and other junk while working. This will clutter the status
check with a bunch of files that subversion does not recognize, and therefore
displays with a '?' at the front, like this:

```text
.-(gobo@fraggle)-()--------------------------------------(~/Projects/hottipi)-.
'-(18:51:%)-- svn status                                        --(Tue,Oct20)-'
?       pypi-classifiers.txt
?       dump.pcap
M       src/httpchat.py
```

If you just want to see what files have changed since last sync with the
repository the following small function is helpful.

```shell
svnstatus () {
 templist=`svn status $*`
 echo `echo $templist | grep '^?' | wc -l` unversioned files/directories
 echo $templist | grep -v '^?'
}
```

This will print a quick summary of unknown files, and then list files with
modifications since last commit.

```text
.-(gobo@fraggle)-()--------------------------------------(~/Projects/hottipi)-.
'-(18:51:%)-- svnstatus                                         --(Tue,Oct20)-'
2 unversioned files/directories
M       src/httpchat.py
```

## Show log when updating

When running `svn update` a list of modified files is output but there is no
mention of what exactly has changed in these files. The following little snippet
will display the log before doing the update. Handy for seeing just what your
coworkers have been up to lately.

```shell
svnup () {
 svn log --stop-on-copy -r HEAD:BASE $1
 svn up $1
}
```

A little warning on this though. `svn log` can be slow if run on a huge set of
files, or if there has been a very long time since the last update from the
server repository.

## Colorful diff tool

This little function relies on the `code2color` script often automatically
installed in gentoo with the standard `less` package. If you're not using
gentoo, you can get it
[here](http://www-zeuthen.desy.de/~friebel/unix/less/code2color). It might need
a bit of massaging.

This little function will simply do what a normal `svn diff` will, but the
output is fed through `code2color`, and the result is a screenful of pretty
colors. If you want to, pipe it further to `less` as you would normally do.

```shell
export C2C=/usr/bin/code2color
svndiff () {
 svn diff $* | $C2C -l patch -
}
```

That's it. To use these functions, just add them to your `$HOME/.zshrc` file,
and start a new instance of zsh. (or `source $HOME/.zshrc` if you like).
