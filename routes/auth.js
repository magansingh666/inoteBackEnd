const express = require("express");
const router =  express.Router();


router.get("/", (req, res)=> {
    let obj = {"jjjj":"farzi objecti",  "mmmmm":"sdfdfdfdfdfdfd"};
    res.json(obj);
    
})

module.exports = router;