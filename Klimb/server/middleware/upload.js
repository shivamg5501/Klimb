import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, callBack) {
    callBack(null, "./data/uploads");
  },
  filename: function (req, file, callBack) {
    callBack(null, new Date().toISOString() + "-" + file.originalname);
  },
});

export const upload = multer({ storage });
