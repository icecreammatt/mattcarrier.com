# git
# eslint
# aws-cli

with (import <nixpkgs> {});

stdenv.mkDerivation rec {
let

  install = pkgs.writeScriptBin "nodeinstall" ''
    exec ${pkgs.nodejs-18_x}/bin/npm install
  '';

  build = pkgs.writeScriptBin "nodebuild" ''
    exec ${pkgs.nodejs-18_x}/bin/npm run build
  '';

in mkShell {
# stdenv.mkDerivation rec {
  name = "node-environment";

  buildInputs = [
      nodejs-18_x
      fish
      nodePackages.eslint
      nodePackages.prettier
      install
      build
      nodePackages.svelte-language-server
  ];

  shellHook = ''
    echo "Using node: ${nodejs-18_x.version}"
    fish
  '';
}
