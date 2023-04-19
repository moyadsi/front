const axios = require('axios')
require('dotenv').config()

const UrlApi = `https://api.newscatcherapi.com/v2/search?`

const GetNoticie =(req,res)=>{
    const ApiKey=req.headers['x-api-key']
    
    const {Search,Language,Importan,Page}=req.body;

    var options = {
        url: UrlApi,
        params: {q:Search, lang:Language, sort_by:Importan, page:Page},
        headers: {
          'x-api-key': ApiKey
        }
    };
      
    axios.request(options).then(function (response) {
        const code = response.status;
        res.status(code).json({Content:response.data.articles});
    }).catch(function (error) {
        res.status(400).json({error:error.message})
        });
}

module.exports = {
    GetNoticie
}