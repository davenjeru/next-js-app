import NewMeetupForm from "../components/meetups/NewMeetupForm";
import {IMeetup} from "../types";
import {useRouter} from "next/router";

const NewMeetupPage = () => {
  const router = useRouter()
  const addMeetupHandler = async (meetup: IMeetup) => {
    const response = await fetch('/api/new-meetup', {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(meetup)
    })

    const data = await response.json()
    await router.push('/')
    console.log({data})
  };

  return (<NewMeetupForm onAddMeetup={addMeetupHandler}/>)
}
export default NewMeetupPage
