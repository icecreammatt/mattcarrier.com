# git
# eslint
# aws-cli

with (import <nixpkgs> {});

    #exec ${pkgs.nginx}/bin/nginx -c ${./nginx.conf} "$@"
    #exec ${pkgs.nginx}/bin/nginx -p ./.svelte-kit/output/prerendered/pages "$@"

    #cp ${./.svelte-kit/output/prerendered/pages} $out/usr/share/nginx/html/
    # cp ${./.svelte-kit/output/prerendered/pages} $out/${pkgs.nginx}/html
let
  nginx-with-config = pkgs.writeScriptBin "nginx" ''
    exec ${pkgs.nginx}/bin/nginx "$@"
  '';

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
      nginx-with-config
      nodePackages.svelte-language-server
  ];

  shellHook = ''
    echo "Using node: ${nodejs-18_x.version}"
    fish
  '';
}
