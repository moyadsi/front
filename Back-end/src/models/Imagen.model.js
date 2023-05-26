const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  IDContenido:[{
    type: Number,
    ref: 'Contenido'
  }],
  URLImagen:{
    type: String
  }
})
module.exports = mongoose.model('Imagen',ImageSchema);
