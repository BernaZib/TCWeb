const express=require("express");
const app=express();
const mongoose=require("mongoose");
const LRequestModel=require("./models/LRequests.js");

const cors=require('cors');


app.use(express.json());
app.use(cors())

mongoose.connect(
    "mongodb+srv://BD_02:9xBu0zpB9Ka8AbfG@tc.fq8y09d.mongodb.net/LeaveRequest?retryWrites=true&w=majority"
    );

//req: request, res: response. 
//req: get info that is sent from the front-end, res: send from back-end to front-end.
app.get("/getLRequests", async (req, res) => {
    try {
      const result = await LRequestModel.find({}).exec();
      console.log('Query Result:', result);  // Add this line for logging
      res.json(result);
    } catch (err) {
      console.error('Query Error:', err);  // Add this line for logging
      res.json(err);
    }
  });

app.post("/createLRequest", async(req,res)=>{
  const lrequest=req.body;
  const newlrequest=new LRequestModel(lrequest);
  await newlrequest.save();

  res.json(lrequest)
});

app.delete("/deleteRequest/:RequestId", async (req, res) => {
  const RequestId = req.params.RequestId;

  try {
      const deletedRequest = await LRequestModel.findByIdAndDelete(RequestId);

      if (!deletedRequest) {
          return res.status(404).json({ error: 'Request not found' });
      }

      res.json({ message: 'Request deleted successfully', deletedRequest });
  } catch (error) {
      res.status(500).json({ error: 'Error deleting Leave Request' });
  }
});
  
//start API
//react runs on port 3000
//call-back function runs when the server starts running 2nd argument
app.listen(3001,()=>{
    console.log("SERVER RUNS PERFECTLY!");
});



  