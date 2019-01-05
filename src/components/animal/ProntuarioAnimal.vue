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
                <div v-if='isLoading'>Carregando prontuário...</div>
                <v-form v-if='!isLoading' class="prontuario">
                    <v-layout row wrap>
                        <v-flex xs12>
                            <span class='title'>Informações gerais</span>
                        </v-flex>

                        <v-flex xs12 sm6 md6 lg6>
                            <v-text-field
                                    label='Nome'
                                    v-model='animal.nome'
                                    disabled
                            />
                        </v-flex>
                        <v-flex xs12 sm3 md2 lg2>
                            <v-text-field
                                    label='Código do Brinco'
                                    v-model='animal.codigo_brinco'
                                    disabled
                            />
                        </v-flex>
                        <v-flex xs6 sm3 md2 lg2>
                            <v-text-field
                                    label='Nascimento'
                                    v-model='animal.data_nascimento'
                                    disabled
                            />
                        </v-flex>
                        <v-flex xs6 sm6 md2 lg2>
                            <v-text-field
                                    label='Idade'
                                    v-model='animal.idade'
                                    disabled
                            />
                        </v-flex>
                        <v-flex xs8>
                            <v-text-field
                                    label='Código da raça'
                                    v-model='animal.codigo_raca'
                                    disabled
                            />
                        </v-flex>
                        <v-flex xs4>
                            <v-text-field
                                    label='Sexo'
                                    v-model='animal.sexo'
                                    disabled
                            />
                        </v-flex>
                        <v-flex xs6>
                            <v-text-field
                                    label='Fase da vida'
                                    v-model='animal.fase_vida'
                                    disabled
                            />
                        </v-flex>
                        <v-flex xs6>
                            <v-text-field
                                    label='Vivo?'
                                    v-model="animal.is_vivo ? 'SIM' : 'NÃO'"
                                    disabled
                            />
                        </v-flex>

                        <v-flex xs12 sm12 md6 lg6>
                            <span class='title'>Histórico clínico</span>
                            <v-data-table
                                    :headers='headers'
                                    :items='animal.doencas'
                                    hide-actions
                                    class='elevation-1'
                            >
                                <template slot='items' slot-scope='props'>

                                    <td>{{ props.item.nome }}</td>
                                    <td>{{ props.item.data_cadastro }}</td>
                                    <td>{{ props.item.pivot.situacao }}</td>

                                </template>
                            </v-data-table>
                        </v-flex>
                        <v-flex xs12 sm12 md6 lg6>
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
                        <v-flex xs12 sm2 md2 lg2><v-btn small color="error" @click="dialogDoente = true">Adoecer Animal</v-btn></v-flex>
                        <v-flex xs12 sm2 md2 lg2><v-btn small color="info">Aplicar Vacina</v-btn></v-flex>
                        <v-flex xs12 sm2 md2 lg2><v-btn small color="primary" @click="dialogCurado = true">Curar Animal</v-btn></v-flex>
                       <v-flex xs12>
                            <br/>
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
                                        {text: 'Quantidade (Mg)', value: 'quantidade_mg'}
                                    ]"
                                    :items='animal.doses'
                                    hide-actions
                                    class='elevation-1'
                            >
                                <template slot='items' slot-scope='props'>
                                    <td>{{ props.item.nome }}</td>
                                    <td>{{ props.item.prescricao }}</td>
                                    <td>{{ props.item.data_cadastro }}</td>
                                    <td>{{ props.item.pivot.quantidade_mg }}</td>
                                </template>
                            </v-data-table>
                        </v-flex>
                        <v-flex xs12>
                            <br/>
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
                            <br/>
                            <v-divider/>
                            <br/>
                        </v-flex>
                        <v-flex xs12 v-if='hasValueToGraphDeGanhoDePeso'>
                            <v-layout>
                            <v-flex xs12 sm6 md6 lg6 >
                                <v-flex xs12>
                                    <span class='title'>Gráficos de ganho de peso</span>
                                </v-flex>
                                <chart :options='graficoGanhoPeso' :auto-resize="true"/>
                            </v-flex>
                            <v-flex xs12 sm6 md6 lg6>
                                <v-flex xs12>
                                    <span class='title'>Grafico de hereditariedade</span>
                                </v-flex>
                                <chart class="graficoH" :options='option = graficoHereditariedade' :auto-resize="true"
                                />
                            </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
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
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
	import moment from 'moment'
    import {AnimaisService} from '../../services/AnimaisService'
    import DoencasService from '../../services/DoencasService'
