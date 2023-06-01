---
title: Export PDFs to PNGs
date: 2023-05-31
tags:
    - "nix"
    - "imagemagick"
    - "fish"
---

Ever want to convert a Google Slides presentation to images without having to save each one manually?

1. Export from Google Slides to PDF. `File > Download > PDF` This will let us download all the images at once.
2. Using the `imagemagickBig` [nix](https://search.nixos.org/packages?channel=22.11&from=0&size=50&sort=relevance&type=packages&query=imagemagickBig) package or installing with instructions from [here](https://imagemagick.org/index.php) you can then run the following command in the CLI:
> `convert -density 300 -quality 100 my-download.{pdf,png}`

This will then convert the PDF to a series of images at 300 DPI.  

[`fish` shell](https://github.com/icecreammatt/nixfiles/blob/603125869a598e631973d770915fcb0497e98b34/modules/shell/fish.nix#L229-L241) script for quick access: `pdf-to-png ./my-pdf-file.pdf`

<!--more-->

```
function pdf-to-png
    if test (count $argv) -lt 1
        echo "pdf-to-png <filename>"
        return 1
    end

    set fileName (echo $argv | sed 's/.pdf//')

    echo convert --run "convert -density 300 -quality 100 $filename.{pdf,png}"
    convert -density 300 -quality 100 $fileName.{pdf,png} && ls *.png
end
```