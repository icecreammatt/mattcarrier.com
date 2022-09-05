---
title: Troubleshooting Winkhub issues
date: 2015-08-26
image: '/images/2015-08-24/05.jpg'
tags:
  - 'Winkhub'
  - 'linux'
  - 'featured'
---

This post picks up where [part 1](/post/hacking-the-winkhub-part-1) left off. Here is some of the troubleshooting I had to go through since following the instructions did not go smoothly for me.

<!--more-->

By following the instructions [here](http://www.rootwink.com/viewtopic.php?f=6&t=4) (See step #5 specifically) I was able to preserve root access on the device. However, I still had issues with my device booting because when I restarted, it was stuck in a loop:

```
Starting lighttpd: OK
+ echo 'Launch upgrade script'
Launch upgrade script
+ /root/platform/run_upgrade.sh
+ FILE=/tmp/isalive
+ '[' '!' -e /tmp/isalive ']'
+ sleep 1
+ '[' '!' -e /tmp/isalive ']'
+ sleep 1
+ '[' '!' -e /tmp/isalive ']'
+ sleep 1
+ '[' '!' -e /tmp/isalive ']'
+ sleep 1
+ '[' '!' -e /tmp/isalive ']'
+ sleep 1
+ '[' '!' -e /tmp/isalive ']'
```

This loop may have occurred because I did not delete the upgrade script as suggested in the instructions. I was a bit afraid of bricking the device. To fix this, I rebooted again using the NAND hack I started with at the beginning, and then I modified the upgrade script in `/root/platform/run_upgarde.sh` by commenting out all the details and adding a `/bin/bash` at the bottom. While this worked and got me a shell after restarting, the aprond was not starting on its own. I suspect this is because the aprond is initialized after the upgrade script runs. Keep in mind at this point I have still never connected it to the internet using the iOS app.

I did some digging and figured out how to connect to the wifi. I added my SSID and WPA key.

Add a wifi key to `/database/wpa_supplicant.conf`

```
/ # cat /database/wpa_supplicant.conf
ctrl_interface=/var/run/wpa_supplicant
update_config=1
ap_scan=1
fast_reauth=1
bgscan=""

network={
    priority=2
    scan_ssid=1
    ssid="NETWORK_SSID_GOES_HERE"
    psk="XXX_PASSWORD_HERE_XXX"
}
```

> NOTE: The wifi password cannot be too long or contain spaces. (I suspect it cannot contain spaces) It took me a few reboots to figure this out. I happened to catch it complaining about the password in the output during the boot sequence.

Run this to start the wireless: `/ # ./etc/init.d/S41wireless start`

I finally got my wifi connected but the boot sequence was still stuck on this loop:

```
+ sleep 1
+ '[' '!' -e /tmp/isalive ']'
+ sleep 1
+ '[' '!' -e /tmp/isalive ']'
```

I was starting to get a bit desparate because I was not able to get any of the services to start. After being stuck in this boot state, I decided to run the upgrade script to see if that might fix anything. I'm not sure what firmware version I was running. After it finished rebooting, I was able to access the shell without having to do the NAND glitch. At this point, it was pretty late so I'm a bit fuzzy if there are any other details I'm missing.

I tested adding a light using the `aprontest` tool as mentioned in the forums I had been reading.

- `/ # aprontest -h` Help
- `/ # aprontest -a -r zigbee` Connect new device
- `/ # aprontest -l` List all the connected devices
- `/ # aprontest -u -m1 -t1 -vOFF` Turn light off
- `/ # aprontest -u -m1 -t1 -vON` Turn light on

_There was much rejoicing at 3:30 in the morning. Luckily it was Saturday so I could sleep in._

Before I went to bed I still wanted to see if I could set this up to be able to turn the lights on and off with curl. I found the web folder in `/var/www`. I created a few simple scripts to test turning the lights on and off from the command line.

<div id="php"></div>

**on.php**

```
<?php
	echo "Hello Light On";
	exec('aprontest -u -m1 -t1 -vON');
?>
```

**off.php**

```
<?php
	echo "Hello Light Off";
	exec('aprontest -u -m1 -t1 -vOFF');
?>
```

Great Success!  
I could now turn the lights on and off by running `curl http://192.168.1.11/on.php`

**brightness.php**

```
<?php
    if(isset($_GET['value'])) {
        $value = $_GET['value'];
        //if(ctype_digit($value) {
            echo "Setting brightness to " . $value;
            $cmd = "aprontest -u -m1 -t2 -v $value";
            exec($cmd);
        //} else {
            //echo 'Expected integer'
        //}
    }
?>
```

The brightness could be adjusted by running `curl http://192.168.1.11/brightness.php?value=150` Can you see the bug(s) I left in `brightness.php` where you can easily run any code as root by adjusting the value parameter? I'll leave this to an exercise for the reader. :)

As you can see in my commented-out bits of `brightness.php`, I prefer not to write PHP code. Especially at 4:00 in the morning. It wasn't until the next day I noticed the hole I left in the code by skipping the check for digits. I was really hoping that I could run some Go binaries on this device at this point...

- [Part I - Hacking the Winkhub](/post/hacking-the-winkhub-part-1)
- Part II - Troubleshooting Wink issues
- [Part III - Cross compiling Go for Winkhub](/post/hacking-the-winkhub-part-3)

## <a href="#" id="Resources">Resources</a>

- <a href="https://github.com/wink-hub-root/demystified/wiki/Connecting-to-wifi-manually" content="nofollow">Connecting to wifi manually</a>
- <a href="http://rootwink.com/viewtopic.php?t=12#p15" content="nofollow">Attaching Devices to Rooted Winkhub</a>
