export const mainRoutes = [
    {
        path: '/',
        component: () => import('@/views/layout/LayoutMain.vue'),
        children: [
            {
                path: 'home',
                name: 'home',
                meta: { title: '首页', icon: 'Monitor' },
                component: () => import('@/views/common/Home.vue')
            },
            {
                path: 'system',
                name: 'system',
                meta: { title: '系统管理', icon: 'Monitor' },
                children: [
                    {
                        path: 'admin',
                        name: 'admin',
                        meta: { title: '管理员管理', icon: 'Monitor' },
                        component: () => import('@/views/system/SystemAdmin.vue')
                    },
                    {
                        path: 'role',
                        name: 'role',
                        meta: { title: '角色管理', icon: 'Monitor' },
                        component: () => import('@/views/system/SystemRole.vue')
                    },
                    {
                        path: 'log',
                        name: 'log',
                        meta: { title: '日志查看', icon: 'Monitor' },
                        component: () => import('@/views/system/SystemLog.vue')
                    }
                ]
            }
        ]
    }
]

export const indexRoutes = [
    {
        path: '/401',
        name: '401',
        meta: { title: '401', requireAuth: false },
        component: () => import('@/views/common/Page40X.vue')
    },
    {
        path: '/404',
        name: '404',
        meta: { title: '404', requireAuth: false },
        component: () => import('@/views/common/Page40X.vue')
    },
    {
        path: '/login',
        name: 'login',
        meta: { title: 'login', requireAuth: false },
        component: () => import('@/views/common/Login.vue')
    },
    { path: '/:pathMatch(.*)', redirect: '/404' }
]

export default [...mainRoutes, ...indexRoutes]
