<script setup>
    import axios from 'axios'

    import {

        ref,
        onMounted

    } from 'vue'

    import FieldComponent from '../informations/FieldComponent.vue'


    const rawData = ref({

        one   : [],
        two   : [],
        three : [],
        four  : [],
        five  : [],
        six   : []
    })


    const updateData = ( data, id ) => {

        rawData.value[ id ] = data
    }


    onMounted( () => {

        getWnM()
    })


    const getWnM = () => {

        axios.get( 'http://localhost:3000/api/v1/infoWnM' )
        .then(( res ) => {

            res.data.data[ 0 ].data.forEach( item => {

                Object.values( item ).forEach( val => {

                    rawData.value[ val.id ] = val
                })
            })
        })
        .catch(( err ) => {

            console.log( err )
        })
    }


    const createWnM = () => {

        axios.post( 'http://localhost:3000/api/v1/infoWnM', rawData.value, {

            headers: {

                Authorization : `Bearer ${ localStorage.getItem( 'token' ) }`
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
    <div id="work_media">
        <form @submit.prevent="createWnM">
            <div class="container">
                <FieldComponent id="one" holder="Select Work Icon" :data="rawData.one" @field="updateData" />
                <FieldComponent id="two" holder="Select Work Icon" :data="rawData.two" @field="updateData" />
                <FieldComponent id="three" holder="Select Work Icon" :data="rawData.three" @field="updateData" />
                <FieldComponent id="four" holder="Select Media Icon" :data="rawData.four" @field="updateData" />
                <FieldComponent id="five" holder="Select Media Icon" :data="rawData.five" @field="updateData" />
                <FieldComponent id="six" holder="Select Media Icon" :data="rawData.six" @field="updateData" />
            </div>

            <button type="submit">Save</button>
        </form>
    </div>
</template>

<style scoped>
    #work_media
    {
        margin-top: 2rem;
    }

/***** ****/

    #work_media > form > .container
    {
        gap: 1rem;
        display: grid;
    }

    #work_media > form > button
    {
        width: 100%;
        margin: 1rem auto;
        font-size: 1.2rem;
        font-weight: bold;
        text-align: center;
        padding: .5rem 1rem;
        border-radius: .2rem;
        border: .2rem solid #fff;
        background-color: #ff9301;
    }

/***** ****/

    @media ( min-width: 48em )
    {
        #work_media > form > .container
        {
            grid-template-columns: repeat( 3, 1fr );
        }
    }
</style>