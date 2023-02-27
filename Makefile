watch:
	hugo server --theme=vienna --buildDrafts --watch --log=true

build:
	hugo --theme=vienna

clean:
	rm -rf public/*