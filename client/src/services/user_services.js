//import authHeader from './auth_header'
import axios from 'axios'

export const userService = {
    login,
    registre,
    createOffer,
    forgotPassword,
    resetPassword,
    fetchProducts,
    changeProfile,
    changePassword,
    fetchMyOffers,
    deleteOffer,
    sendMessage
}

function sendMessage(message)
{
    return new Promise ((resolve, reject) => {
        axios.post("http://localhost:3000/browse/message", message)
        .then(res => {
            if (res.data.success) {
                resolve(res.data.msg)
            } else {
                reject(res.data.msg) 
        }})
        .catch(err => {
            if (err.response.status == 401)
                reject("logout")
            else
                reject(err)
        })
    })
}

function deleteOffer(offerId)
{
    return new Promise ((resolve, reject) => {
        axios.delete("http://localhost:3000/settings/myOffer/" + offerId)
        .then(res => {
            if (res.data.success) {
                resolve(res.data.msg)
            } else {
                reject(res.data.msg) 
        }})
        .catch(err => {
            if (err.response.status == 401)
                reject("logout")
            else
                reject(err)
        })
    }) 
}

function changeProfile(userData)
{
    return new Promise ((resolve, reject) => {
        axios.post('http://localhost:3000/settings/changeProfile', userData)
        .then(res => {
            if (res.data.success) {
                resolve(res.data.msg)
            } else {
                reject(res.data.msg) 
        }})
        .catch(err => {
            if (err.response.status == 401)
                reject("logout")
            else
                reject(err)
        })
    })
}

function changePassword(userData)
{
    return new Promise ((resolve, reject) => {
        axios.post('http://localhost:3000/settings/changePassword', userData)
        .then(res => {
            if (res.data.success) {
                resolve(res.data.msg)
            } else {
                reject(res.data.msg) 
        }})
        .catch(err => {
            if (err.response.status == 401)
                reject("logout")
            else
                reject(err)
        })
    })
}

function fetchProducts(filters)
{
    return new Promise ((resolve, reject) => {
        axios.post('http://localhost:3000/browse', filters)
        .then(res => {
            console.log(res)
            if (res.data.success) {
                resolve(res.data.msg)
            } else {
                reject(res.data.msg) 
        }})
        .catch(err => reject(err))
    })
}

function fetchMyOffers()
{
    return new Promise ((resolve, reject) => {
        axios.get('http://localhost:3000/settings/myOffer')
        .then(res => {
            console.log(res)
            if (res.data.success) {
                resolve(res.data.msg)
            } else {
                reject(res.data.msg) 
        }})
        .catch(err => {
            if (err.response.status == 401)
                reject("logout")
            else
                reject(err)
        })
    })
}

function createOffer(productData)
{
    return new Promise ((resolve, reject) => {
        axios.post('http://localhost:3000/browse/create', productData)
        .then(res => {
            if (res.data.success) {
                resolve(res.data.msg)
            } else {
                reject(res.data.msg) 
        }})
        .catch(err => reject(err))
    })
}

function forgotPassword(email)
{
    return new Promise ((resolve, reject) => {
        axios.post('http://localhost:3000/login/forgotPassword', email)
        .then(res => {
            if (res.data.success) {
                resolve(res.data.msg)
            } else {
                reject(res.data.msg) 
        }})
        .catch(err => reject(err))
    }) 
}

function resetPassword(resetData)
{
    return new Promise ((resolve, reject) => {
        axios.post('http://localhost:3000/login/resetPassword', resetData)
        .then(res => {
            if (res.data.success) {
                resolve(res.data.msg)
            } else {
                reject(res.data.msg) 
        }})
        .catch(err => reject(err))
    }) 
}

function registre(userData)
{
    return new Promise ((resolve, reject) => {
        axios.post('http://localhost:3000/registre', userData)
        .then(res => {
            if (res.data.success) {
                resolve(res.data.msg)
            } else {
                reject(res.data.msg) 
        }})
        .catch(err => reject(err))
    })
}

function login(email, password) {
    return new Promise ((resolve, reject) => {
        axios.post('http://localhost:3000/login', {email: email, password: password})
        .then(res => {
          console.log(res)
          if (res.data.success) {
            window.localStorage.setItem("swap_token", res.data.msg);
            resolve(res.data.info)
          } else {
            reject(res.data.msg)
          }
        })
        .catch(err => reject(err))
    })
}