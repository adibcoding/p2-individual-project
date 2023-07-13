<script>
import { mapActions, mapState } from 'pinia'
import { useMainStore } from '../stores'

import { RouterLink} from 'vue-router'
export default {
    name: 'navbar',
    data() {
        return {

        }
    },
    computed: {
        ...mapState(useMainStore, ["isLogged"])
    },
    methods: {
        ...mapActions(useMainStore, ["handleLogout"])
    }
}
</script>

<template>
    <nav class="navbar">
        <div class="container-fluid">
            <a class="navbar-brand" href="#"><b>PijetYok!</b></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasNavbarLabel">PijetYok!</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <li class="nav-item">
                            <RouterLink class="nav-link" to="/">Home</RouterLink>
                        </li>
                        <li v-if="!isLogged" class="nav-item">
                            <RouterLink class="nav-link" to="/login">Login</RouterLink>
                        </li>
                        <li v-else class="nav-item">
                            <RouterLink @click.prevent="handleLogout()" class="nav-link" to="/login">Logout</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink class="nav-link" to="/massages">Massages</RouterLink>
                        </li>
                        <li v-if="isLogged" class="nav-item">
                            <RouterLink class="nav-link" to="/orders">Orders</RouterLink>
                        </li>
                        
                    </ul>
                    
                </div>
            </div>
        </div>
    </nav>
    
</template>

<style>

</style>
