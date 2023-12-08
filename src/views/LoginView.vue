<script setup>
    import { ref } from 'vue'
    import axios   from 'axios'
    import router  from '../router'


    const email    = ref( null )
    const password = ref( null )


    const login = () => {

        const user = {

            email    : email.value,
            password : password.value
        }

        axios.post( 'http://localhost:3000/api/v1/login', user )
        .then(( res ) => {

            router.push( '/' )
            localStorage.setItem( 'token', res.data.token )
        })
        .catch(( err ) => {

            console.log( err.response.data.msg )
        })
    }
</script>

<template>
    <div id="login">
        <form @submit.prevent="login">
            <input
                required
                type="email"
                v-model="email"
                autocomplete="off"
                placeholder="Email"
            />

            <input
                required
                type="password"
                autocomplete="off"
                v-model="password"
                placeholder="Password"
            />

            <button type="submit">Login</button>
        </form>
    </div>
</template>

<style scoped>
    #login
    {
        height: 100vh;
        display: flex;
        padding: 0 1rem;
        align-items: center;
        justify-content: center;
    }

    #login > form
    {
        padding: 2rem;
        border-radius: .2rem;
        background-color: rgba(0, 0, 0, 0.467);
    }

    #login > form > input
    {
        outline: none;
        padding: .5rem 1rem;
        margin-bottom: 1rem;
        background-color: #fff;
    }

    #login > form > button
    {
        width: 100%;
        padding: .5rem 0;
        font-size: 1.3rem;
        text-align: center;
        background-color: #ff9301;
    }
</style>