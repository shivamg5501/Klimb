import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import reader from "xlsx";
import async from "async";
import Data from "./Schema.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});
const upload = multer({ storage: multerStorage });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

const url = `mongodb+srv://shivamg998764:sGbBaq9GvFxjCv7g@cluster0.vrnkrrg.mongodb.net/`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("db is connected");
  Data.createCollection();
});

async function UploadingData(name, data) {
  function checkEmail(Data) {
    return Data.Email === data.Email;
  }

  await Data.findOne({ name: name })
    .then(async (found) => {
      if (!found.candidateData.find(checkEmail)) {
        found.candidateData.push(data);
        await found.save();
      }
    })
    .catch((err) => console.log(err));
}

async function UploadingFile(filename) {
  const data = new Data({
    name: filename,
    candidateData: [],
  });
  await data.save();
  const filePath = __dirname + "/uploads/" + filename;
  const file = reader.readFile(filePath);
  const details = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[0]], {
    raw: false,
  });
  async.eachSeries(details, async function (item, cb) {
    await UploadingData(filename, item);
  });
}

app.post("/upload", upload.single("file"), (req, res) => {
  UploadingFile(req.file.filename);
  res.status(200);
  res.send();
});

app.listen(3000, console.log("Server is running"));
