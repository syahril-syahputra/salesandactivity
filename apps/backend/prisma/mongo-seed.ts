import { connectMongo } from "../src/libs/mongo";
import { ActivityLog } from "../src/models/ActivityLog";

const actions = ["login", "logout", "click", "scroll", "navigate"];

function getRandomDate(start: Date, end: Date): Date {
    return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
}

async function seedMongo() {
    try {
        await connectMongo();

        console.log("🧹 Menghapus data lama...");
        await ActivityLog.deleteMany({});

        const logs = Array.from({ length: 100 }, () => ({
            userId: `user${Math.floor(Math.random() * 10) + 1}`,
            action: actions[Math.floor(Math.random() * actions.length)],
            timestamp: getRandomDate(
                new Date("2025-01-01"),
                new Date("2025-03-31")
            ),
        }));

        await ActivityLog.insertMany(logs);

        console.log("Seeder MongoDB success!");
        process.exit(0);
    } catch (error) {
        console.error("Seeder MongoDB failed:", error);
        process.exit(1);
    }
}

seedMongo();
