---
title: Blender Set Frame Plugin
date: 2023-04-30
tags:
    - "blender"
    - "python"
    - "video editing"
---
Blender plugin to quickly set the render frame range start and end property from the currently selected sequence clip.

- Quick set frame start and end button [Plugin Download](https://github.com/icecreammatt/blender-set-frame-range/).

<!--more-->

## Editing and exporting old VHS footage in Blender

I've been editing some old family movies in Blender by scanning VHS tapes into a computer and then cutting them into smaller segments based on the clip contents.

## My workflow
- Import the video clip into the Blender sequence editor. 
- Locate all of the blue gaps and VHS noise in between videos. (I'm looking to automate placing cut markers next with OpenCV) 
- Cut the video into clean segments to remove noise and empty footage.
- Trim the VHS noise from the edges of each frame. (Cropping edges)
- Set the frame start and end range to the current clip.
- Add a timestamp and title to each segment to be used as the export title.
- Render each section to disk.

To render animations in Blender, the frame start and end properties must be set in order to provide the rendering start and stop times. When I began working on this, I could not easily find the active frame in Blender despite looking all over the UI after upgrading to 2.5. I ended up building a browser plugin to make this process more efficient. The plugin is a button that takes the currently selected clip and sets the frame range property for export to the highlighted clips start and end frames. 

## Oops!
A week after building the plugin, I opened Blender and noticed buried in one of their menus is an option that does the exact thing I was looking for: `Sequencer > View > Range > Set Frame Range to Strip`. Additionally the UI was now displaying the current frame which was not previously visible. I was confused why it was removed to begin with, as it was in older versions of Blender. All I can figure is that I removed it from the UI by accident and restarting brought it back.

I can bind the newly found menu option to a hotkey now that I know where the built in option is, but since I've already wrote the plugin, I wanted to share it here.

## Next Steps
This was not a wasted effort as it gave me a chance to familiarize myself with the Blender plugin API. It also directed me to build a more advanced plugin that automates exporting many clips from a current scene into separate videos that I’ll be open sourcing soon.

## Instructions
- To install, visit https://github.com/icecreammatt/blender-set-frame-range/ and download the zip file in the repo.
- In Blender open preferences, click add-ons, install, and navigate to the zip file download.
- Check the checkbox to enable the plugin.
- Note that `Export Utils` shows up on the bottom right of the sequencer side bar. If it is not displaying, press `n` or `Sequencer > View > Sidebar` and then select the `Export Utils` tab on the right.
- Select the clip to export and press the `Set frame range from selection` button.
- Press `CMD` + `F12` to render animation.
