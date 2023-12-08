<script setup>
    import { ref } from 'vue'
    import axios   from 'axios'
    import router  from '../../router'


    const data = ref({

        pass      : '',
        newPass   : '',
        againPass : ''
    })


    const updatePass = () => {

        axios.post( 'http://localhost:3000/api/v1/changePassword', data.value, {

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
    <div id="password">
        <form @submit.prevent="updatePass">
            <div class="container">
                <div>
                    <input
                        required
                        id="pass"
                        name="pass"
                        type="password"
                        v-model="data.pass"
                    />
                    <label for="newPass" :class="{ 'inpPos': data.pass.length > 0 }">Your Password</label>
                </div>

                <div>
                    <input
                        required
                        id="newPass"
                        name="newPass"
                        type="password"
                        v-model="data.newPass"
                    />
                    <label for="newPass" :class="{ 'inpPos': data.newPass.length > 0 }">New Password</label>
                </div>

                <div>
                    <input
                        required
                        id="againPass"
                        type="password"
                        name="againPass"
                        v-model="data.againPass"
                    />
                    <label for="againPass" :class="{ 'inpPos': data.againPass.length > 0 }">New Password Again</label>
                </div>
            </div>

            <button type="submit">Save</button>
        </form>
    </div>
</template>

<style scoped>
    #password
    {
        display: flex;
        justify-content: center;
    }

    #password > form
    {
        width: 30rem;
        padding: 2rem;
        background-color: rgba( 0, 0, 0, 0.467 );
    }

    #password > form > button
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

    #password > form > .container
    {
        gap: 2rem;
        display: flex;
        margin: 0 auto;
        border-radius: .3rem;
        flex-direction: column;
    }

/***** ****/

    #password > form > .container > div
    {
        position: relative;
    }

    #password > form > .container > div > input
    {
        color: #fff;
        outline: none;
        font-size: 1.2rem;
        padding: .7rem 1rem;
        border-radius: .2rem;
        border: .2rem solid #fff;
    }

    #password > form > .container > div > label
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

    #password > form > .container > div  > .inpPos
    {
        top: -.7rem;
    }

    #password > form > .container > div > input:focus + label
    {
        top: -.7rem;
    }
</style>