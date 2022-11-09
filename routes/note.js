const express = require("express");

const Note = require("../models/Note");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const router = express.Router();

router.get('/fetchallnotes', fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (errors) {
    res.status(500).send("Internal Server Error");
  }
});

router.post(
  '/addnote',
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);


router.put('/updatenote/:id', fetchuser, async (req, res) => {
     const {title, description, tag} = req.body;
     let note = await Note.findById(req.params.id);
     if(!note){res.status(404).send("Not found");}

     if(note.user.toString() !== req.user.id){
        console.log(note.user.toHexString, req.user.id);
        return res.status(401).send("not allowed");
        
     }

         
     const newNote = {};
     if(title){note.title = title}
     if(description){note.description = description}
     if(tag){note.tag = tag}

     await note.save();
     res.json({note});

    

});

module.exports = router;
