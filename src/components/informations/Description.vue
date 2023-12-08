<script setup>
    import {

        ref,
        computed,
        onMounted

    } from 'vue'

    import axios from 'axios'


    const desc = ref({

        long: '',
        short: ''
    })


    onMounted( () => {

        getDesc()
    })


    const describe = computed( () => {

        return desc.value.long.length
    })


    const briefly = computed( () => {

        return desc.value.short.length
    })


    const getDesc = () => {

        axios.get( 'http://localhost:3000/api/v1/infoDesc' )
        .then(( res ) => {

            desc.value.long  = res.data.data[ 0 ].long
            desc.value.short = res.data.data[ 0 ].short
        })
        .catch(( err ) => {

            console.log( err )
        })
    }


    const createDesc = () => {

        axios.post( 'http://localhost:3000/api/v1/infoDesc', desc.value, {

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
    <div id="description">
        <form @submit.prevent="createDesc">
            <div class="container">
                <div class="box">
                    <textarea
                        required
                        name="describe"
                        maxlength="700"
                        v-model="desc.long"
                        placeholder="Describe Yourself"
                    ></textarea>

                    <span :style="{ color: describe >= 700 ? 'red' : 'black' }">
                        {{ describe }} / 700
                    </span>
                </div>

                <div class="box">
                    <textarea
                        required
                        name="briefly"
                        maxlength="140"
                        v-model="desc.short"
                        placeholder="Briefly Describe Yourself"
                    ></textarea>

                    <span :style="{ color: briefly >= 140 ? 'red' : 'black' }">
                        {{ briefly }} / 140
                    </span>
                </div>
            </div>

            <button type="submit">Save</button>
        </form>
    </div>
</template>

<style scoped>
    #description > form > .container
    {
        gap: 2rem;
        display: grid;
        margin-top: 2rem;
        padding: 2rem 1rem;
        background-color: rgba( 0, 0, 0, 0.467 );
    }

/***** ****/

    #description > form > .container > .box > textarea
    {
        width: 100%;
        color: #fff;
        height: 18rem;
        padding: 1rem;
        outline: none;
        resize: vertical;
        font-size: 1.1rem;
        border: .2rem solid #ff9301;
        background-color: rgba( 0, 0, 0, 0.212 );
    }

    #description > form > .container > .box > span
    {
        font-weight: bold;
        width: fit-content;
        padding: .5rem 1rem;
        border-radius: .3rem;
        background-color: #fff;
    }

    #description > form > button
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
        #description > form > .container
        {
            grid-template-columns: repeat( 2, 1fr );
        }
    }
</style>