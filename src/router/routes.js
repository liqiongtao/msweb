export const routes = [
    { path: '/:pathMatch(.*)', redirect: '/404' },
    {
        path: '/404',
        name: 'no-view',
        meta: { title: '404', requireAuth: false },
        component: () => import('@/views/common/404.vue')
    },
    {
        path: '/401',
        name: 'no-access',
        meta: { title: '401', requireAuth: false },
        component: () => import('@/views/common/401.vue')
    },
    {
        path: '/login',
        name: 'login',
        meta: { title: '登录', requireAuth: false },
        component: () => import('@/views/common/login.vue')
    },
    {
        path: '/',
        component: () => import('@/views/layout/index.vue'),
        children: [
            {
                path: 'home',
                name: 'home',
                meta: { title: '首页', icon: 'Monitor' },
                component: () => import('@/views/home/home.vue')
            },
            {
                component: () => import('@/views/layout/main.vue'),
                path: 'system',
                name: 'system',
                meta: {
                    title: '系统管理',
                    icon: 'Setting',
                    permissions: ['sys-admin-manage', 'sys-admin-view', 'sys-role-manage', 'sys-role-view', 'sys-logs']
                },
                children: [
                    {
                        path: 'admin',
                        name: 'system-admin',
                        meta: { title: '管理员管理', permissions: ['sys-admin-manage', 'sys-admin-view'] },
                        component: () => import('@/views/system/system-admin.vue')
                    },
                    {
                        path: 'role',
                        name: 'system-role',
                        meta: { title: '角色管理', permissions: ['sys-role-manage', 'sys-role-view'] },
                        component: () => import('@/views/system/system-role.vue')
                    },
                    {
                        path: 'logs',
                        name: 'system-logs',
                        meta: { title: '系统日志', permissions: ['sys-logs'] },
                        component: () => import('@/views/system/system-logs.vue')
                    }
                ]
            }
        ]
    }
]
