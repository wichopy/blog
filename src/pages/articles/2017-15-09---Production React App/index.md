---
title: Setting Up Multiple Node Apps on Digital Ocean with NGINX and PM2
date: "2017-09-18T09:33:32.169Z"
layout: post
draft: false
path: "/posts/setting-up-multiple-node-apps-digital-ocean-nginx-pm2"
category: "DEVOPS"
tags:
  - "NPM"
  - "Digital"
  - "Ocean"
  - "Ubuntu"
  - "PM2"
  - "React"
  - "Gatsby"
  - "Nginx"
  - "Systemctl"
  - "Reverse-proxy"
  - "Static Files"
description: "Following digital oceans guide to setting up a node app using ubuntu, nginx and pm2 was straightforward enough for simple node apps. After successfully deploying my gatsby blog and my express/GraphQL server, I spent a few hours banging my head on how to get my react production build to not show 404s or 403s."
---

When deciding to launch my own blog, picking my platform was a crucial step. I've worked with wordpress briefly in the past and I did not like how GUI heavy it was.

I managed to get a Github education pack, mainly for the 2 years of free premium github access, but it has a ton of other bonuses, $50 worth of Digital Ocean (DO) credits being one of them. Not really knowing what I was getting myself into, I decided to give DO a try.

## The Easy Part

Digital Ocean's guide for setting up a production node server using ubuntu, pm2, and nginx was very well written and easy to follow. You can view it here:

https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04

I always wanted to see how a web server is set up from scratch, as I've only used web hosts which abstracted most of this away from me or heroku which does everything for you. This exercise also forced me to up my VIM game as I could only interface with the DO droplet using ssh. 

I cloned my blog repo and after messing around with the swap file ( see previous post), I was able to run `gatsby build` and `gatsby serve` from within my project directory. **Great!**

In the tutorial, they run the `hello.js` server file by simply calling `pm2 start hello` inside of the project folder. To run my blog with PM2 using a custom start script, there was a slight modification needed.

~~~bash
pm2 start gatsby --no-automation --name blog -- serve
~~~

This is the same as running `gatsby build` but in a syntax that will work for pm2.

1. `gatsby` is the command I want to run. 
2. The --name flag allowed me to give a custom name to my app in pm2, otherwise it would have appeared as `gatsby`. 
3. The `--no-automation` flag prevents pm2 from restarting your app when it crashed. 
4. Anything after the final `--` would be appended to the gatsby command.

I reused this method to run my custom start script for my node server as well. The custom start script was needed as I used ES6 features in my server data models, and had to run the code using `babel-node`. If I was running none ES6 features, I could have just did `pm2 start server`. This is what my start script looked like:

~~~javascript
// package.json
// ...
"scripts": {
  "start": "nodemon ./server.js --exec babel-node -e js",
}
// ...
~~~

And this was my pm2 start command:

~~~bash
pm2 start npm --no-automation --name codenames-server -- run start
~~~

This command is equivalent to `npm start`.

Now setting up a react production build proved to be a bit harder..

## Running a Create-React-App in Production

The documentation for Create-React-App suggests the following to make a production build:

~~~bash
npm run build
npm install -g serve
serve -s build
~~~

so after building, I did another pm2 process with the following command:

~~~bash
pm2 start serve --name codenames -- -s build
~~~

Tried a reverse proxy again with the following code:
~~~nginx
        location /codenames {
                proxy_pass http://localhost:5000;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }

~~~

...but kept getting a 404 not found error.

After some more researching, I found this blog post:
https://www.peterbe.com/plog/how-to-deploy-a-create-react-app

So I tried this, pointing to where my build folder was. This time, I got a 403 forbidden error. I realized this was due to my build folder being inside my /root/ folder. This is fine when using the reverse proxy method, as the node app is forwarding all traffic to local host at the designated port, but this would not work when trying to serve the folder directly because of folder permissions. I didn't want to change them so I found an alternate method.

I copied the build folder to `/var/www/`. Nginx is already configured with this location as the default for static files so it made sense to keep using it.

Inside my NGINX file I point directly to my build folder which I renamed to the name of my app, `codenames`.

~~~nginx
server {
        listen 80 default_server;
        listen [::]:80 default_server;

        root /var/www;
        index index.html index.htm index.nginx-debian.html;

        server_name willchou.ca www.willchou.ca;

        location /codenames {
                try_files $uri /codenames/index.html;
                add_header      Cache-Control public;
                expires         1d;
        }

        # ... rest of configuration file.
}
~~~

Working like a charm now :) This would also be a good time to set up a development and production configuration for your projects. For me this meant updating my react client to point to willchou.ca/graphql and configuring my server to allow CORS on willchou.ca/codenames.
