<template>
    <div class="content">
        <!-- <h3>Actualizar Stock</h3> -->
        <form
            @submit.prevent="okay()"
            class="form-update"
        >
            <b-form-group 
                id="cod-label"
                label="Codigo"
                label-for="cod-inp"
            >
                <b-form-input
                    id="cod-inp"
                    type="text"
                    placeholder="Ingresa un codigo de barras"
                ></b-form-input>
            </b-form-group>
            <div class="row">
                <b-form-group 
                    id="agregate-label"
                    label="Llegaron"
                    label-for="agregate-inp"
                    class="col-10"
                >
                    <b-form-input
                        class="mb-2 mr-sm-2 mb-sm-0"
                        id="agregate-inp"
                        type="number"
                        min="0"
                        placeholder="Ingresa la cantidad de producto"
                    ></b-form-input>
                </b-form-group>
                <span varian="info" class="col-2"> p {{producto.unidad}} </span>
            </div>
            <input type="submit" class="btn btn-primary" value="Ok">
        </form>
        <div class="display-info" v-if="ok">

        </div>
    </div>
</template>
<script>
import axios from 'axios'
import {mapState} from 'vuex'
export default {
    data() {
        return {
            producto: {
                nombre: null,
                precio: 0,
                descripcion: null,
                categoria: null,
                stock: 0,
                unidad: null,
                exist: false
            },
            unity: 'kg',
            ok: false
        }
    },
    computed:{
        ...mapState(['URLapi','axiosConfig']),
    },
    methods: {
        okay(){
            console.log('ok')
            this.ok = !this.ok
        },
        async getWallet(){
            this.errors=[]
            try {
                let res = await axios.get(this.URLapi + 'wallets/' + this.wallet.cod)
                this.wallet.puntos = parseInt(res.data.puntos)
                // console.log(res.data)
                if(res.data.cod){
                    this.wallet.exist = true
                } else {
                    this.wallet.exist = false
                    this.errors.push("No existe este codigo")
                }
                // console.log(this.wallet.exist)
                // console.log(res.data.cod)
            } catch(error) {
                console.log(error)
            } finally {
                
            }
        },
    },
}
</script>
<style scoped>
.display-info{
    background: #e8e8ea;
}
.content{
    display: grid;
    grid-template-columns: 3fr 3fr;
}
.content > * {
    margin: 1em;
}
</style>