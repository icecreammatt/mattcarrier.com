watch:
	hugo server --theme=vienna --buildDrafts --watch --log=true

clean:
	rm -rf public/*

build-container:
	hugo --theme=vienna
	docker build -t icecreammatt/mattcarrier.com .

clean-container:
	-docker kill mattcarrier.com
	-docker rm mattcarrier.com

push-container:
	docker push icecreammatt/mattcarrier.com

deploy:
	ssh icecreamcart "docker pull icecreammatt/mattcarrier.com"
	ssh icecreamcart "docker kill mattcarrier.com"

run-container:
	docker run -d -p 3000:80 --name mattcarrier.com icecreammatt/mattcarrier.com
