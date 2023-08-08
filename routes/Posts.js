import express from 'express';
import { PostsModel } from '../models/Posts.js';

const router = express.Router()

//create post
router.post('/', async(req, res) => {
    try {
        console.log("Received request body:", req.body);
        const post = await PostsModel.create(req.body)
        console.log("🚀 ~ file: Posts.js:9 ~ router.post ~ req.body:", req.body)
        res.status(200).json(post);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})


//get post
router.get('/', async(req, res) => {
    try {
        const posts = await PostsModel.find({});
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


//get by id
router.get('/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const post = await PostsModel.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


//update by id
router.put('/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const post = await PostsModel.findByIdAndUpdate(id, req.body);
        // we cannot find any post in database
        if(!post){
            return res.status(404).json({message: `cannot find any post with ID ${id}`})
        }
        const updatedPost = await PostsModel.findById(id);
        res.status(200).json(updatedPost);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//delete by id
router.delete('/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const post = await PostsModel.findByIdAndDelete(id);
        if(!post){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(post);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
export { router as postsRouter };
