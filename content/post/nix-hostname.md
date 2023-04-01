---
title: Nix flake hostname troubleshooting
date: 2023-03-31
tags:
    - "nix"
    - "flakes"
    - "linux"
---

Have you seen this error?

```bash
building the system configuration...
error: flake 'git+file:///Users/matt/nixfiles' does not provide attribute 'packages.aarch64-darwin.darwinConfigurations.Bebop.system', 'legacyPackages.aarch64-darwin.darwinConfigurations.Bebop.system' or 'darwinConfigurations.Bebop.system'
````
I ran into this and it took me about a month before I realized that I had changed my hostname and that is why my nix flake was no longer building.

<!--more-->

```nix
{
 ...
Bebop = darwin.lib.darwinSystem {
  system = "aarch64-darwin";
  specialArgs = { user = userPersonal inputs; };
  modules = [ ... ]
 ...
}
```

The `hostname` or where above says `Bebop` in this section must match your laptops hostname in the network settings. 
In my case my laptop's hostname is normally `Bebop` but for a short time I had manually changed it to test something. 
This caused me much confusion for weeks till I made the connection that it was the cause of the error I was seeing when running 
the `darwin-rebuild switch` command.  

This totally makes sense to me now, but drove me crazy for over a few weeks before I figured out why my flake wouldn't install.
Since there were no changes made in the git repo it wasn't obvious to me what had happened.

Hopefully this saves someone else from confusion in the future.
