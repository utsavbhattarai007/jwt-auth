import { Router } from "express";
import multer from "multer";
const router = Router();

// setting up the storage mechanism
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + "--" + file.originalname);
  },
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
});

const upload = multer({
  storage: storage,
});

//Route for Image upload
router.post("/", upload.single("profile"), async (req, res) => {
  try {
    if (req.file === undefined) return res.status(400).json({ error:false, msg:"You must select a file." });    
    const url = req.protocol + "://" + req.get("host") +"/uploads/"+ req.file.filename;
    res.status(200).json({ error:false, msg:"File uploaded successfully!", imgUrl:url });
  } catch (error) {
    res.status(400).json({ error: true,msg:"Img upload failed" });
  }
});

export default router;
