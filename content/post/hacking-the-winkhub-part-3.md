---
title: Cross compiling Go for Winkhub
date: 2015-08-28
tags:
    - "Winkhub"
    - "linux"
    - "Go"
---

How I cross compiled Go to run on the Winkhub and installed a custom web app to control the lights locally.

_TL;DR; Be sure to compile with Go 1.5 with the following settings:  
`GOOS=linux GOARCH=arm GOARM=5 go build .`_   
<!--more-->
<hr />

After seeing that the Winkhub uses [PHP](/post/hacking-the-winkhub-part-2#php) for its server-side scripting, I decided to see if I could run Go on it instead. That way I could avoid writing new code in PHP and get a bit more practice at Go. I had noticed when the Winkhub first boots over the serial connection, one of the first items on the screen is the CPU information.

`CPU:   Freescale i.MX28 rev1.2 at 454 MHz`

I wasn't sure what this CPU's architecture was, but after a quick search I figured out that it uses an ARM Processor. That gave me some hope that it was possible to compile Go for this platform.

I tried compiling a simple "hello world" program with the following command:

```
GOOS=linux GOARCH=arm go build .
```

I then copied the binary to the Winkhub and tried running it.

```
[root@flex-dvt ~]# ./helloworld
runtime: this CPU has no floating point hardware, so it cannot run
this GOARM=6 binary. Recompile using GOARM=5.
```

So I tried again with this:

```
GOOS=linux GOARCH=arm GOARM=5 go build .
```
No luck again!
```
[root@flex-dvt ~]# ./helloworld
Illegal Instruction
```

I did a bit of searching and came across this [issue](https://github.com/golang/go/issues/9795). This post made me think I ran the correct compile steps. I attemped this a few more times and then I had a thought to try the Go 1.5RC. I upgraded to the RC build and then tried the previous build command again.

```
[root@flex-dvt ~]# ./helloworld
Hello World
```

Boom! I was in business. So in the end the instructions are pretty simple:

* Make sure to use Go 1.5. 
* Set the GOOS to linux
* Architecture to arm 
* Use ARMv5 since the Winkhub does not have floating point support

```
GOOS=linux GOARCH=arm GOARM=5 go build .
```

I came up with a simple web service that allowed me to turn the lights on/off and adjust brightness. It is pretty basic right now, but I plan on adding other features such as a sleep timer and a time-of-day-based lighting schedule. I also plan to add support for door sensors that can trigger push notifications to my phone. The web service is broken into two parts. A server written in Go that runs on the Winkhub and a static client side JavaScript app which is served up from the Winkhub's web server. This can be ran along side the existing built in PHP scripts if you wish to continue to use the existing scripts on there.

## [GopherWink](https://github.com/icecreammatt/gopherwink) setup instructions 

[screenshots here](#screenshots)

### Building from source requirements

* [Rooted Winkhub](/post/hacking-the-winkhub-part-1/) with SSH access
* Go 1.5
* NodeJS
* ReactJS

### Install from source

* `export WINK_IP_ADDRESS=X.X.X.X` (replace the x's with the Wink IP)
* `git clone https://github.com/icecreammatt/gopherwink`
* `git submodule init && git submodule update`
* `cd frontend && npm install`
* `make deploy`
* `cd ..`
* `make build`
* `make install`
* Visit `http://WINK_IP_ADDRESS/index.html` to access the controls.

### Install release manually

* Download the release from [here](https://github.com/icecreammatt/gopherwink/releases)
* Extract the zip file
* `export WINK_IP_ADDRESS=X.X.X.X` (replace the x's with the Wink IP)
* `scp gopherwink root@$WINK_IP_ADDRESS:/root/gopherwink`
* `scp S63gopherwink root@$WINK_IP_ADDRESS:/etc/init.d/S63gopherwink`
* `scp index.html root@$WINK_IP_ADDRESS:/var/www`
* `ssh root@$WINK_IP_ADDRESS "mkdir /var/www/assets`
* `scp main.js root@$WINK_IP_ADDRESS:/var/www/assets/`
* `ssh root@$WINK_IP_ADDRESS "/etc/init.d/S63gopherwink start"`
* Visit `http://WINK_IP_ADDRESS/index.html` to access the controls.

## Usage notes
* New devices for now need to be connected using `aprontest` or the WinkApp

## Bugs
* File bugs [here](https://github.com/icecreammatt/gopherwink/issues)

## Future Plans
* Improved UI to add and remove lights
* Improved UI to rename devices
* Add Proper support for GoControl Door Window Sensors
* Sleep timer to keep light on for late nights
* Snooze timer to turn on light after x minutes
* Automatic brightness based on the time of day
* TLS Authentication for API

## License

GPLv3

This is the last part of a series of posts related to hacking the Winkhub

* [Part I - Hacking the Winkhub](/post/hacking-the-winkhub-part-1)
* [Part II - Troubleshooting Winkhub issues](/post/hacking-the-winkhub-part-2)
* Part III - Cross compiling Go for Winkhub

## <a href="#" id="Resources">Resources</a>
* <a href="http://dave.cheney.net/2015/08/22/cross-compilation-with-go-1-5" content="nofollow" target="_blank">Cross compilation with Go 1.5</a>
* <a href="https://github.com/golang/go/wiki/GoArm" content="nofollow" target="_blank">GoArm</a>
* <a href="http://unix.stackexchange.com/questions/59018/create-and-control-start-up-scripts-in-busybox" content="nofollow" target="_blank">Create and control start up scripts in BusyBox</a>

<div id="screenshots"></div>
## Screenshots
![Lights](/images/2015-08-28/Lights.PNG)
![Lights](/images/2015-08-28/LED.PNG)

