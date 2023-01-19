watch:
	hugo server --theme=vienna --buildDrafts --watch --log=true

build:
	nix-shell --pure

clean:
	rm -rf public/*