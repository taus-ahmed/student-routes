import express from 'express';
import { Student } from '../models/student_model.js';

const router = express.Router();

//route to create data
router.post('/' , async(request,response) =>{
    try{
        if(
            !request.body.first_name ||
            !request.body.last_name ||
            !request.body.serial_no ||
            !request.body.courses 
        ) {
            return response.status(400).send({
                message: 'Not Connected , Send all reqiuired fields ',
            });
        }
        const newStudent = {
            first_name: request.body.first_name,
            last_name: request.body.last_name,
            serial_no : request.body.serial_no,
            courses: ['662f34ddcd2cbbe8bd612039'],
        };

        const student = await Student.create(newStudent);

        return response.status(201).send(student);
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});    
    }
});

// route to get all courses by id 1
router.get('/', async(request,response) => {
    try{
        const student = await Student.find({});

        return response.status(500).json({
            count: student.length,
            data : student
        }
        );
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//route for One Course by id 
router.get('/:id', async(request,response) => {
    try{
        const { id } = request.params;

        const student = await Student.findById(id);

        return response.status(500).json(student);
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//route for update 
router.put('/:id', async(request,response) => {
    try{
        if (
            !request.body.first_name ||
            !request.body.last_name ||
            !request.body.serial_no
        ){
            return response.status(400).send({
                message: 'Send all reqiuired fields ,'
            });
        }

        const { id } = request.params;

        const result = await Student.findByIdAndUpdate(id , request.body);

        if(!result){
            return response.status(404).json({ message : 'Student not found'});
        }
        
        return response.status(200).send({ message : 'Student updated successfully '});
    }catch(errror){
        console.log(err.message);
        response.status(500).send({message: error.message});
    }
});

//route for delete
router.delete('/:id' , async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Student.findByIdAndDelete(id);

        if (!result){
            return response.status(404).json({ message : 'Student not found'});
        }
        
        return response.status(200).send({ message : ' Student deleted successfully '});


    }catch(error){
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});

export default router;