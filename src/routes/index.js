const routes = [

    {
        name: "الصفحة الرئيسية",
        path: '/',
        component: () => import("../views/Home/index.vue")
    },

    {
        name: "إنشاء حساب جديد",
        path: "/sign-up",
        component: () => import("../views/Authentication/Signup/index.vue")
    },

    {
        name: "تسجيل الدخول",
        path: "/login",
        component: () => import("../views/Authentication/Login/index.vue")
    },

    {
        name: "تفاصيل المدونة",
        path: "/blog/:id",
        component: () => import("../views/BlogInfo/index.vue")
    },

    {
        name: "الملف الشخصي",
        path: "/users/profile/:userId",
        component: () => import("../views/User/Profile/index.vue")
    },

    {
        name: "تحرير الملف الشخصي",
        path: "/users/profile/edit-profile/:userId",
        component: () => import("../views/User/EditProfile/index.vue")
    },

    {
        path: "/:catchAll(.*)",
        component: () => import("../views/PageNotFound/index.vue")
    }

];

export default routes;