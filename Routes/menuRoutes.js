import express from 'express';
import  Menu from '../models/menuSchema.js';

const router = express.Router();

router.post('/menuitem', async (req, res) => {
    try {
      const { name, description, price } = req.body;
      
      if (!name || !price) {
        return res.status(400).json({ error: 'Name and price are required' });
      }
  
      const newMenuItem = await Menu.create({ name, description, price });
      res.status(201).json({ message: 'Menu item added', item: newMenuItem });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });

  router.put('/menu/:id', async (req, res) => {
    try{
        const {name,description,price}=req.body;
        const item=await Menu.findById(req.params.id);
        if(!item){
            return res.status(404).json({error:'Item not found'});
        }
        const updatedItem=await Menu.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).json({message:'Item updated',item:updatedItem});
    }
    catch(err){
        res.status(500).json({error:'Server error'});
    }
  })

  router.delete('/menu/:id', async (req, res) => {
    try{
        const item=await Menu.findById(req.params.id);
        if(!item){
            return res.status(404).json({error:'Item not found'});
        }
        await Menu.findByIdAndDelete(req.params.id);
        res.status(200).json({message:'Item deleted'});
    }
    catch(err){
        res.status(500).json({error:'Server error'});
    }
  })

  export default router;