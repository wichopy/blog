---
title: The Beauty Of MobX
date: "2017-09-17T20:33:32.169Z"
layout: post
draft: false
path: "/posts/the-beauty-of-mobx"
category: "Development"
tags:
  - "MOBX"
  - "Decorators"
  - "Javascript"
  - "React"
  - "State Management"
  - "Front End"
description: "I finally got myself to implement a state management library instead of keeping all my state in App.js. After seeing some really good talks about the simplicity of MobX, I knew I needed to include it in my next React project. Here is my experience with refactoring my vanilla React app with a state management library!"
---

React makes it amazingly easy to create a dynamic web app, but you'll quickly realize that managing the state of your app can get ugly really tricky. When people hear of React, its tightly coupled with Redux since that is what Facebook uses. It doesn't necessarily mean its the best choice for every app though.

I've completed several courses on the subject, but I have still not been able to wrap my head around setting up my own project with Redux. Whenever I pick a library, I want to pick one that is easy to implement and gives me some freedom to architect my app the way I want. MobX met both these requirements, and I will discuss how easy and powerful it is.

## Add Decorators Support To Your React App.
  MobX uses a experimental feature called decorators in javascript. You don't have to use decorators, there is documentation of how to use MobX without them in the official docs, but the syntax is so much cleaner looking.

  The only way to use them is by npm installing a plugin and including it in your babel file.

  `npm install --save-dev babel-plugin-transform-decorators-legacy`

  Then in your .babelrc, or in my case, I had to npm run eject my create react app and modify the webpack.config.dev.js file, add the plugin to your babel configuration.

  #### Regular .babelrc file
  ~~~javascript
    // .babelrc file
    // ...
    "plugins": [
      "syntax-class-properties",
      "transform-decorators-legacy",
      "transform-class-properties"
    ]
    // ...
  ~~~

  #### Create React App webpack.congih:
  ~~~javascript
  // webpack.config.dev.js, from line 164
  // ...
  // Process JS with Babel.
  {
    test: /\.(js|jsx)$/,
    include: paths.appSrc,
    loader: require.resolve('babel-loader'),
    options: {
      plugins: ['transform-decorators-legacy'],
      // This is a feature of `babel-loader` for webpack (not Babel itself).
      // It enables caching results in ./node_modules/.cache/babel-loader/
      // directory for faster rebuilds.
      cacheDirectory: true,
    },
  },
  // ...

  ~~~


  Note that the order matters. The decorator plugin should always appear before the class properties plugin according to the author of this plugin.

## Move all your state modifiers and state variables into stores.
Now to start creating your stores. I group all my stores in a `Stores` folder inside my `src` folder.

![Folder Structure](/screenshot.png)

Group your stores logically based on what they will be used for. For example, if you're making a music player app, you may have a store for tracks and another one for playlists.

## @observable
Inside of these stores, import the observable object from mobx ( not mobx-react ) and decorate your store variables with them. Here's an example with a todo list:

~~~javascript
  import { observable } from 'mobx';
  class TodoStore {
    @observable todoItems = []

    addTodoItem = (item) => {
      this.todoItems.push(item)
    }
  }
~~~

## Instantiate all your stores in app.js

To use your stores, you must instantiate them somewhere. I chase to do this in my highest component, App.js. You only want one instance of each of these stores to exist so it would make sense to have them all instantiate at the same place to keep things organized.

~~~javascript
  class App extends Component {
    const musicStore = new MusicStore();
    const authStore = new AuthStore();
  }
~~~

## Pass store as props to all your components.

Now that we moved all our state into stores, and the stores are created in the app, its time to give components access to them. The simplest way of doing this is passing them down as props when you render your components.

~~~javascript
  // ...
  render() {
    return(
      <SomeComponent authStore={authStore}>
    )
  }
~~~

## observers

In your components, if you want them to update when your store changes, you will need to use the obersver object from mobx-react.

~~~javascript
import { observer } from 'mobx-react'

@observer
class SomeComponent extends Component {
  // ...
  render() {
    if (this.props.authStore.token) {
      return (
        <SomeSubComponentThatRequiresAToken />
      )
    }
    return <NoAccessComponent />
  }
}
~~~

This example component has the authStore as a prop and is decorated with the observer method. Whenever authStore changes, the component will check what changed and rerender. In this case, it will render depending on whether the authStore has a token or not.

## Let the magic happen.
  Let's summarize the checklist of what is needed to get MobX running in your app.
  + Install decorators plugin in babel.
  + Move all your state to stores.
  + Create/move your state mutation functions inside your store
  + Make your store's varables observable
  + Call your stores inside app.js
  + Pass stores down to the components that need them.
  + Make your components observers.
  
  Minimal hookup and now, whenever one component mutates a store, all components listening to that store will get the updates!
