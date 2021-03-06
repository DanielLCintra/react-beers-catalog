import axios from 'axios'

const key = '74b0d85ef32ad4563af48b6e67693e07'
const type = 'beer'
const q = 'Two_Hearted_Ale' 
const availableId = 1

const http = axios.create({
    baseURL: `https://api.brewerydb.com/v2`,
    params: {
    	q,
    	type,
    	key,
    	availableId
    }
})

export default http;  
