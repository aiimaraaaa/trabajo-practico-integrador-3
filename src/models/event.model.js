import { model, Schema, Types } from "mongoose";

const eventSchema = new Schema(
  {
    title: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    capacity: { type: Number, required: true, min: 1 },
    price: { type: Number, default: 0, min: 0 },
    status: { type: String, enum: ["scheduled", "cancelled", "finished"], default: "scheduled" },
    location: {
      venue: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
    },
    organizer: { type: Types.ObjectId, ref: "User", required: true },
    categories: [{ type: Types.ObjectId, ref: "Category" }],
  },
  { timestamps: true, versionKey: false }
);

export const EventModel = model("Event", eventSchema);