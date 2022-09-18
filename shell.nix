# git
# eslint
# aws-cli

with (import <nixpkgs> {});

stdenv.mkDerivation rec {
  name = "node-environment";
  buildInputs = [
      nodejs-18_x
      fish
      nodePackages.eslint
      nodePackages.prettier
  ];
  shellHook = ''
    echo "Using node: ${nodejs-18_x.version}"
    fish
  '';
}
