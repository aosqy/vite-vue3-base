export default [{
  path: "/",
  name: "main",
  redirect: "/home",
  children: [{
    path: "home",
    name: "Home",
    component: () => import("@views/home/index.vue"),
  },],
},];
