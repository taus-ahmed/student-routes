import express from "express";
import { PORT , mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import studentRoutes from './routes/studentRoutes.js';

const student = express();

student.use(express.json());

student.get('/', (request,response) => {
    console.log(request)
    
    return response.status(236).send("Hi sir im working")
})

student.use('/studentcollection', studentRoutes);
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to DB');
        student.listen(PORT, () => {
            console.log(`App listening at port : ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
