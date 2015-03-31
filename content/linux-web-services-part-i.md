---
title: Linux web services Part I
date: 2014-07-11
tags: 
    - "linux"
---
This is an introduction to a series of talks about setting up Linux servers. I'm going to make the assumptions that you already have some experience at the command line whether it is Mac or Windows so I will not be explaining basic commands in order to keep these talks with in a one-hour time frame. This talk will be done with the assumption you are using a Mac, but you can also follow along using [cygwin](http://cygwin.com) on Windows.

Resources for this talk are available here [https://github.com/icecreammatt/server-setup](https://github.com/icecreammatt/server-setup)

## Table of Contents
* Public Private Key Creation
* Instance Creation (DigitalOcean)
* SSH Connection
* Lockdown
* Update & Upgrade
* Software Installation
* Configuration & Debugging
* Shell Scripting
* Git
* Gotchas

## Prerequisites
* OSX Terminal or [Cygwin](http://cygwin.com)
* [DigitalOcean](https://www.digitalocean.com) hosting account or access to a fresh Ubuntu 14.04 install

## Public Private Keys

To securely connect to a server we must not rely on passwords. So instead we use public/private key authentication. Using the same public keys that git uses for SSH we can also login to remote servers we configure to accept our key.

### Key Generation

Before generating a key check to see if you don't already have one.  
If the output looks like below you can just use the existing public key to connect to the new server.

```bash
$ ls ~/.ssh
id_rsa      id_rsa.pub
```

Otherwise generate a new public private key pair.

```bash
$ ssh-keygen -t rsa -C "name@example.com"
Generating public/private rsa key pair.
Enter file in which to save the key (/Users/matt/.ssh/id_rsa): id_rsa_example
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in id_rsa_example.
Your public key has been saved in id_rsa_example.pub.
The key fingerprint is:
e5:03:12:9c:40:7e:f3:f9:39:4c:1f:0b:07:04:7f:bd name@example.com
The key's randomart image is:
+--[ RSA 2048]----+
|   .oo.....      |
|   .  o. o   .   |
|    . + . + . .  |
|     . + = o   . |
|        S = o E  |
|         + * o   |
|          = o    |
|           .     |
|                 |
+-----------------+
$ ls
id_rsa_example     id_rsa_example.pub
```

> The command below is specific to OSX and will not work in Cygwin  
Copy the contents of the public key to the clipboard

**IMPORTANT!** Be sure to copy the file that ends in ".pub"
```bash
$ pbcopy < id_rsa_example.pub
```
> If using cygwin navigate to `C:\cygwin\home\username\.ssh\`  
> Open `id_rsa_example.pub` in a text editor to copy the contents

```
$ cat id_rsa_example.pub
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDoROCEGpranbMr7Uj9Un3zPZAtYA4VgEqinTNSOnsJ5+oxpMrW0sV8/AUial3hxGVJK/UFsURmjGWg0liN9CGwNrnwGufDyG/SBpbRdFk8jwxLXQgiyTjbrNKlhhK0AWFTeajPsoXHE1jycEu4/G1oaewQ+se7055qsN3RIFLkpYj0VSsy/fjaZH5BPk+NtFQOc7yO7Nqs+x7nORsoLVyie2YhQSzzFBM23RMFmnf6qdrdARKwm98J8tpUqkILzCas9NG679fPxHMHGw/b2QPLr0I3LblE4c1IcIXIQPTniEm5lMjWkw7Ggf4AEg1PbWLcb5MvUwGuo8k6+ZsS1tYh name@example.com
```

### Uploading Keys

1. Login to DigitalOcean
2. On the DigitalOcean dashboard select SSH Keys
3. Add SSH Key
4. Enter a name for it and paste the contents into the body.
5. Create SSH Key

## Instance Creation (Create Droplet)

> DigitalOcean calls each server instance a "droplet"

![xkcd.com/910](/content/images/2014/Jul/permanence.png)

1. Click Create Droplet
2. Enter a hostname for your server
4. Select a size (I recommend 512MB RAM for starting)
5. Select Region
6. Select Image Ubuntu 14.04 x64 (LTS)
7. Add your key, which was uploaded earlier
8. Create Droplet

## SSH Connection

Once the loading bar has completed and we have an IP address we are ready to connect to the server.

We can connect to the server using the `ssh` command. Our public key has been automatically added to the server from the DigitalOcean control panel so our private key will work as the "password".

```bash
$ ssh root@107.170.203.120
The authenticity of host '107.170.203.120 (107.170.203.120)' can't be established.
RSA key fingerprint is 5b:13:e0:0e:d9:44:5a:1a:49:b5:12:0e:3c:d4:0d:8d.
Are you sure you want to continue connecting (yes/no)?yes
```

After connecting you should see this.

```bash
Warning: Permanently added '107.170.203.120' (RSA) to the list of known hosts.
Welcome to Ubuntu 14.04 LTS (GNU/Linux 3.13.0-24-generic x86_64)

 * Documentation:  https://help.ubuntu.com/

  System information as of Fri Jul 11 01:06:53 EDT 2014

  System load:  0.0               Processes:           71
  Usage of /:   6.1% of 19.56GB   Users logged in:     0
  Memory usage: 9%                IP address for eth0: 107.170.203.120
  Swap usage:   0%

  Graph this data and manage this system at:
    https://landscape.canonical.com/

root@setup-demo:~#
```

## Lockdown

We are now logged into the server, which right now is almost wide open to the internet. It is time to lock it down with the following steps:

### User account creation

Create a sudo user account

```bash
username=YOUR_NAME_HERE
addgroup admin
adduser $username
usermod -a -G admin $username
```

Full output

```bash
  root@setup-demo:~# username=matt
  root@setup-demo:~# addgroup admin
  Adding group `admin' (GID 1000) ...
  Done.
  root@setup-demo:~# adduser $username
  Adding user `matt' ...
  Adding new group `matt' (1001) ...
  Adding new user `matt' (1000) with group `matt' ...
  Creating home directory `/home/matt' ...
  Copying files from `/etc/skel' ...
  Enter new UNIX password:
  Retype new UNIX password:
  passwd: password updated successfully
  Changing the user information for matt
  Enter the new value, or press ENTER for the default
  	Full Name []: Matt Carrier
  	Room Number []:
  	Work Phone []:
  	Home Phone []:
  	Other []:
  Is the information correct? [Y/n]
  root@setup-demo:~# usermod -a -G admin $username
```

Copy over SSH public key to new account and set permissions to the owner

```bash
mkdir -p /home/$username/.ssh/
cp ~/.ssh/authorized_keys /home/$username/.ssh/authorized_keys
chmod -R 750 /home/$username
chown -R $username:$username /home/$username/
```

### SSH Server lockdown

2. Disable password authentication

    `echo "PasswordAuthentication no" >> /etc/ssh/sshd_config`

3. Disable root login

```
sed -i 's/PermitRootLogin without-password/PermitRootLogin no/g' /etc/ssh/sshd_config
sed -i 's/PermitRootLogin yes/PermitRootLogin no/g' /etc/ssh/sshd_config
sed -i 's/PasswordAuthentication yes/PasswordAuthentication no/g' /etc/ssh/sshd_config
```

4. Only allow login from selected users

```bash
echo "AllowUsers $username" >> /etc/ssh/sshd_config
```

5. Restart ssh server

```bash
service ssh restart
```

### Firewall & fail2ban

5. Setup ufw (Ubuntu Firewall)

```bash
    # ufw (Ubuntu Firewall)
    ufw default deny incoming
    ufw default allow outgoing

    # Open SSH
    ufw allow ssh

    # Open web ports
    ufw allow 443/tcp
    ufw allow 80/tcp

    # Enable firewall and fail2ban
    ufw --force enable
```

6. Setup fail2ban

`apt-get install -y fail2ban`


8. Confirm status

```bash
    root@setup-demo:~# ufw status
    Status: active

    To                         Action      From
    --                         ------      ----
    22                         ALLOW       Anywhere
    443/tcp                    ALLOW       Anywhere
    80/tcp                     ALLOW       Anywhere
    22 (v6)                    ALLOW       Anywhere (v6)
    443/tcp (v6)               ALLOW       Anywhere (v6)
    80/tcp (v6)                ALLOW       Anywhere (v6)

    root@setup-demo:~# service fail2ban status
     * Status of authentication failure monitor
     *  fail2ban is running
```

7. Ensure you can connect from a **new terminal window** before disconnecting

```bash
    $ ssh YOUR_USERNAME@SERVER_IP
```

## Updating & Upgrading

1. Set the time zone to your choice

    > NOTE: I had to run `$ tzconfig` before the above command would work for me.

```bash
    $ dpkg-reconfigure tzdata
```

2. Update server to latest software

    > `apt-get update` will fetch all the latest updates.  
    > `apt-get upgrade` will apply updates.

```bash
    $ apt-get update && apt-get upgrade -y
    ...
    # Make sure you are able to reconnect from a new window before this step
    $ shutdown -r now
```

## Software Installation

![](/content/images/2014/Jul/sandwich.png)

Basic utilities to install

```bash
sudo apt-get install -y htop zsh tree git vim nginx nodejs make npm cmake python-dev
```

* htop - processor monitor
* tree - tree view directories
* git - the stupid content tracker
* vim - text editor
* nginx - web server / reverse proxy
* make - build tools
* cmake - more build tools
* python-dev - even more building tools

## Configuration & Debugging
* nginx - `sudo vim /etc/nginx/sites-enabled/default`  
    `sudo service nginx restart`

* ssh - `sudo vim /etc/ssh/sshd_config`  
    `sudo service ssh restart`

* logs`/var/log`  
    `sudo tail -f /var/log/nginx/access.log`

## Shell Scripting

```bash
#!/bin/bash

# This is a comment
echo "Hello World"

# make script executable
chmod a+x hello.sh

# execute script
./hello.sh
```

## Git remote repository

On the remote machine
```bash
$ mkdir ~/web-project-name.git
$ git init --bare ~/web-project-name.git
```

From local machine
```bash
$ cd ~/projects/web-project
$ git remote add web-hostname YOUR_USERNAME@SERVER_IP:web-project-name.git
$ git push web-hostname master
```

* Githooks
    * post-update for deployment

> Challenge: Setup the git post-update hook to deploy website

## Gotchas

* ctrl + z by accident?
    * fg to foreground the application
* Need to use sudo user to launch node on port 80
    * `sudo node app.js`
    > NOTE: Running nodejs with sudo is not a very secure thing to do. NodeJS apps should really be setup with nginx through a reverse proxy

## Next time
* Automation
    * Ansible
* PaaS
* Docker
* Dokku

## Future talk ideas
* Nginx Setup with NodeJS
* DNS
* Monitoring
* Automation deep dive
* AWS
    * Basics
    * Security Groups
    * EC2
    * Load Balancing
    * etc...
* Continuous Integration

