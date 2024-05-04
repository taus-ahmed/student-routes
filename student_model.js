import mongoose, { mongo } from "mongoose";

const studentsSchema = mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
        },
        serial_no: {
            type: Number,
            required: true,
        },
        courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
    },
    {
        timestamps : true,
    }
)

export const Student = mongoose.model('Student' , studentsSchema);
