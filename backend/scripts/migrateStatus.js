require("dotenv").config();
const mongoose = require("mongoose");

const migrate = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const db = mongoose.connection.db;
    const result = await db.collection("tasks").updateMany(
      { status: "In-Progress" },
      { $set: { status: "In Progress" } }
    );

    console.log(`Updated ${result.modifiedCount} tasks`);

    const priorityResult = await db.collection("tasks").updateMany(
      { priority: "Pending" },
      { $set: { priority: "Low" } }
    );

    console.log(`Updated ${priorityResult.modifiedCount} tasks (priority Pending -> Low)`);

    await mongoose.disconnect();
    console.log("Migration complete");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
};

migrate();
