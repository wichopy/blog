---
title: Why is my npm installed getting killed?
date: "2017-09-14T08:40:32.169Z"
layout: post
draft: false
path: "/posts/why-is-my-npm-getting-killed"
category: "Troubleshooting"
tags:
  - "NPM"
  - "Digital"
  - "Ocean"
  - "Ubuntu"
description: "I tried to install a project on my digital ocean account and it kept dying, this is why..."
---

So as I was trying to get this blog up and running in production, I was having issues getting the `node_modules` in my gatsby project. I'd run `npm install` and it would freeze up and give me a **`Killed`** error. 

After some googling, I isolated the problem to an insufficiently sized swap file. I increased it following this guide:
https://www.digitalocean.com/community/questions/npm-gets-killed-no-matter-what?answer=18115

I was running on Ubuntu 16.04, the code snippet is here:
~~~bash
sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
sudo swapon --show
sudo cp /etc/fstab /etc/fstab.bak
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
sudo sysctl vm.swappiness=10
echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf
sudo sysctl vm.vfs_cache_pressure=50
echo 'vm.vfs_cache_pressure=50' | sudo tee -a /etc/sysctl.conf
~~~

This increased the swap file from 500 MB to 1 GB, resolving my issue, whoo!
