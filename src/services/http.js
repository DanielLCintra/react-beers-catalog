import axios from 'axios'

const key = '74b0d85ef32ad4563af48b6e67693e07'
const type = 'beer'
const q = 'Two_Hearted_Ale' 

const http = axios.create({
    baseURL: `http://api.brewerydb.com/v2`,
    params: {
    	q,
    	type,
    	key
    }
})

export default http;  