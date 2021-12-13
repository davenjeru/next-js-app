import MeetupDetail from "../components/meetups/MeetupDetail";
import {GetStaticPaths, GetStaticProps} from "next";
import {IMeetup} from "../types";
import {FC} from "react";
import {ParsedUrlQuery} from "querystring";
import {MongoClient, ObjectId} from "mongodb";

const {MONGO_AWS_ACCESS_KEY_ID, MONGO_AWS_SECRET_ACCESS_KEY} = process.env
const encodedCredentials = `${encodeURIComponent(MONGO_AWS_ACCESS_KEY_ID!)}:${encodeURIComponent(MONGO_AWS_SECRET_ACCESS_KEY!)}`
const uri = `mongodb+srv://${encodedCredentials}@cluster0.yxca3.mongodb.net/meetups?authSource=%24external&authMechanism=MONGODB-AWS&retryWrites=true&w=majority`;

const MeetupDetailsPage: FC<IMeetup> = (props) => {
  return (
    <MeetupDetail{...props}/>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const client = await MongoClient.connect(uri);
  const db = client.db()
  const meetupsCollection = await db.collection<IMeetup>('meetupsCollection')
  const meetupIds = await meetupsCollection.find({}, {projection: {_id: 1}}).toArray()
  await client.close()

  return {
    paths: meetupIds.map(m => ({params: {meetupId: m._id.toString()}})),
    fallback: false
  }
}

interface IMeetupDetailParams extends ParsedUrlQuery {
  meetupId: string
}

export const getStaticProps: GetStaticProps<IMeetup, IMeetupDetailParams> = async (context) => {
  const {meetupId} = context.params!
  const client = await MongoClient.connect(uri);
  const db = client.db()
  const meetupsCollection = await db.collection<IMeetup>('meetupsCollection')
  const meetup = await meetupsCollection.findOne({_id: new ObjectId(meetupId)})
  await client.close()
  return ({
    props: {...meetup!, id: meetup!._id.toString(), _id: null}
  });
};

export default MeetupDetailsPage
