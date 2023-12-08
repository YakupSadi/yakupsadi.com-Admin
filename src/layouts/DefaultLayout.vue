<script setup>
    import {

        onMounted,
        onBeforeUnmount,

    } from 'vue'

    import { useStore } from 'vuex'

    import Menu   from '../components/Menu.vue'
    import Header from '../components/Header.vue'

    import CreateItem    from '../components/skills/CreateItem.vue'
    import CreateProject from '../components/portfolio/CreateProject.vue'


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
        <CreateItem    v-show=" store.state.item "/>
        <CreateProject v-show=" store.state.project "/>

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

/***** ****/

    @media ( min-width: 36em )
    {}

    @media ( min-width: 48em )
    {}

    @media ( min-width: 62em )
    {}
</style>