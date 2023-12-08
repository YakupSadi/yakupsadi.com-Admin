<script setup>
    import axios        from 'axios'
    import { useStore } from 'vuex'

    import {

        ref,
        onMounted

    } from 'vue'

    import defImage from '@/assets/1200x750.jpg'
    import XMark    from '../../components/icons/XMark.vue'


    const imageSrc   = ref( '' )
    const imageInput = ref( null )


    onMounted( () => {

        imageSrc.value = defImage
    })


    const store = useStore()

    const showItem = () => {

        imageSrc.value = defImage

        store.commit( 'showItem' )
    }


    const imageListener = () => {

        if( imageInput.value && imageInput.value.files.length > 0 )
        {
            const file     = imageInput.value.files[ 0 ]
            imageSrc.value = URL.createObjectURL( file )
        }
    }


    const imageUploader = () => {

        const formData = new FormData()

        formData.append( 'random', store.state.random )
        formData.append( 'image', imageInput.value.files[ 0 ] )

        axios.post( 'http://localhost:3000/api/v1/skills/item', formData, {

            headers: {

                Authorization: `Bearer ${ localStorage.getItem( 'token' ) }`
            }
        })
        .then(() => {

            store.commit( 'showItem' )
        })
        .catch(( err ) => {

            console.log( err )
        })
    }
</script>

<template>
    <div id="create_item">
        <form @submit.prevent="imageUploader">
            <div class="image">
                <img :src="imageSrc" alt="Image"  />

                <input
                    required
                    type="file"
                    name="image"
                    accept="image/*"
                    ref="imageInput"
                    @change="imageListener"
                />
            </div>

            <button type="submit">Save</button>
        </form>

        <div class="x_mark" @click="showItem">
            <XMark />
        </div>
    </div>
</template>

<style scoped>
    #create_item
    {
        z-index: 3;
        width: 100vw;
        height: 100vh;
        display: flex;
        position: fixed;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.57);
    }

    #create_item > form
    {
        padding: 1rem;
        display: flex;
        width: fit-content;
        align-items: center;
        flex-direction: column;
        background-color: #000;
        border: .2rem solid #fff;
    }

/***** ****/

    #create_item > form > .image
    {
        width: 100%;
    }

    #create_item > form > .image > img
    {
        max-width: 100%;
        max-height: 100%;
    }

    #create_item > form > .image > input
    {
        padding: .5rem;
        background-color: #fff;
    }

    #create_item > form > button
    {
        width: 100%;
        margin-top: 1rem;
        text-align: center;
        padding: .5rem 2rem;
        background-color: #ff9301;
    }

/***** ****/

    #create_item > .x_mark
    {
        width: 100%;
        display: flex;
        cursor: pointer;
        padding: .5rem 0;
        margin-top: .5rem;
        justify-content: center;
        border: .2rem solid #fff;
        background-color: #dc143c;
    }

    #create_item > .x_mark > svg
    {
        color: #fff;
        font-size: 1.5rem;
    }

/***** ****/

    @media ( min-width: 36em )
    {
        #create_item > form > .image
        {
            width: 27rem;
        }

    /***** ****/

        #create_item > .x_mark
        {
            width: 29rem;
            display: flex;
            cursor: pointer;
            padding: .5rem 0;
            justify-content: center;
            background-color: #dc143c;
        }
    }
</style>