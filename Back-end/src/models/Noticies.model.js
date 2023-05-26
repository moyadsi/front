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
    type: String
  },
  videoURL:{
      type: String
  },
  ImagenURL:{
    type: String
  },
  PodCast:{
    type: String
  }
})

module.exports = mongoose.model('Noticie',NoticieSchema)