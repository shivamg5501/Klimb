import User from "../model/userData.js";
import async from "async";
import xlsx from "xlsx";

export const processData = async (req, res) => {
  try {
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const excelData = xlsx.utils.sheet_to_json(worksheet);

    async.eachSeries(
      excelData,
      async (record, callback) => {
        try {
          const existingRecord = await User.findOne({ email: record.email });
          if (existingRecord) {
            existingRecord.someProperty = record.someProperty;
            await existingRecord.save();
          } else {
            const newRecord = new User(record);
            await newRecord.save();
          }

          callback();
        } catch (error) {
          console.error("Error processing record:", error);
          callback();
        }
      },
      (err) => {
        if (err) {
          console.error("Error processing Excel file:", err);
          res.status(500).json({ error: "Internal server error" });
        } else {
          res.status(200).json({ message: "Data saved successfully" });
        }
      }
    );
  } catch (error) {
    console.error("Error processing Excel file:", error);
    res.status(400).json({ error: "Invalid Excel file format" });
  }
};
