<script>
import { mapActions, mapState } from 'pinia';
import { useMainStore } from '../stores';

export default {
    name: 'massagereview',
    data() {
        return {
            reviewMassage: {
                name: '',
                review: ''
            }
        }
    },
    computed: {
        ...mapState(useMainStore, ["detailMassage", "reviews"])
    },
    methods: {
        ...mapActions(useMainStore, ["handleFetchDetail", "handleReviewAdd", "handleFetchReviews", "handleTTS"])
    },
    created() {
        console.log(this.$route)
        this.handleFetchDetail(this.$route.params.id)
        this.handleFetchReviews(this.$route.params.id)
    },
    updated(){
        console.log("UPDATED______________");
    },
    mounted(){
        console.log("MOUNTED ___________");
    },
    
}
</script>

<template>
    <div class="bg-body-tertiary"
        style="position: absolute; top: 0; height: 60px; width: auto; min-width: 100%; z-index: -1;">
    </div>
    <div class="d-flex justify-content-center mt-3">
        <div class="w-75">
            <div class="d-flex flex-column">
                <div class="d-flex mb-5">
                    <div style="width: 30vw;overflow: hidden;box-shadow: -16px 18px 24px 15px rgba(51,49,49,0.15);">
                        <img style="width: 30vw;" :src="detailMassage.imgUrl" alt="">
                    </div>
                    <div style="margin-left: 3vw;">
                        <h1>{{ detailMassage.title }}</h1>
                        <p>Price: Rp {{ detailMassage.price }}</p>
                        <p>Description: {{ detailMassage.description }}</p>
                    </div>

                </div>
                <hr>
                <div class="review">
                    <div class="container">
                        <h1>Leave a Review</h1>
                        <form @submit.prevent="handleReviewAdd(reviewMassage, detailMassage.id)">
                            <div class="mb-3">
                                <label for="name" class="form-label">Your Name</label>
                                <input v-model="reviewMassage.name" type="text" class="form-control" id="name" name="name"
                                    required>
                            </div>

                            <div class="mb-3">
                                <label for="review" class="form-label">Your Review</label>
                                <textarea v-model="reviewMassage.review" class="form-control" id="review" name="review"
                                    rows="4" required></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary">Submit Review</button>
                        </form>
                    </div>
                    <section>
                        <div class="container my-5 py-5">
                            <div class="row d-flex justify-content-center">
                                <div class="col-md-12 col-lg-10">
                                    <div class="card text-dark">
                                        <div v-for="(review, i) in reviews">
                                            <div class="card-body p-4">
                                                <h4 v-if="i == 0" class="mb-0">Recent Review</h4>
                                                <p v-if="i == 0" class="fw-light mb-4 pb-2">Latest Reviews</p>

                                                <div class="d-flex flex-start">

                                                    <div>
                                                        <h6 class="fw-bold mb-1">{{review.name}}</h6>
                                                        <div class="d-flex align-items-center mb-3">
                                                            <p class="mb-0">
                                                                {{new Date(review.createdAt)}}
                                                            </p>
                                                            <a href="#!" class="link-muted"><i
                                                                    class="fas fa-pencil-alt ms-2"></i></a>
                                                            <a href="#!" class="link-muted"><i
                                                                    class="fas fa-redo-alt ms-2"></i></a>
                                                            <a href="#!" class="link-muted"><i
                                                                    class="fas fa-heart ms-2"></i></a>
                                                        </div>
                                                        <p class="mb-0">
                                                            {{review.comment}}
                                                        </p>
                                                    </div>
                                                    
                                                </div>
                                                <button @click="handleTTS(review.comment)" class="btn btn-secondary mt-3"><i class="bi bi-mic"></i></button>
                                            </div>
                                            <hr class="my-0" />
                                        </div>
                                        


                                        





                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>




            </div>

        </div>
    </div>
</template>

<style></style>
