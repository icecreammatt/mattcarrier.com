---
title: Nix flakes for development
date: 2023-02-26
tags:
    - "nix"
    - "linux"
---
## Background
I had some projects from school that I wanted to revisit and compile again, specifically a game called Worm.  This was an assignment that needed to be linked against [ncurses](https://en.wikipedia.org/wiki/Ncurses) which isn't installed out of the box on most machines. I've been dual booting [NixOS](nixos.org/) for some time now on my gaming PC and I thought it was time to start using Nix [Flakes](https://nixos.wiki/wiki/Flakes) with my own projects.
<!--more-->
![nix flake worm candybar](/images/2023-02-26/nix-flake-worm.jpg)

## Building
- [Install Nix](https://nixos.org/)
- Follow instructions [here to enable Nix Flakes](https://nixos.wiki/wiki/Flakes)
- `git clone git@github.com:icecreammatt/ssu-cs315-worm.git`
- `cd worm && nix build`
- `nix run`

## Developing
- `nix develop`
- `make`
- `./worm`

![Game Preview](/images/2023-02-26/worm.jpg)
> Collect numbers with WASD to increase worm size and do not eat yourself!

## [**Nix Flakes**](https://nixos.wiki/wiki/Flakes)
This flake file added to the repo contains the build instructions and dependencies needed to compile the game. There is also a [`flake.lock`](https://github.com/icecreammatt/ssu-cs315-worm/blob/master/flake.lock) file which is used to pin all the dependencies. Now you no longer have to track down the [ncurses](https://en.wikipedia.org/wiki/Ncurses) dependencies and manually install them into the dev environment.
Thanks to [nixvital/nix-based-cpp-starterkit](https://github.com/nixvital/nix-based-cpp-starterkit/blob/main/flake.nix) for the reference flake.

> [flake.nix](https://github.com/icecreammatt/ssu-cs315-worm/blob/master/flake.nix)
```nix
{
  description = "Worm CLI game";

  inputs = {
    # Pointing to the current stable release of nixpkgs. You can
    # customize this to point to an older version or unstable if you
    # like everything shining.
    #
    # E.g.
    #
    # nixpkgs.url = "github:NixOS/nixpkgs/unstable";
    nixpkgs.url = "github:NixOS/nixpkgs/22.11";

    utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, ... }@inputs: inputs.utils.lib.eachSystem [
    # Add the system/architecture you would like to support here. Note that not
    # all packages in the official nixpkgs support all platforms.
    "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin"
  ] (system: let pkgs = import nixpkgs { inherit system; };
  in {

    # This block here is used when running `nix develop`
    devShells.default = pkgs.mkShell rec {
      # Update the name to something that suites your project.
      name = "worm";

      # build environment dependencies
      packages = with pkgs; [
        llvmPackages_14.clang
        ncurses6
      ];

      # Setting up the environment variables you need during development.

      # Todo figure out why I can't use clang on Asahi but can on Darwin
      # Use "clang++" for most systems but OSX Asahi requires g++ for some reason or a runtime error occurs
      shellHook = let
        # This is for an icon that is used below for the command line input below
        icon = "f121";
      in ''
        export PS1="$(echo -e '\u${icon}') {\[$(tput sgr0)\]\[\033[38;5;228m\]\w\[$(tput sgr0)\]\[\033[38;5;15m\]} (${name}) \\$ \[$(tput sgr0)\]"
        export COMPILER="clang++"
        #export COMPILER="g++"
        make
      '';
    };

    # This is used when running `nix build`
    packages.default = pkgs.llvmPackages_14.stdenv.mkDerivation rec {
      name = "worm";
      version = "0.1.1";
  
      src = self;

      buildInputs = [ pkgs.ncurses6 ];

      buildPhase = "COMPILER='clang++' make";

      installPhase = ''
        mkdir -p $out/bin; 
        install -t $out/bin worm
      '';

      meta = with inputs.utils.lib; {
        homepage = "https://github.com/icecreammatt/ssu-cs315-worm";
        description = ''
          Terminal CLI Worm Game
        '';
      };
    };
  });

}
```