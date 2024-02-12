import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { createStudent, getAllStudents, updateStudent } from './controllers/StudentController.js'; // import the createStudent function from the StudentController.js file
import wishlistRouter from './routers/wishListRouter.js';
import { connectDatabase } from './db/client.js';

dotenv.config();

const app = express();
const port = 8000;

app.use(express.json());
app.use('/api', wishlistRouter);

app.get('/students', getAllStudents);
app.post('/students', createStudent);
app.put('/students/:id', updateStudent);

const startServer = async () => {

    await connectDatabase();
    app.listen(port, () => {
    console.log(`Countries app listening on port ${port}`)
    })
}
  
startServer().catch(error => {
    console.log(error, 'failed to start server')
})
