import MeetupList from "../components/meetups/MeetupList";
import {IMeetup} from "../types";
import {FC} from "react";
import {GetStaticPropsResult, InferGetServerSidePropsType} from "next";
import {MongoClient} from "mongodb";

const HomePage: FC<InferGetServerSidePropsType<typeof getStaticProps>> = (props) => {
  return <MeetupList meetups={props.meetups}/>
}

export async function getStaticProps(): Promise<GetStaticPropsResult<{ meetups: IMeetup[] }>> {
  const {MONGO_AWS_ACCESS_KEY_ID, MONGO_AWS_SECRET_ACCESS_KEY} = process.env
  const encodedCredentials = `${encodeURIComponent(MONGO_AWS_ACCESS_KEY_ID!)}:${encodeURIComponent(MONGO_AWS_SECRET_ACCESS_KEY!)}`
  const uri = `mongodb+srv://${encodedCredentials}@cluster0.yxca3.mongodb.net/meetups?authSource=%24external&authMechanism=MONGODB-AWS&retryWrites=true&w=majority`;
  const client = await MongoClient.connect(uri);
  const db = client.db()
  const meetupsCollection = await db.collection<IMeetup>('meetupsCollection')
  const meetups = await meetupsCollection.find().toArray()
  await client.close()
  return {
    props: {
      meetups: meetups.map(m => ({...m, id: m._id.toString(), _id: null}))
    },
    revalidate: 60
  }
}

//
// export async function getServerSideProps() {
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     },
//   }
// }

export default HomePage
