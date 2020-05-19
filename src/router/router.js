import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'

Vue.use(VueRouter);

let router = new VueRouter({

	routes: [
		{
			path: '/login',// ako hocemo da dodamo url parametar: /login/:id
			name: 'login',
			component: Login,
		},
		{
			path: '/home',
			name: 'home',
			component: Home
		}
	]
})

export default router