<template>
   <v-app>
   		<v-container fluid>
			<v-layout align-center justify-center row fill-height>
				<v-flex xs12 md10>
				  <v-card>
					<v-toolbar color="blue-grey darken-1" dark>
				  	<v-layout>
						<v-flex xs9 d-flex >
							<v-layout align-center justify-center hidden-md-and-up>
								<v-flex>
									<v-menu
									  v-model="menu"
									  :close-on-content-click="false"
									  nudge-bottom=40
									  max-width=300  
									>
										<v-btn append slot="activator" flat icon>
											<v-icon light>menu</v-icon>	
										</v-btn>
										<v-card>
											<v-list>
												<v-list-tile class="dropmenu__item">
													<v-list-tile-content>
														<v-list-tile-action>
															<v-select
															  class="sort"
															  :items="sortList"
															  input = "sortType"
															  @change ="sort"
															  item-text="name"
															  item-value="type"	  
															  label="Сортировать по"
															></v-select>
														</v-list-tile-action>
													</v-list-tile-content>	
												</v-list-tile>
												<v-list-tile class="dropmenu__item">
													<v-list-tile-content >
														<v-list-tile-action>
															<v-menu
																class='filter'
																ref="fromDropMenu"
																:close-on-content-click="false"
																v-model="fromDropMenu"
																:nudge-right="40"
																:return-value.sync="fromDate"
																lazy
																transition="scale-transition"
																offset-y
																full-width
																min-width="290px"
															  >
																<v-text-field
																  slot="activator"
																  v-model="fromDate"
																  label="Начальная дата"
																  prepend-icon="event"
																  readonly
																></v-text-field>
																<v-date-picker v-model="fromDate" @change ="filters"  @input="$refs.fromDropMenu.save(fromDate)" ></v-date-picker>
															  </v-menu>
														</v-list-tile-action>
													</v-list-tile-content>	
												</v-list-tile>
												<v-list-tile class="dropmenu__filter">
													<v-list-tile-content >
														<v-list-tile-action>
															<v-menu
																class='filter'
																ref="toDropMenu"
																:close-on-content-click="false"
																v-model="toDropMenu"
																:nudge-right="40"
																:return-value.sync="toDate"
																lazy
																transition="scale-transition"
																offset-y
																full-width
																min-width="290px"
															  >
																<v-text-field
																  slot="activator"
																  v-model="toDate"
																  label="Конечная дата"
																  prepend-icon="event"
																  readonly
																></v-text-field>
																<v-date-picker v-model="toDate"  @input="$refs.toDropMenu.save(toDate)"></v-date-picker>
															 </v-menu>
														</v-list-tile-action>
													</v-list-tile-content>
												</v-list-tile>
															
											</v-list>
										</v-card>	
									</v-menu>	
								</v-flex>
							</v-layout>
							<v-layout hidden-sm-and-down>
								<v-flex>
									<v-select
									  class="sort"
									  :items="sortList"
									  input = "sortType"
									  @change ="sort"
									  item-text="name"
									  item-value="type"	  
									  label="Сортировать по"
									></v-select>
								</v-flex>
								<v-flex>
									<v-layout>
										<v-flex>
											<v-menu
												class='filter'
												ref="fromMenu"
												:close-on-content-click="false"
												v-model="fromMenu"
												:nudge-right="40"
												:return-value.sync="fromDate"
												lazy
												transition="scale-transition"
												offset-y
												full-width
												min-width="290px"
											  >
												<v-text-field
												  slot="activator"
												  v-model="fromDate"
												  label="Начальная дата"
												  prepend-icon="event"
												  readonly
												></v-text-field>
												<v-date-picker v-model="fromDate" @change ="filters"  @input="$refs.fromMenu.save(fromDate)" ></v-date-picker>
											  </v-menu>
										</v-flex>
										<v-flex>
											<v-menu
												class='filter'
												ref="toMenu"
												:close-on-content-click="false"
												v-model="toMenu"
												:nudge-right="40"
												:return-value.sync="toDate"
												lazy
												transition="scale-transition"
												offset-y
												full-width
												min-width="290px"
											  >
												<v-text-field
												  slot="activator"
												  v-model="toDate"
												  label="Конечная дата"
												  prepend-icon="event"
												  readonly
												></v-text-field>
												<v-date-picker v-model="toDate"  @input="$refs.toMenu.save(toDate)"></v-date-picker>
											 </v-menu>
										</v-flex>
									</v-layout>
								</v-flex>
							</v-layout>							
						</v-flex>						  						
						<v-flex xs4 md2 d-flex>
							<v-card-text class="sum">
								{{sumExpenses}} руб.
							</v-card-text>
						</v-flex>
						<v-flex xs1 d-flex>
							<v-layout align-center justify-center>
								<v-flex class ="btn__add">
									<v-tooltip slot="activator" top>
										<v-btn append slot="activator" to="/add" flat icon  color="blue-grey lighten-5">
											<v-icon light>add</v-icon>	
										</v-btn>
										<span>Добавить</span>
									</v-tooltip>
								</v-flex>
							</v-layout>						   
						</v-flex>
					  </v-layout>					
					</v-toolbar>
					<v-list three-line subheader>
					  <v-layout hidden-xs-only>
						<v-flex xs8 md9>
							<v-subheader class="subtitle__amount">
								<v-card-text>Описание расходов</v-card-text>
							</v-subheader>
						</v-flex>
						<v-flex xs2 md2>
							<v-subheader class="subtitle__amount">
								<v-card-text>Сумма, руб.</v-card-text>
							</v-subheader>
						</v-flex>
					  </v-layout>
					  <v-list-tile
						v-for="item in getExpenses"
						:key="item.id"
						@click=""
					  >
						<v-layout>
							<v-flex xs8 md9>
								<v-list-tile-content>
									<v-list-tile-sub-title class='exp__description'>{{ item.description }}</v-list-tile-sub-title >
								</v-list-tile-content>
							</v-flex>	
							<v-flex xs2>
								<v-list-tile-content>
									<v-list-tile-title class='exp__amount'>{{ item.amount }}</v-list-tile-title>
								</v-list-tile-content>										
							</v-flex>
							<v-flex xs2 md1>
								<v-list-tile-action>
									<v-layout align-content-space-around>
										<v-flex >
											<v-tooltip slot="activator" top>
												<v-btn @click="edit(item.id)" slot="activator" icon>
													<v-icon light>edit</v-icon>
												</v-btn>
												<span>Изменить</span>
											</v-tooltip>										
										</v-flex>
										<v-flex>
											<v-tooltip slot="activator"  top>
												<v-btn @click="delite(item.id)" slot="activator" icon>
													<v-icon light>delete</v-icon>
												</v-btn>
												<span>Удалить</span>												
											</v-tooltip>	
										</v-flex>
									</v-layout>  
								</v-list-tile-action>
							</v-flex>
						</v-layout>
					  </v-list-tile>
					</v-list>
				  </v-card>
				</v-flex>
			</v-layout>
    	</v-container>
   </v-app>
