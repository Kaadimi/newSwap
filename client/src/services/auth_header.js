
import axios from 'axios'

export default function authHeader() {
    const token = window.localStorage.getItem('swap_token')
    if (token)
        axios.defaults.headers.common['x-auth-token'] = token
    else
        delete axios.defaults.headers.common['x-auth-token']
    return;
}