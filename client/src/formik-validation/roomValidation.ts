import { ObjectSchema, object, string } from 'yup'


interface RoomValidationStore {
    roomName:string;
}


const initialValues:RoomValidationStore={
    roomName:''
}

const validationSchema:ObjectSchema<RoomValidationStore>=object({
    roomName:string().required('Please Enter room name').matches(/^([^0-9!@#$%^&*()_+=]*)$/,'Room Name should be without characters'),  
})

export {initialValues,validationSchema};