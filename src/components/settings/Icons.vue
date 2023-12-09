<script setup>
    import {

        ref,
        onMounted

    } from 'vue'

    import axios from 'axios'
    import Trash from '../icons/Trash.vue'


    const props = defineProps({

        id    : String,
        path  : String,
        title : String,
    })


    const svgPath = ref( '' )


    onMounted( () => {

        if( props.title === 'svg' )
        {
            getSVG()
        }
    })


    const getSVG = () => {

        axios.get( `http://localhost:3000/api/v1/addIcon/${ props.path }` )
        .then( ( res ) => {

            svgPath.value = res.data
        })
        .catch( ( err ) => {

            console.log( err.response.data.msg )
        })
    }


    const deleteIcon = () => {

        axios.delete( `http://localhost:3000/api/v1/addIcon/deleteIcon/${ props.id }`, {

            headers: {

                Authorization: `Bearer ${ localStorage.getItem( 'token' ) }`
            },

            data: {
                image : props.path,
                title : props.title
            }
        })
        .then(( res ) => {

            console.log( res.data.msg )
        })
        .catch(( err ) => {

            console.log( err.response.data.msg )
        })
    }
</script>

<template>
    <div class="icon">
        <button @click="deleteIcon">
            <Trash />
        </button>

        <div class="container">
            <img v-if="props.title === 'img'" :src="`http://localhost:3000/api/v1/addIcon/${ props.path }`" alt="Icon">

            <span v-else v-html="svgPath"></span>
        </div>
    </div>
</template>

<style scoped>
    .icon
    {
        width: 5rem;
        height: 7.4rem;
        position: relative;
        border-radius: .3rem;
        border: .2rem solid #fff;
    }

    .icon > button
    {
        width: 100%;
        color: #fff;
        display: flex;
        font-size: 1.2rem;
        padding: .6rem .8rem;
        justify-content: center;
        background-color: #dc143c;
        border-bottom: .2rem solid #fff;
    }

/***** ****/

    .icon > .container
    {
        display: flex;
        height: 4.4rem;
        align-items: center;
        justify-content: center;
        background-color: rgba( 0, 0, 0, 0.467 );
    }

    .icon > .container > img
    {
        max-width: 60%;
    }
</style>