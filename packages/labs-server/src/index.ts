import express, { Request, Response } from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { ImageProvider } from "./ImageProvider";

dotenv.config(); // Read the .env file in the current working directory, and load values into process.env.
const PORT = process.env.PORT || 3000;
const staticDir = process.env.STATIC_DIR || "public";
let mongoClient: MongoClient;

async function setUpSever() {
    const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER, DB_NAME } = process.env;
    const connectionStringRedacted = `mongodb+srv://${MONGO_USER}:<password>@${MONGO_CLUSTER}/${DB_NAME}`;
    const connectionString = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${DB_NAME}`;

    console.log("Attempting Mongo connection at " + connectionStringRedacted);

    mongoClient = await MongoClient.connect(connectionString);
    const collectionInfos = await mongoClient.db().listCollections().toArray();
    console.log(collectionInfos.map(collectionInfo => collectionInfo.name)); // For debug only
}

const app = express();
app.use(express.static(staticDir));
// mongodb+srv://egerlach:<db_password>@cluster0.0b004.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.get("/api/images", async (req: Request, res: Response) => {
    const imageProvider = new ImageProvider(mongoClient);
    const images = await imageProvider.getAllImages();
    res.send(images);
});

app.get("*", (req: Request, res: Response) => {
    console.log("none of the routes above me were matched");
    // console.log(`${staticDir}/index.html`);
    const optionsObject = {
        root: staticDir
    }
    res.sendFile(`index.html`, optionsObject);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

setUpSever();