<script setup>
    import { ref }      from 'vue'
    import { useStore } from 'vuex'
    import axios        from 'axios'

    import XMark    from '../icons/XMark.vue'


    const imageInput = ref( null )

    const data = ref({

        svg  : '',
    })


    const store = useStore()

    const showIcon = () => {

        data.value.svg  = ''

        store.commit( 'showIcon' )
    }


    const svgListener = () => {

        if( imageInput.value && imageInput.value.files.length > 0 )
        {
            const file     = imageInput.value.files[ 0 ]
            data.value.svg = URL.createObjectURL( file )
        }
    }


    const addIcon = () => {

        const formData = new FormData()

        formData.append( 'image', imageInput.value.files[ 0 ] )

        axios.post( 'http://localhost:3000/api/v1/addIcon', formData, {

            headers: {

                Authorization : `Bearer ${ localStorage.getItem( 'token' ) }`
            }
        })
        .then( () => {

            data.value.svg   = ''
            imageInput.value = null

            store.commit( 'showIcon' )
        })
        .catch(( err ) => {

            console.log( err.response.data.msg )
        })
    }
</script>

<template>
    <div id="addIcon">
        <form @submit.prevent="addIcon">
            <div class="container">
                <input
                    type="file"
                    id="svgIcon"
                    name="svgIcon"
                    ref="imageInput"
                    accept="image/*"
                    @change="svgListener"
                />
                
                <img v-if="data.svg.length > 0" :src="data.svg" alt="Image">

                <label v-else for="icon">Select SVG File</label>
            </div>

            <button type="submit">Save</button>
        </form>

        <button @click="showIcon">
            <XMark />
        </button>
    </div>
</template>

<style scoped>
    #addIcon
    {
        z-index: 3;
        width: 100%;
        height: 100%;
        display: flex;
        position: fixed;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        background-color: rgba( 0, 0, 0, 0.467 );
    }

    #addIcon > button
    {
        width: 100%;
        color: #fff;
        display: flex;
        font-size: 2rem;
        padding: .5rem 0;
        margin-top: .5rem;
        justify-content: center;
        border: .2rem solid #fff;
        background-color: #dc143c;
    }

    #addIcon > form
    {
        width: 100%;
        padding: 2rem;
        background-color: rgba( 0, 0, 0, 0.467 );
    }

    #addIcon > form > button
    {
        width: 100%;
        padding: .5rem 0;
        margin-top: 2rem;
        font-size: 1.2rem;
        font-weight: bold;
        text-align: center;
        border-radius: .3rem;
        border: .2rem solid #fff;
        background-color: #ff9301;
    }

/***** ****/

    #addIcon > form > .container
    {
        gap: 2rem;
        display: flex;
        padding: 1rem;
        margin: 0 auto;
        position: relative;
        align-items: center;
        border-radius: .3rem;
        flex-direction: column;
        border: .2rem solid #fff;
    }

    #addIcon > form > .container > input
    {
        opacity: 0;
        color: #fff;
        outline: none;
        cursor: pointer;
        font-size: 1.2rem;
        padding: .7rem 1rem;
        border-radius: .2rem;
        border: .2rem solid #fff;
    }

    #addIcon > form > .container > label
    {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        color: #fff;
        display: flex;
        position: absolute;
        align-items: center;
        pointer-events: none;
        justify-content: center;
    }

    #addIcon > form > .container > input::after
    {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        content: '';
        cursor: pointer;
        position: absolute;
    }

    #addIcon > form > .container > img
    {
        top: 0;
        height: 100%;
        position: absolute;
        pointer-events: none;
    }

/***** ****/

    @media ( min-width: 36em )
    {
        #addIcon > button
        {
            width: 36rem;
        }

        #addIcon > form
        {
            width: 36rem;
        }
    }
</style>