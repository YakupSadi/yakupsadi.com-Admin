<script setup>
    import axios from 'axios'
    import Trash from '../icons/Trash.vue'


    const props = defineProps({

        id    : String,
        image : String,
    })


    const deleteItem = () => {

        axios.delete( `http://localhost:3000/api/v1/skills/deleteItem/${ props.id }`, {

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
        .catch((err) => {

            console.log( err.response.data.msg )
        })
    }
</script>

<template>
    <div class="item_box">
        <div class="item">
            <img :src="`http://localhost:3000/api/v1/skills/${ props.image }`" alt="Lang">
        </div>

        <button @click="deleteItem">
            <Trash />
        </button>
    </div>
</template>

<style scoped>
    .item_box
    {
        display: flex;
        margin: .5rem;
    }

/***** ****/

    .item_box > .item
    {
        width: 6rem;
        height: 6rem;
        display: flex;
        padding: .5rem;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        border-radius: .3rem 0 0 .3rem;
    }

    .item_box > .item > img
    {
        max-width: 100%;
    }

    .item_box > button
    {
        color: #fff;
        padding: 0 .4rem;
        background-color: #dc143c;
        border-radius: 0 .3rem .3rem 0;
    }
</style>