import express  from "express";
import FinancialRecordModel from "../models/financial-record.js";

const router = express.Router();

router.get("/getAllByUserId/:userId", async(req ,res)=>{
    try{
        const userId = req.params.userId;
       const records = await FinancialRecordModel.find({userId : userId});//jo user loggedin hain uska sara finances show karo
       if(records.length === 0)
       {
          return res.status(404).send("No records found for the user");
       }
       res.status(200).send(records);
    }
    catch(err)
    {
       res.status(500).send(err);
    }
});


router.post("/", async(req ,res)=>{
    try{
        const newRecordBody = req.body;//sending the data is like sending an object to the body
        const newRecord = new FinancialRecordModel(newRecordBody);//the data which we got...I am converting it to a mongoDB version of that
        const savedRecord = await newRecord.save();//saving it
       res.status(200).send(savedRecord);
    }
    catch(err)
    {
       res.status(500).send(err);
    }
});


//udate the information
router.put("/:id", async(req ,res)=>{
    try{
       const id = req.params.id;
       const newRecordBody = req.body;//sending the updated information to the body
       const record = await FinancialRecordModel.findByIdAndUpdate(
        id,
        newRecordBody,
        {new : true}
       );

       if(!record)
         return res.status(404).send();

       res.status(200).send(record);
    }
    catch(err)
    {
       res.status(500).send(err);
    }
});


router.delete("/:id", async(req ,res)=>{
    try{
       const id = req.params.id;
       const record = await FinancialRecordModel.findByIdAndDelete(id);

       if(!record)
         return res.status(404).send();

       res.status(200).send(record);//send 200 with the deleted record
    }
    catch(err)
    {
       res.status(500).send(err);
    }
});

export default router;