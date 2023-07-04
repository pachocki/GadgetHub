import { model, Schema, models } from "mongoose";

const OrderSchema = new Schema(
  {
    line_items: Object,
    name: String,
    city: String,
    email: String,
    street: String,
    code: String,
    country: String,
    paid: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

export const Order = models.Order || model("Order", OrderSchema);
