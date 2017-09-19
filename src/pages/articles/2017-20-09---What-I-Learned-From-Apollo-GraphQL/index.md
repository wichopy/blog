---
title: GraphQL and Apollo
date: "2017-09-20T12:40:32.169Z"
layout: post
draft: false
path: "/posts/what-i-learned-from-graphql"
category: "Development"
tags:
  - "GraphQL"
  - "Apollo"
  - "React"
  - "JWT"
  - "Authentication"
  - "Realtime"
description: "I've launched a React implementation of a boardgame called Codenames. I took this opportunity to learn GraphQL instead of sticking with a traditional REST framework. These are the lessons I learned along the way"
---

I've been hearing about GraphQL and how it is going to replace REST in a few years once people catch on. Being the curious person I am, I wanted to see what the hype was all about.

    "GraphQL makes me never want to touch REST again."

## No more overfetching and under fetching.

## Schema gives you the perfect high level view of your API.

## Client framework of choice: *Apollo*

## Real-time updates with subscriptions

It was super easy to set up a 'push notification' server sync using graphql's subscription type. Before we talk about it though I should mention the alternate methods to getting updates pushed to your front end without subscriptions.

### Polling
The least efficient way of getting updates, the client will continually check the server for updates at a specified time interval.

~~~javascript
export default graphql(GraphQLQuery, {
  options: { pollInterval: 5000 },
})(Component);
~~~

This is a quick and dirty method if you're short on time and need to get something out the door ASAP, but its a nightmare when you want to debug. Also, depending how big your queries are, this will suck up a ton of data on mobile plans. Let's look at some other options.

### Refetch Queries
Inside of your **this.props.mutate** call, you have the option of also having an array of queries you want to refetch.

~~~javascript
this.props.mutate({
  variables: someVariable,
  refetchQueries: [ { query: someGQLQuery }, { query: someOtherGQLQuery }]
}).then((res) => {
  // do async stuff here.
});
~~~

This is great for your specific instance of the app, but other clients that need those updates will not know something changed on the server.

## Authentication and Sessions
I wanted to keep everything on one endpoint on the server, including authentication. My game had user specific views, a player view and a spymaster view. Spymasters can see the colors of the squares, while players would not know until they selected a word. So how do we solve this?

To keep things simple, I made it so anyone that knows the game url could view the game board, but only someone that was authenticated could access spymaster specific functions.

Assign a JWT token to authenticated users
using applymiddleware.
local storage.

on server, check for a token from the request header.
if found, show spymaster data, otherwise show the player data.

Inside of App.js:

~~~javascript
networkInterface.use([{
  applyMiddleware(req,next) {
    let token = AuthService.getToken()
    if (!req.options.headers) {
      req.options.headers = {}
    }
    if (token) {
      Object.keys(authCallbacks).forEach(key => authCallbacks[key]() )
      req.options.headers.authorization = `Bearer ${token}`
    }
    next()
  },
}]);
~~~
Inside of Login.js component

~~~javascript
const handleLogin = () => {
  console.log('loggin in...')
    props.mutate({
      variables: { password: state.password },
    }).then(token => {
      AuthService.cachetoken(token.data.loginAsSpymaster)
      return
    }).then( () => {
      props.callbacks.WordCellGridRefetch()
      return
    }).catch(err => {
    console.log(err)
  })
}
~~~

Inside of AuthService.js :

~~~javascript
role = 'Player'

getToken = () => {
  let token = localStorage.getItem('token')
  if (token) {
    this.role = 'Spymaster'
    return token
  }
  return
}

cachetoken = (token) => {
  if (token !== null) {
    localStorage.setItem('token', token)
    this.role = 'Spymaster'
    console.log('cachedtoken')
    return Promise.resolve()
  } else {
    console.log('login failed')
    return Promise.reject()
  }
}
~~~

## References 

+ https://dev-blog.apollodata.com/full-stack-react-graphql-tutorial-582ac8d24e3b
+ https://medium.com/react-native-training/building-chatty-part-7-authentication-in-graphql-cd37770e5ab3
+ https://www.howtographql.com/
