<template>
    <div>
        <h1 class="mt-3">Consultar Wallet</h1>
        <form 
            class="container"
            @submit.prevent="getWallet()"

        >
            <div class="consulta row">
                <b-form-input
                    autofocus
                    id="cod-label"
                    ref="cod-label"
                    class="mb-2 mr-sm-2 mb-sm-0 col-3"
                    placeholder="Ingresa codigo de barras"
                    v-model="wallet.cod"
                ></b-form-input>
                <input value="OK" type="submit" class="btn btn-primary col-1">
                <p v-if="wallet.puntos" class="col-6"> Hola {{wallet.nombre}}, tienes <b>{{wallet.puntos}} puntos</b></p>
            </div>
            <div v-if="errors.consult" class="errors">
                <p v-for="(error) in errors.consult" :key="error.id">{{error}}</p>
            </div>
        </form>
        <hr>
        <div class="reg-wallet mb-3">
            <h3>Registrar Wallet</h3>
            <form 
                class="container"
                id="form-register-wallet"
                @submit.prevent="addWallet()"
            >
                <div class="row">
                    <div class="form-group col-4">
                        <label>Codigo</label>
                        <b-form-input
                            id=""
                            ref=""
                            class="mb-2 mr-sm-2 mb-sm-0"
                            placeholder="Ingresa codigo de barras"
                            v-model="wallet_post.cod"
                        ></b-form-input>
                    </div>
                    <div class="form-group col-4">
                        <label>Nombre</label>
                        <b-form-input
                            id=""
                            ref=""
                            class="mb-2 mr-sm-2 mb-sm-0"
                            placeholder="Ingresa nombre del cliente"
                            v-model="wallet_post.nombre"
                        ></b-form-input>
                    </div>
                </div>
                <div class="btn-control">
                    <b-button @click="clear()" variant="secondary">Limpiar</b-button>
                    <input type="submit" value="Registrar" class="btn btn-primary">
                </div>
                <div v-if="errors.register" class="errors">
                    <p v-for="(error) in errors.register" :key="error.id">{{error}}</p>
                </div>
            </form>
            
        </div>
        <b-alert
            :show="dismissCountDown"
            dismissible
            fade
            variant="success"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged"
        >
            Se ha registrado un Wallet.
        </b-alert>
    </div>
</template>
<script>
import axios from 'axios'
import {mapState} from 'vuex'
export default {
    data() {
        return {
            wallet: {
                cod: null,
                puntos: 0,
                nombre: null
            },
            wallet_post: {
                cod: null,
                puntos: 0,
                nombre: null
            },
            errors: {
                register: [],
                consult: []
            },
            dismissSecs: 5,
            dismissCountDown: 0,
        }
    },
    computed: {
        ...mapState(['URLapi','axiosConfig']),
    },
    methods: {
        async getWallet(){
            this.errors.consult = []
            try {
                let res = await axios.get(this.URLapi + 'wallets/' + this.wallet.cod)
                if(!this.wallet.cod){
                    this.errors.consult.push("Se requiere de un codigo")
                }
                if(this.wallet.cod && !res.data.cod){
                    this.errors.consult.push("No existe este codigo")
                }
                this.wallet.puntos = res.data.puntos
                this.wallet.nombre = res.data.nombre
                // console.log(res.data)
            } catch(error) {
                console.log(error)
            } finally {
                this.$refs['cod-label'].focus()
            }
        },
        clear(){
            this.wallet_post.cod = null
            this.wallet_post.nombre = null
            // this.errors.register = []
        },
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        async addWallet(){
            this.errors.register = []
            try {
                let res = await axios.post(this.URLapi + 'wallets/add', this.wallet_post, this.axiosConfig)
                console.log(res.data)
                if(!this.wallet_post.cod){
                    this.errors.register.push("Se requiere de un codigo")
                }
            } catch (error) {
                console.log(error)
                
            } finally {
                if(this.errors.register.length === 0)
                    this.dismissCountDown = this.dismissSecs
                
                this.clear()
            }
        }
    },
}
</script>
<style scoped>
.consulta{
    display: flex;
    align-items: baseline;
}
.btn-control > *{
    margin-right: 5px;
}

</style>