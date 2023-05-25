const mongoose = require('mongoose');

const VideoSchema = mongoose.Schema({
  IdNoticie:[
    {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Noticies'
    }
  ],
  VideoURL:{
    type: String
  }
})

module.exports = mongoose.model('Video',VideoSchema)