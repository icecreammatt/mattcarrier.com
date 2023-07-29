#!/usr/bin/env bash

make clean
nix build
git clone --branch gh-pages git@github.com:icecreammatt/mattcarrier.com public
cp -r result/* public/
pushd public/
git add .
git commit -m "updating"
git push
popd
