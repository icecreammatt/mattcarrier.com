watch:
	open http://localhost:1313/
	cd themes/vanilla && $(MAKE) watch &
	hugo server --theme=vanilla --buildDrafts --watch --log=true

clean:
	rm -rf public/*

kill:
	killall goat