const routes = [

    {
        name: "الصفحة الرئيسية",
        path: '/',
        component: () => import("../views/Home/index.vue")
    },

    {
        name: "الصفحة الثانية",
        path: "/about",
        component: () => import("../views/About/index.vue")
    },

    {
        path: "/:catchAll(.*)",
        component: () => import("../views/PageNotFound/index.vue")
    }

]

export default routes