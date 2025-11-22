const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'digimons', component: () => import('pages/DigimonPage.vue') }
    ],
  },
  {
    path: '/login',
    component: () => import('src/components/auth/LoginForm.vue'),
  },
  {
  path: '/digimon',
  component: () => import('src/pages/DigimonPage.vue')
},


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
