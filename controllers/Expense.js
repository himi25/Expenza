const Expense = require('../models/Expense')
const currdate= new Date()
console.log(currdate)
const ALLOWED_CATEGORIES =[
    'Inventory',
    'Rent',
  'Salary',
  'Utilities',
  'Transport',
  'Misc'
]
const addExpense = async(req,res)=>{
try{
    
    const {amount,category,date}= req.body

    //converting the date to object for comparision
    const expenseDate = new Date(date)
    if(amount==null){
        return res.status(400).json({message:'please enter the amount'})
      }
    if(amount< 0){
        return res.status(400).json({message:'invalid amount'})
    }
    if(!category){
        return res.status(400).json({message:'please select a category'})
    }
    if(!ALLOWED_CATEGORIES.includes(category)){
        return res.status(400).json({message:'invalid category'})
    }
    if(!date){
        return res.status(400).json({message:'please provide a date'})
    }
    //checking the date if it exceeds today's date 
    if(expenseDate > currdate){
        return res.status(400).json({message:'invalid date'})
    }
  
    const expense= await Expense.create(req.body)
    res.status(201).json({message:'Expense added successfully',expense})
    }
catch(error){
res.status(400).json({message:'Error adding expense',error:error.message})
}
}
const showExpenses=async(req,res)=>{
    try{
        
        const expenses= await Expense.find()
        res.status(200).json({message:'Expense is here',expenses})
    }
    catch(error){
        res.status(400).json({message:'Error getting the expense',error:error.message})
    }
}
const getTotalExpenses=async(req,res)=>{
    try {
        const result=await Expense.aggregate([
            {$group:
                {
                 _id:null,
                 totalAmount:{$sum:'$amount'}
                }

            }
        ])
        const total = result[0]?.totalAmount || 0
        res.status(200).json({message:'total expense calculated',totalExpense:total})
    }
    catch(error){
        res.status(400).json({message:'Error calculating total expense',error:error.message})
    }
}
const getCategoryWiseExpenses = async (req, res) => {
    try {
      const result = await Expense.aggregate([
        {
          $group: {
            _id: '$category',
            totalAmount: { $sum: '$amount' }
          }
        }
      ])
  
      res.status(200).json({
        message: 'Category-wise expense summary',
        summary: result
      })
    } catch (error) {
      res.status(400).json({
        message: 'Error calculating category-wise expense',
        error: error.message
      })
    }
  }
module.exports= {addExpense,showExpenses,getTotalExpenses,getCategoryWiseExpenses}