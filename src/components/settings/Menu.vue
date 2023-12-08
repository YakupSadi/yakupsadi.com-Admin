<script setup>
    import { RouterLink } from 'vue-router'

    import Email     from '../icons/Email.vue'
    import AddIcon   from '../icons/AddIcon.vue'
    import Password  from '../icons/Password.vue'
    import LeftArrow from '../icons/LeftArrow.vue'
</script>

<template>
    <section id="menu">
        <nav>
            <ul>
                <span>
                    Settings
                </span>
                <li>
                    <RouterLink to="/settings">
                        <AddIcon />
                        Add Icon
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/settings/password">
                        <Password />
                       Password 
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/settings/email">
                        <Email />
                        Email
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/">
                        <LeftArrow />
                        Go Back
                    </RouterLink>
                </li>
            </ul>
        </nav>
    </section>
</template>

<style scoped>
    #menu
    {
        z-index: 2;
        top: 4.9rem;
        width: 18rem;
        position: fixed;
        overflow-y: auto;
        overflow-x: hidden;
        scrollbar-gutter: stable;
        transition: width .5s ease;
        background-color: #2c3054;
        height: calc( 100vh - 4.9rem );
    }

    #menu > nav > ul
    {
        margin-top: 2rem;
        white-space: nowrap;
        padding: 0 2rem 1rem;
    }

    #menu > nav > ul > li
    {
        color: #fff;
        display: flex;
        margin: 1rem 0;
        font-size: 1.1rem;
        align-items: center;
        border-radius: .2rem;
        transition: all .3s ease;
        background-color: rgba( 0, 0, 0, 0.467 );
    }

    #menu > nav > ul > li:hover
    {
        color: #000;
        font-weight: bold;
        background-color: #ff9301;
    }

    #menu > nav > ul > li:hover svg
    {
        color: #000;
    }

    #menu > nav > ul > span
    {
        margin: 0;
        color: #fff;
        font-size: 1.5rem;
        background-color: transparent;
    }

    #menu > nav > ul > li > a
    {
        width: 100%;
        display: flex;
        padding: 1rem;
        overflow-x: hidden;
        align-items: center;
    }

    #menu > nav > ul > li > a > svg
    {
        color: #ff9301;
        font-size: 1.3rem;
        margin-right: 1rem;
        transition: all .3s ease;
    }

    #menu > nav > ul > button
    {
        width: 100%;
        color: #000;
        padding: .6rem;
        font-size: 1.2rem;
        font-weight: bold;
        text-align: center;
        overflow-x: hidden;
        border-radius: .2rem;
        background-color: #ff9301;
    }
</style>