import SimCard from "../models/SimCard.js"

export const getAllSim = async (req, res) => {
    try {
        const sims = await SimCard.find({});
        if(sims.length === 0){
            return res.status(404).json({message: "No Sim"})
        }
        return res.status(200).json({
            count: sims.length,
            data: sims
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
};

export const getOneSim = async(req, res) =>{
    const {id} = req.params;
    try {
        const sim = await SimCard.findById(id);
        if(!sim){
            return res.status(404).json({message: 'Sim not found'})
        }
        return res.status(200).json({message: 'success', sim})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
};

export const createSim = async(req, res) => {
    const {phoneNumber, type, simPrice, plan} = req.body;
    try {
        const existingSim = await SimCard.findOne({ phoneNumber });
        if (existingSim) {
            return res.status(400).json({ message: "Sim Number is exist" });
        }
        const newSim = await SimCard.create({
            phoneNumber,
            type,
            simPrice,
            plan
        });
        return res.status(201).json({message: "Sim create successfully", newSim}) 
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
};

export const updateSim = async (req, res) =>{
    const {id} = req.params;
    const {phoneNumber, type, simPrice, plan, status} = req.body;
    try {
        const updatedSim = await SimCard.findByIdAndUpdate(id, {
            phoneNumber,
            type,
            simPrice,
            plan,
            status
          }, { new: true });
          if (!updatedSim) {
            return res.status(404).json({ message: 'Sim not found' });
          }
          return res.status(200).json({ message: 'Sim updated successfully', updatedSim });     
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
}

export const deleteSim = async (req, res) => {
    const {id} = req.params;
    try {
        const sim = await SimCard.findByIdAndDelete(id);
        if(!sim){
            return res.status(404).json({message: 'Sim not found'})
        }
        return res.status(200).json({message: "Sim deleted successfullty"})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
}