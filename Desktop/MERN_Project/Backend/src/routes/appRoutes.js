import express from 'express'
import items from '../models/items.js'
import upload from '../middleware/uploads.js'
import { cloudinary } from '../utils/cloudinary.js'
const router  = express.Router()

router.post('/add', upload.single('imageUrl'), async (req,res) => {
    
    try{
        const {
            title,
            description,
            category,
            status,
            location,
            date,
            reportedBy
        } = req.body
    
        const newItem = new items({
            title,
            description,
            category,
            status,
            location,
            date,
            reportedBy,
            imageUrl: req.file.path
        })
    
        await newItem.save()
        res.status(201).json({message: "item Uploaded", filepath: req.file.path})

    }
    catch(err) {
        console.error("Error :", err)
        res.status(500).json({message: "Server Error"})

    }
})

router.get('/all', async (req, res) => {
    try{
        const lostItems = await items.find({ status: "lost" }).populate('reportedBy', 'name email phone')
        res.status(200).json(lostItems)
    }
    catch(err) {
        console.error("Error: ", err)
        res.status(500).json({message: "Server Error"})

    }
})

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const updateFields = req.body;
  
    try {
      const updateditem = await items.findByIdAndUpdate(id, updateFields, {
        new: true,
        runValidators: true
      });
  
      if (!updateditem) {
        return res.status(404).json({ message: "item not Found" });
      }
  
      res.status(200).json({ message: "item Updated successfully", updateditem });
    } catch (err) {
      console.error("Error: ", err);
      res.status(500).json({ message: "Server Error" });
    }
});

router.delete('/:id', async(req, res) => {
    const { id } = req.params

    try{
        const item = await items.findById(id)

        if(item.imagePublicId) {
            await cloudinary.uploader.destroy(item.imagePublicId)
            console.log(done)
        }

        const deleteitem = await items.findByIdAndDelete(id)

        if(!deleteitem){
            return res.status(404).json({message: "Item not Found"})
        }
        

        res.status(200).json({message: "Item deleted Successfully"})
        
    }
    catch(err) {
        console.error("error: ", err)
        res.status(500).json({message: "Server Error"})
    }
})




export default router