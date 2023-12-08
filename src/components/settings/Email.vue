<script setup>
    import { ref } from 'vue'
    import axios   from 'axios'
    import router  from '../../router'


    const data = ref({

        pass     : '',
        newEmail : ''
    })


    const updateEmail = () => {

        axios.post( 'http://localhost:3000/api/v1/changeEmail', data.value, {

            headers: {

                Authorization : `Bearer ${ localStorage.getItem( 'token' ) }`
            }
        })
        .then( () => {

            router.push( '/login' )
            localStorage.removeItem( 'token' )
        })
        .catch(( err ) => {

            console.log( err.response.data.msg )
        })
    }
</script>

<template>
    <div id="email">
        <form @submit.prevent="updateEmail">
            <div class="container">
                <div>
                    <input
                        required
                        id="password"
                        type="password"
                        name="password"
                        autocomplete="off"
                        v-model="data.pass"
                    />
                    <label for="password" :class="{ 'inpPos': data.pass.length > 0 }">Password</label>
                </div>

                <div>
                    <input
                        required
                        id="email"
                        type="email"
                        name="email"
                        autocomplete="off"
                        v-model="data.newEmail"
                    />
                    <label for="email" :class="{ 'inpPos': data.newEmail.length > 0 }">Email</label>
                </div>
            </div>

            <button type="submit">Save</button>
        </form>
    </div>
</template>

<style scoped>
    #email
    {
        display: flex;
        justify-content: center;
    }

    #email > form
    {
        width: 30rem;
        padding: 2rem;
        background-color: rgba( 0, 0, 0, 0.467 );
    }

    #email > form > button
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

    #email > form > .container
    {
        gap: 2rem;
        display: flex;
        margin: 0 auto;
        border-radius: .3rem;
        flex-direction: column;
    }

/***** ****/

    #email > form > .container > div
    {
        position: relative;
    }

    #email > form > .container > div > input
    {
        color: #fff;
        outline: none;
        font-size: 1.2rem;
        padding: .7rem 1rem;
        border-radius: .2rem;
        border: .2rem solid #fff;
    }

    #email > form > .container > div > label
    {
        top: 1rem;
        left: 1rem;
        color: #fff;
        padding: 0 .5rem;
        position: absolute;
        border-radius: .2rem;
        pointer-events: none;
        background-color: #1b1f34;
        transition: all .3s ease-in-out;
    }

    #email > form > .container > div  > .inpPos
    {
        top: -.7rem;
    }

    #email > form > .container > div > input:focus + label
    {
        top: -.7rem;
    }
</style>