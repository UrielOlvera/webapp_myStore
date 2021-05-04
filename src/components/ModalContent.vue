<template>
    <div>
        content
        <div v-for="item of data" :key="item.id">
            <p>{{item}}</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ModalContent',
    data() {
        return {
            
        }
    },
    props: {
        data: Object
    },
    mutations: {
        // printTitle: this.isAdd ? 'Agregar' : 'Editar'
    }
}
</script>