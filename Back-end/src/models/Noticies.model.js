const mongoose = require('mongoose');

const NoticieSchema = new mongoose.Schema({
  Title:{
    type: String
  },
  Description:{
    type: String
  },
  Category:{
    type: String
  },
  Author:{
    type: String
  },
  PublicationDate:{
    type: Date.now()
  },
  videoURL:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video'
    }
  ]
})

module.exports = mongoose.model('Noticie',NoticieSchema)