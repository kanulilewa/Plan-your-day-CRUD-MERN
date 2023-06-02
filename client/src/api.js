import axios from 'axios';

const API_URL = "http://localhost:5000/api/plans";

export const GetPlans = async () => {
    try {
        const res = await axios.get(API_URL);
        return res.data;
    } catch(err){
        console.log(err);
    }
}

export const PostPlans = async (name) => {
    try {
        const res = await axios.post(API_URL, {name});
        return res.data;
    } catch(err){
        console.log(err);
    }
}

export const UpdatePlans = async (id, name) => {
    try {
        const res = await axios.put(`${API_URL}/${id}`, {name});
        return res.data;
    } catch(err){
        console.log(err);
    }
}

export const DeletePlans = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
        
    } catch(err){
        console.log(err);
    }
}

export const PostUser = async (name, email, password) => {
    try {
        const res = await axios.post("http://localhost:5000/api/plans/signup", {name, email, password});
        return res.data;
    } catch(err){
        console.log(err);
    }
}

export const LoginUser = async (email, password) => {
    try {
        const res = await axios.post("http://localhost:5000/api/plans/login", {email, password});
        return res.data;
    } catch(err) {
        console.log(err);
        throw new Error("Failed to log in");
    }
}