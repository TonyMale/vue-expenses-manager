<template>
	<v-app>
		<v-container fluid>
			<v-layout align-center justify-center row fill-height>
				<v-flex xs12 sm10 md8 lg6>
				  <v-card>
					<v-toolbar color="blue-grey darken-1" dark>
	  					<v-toolbar-title>Новый расход</v-toolbar-title>
					</v-toolbar>
					<v-form class="form__add" @submit.prevent = "onCreateExpense">
						  <v-layout justify-center>
								<v-flex sm10 >
									<v-text-field
									  Default style
									  label="Описание расхода"
									  v-model = "description"
									></v-text-field>
								</v-flex>			
						  </v-layout>
					  	<v-layout justify-center class="form__wrap">
					  		<v-flex class=form__sum sm5>
								  <v-text-field
									label="Сумма расхода"
									v-model ="amount"	
									Default style
								  ></v-text-field>
							</v-flex>
							<v-flex sm5>
								<v-menu
									ref="addMenu"
									:close-on-content-click="false"
									v-model="addMenu"
									:nudge-right="40"
									:return-value.sync="date"
									lazy
									transition="scale-transition"
									offset-y
									full-width
									min-width="290px"
								  >
								  <v-text-field
									  slot="activator"
									  v-model="date"
									  label="Выберете дату"
									  prepend-icon="event"
									  readonly
									></v-text-field>
									<v-date-picker v-model="date"  @input="$refs.addMenu.save(date)"></v-date-picker>
								  </v-menu>	
							</v-flex>								  				
					  	</v-layout>
     					<v-layout  row >
     						<v-flex  offset-xs7 offset-sm8>
     							<v-btn class="form__btn" type="submit">Сохранить</v-btn>
     						</v-flex>
     					</v-layout>
      					
					</v-form>
				  </v-card>
				</v-flex>
			</v-layout>
    	</v-container>
	</v-app>	
</template>


<script>
	export default {
		name: 'add',
		data(){
			return{
				addMenu: false,
				date: new Date().toISOString().slice(0,10),
				amount: "",
				description: ""
			}	
		},
		
		methods:{
			onCreateExpense(){
				const expenseData = {
					amount: +this.amount,
					date: new Date(this.date),
					description: this.description
				}
				this.$store.dispatch('createExpense', expenseData)
				this.$router.push('/')
			}
		}
	}
</script>


<style>
	.form__add{
		padding: 30px;
	}
	.form__sum{
		padding-right: 30px;
	}
	.form__btn{
		margin: 20px 0 ;
	}
</style>