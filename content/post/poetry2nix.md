---
title: Packaging python app with poetry2nix using nix flakes
date: 2024-03-24
tags:
    - "nix"
    - "flakes"
    - "linux"
    - "python"
    - "toolong"
---
**Background** I have some backup logs that have failures I wanted to search and recently came across [toolong](https://github.com/Textualize/toolong) but it is not currently in nixpkgs. I figured this is a good chance to try out poetry2nix I keep reading about and went through the process of packaging this so I could use it easily with nix.
<!--more-->
## Setup

```bash
$ git clone https://github.com/Textualize/toolong
$ cd toolong
$ echo "use flake" >> .envrc && direnv allow
$ echo "result" >> .gitignore
$ echo ".direnv" >> .gitignore
$ nix flake init --template github:nix-community/poetry2nix
$ rm -rf ./app/__init__.py
$ git add flake.nix
$ git add flake.lock
$ nix build

error: builder for '/nix/store/3hg2l7lki8rirq5jkvz82mm6fy9559gl-python3.11-toolong-1.4.0.drv' failed with exit code 1;
       last 10 log lines:
       > Creating a wheel...
       > * Getting build dependencies for wheel...
       > * Building wheel...
       > Successfully built toolong-1.4.0-py3-none-any.whl
       > Finished creating a wheel...
       > Finished executing pypaBuildPhase
       > Running phase: pythonRuntimeDepsCheckHook
       > Executing pythonRuntimeDepsCheck
       > Checking runtime dependencies for toolong-1.4.0-py3-none-any.whl
       >   - textual<0.53.0,>=0.52.0 not satisfied by version 0.50.1
       For full logs, run 'nix log /nix/store/3hg2l7lki8rirq5jkvz82mm6fy9559gl-python3.11-toolong-1.4.0.drv'.
```

To fix this error I updated the pin for textual.

```diff
-textual = "^0.52.0"
+textual = "0.52.0"
```

```bash
$ poetry update textual
$ nix build

warning: Git tree '/Users/matt/Source/toolong' is dirty

$ ls ./result/bin

tl
```
Success!  
  
Check these files into git using my [fork](https://github.com/Textualize/toolong/commit/387a24fd068b354850bd0d53a989beae4bac10ba)

```bash
$ nix run 

error: unable to execute '/nix/store/m6395khh8givi8kb7a2zyrcda8dfzgka-python3.11-toolong-1.4.0/bin/toolong': No such file or directory
```

I'm not sure how to fix this issue. I tried several different things in the flake.nix to override the binary name but none seemed to work. Running this did though. This isn't a problem when adding it as a custom input though `tl` will be apart of the system path.

```bash
$ ./result/bin/tl

Usage: tl [OPTIONS] FILE1 FILE2

  View / tail / search log files.

Options:
  --version                Show the version and exit.
  -m, --merge              Merge files.
  -o, --output-merge PATH  Path to save merged file (requires -m).
  --help                   Show this message and exit.
```

## Install into environment

Add files to my [nixfiles](https://github.com/icecreammatt/nixfiles/commit/5972403c8f5f4332f480b03f111f5355685408b9) and reference my fork

```diff
# flake.nix
+   toolong = {
+     url = "github:icecreammatt/toolong";
+     inputs.nixpkgs.follows = "nixpkgs";
+   };
```

```diff
# configuration.nix
  environment.systemPackages = with pkgs; [
    bash
    inputs.helix-flake.packages."${system}".helix
+   inputs.toolong.packages."${system}".toolong
  ];

```

```bash
$ darwin-rebuild switch --flake .
...
$ tl

Usage: tl [OPTIONS] FILE1 FILE2

  View / tail / search log files.

Options:
  --version                Show the version and exit.
  -m, --merge              Merge files.
  -o, --output-merge PATH  Path to save merged file (requires -m).
  --help                   Show this message and exit.
```
