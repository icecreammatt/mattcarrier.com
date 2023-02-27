build:
	hugo --theme=vienna

watch:
	hugo server --theme=vienna --buildDrafts --watch --log=true

clean:
	rm -rf public/*