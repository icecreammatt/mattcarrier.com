---
title: Setup CoreOS with iptables on DigitalOcean
date: 2015-05-11
tags:
  - 'coreos'
  - 'systemd'
  - 'iptables'
  - 'Docker'
  - 'linux'
---

This post covers how to setup CoreOS with iptables on DigitalOcean. It also covers how to start a Docker container using systemd to keep the container running after crashes and reboots.

<!--more-->

## Prepare cloud-config

> It is important to leave in the #cloud-config comment at the top.  
> reboot-strategy is set to off to prevent random restarts for updates

```
#cloud-config

coreos:
  update:
    reboot-strategy: off
  units:
    - name: iptables-restore.service
      enable: true
      command: start
write_files:
  - path: /var/lib/iptables/rules-save
    permissions: 0644
    owner: 'root:root'
    content: |
      *filter
      :INPUT DROP [0:0]
      :FORWARD DROP [0:0]
      :OUTPUT ACCEPT [0:0]
      -A INPUT -i lo -j ACCEPT
      -A INPUT -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT
      -A INPUT -p tcp -m tcp --dport 22 -j ACCEPT
      -A INPUT -p tcp -m tcp --dport 80 -j ACCEPT
      -A INPUT -p tcp -m tcp --dport 443 -j ACCEPT
      -A INPUT -p icmp -m icmp --icmp-type 0 -j ACCEPT
      -A INPUT -p icmp -m icmp --icmp-type 3 -j ACCEPT
      -A INPUT -p icmp -m icmp --icmp-type 11 -j ACCEPT
      COMMIT

```

### Droplet Settings

> Change region and size as needed.

1. Droplet Hostname
2. Select Size
3. Select Region
4. Available Settings
   - User Data
     - Copy data from `cloud-config` above into the user data box.
     - **IMPORTANT:** Be sure to include a newline character after the last line in the cloud config
5. Select the CoreOS Image
6. Add SSH Keys
7. Create Droplet

## SSH into Server

Connect to the server using the IP that displayed after creating the droplet. `ssh core@IP`

Confirm iptable rules have applied

```
core@core ~ $ sudo iptables -nvL
Chain INPUT (policy DROP 16 packets, 922 bytes)
 pkts bytes target     prot opt in     out     source               destination
    0     0 ACCEPT     all  --  lo     *       0.0.0.0/0            0.0.0.0/0
 2475   12M ACCEPT     all  --  *      *       0.0.0.0/0            0.0.0.0/0            ctstate RELATED,ESTABLISHED
    1    64 ACCEPT     tcp  --  *      *       0.0.0.0/0            0.0.0.0/0            tcp dpt:22
    0     0 ACCEPT     tcp  --  *      *       0.0.0.0/0            0.0.0.0/0            tcp dpt:80
    0     0 ACCEPT     tcp  --  *      *       0.0.0.0/0            0.0.0.0/0            tcp dpt:443
    0     0 ACCEPT     icmp --  *      *       0.0.0.0/0            0.0.0.0/0            icmptype 0
    0     0 ACCEPT     icmp --  *      *       0.0.0.0/0            0.0.0.0/0            icmptype 3
    0     0 ACCEPT     icmp --  *      *       0.0.0.0/0            0.0.0.0/0            icmptype 11

Chain FORWARD (policy DROP 0 packets, 0 bytes)
 pkts bytes target     prot opt in     out     source               destination
    0     0 DOCKER     all  --  *      docker0  0.0.0.0/0            0.0.0.0/0
    0     0 ACCEPT     all  --  *      docker0  0.0.0.0/0            0.0.0.0/0            ctstate RELATED,ESTABLISHED
    0     0 ACCEPT     all  --  docker0 !docker0  0.0.0.0/0            0.0.0.0/0
    0     0 ACCEPT     all  --  docker0 docker0  0.0.0.0/0            0.0.0.0/0

Chain OUTPUT (policy ACCEPT 1095 packets, 73391 bytes)
 pkts bytes target     prot opt in     out     source               destination

Chain DOCKER (1 references)
 pkts bytes target     prot opt in     out     source               destination
```

## Docker port binding

When running Docker containers, be sure to bind them to `0.0.0.0` to be accessible outside the firewall. If the intent is for the container to only be accessible internally, then be sure when specifying ports with the `-p` flag that `127.0.0.1:PORT:PORT` is used. Leaving off the `127.0.0.1` defaults to `0.0.0.0` making the container publicly available.

## systemd

### Unit File

Create a systemd unit file to make the container start when the server reboots or when a container crashes. The systemd unit file contains the information needed to start the Docker container.

