import axios from "axios";
import { response } from "express";
import Vue from "vue";
//import * as servicesModule1 from "./services";

// Get data salutation
export async function getSalutation() {
    return axios.get('/api/new_registration')
        .then(response => {
            console.log('data :' + JSON.stringify(response.data.data))
            return response.data.data
        }).catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: 'error',
                })
                if (error.response.status === 401) {
                    logout()
                } else {
                    return 'error'
                }
            }
        });
}