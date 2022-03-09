import {
    createRouter,
    createWebHistory
} from "vue-router";
const routes = [{
    path: '/',
    redirect: '/home'
}, {
    path: '/home',
    component: () => import('../views/Home.vue'),
    name: '首页'
}, {
    path: '/product',
    component: () => import('../views/Product.vue'),
    name: '产品'
}, {
    path: '/cart',
    component: () => import('../views/Cart.vue'),
    name: '购物车'
}, {
    path: '/about',
    component: () => import('../views/About.vue'),
    name: '关于'
}]
const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(),
    routes, // `routes: routes` 的缩写
});

export default router;