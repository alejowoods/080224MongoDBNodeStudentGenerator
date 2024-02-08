import Student from '../schema/StudentSchema.js';

export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find(); // find() is a method that returns all documents from a collection

        if (!students) {
            return res.status(404).json({ message: 'No students found' });
        }

        res.status(200).json(students); // res.status() sets the status of the response to the HTTP status code
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createStudent = async (req, res) => {
    try {
        const { name, first_name, email } = req.body; // req.body is an object that contains key-value pairs of data submitted in the request body
        const newStudent = new Student({name, first_name, email});
        const saveStudent = await newStudent.save();

        res.status(201).json(saveStudent);
    } catch (error) {
        console.log(500).send(error.message);
    }
};

export const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, first_name, email } = req.body;
        const updatedStudent = await Student.findByIdAndUpdate(
            id, // this id reffers to the id of the student we want to update
            { name, first_name, email },
            { new: true } // this option returns the modified document rather than the original
        );

        if(!updatedStudent){
            return res.status(404).json({message: 'This pal does not exist in your gorgeous database'});
        };
        res.status(200).json(updatedStudent)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};