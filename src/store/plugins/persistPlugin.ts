import { Payload } from 'vuex'
import VuexPersistence from 'vuex-persist'
// import * as Cookie from "js-cookie";
// import localStorage from "localforage";
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
  // storage: Cookie
  // storage: localStorage
})

export default vuexLocal
