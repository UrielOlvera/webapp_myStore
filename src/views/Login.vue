<template>
    <div class="body">
        <b-card
            
            class="login shadow"
        >
            <h3 class="title text-center">Login</h3>
            <hr>
            <b-card-text>
                <form
                    @submit.prevent="login()"
                >
                    <b-form-group
                        label="Usuario"
                    >
                        <b-form-input
                            autofocus
                            v-model="usuario.username"
                            type="text"
                            ref="inp-username"
                            placeholder="Nombre de usuario"
                            required
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                        label="Contraseña"
                    >
                        <b-form-input
                            v-model="usuario.pass"
                            type="password"
                            placeholder="Contraseña"
                            required
                        ></b-form-input>
                    </b-form-group>
                    <input type="submit" value="Entrar" class="btn btn-primary btn-block">
                </form>
                <div v-if="errors" class="errors">
                    <p v-for="error in errors" :key="error.id">{{error}}</p>
                </div>
            </b-card-text>
        </b-card>
    </div>
</template>
<script>
import axios from 'axios'
import {mapState} from 'vuex'
export default {
    data(){
        return {
            usuario: {
                username: null,
                pass: null
            },
            errors: []
        }
    },
    computed: {
        ...mapState(['URLapi','axiosConfig']),
    },
    methods: {
        async login(){
            this.errors = []
            try {
                let res = await axios.post(this.URLapi + 'usuarios/login', this.usuario)
                // console.log(res.data)

                if(res.data){
                    localStorage.setItem('user_usname', res.data.username)
                    // localStorage.setItem('user_tocken', res.data.tocken)
                    this.$router.push('/dashboard')
                } else {
                    this.errors.push("El usuario o la contraseña estan mal escritos")
                }
            } catch (error) {
                console.log(error)
            } finally {
                this.usuario.username = null
                this.usuario.pass = null
                this.$refs['inp-username'].focus()

            }
        }
    },
    // validations: {
    //     usuario: {
    //         username: {
    //             requiered,
    //         },
    //         pass:{
    //             requiered,
    //         }
    //     }
    // }
}
</script>

<style scoped>
.login{
    width: 40%;
    margin: auto;
    margin-top: 5em;
    background: #e8e8ea;
}
</style>