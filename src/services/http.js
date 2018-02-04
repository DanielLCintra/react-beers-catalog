import axios from 'axios'

const http = axios.create({
    baseURL: "http://api.brewerydb.com/v2/search?q=Two_Hearted_Ale&type=beer&key=74b0d85ef32ad4563af48b6e67693e07&callback=JSON_CALLBACK"
})

export default http;  