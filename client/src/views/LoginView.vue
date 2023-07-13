<script>

import { mapActions, mapState } from 'pinia'
import { useMainStore } from '../stores'
import { RouterLink } from 'vue-router'


export default {
    name: 'login',
    data() {
        return {
            login: {
                email: '',
                password: ''
            }
        }
    },
    computed: {

    },
    methods: {
        ...mapActions(useMainStore, ["handleLogin", "handleGithubSignIn"]),
        handlePage() {
            this.$router.push('/register')

        }

    }
}


</script>

<template>
    <div class="bg-body-tertiary"
        style="position: absolute; top: 0; height: 60px; width: auto; min-width: 100%; z-index: -1;">
    </div>
    <div class="d-flex flex-column align-items-center justify-content-center" style="height: 100vh;">
        <div class="w-50 border border-2 rounded p-3 shadow p-3 mb-5 bg-body-tertiary rounded">
            <h1 class="text-center">Login Form</h1>
            <form @submit.prevent="handleLogin(login)">
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        v-model="login.email" required>
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" v-model="login.password"
                        required>
                </div>
                <div class="mb-3">
                    <RouterLink to="/register" class="nav-link"><i class="bi bi-box-arrow-in-right"></i> Go to Register
                    </RouterLink>
                </div>
                <div class="d-flex justify-content-center">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>

            </form>
            <hr>
            <div class="d-flex justify-content-center">
                <button @click="handleGithubSignIn()" class="btn btn-secondary"><i class="bi bi-github"></i> Github</button>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
