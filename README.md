## crazyfraggle.github.io

This is the repository from which I publish my blog. You can find that at the
actual blog site https://crazyfraggle.github.io/.

If you want to use this repository as a guide to how to set up a blog using
Jekyll, feel free. The file structure should be quite straight forward to
understand, it is mostly following the guide from
[the Jekyll docs](https://jekyllrb.com/docs/)

## Install developer dependencies

Extracted from the Jekyll docs above. 
First, set up local `gem` installation path if you haven't already. (Tip: It's
in the [zsh-customs](https://github.com/crazyfraggle/zsh-customs) setup.)

```sh
sudo apt-get install ruby-full build-essential zlib1g-dev
gem install jekyll bundler
```

## Running locally

To preview the site before pushing to github, running Jekyll locally is a good
idea. Install Jekyll as described in the docs above, then start with:

```sh
bundle exec jekyll serve
```

Or if you want to see your drafts rendered too:

```sh
bundle exec jekyll serve --drafts
```
