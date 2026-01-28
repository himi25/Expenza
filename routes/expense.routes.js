const express=require('express')
const router=express.Router()

const {addExpense} = require('../controllers/Expense')
const {showExpenses}=require('../controllers/Expense')
router.post('/',addExpense)
router.get('/',showExpenses)
module.exports = router;

