<script setup>
    import {

        ref,
        onMounted

    } from 'vue'

    import axios from 'axios'


    const hiddenImg = ref( '' )
    const hiddenBg  = ref( '' )

    const bgSrc    = ref( '' )
    const imageSrc = ref( '' )

    const bgInput    = ref( null )
    const imageInput = ref( null )


    onMounted( () => {

        getAllImages()
    })


    const bgImage = () => {

        if( bgInput.value && bgInput.value.files.length > 0 )
        {
            const file  = bgInput.value.files[ 0 ]
            bgSrc.value = URL.createObjectURL( file )
        }
    }


    const imgInput = () => {

        if( imageInput.value && imageInput.value.files.length > 0 )
        {
            const file     = imageInput.value.files[ 0 ]
            imageSrc.value = URL.createObjectURL( file )
        }
    }


    const getAllImages = () => {

        axios.get( 'http://localhost:3000/api/v1/infoImages' )
        .then(( res ) => {

            hiddenImg.value = res.data.data[ 0 ].image
            hiddenBg.value = res.data.data[ 0 ].bgImage
        })
        .catch(( err ) => {

            console.log( err )
        })
    }


    const createImages = () => {

        const formData = new FormData()

        formData.append( 'image', imageInput.value.files[ 0 ] )
        formData.append( 'bgImage', bgInput.value.files[ 0 ] )

        formData.append( 'bgOld', hiddenBg.value )
        formData.append( 'imgOld', hiddenImg.value )

        axios.post( 'http://localhost:3000/api/v1/infoImages', formData, {

            headers: {

                Authorization : `Bearer ${ localStorage.getItem( 'token' ) }`
            }
        })
        .then(( res ) => {

            getAllImages()
        })
        .catch(( err ) => {

            console.log( err.response.data.msg )
        })
    }
</script>

<template>
    <div id="image">
        <form @submit.prevent="createImages">
            <div class="container">
                <div class="box">
                    <img :src=" bgSrc ? bgSrc : `http://localhost:3000/api/v1/infoImages/${ hiddenBg }` " alt="Image" />

                    <input
                        type="file"
                        name="image"
                        ref="bgInput"
                        accept="image/*"
                        @change="bgImage"
                    />
                </div>

                <div class="box">
                    <img :src=" imageSrc ? imageSrc : `http://localhost:3000/api/v1/infoImages/${ hiddenImg }` " alt="Image" />

                    <input
                        type="file"
                        name="image"
                        ref="imageInput"
                        accept="image/*"
                        @change="imgInput"
                    />
                </div>
            </div>

            <button type="submit">Save</button>
        </form>
    </div>
</template>

<style scoped>
    #image
    {
        margin-top: 2rem;
    }

/***** ****/

    #image > form > .container
    {
        gap: 2rem;
        display: grid;
        padding: 1rem;
        position: relative;
        background-color: rgba( 0, 0, 0, 0.467 );
    }

    #image > form > button
    {
        width: 100%;
        color: #000;
        font-weight: bold;
        font-size: 1.3rem;
        text-align: center;
        margin: 2rem auto 0;
        padding: .5rem 1rem;
        border-radius: .2rem;
        border: .2rem solid #fff;
        background-color: #ff9301;
    }

/***** ****/

    #image > form > .container > .box
    {
        color: #fff;
        display: flex;
        padding: .5rem;
        overflow: hidden;
        max-height: 30rem;
        position: relative;
        align-items: center;
        justify-content: center;
        border: .3rem dashed #fff;
    }

    #image > form > .container > .box:nth-child( 2 )
    {
        margin: auto;
        max-width: 100%;
        aspect-ratio: 1;
        border-radius: 50%;
        height: fit-content;
    }

    #image > form > .container > .box > img
    {
        max-width: 100%;
        max-height: 100%;
    }

    #image > form > .container > .box > input
    {
        top: 0;
        left: 0;
        opacity: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
        position: absolute;
    }

/***** ****/

    @media ( min-width: 36em )
    {
        #image > form > .container > .box:nth-child( 2 )
        {
            max-width: 20rem;
            max-height: 20rem;
        }
    }


    @media ( min-width: 85em )
    {
        #image > form > .container
        {
            grid-template-columns: 2fr 1fr;
        }
    }
</style>