<script setup>
    import axios from 'axios'
    import Trash from '../icons/Trash.vue'


    const props = defineProps({

        id      : String,
        url     : String,
        image   : String,
        baseURL : String
    })


    const deleteProject = () => {

        axios.delete( `http://localhost:3000/api/v1/portfolio/deleteProject/${ props.id }`, {

            headers: {

                Authorization: `Bearer ${ localStorage.getItem( 'token' ) }`
            },

            data: {
                image: props.image
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
    <div class="project">
        <button @click="deleteProject">
            <Trash />
        </button>

        <div class="container">
            <a :href="props.url">
                <div class="box">
                    <img :src="`http://localhost:3000/api/v1/portfolio/${ props.image }`" alt="URL">
                </div>

                <div class="box">
                    <span>{{ props.baseURL }}</span>
                </div>
            </a>
        </div>
    </div>
</template>

<style scoped>
    .project
    {
        position: relative;
        border-radius: .3rem;
        background-color: #fff;
        border: .3rem solid #fff;
    }

    .project > button
    {
        top: 0;
        right: 0;
        display: flex;
        color: #fff;
        font-size: 1.2rem;
        position: absolute;
        padding: .6rem .8rem;
        border-radius: 0 0 0 .2rem;
        background-color: #dc143c;
        border-left: .2rem solid #fff;
        border-bottom: .2rem solid #fff;
    }

/***** ****/

    .project > .container > a > .box:nth-child( 2 )
    {
        padding: .5rem 0;
        font-size: 1.2rem;
        font-weight: bold;
        text-align: center;
    }

    .project > .container > a > .box > img
    {
        max-width: 100%;
        max-height: 100%;
        object-fit: fill;
        aspect-ratio: 2 / 1;
    }
</style>