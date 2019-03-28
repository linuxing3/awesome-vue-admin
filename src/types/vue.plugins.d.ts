/* tslint:disable:no-shadowed-variable */

import Vue from 'vue'
import { DefaultProps, PropsDefinition } from 'vue/types/options'
import { Route, VueRouter } from 'vue-router/types/router'

declare module 'vue-router/types/router' {
  interface VueRouter {
    history: {
      router: VueRouter;
      base: string;
      current: Route;
      pending?: Route;
    };
  }
}
