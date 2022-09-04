# eslint
# node 18
# git
# fish
# aws-cli

with (import <nixpkgs> {});
mkShell {
    buildInputs = [
        nodejs-18_x
    ];
}