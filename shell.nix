with import <nixpkgs> {};

let
  # Import Hugo 0.108.0 in future so compatibility issues are avoided
  pkgsHugo = import (builtins.fetchTarball {
    url = "https://github.com/NixOS/nixpkgs/archive/ddc33509516c5e3b1a3e5099dfde07c94c032ba3.tar.gz";
  }) {};
  hugo = pkgsHugo.hugo;
in
stdenv.mkDerivation {
    name = "hugo-0.108";

    buildInputs = [ hugo ];

    shellHook = ''
      hugo --theme=vienna
    '';

}
