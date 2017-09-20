---
title: Switching to MobX Store Injection.
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
description: "One of the things I hated doing with React is passing props down to nested components. Say you have a tiny component that needs some state from app.js, but its nested 5 levels deep and all the other components don't need that data. You would have to pass all your props down through every child until you reach your desired component. With MobX's inject functionality, you can decide exactly which component gets the desired stores in 4 lines of code!"
---

## Stumbled Upon Something Wonderful
When I first started learning React, we were told to keep all our state and mutating functions in the root parent component, and pass them down to the children. This was to keep things simple with no state management framework in place. This gets annoying very quickly, as you'll find yourself passing the same props over and over when you have a complex nested component tree.

I was doing some research on react-router with mobx and came across a nice boiler plate [here](https://github.com/mhaagens/react-mobx-react-router4-boilerplate). I started seeing this `@inject` decorator everywhere and was really excited to find that the author wasn't passing stores around like the [example](https://github.com/GPMDP/google-play-music-desktop-remote) MobX project I was referencing for my app. I knew I wanted to refactor my personal project to use this pattern and relieve myself of having to pass unused props down to a component.

## Multiple stores
I saw that that boilerplate only had a single store that was accessed by all his props. I wanted to keep my structure of multiple stores so my logic would stay the same and the refactor would be minimal. I found this nice github [issue](https://github.com/mhaagens/react-mobx-react-router4-boilerplate/issues/29) that gave me my last missing piece.

## How to refactor your project

I'll now go over an example of how to refactor your components to use inject

I was instantiating my stores in my App.js component and passing them down to my components. To use inject, you need to use the Provider object in the 'mobx-react' library.

This is what my code looked like before:

~~~javascript
  const authStore = new AuthStore();
  const sessionStore = new SessionStore();

  class App extends Component {
    // ...
    render() {
      return <div className="app">
        <SomeComponent authStore={authStore} />
        <SomeOtherComponent authStore={authStore} sessionStore={sessionStore}/>
      </div>
    }
  }
~~~

I moved the store instantiation to the index.js file, where app.js is rendered into the DOM. Here, I wrapped the app component with the MobX Provider.

~~~javascript
import { Provider as MobxProvider } from 'mobx-react'

// ...

const authStore = new AuthStore();
const sessionStore = new SessionStore();

// ...

ReactDOM.render(
  <MobxProvider 
    authStore={authStore}
    sessionStore={sessionStore} >
      <App />
  </MobxProvider>,
  document.getElementById('root'));
~~~

I aliased the Provider to MobxProvider as I was also using Apollo which has its own provided, and wanted to make them distinguishable. We can now import inject and call our stores based on what we put as the name in the MobxProvider. App.js will now look like this.

~~~javascript
  import { inject } from 'mobx-react'
  // ...

  @inject('authStore', 'sessionStore')
  class App extends Component {
    // ...
    render() {
      return <div className="app">
        <SomeComponent />
        <SomeOtherComponent />
      </div>
    }
  }
~~~

To use inject in other components, simply use @inject with whatever stores your want in the parentheses. 

My project is now refactored with inject decorators which makes it a lot easier to know what stores are being used in the component, and **FINALLY** I have nice clean child components that have minimal props passed down to them.

###Sources:

Browsed this boilerplate:
https://github.com/mhaagens/react-mobx-react-router4-boilerplate

Used this react-native project as a reference for my codenames app:
https://github.com/GPMDP/google-play-music-desktop-remote

Look at this issue to see how to pass multiple stores:
https://github.com/mhaagens/react-mobx-react-router4-boilerplate/issues/29
