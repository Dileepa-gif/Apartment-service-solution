import axios from "axios"

const baseurl = axios.create({baseURL:"http://localhost:4000"})

export default baseurl;