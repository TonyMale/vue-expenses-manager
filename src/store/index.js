import Vue from "vue"
import Vuex from "vuex"
import createPersistedState from 'vuex-persistedstate'
import * as Cookie from 'js-cookie'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state:{
		listExpenses: [
			{
			  id: 1,
			  amount: 100,
			  date: new Date('2018-10-10'),
			  description: "Коммунальные платежи"
			},
			{
			  id: 2,
			  amount: 500,
			  date: new Date('2018-10-10'),
			  description: "Продукты"
			},
			{
			  id: 3,
			  amount: 300,
			  date: new Date('2018-10-13'),
			  description: "Кредит"
			},
			{
			  id: 4,
			  amount: 500,
			  date: new Date('2018-10-10'),
			  description: "Развлечения"
			}
		],
		idCount: 5
	},
	mutations:{
		createExpense(state, payload){
			state.listExpenses.push(payload)
			state.idCount++
		},
		editExpense(state, payload){
			state.listExpenses.splice(state.listExpenses.findIndex(item=>
				item.id==payload.id
			),1, payload)
		},
		deliteExpense(state, id){
			state.listExpenses.splice(state.listExpenses.findIndex(item=>
				item.id==id
			),1)
		}	
	},
	actions:{
		createExpense({commit, state}, payload){
			const expense={
				id: state.idCount,
				amount: payload.amount,
				date: payload.date,
				description: payload.description
			}
			commit('createExpense', expense)
			
		},
		editExpense({commit, state}, payload){
			const expense={
				id: payload.id,
				amount: payload.amount,
				date: payload.date,
				description: payload.description
			}
			commit('editExpense', expense)
			
		},
		deliteExpense({commit, state}, payload){
			const id = payload
			commit('deliteExpense', id)
		}
	},
	getters:{
		listExpenses(state){	
			return state.listExpenses			
		},
		getExpense(state){
			return function(id){
				return state.listExpenses.find(item =>{
					return item.id==id
				})
			}
		}
		
	},
	plugins: [
         createPersistedState({
             paths: ['listExpenses'],
             getState: (key) => Cookie.getJSON(key), 
             setState: (key, state) => Cookie.set(key, state, { expires: 1, secure: false })
         })
      ]
})