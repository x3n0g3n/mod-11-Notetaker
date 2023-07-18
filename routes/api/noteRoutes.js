const router = require('express').Router()
const path = require('path'); // - This line imports the Node.js path module for working with file and directory paths.

const fs = require('fs/promises'); // - This line imports the Node.js fs module for working with the file system.
const readNotes = async () => {
    try {
        var myNotes = await fs.readFile(path.join(__dirname, "../../db/db.json"),"utf-8")
        myNotes = JSON.parse(myNotes)
        return myNotes
    } catch (error) {
        console.log(error)
    }

}

router.get("/", async (req,res)=>{
    res.json(await readNotes())
})


router.post("/", async (req,res) => {
    var currentNotes = await readNotes()
    currentNotes.push(req.body);
    await fs.writeFile(path.join(__dirname, "../../db/db.json"), JSON.stringify(currentNotes));
    res.json({message: "Note saved successfully."});
})

// router.delete('/:id', async (req, res) => {
//     const currentNotes = await User.destroy({
//       where: {
//         id: req.params.id,
//       },
//     }).catch((err) => res.json(err));
//     res.json(currentNotes);
//   });

router.delete("/:id", async (req,res) => {
    var currentNotes = await readNotes()
    currentNotes = currentNotes.filter(note => note.id !== req.params.id);
    await fs.writeFile(path.join(__dirname, "../../db/db.json"), JSON.stringify(currentNotes));
    res.status(204).send(); // Send a 204 No Content response to the client
})


module.exports = router