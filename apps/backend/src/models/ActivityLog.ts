import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema({
    userId: String,
    action: String,
    timestamp: Date,
});

export const ActivityLog =
    mongoose.models.ActivityLog ||
    mongoose.model("ActivityLog", activityLogSchema);
