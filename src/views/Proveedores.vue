<template>
    <div>
        <h1 class="mt-3">Proveedores</h1>
        <b-button class="m-3" variant="primary" v-b-modal="'modalAdd'" @click="clearElement()">Agregar</b-button>
        <b-table 
            id="t-proveedores" 
            striped 
            hover 
            :items="items" 
            :fields="fields"
            :per-page="perPage"
            :current-page="currentPage"
        >
            <template v-slot:cell(proveedor_id)="{value}">
                <b-button variant="info" v-b-modal="'modalInfo'" @click="getElement(value)">
                    <b-icon icon="info-circle"></b-icon>
                </b-button>
            </template>
            <template v-slot:cell(actions)="{item}">
                <b-button variant="primary" v-b-modal="'modalEdit'" @click="getElement(item.proveedor_id)">
                    <b-icon icon="pencil"></b-icon>
                </b-button>
                <b-button variant="danger" v-b-modal="'modalDelete'" @click="getId(item.proveedor_id)">
                    <b-icon icon="trash"></b-icon>
                </b-button>
            </template>
        </b-table>
        <div v-if="loading == true" class="text-center">
            <b-spinner variant="primary" label="Text Centered"></b-spinner>
        </div>
        <div v-if="msg">
            <p class="text-center">{{msg}}</p>
        </div>
        <b-pagination
            v-if="items.length > perPage"
            class="pagination"
            v-model="currentPage"
            :total-rows="tableRows"
            :per-page="perPage"
            aria-controls="t-proveedores"
        ></b-pagination>
        <b-modal
            id="modalAdd"
            ref="modalAdd"
            title="Agregar"
            hide-footer
            header-bg-variant="primary" 
            header-text-variant="white" 
            body-bg-variant="light"
        >
            <b-form>
                <b-form-group
                    label="Nombre"
                    invalid-feedback="Este campo es requerido"
                >
                    <b-form-input
                        autofocus
                        v-model="element.nombre"
                        type="text"
                        required
                    >
                    </b-form-input>
                </b-form-group>
                <b-form-group
                    label="Telefono"
                    invalid-feedback="Este campo es requerido"
                >
                    <b-form-input
                        v-model="element.telefono"
                        type="tel"
                        required
                    >
                    </b-form-input>
                </b-form-group>
                <b-form-group
                    label="Email"
                >
                    <b-form-input
                        v-model="element.email"
                        type="email"
                    >
                    </b-form-input>
                </b-form-group>
                <b-form-group
                    label="Direccion"
                >
                    <b-form-input
                        v-model="element.direccion"
                        type="text"
                    >
                    </b-form-input>
                </b-form-group>
                <b-form-group
                    label="Referencia"
                >
                    <b-form-input
                        v-model="element.referencia"
                        type="text"
                    >
                    </b-form-input>
                </b-form-group>
                <hr>
                <div class="modal-footer">
                    <b-button class="right" @click="closeModal('modalAdd')">Cancel</b-button>
                    <b-button variant="primary" @click="addElement()">Crear</b-button>
                </div>
                
            </b-form>
        </b-modal>
        <b-modal
            id="modalEdit"
            ref="modalEdit"
            title="Editar"
            hide-footer
            header-bg-variant="primary" 
            header-text-variant="white" 
            body-bg-variant="light"
        >
            <b-form>
                <b-form-group
                    label="Nombre"
                    invalid-feedback="Este campo es requerido"
                >
                    <b-form-input
                        autofocus
                        v-model="element.nombre"
                        type="text"
                        required
                    >
                    </b-form-input>
                </b-form-group>
                <b-form-group
                    label="Telefono"
                    invalid-feedback="Este campo es requerido"
                >
                    <b-form-input
                        v-model="element.telefono"
                        type="tel"
                        required
                    >
                    </b-form-input>
                </b-form-group>
                <b-form-group
                    label="Email"
                >
                    <b-form-input
                        v-model="element.email"
                        type="email"
                    >
                    </b-form-input>
                </b-form-group>
                <b-form-group
                    label="Direccion"
                >
                    <b-form-input
                        v-model="element.direccion"
                        type="text"
                    >
                    </b-form-input>
                </b-form-group>
                <b-form-group
                    label="Referencia"
                >
                    <b-form-input
                        v-model="element.referencia"
                        type="text"
                    >
                    </b-form-input>
                </b-form-group>
                <hr>
                <div class="modal-footer">
                    <b-button class="right" @click="closeModal('modalEdit')">Cancel</b-button>
                    <b-button variant="primary" @click="updateElement()">Guardar</b-button>
                </div >
                
            </b-form>
        </b-modal>
        <b-modal
            id="modalInfo"
            ref="modalInfo"
            title="Info"
            hide-footer
            header-bg-variant="info" 
            header-text-variant="white" 
            body-bg-variant="light"
        >
            <div class="row" v-for="(key, value) of element" :key="value">
                <p class="col-6"><strong>{{value}}</strong></p>
                <p class="col-6 ">{{key}} </p>
            </div>
            <hr>
            <div class="modal-footer">
                <b-button @click="OkInfo()" variant="primary">OK</b-button>
            </div>
        </b-modal>
        <b-modal
            id="modalDelete"
            ref="modalDelete"
            title="Eliminar registro"
            hide-footer
            header-bg-variant="danger" 
            header-text-variant="white" 
            body-bg-variant="light"
        >
            <p>¿Desea eliminar este registro?</p>
            <hr>
            <div class="modal-footer">
                <b-button @click="closeModal('modalDelete')">Cancel</b-button>
                <b-button @click="deleteElement()" variant="danger">Eliminar</b-button>
            </div>
        </b-modal>
    </div>
