<script setup>
    import axios        from 'axios'
    import { useStore } from 'vuex'

    import {

        ref,
        watch,
        onMounted

    } from 'vue'

    import Plus  from '../icons/Plus.vue'
    import Trash from '../icons/Trash.vue'
    import Item  from '../skills/Item.vue'


    const props = defineProps({

        id     : String,
        random : String,
    })


    const skills = ref( [] )


    onMounted( () => {

        getAllSkills()
    })


    watch( () => skills.value, () => {

        getAllSkills()
    })


    const store = useStore()

    const showItem = () => {

        store.commit( 'showItem' )
        store.commit( 'setRandom', props.random )
    }


    const getAllSkills = () => {

        axios.get( 'http://localhost:3000/api/v1/skills/item' )
        .then(( res ) => {

            skills.value = res.data.data.filter( data => data.random == props.random )
        })
        .catch(( err ) => {

            console.log( err )
        })
    }


    const deleteLine = () => {

        axios.delete( `http://localhost:3000/api/v1/skills/deleteLine/${ props.id }`, {

            headers: {

                Authorization: `Bearer ${ localStorage.getItem( 'token' ) }`
            }
        })
        .then(( res ) => {

            console.log( res.data.msg )
        })
        .catch(( err ) => {

            console.log( err )
        })
    }
</script>

<template>
    <div class="line_item">
        <div class="buttons">
            <button @click="deleteLine">
                <Trash />
            </button>

            <button @click="showItem">
                <Plus />
            </button>
        </div>

        <Item
            v-for="( skill, index ) in skills"
            :key   = index
            :id    = skill._id
            :image = skill.image
        />
    </div>
</template>

<style scoped>
    .line_item
    {
        display: flex;
        padding: .5rem;
        flex-wrap: wrap;
        margin-top: 2rem;
        width: fit-content;
        border-radius: .3rem;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.467);
    }

/***** ****/

    .line_item > .buttons
    {
        width: 6rem;
        height: 6rem;
        margin: .5rem;
        display: flex;
        border-radius: .3rem;
        flex-direction: column;
    }

    .line_item > .buttons > button
    {
        width: 50%;
        height: 50%;
        color: #fff;
        display: flex;
        font-size: 1.2rem;
        align-items: center;
        justify-content: center;
        background-color: #ff9301;
    }

    .line_item > .buttons > button:nth-child( 1 )
    {
        border-radius: .3rem .3rem 0 .3rem;
    }

    .line_item > .buttons > button:nth-child( 2 )
    {
        margin-left: 50%;
        border-radius: 0 .3rem .3rem .3rem;
    }
</style>