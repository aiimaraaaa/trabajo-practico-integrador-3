import { model, Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, maxlength: 200 },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual Populate: Eventos que tienen esta categoría
categorySchema.virtual("events", {
  ref: "Event",
  localField: "_id",
  foreignField: "categories",
});

export const CategoryModel = model("Category", categorySchema);