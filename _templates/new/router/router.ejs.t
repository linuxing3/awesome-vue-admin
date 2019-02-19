---
inject: true
to: "src/router.ts"
after: routes
---
    {
      path: '/',
      name: 'home',
      component: Home
    },