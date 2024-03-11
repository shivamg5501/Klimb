import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  "Name of the Candidate": {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    unique: true,
    required: true,
  },
  "Mobile No.": {
    type: String,
  },
  "Date of Birth": {
    type: String,
  },
  "Work Experience": {
    type: String,
  },
  "Resume Title": {
    type: String,
  },
  "Current Location": {
    type: String,
  },
  "Postal Address": {
    type: String,
  },
  "Current Employer": {
    type: String,
  },
  "Current Designation": {
    type: String,
  },
});

const User = mongoose.model("User", UserSchema);
export default User;