Add the unit file here: `/etc/systemd/system`

Sample systemd unit file for a simple IP [lookup service](https://github.com/icecreammatt/lookup)
`/etc/systemd/system/lookup.service`

```
[Unit]
Description=Lookup
After=docker.service
Requires=docker.service

[Service]
TimeoutStartSec=0
Restart=always
ExecStartPre=-/usr/bin/docker kill lookup
ExecStartPre=-/usr/bin/docker rm lookup
ExecStartPre=/usr/bin/docker pull icecreammatt/lookup
ExecStart=/usr/bin/docker run -p 0.0.0.0:80:5000 --name lookup icecreammatt/lookup
ExecStop=/usr/bin/docker stop lookup

[Install]
WantedBy=multi-user.target
```

Some notes about the unit file:

- `ExecStartPre=-` The `-` right before the `/usr` means that this step is optional
- `-p 0.0.0.0:80:5000` Map port `5000` of the container to port `80` on the host and bind to `0.0.0.0`. Use `127.0.0.1` to make this container non publicly accessible.
- Do not use the `-d` flag with Docker when using a systemd unit file. Doing so will not allow systemd to track the running status properly.

### systemd commands

- After creating the unit file start the container: `systemctl start lookup.service`
- Start on system boot: `systemctl enable lookup.service`
- Stop from starting on reboot: `systemctl disable lookup.service`
- Stop the container: `systemctl stop lookup.service`
- When making changes to the systemd unit file run `systemctl daemon-reload` to update systemd
- The status of the container can be checked with `systemctl status lookup.service`
- `journalctl` can be used to view system logs

## Cloud-config continued...

Optionally systemd services can be added to the cloud-config removing the need to login to the server. The following adjustments cause the server to initialize with the lookup container after boot.

```
#cloud-config

coreos:
  update:
    reboot-strategy: off
  units:
    - name: iptables-restore.service
      enable: true
      command: start
    - name: lookup.service
      enabled: true
      command: start
write_files:
  - path: /var/lib/iptables/rules-save
    permissions: 0644
    owner: 'root:root'
    content: |
      *filter
      :INPUT DROP [0:0]
      :FORWARD DROP [0:0]
      :OUTPUT ACCEPT [0:0]
      -A INPUT -i lo -j ACCEPT
      -A INPUT -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT
      -A INPUT -p tcp -m tcp --dport 22 -j ACCEPT
      -A INPUT -p tcp -m tcp --dport 80 -j ACCEPT
      -A INPUT -p tcp -m tcp --dport 443 -j ACCEPT
      -A INPUT -p icmp -m icmp --icmp-type 0 -j ACCEPT
      -A INPUT -p icmp -m icmp --icmp-type 3 -j ACCEPT
      -A INPUT -p icmp -m icmp --icmp-type 11 -j ACCEPT
      COMMIT
  - path: /etc/systemd/system/lookup.service
    permissions: 0644
    owner: 'root:root'
    content: |
        [Unit]
        Description=Lookup
        After=docker.service
        Requires=docker.service

        [Service]
        TimeoutStartSec=0
        Restart=always
        ExecStartPre=-/usr/bin/docker kill lookup
        ExecStartPre=-/usr/bin/docker rm lookup
        ExecStartPre=/usr/bin/docker pull icecreammatt/lookup
        ExecStart=/usr/bin/docker run -p 0.0.0.0:80:5000 --name lookup icecreammatt/lookup
        ExecStop=/usr/bin/docker stop lookup

        [Install]
        WantedBy=multi-user.target

```

## Dockerhub Authentication

Add the two blocks below to allow pulling from a private Docker repository. Replace the `XXXXXXXXX` below with the Dockerhub password from `~/.dockercfg`. This file is generated after logging into Dockerhub.

```
  - path: /home/core/.dockercfg
    owner: 'core:core'
    permissions: 0644
    content: |
        {
            "https://index.docker.io/v1/": {
                "auth": "XXXXXXXXXXXX",
                "email": "dockerhub@email"
            }
        }

```

Add `User=core` to run the task as the core user

```
[Service]
User=core
...
```

## Other resources

- <a href="https://fedoraproject.org/wiki/How_to_edit_iptables_rules" target="_blank">How to edit iptables rules</a>
- <a href="http://www.jimmycuadra.com/posts/securing-coreos-with-iptables" target="_blank">Securing CoreOS with iptables</a>
- <a href="http://www.robhar.com/securing-coreos/" target="_blank">CoreOS Iptables</a>
- <a href="https://coreos.com/docs/launching-containers/building/registry-authentication/" target="_blank">Using Authentication for a Registry</a>
