<script setup>
    import { shallowRef  } from 'vue'

    import Image       from '../components/informations/Image.vue'
    import About       from '../components/informations/About.vue'
    import WorknMedia  from '../components/informations/WorknMedia.vue'
    import Description from '../components/informations/Description.vue'


    let comp = shallowRef( Image )

    const showComponent = ( val ) => {

        comp.value = val
    }
</script>

<template>
    <div id="informaitons">
        <div class="menu">
            <button @click="showComponent( Image )">Image</button>
            <button @click="showComponent( About )">About</button>
            <button @click="showComponent( WorknMedia )">Work & Media</button>
            <button @click="showComponent( Description )">Description</button>
        </div>

        <div class="item">
            <Transition name="slide" mode="out-in">
                <component :is="comp" :key="comp" />
            </Transition>
        </div>
    </div>
</template>

<style scoped>
    #informaitons > .menu
    {
        gap: 1rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    #informaitons > .menu > button
    {
        font-size: 1.2rem;
        padding: .5rem 1rem;
        border-radius: .2rem;
        background-color: #fff;
    }

/***** ****/

    .slide-enter-active,
    .slide-leave-active
    {
        transition: .3s ease;
    }

    .slide-enter-from{
        transform: translateX( -100% );
    }

    .slide-leave-to
    {
        opacity: 0;
    }
</style>