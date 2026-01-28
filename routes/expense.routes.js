const express=require('express')
const router=express.Router()

const {addExpense, getTotalExpenses, getCategoryWiseExpenses} = require('../controllers/Expense')
const {showExpenses}=require('../controllers/Expense')
router.post('/',addExpense)
router.get('/',showExpenses)
router.get('/total',getTotalExpenses)
router.get('/by-category',getCategoryWiseExpenses)
module.exports = router;

