<template>
    <div class="mt-5 container">
        <h1>Caja</h1>
        <!-- cabecera -->
        <hr>
        <div class="row">
            <label class="head col-3">Codigo</label>
            <label class="head col-3">Producto</label>
            <label class="head col-2">Cantidad</label>
            <label class="head col-1">Precio</label>
            <label class="head col-1">Subtotal</label>

        </div>
        <b-form class="form-products row">
            <b-form-input 
                autofocus
                ref="producto_id"
                v-model="id" 
                class="col-3" 
                type="text" 
                placeholder="Codigo"
                @keyup.enter="add()"
            ></b-form-input>
            <p class="col-3 display-info" >{{search.nombre}}</p> <!-- {{data.nombre}} -->
            <b-form-input 
                v-model="cantidad" 
                class="col-1" 
                type="number" 
                min="1" 
                placeholder="Cantidad" 
                @keyup.enter="add()"
            ></b-form-input>
            <p class="col-1 display-info"> {{search.unidad}}</p>
            <p class="col-1 display-info">$ <span v-if="!search.precio">0</span>{{search.precio}}</p>
            <p class="col-1 display-info">$ {{makeSubtotal}}</p>

            <b-button variant="primary" class="col-1" @click="add()">Agregar</b-button>
        </b-form>
        <hr>
        <!-- detalles de venta -->
        <b-alert
            :show="dismissCountDown"
            dismissible
            fade
            variant="success"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged"
        >
            ¡Venta exitosa!
        </b-alert>
        <div class="order-data" v-if="items.length > 0">
            <div class="table-area">
                <b-table-simple
                    hover
                    striped
                    caption-top 
                    responsive
                >
                    <b-thead>
                        <b-tr>
                            <b-th>Id</b-th>
                            <b-th>Nombre</b-th>
                            <b-th>Precio</b-th>
                            <b-th>Cantidad</b-th>
                            <b-th>Subtotal</b-th>
                            <b-th></b-th>
                        </b-tr>
                    </b-thead>
                    <b-tbody>
                        <b-tr v-for="(element, index) of pagination(items).slice().reverse()" :key="element">
                            <b-td>{{index}}</b-td>
                            <b-td>{{element.nombre}}</b-td>
                            <b-td>{{element.precio}}</b-td>
                            <b-td>{{element.cantidad}}</b-td>
                            <b-td>{{element.subtotal}}</b-td>
                            <b-td class="text-center">
                                <i class="btn-remove danger" @click="remove(index)">
                                    <b-icon icon="dash-circle"></b-icon>
                                </i>
                            </b-td>
                        </b-tr>
                    </b-tbody>
                </b-table-simple>
                <b-pagination
                    v-if="items.length >= perPage"
                    class="pagination"
                    v-model="currentPage"
                    :total-rows="tableRows"
                    :per-page="perPage"
                ></b-pagination>
            </div>
            <div class="controls-area">
                <h3 class="Total text-center">Total: <b>$ {{total}}</b></h3>
                <div v-if="!wallet.exist">
                    <label>Usted puede sumar o utilizar <b>{{puntos}} puntos</b>.</label>
                </div>
                <form @submit.prevent="getWallet()" class="form-wallet row">
                    <b-form-input
                        v-model="wallet.cod"
                        class="inp-wallet col-8"
                        placeholder="Codigo del wallet"
                    ></b-form-input>
                    <input type="submit" class="btn btn-primary col-2" value="OK">
                </form>
                <div v-if="wallet.exist">
                    <label>Usted tiene <b>{{wallet.puntos}} puntos</b> en Wallet.</label>
                    <label v-if="puntos > 0">Puede utilizar <b>{{puntos + wallet.puntos}} puntos</b>.</label>
                </div>
                <div v-else class="errors">
                    <p v-for="error in errors" :key="error.id">{{error}}</p>
                </div>
                <b-row class="btn-section">
                    <b-button @click="aplyPTS()" pill variant="warning">Usar Puntos</b-button>
                    <b-button @click="pagar()" pill variant="success">Pagar</b-button>
                </b-row>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import {mapState} from 'vuex'
