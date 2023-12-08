<script setup>
    import axios        from 'axios'
    import { useStore } from 'vuex'

    import {

        ref,
        watch,
        onMounted

    } from 'vue'

    import Plus  from '../components/icons/Plus.vue'
    import Icons from '../components/settings/Icons.vue'

    
    const icons = ref( [] )


    onMounted( () => {

        getIcons()
    })


    watch( () => icons.value, () => {

        getIcons()
    })


    const store = useStore()

    const showIcon = () => {

        store.commit( 'showIcon' )
    }


    const getIcons = () => {

        axios.get( 'http://localhost:3000/api/v1/addIcon' )
        .then(( res ) => {

            icons.value = res.data.data
        })
        .catch(( err ) => {

            console.log( err.response.data.msg )
        })
    }
</script>

<template>
    <div id="icon">
        <div class="add_icon">
            <button @click="showIcon">
                Add Icon
                <Plus />
            </button>
        </div>

        <div class="icon_list">
            <Icons
                v-for="( icon, index ) in icons"
                :key   = index
                :id    = icon._id
                :path  = icon.image
                :title = icon.title
            />
        </div>
    </div>
</template>

<style scoped>
    #icon > .add_icon > button
    {
        display: flex;
        font-size: 1.2rem;
        width: fit-content;
        padding: .5rem 1rem;
        align-items: center;
        border-radius: .3rem;
        background-color: #fff;
    }

    #icon > .add_icon > button > svg
    {
        margin-left: 1rem;
    }

/***** ****/

    #icon > .icon_list
    {
        gap: 2rem;
        display: flex;
        flex-wrap: wrap;
        margin-top: 3rem;
        justify-content: center;
    }

/***** ****/

    @media ( min-width: 36em )
    {
        #icon > .icon_list
        {
            justify-content: left;
        }
    }
</style>