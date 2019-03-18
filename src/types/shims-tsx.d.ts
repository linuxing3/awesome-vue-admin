import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    // already defined in vue-tsx-support/enable-check.d.ts
    // interface IntrinsicElements {
    //   [elem: string]: any;
    // }
  }
}
