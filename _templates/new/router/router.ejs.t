---
inject: true
to: "src/router/index.ts"
after: routes
---
    {
      path: '/',
      name: 'home',
      component: Home
    },