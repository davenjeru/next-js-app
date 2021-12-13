import {NextApiHandler} from "next";
import {IMeetup} from "../../types";
import {MongoClient} from "mongodb";

const {AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} = process.env
const encodedCredentials = `${encodeURIComponent(AWS_ACCESS_KEY_ID!)}:${encodeURIComponent(AWS_SECRET_ACCESS_KEY!)}`
const uri = `mongodb+srv://${encodedCredentials}@cluster0.yxca3.mongodb.net/meetups?authSource=%24external&authMechanism=MONGODB-AWS&retryWrites=true&w=majority`;

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body as IMeetup
    let client: MongoClient;
    try {
      client = await MongoClient.connect(uri);
      const db = client.db()
      const meetupsCollection = await db.collection<IMeetup>('meetupsCollection')
      await meetupsCollection.insertOne(data);
      res.status(201).send({message: 'Meetup added successfully!'})
    } catch (e: any) {
      console.error(e)
      res.status(500).end()
    } finally {
      await client!?.close()
    }
  }
}

export default handler
