import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
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
    isAdmin: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  { timestamps: true }
);

// user save after register
// --------------------
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  let salt = bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();

});


// matchPassword
// --------------------
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


const User = mongoose.model("User", userSchema);
export default User;
