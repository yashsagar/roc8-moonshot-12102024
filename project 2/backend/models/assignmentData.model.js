import mongoose from "mongoose";

const dataSchema = new mongoose.Schema(
  {
    day: { type: Date, required: true },
    age: { type: String, required: true },
    gender: { type: String, required: true },
    a: { type: Number, required: true },
    b: { type: Number, required: true },
    c: { type: Number, required: true },
    d: { type: Number, required: true },
    e: { type: Number, required: true },
    f: { type: Number, required: true },
  },
  { timestamps: true }
);

// Day: '28/10/2022',
// Age: '>25',
// Gender: 'Female',
// A: 492,
// B: 405,
// C: 801,
// D: 26,
// E: 611,
// F: 843

export const assignmentDataModel = mongoose.model("assignmentData", dataSchema);
