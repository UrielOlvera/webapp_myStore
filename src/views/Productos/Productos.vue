<template>
    <div>
        <h1 class="mt-3">Productos</h1>
        <div class="nav-page">
            <NavPage :links="links"/>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import NavPage from '../../components/NavPage'

export default {
    components:{
        NavPage
    },
    data(){
        return {
            links: [
                {label: 'Inventario', href: '/productos'},
                // {label: 'Actualizar Stock', href: '/productos/update-stock'}
            ]
        }
    }
}
</script>
<style scoped>

</style>