import axios from 'axios'

var axiosInstance = axios.create({
    baseURL: 'http://localhost:53508/'
  })

export default axiosInstance