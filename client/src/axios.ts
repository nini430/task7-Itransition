import axios from 'axios'


const axiosApiInstance=axios.create({
    baseURL:'http://localhost:7000/api/v1'
})

export default axiosApiInstance;