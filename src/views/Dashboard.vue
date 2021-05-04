<template>
    <div class="dashboard">
        <Sidebar 
            title="STORE" :links="links" :logo="logo"/>
        <div class="content container bg-light">
            <router-view/>
        </div>
    </div>
</template>
<script>
import Sidebar from '../components/Sidebar'
export default {
    name: 'Dashboard',
    components:{
        Sidebar
    },
    data(){

        return {
            // logo: '../assets/logo.png',
            links: [
                // {label: 'Home', href: '/', icon:'house'},
                // {label: 'Reportes', href: '/', icon: 'graph-up'},
                {label: 'Caja', href: '/', icon: 'cash-stack'},
                {label: 'Proveedores', href: '/proveedores', icon: 'collection'},
                {label: 'Productos', href: '/productos', icon: 'life-preserver'},
                {label: 'Wallets', href: '/wallets', icon: 'wallet'},
            ]
        }
    },
    mounted() {
        if(!localStorage.getItem('user_usname')){
            this.$router.push('/login')
        }
    },
}
</script>
<style scoped>
.content{
    
}
.dashboard{
    display: grid;
    grid-template-columns: 1fr 5fr;
    height: 100vh;
}
</style>