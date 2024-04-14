import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    unique: true,
  },
  img: {
    type: String,
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: 'Country',
    required: true,
  },
  roles: {
    type: [String],
    default: ["BUYER_ROLE"],
    enum: ["BUYER_ROLE", "ADMIN_ROLE"],
  },
});

userSchema.method("toJSON", function () {
  const { _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export const UserModel = mongoose.model("User", userSchema);
