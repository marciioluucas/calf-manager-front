<template>
	<v-container grid-list-md>
		<v-card>

			<!-- Cabeçalho da pagina -->
			<v-card-title primary-title>
				<div>
					<h2 class='title mb-0'>{{nomeTitulo}}</h2>
					<span class='caption'></span>
				</div>
			</v-card-title>

			<!-- Formulário de cadastro -->
			<v-card-text>
			 <v-form>
					<v-layout row wrap>
						<v-flex xs12>
							<span class='title'>Informações gerais</span>
						</v-flex>

						<!-- AutoCOmplete Animal -->
						<v-flex xs12 sm3 md3 lg3>
							<v-autocomplete
								label="Pesquise o Animal"
								:loading="selectAnimais.loading"
								:items="selectAnimais.items"
								hide-no-data
								hide-selected
								item-text="nome"
								required
								cache-items
								item-value="id"
								:search-input.sync="selectAnimais.search"
								v-model="hemograma.animal_id"
								/>
						</v-flex>

						<!-- PPT -->
						<v-flex xs12 sm3 md3 lg3>
							<v-text-field
								v-model="hemograma.ppt"
								label='PPT'
								:search-input.sync="hemograma.ppt">
							</v-text-field>
						</v-flex>
						
						<!-- Hematocrito -->
						<v-flex xs12 sm3 md3 lg3>
							<v-text-field
								v-model="hemograma.hematocrito"
								label='Hematocrito'>
							</v-text-field>
						</v-flex>

						<!-- Data do Exame -->
						<v-flex xs12 sm3 md3 lg3>
							<v-text-field
								v-model="hemograma.data"
								label='Data do exame'
								mask="##/##/####"
								:return-masked-value="true">
							</v-text-field>
						</v-flex>
					</v-layout>

					<!-- Modal Doenças -->
					<v-dialog
						v-model="hemograma.viewModal"
						width="500"
						>

						<v-card>
						<v-card-title
						class="headline grey lighten-2"
						primary-title
						>
						Animal Doente
						</v-card-title>
						<v-card-text>
							<v-container grid-list-md>
								<v-layout wrap>
									<v-flex xs12 v-if="!hemograma.doente">
										Animal apresenta níveis baixos nos exame de Proteína plasmática total. Deseja diagnosticar a sua doença?
									</v-flex> 
									<v-flex xs12 v-if="hemograma.doente"> 
										<v-flex xs12>
											<v-autocomplete
												label="Pesquise a Doença"
												:loading="selectAnimais.loading"
												:items="selectDoencas.items"
												hide-no-data
												hide-selected
												item-text="nome"
												required
												cache-items
												item-value="id"
												:search-input.sync="selectDoencas.search"
												v-model="hemograma.doencas_id"
											/>
										</v-flex>
									</v-flex>
								</v-layout>
							</v-container>
						</v-card-text>
						<v-divider></v-divider>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn v-if="!hemograma.doente" color="primary" flat @click="hemograma.doente = true"> Sim </v-btn>
							<v-btn v-if="!hemograma.doente" color="primary" flat @click="hemograma.doente = false"> Não </v-btn>
							<v-btn v-if="hemograma.doente" color="primary" flat @click="cadastrar"> Salvar </v-btn>
							<v-btn v-if="hemograma.doente" color="primary" flat @click="hemograma.viewModal = false"> Cancelar </v-btn>
						</v-card-actions>
						</v-card>
					</v-dialog>        

					<v-flex>
						<v-btn v-if="!hemograma.id" @click="validarSaude">Enviar</v-btn>
						<v-btn v-if="hemograma.id" @click="validarSaude">Editar</v-btn>

						<v-btn @click.right="clearFormHemograma">Limpar formulário</v-btn>
					</v-flex>
				</v-form>
			</v-card-text>
			<!--Componente de alerta-->
			<v-snackbar
				 v-model="snackbar.estado"
				 :right="true"
				 :timeout="4000"
				 :multi-line="true"

				 :top="true"
				 :color="snackbar.color">
				 {{ snackbar.mensagem }}
				 <v-btn
					 color="black"
					 flat
					 @click="snackbar.mode = false"
				 >
					 Close
				 </v-btn>
			 </v-snackbar>
		</v-card>
	</v-container>
</template>

