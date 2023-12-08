<script setup>
    import axios from 'axios'

    import {

        ref,
        watch,
        onMounted

    } from 'vue'

    import Plus from '../components/icons/Plus.vue'
    import Line from '../components/skills/Line.vue'


    const lines  = ref( [] )


    onMounted( () => {

        getLine()
    })

    watch( () => lines.value, () => {

        getLine()
    })


    const createLine = () => {

        axios.post( 'http://localhost:3000/api/v1/skills/line', {}, {

            headers: {

                Authorization: `Bearer ${ localStorage.getItem( 'token' ) }`
            }
        })
        .then(( res ) => {

            console.log( res.data.msg )
        })
        .catch(( err ) => {

            console.log( err )
        })
    }


    const getLine = () => {

        axios.get( 'http://localhost:3000/api/v1/skills/line' )
        .then(( res ) => {

            lines.value = res.data.data
        })
        .catch(( err ) => {

            console.log( err )
        })
    }
</script>

<template>
    <div class="add_line">
        <button @click="createLine">
            Add Line
            <Plus />
        </button>
    </div>

    <Line
        v-for="( line, index ) in lines"
        :key    = index
        :id     = line._id
        :random = line.random
    />
</template>

<style scoped>
    .add_line > button
    {
        display: flex;
        font-size: 1.2rem;
        width: fit-content;
        padding: .5rem 1rem;
        align-items: center;
        border-radius: .3rem;
        background-color: #fff;
    }

    .add_line > button > svg
    {
        margin-left: 1rem;
    }
</style>