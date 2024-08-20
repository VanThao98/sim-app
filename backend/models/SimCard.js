import mongoose from "mongoose";

const SimCardSchemal = mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String, // trả trước, sau
      required: true,
    },
    simPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "available",
    },
    plan: {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      dataMonth: { type: String, required: true }, // e.g., '60GB'
      dataDay: { type: String, required: true }, // e.g., '3GB'
      minutes: { type: Number, required: true }, // e.g., 1000 minutes
      sms: { type: Number, required: true }, // e.g., 500 SMS
      validity: { type: String, required: true }, // e.g., '30 days'
    },
  },
  { timestamps: true }
);

const SimCard = mongoose.model("SimCard", SimCardSchemal);
export default SimCard;
