import express from "express";
import { createSim, deleteSim, getAllSim, getOneSim, updateSim } from "../controllers/SimCardsController.js";

const route = express.Router();

route.get('/', getAllSim);
route.get('/:id', getOneSim);
route.post('/create', createSim);
route.put('/update/:id', updateSim);
route.delete('/delete/:id', deleteSim)

export default route;