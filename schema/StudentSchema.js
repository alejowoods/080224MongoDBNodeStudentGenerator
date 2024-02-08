import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({  // new is a keyword to create a new instance of a class
    name : {
        type: String,
        required: true
    },
    first_name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
            },

            message: 'No pal, this is not a valid email address. Try again!'
        }
    },

});

const Student = mongoose.model('Student', StudentSchema);

export default Student;  