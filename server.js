const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://kanulilewa:A9nI9mE9@cluster0.qhwpfbp.mongodb.net/to_do_app',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {console.log("database connected")})
.catch((err) => {console.log(err)})

//creatin a mongo Schema
const PlanSchema = new mongoose.Schema({
    name: String
    
});
const Plan = mongoose.model("Plan", PlanSchema);

//routes
app.get('/api/plans', async (req, res) => {
    try {
        const plans = await Plan.find();
        res.json(plans);
    } catch(err) {
        console.log(err);
        res.status(500).json({message: "Server error"})
    }
    
});

app.post('/api/plans', async (req, res) => {
    try {
        const {name} = req.body;
        const new_plan = new Plan({name});
        await new_plan.save();
        res.json(new_plan);
    } catch(err) {
        console.log(err);
        res.status(500).json({message: "Server error"})
    }
    
});

app.put('/api/plans/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {name} = req.body;
        const updated_plan = await Plan.findByIdAndUpdate(id, {name}, {new: true});
        res.json(updated_plan);
    } catch(err) {
        console.log(err);
        res.status(500).json({message: "Server error"})
    }
    
});

app.delete('/api/plans/:id', async (req, res) => {
    try {
        const {id} = req.params;
        await Plan.findByIdAndDelete(id);
        res.json({message: "Item deleted"})
    } catch(err) {
        console.log(err);
        res.status(500).json({message: "Server error"})
    }
    
});

app.listen(5000, () => {console.log("listening on 5000")});