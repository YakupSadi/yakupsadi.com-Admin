<script setup>
    import '@/assets/global.css'

    import { RouterView } from 'vue-router'
    import router         from './router'
    import axios          from 'axios'

    import {

        onMounted,

    } from 'vue'


    onMounted( () => {

        log()
    })


    const log = () => {

        axios.post( 'http://localhost:3000/api/v1/auth', {}, {

            headers: {

                Authorization: `Bearer ${ localStorage.getItem( 'token' ) }`
            }
        })
        .then(( res ) => {

            console.log( res.data.message )
        })
        .catch(( err ) => {

            router.push( '/login' )
        })
    }
</script>

<template>
    <component :is="$route.meta.layout">
        <RouterView />
    </component>
</template>

<style scoped>

</style>