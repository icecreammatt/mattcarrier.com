#!/usr/bin/env bash

make clean
nix build
rm -rf ./public
git clone --branch gh-pages git@github.com:icecreammatt/mattcarrier.com public
cp -r --no-preserve=mode result/* public/
pushd public/
echo "www.mattcarrier.com" > CNAME
git add .
git commit -m "updating"
git push
popd
