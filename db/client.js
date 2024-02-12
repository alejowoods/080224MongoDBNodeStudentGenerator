import mongoose from "mongoose";

export const connectDatabase = async () => {
    try {
    
        const DBcheck = await mongoose.connect(process.env.MONGO_DB_URI);

        console.log('DB conection, successful');
    } catch (error) {
        console.error('Error trying to connect DB: ', error.message);
    }
};