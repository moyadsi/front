const PodsCast = require('../models/podcast.model')

const GetPodCast=async(req,res)=>{
  try {
    const Podcast=await PodsCast.find()
    res.status(200).json(Podcast)
  } catch (error) {
    res.status(500).json(error)
  }
}

const AddPodCast = async(req,res)=>{
  try {

    const NewPodCast = new PodsCast ({
      Name: req.body.Name,
      Duration: req.body.Duration,
      URL:req.body.URL,
      Image: req.body.Image
    })

    const PodsCastSave= await NewPodCast.save()

    res.status(201).send(PodsCastSave)

  } catch (error) {
    res.status(500).json(error)
  }
}

const GetPodCastName =async (req,res)=>{
  try {
    const PodCastAwait=await PodsCast.find({Name:req.params.Name})
    res.status(200).send(PodCastAwait)

  } catch (error) {
    
  }
}

module.exports={
  GetPodCast,
  AddPodCast,
  GetPodCastName
}