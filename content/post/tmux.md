---
title: Tmux
date: 2015-05-21
tags:
    - "tmux"
    - "linux"
---
Tmux is a great terminal multiplexer which allows for splitting screens and having tabs on SSH sessions with the added benefit that if you are disconnected from the server you can reconnect and then reattach to the Tmux server. I think the hardest part of using Tmux is learning all the commands. I've put together a config that uses bindings close to Vim to make it easier to use. 
<!--more-->

## devmux.sh

I've written `devmux.sh` to allow me to create a quick development environment with the screen split into sections with the main one focusing on Vim while the bottom sections being used for task running, search, and git.

> Soft link `devmux.sh` to the bin folder.   
> `ln -s ~/scripts/devmux.sh ~/bin/devmux`  
> You could also just rename `devmux.sh` to `devmux` and put it in the bin folder.
> Make sure `~/bin` is in the `PATH`  

![https://raw.githubusercontent.com/icecreammatt/dotfiles/master/resources/preview.png](https://raw.githubusercontent.com/icecreammatt/dotfiles/master/resources/preview.png)

```
#!/bin/bash
# Starts a new tmux session with a horizontal split
# with about 75% on top with 25% on the bottom split vertically

# the 22 comes from splitting the window in half twice and deleting
# the second section to make the top one larger while leaving a
# smaller area for a prompt and task runner window at the bottom
tmux new-session -d 'zsh'
tmux split-window -v -p 22 'zsh'
tmux split-window -h 'zsh'
tmux -2 attach-session -d
```

Sometimes I will create a second tab in Tmux and want to have a similar split on the bottom. To achieve this without having to remember a bunch of hot keys to resplit the screen again I wrote `remux.sh` which takes an existing Tmux session and splits it to match the look of `devmux.sh`

## remux.sh

`ln -s ~/scripts/remux.sh ~/bin/remux`

```
#!/bin/bash
# Split an existing tmux session into 75% top of current window
# and 25% with a split bottom. This is useful for when you have already
# Started devmux but want to have a new window be the same.

# the 22 comes from splitting the window in half twice and deleting
# the second section to make the top one larger while leaving a
# smaller area for a prompt and task runner window at the bottom
tmux split-window -v -p 22 'zsh'
tmux split-window -h 'zsh'
```
## Aliases

```
# tmux
alias tmux='tmux -2'
alias tma='tmux -2 attach -d -t'
alias tm='tmux -2 new -s $(basename $(pwd))'
alias tml='tmux list-sessions'
alias tmr='tmux rename-session -t'
```

## Config
https://github.com/icecreammatt/dotfiles/blob/master/configs/tmux.conf

## Splitting Views

## Navigation

## Leader key

## Vim Plugin

## Searching

## Git

## Full Screen

## Mouse Scrolling

## Copy Paste

## Styling


## Other resources

* <a href="http://shebangme.blogspot.com/2011/12/tmux-swap-current-open-vertical-panes.html" target="_blank">http://shebangme.blogspot.com/2011/12/tmux-swap-current-open-vertical-panes.html</a>

* Thoughtbot
* <a href="https://robots.thoughtbot.com/love-hate-tmux" target="_blank">https://robots.thoughtbot.com/love-hate-tmux</a>
* <a href="https://robots.thoughtbot.com/tmux-copy-paste-on-os-x-a-better-future" target="_blank">https://robots.thoughtbot.com/tmux-copy-paste-on-os-x-a-better-future</a>
* <a href="https://robots.thoughtbot.com/how-to-copy-and-paste-with-tmux-on-mac-os-x" target="_blank">https://robots.thoughtbot.com/how-to-copy-and-paste-with-tmux-on-mac-os-x</a>

* My dotfiles
* <a href="https://github.com/icecreammatt/dotfiles" target="_blank">https://github.com/icecreammatt/dotfiles</a>
