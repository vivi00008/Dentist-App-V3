import axios from 'axios'

export default axios.create({
    baseURL:'http://192.168.1.52:8080/api/floor'
})