import axios from "axios"


const API_URL = 'http://localhost:5000'

export const getDashboard = async (token: string) => {
    const {data} = await axios.get(`${API_URL}/auth/dashboard` ,{
        headers: {Authorization:`Bearer ${token}`}
    })
    return data
}