</template>
<script>
import axios from 'axios'
import {mapState} from 'vuex'
export default {
    component:{
    },
    data(){
        return {
            fields: [
                {key: 'proveedor_id', label: 'Ver'},
                'nombre', 
                'telefono', 
                'email',
                {key: 'actions', label: 'Acciones'}
            ],
            items: [],
            msg: null,
            element_id: null,
            element: {},
            loading: true,
            // post: {}
            currentPage: 1,
            perPage: 5,
        }
    },
    computed: {
        ...mapState(['URLapi','axiosConfig']),
        tableRows(){
            return this.items.length
        }
    },
    methods: {
        clearElement(){
            this.element = {}
        },
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        OkInfo(){
            this.element = {}
            this.$refs['modalInfo'].hide()
        },
        closeModal(modal_id){
            this.$refs[modal_id].hide()
        },
        getId(id){
            this.element_id = id
            // console.log(this.element_id)
        },
        async getAll() {
            this.msg = null
            try {
                let res = await axios.get(this.URLapi + 'proveedores')
                // console.log(res.data)
                this.items = res.data
                if(this.items.length === 0){
                    this.msg = 'Sin resultados'
                }
            } catch (error) {
                console.log(error)
            } finally {
                this.loading = false
            }
        },
        async addElement(){
            try {
                let post = JSON.parse(JSON.stringify(this.element))
                // console.log(post)
                let res = await axios.post(this.URLapi + 'proveedores/add', post, this.axiosConfig)
                // console.log(res.data)
            } catch (error) {
                console.log(error)
            } finally {
                this.element = {}
                this.$refs['modalAdd'].hide()
                this.getAll()
            }
        },
        async updateElement(){
            try {
                let post = JSON.parse(JSON.stringify(this.element))
                let res = await axios.put(this.URLapi + 'proveedores/edit/' + post.proveedor_id, post)
            } catch (error) {
                console.log(error)
            } finally {
                this.element = {}
                this.$refs['modalEdit'].hide()
                this.getAll()
            }
        },
        async deleteElement(){
            try {
                let res = await axios.delete(this.URLapi + 'proveedores/delete/' + this.element_id)
                // console.log(res.data)
            } catch (error) {
                console.log(error)
            } finally {
                this.$refs['modalDelete'].hide()
                this.getAll()
            }
        },
        async getElement(id){
            try{
                this.clearElement()
                let res = await axios.get(this.URLapi + 'proveedores/' + id)
                // console.log(res.data)
                this.element = res.data
            } catch (error) {
                console.log(error)
            } finally {
                
            }
        },
    },
    created() {
        this.getAll()
    }
}
</script>
<style scoped>
.modal-footer{
    display: flex;
    align-content: space-between;
}
</style>