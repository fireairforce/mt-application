import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Province = new Schema({
  id: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  }
});


export default mongoose.model('Province',Province)