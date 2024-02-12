import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { createStudent, getAllStudents, updateStudent } from './controllers/StudentController.js'; // import the createStudent function from the StudentController.js file
import wishlistRouter from './routers/wishListRouter.js';

dotenv.config();

const app = express();
const port = 8000;

mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

app.use(express.json());

app.use('/api', wishlistRouter);

app.get('/students', getAllStudents);
app.post('/students', createStudent);
app.put('/students/:id', updateStudent);

app.listen(port, () => {
    console.log(`Listening to server in port ${port}`);
});
