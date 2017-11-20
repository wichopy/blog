---
title: obsessed with CI
date: "2017-11-19T08:40:32.169Z"
layout: post
draft: false
path: "/posts/Obsessed-with-CI"
category: "Devops"
tags:
  - "CIRCLECI"
  - "Digital"
  - "Ocean"
  - "Ubuntu"
  - "Deploying"
  - "Automation"
description: "After setting up Jenkins pipeline at work I wanted to give another platform a try to compare..."
---

Setting up an automated deployment pipeline at work was both frustrating and extremely rewarding. Watching the console logs was like a sporting event, waiting to see what happens next. Will the build fail? Did my tests work? Why do I keep getting this error?!

It turns out for Jenkins, the biggest issue I kept running into was running my shell commands inside a jenkins file. Jenkins has some really weird [idiosychroses](https://gist.github.com/Faheetah/e11bd0315c34ed32e681616e41279ef4) that kept breaking my tests. In the future, I will instead write shell scripts.

Circle CI is a much more well thought out service, and rightfully so as it is a paid service. One of the issues I kept running into was looking at version 1.0 documentation instead of 2.0 for the config.yml. After realizing that silly mistake, I ran into another issue with deploying.

~~~yml
      #Good
      - deploy:
          command: |
            if [ "${CIRCLE_BRANCH}" == "staging" ];
              then scp -r public $DROPLET_USER@$DROPLET_IP:/var/www/blog/;
            fi

      # Bad
      - deploy:
        command: |
          if [ "${CIRCLE_BRANCH}" == "staging" ];
            then scp -r public $DROPLET_USER@$DROPLET_IP:/var/www/blog/;
          fi

~~~

Hard to catch but the first example has the command indented twice ( 4 spaces while the bottom has the command indented once (2 spaces)

Another issue I ran into was setting up the SSH Key. I pasted in an encrypted secret from my Droplet and kept getting FAIL when trying to save. There was no user feedback for what was going on. I ended up finding a stackoverflow post to find out that you can't paste encrypted SSH keys, only non-password protected ones. I'll put in an issue for this as for such a quality product it missed this annoying UX issue.

The biggest issue I ran into was trying to scp files to my digital ocean droplet. I kept getting stuck trying to accept a new ssh key.

~~~bash
The authenticity of host 'xxx.xxx.xx.xxx (xxx.xxx.xx.xxx)' can\'t be established.
ECDSA key fingerprint is 72:a7:92:ec:ab:fd:f1:42:68:66:06:e5:2f:9b:c2:c8.
Are you sure you want to continue connecting (yes/no)? Step was canceled
~~~

I ended up resolving the issue using [this post](https://discuss.circleci.com/t/scp-using-public-key/11094/4) and following [this](https://medium.com/@lewdaly/circleci-docker-digital-ocean-409628f5a428) guide.

For my next project I'll try out travis CI and get a complete picture of the three major platforms.
