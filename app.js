const express= require('express')
const app=express()
const {addExpense} =require('./controllers/Expense')
const connectDB= require('./config/db')
const PORT = 3000;
app.use(express.json())
connectDB();
const expenseRoutes = require("./routes/expense.routes");

app.use('/expenses',expenseRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

