const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/MetAnimation',{
    useNewUrlParser: true,
    UseUnifiedTopology: true,
}).then(db=>console.log(`la base de datos mongodb se conecto`))
    .catch(err => console.error(err));