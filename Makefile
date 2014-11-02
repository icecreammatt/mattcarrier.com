watch:
	open http://localhost:1313/
	hugo server --theme=vanilla --buildDrafts --watch --log=true

clean:
	rm -rf public/*

