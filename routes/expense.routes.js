const express=require('express')
const router=express.Router()

const {addExpense} = require('../controllers/Expense')

router.post('/',addExpense)

module.exports = router;

