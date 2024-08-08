import express from "express";
import { login, Signup,getBill, newBill} from "../controller/userController.js";

const route=express.Router()
route.post('/signup',Signup)
route.get('/login',login)
route.post('/bill',newBill)
route.get('/getBill',getBill)


export default route;