<script>
	import {AnimaisService} from '../../services/AnimaisService';
	import HemogramaService from '../../services/HemogramasService';
	import DoencasService from '../../services/DoencasService';

	export default {
		name: 'cadastro-hemograma',

		// Variaveis deste componente.
		data() {
			return {
				items: [],
				hemograma: {
					id: null,
					ppt: null,
					hematocrito: null,
					data: '',
					animal_id: null,
					doente: false,
					curado: false,
					animais_id: null,
					doencas_id: null,
					doenca_id: null,
					viewModal: false
				},
				selectAnimais: {
					loading: false,
					items: [],
					search: null
				},
				selectDoencas: {
					loading: false,
					items: [],
					search: false
				},
				snackbar: {
					color: 'success',
					estado: false,
					mensagem: ''
				},
				nomeTitulo: 'Cadastrar Exame',
				addDoenca: false
			}
		},

		// Assim que modificado o valor dos campos referenciados abaixo
		// serão executados os métodos chamados.
		watch: {
			'selectAnimais.search'(val){
				val && this.getAnimais(val)
			},
			'selectDoencas.search'(val){
				val && this.getDoencas(val)
			}
		},

		// Execute assim que montar o DOM
		mounted() {
			this.hemograma.id = this.$route.params.id
			if (this.hemograma.id) {
				this.nomeTitulo = 'Editar Exame'
				this.getHemograma()
			}
		},
		methods: {
			// Cadastrar novo animal
			async cadastrar() {
				try{
				if(this.validarForm()){
					
					// console.log(this.hemograma)
					let response = await HemogramaService._create(this.hemograma)
					if(response.status === 201){
					  this.alerta(response.data.message.type, true, response.data.message.description)
						if(this.hemograma.doente){
							this.hemograma.doenca_id = this.hemograma.doencas_id
							response = await DoencasService._create(this.hemograma)
					  		this.alerta(response.data.message.type, true, response.data.message.description)
						}
					  this.clearFormHemograma()
					}
					// console.log(response)

					// Fechar modal e limpar formulário
					this.hemograma.viewModal = false
					this.clearFormHemograma()
				}
				}
				catch(e){

				}
			},
		

			// Editar cadastro de animal.
			async editar() {
				try{
					if(this.validarForm()){
						let response = await HemogramaService._update(this.hemograma)
						if(response.status !== 400 || response.status !== 500){
							this.alerta(response.data.message.type, true, response.data.message.description)
							if(this.hemograma.doente){
								this.hemograma.doenca_id = this.hemograma.doencas_id

								console.log('doente')
								response = await DoencasService._create(this.hemograma)
								this.alerta(response.data.message.type, true, response.data.message.description)
							}
							this.clearFormHemograma()
						}
					}
				}
				catch(exception){
					this.alerta('error', true, 'Erro ao pesquisar todos animais!')
					return false

				}
			},
			async getHemograma() {
				let response = await HemogramaService._getById(this.hemograma.id)
				this.hemograma = response.data.hemogramas.data
			},

			// Pesquisar Animais pelo nome.
			async getAnimais(val) {
				try{
					this.selectAnimais.loading = true
					if (val !== null){
						let response = await AnimaisService._getByNome(val)
						if(response.status !== 400 || response.status !== 500){
							this.selectAnimais.items = response.data.animais.data
						}
						this.selectAnimais.loading = false
					}
				}
				catch (exception){
					this.alerta('error', true, 'Erro ao pesquisar todos animais!')
					return false
				}
			},

			// Pesquisar doença pelo nome.
			async getDoencas(val){
				try{
					this.selectDoencas.loading = true
					if(val){
						let response = await DoencasService._getByNome(val)
						this.selectDoencas.items = response.data.doencas.data
					}
					this.selectDoencas.loading = false
				}
				catch(exception){
					this.alerta('error', true, 'Erro ao pesquisar todos animais!')
				}
			},
			
			//  Limpar formulário.
			clearFormHemograma(){
				this.selectAnimais.items = []
				this.selectDoencas.items = []
				this.hemograma.animais_id = ''
				this.hemograma.doencas_id = ''
				this.hemograma.animal_id = ''
				this.hemograma.ppt = ''
				this.hemograma.hematocrito = ''
				this.hemograma.data = ''
			},

			// Método de validação dos campos.
			validarForm(){
				if(this.animal_id !== '' && this.animal_id !== null &&
					this.hemograma.ppt !== null && this.hemograma.ppt !== '' &&
					this.hemograma.hematocrito !== null && this.hemograma.hematocrito !== '' &&
					this.hemograma.data !== '' && this.hemograma.data !== null)
					{
						return true
				}
				else{
					return false
				}
			},

			validarSaude(){
				if(this.hemograma.ppt <= 4){
						console.log('aqui dentro')
						this.hemograma.viewModal = true
					
				}else{
					this.hemograma.doente = false
					if(this.hemograma.id){
						this.editar()
					}else {
						this.cadastrar()
					}
				}
			},

			// método de mensagem de alerta, passando as propriedades como parâmetros.
			alerta(color, estado, mensagem) {
				this.snackbar.color = color
				this.snackbar.estado = estado
				this.snackbar.mensagem = mensagem
			},
		}
	}
</script>

<style scoped>

</style>
