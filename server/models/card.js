import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Card = new Schema({
    writer: String,
    contents: String,
    means: String,
    examples: String,
    importance: Number,
    tags: [String],
    view_count: Number,
    date: {
        created: {type: Date, default: Date.now},
        edited: {type: Date, default: Date.now}
    },
    is_edited: {type: Boolean, default: false}
});

export default mongoose.model('card', Card);