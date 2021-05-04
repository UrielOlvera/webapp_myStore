<template>
    <div>
        <!-- <h3>Inventario</h3> -->
        <b-button class="m-3" variant="primary" v-b-modal="'modalAdd'" @click="clearElement()">Agregar</b-button>
        <b-table 
            id="t-inventario" 
            striped 
            hover 
            :items="items" 
            :fields="fields"
            :per-page="perPage"
            :current-page="currentPage"
        >
            <template v-slot:cell(producto_id)="{value}">
                <!-- <b-button variant="info" v-b-modal="'modalInfo'" @click="getElement(value)">
                    <b-icon icon="info-circle"></b-icon>
                </b-button>  -->
                <b-link variant="info" v-b-modal="'modalInfo'" @click="getElement(value)">{{value}}</b-link>
            </template>
            <template v-slot:cell(actions)="{item}">
                <b-button variant="primary" v-b-modal="'modalEdit'" @click="getElement(item.producto_id)">
                    <b-icon icon="pencil"></b-icon>
                </b-button>
                <b-button variant="danger" v-b-modal="'modalDelete'" @click="getId(item.producto_id)">
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
            aria-controls="t-inventario"
        ></b-pagination>
        <b-alert
            :show="dismissCountDown"
            dismissible
            fade
            variant="warning"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged"
        >
            Este elemento no puede eliminarse porque esta siendo usado
        </b-alert>
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
                <b-row>
                    <b-form-group
                        class="col-12"
                        label="Codigo"
                        invalid-feedback="Este campo es requerido"
                    >
                        <b-form-input
                            v-model="element.producto_id"
                            type="text"
                            required
                        ></b-form-input>
                    </b-form-group>
                </b-row>
                <b-row>
                    <b-form-group
                        class="col-12"
                        label="Nombre"
                        invalid-feedback="Este campo es requerido"
                    >
                        <b-form-input
                            v-model="element.nombre"
                            type="text"
                            required
                        ></b-form-input>
                    </b-form-group>
                </b-row>
                <b-row>
                    <b-form-group
                        class="col-6"
                        label="Precio"
                        invalid-feedback="Este campo es requerido"
                    >
                        <b-form-input
                            v-model="element.precio"
                            type="number"
                            min="0"
                            required
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                        class="col-6"
                        label="Stock"
                    >
                        <b-form-input
                            v-model="element.stock"
                            type="number"
                            min="0"
                        ></b-form-input>
                    </b-form-group>
                </b-row>
                <b-row>
                    <b-form-group
                        class="col-6"
                        label="Categoria"
                    >
                        <b-form-select
                            v-model="element.categoria"
                            :options="categoria_op"
                        ></b-form-select>
                    </b-form-group>
                    <b-form-group
                        class="col-6"
                        label="Unidad"
                    >
                        <b-form-select
                            v-model="element.unidad"
                            :options="unidad"
                        ></b-form-select>
                    </b-form-group>
                </b-row>
                <b-row>    
                    <b-form-group
                        class="col-12"
                        label="Descripcion"
                    >
                        <b-form-textarea
                            v-model="element.descripcion"
                            rows="2"
                        ></b-form-textarea>
                    </b-form-group>
                </b-row>
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
                <b-row>
                    <b-form-group
                        class="col-12"
                        label="Codigo"
                        invalid-feedback="Este campo es requerido"
                    >
                        <b-form-input
                            v-model="element.producto_id"
                            type="text"
                            required
                        ></b-form-input>
                    </b-form-group>
                </b-row>
                <b-row>
                    <b-form-group
                        class="col-12"
                        label="Nombre"
                        invalid-feedback="Este campo es requerido"
                    >
                        <b-form-input
                            v-model="element.nombre"
                            type="text"
                            required
                        ></b-form-input>
                    </b-form-group>
                </b-row>
                <b-row>
                    <b-form-group
                        class="col-6"
                        label="Precio"
                        invalid-feedback="Este campo es requerido"
                    >
                        <b-form-input
                            v-model="element.precio"
                            type="number"
                            min="0"
                            required
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                        class="col-6"
                        label="Stock"
                    >
                        <b-form-input
                            v-model="element.stock"
                            type="number"
                            min="0"
                        ></b-form-input>
                    </b-form-group>
                </b-row>
                <b-row>
                    <b-form-group
                        class="col-6"
                        label="Categoria"
                    >
                        <b-form-select
                            v-model="element.categoria"
                            :options="categoria_op"
                        ></b-form-select>
                    </b-form-group>
                    <b-form-group
                        class="col-6"
                        label="Unidad"
                    >
                        <b-form-select
                            v-model="element.unidad"
                            :options="unidad"
                        ></b-form-select>
                    </b-form-group>
                </b-row>
                <b-row>    
                    <b-form-group
                        class="col-12"
                        label="Descripcion"
                    >
                        <b-form-textarea
                            v-model="element.descripcion"
                            rows="2"
                        ></b-form-textarea>
                    </b-form-group>
                </b-row>
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
            header="Info"
        >
            <div class="row info-row" v-for="(key, value) of element" :key="value">
                <p class="col-6"><strong>{{value}}</strong></p>
                <p class="col-6 ">{{key}} </p>
                <hr>
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
    data(){
        return {
            fields: [
                {key: 'producto_id', label: 'Codigo'},
                // {headerTitle: 'producto_id', label: 'Codigo'},
                // {headerTitle: 'nombre', label: 'Titulo'},
                'nombre', 
                'categoria', 
                'stock',
                {key: 'actions', label: 'Acciones'}
            ],
            items: [],
            msg: null,
            categoria_op:[
                {value: null, text: 'Elije una opcion'},
                {value: 'Frutas y verduras', text: 'Frutas y verduras'},
                {value: 'Abarrotes', text: 'Abarrotes'},
                {value: 'Bebidas alcoholicas', text: 'Bebidas alcoholicas'},
                {value: 'Dulceria', text: 'Dulceria'},
                {value: 'Carnes', text: 'Carnes'},
                {value: 'Limpieza', text: 'Limpieza'},
                {value: 'Otros', text: 'Otros'},
            ],
            unidad:[
                {value: null, text: 'Elije una opcion'},
                {value: 'u', text: '(u) Unidad'},
                {value: 'paq', text: '(paq) Paquete'},
                {value: 'Kg', text: '(kg) Kilogramo'},
                {value: 'g', text: '(g) Gramo'},
                {value: 'L', text: '(L) Litro'},
                {value: 'ml', text: '(ml) Mililitro'},
            ],
            element_id: null,
            element: {},
            loading: true,

            error: false,
            dismissSecs: 5,
            dismissCountDown: 0,

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
                let res = await axios.get(this.URLapi + 'productos')
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
                let res = await axios.post(this.URLapi + 'productos/add', post, this.axiosConfig)
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
                let res = await axios.put(this.URLapi + 'productos/edit/' + post.producto_id, post, this.axiosConfig)
                // console.log(res.data)
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
                let headers = JSON.parse(JSON.stringify(this.axiosConfig))
                let res = await axios.delete(this.URLapi + 'productos/delete/' + this.element_id, headers)
                // console.log(res.data)
            } catch (error) {
                console.log(error)
                this.error = true
                this.dismissCountDown = this.dismissSecs
            } finally {

                this.$refs['modalDelete'].hide()
                this.getAll()
            }

        },
        async getElement(id){
            try{
                this.clearElement()
                let res = await axios.get(this.URLapi + 'productos/' + id)
                // console.log(id)
                this.element = res.data
            } catch (error) {
                console.log(error)
            } finally {

            }
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
.modal-footer{
    display: flex;
    align-content: space-between;
}

</style>