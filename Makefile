build:
	hugo --theme=vienna

deploy:
	./deploy.sh

watch:
	hugo server --theme=vienna --buildDrafts --watch --log=true

clean:
	rm -rf public/*