import DosesService from '../../services/DosesService';

	moment.defineLocale('pt-br', null)

	export default {
		name: 'prontuario-animal',
		data() {
			return {
				isLoading: true,
				hasValueToGraphDeGanhoDePeso: false,
				hasValueToGraphDeArvore: false,
				animal: {
					nome: 'Jhon Doe',
					codigo_raca: 56561,
					codigo_brinco: 12351,
					sexo: 'Macho',
					data_nascimento: '',
					fazenda: {
						nome: 'Nossa senhora aparecida',
						limite: '100 Alqueres',
						quantidade_animais: 158
					},
					is_vivo: true,
					fase_vida: 'Bezerro'
                },
                doencas: {
                    doente: false,
                    curado: false,
                    animal_id: null,
                    doenca_id: null
                },
                doses: {
                    quantidate_mg: null,
                    medicamento_id: null,
                    animal_id: null,
                    data: null
                },
				headers: [
					{text: 'Nome', value: 'nome'},
                    {text: 'Data', value: 'data'},
                    {text: 'Situação', value: 'situacao'}
				],
				graficoGanhoPeso: {
					grid: {
						height: 250,
						width: 300
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
						height: 100,
						width: 100
					},
					// tooltip: {
					// 	trigger: 'item',
					// 	triggerOn: 'mousemove'
					// },
					series: [
						{
							type: 'tree',
							data: [],
							left: '2%',
							right: '2%',
							top: '8%',
							bottom: '20%',
							symbol: 'diamond',
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
                dialogAplicarMedicamento: false
			}
        },
        watch: {
			'selectDoencas.search'(val){
				val && this.getDoencas(val)
			}
		},
		methods: {

			calcularIdade() {
				this.animal.idade = moment().diff(new Date(this.animal.data_nascimento), 'months', false) + ' meses'
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
			async getAnimalId() {
				let res = await AnimaisService._getById({id: this.animal.id});
                this.animal = res.data.animais
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
                        this.alerta('error', true, 'Erro ao curar animal!')
                    }
                })
                // console.log(this.doencas)
                if(response.status = 200){
                    this.getAnimalId()
                    this.dialogCurado = false
                }
            },
            // async deleteDoenca(){
            //     let
            // },
            async adoecerAnimal(){
                this.doencas.doente = true
                this.doencas.curado = false
                this.doencas.animal_id = this.animal.id
                if(this.doencas.animal_id !== null && this.doencas.doenca_id){
                    let response = await DoencasService._create(this.doencas).catch(ex => {
                        if(ex){
                            this.alerta('error', true, 'Erro ao adoecer animal!')
                        }
                    })
                    if(response.status === 202){
                        this.alerta(response.data.message.type, true, response.data.message.description)
                        this.dialogDoente = false
                        this.getAnimalId()
                    }
                }
            }, 
            async aplicarMedicamento(){
                if(this.doses.animal_id !== null && this.doses.quantidate_mg !== null && this.doses.medicamento_id !== null){
                    // console.log(this.doses)
                    let response = await DosesService._create(this.doses).catch(ex => {
                        if(ex){
                            this.alerta('error', true, 'Erro ao aplicar medicamento!')
                        }
                    })
                    if(response.status === 202){
                        this.alerta(response.data.message.type, true, response.data.message.description)
                        this.getAnimalId()
                    }
                }
            },
            alerta(color, estado, mensagem){
                this.snackbar.color = color
                this.snackbar.estado = estado
                this.snackbar.mensagem = mensagem
            }
		},
		async mounted() {
			this.animal.id = this.$route.params.id;

			await this.getGraficoPesagem()
			await this.getGraficoHereditariedade()
			await this.getAnimalId()
			this.calcularIdade();
			this.isLoading = false
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
