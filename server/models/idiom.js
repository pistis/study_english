import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Idiom = new Schema({
    contents : String,
    means : String,
    importance : Number,
    examples : [String],
    date : {
        created : {type : Date, default : Date.now},
        edited : {type : Date, default : Date.now}
    }
});

export default mongoose.model('idiom', Idiom);