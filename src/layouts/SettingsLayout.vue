<script setup>
    import {

        onMounted,
        onBeforeUnmount,

    } from 'vue'

    import { useStore } from 'vuex'

    import Header from '../components/Header.vue'
    import Menu   from '../components/settings/Menu.vue'

    import AddIcon from '../components/settings/AddIcon.vue'


    const store = useStore()

    const storeResizeListener = () => {

        store.commit( 'contentResize' )
    }


    const addResizeListener = () => {

        window.addEventListener( 'resize', storeResizeListener )
    }

    const removeResizeListener = () => {
        window.removeEventListener( 'resize', storeResizeListener )
    }


    onMounted( () => {

        addResizeListener()
        storeResizeListener()
    })


    onBeforeUnmount( () => {

        removeResizeListener()
    })
</script>

<template>
    <div>
        <AddIcon v-show=" store.state.icon "/>

        <Header></Header>

        <main id="main">
            <Menu></Menu>

            <section id="content">
                <slot></slot>
            </section>
        </main>
    </div>
</template>

<style>
    #main
    {
        display: flex;
    }

/***** ****/

    #main > #content
    {
        width: 100%;
        padding: 2rem;
        margin-left: 0;
        background-color: #333a62;
        transition: margin-left .5s ease;
    }
</style>