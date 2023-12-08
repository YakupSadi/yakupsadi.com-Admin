<script setup>
    import {

        ref,
        onMounted

    } from 'vue'

    import axios from 'axios'


    onMounted( () => {

        getIcons()
    })


    const props = defineProps({

        id     : String,
        data   : Object,
        holder : String
    })


    const active = ref( false )

    const toggleDiv = () => {

        active.value = !active.value
    }


    const data = ref({

        id  : props.id,
        opt : '',
        inp : ''
    })


    const emit = defineEmits()

    const getOpt = () => {

        data.value.inp = data.value.inp || props.data.inp
        data.value.opt = data.value.opt || props.data.opt

        emit( 'field', data.value, props.id )
    }


    const getInp = ( e ) => {

        data.value.inp = e.target.value
        data.value.opt = data.value.opt || props.data.opt

        emit( 'field', data.value, props.id )
    }


    const icons   = ref( [] )

    const getIcons = () => {

        axios.get( 'http://localhost:3000/api/v1/addIcon' )
        .then(( res ) => {

            icons.value = res.data.data

            icons.value.forEach( ( icon, index ) => {

                if( icon.title === 'svg' )
                {
                    getSVG( icons.value[ index ].image, index )
                }
            })
        })
        .catch(( err ) => {

            console.log( err.response.data.msg )
        })
    }


    const getSVG = ( val, index ) => {

        axios.get( `http://localhost:3000/api/v1/addIcon/${ val }` )
        .then( ( res ) => {

            icons.value[ index ].image = res.data
        })
        .catch( ( err ) => {

            console.log( err.response.data.msg )
        })
    }
</script>

<template>
    <div class="box">
        <button type="button" @click="toggleDiv()">
            <span v-if="props.data.opt === ''">Select Icon</span>

            <span v-else-if="data.opt.endsWith( '</svg>' )" v-html="data.opt" class="svg_size"></span>
            <span v-else-if="props.data.opt && props.data.opt.endsWith( '</svg>' )" v-html="props.data.opt" class="svg_size"></span>

            <img v-else-if="props.data.opt" :src="`http://localhost:3000/api/v1/addIcon/${ props.data.opt }`" alt="Icon">
            <img v-else :src="`http://localhost:3000/api/v1/addIcon/${ data.opt }`" alt="Icon">
        </button>

        <Transition name="fade" mode="out-in">
            <fieldset v-show="active" @change="getOpt">
                <div v-for="icon in icons">
                    <input
                        type="radio"
                        v-model="data.opt"
                        :value="icon.image"
                        :id="props.id + icon.random"
                        :name="props.id + icon.random"
                    />

                    <label v-if="icon.title === 'img'" :for="props.id + icon.random">
                        <img :src="`http://localhost:3000/api/v1/addIcon/${ icon.image }`" alt="Icon">
                    </label>

                    <label v-else :for="props.id + icon.random" v-html="icon.image"></label>
                </div>
            </fieldset>
        </Transition>

        <input
            type="text"
            @input="getInp"
            autocomplete="off"
            :value="props.data.inp"
            :placeholder="props.holder"
        />
    </div>
</template>

<style scoped>
    .box
    {
        padding: 2rem 1rem;
        position: relative;
        background-color: rgba( 0, 0, 0, 0.467 );
    }

    .box > button
    {
        width: 100%;
        color: #fff;
        display: flex;
        height: 2.5rem;
        align-items: center;
        border-radius: .2rem;
        justify-content: center;
        background-color: #ff9301;
    }

    .box > button > span
    {
        height: 2rem;
        display: flex;
        font-size: 1.4rem;
    }

    .box > button > .svg_size
    {
        font-size: 2rem;
    }

    .box > button > img
    {
        height: 100%;
        padding: .2rem;
        max-width: 100%;
    }

    .box > input
    {
        color: #fff;
        outline: none;
        margin-top: 1rem;
        font-size: 1.2rem;
        padding: .5rem 1rem;
        border-radius: .2rem;
        border: .2rem solid #fff;
    }

    .box > fieldset
    {
        left: 0;
        gap: 1rem;
        top: 5rem;
        z-index: 1;
        width: 100%;
        border: none;
        display: flex;
        padding: 1rem;
        flex-wrap: wrap;
        overflow-y: auto;
        max-height: 15rem;
        position: absolute;
        justify-content: center;
        background-color: #ff9301;
    }

    .box > fieldset > div
    {
        width: 5rem;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
    }

    .box > fieldset > div > label
    {
        display: flex;
        height: 3.5rem;
        cursor: pointer;
        font-size: 2.7rem;
        padding: .2rem 1rem;
        border-radius: .2rem;
        border: .2rem solid #fff;
        transition: color, background-color .2s ease;
    }

    .box > fieldset > div > label:hover
    {
        color: #fff;
        background-color: #fff;
    }

    .box > fieldset > div > label > img
    {
        width: 100%;
        height: 100%;
    }

    .box > fieldset > div > input
    {
        display: none;
    }

/***** ****/

    .fade-enter-active,
    .fade-leave-active
    {
        transition: opacity 0.2s ease;
    }

    .fade-enter-from,
    .fade-leave-to
    {
        opacity: 0;
    }
</style>