import {Schema, model} from 'mongoose';

const messageSchema = new Schema({
    senderId: {
        type: String,
        ref: 'User',
        required: true
    }, 
    reciverId: {
        type: String,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
    },

    image: {
        type: String
    }
},{timestamps: true});

const Message = model('Message', messageSchema);

export default Message;