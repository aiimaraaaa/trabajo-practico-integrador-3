import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    // relacion 1:1 embebida
    profile: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      birthDate: { type: Date },
      phone: { type: String },
    },
    // eliminación lógica
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual Populate: Eventos organizados por el usuario
userSchema.virtual("events", {
  ref: "Event",
  localField: "_id",
  foreignField: "organizer",
});

export const UserModel = model("User", userSchema);