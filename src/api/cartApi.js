import axios from 'axios'

export default axios.create({
    baseURL:'http://192.168.1.47:8080/api/cart'
})