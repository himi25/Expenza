const Expense = require('../models/Expense')
const addExpense = async(req,res)=>{
try{
    const expense= await Expense.create(req.body)
    res.status(200).json({message:'Expense added successfully',expense})
    }
catch(error){
res.status(400).json({message:'Error adding expense',error:error.message})
}
}

module.exports= {addExpense}