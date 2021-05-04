<template>
    <div class="sidebar text-white">
        <div class="head">
            <div v-if="logo != null">
                <img alt="logo" :src="logo">
            </div>
            <h1 class="title">
                {{title}}
            </h1>
            <hr>
        </div>
        
        <div class="menu-items">
            <div v-for="item of links" :key="item">
                <router-link :to="item.href" active-class="active" exact tag="btn" class="side-link row">
                    <b-icon class="col-3 align-self-center" :icon="item.icon"></b-icon>
                    <span class="col-9 link-label align-self-center">{{item.label}}</span>
                </router-link>
            </div>
        </div>
        <div class="foot">
            <b-button @click="logout()" variant="outline-light">Logout <b-icon icon="power" aria-hidden="true"></b-icon></b-button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Sidebar',
    props: {
        logo: String,
        title: String,
        links: Array
    },
    methods: {
        // showProps() {
        //     console.log("logo dir: ", this.logo, "\nTitle: ", this.title, "\nlinks: ", this.links)
        // },
        logout(){
            localStorage.clear();
            this.$router.push('/login')
        }
    },
    created() {
        // this.showProps()
    }
}
</script>
<style scoped>
.sidebar{
    background: #2f4c48;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to left, #51a58a, #2f4c48);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to left, #51a58a, #2f4c48); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
.head{
    margin-top: 2em;
}
.title{
    text-align: center;
}
.menu-items{
    display: flex;
    flex-direction: column;
    margin-top: 2em;
    /* padding-left: 1em; */
}
.menu-items > * {
    margin-top: 1em;
    height: 2.5em;
    width: 100%;
}
.side-link.active{
    height: 2.5em;
    font-weight: bolder;
    position: relative;
}
.side-link:hover{
    height: 2.5em;
    color: #e8e8ea;
    background-color: #ffffff10;
}
.side-link{
    height: 2.5em;
    border: none;
    cursor: pointer;
    font-size: 1em;
}
.side-link.active::after{
    position: absolute;
    content: "";

    left: 0;
    height: 2.5em;
    width: 1.2em;
    background: #e8e8ea;
}
.active{
    height: 2.5em;
    background-color: #ffffff20;
}
img{
    max-width: 100%;
}
hr{
    border-block-color: #e8e8ea;
    width: 90%;
}
.foot{
    /* display: flex;
    justify-content: center; */
    position: absolute;
    bottom: 5%;
    margin-left: 1em;
}
</style>