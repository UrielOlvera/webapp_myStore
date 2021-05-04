<template>
    <div>
        <b-nav tabs>
            <div v-for="item of links" :key="item.id">
                <b-nav-item exact exact-active-class="active" :to="item.href">
                    {{item.label}}
                </b-nav-item>
            </div>
        </b-nav>
    </div>
</template>
<script>
export default {
    name: 'NavPage',
    props: {
        links: Array
    }
}
</script>