const mongoose=require('mongoose');

const LRequestSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true, 
    },

    lastname:{
        type: String,
        required: true,
    },

    id:{
        type: Number,
        required: true,
    },

    reason:{
        type:String,
        required: true,
    },
});

const LRequestModel=mongoose.model("LRequests",LRequestSchema);
module.exports = LRequestModel;