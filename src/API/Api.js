import axios from "axios";

const Api = axios.create({
    baseURL: "http://localhost:3000/",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    }
})

const data = localStorage.getItem("token")
const authenticatedApi = axios.create({
    baseURL: "http://localhost:3000/",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: data
    }
})
export { Api, authenticatedApi }