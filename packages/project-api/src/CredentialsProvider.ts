import { Collection, MongoClient } from "mongodb";
import bcrypt from "bcrypt";

interface ICredentialsDocument {
    username: string;
    password: string;
}

interface IUsersDocument {
    username: string;
    email: string;
}

export class CredentialsProvider {
    private readonly collection: Collection<ICredentialsDocument>;
    private readonly userCollection: Collection<IUsersDocument>;

    constructor(mongoClient: MongoClient) {
        const COLLECTION_NAME = process.env.CREDS_COLLECTION_NAME;
        if (!COLLECTION_NAME) {
            throw new Error("Missing CREDS_COLLECTION_NAME from env file");
        }
        this.collection = mongoClient.db().collection<ICredentialsDocument>(COLLECTION_NAME);

        const USERS_COLLECTION = process.env.USERS_COLLECTION_NAME;
        if (!USERS_COLLECTION) {
            throw new Error("Missing USERS_COLLECTION_NAME from env file");
        }
        this.userCollection = mongoClient.db().collection<IUsersDocument>(USERS_COLLECTION);
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
        // console.log(`${salt}, ${passHash}`);

        await this.collection.insertOne({username: username, password: passHash});
        await this.userCollection.insertOne({username: username, email: "placeholder@place.holder"})
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

    async changePassword(username: string, plaintextPassword: string) {
        const user = await this.collection.findOne({ username: username });
        if (!user) {
            // console.log('User doesn't exist');
            return false;
        }

        const salt = await bcrypt.genSalt(10);
        const passHash = await bcrypt.hash(plaintextPassword, salt);

        const result = await this.collection.updateOne(
            { username: username }, 
            { $set: { password: passHash } } 
        );
        
        return result.modifiedCount > 0;
    }
}
