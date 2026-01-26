import axios from 'axios'

export const baseApi = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
})
