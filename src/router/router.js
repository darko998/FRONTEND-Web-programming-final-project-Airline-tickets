import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import CompanyPage from '@/views/CompanyPage'
import CreateTicket from '@/views/CreateTicket'



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
		},
		{
			path: '/company/:id',
			name: 'company',
			component: CompanyPage
		},
		{
			path: '/tickets/create',
			name: 'createTicket',
			component: CreateTicket
		}
	]
})

export default router