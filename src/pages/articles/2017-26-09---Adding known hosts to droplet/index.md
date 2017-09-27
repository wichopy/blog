---
title: Adding ssh keys to a DO droplet.
date: "2017-09-26T08:40:32.169Z"
layout: post
draft: false
path: "/posts/adding-ssh-key-to-droplet"
category: "Troubleshooting"
tags:
  - "ssh"
  - "Digital"
  - "Ocean"
  - "Ubuntu"
description: "Got stuck on this a few times and need to write this down so I don't forget again."
---

So adding ssh keys to your digital ocean account is not as easy as on github or bitbucket. DO gives the option to add ssh keys in a nice web UI, but only keys that were in the list before creating your droplet will work.

The web console for digital ocean is a nightmare. Its slow, and you can't copy and paste. To ge tany productivity you have to ssh into your droplet and use your local terminal.

To add a new ssh key after you already made a droplet (ie, you have multiple computers and want to access your droplet from all of them.) you will have to follow these steps.

Get the ssh key from your other machine or create one for your other machine if it does not exist.

~~~bash
# if you dont have a key
ssh-keygen
# yes to default name, then give it a password

# assuming you saved your key in the default location, very your public key.
cat ~/.ssh/id_rsa.pub

# copy and paste what gets printed in the terminal into a location that your other machine can access like an email or slack msg.

# In your machine that has an ssh key to DO, go to terminal and run:

ssh root@[your droplet ip here]

# Once you get in, go to:

cd ~/.ssh

# and open authorize_keys

nano authorized_keys

# grab the key you got from your other machine and paste it to the bottom

# ctrl + x to save

# Change the permissions of the file.

chmod 600 ~/.ssh/authorized_keys
~~~

Finally, try sshing in from your other machine, and it should work!