</template>


<script>
	export default {
		name: 'home',
		data(){
			return{
				sortType: '',
				sortList:[
					{name: "по сумме", type: 'amount'},
					{name: "по дате", type: 'date'}					
				],
				menu: false,
				fromDate: '',
				fromMenu: false,
				fromDropMenu: false,
				toDate: '',
				toMenu: false,
				toDropMenu: false
			}	
		},
		computed:{			
			getListExpenses(){			
				return this.$store.getters.listExpenses			
			},
			getExpenses(){
				if(this.fromDate || this.toDate){
					return this.filters()
				}
				return this.getListExpenses	
			},
			sumExpenses(){
				let sum=0
				this.getExpenses.forEach(item=>{
					sum+=item.amount
				})
				return sum
			}
			
		},
		methods: {
      		sort(sortType){		 
				return this.getListExpenses.sort((a,b)=>{
					console.log(typeof(a[sortType]))
					return a[sortType] - b[sortType]
				})	
			},
			filters(){
				if(!this.toDate){
					   return this.getListExpenses.filter(item=>{
						return new Date(item.date)>=new Date(this.fromDate)			
					})
				}
				else if(!this.fromDate){
					return this.getListExpenses.filter(item=>{
						return new Date(item.date)<=new Date(this.toDate)
					})
				}
				else{			
					return this.getListExpenses.filter(item=>{
						console.log('3')
						return (new Date(item.date)>=new Date(this.fromDate) && new Date(item.date)<=new Date(this.toDate))
					})					
				}	
			},
			edit(id){
				this.$router.push('/edit/'+id)
			},
			delite(id){
				this.$store.dispatch('deliteExpense', id);
			}
    	}
	}
</script>


<style>
	a{
		text-decoration: none;
	}
	.filter{
		margin-right: 30px !important; 
	}
	.sort{
		margin-right: 30px !important; 
	}
	.dropmenu__item{
		margin: 20px 0 20px 20px;
	}
	.dropmenu__filter{
		margin-left: 20px;
		margin-bottom: 40px;
	}
	.sum{
		text-align: center;
		font-size: 18px;
		padding: 0 !important;
		line-height: 64px;
	}
	.btn__add{
		flex-grow: 0;
		color: white;
	}
	.expList{
		margin: 0 auto;
	}
	.exp__description{
		font-size: 16px;
		color: rgb(0,0,0,1)!important;
	}
	.exp__amount,.subtitle__amount{
		text-align: center;
	}
	.subtitle__amount{
		font-size: 16px;
		padding: 0 !important;
	}
	.sum__amount{
		text-align: center;
		font-size: 16px;
	}
</style>