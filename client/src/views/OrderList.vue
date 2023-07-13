<script>

import { mapActions, mapState } from 'pinia'
import { useMainStore } from '../stores'
import { RouterLink } from 'vue-router'



export default {
    name: 'orderlist',
    data() {
        return {

        }
    },
    computed: {
        ...mapState(useMainStore, ["orders"])
    },
    methods: {
        ...mapActions(useMainStore, ["handleFetchOrder", "pay", "handleDeleteOrder"]),
        getPrice(price) {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR"
            }).format(price)
        }
    },
    created() {
        this.handleFetchOrder()
    }
}


</script>

<template>
    <div class="bg-body-tertiary"
        style="position: absolute; top: 0; height: 60px; width: auto; min-width: 100%; z-index: -1;">
    </div>
    <section>
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col">
                    <div class="card">
                        <div class="card-body p-4">

                        <div class="row">

                                <div class="col-lg-12" style="min-height: 75vh;">
                                    <h5 class="mb-3">
                                        <RouterLink to="/massages" class="text-body"><i
                                                class="fas fa-long-arrow-alt-left me-2"></i>Continue Massage</RouterLink></h5>
                                    <hr>

                                    <div class="d-flex justify-content-between align-items-center mb-4">
                                        <div>
                                            <p class="mb-1">Massage cart</p>
                                            <p class="mb-0">You have {{ orders.length }} items in your cart</p>
                                        </div>
                                        
                                    </div>

                                    <div v-for="order in orders" class="card mb-3">
                                        <div class="card-body">
                                            <div class="d-flex justify-content-between">
                                                <div class="d-flex flex-row align-items-center">
                                                    <div>
                                                        <img :src="order.Massage.imgUrl" class="img-fluid rounded-3"
                                                            alt="Shopping item" style="width: 65px;">
                                                    </div>
                                                    <div class="ms-3">
                                                    <h5>{{ order.Massage.title }}</h5>
                                                    <p class="small mb-0">{{ order.Massage.duration }} Minutes</p>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-row align-items-center">
                                                <!-- <div style="width: 50px;">
                                                        <h5 class="fw-normal mb-0">2</h5>
                                                    </div> -->
                                                <div style="width: auto;"
                                                    class="d-flex flex-column justify-content-center align-items-center">
                                                    <h5 class="mb-0">{{ getPrice(order.newPrice) }}</h5>
                                                    <p class="mb-0">{{ order.status }}</p>
                                                    <button @click="handleDeleteOrder(order.id)" type="button" class="btn btn-danger"><svg xmlns="http://www.w3.org/2000/svg" width="16"
                                                            height="16" fill="currentColor" class="bi bi-trash"
                                                            viewBox="0 0 16 16">
                                                            <path
                                                                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                                            <path
                                                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                                        </svg></button>
                                                </div>



                                            </div>


                                        </div>

                                    </div>
                                </div>

                                <!-- <div class="card mb-3">
                                        <div class="card-body">
                                            <div class="d-flex justify-content-between">
                                                <div class="d-flex flex-row align-items-center">
                                                    <div>
                                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img2.webp"
                                                            class="img-fluid rounded-3" alt="Shopping item"
                                                            style="width: 65px;">
                                                    </div>
                                                    <div class="ms-3">
                                                        <h5>Samsung galaxy Note 10 </h5>
                                                        <p class="small mb-0">256GB, Navy Blue</p>
                                                    </div>
                                                </div>
                                                <div class="d-flex flex-row align-items-center">
                                                    <div style="width: 50px;">
                                                        <h5 class="fw-normal mb-0">2</h5>
                                                    </div>
                                                    <div style="width: 80px;">
                                                        <h5 class="mb-0">$900</h5>
                                                    </div>
                                                    <a href="#!" style="color: #cecece;"><i
                                                            class="fas fa-trash-alt"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="card mb-3">
                                        <div class="card-body">
                                            <div class="d-flex justify-content-between">
                                                <div class="d-flex flex-row align-items-center">
                                                    <div>
                                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img3.webp"
                                                            class="img-fluid rounded-3" alt="Shopping item"
                                                            style="width: 65px;">
                                                    </div>
                                                    <div class="ms-3">
                                                        <h5>Canon EOS M50</h5>
                                                        <p class="small mb-0">Onyx Black</p>
                                                    </div>
                                                </div>
                                                <div class="d-flex flex-row align-items-center">
                                                    <div style="width: 50px;">
                                                        <h5 class="fw-normal mb-0">1</h5>
                                                    </div>
                                                    <div style="width: 80px;">
                                                        <h5 class="mb-0">$1199</h5>
                                                    </div>
                                                    <a href="#!" style="color: #cecece;"><i
                                                            class="fas fa-trash-alt"></i></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                    

                                                            <div class="card mb-3 mb-lg-0">
                                                                <div class="card-body">
                                                                    <div class="d-flex justify-content-between">
                                                                        <div class="d-flex flex-row align-items-center">
                                                                            <div>
                                                                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img4.webp"
                                                                                    class="img-fluid rounded-3" alt="Shopping item"
                                                                                    style="width: 65px;">
                                                                            </div>
                                                                            <div class="ms-3">
                                                                                <h5>MacBook Pro</h5>
                                                                                <p class="small mb-0">1TB, Graphite</p>
                                                                            </div>
                                                                        </div>
                                                                        <div class="d-flex flex-row align-items-center">
                                                                            <div style="width: 50px;">
                                                                                <h5 class="fw-normal mb-0">1</h5>
                                                                            </div>
                                                                            <div style="width: 80px;">
                                                                                <h5 class="mb-0">$1799</h5>
                                                                            </div>
                                                                            <a href="#!" style="color: #cecece;"><i
                                                                                    class="fas fa-trash-alt"></i></a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div> -->

                                </div>


                            </div>
                            <button @click="pay()" type="button" class="btn btn-primary">Pay All</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
@media (min-width: 1025px) {
    .h-custom {
        height: 100vh !important;
    }
}</style>
