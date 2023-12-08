<script setup>
    import { ref }      from 'vue'
    import axios        from 'axios'
    import { useStore } from 'vuex'

    import XMark    from '../icons/XMark.vue'


    const imageInput = ref( null )

    const data = ref({

        svg  : '',
        icon : ''
    })


    const store = useStore()

    const showIcon = () => {

        data.value.svg  = ''
        data.value.icon = ''

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
        formData.append( 'svgPath', data.value.icon )

        axios.post( 'http://localhost:3000/api/v1/addIcon', formData, {

            headers: {

                Authorization : `Bearer ${ localStorage.getItem( 'token' ) }`
            }
        })
        .then( () => {

            data.value.svg   = ''
            data.value.icon  = ''

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
                <div>
                    <input
                        id="icon"
                        type="text"
                        name="icon"
                        autocomplete="off"
                        v-model="data.icon"
                    />
                    <label for="icon" :class="{ 'inpPos': data.icon.length > 0 }">Paste Icon Path</label>
                </div>

                <div>
                    <span>OR</span>
                </div>

                <div>
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
        margin: 0 auto;
        border-radius: .3rem;
        flex-direction: column;
    }

/***** ****/

    #addIcon > form > .container > div
    {
        position: relative;
    }

    #addIcon > form > .container > div > input
    {
        color: #fff;
        outline: none;
        font-size: 1.2rem;
        padding: .7rem 1rem;
        border-radius: .2rem;
        border: .2rem solid #fff;
    }

    #addIcon > form > .container > div:nth-child( 1 ) > label
    {
        top: 1rem;
        left: 1rem;
        color: #fff;
        padding: 0 .5rem;
        position: absolute;
        border-radius: .2rem;
        pointer-events: none;
        background-color: #0f111c;
        transition: all .3s ease-in-out;
    }

    #addIcon > form > .container > div:nth-child( 1 ) > input:focus + label
    {
        top: -.7rem;
    }

    #addIcon > form > .container > div:nth-child( 1 ) > .inpPos
    {
        top: -.7rem;
    }

    #addIcon > form > .container > div:nth-child( 2 )
    {
        color: #fff;
        display: flex;
        font-size: 1.5rem;
        justify-content: center;
    }

    #addIcon > form > .container > div:nth-child( 3 )
    {
        border: .2rem solid #fff;
    }

    #addIcon > form > .container > div:nth-child( 3 ) > input
    {
        opacity: 0;
    }

    #addIcon > form > .container > div:nth-child( 3 ) > label
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

    #addIcon > form > .container > div:nth-child( 3 ) > input::after
    {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        content: '';
        cursor: pointer;
        position: absolute;
    }

    #addIcon > form > .container > div:nth-child( 3 ) > img
    {
        top: 0;
        left: 14rem;
        height: 100%;
        width: 3.6rem;
        position: absolute;
        pointer-events: none;
        background-color: #fff;
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