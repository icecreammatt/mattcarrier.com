build:
	hugo --theme=vienna

deploy:
	./deploy.sh

watch:
	hugo server --theme=vienna --buildDrafts --watch

clean:
	rm -rf public/*