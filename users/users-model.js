import mongoose from "mongoose";
import usersSchema from "./users-schema.js";
const usersModel = mongoose.model("newusers", usersSchema);
export default usersModel;