<script setup>
    import axios        from 'axios'
    import { useStore } from 'vuex'

    import {

        ref,
        watch,
        onMounted

    } from 'vue'

    import Plus    from '../components/icons/Plus.vue'
    import Project from '../components/portfolio/Project.vue'


    const projects = ref( [] )


    onMounted( () => {

        getProject()
    })


    watch( () => projects.value, () => {

        getProject()
    })


    const store = useStore()

    const showProject = () => {

        store.commit( 'showProject' )
    }


    const getProject = () => {

        axios.get( 'http://localhost:3000/api/v1/portfolio' )
        .then(( res ) => {

            projects.value = res.data.data
        })
        .catch(( err ) => {

            console.log( err.response.data.msg )
        })
    }
</script>

<template>
    <div id="portfolio">
        <div class="add_project">
            <button @click="showProject">
                Add Project
                <Plus />
            </button>
        </div>

        <div class="project_list">
            <Project
                v-for="( project, index ) in projects"
                :key     = index
                :id      = project._id
                :url     = project.url
                :image   = project.imgPath
                :baseURL = project.baseURL
            />
        </div>
    </div>
</template>

<style scoped>
    #portfolio > .add_project > button
    {
        display: flex;
        font-size: 1.2rem;
        width: fit-content;
        padding: .5rem 1rem;
        align-items: center;
        border-radius: .3rem;
        background-color: #fff;
    }

    #portfolio > .add_project > button > svg
    {
        margin-left: 1rem;
    }

/***** ****/

    #portfolio > .project_list
    {
        gap: 2rem;
        display: grid;
        margin-top: 3rem;
        grid-auto-rows: auto;
    }


    @media ( min-width: 48em )
    {
        #portfolio > .project_list
        {
            grid-template-columns: repeat( 2, 1fr );
        }
    }
</style>