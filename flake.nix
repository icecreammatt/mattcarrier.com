{
  description = "Hugo Builder";

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

    vienna = {
      url = "github:icecreammatt/vienna/mattcarrier-2022";
      flake = false;
    };
  };

  outputs = {
    self,
    nixpkgs,
    vienna,
    ...
  } @ inputs:
    inputs.utils.lib.eachSystem [
      # Add the system/architecture you would like to support here. Note that not
      # all packages in the official nixpkgs support all platforms.
      "x86_64-linux"
      "aarch64-linux"
      "x86_64-darwin"
      "aarch64-darwin"
    ] (system: let
      pkgs = import nixpkgs {inherit system;};
    in {
      # This block here is used when running `nix develop`
      devShells.default = pkgs.mkShell rec {
        # Update the name to something that suites your project.
        name = "website";

        packages = with pkgs; [hugo];

        buildPhase = "
          mkdir themes
          ln -sf ${vienna} themes/vienna
          make build
        ";

        # Setting up the environment variables you need during development.

        # Todo figure out why I can't use clang on Asahi but can on Darwin
        # Use "clang++" for most systems but OSX Asahi requires g++ for some reason or a runtime error occurs
        shellHook = let
          # This is for an icon that is used below for the command line input below
          icon = "f121";
        in ''
          export PS1="$(echo -e '\u${icon}') {\[$(tput sgr0)\]\[\033[38;5;228m\]\w\[$(tput sgr0)\]\[\033[38;5;15m\]} (${name}) \\$ \[$(tput sgr0)\]"
        '';
      };

      # This is used when running `nix build`
      packages.default =
        pkgs.stdenv.mkDerivation {
          name = "website";
          version = "0.0.1";

          src = self;

          buildInputs = [pkgs.hugo];

          buildPhase = "
        mkdir -p themes
        ln -sf ${vienna} themes/vienna
        make build
      ";

          installPhase = ''
            cp -r public $out
          '';

          meta = {
            homepage = "github.com/icecreammatt/mattcarrier.com";
            description = "Website";
          };
        };
    });
}
