<script setup>
    import { useStore } from 'vuex'

    import MenuBar    from '../components/icons/MenuBar.vue'
    import FullScreen from '../components/icons/FullScreen.vue'


    let screen = false


    const fullScreen = () => {

        if( screen ) { document.exitFullscreen() }
        else         { document.documentElement.requestFullscreen() }

        screen = !screen
    }


    const store = useStore()

    const menuBtn = () => {

        store.commit( 'menuController' )
    }
</script>

<template>
    <header id="header">
        <div class="left_side">
            <div class="logo">
                <a href="/">
                    <img alt="Logo" src="@/assets/logo.png" />
                </a>
            </div>

            <button class="menu_bar" @click="menuBtn">
                <MenuBar />
            </button>
        </div>

        <button class="right_side" @click="fullScreen">
            <div id="screen">
                <FullScreen />
            </div>
        </button>
    </header>
</template>

<style scoped>
    #header
    {
        top: 0;
        z-index: 2;
        width: 100%;
        height: 5rem;
        display: flex;
        position: sticky;
        background-color: #2c3054;
        justify-content: space-between;
    }

/***** ****/

    #header > .left_side
    {
        display: flex;
        align-items: center;
    }

/***** ****/

    #header > .left_side > .logo
    {
        width: 5rem;
        padding: 1rem;
    }

    #header > .left_side > .logo > a > img
    {
        width: 100%;
    }

/***** ****/

    #header > .left_side > .menu_bar
    {
        cursor: pointer;
        color: #ff9301;
        font-size: 1.5rem;
        border-radius: 50%;
        padding: .2rem .6rem;
        background-color: rgba(0, 0, 0, 0.467);
    }

/***** ****/

    #header > .right_side
    {
        display: flex;
        margin-right: 1rem;
        align-items: center;
    }

/***** ****/

    #header > .right_side > #screen
    {
        cursor: pointer;
        color: #ff9301;
        font-size: 1.5rem;
        border-radius: 50%;
        padding: .2rem .6rem;
        background-color: rgba(0, 0, 0, 0.467);
    }
</style>