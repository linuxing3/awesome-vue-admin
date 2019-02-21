/* eslint-disable */
import Vue from "vue";
import Router, { RouteConfig } from "vue-router";

import path from "./path";

Vue.use(Router);

/**
 * 动态路由
 */
let requiredRoute: RequireContext = require.context(".", false, /\.ts$/);

requiredRoute.keys().forEach(key => {
  if (key === "./index.ts" || key === "./path.ts") return;
  path.push(requiredRoute(key).default || requiredRoute(key));
});

const router = new Router({
  routes: path as RouteConfig[],
});

// router guards
router.beforeEach((to: any, from: any, next: any) => {
  console.log("Going From " + from.path + " to " + to.path);
  next();
});

router.afterEach((to: any, from: any) => {
  console.log("Arrived " + to.path + " from " + from.path);
});

export default router;
