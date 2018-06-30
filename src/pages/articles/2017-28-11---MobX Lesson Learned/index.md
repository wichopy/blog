---
title: How to use MobX
date: "2017-11-28T23:40:32.169Z"
layout: post
draft: false
path: "/posts/how-to-use=-mobx"
category: "Development"
tags:
  - "mobx"
  - "react"
  - "state management"
  - "observable"
description: "MobX has been stellar to use. When I was first using it, I noticed my UI did not update until I refereshed the page for certain actions. I thought simply adding a `@action` decorator to my class methods would fix everything and did hacky things like calling a force update on my component. After a few months of diving deeper into the library and learning how to use it properly, here are some tips for how to use MobX"
---

1. Whatever you set in the constructor will be your observables for your app session.

2. Inject everywhere instead of passing props.

3. Update your babel config files so you can write tests for your stores!

4. encapsulate methods for easier readability.

5. Injecting dependencies for mocks.

6. Use setState as little as possible.


