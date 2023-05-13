const PodsCast = require('../models/podcast.model')

const GetPodCast=async(req,res)=>{
  try {
    const Podcast=await PodsCast.find()
    res.status(200).json(Podcast)
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports={
  GetPodCast
}