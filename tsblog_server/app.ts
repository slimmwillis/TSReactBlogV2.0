import express, { application } from "express"
import mongoose from "mongoose"
import subscriberModel from "../models/subscriber";
import cors from 'cors'
const app = express();
app.use(express.json())
app.use(cors())

app.post('/subscriber', async (req, res)=>{
    const subExists = await subscriberModel.findOne(req.body)
    if(subExists){
        res.status(422).json("Already subscribed, please login instead.")
        return
    }

    const subscriber = new subscriberModel(req.body)
    await subscriber.save()
    res.json(subscriber)
})


mongoose.connect('mongodb://localhost:27017/TsReactBlogV2_0').then(()=>{

    app.listen(5500, ()=>{
    console.log("your computer is on fire")

})

})

