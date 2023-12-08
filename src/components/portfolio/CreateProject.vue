<script setup>
    import {

        ref,
        onMounted

    } from 'vue'

    import { useStore } from 'vuex'
    import axios        from 'axios'

    import XMark    from '../icons/XMark.vue'
    import defImage from '@/assets/1200x750.jpg'


    const url        = ref( '' )
    const baseURL    = ref( '' )
    const imageSrc   = ref( '' )
    const imageInput = ref( null )


    const store = useStore()

    const showProject = () => {

        url.value      = ''
        baseURL.value  = ''
        imageSrc.value = defImage

        store.commit( 'showProject' )
    }


    onMounted( () => {

        imageSrc.value = defImage
    })


    const imageListener = () => {

        if( imageInput.value && imageInput.value.files.length > 0 )
        {
            const file     = imageInput.value.files[ 0 ]
            imageSrc.value = URL.createObjectURL( file )
        }
    }


    const createInfo = () => {

        const formData = new FormData()

        formData.append( 'url', url.value )
        formData.append( 'baseURL', baseURL.value )
        formData.append( 'image', imageInput.value.files[ 0 ] )

        axios.post( 'http://localhost:3000/api/v1/portfolio', formData, {

            headers: {

                Authorization: `Bearer ${ localStorage.getItem( 'token' ) }`
            }
        })
        .then( () => {

            store.commit( 'showProject' )
        })
        .catch(( err ) => {

            console.log( err.response.data.msg )
        })
    }
</script>

<template>
    <div id="createProject">
        <form @submit.prevent="createInfo">
            <div class="image">
                <img :src="imageSrc" alt="Image" />

                <input
                    required
                    type="file"
                    name="image"
                    accept="image/*"
                    ref="imageInput"
                    @change="imageListener"
                />
            </div>

            <div class="input_box">
                <input
                    required
                    type="url"
                    name="url"
                    v-model="url"
                    autocomplete="off"
                    pattern="https://.*"
                    placeholder="https://example.com"
                />

                <input
                    required
                    type="text"
                    name="baseURL"
                    v-model="baseURL"
                    autocomplete="off"
                    placeholder="example.com"
                />

                <button type="submit">Save</button>
            </div>
        </form>

        <button @click="showProject">
            <XMark />
        </button>
    </div>
</template>

<style scoped>
    #createProject
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

    #createProject > button
    {
        width: 100%;
        color: #fff;
        display: flex;
        font-size: 2rem;
        padding: .5rem 0;
        margin-top: .5rem;
        justify-content: center;
        border: .1rem solid #fff;
        background-color: #dc143c;
    }

    #createProject > form
    {
        display: flex;
        padding: 1rem;
        align-items: center;
        border-radius: .3rem;
        flex-direction: column;
        background-color: #000;
        border: .1rem solid #fff;
    }

/***** ****/

    #createProject > form > .image
    {
        width: 100%;
        display: flex;
        margin: 0 0 1rem;
        position: relative;
    }

    #createProject > form > .image > img
    {
        max-width: 100%;
    }

    #createProject > form > .image > input[ type=file ]
    {
        opacity: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
        position: absolute;
    }

/***** ****/

    #createProject > form > .input_box
    {
        gap: 1rem;
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    #createProject > form > .input_box > input
    {
        outline: none;
        color: #fff;
        font-size: 1.3rem;
        padding: .5rem 1rem;
        border-radius: .2rem;
        border: .1rem solid #ff9301;
        background-color: rgba(0, 0, 0, 0.467);
    }

    #createProject > form > .input_box > button
    {
        font-size: 1.3rem;
        font-weight: bold;
        text-align: center;
        padding: .5rem 1rem;
        border-radius: .2rem;
        background-color: #ff9301;
    }

/***** ****/

    @media ( min-width: 36em )
    {
        #createProject > button
        {
            width: 36rem;
        }

        #createProject > form
        {
            width: 36rem;
        }

        #createProject > form > .image
        {
            width: 25rem;
        }
    }
</style>