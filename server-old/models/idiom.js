import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Idiom = new Schema({
    writer : String,
    contents : String,
    means : String,
    examples : String,
    importance : Number,
    starred : [String],
    date : {
        created : {type : Date, default : Date.now},
        edited : {type : Date, default : Date.now}
    },
    is_edited : {type : Boolean, default : false}
});

export default mongoose.model('idiom', Idiom);