import { Collection, MongoClient } from "mongodb";
import bcrypt from "bcrypt";

interface ICredentialsDocument {
    username: string;
    password: string;
}

export class CredentialsProvider {
    private readonly collection: Collection<ICredentialsDocument>;

    constructor(mongoClient: MongoClient) {
        const COLLECTION_NAME = process.env.CREDS_COLLECTION_NAME;
        if (!COLLECTION_NAME) {
            throw new Error("Missing CREDS_COLLECTION_NAME from env file");
        }
        this.collection = mongoClient.db().collection<ICredentialsDocument>(COLLECTION_NAME);
    }

    async registerUser(username: string, plaintextPassword: string) {
        // TODO
        const user = await this.collection.findOne({ username: username });

        if (user) {
            // console.log('User already exists');
            return false;
        }

        const salt = await bcrypt.genSalt(10);
        const passHash = await bcrypt.hash(plaintextPassword, salt);
        console.log(`${salt}, ${passHash}`);

        await this.collection.insertOne({username: username, password: passHash});
        return true;
    }

    async verifyPassword(username: string, plaintextPassword: string) {
        const user = await this.collection.findOne({ username: username });
        if (!user) {
            // console.log('User doesn't exist');
            return false;
        }

        const result = await bcrypt.compare(plaintextPassword, user.password);

        return result;
    }
}
