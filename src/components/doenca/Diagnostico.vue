<template>
    
</template>
<script>
import DoencasService from '../../services/DoencasService'
export default {
    
    data(){
        return{
            diagnostico: {
                animais_id: null,
                doencas_id: null,
                doente: false,
                curado: false,
            },
            selectAnimal: {
                search: false,
                items: [],
                loading: false
            },
            selectDoenca: {
                search: false,
                items: [],
                loading: false
            }
        }
    },
    watch: {
        'selectAnimal.search'(val){
            val && this.getAnimais(val)
        },
        'selectDoenca.search'(val){
            val && this.getDoencas(val)
        }
    },
    methods: {
        async getAnimais(val){

        },
        async getDoencas(val){
            busca = {
                nome: val
            }
            this.selectDoenca.loading = true;
            let reponse = await DoencasService._getByNome(busca)
            this.selectDoenca.items = response.data.doencas.data
            this.selectDoenca.loading = false;
        },
        async adoecerAnimal(){
            let response = await DoencasService._create(this.diagnostico)
            console.log(response)
        }, 
        async curarAnimal(){

        }
    }
}
</script>