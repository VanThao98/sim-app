import express from "express";
import { deleteUser, getAllUser, getMe, login, logout, register, updateDetail, updatePassword } from "../controllers/UsersController.js";
import authorize from "../middleware/authorize.js";

const route = express.Router();

route.get('/', getAllUser);
route.post('/register', register);
route.post('/login', login);
route.get('/logout',authorize, logout);
route.get('/me',authorize, getMe);
route.put('/updatedetails',authorize, updateDetail);
route.put('/updatepassword',authorize, updatePassword);
route.delete('/delete',authorize, deleteUser);

export default route;