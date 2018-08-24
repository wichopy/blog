---
title: Where to put your state modifiers when using mobx
date: "2017-09-30T23:33:32.169Z"
layout: post
draft: false
path: "/posts/where-to-put-your-state-modifiers"
category: "Development"
tags:
  - "MobX"
  - "Design"
  - "Architecting"
  - "React"
description: " I ran into a bug the other day that took me a bit to solve, but showed the importance of how to structure your app so you are using libraries within React correctly."
---

MobX

Put state modifiers in a component that wrapped another component.

The component was also observing and would attempt to auto update itself whenever I tried to change a value.

Put modifers in the components that need them, dont pass them down as props. No need to pass down as props as we have mobX.


