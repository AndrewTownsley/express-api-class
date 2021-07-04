const express = require("express");
const { existsSync, readFile, write, writeFile } = require("fs")
const { join } = require("path")
const { v5 } = require("uuid");

const router = express.Router();

router.get("/test", (res, req, next) => {
    try {
        res.status(200).json({ msg: "Working"})
    } catch(error) {
        next(error)
    }
})

router.get("/:topic", (req,res,next) => {
    try {
        let{ topic } = req.params;
        let file = join(__dirname, "./data/" + topic + ".json")
        let exists = existsSync(file)
        if(exists) {
            res.sendFile(file)
        } else throw new Error("Invalid Request")
    } catch(error) {
        next(error)
    }
})

router.put("/:topic", (req,res,next) => {
    try {
        let{ topic } = req.params;
        let file = join(__dirname, "./data/" + topic + ".json")
        let exists = existsSync(file)
        if(exists) {
            res.sendFile(file)
        } else throw new Error("Invalid Request")
    } catch(error) {
        next(error)
    }
})

router.post("/:topic", (req,res,next) => {
    try {
        let{ topic } = req.params;
        let { body } = req;
        let file = join(__dirname, "./data/" + topic + ".json")
        let exists = existsSync(file)
        if(exists) {
            readFile(file, (err, data) => {
                if(err) {
                    throw new Error("error reading file")
                }
                let parsedData = JSON.parse(data);
                body.id = v5();
                parsedData.push(body)
                writeFile(file, JSON.stringify(parsedData), (err) => {
                    if(err) {
                        throw new Error("problem writing the file")
                    }
                    res.json({msg: "Succesfully updated resource"})
                })
            })
        } else throw new Error("Invalid Request")
    } catch(error) {
        next(error)
    }
})

module.exports = router