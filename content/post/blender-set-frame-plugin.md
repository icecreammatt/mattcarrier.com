---
title: Blender Set Frame Plugin
date: 2023-04-30
tags:
    - "blender"
    - "python"
    - "video editing"
---
Blender plugin to quickly set the render Frame Range start and end property from the currently selected sequence clip.

- Quick set frame start and end button [Plugin Download](https://github.com/icecreammatt/blender-set-frame-range/).

<!--more-->

## Editing and exporting old VHS footage in Blender

I've been recently editing some old family movies in blender. Taking 2 hour long VHS tapes I've scanned into a computer a few years ago and editing them down into smaller segments based on the clip contents.

## My workflow
- Importing the video clip into the blender sequence editor. 
- Find all the blue gaps and VHS noise in between video sections. (I'm looking to automate placing cut markers next with OpenCV) 
- Cutting the video into clean segments to remove noise and empty footage.
- Trimming out VHS noise on edges of each frame. (Cropping sides)
- Setting the Frame Start and End range to the current clip.
- Adding a timestamp and title to each segment to be used as the export title later.
- Render each section to disk.

To render animations in Blender the Frame start and end properties must be set to tell the rendering when to start and stop. When I initially started working on this I could not easily find the currently viewed frame in Blender despite looking all over the UI after upgrading to 2.5. So I decided to make a plugin to make this easier to do. The plugin is a simple button that takes the currently selected clip and sets the Frame Range property for export to the highlighted clips start and end frame. 

## Oops!
After making that plugin and reopening Blender a week later I noticed buried in one of the menus an option that does this exact thing I was looking for... `Sequencer > View > Range > Set Frame Range to Strip`. Also the UI was now displaying the current frame which previously was not visible. I'm not sure why this wasn't visible before. I was confused why it was removed to begin with as it was in older versions of Blender. All I can figure is I removed it from the UI by accident and restarting brought it back.

I can probably now bind the newly found menu option to a hotkey now that I know what the built in option is, but since I've already written the plugin I wanted to share it here.

## Next Steps
This was not a wasted effort though as it gave me a chance to familiarize myself with the Blender plugin API. It also put me on the right path to build a more advanced one that automates exporting many clips in the current scene to separate videos. I'll be open sourcing that plugin very soon as well.

## Instructions
- To install, visit https://github.com/icecreammatt/blender-set-frame-range/ and download the zip file in the repo.
- In Blender open preferences, click add-ons, install, and navigate to the zip file download.
- Check the checkbox to enable the plugin.
- Note that `Export Utils` shows up on the bottom right of the sequencer side bar. If it is not displaying, press `n` or `Sequencer > View > Sidebar` and then select the `Export Utils` tab on the right.
- Select the clip to export and press the `Set frame range from selection` button.
- Press `CMD` + `F12` to render animation.
