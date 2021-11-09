import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import { notFound, errorHandler } from './middleWare/errorMiddleware.js'
import connectDB from './config/db.js';
import employeeRoutes from './routes/employeeRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
connectDB()
const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.send('api is running...')
})


app.use('/api/employees', employeeRoutes)
app.use('/api/users', userRoutes)

// erors 
app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));