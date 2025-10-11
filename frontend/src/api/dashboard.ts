import { StatusType } from "@/types/books"
import axios from "axios"



const API_URL = 'http://localhost:5000'

export const getDashboard = async (token: string) => {
    const { data } = await axios.get(`${API_URL}/books/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return data
}
export const getUserBooks = async (token: string) => {
    const { data } = await axios.get(`${API_URL}/books/userbooks`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return data
}
export const getBooks = async (token: string) => {
    const { data } = await axios.get(`${API_URL}/books`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return data
}

export const putStatus = async (id: number, token: string, status: StatusType) => {
    const { data } = await axios.patch(
        `${API_URL}/books/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
    )
    return data
}

export const deleteBookFromUser = async (id: number, token: string) => {
    const { data } = await axios.delete(`${API_URL}/books/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return data
}
export const favoriteUserBook = async (id: number, token: string) => {
    const { data } = await axios.post(`${API_URL}/books/${id}/favorite`,
        {},
        {
            headers: { Authorization: `Bearer ${token}` }
        })
    return data
}