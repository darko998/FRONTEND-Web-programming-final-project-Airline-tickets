import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import CompanyPage from '@/views/CompanyPage'
import CreateTicket from '@/views/CreateTicket'
import UserPage from '@/views/UserPage'
import UpdateTicket from '@/views/UpdateTicket'


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
			path: '/users/:id',
			name: 'userPage',
			component: UserPage
		},
		{
			path: '/tickets/create',
			name: 'createTicket',
			component: CreateTicket
		},
		{
			path: '/tickets/:id/update',
			name: 'updateTicket',
			component: UpdateTicket
		}
	]
})

export default router