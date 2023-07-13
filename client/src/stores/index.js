import { defineStore } from 'pinia'
import axios from 'axios'
const BASE_URL = 'https://rental-vehicle.oneadibtest.site'
import firebaseConfig from '../firebaseConfig'
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth"
import Swal from 'sweetalert2'
firebaseConfig

const provider = new GithubAuthProvider()
const auth = getAuth()
// import fs from 'fs'

export const useMainStore = defineStore('useMainStore', {
    state: () => ({
        isLogged: localStorage.getItem('access_token') ? true : false,
        massages: [],
        detailMassage: {},
        orders: [],
        reviews: []
    }),
    getters: {

    },
    actions: {

        async handleLogin(obj) {
            try {
                const { email, password } = obj
                const { data } = await axios({
                    url: `${BASE_URL}/login`,
                    method: 'post',
                    data: {
                        email, password
                    }
                })
                console.log(data)
                localStorage.setItem('access_token', data.access_token)
                this.isLogged = true
                this.router.push('/massages')
                this.handleFetchMassages()

            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${err.response.data.message}`
                })
            }
        },
        async handleRegister(obj) {
            try {
                const { email, password } = obj
                const { data } = await axios({
                    url: `${BASE_URL}/register`,
                    method: 'post',
                    data: {
                        email, password
                    }
                })
                console.log(data)
                this.handleLogin(obj)

            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${err.response.data.message}`
                })
            }
        },
        async handleFetchMassages(search) {
            try {
                console.log(search)
                const { data } = await axios({
                    url: `${BASE_URL}/massages`,
                    method: 'get',
                    params: {
                        search
                    }
                })
                console.log(data.massages)
                this.massages = data.massages

            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${err.response.data.message}`
                })
            }
        },
        async handleFetchDetail(id) {
            try {
                const { data } = await axios({
                    url: `${BASE_URL}/massages/${id}`,
                    method: 'get'
                })
                console.log(data.massage)
                this.router.push(`/massages/${id}`)
                this.detailMassage = data.massage

            } catch (err) {
                console.log(err)
            }
        },
        async handleAddOrder(id, location, bookingDate) {
            try {
                const { data } = await axios({
                    url: `${BASE_URL}/orders/${id}`,
                    method: 'post',
                    data: {
                        location, bookingDate
                    },
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                })
                console.log(data)
                this.router.push('/orders')
                this.handleFetchOrder()

            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${err.response.data.message}`
                })
            }
        },
        async handleFetchOrder() {
            try {
                const { data } = await axios({
                    url: `${BASE_URL}/orders`,
                    method: 'get',
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                })
                console.log(data)
                this.orders = data.orders
            } catch (err) {
                console.log(err)
            }
        },
        async pay() {
            try {
                const { data } = await axios({
                    url: `${BASE_URL}/generateMToken`,
                    method: 'post',
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                })
                const cb = this.handlePatchOrder
                const cbEmail = this.handleSendEmail
                const router = this.router

                window.snap.pay(data.token, {
                    onSuccess: function (result) {
                        /* You may add your own implementation here */
                        cb()
                        // this.router.push('/orders')
                        cbEmail()
                    }
                    ,
                    onPending: function (result) {
                        /* You may add your own implementation here */
                        console.log(result)
                    },
                    onError: function (result) {
                        /* You may add your own implementation here */
                        console.log(result)
                    },
                    onClose: function () {
                        /* You may add your own implementation here */
                        router.push('/orders')
                    }
                })

            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${err.response.data.message}`
                })
            }
        },
        async handlePatchOrder() {
            try {
                const { data } = await axios({
                    url: `${BASE_URL}/patchOrders`,
                    method: 'patch',
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                })
                console.log(data)
                this.handleFetchOrder()

            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${err.response.data.message}`
                })
            }
        },
        handleLogout() {
            localStorage.removeItem('access_token')
            this.isLogged = false
            this.router.push('/')
        },
        async handleGithubSignIn() {
            try {
                const result = await signInWithPopup(auth, provider)
                const { data } = await axios({
                    url: `${BASE_URL}/githubSign`,
                    method: 'post',
                    data: {
                        email: result.user.email
                    }
                })
                console.log(data)
                console.log(result)
                localStorage.setItem('access_token', data.access_token)
                this.isLogged = true
                this.router.push('/massages')
                this.handleFetchMassages()
            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${err.response.data.message}`
                })
            }
        },
        async handleReviewAdd(obj, massageId) {
            try {
                const { name, review } = obj
                const { data } = await axios({
                    url: `${BASE_URL}/massages/${massageId}/reviews`,
                    method: 'post',
                    data: {
                        name, review
                    }
                })
                this.handleFetchReviews(massageId)

                console.log(data)

            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${err.response.data.message}`
                })
            }
        },
        async handleFetchReviews(massageId) {
            try {

                const { data } = await axios({
                    url: `${BASE_URL}/massages/${massageId}/reviews`,
                    method: 'get'
                })
                console.log(data)
                this.reviews = data.reviews

            } catch (err) {
                console.log(err)
            }
        },
        async handleTTS(str) {
            try {
                const api = 'e1614d7881354ed7a02c294a05819f49'
                const url = 'https://api.voicerss.org/'
                const response = await axios({
                    url: url,
                    method: 'POST',
                    responseType: 'arraybuffer',
                    params: {
                        key: api,
                        src: str,
                        f: '16khz_16bit_stereo',
                        hl: 'id-id'
                    }
                })

                const audioBlob = new Blob([response.data], { type: 'audio/mp3' });
                const audioURL = URL.createObjectURL(audioBlob);
                const audioElement = new Audio(audioURL);
                audioElement.play()

            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${err.response.data.message}`
                })
            }
        },
        async handleDeleteOrder(id) {
            try {

                const result = await Swal.fire({
                    title: 'Are you sure?',
                    text: "There's no refund if you have paid!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                })

                if (result.isConfirmed) {
                    const { data } = await axios({
                        url: `${BASE_URL}/orders/${id}`,
                        method: 'delete',
                        headers: {
                            access_token: localStorage.getItem('access_token')
                        }
                    })
                    console.log(data)
                    this.handleFetchOrder()
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }



                
            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${err.response.data.message}`
                })
            }
        },

        async handleSendEmail() {
            try {
                console.log("here email <<<<<<<<<<<<")
                const { data } = await axios({
                    url: `${BASE_URL}/sendMail`,
                    method: 'get',
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                })
                console.log(data)
                this.handleFetchOrder()
            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${err.response.data.message}`
                })
            }
        }

    },
})