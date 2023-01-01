# Building

## Requirements

- Hugo `0.108.0
- nix

## Local Development

- Run `nix-shell` followed by `hugo --theme=vienna serve` to run the site locally and visit `http://localhost:1313/` to review.

## Build

- To build site run `nix-shell` in the command line. This will use a pinned version of hugo (`0.108.0`) to ensure Hugo API changes do not break build as what happene between `0.54.0` and the current release.

## Release

- Build output will be generated into the `public` folder which is currently managed as another git branch `gh-pages` After satisifed with the build output when testing locally check this in an push changes to Github.

