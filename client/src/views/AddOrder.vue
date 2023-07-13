<script>

import { mapActions, mapState } from 'pinia'
import { useMainStore } from '../stores'


export default {
    name: 'addorder',
    data() {
        return {
            id: '',
            booking: {
                location: '',
                bookingDate: ''
            }
        }
    },
    computed: {

    },
    methods: {
        ...mapActions(useMainStore, ["handleAddOrder"])
    },
    mounted(){
        const originAutocomplete = new google.maps.places.Autocomplete(
            this.$refs["origin"],
            {
                bounds: new google.maps.LatLngBounds(
                    new google.maps.LatLng(-6.178306, 106.631889)
                )
            }
        )
        originAutocomplete.addListener("place_changed", () =>{
            this.booking.location = originAutocomplete.getPlace().name 
            // + ", " + originAutocomplete.getPlace().formatted_address
        })
    },
    created(){
        this.id = this.$route.params.massageId
        console.log(this.id)
    }
}


</script>

<template>
    <div class="bg-body-tertiary"
        style="position: absolute; top: 0; height: 60px; width: auto; min-width: 100%; z-index: -1;">
    </div>
    <div class="d-flex flex-column align-items-center justify-content-center" style="height: 100vh;">
        <div class="w-50 border border-2 rounded p-3 shadow p-3 mb-5 bg-body-tertiary rounded">
            <h1 class="text-center">Booking Form</h1>
            <form @submit.prevent="handleAddOrder(id, booking.location, booking.bookingDate)">
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Location</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref="origin" v-model="booking.location">
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Booking Date</label>
                    <input type="date" class="form-control" id="exampleInputPassword1" v-model="booking.bookingDate">
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            <div class="mt-3">

            </div>


        </div>
    </div>
</template>

<style></style>
