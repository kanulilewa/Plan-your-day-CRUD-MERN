const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const Plan = mongoose.model("Plan", PlanSchema);
const User = mongoose.model("User", UserSchema);

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

app.post('/api/plans/signup', async (req, res) => {
    try {
        const {name, email, password} = req.body;

        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(password, salt);

        //Create a new user with the hashed password
        const new_user = new User({name, email, password: hashed_password});
        await new_user.save();
        res.status(201).json({message: "User registered successfully" });
    } catch(err) {
        console.log(err);
        res.status(500).json({error: "Server error"});
    }
}

);

app.post('/api/plans/login', async (req, res) => {
    try {
        const {email, password} = req.body;

        // Find the user with such credentials in the db
        const user = await User.findOne({email});

        // If such a user does not exist
        if(!user) {
            return res.status(401).json({error: "Invalid email or password"});
        }

        //Compare passwords
        const passwords_match = await bcrypt.compare(password, user.password);
        if(!passwords_match) {
            return res.status(401).json({error: "Invalid email or password"});
        }

        //Generate a JWT token with the user's ID and email
        const token = jwt.sign({id: user._id, email: user.email}, "your-secret-key");
        res.json({token}); 

    } catch(err) {
        console.error(err);
        res.status(500).json({error: "Internal server error"});
    }
})

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