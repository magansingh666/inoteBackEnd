const express = require("express");
const router =  express.Router();


router.get("/", (req, res)=> {
    let obj = {"jjjj":"farzi objecti"};
    res.json(obj);
    
})
module.exports = router;


