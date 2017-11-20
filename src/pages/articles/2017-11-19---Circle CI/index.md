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

It turns out for Jenkins, the biggest issue I kept running into was running my shell commands inside a jenkins file. In the future, I will instead write shell scripts.

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

Another issue I ran into was setting up the SSH Key. I pasted in an encrypted secret from my machine and kept getting FAIL when trying to save. There was no user feedback for what was going on. I ended up finding a stackoverflow post to find out that you can't paste encrypted SSH keys, only non-password protected ones.

For my next project I'll try out travis CI
