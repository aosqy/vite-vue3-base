import {
  createRouter,
  createWebHistory
} from "vue-router";

// import { setToken, getToken } from 'libs/util'
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(),
  routes
});
// import { setToken, getToken } from 'libs/util'
router.beforeEach((to, from, next) => {
  // const token = getToken()
  next();
});

router.afterEach(() => {
  window.scrollTo(0, 0);
});

export default router;
