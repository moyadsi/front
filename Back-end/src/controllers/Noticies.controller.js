const axios = require('axios')
require('dotenv').config()

const UrlApi = `https://api.newscatcherapi.com/v2/search?`

const GetNoticie =(req,res)=>{
    const ApiKey=req.headers['x-api-key']                                                                                                                                                                                                                                                             
    const {Search,Language}=req.body;

    var options = {
        url: UrlApi,
        params: {q:Search, lang:Language},
        headers: {
          "x-api-key" : ApiKey
        }
    };
      
    axios.request(options).then(
        function (response) {
            res.status(200).json({Content:response.data});
        }
    ).catch(
        function(error) {
            res.status(400).json(error) 
        }
    );
}

module.exports = {
    GetNoticie
}