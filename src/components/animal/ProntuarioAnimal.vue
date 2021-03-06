<template>
    <v-container grid-list-md>
        <v-card>
            <v-card-title primary-title>
                <div>
                    <h2 class='title mb-0'>Prontuário animal</h2>
                    <span class='caption'>Aqui você poderá ver todas as informações pertencentes a este animal.</span>
                </div>
            </v-card-title>

            <v-card-text>
                <div v-if="isLoading">Carregando prontuário...</div>
                <v-form v-if="!isLoading" class="prontuario">
                    <v-layout row wrap>
                        <v-flex xs12>
                            <span class='title'>Informações gerais</span>
                        </v-flex>
                        <v-flex xs6 sm3 md3 lg3>
                            <v-text-field
                                key="nome"
                                label='Nome'
                                v-model='animal.nome'
                                disabled
                            />
                        </v-flex>
                        <v-flex xs6 sm3 md3 lg3>
                            <v-text-field
                                key="codigo"
                                label='Código do Brinco'
                                v-model='animal.codigo_brinco'
                                disabled
                            />
                        </v-flex>
                        <v-flex xs6 sm3 md3 lg3>
                            <v-text-field
                            key="nascimento"
                                label='Nascimento'
                                v-model='animal.data_nascimento'
                                disabled
                            />
                        </v-flex>
                        <v-flex xs6 sm3 md3 lg3>
                            <v-text-field
                            key="idade"
                                label='Idade'
                                v-model='animal.idade'
                                disabled
                            />
                        </v-flex>
                        <v-flex xs3>
                            <v-text-field
                                key="codigoRaca"
                                label='Código da raça'
                                v-model='animal.codigo_raca'
                                disabled
                            />
                        </v-flex>
                        <v-flex xs3>
                            <v-text-field
                                key="sexo"
                                label='Sexo'
                                v-model='animal.sexo'
                                disabled
                            />
                        </v-flex>
                        <v-flex xs3>
                            <v-text-field
                                key="fase"
                                label='Fase da vida'
                                v-model='animal.fase_vida'
                                disabled
                            />
                        </v-flex>
                        <v-flex xs3>
                            <v-text-field
                                key="vivo"
                                label='Vivo?'
                                v-model="animal.is_vivo ? 'SIM' : 'NÃO'"
                                disabled
                            />
                        </v-flex>
                        <v-flex xs12 sm12 md7 lg7>
                            <span class='title'>Histórico clínico</span>
                                <v-data-table
                                    key="doencas"
                                    :headers='headers'
                                    :items='animal.doencas'
                                    hide-actions
                                    class='elevation-1'
                                >
                                <template slot='items' slot-scope='props'>
                                    <td key="nomeAnimal">{{ props.item.nome }}</td>
                                    <td key="dataAdoecimento">{{ props.item.pivot.data_adoecimento }}</td>
                                    <td key="dataCura">{{ props.item.pivot.data_cura }}</td>
                                    <td key="situacao">{{ props.item.pivot.situacao }}</td>
                                </template>
                            </v-data-table>
                        </v-flex>
                        <v-flex xs12 sm12 md5 lg5>
                            <span class='title'>Ultimas pesagens</span>
                                <v-data-table
                                    :headers="[{text: 'Peso', value: 'peso'}, {text: 'Data da pesagem', value: 'data_pesagem'}]"
                                    :items='animal.pesagens'
                                    hide-actions
                                    class='elevation-1'
                                >
                                <template slot='items' slot-scope='props'>
                                    <td class="">{{ props.item.peso }}</td>
                                    <td class="">{{ props.item.data_pesagem }}</td>
                                </template>
                            </v-data-table>
                        </v-flex>
                        <v-layout v-if="this.animal.is_vivo">
                            <v-flex xs12 sm2 md2 lg2><v-btn small key="adoecer" color="warning" @click="dialogDoente = true">Registrar Doença</v-btn></v-flex>
                            <v-flex xs12 sm2 md2 lg2><v-btn small key="medicar" color="info" @click="dialogAplicarMedicamento = true">Registrar Vacina</v-btn></v-flex>
                            <v-flex xs12 sm2 md2 lg2><v-btn small key="curar" color="primary" @click="dialogCurado = true">Registrar Cura</v-btn></v-flex>
                            <v-flex xs12 sm2 md2 lg2>
                                <v-btn small 
                                       key="morte" 
                                       color="error" 
                                       @click="dialogObito = true"
                                >
                                    Registrar Morte
                                </v-btn></v-flex>
                        </v-layout>
                        <v-flex xs12>
                                <v-divider/>
                            <br/>
                        </v-flex> 
                        <v-flex xs12>
                            <span class='title'>Vacinas Aplicadas</span>
                            <v-data-table
                                :headers="[
                                {text: 'Medicamento', value: 'nome'}, 
                                {text: 'Prescrição', value: 'prescricao'}, 
                                {text: 'Data', value: 'data'}, 
                                {text: 'Quantidade (Mg/Ml)', value: 'quantidade_mg'}
                                ]"
                                :items='animal.doses'
                                hide-actions
                                class='elevation-1'
                            >
                                <template slot='items' slot-scope='props'>
                                    <td>{{ props.item.nome }}</td>
                                    <td>{{ props.item.prescricao }}</td>
                                    <td>{{ props.item.pivot.data_cadastro }}</td>
                                    <td>{{ props.item.pivot.quantidade_mg }}</td>
                                </template>
                            </v-data-table>
                        </v-flex>
                        <v-flex xs12>
                            <v-divider/>
                            <br/>
                        </v-flex>
                        <v-flex xs12>
                            <span class='title'>Fazenda de locação do animal</span>
                        </v-flex>
                        <v-flex xs12 sm6 md6 lg6>
                            <v-text-field
                                label='Nome'
                                v-model='animal.fazenda.nome'
                                disabled
                            />
                        </v-flex>
                        <v-flex xs6 sm3 md3 lg3>
                            <v-text-field
                                label='Limite'
                                v-model='animal.fazenda.limite'
                                disabled
                            />
                        </v-flex>
                        <v-flex xs6 sm3 md3 lg3>
                            <v-text-field
                                label='Quantidade de animais'
                                v-model='animal.fazenda.quantidade_animais'
                                disabled
                            />
                        </v-flex>
                        <v-flex xs12>
                                <v-divider/>
                            <br/>
                        </v-flex>

                        <!-- Gráficos de ganho de peso e hereditariedade -->
                        <v-flex xs12 v-if='hasValueToGraphDeGanhoDePeso'>
                            <v-layout>
                                <v-flex xs12 sm6 md6>
                                    <v-flex xs12>
                                        <span class='title'>Gráficos de ganho de peso</span>
                                    </v-flex>
                                    <chart :options='graficoGanhoPeso' :auto-resize="true"/>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-flex xs12>
                                        <span class='title'>Grafico de hereditariedade</span>
                                    </v-flex>
                                    <chart class="graficoH" :options='option = graficoHereditariedade' :auto-resize="true"/>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>

                    <!-- Modal adoecer animal -->
                    <v-dialog
                        v-model="dialogDoente"
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
                                    <v-flex xs12> 
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
                                                v-model="doencas.doenca_id"
                                            />
                                        </v-flex>
                                    </v-flex>       
                                </v-layout>
                            </v-container>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" flat @click="adoecerAnimal"> Salvar </v-btn>
                            <v-btn flat @click="dialogDoente = false"> Cancelar </v-btn>
                        </v-card-actions> 
                        </v-card>
                    </v-dialog>

                    <!-- Modal curar animal -->
                    <v-dialog
                        v-model="dialogCurado"
                        width="500"
                    >
                    <v-card>
                        <v-card-title
                            class="headline grey lighten-2"
                            primary-title
                        >
                            Animal Curado
                        </v-card-title>
                        <v-card-text>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-flex xs12> 
                                        <v-flex xs12>
                                            Deseja adicionar a cura para este animal?
                                        </v-flex>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" flat @click="curarAnimal"> Sim </v-btn>
                            <v-btn flat @click="dialogCurado = false"> Não </v-btn>
                        </v-card-actions> 
                    </v-card>
                    </v-dialog>

                <!-- Modal declarar óbito -->
                    <v-dialog
                        v-model="dialogObito"
                        width="500"
                    >
                    <v-card>
                        <v-card-title
                            class="headline grey lighten-2"
                            primary-title
                        >
                            Declarar Óbito
                        </v-card-title>
                        <v-card-text>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-flex xs12> 
                                        <v-flex xs12>
                                            Deseja declarar óbito para este animal?
                                        </v-flex>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" flat @click="cadastrarMorte"> Sim </v-btn>
                            <v-btn flat @click="dialogObito = false"> Não </v-btn>
                        </v-card-actions> 
                    </v-card>
                    </v-dialog>

                    <!-- Modal medicar animal -->
                    <v-dialog
                        v-model="dialogAplicarMedicamento"
                        width="500"
                    >
                        <v-card>
                            <v-card-title
                                class="headline grey lighten-2"
                                primary-title
                            >
                                Vacinar Animal
                            </v-card-title>
                            <v-card-text>
                                <v-container grid-list-md>
                                    <v-layout wrap>
                                        <v-flex xs12>
                                            <v-flex xs12>
                                                <v-autocomplete
                                                    v-model="dose.medicamento_id"
                                                    :items="selectMedicamento.items"
                                                    :search-input.sync="selectMedicamento.search"
                                                    hide-no-data
                                                    hide-selected
                                                    item-text="nome"
                                                    item-value="id"
                                                    label="Medicamentos"
                                                    placeholder="Pesquisar pelo Medicamento"
                                                    required
                                                />
                                            </v-flex>
                                            <v-flex xs12>
                                                <v-text-field
                                                    v-model="dose.quantidade_mg"
                                                    label='Dose'
                                                    placeholder="Medida em miligramas"
                                                    required
                                                ></v-text-field>

                                            </v-flex>
                                            <v-flex xs12>
                                                <v-text-field
                                                    v-if="dose.showSaldo"
                                                    v-model="dose.saldo"
                                                    label='saldo em estoque'
                                                    disabled
                                                ></v-text-field>

                                            </v-flex>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" flat @click="aplicarMedicamento"> Salvar </v-btn>
                                <v-btn flat @click="closeDialogAplicar"> Cancelar </v-btn>
                            </v-card-actions> 
                        </v-card>
                    </v-dialog>
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
	import moment from 'moment'
    import {AnimaisService} from '../../services/AnimaisService'
    import DoencasService from '../../services/DoencasService'
    import DosesService from '../../services/DosesService'
    import MedicamentosService from '../../services/MedicamentosService'
    import jwtDecode from 'jwt-decode'

	moment.defineLocale('pt-br', null)

	export default {
		name: 'prontuario-animal',
		data() {
			return {
				isLoading: true,
				hasValueToGraphDeGanhoDePeso: false,
				hasValueToGraphDeArvore: false,
				animal: {
                    id: null,
					nome: null,
					codigo_raca: null,
					codigo_brinco: null,
					sexo: null,
					data_nascimento: null,
					fazenda: {
						nome: null,
						limite: null,
						quantidade_animais: null
					},
					is_vivo: true,
                    fase_vida: null,
                    data_morte: null,
                    hemogramas: [],
                    doses: [],
                    pesagens: [],
                    fazenda: [],
                    doencas: []
                },
                doencas: {
                    doente: false,
                    curado: false,
                    animal_id: null,
                    doenca_id: null,
                    usuario_cadastro: null
                },
                dose: {
                    quantidade_mg: "",
                    tipo_movimentacao: "saida",
                    animal_id: "",
                    medicamento_id: "",
                    funcionario_id: "",
                    saldo: "",
                    showSaldo: false
                },
				headers: [
					{text: 'Nome', value: 'nome'},
                    {text: 'Data de adoecimento', value: 'data_adoecimento'},
                    {text: 'Data de cura', value: 'data_cura'},
                    {text: 'Situação', value: 'situacao'}
				],
				graficoGanhoPeso: {
					grid: {
						height: 'auto',
						width: 'auto'
					},
					tooltip: {
						trigger: 'axis'
                    },
                    
					legend: {
						data: ['Peso em @']
					},
					xAxis: {
						data: ['', '', '', '', '', '']
					},
					yAxis: {},
					series: [{
						name: 'Arroba',
						type: 'line',
						data: []
					}]
				},
				graficoHereditariedade: {
					layout: 'orthogonal',
					grid: {
						height: 'auto',
						width: 'auto'
                    },
                    
					series: [
						{
                            symbolSize: 7,
							type: 'tree',
							data: [],
							left: '2%',
							right: '2%',
							top: '8%',
							bottom: '20%',
							symbol: 'emptyCircle',
                            orient: 'vertical',
							label: {
									position: 'bottom',
									verticalAlign: 'middle',
									align: 'center',
									rotate: 180,
									fontSize: 12
							},
							leaves: {
								label: {
										position: 'top',
										rotate: 180,
										verticalAlign: 'middle',
										align: 'left'
								}
							},
							animationDurationUpdate: 750
						}
					]
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
                selectMedicamento: {
                    loading: false,
                    items: [],
                    search: null
                },
				snackbar: {
					color: 'success',
					estado: false,
					mensagem: ''
                },
                dialogDoente: false,
                dialogCurado: false,
                dialogObito: false,
                dialogAplicarMedicamento: false
			}
        },
        watch: {
			'selectDoencas.search'(val){
				val && this.getDoencas(val)
            },
            'selectMedicamento.search'(val){
				val && this.getMedicamentos(val)
            },
            'dose.medicamento_id' (medicamento_id){
                medicamento_id && this.getSaldoDoseMedicamento(medicamento_id)
            }
		},
		methods: {
             async getSaldoDoseMedicamento(medicamento_id){
                try{
                    let busca = {
                        params: {
                        saldo_medicamento_id: medicamento_id
                        }
                    }
                    let response = await DosesService._getAll(busca)
                    this.dose.saldo = response.data.dose.saldo
                    this.dose.showSaldo = true
                    
                }
                catch(e){
                console.log(e.response)
                }
            },
			calcularIdade() {
                let data = ""
                let data_nascimento = moment(this.formatDate(this.animal.data_nascimento))
                if(this.animal.data_morte != null){
                    data = moment(this.animal.data_morte);
                } else {
                    data = moment(new Date())
                }
                
                let diff = moment.duration(data.diff(data_nascimento))
				this.animal.idade = diff.months() + ' meses, ' + diff.days() + ' dias' 
            },
            formatDate(date) {
                if (!date) return null

                const [ day, month, year ] = date.split('/')
                return `${year}-${month}-${day}`
            },
			async getGraficoPesagem() {
				let response = await AnimaisService._getGraficoGanhoDePeso(this.animal.id)
				let pesos = []
				let data = []
				// console.log(response.data)
				for (let i = 0; i < response.data[0].length; i++) {
					let a = response.data[0][i].peso.split(' ')
					pesos.push(a[0])
					data.push(response.data[0][i].data_pesagem)
				}
				this.graficoGanhoPeso.xAxis.data = data
				this.graficoGanhoPeso.series[0].data = pesos
				if (data.length > 0 && pesos.length > 0) {
					this.hasValueToGraphDeGanhoDePeso = true
				}
			},
			async getGraficoHereditariedade() {
				let res = await AnimaisService._getGraficoHereditariedade(this.animal.id)
				this.graficoHereditariedade.series[0].data = await [
					res.data
				]
				if (res.data.name !== undefined) {
					this.hasValueToGraphDeArvore = true
				}
			},
			async getAnimal() {
                try{
                    let response = await AnimaisService._getById({id: this.animal.id});
                    this.animal = response.data.animais
                    this.getGraficoPesagem()
                    this.getGraficoHereditariedade()
                }catch(e){
                    this.notify('error', 'Erro ao curar animal!')
                }
            },
            async getDoencas(val){
                let busca = {
                    nome: val
                }
                this.selectDoencas.loading = true
                if(val){
                    let response = await DoencasService._getByNome(busca)
                    this.selectDoencas.items = response.data.doencas.data
                }
                this.selectDoencas.loading = false
            },
            async curarAnimal(){
                this.doencas.doente = false
                this.doencas.curado = true
                this.doencas.animal_id = this.animal.id
                let response = await DoencasService._create(this.doencas).catch(ex => {
                    if(ex){
                        this.notify('error', 'Erro ao curar animal!')
                    }
                })
                // console.log(this.doencas)
                if(response.status = 200){
                    this.getAnimal()
                    this.dialogCurado = false
                }
            },
            async getMedicamentos(val){
                let busca ={
                    nome: val
                }
                this.selectMedicamento.loading = true
                try{
                    if(val){
                    let response = await MedicamentosService._getByNome(busca)
                    this.selectMedicamento.items = response.data.medicamentos.data
                    }
                    this.selectMedicamento.loading = false
                }
                catch(e){
                    this.notify('error', 'Erro ao pesquisar medicamento!')
                    this.selectMedicamento.loading = false
                }
                
            },
            async adoecerAnimal(){
                this.doencas.doente = true
                this.doencas.curado = false
                this.doencas.animal_id = this.animal.id
                if(this.doencas.animal_id !== null && this.doencas.doenca_id){
                    let response = await DoencasService._create(this.doencas).catch(ex => {
                        if(ex){
                            this.notify('error', 'Erro ao adoecer animal!')
                        }
                    })
                    if(response.status === 202){
                        this.notify(response.data.message.type, response.data.message.description)
                        this.dialogDoente = false
                        this.getAnimal()
                    }
                }
            }, 
            async aplicarMedicamento(){
                try{
                    this.dose.funcionario_id = localStorage.getItem('func_id')
                    this.dose.animal_id = this.animal.id
                    if(this.validarAplicarDose()){
                        let response = await DosesService._create(this.dose)
                            
                        if(response.status == 201 || response.status == 200){
                            this.notify(response.data.message.type, response.data.message.description)
                            this.getAnimal()
                            this.closeDialogAplicar()
                        }
                        
                    }
                }
                catch(exception){
                    if(exception.response.status == 400){
                        this.notify("error", exception.response.data.message.description)
                    }else{
                        this.notify('error', 'Erro ao aplicar medicamento!')
                    }
                }
            },

            validarAplicarDose(){
                if(!this.dose.quantidade_mg){
                    this.notify("warning", "informe a quantidade de mg/ml")
                    return false
                }
                if(!this.dose.medicamento_id) {
                    this.notify("warning", "informe o medicamento/vacina")
                    return false
                }
                return true
            },

            notify(color, mensagem){
                this.snackbar.color = color
                this.snackbar.estado = true
                this.snackbar.mensagem = mensagem
            },
            async cadastrarMorte(){
                try{
                    this.animal.is_vivo = false
                    let response = await AnimaisService._update(this.animal)
                    this.dialogObito = false;
                    if(response.status !== 400 || response.status !== 500){
                        this.notify(response.data.message.type, response.data.message.description)
                    }
                }catch(e){
                    this.notify('error', 'Erro ao declarar morte!')
                }
            },
            getIdUsuarioLogado(){
                try{
                    let res = jwtDecode(localStorage.getItem('token'))
                    this.animal.fazenda.usuario_cadastro = res.id
                    this.dose.usuario_cadastro = res.id
                    this.doencas.usuario_cadastro = res.id            
                }
                catch(e){
                    this.notify('error', 'Erro ao carregar id de usuario logado')
                }
            },
            closeDialogAplicar(){
                this.dialogAplicarMedicamento = false;
                this. quantidade_mg = ""
                this.funcionario_id = ""
                this.medicamento_id = ""
                this.animal_id = "",
                this.usuario_cadastro = ""
                
            },
            cleardialogAplicar(){
                this.dose.saldo = ""
                this.dose.showSaldo = false
                this.dose.medicamento_id = ""
            }

        },
        
		async mounted() {
            this.getIdUsuarioLogado()
			this.animal.id = this.$route.params.id;
			await this.getAnimal()
            this.isLoading = false
            this.calcularIdade()
		}
	}
</script>

<style scoped>
    .prontuario .input-group--disabled {
        color: black;
    }

    .graficoH {
        -ms-transform: rotate(180deg); /* IE 9 */
        -webkit-transform: rotate(180deg); /* Safari 3-8 */
        transform: rotate(180deg);
    }
</style>
