---
title: "路由器"
---

# Router

## Index

In `src/router/index.ts`, you define `components` and `routes`

```js
import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Apollo from "./views/Apollo.vue";
import User from "./views/User.vue";
import Database from "./views/Database.vue";
import Help from "./views/Help.vue";
import Login from "./views/Login.vue";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
        },
        {
            path: "/login",
            name: "login",
            component: Login,
        },
        {
            path: "/user",
            name: "user",
            component: User,
        },
        {
            path: "/database",
            name: "database",
            component: Database,
        },
        {
            path: "/help",
            name: "help",
            component: Help,
        },
        {
            path: "/about",
            name: "about",
            component: About,
        },
        {
            path: "/apollo",
            name: "apollo",
            component: Apollo,
        },
    ],
});
```

```