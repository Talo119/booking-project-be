import mongoose, { Schema } from "mongoose";

const countrySchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
  },
  currency:{
    type: String,
    required: [true, 'Currendy is required'],
  },
  area: {
    type: String,
  },
  locale: {
    type: String,
  },
});

/* countrySchema.method("toJSON", function () {
  const { _id, ...object } = this.toObject();
  object.id = _id;
  return object;
}); */

export const CountryModel = mongoose.model("Country", countrySchema);
