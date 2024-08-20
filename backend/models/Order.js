import mongoose from "mongoose";

const OrderSchemal = mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        simId: { type: Schema.Types.ObjectId, ref: "SimCard", required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    personalInfo: {
      fullName: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      email: { type: String, required: true },
    },
    shippingAddress: {
      city: { type: String, required: true }, //da nang
      district: { type: String, required: true }, // son tra
      ward: { type: String, required: true }, //My An
      street: { type: String, required: true }, // m1 my an
      note: { type: String }, // ghi chú
    },
    orderDate: { type: Date, default: Date.now },
    status: { type: String, default: "pending" },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchemal);
export default Order;
