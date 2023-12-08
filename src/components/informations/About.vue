<script setup>
    import {

        ref,
        onMounted

    } from 'vue'

    import axios from 'axios'


    const about = ref({

        title    : '',
        email    : '',
        fullName : '',

        firstSkill  : '',
        secondSkill : '',
        thirdSkill  : ''
    })


    
    onMounted( () => {

        getAbout()
    })


    const getAbout = () => {

        axios.get( 'http://localhost:3000/api/v1/infoAbout' )
        .then(( res ) => {

            for( let key in res.data.data[ 0 ].about[ 0 ] )
            {
                about.value[ key ] = res.data.data[ 0 ].about[ 0 ][ key ]
            }
        })
        .catch(( err ) => {

            console.log( err )
        })
    }


    const createAbout = () => {

        axios.post( 'http://localhost:3000/api/v1/infoAbout', about.value, {

            headers: {

                Authorization : `Bearer ${ localStorage.getItem( 'token' ) }`
            }
        })
        .then(( res ) => {

            getAbout()
        })
        .catch(( err ) => {

            console.log( err.response.data.msg )
        })
    }
</script>

<template>
    <div id="about">
        <form @submit.prevent="createAbout">
            <div class="container">
                <div class="box">
                    <input
                        required
                        type="text"
                        name="fullName"
                        autocomplete="off"
                        placeholder="Full Name"
                        v-model="about.fullName"
                    />
                    <input
                        required
                        type="text"
                        name="title"
                        autocomplete="off"
                        v-model="about.title"
                        placeholder="Jobs Title"
                    />
                    <input
                        required
                        type="email"
                        name="email"
                        autocomplete="off"
                        placeholder="Email"
                        v-model="about.email"
                    />
                </div>

                <div class="box">
                    <input
                        required
                        type="text"
                        name="firstSkill"
                        autocomplete="off"
                        placeholder="First Skill"
                        v-model="about.firstSkill"
                    />
                    <input
                        required
                        type="text"
                        name="secondSkill"
                        autocomplete="off"
                        placeholder="Second Skill"
                        v-model="about.secondSkill"
                    />
                    <input
                        required
                        type="text"
                        name="thirdSkill"
                        autocomplete="off"
                        placeholder="Third Skill"
                        v-model="about.thirdSkill"
                    />
                </div>
            </div>

            <button type="submit">Save</button>
        </form>
    </div>
</template>

<style scoped>
    #about
    {
        width: 100%;
        height: 100%;
        margin-top: 2rem;
    }

/***** ****/

    #about > form > .container > .box
    {
        gap: 1rem;
        display: grid;
        padding: 2rem 1rem;
        background-color: rgba( 0, 0, 0, 0.467 );
    }

    #about > form > .container > .box:nth-child( 2 )
    {
        margin-top: 2rem;
    }

    #about > form > .container > .box > input
    {
        padding: 1rem;
        outline: none;
        font-size: 1.2rem;
        border-radius: .2rem;
        background-color: #fff;
    }

    #about > form > button
    {
        width: 100%;
        font-size: 1.2rem;
        font-weight: bold;
        text-align: center;
        margin: 2rem auto 0;
        padding: .5rem 1rem;
        border-radius: .2rem;
        border: .2rem solid #fff;
        background-color: #ff9301;
    }

/***** ****/

    @media ( min-width: 48em )
    {
        #about > form > .container > .box
        {
            grid-template-columns: repeat( 3, 1fr );
        }
    }
</style>