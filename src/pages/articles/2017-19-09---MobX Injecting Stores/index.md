---
title: Switching to MobX store injection.
date: "2017-09-19T23:33:32.169Z"
layout: post
draft: false
path: "/posts/mobx-store-injection"
category: "Development"
tags:
  - "MobX"
  - "MobX-react"
  - "Refactoring"
  - "Inject"
  - "Store"
  - "State Management"
  - "Decorators"
  - "Providers"
description: "One of the things I hated doing with React is passing props down to nested components. Say you have a tiny component that needs some state from app.js, but its nested 5 levels deep and all the other components don't need that data. You would have to pass all your props down through every child until you reach your desired component. With MobX's inject functionality, you can decide exactly which component get the desired stores in 4 lines of code!"
---

When I first started learning React, we were told to keep all our state and mutating functions in the root parent component, and pass them down to the children. This was to keep things simple with no state management framework in place.

This gets annoying very quickly, as you'll find yourself passing the same props over and over when you have a complex nested component tree.

I was doing some research on react-router with mobx and came across a nice boiler plate [here](https://github.com/mhaagens/react-mobx-react-router4-boilerplate). I started seeing this `@inject` decorator everywhere and was really excited to see that he wasn't passing his stores around like the [example](https://github.com/GPMDP/google-play-music-desktop-remote) MobX project I was referencing for my app.

Saw that that boilerplate only had a single store that was accessed by all his props. I wanted to keep my structure of multiple stores that were made for different criteria. Found this nice github [issue](https://github.com/mhaagens/react-mobx-react-router4-boilerplate/issues/29) that gave me my last missing piece.

Code is now refactored with inject decorators which makes it a lot easier now to know what store is being used in the component, and finally I have nice clean child components that have minimal props passed down to them.

###Sources:

Browsed this boilerplate:
https://github.com/mhaagens/react-mobx-react-router4-boilerplate

Used this react-native project as a reference for my codenames app:
https://github.com/GPMDP/google-play-music-desktop-remote

Look at this issue to see how to pass multiple stores:
https://github.com/mhaagens/react-mobx-react-router4-boilerplate/issues/29
