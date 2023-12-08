import { createStore } from 'vuex'


const store = createStore({

    state: {
        menu    : true,
        icon    : false,
        item    : false,
        project : false,
        random  : '',
    },

    getters: {

        getMenu: state => {
            return state.menu
        },

        getItem: state => {
            return state.item
        },

        getRandom: state => {
            return state.random
        },

        getProject: state => {
            return state.project
        },

        getIcon: state => {
            return state.icon
        }
    },

    mutations: {

        menuController: state => {

            const menuId  = document.querySelector( '#menu' )
            const content = document.querySelector( '#content' )

            if( window.innerWidth >= 992 )
            {
                content.style.marginLeft = state.menu ? '0' : '18rem'
            }

            menuId.style.width   = state.menu ? '0' : '18rem'
            menuId.style.opacity = '1'

            state.menu = !state.menu
        },

        contentResize: state => {

            const menuId  = document.querySelector( '#menu' )
            const content = document.querySelector( '#content' )

            if( window.innerWidth >= 992 )
            {
                content.style.marginLeft = state.menu ? '18rem' : '0'
            }
            else
            {
                content.style.marginLeft = '0'

                menuId.style.width   = '0'
                menuId.style.opacity = '0'

                state.menu = false
            }
        },

        showIcon: state => {
            state.icon = !state.icon
        },

        showItem: state => {
            state.item = !state.item
        },

        showProject: state => {
            state.project = !state.project
        },

        setRandom: ( state, val ) => {
            state.random = val
        }
    },

    actions: {},

    modules: {}
})


export default store