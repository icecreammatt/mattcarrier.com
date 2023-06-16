---
title: Diffing contents of docker containers
date: 2023-06-15
tags:
    - "docker"
    - "fish"
---

Recently I worked on a project where a large refactor had taken place but I wanted to ensure that there was no changes to the built output of the docker container. So while the diff in Github was quite large with many files moved around the output should remain almost identical aside from a few extra files removed.

<!--more-->

To diff these containers I used the following methods:

- `mkdir temp && cd temp`
- `docker cp $IMAGE_NAME_A:/application/path .`
- `git init && git add . && git commit -m "initial commit"`
- `docker cp $IMAGE_NAME_B:/application/path .`
- `git status && git diff`

This work by dumping the contents of the first image (what is currently in prod) and then checking it into git for diffing and next coping contents of the replacement image over it. In this case I didn't need to diff the entire containr image so I only did the application output. This will show new additions and changes but it will not show removed files. So next I ded the same thing but in reverse to see any files that might hav been removed. So dump `$IMAGE_NAME_B` first and then copy the contents of `$IMAGE_NAME_A` on top of it. Files which are removed will show up as additions when running `git status`. In my case they were template files I didn't want in the final output.

> Fish alias I setup to make this easy
> ddmp (docker dump)

```bash
ddmp = "set image (docker ps | grep <CONTAINER_NAME_HERE> | choose -1) && docker cp $image:/etc/nginx/ .";
```