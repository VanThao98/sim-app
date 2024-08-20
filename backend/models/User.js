import mongoose from "mongoose";

const UserSchemal = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      default: "customer",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchemal);
export default User;