export default {
    data() {
        return {
            currentPage: 1,
            perPage: 5,
            id: null,
            items:[],
            cantidad: 1,
            total: 0,
            data: [],
            puntos: 0,
            wallet: {
                cod: null,
                puntos: 0,
                exist: false
            },
            
            dismissSecs: 5,
            dismissCountDown: 0,
            errors: []
            // sale: null
        }
    },
    computed: {
        ...mapState(['URLapi','axiosConfig']),
        search(){
            let filtered = this.data.filter(element => {
                return element.producto_id.includes(this.id)
            })
            return filtered.length === 1 ? filtered[0] : {}
            // 
        },
        makeSubtotal(){
            return this.search.precio ? this.search.precio * this.cantidad : 0
        },
        tableRows(){
            return this.items.length
        }
    },
    methods: {
        async getAll() {
            try {
                let res = await axios.get(this.URLapi + 'productos')
                // console.log(res.data)
                this.data = res.data
            } catch (error) {
                console.log(error)
            } finally {
                
            }
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
        async updatePTS(pts){
            try {
                let res = await axios.put(this.URLapi + 'wallets/edit_pts/' + this.wallet.cod, pts, this.axiosConfig)
            } catch(error) {
                console.log(error)
            } finally {

            }
        },
        aplyPTS(){
            let residuo = 0
            let descuento = parseInt(this.puntos) + parseInt(this.wallet.puntos)
            if(this.total-descuento < 0){
                residuo = Math.abs(this.total-descuento)
            }
            this.total = this.total - (descuento - residuo)
            this.puntos = 0
            this.wallet.puntos = residuo
            console.log('desc: ' + descuento + '\nresiduo: ' + residuo + '\ntotal: ' + this.total)
        },
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        pagar(){
            this.addSale()
            if(this.wallet.exist){
                this.updatePTS({puntos: this.wallet.puntos + this.puntos})
            }
            this.wallet.exist = false
            this.wallet.cod = null
            this.wallet.puntos = 0
            this.items = []
            this.sale = null
            this.total = 0
            this.$refs['producto_id'].focus()
            this.dismissCountDown = this.dismissSecs
        },
        async addSale(){
            try {
                let fecha1 = new Date().toLocaleString()
                let fecha2 = fecha1.split(' ')[0]
                fecha2 = fecha2.split('/').reverse().join('-')
                fecha1 = fecha2 + ' ' + fecha1.split(' ')[1]
                
                let payload = {
                    total: this.total,
                    fecha: fecha1,
                    items: this.items
                }
                console.log(payload)
                let res = await axios.post(this.URLapi + 'ventas/add', payload, this.axiosConfig)
                console.log(res.data)
            } catch(error) {
                console.log(error)
            }
        },
        reset(){
            this.search = null
            this.id = null
            this.cantidad = 1
        },
        add(){
            if(this.search.producto_id){
                let element = {
                    nombre: this.search.nombre,
                    producto_id: this.search.producto_id,
                    cantidad: parseFloat(this.cantidad),
                    precio: this.search.precio,
                    subtotal: parseFloat(this.makeSubtotal),
                }
                console.log(this.search.producto_id)
                let repetido = false
                this.items.forEach(x => {
                    // console.log(x.producto_id)
                    if(x.producto_id === element.producto_id){
                        x.cantidad += element.cantidad
                        x.subtotal += element.subtotal
                        repetido = true
                    }
                });
                if(!repetido){
                    this.items.push(element)
                }
                this.total += element.subtotal
                this.makePTS()
            }
            this.$refs['producto_id'].focus()
            this.reset()
            // console.log(this.items)
            // console.log(this.items[0].cantidad)
        },
        makePTS(){
            this.puntos = Math.trunc(this.total/100) * 10
        },
        remove(index){
            this.total -= this.items[index].subtotal
            this.items.splice(index, 1)
            this.makePTS()
        },
        pagination(items){
            const start = (this.currentPage - 1) * this.perPage
            const end = 
                start + this.perPage > items.length
                ? items.length
                : start + this.perPage
            return items.slice(start, end)
        }
        
    },
    created() {
        this.getAll()
    },
    
}
</script>
<style scoped>
.head{
    color: #2f4c48;
    font-weight: bold;
}
.form-products{
    display: flex;
    align-items: baseline ;
}
.display-info{
    /* height: 2.5em; */
    /* background: #e8e8ea; */
    display: flex;
    align-items: baseline ;
}
.btn-remove{
    cursor:pointer; cursor: hand;
    color: #dc3545;
}

.Total{
    background: #f8f9fa ;
    
    padding-top: 1em;
    margin: 0.5em;
    height: 3em;
}
.btn-section{
    margin: 1em;
    display: flex;
    justify-content: space-around;
}
.form-wallet{
    display: flex;
    justify-content: center;
}
.controls-area{
    background: #e8e8ea;
    display: flex;
    flex-direction: column;
    padding: 1em;
}
.order-data{
    display: grid;
    grid-template-columns: 4fr 2fr;
    bottom: 0;
    height: 60vh;
}
.order-data > * {
    margin: 1em;

}
</style>