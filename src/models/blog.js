const  { Schema, model } = require('mongoose');

const BlogSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    body:{
        type: String,
        required: true,
    },
    coverImage:{
        type: String,
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    }
},{ timestamps: true});

const Blog = model('blogs', BlogSchema);

module.exports = Blog;