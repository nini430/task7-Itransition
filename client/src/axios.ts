import axios from 'axios'


const axiosApiInstance=axios.create({
    baseURL:'https://two-live-games.onrender.com/api/v1'
})

export default axiosApiInstance;