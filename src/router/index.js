import { createRouter, createWebHistory } from 'vue-router';
import routes from "../routes/index";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to , from, next) => {
  document.title = `مدونة | ${to.name}`;
  next();
});

export default router