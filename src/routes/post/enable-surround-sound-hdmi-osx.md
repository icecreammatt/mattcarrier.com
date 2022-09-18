---
title: How to enable 5.1 surround sound in VLC on OSX over HDMI
date: 2015-04-08
tags:
  - 'osx'
  - 'entertainment'
---

I recently connected my MacBookPro to my audio receiver over HDMI to play a movie with VLC and try out the Steam in home streaming. I noticed that the audio was not coming out of all my speakers.

<!--more-->

To fix this open the Audio MIDI App and switch output to 5.1.  
`Applications > Utilities > Audio MIDI Setup`

While the screenshots show the source as my Samsung TV it is actually playing the audio through my Sony receiver. Making this change allowed me to watch movies with VLC in 5.1. If the option for 5.1 is grayed out try setting the input on the receiver to be the laptops HDMI and toggling the power. This happened to me when I switched inputs after having the laptop already connected.

![Audio MIDI Setup](/images/2015-04-08/audio-devices.png)
![Audio MIDI Setup](/images/2015-04-08/audio-devices-configure-speakers.png)
