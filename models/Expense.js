const mongoose=require('mongoose')

const ExpenseSchema=new mongoose.Schema({

    // userId:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     required:true
    // },
    description:{
        type:String
    },
    category:{
        type:String,
        required:true,
        enum:['Inventory','Rent','Salary','Utilities','Transport','Misc']
    },
    amount:{
        type:Number,
        required:true,
        min:0
    },
    date:{
        type:Date,
        required:true
    }

})

const expenses = mongoose.model('expenses',ExpenseSchema)
module.exports=expenses
