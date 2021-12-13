import {FC} from "react";
import {IMeetup} from "../../types";
import classes from './MeetupDetail.module.css'

const MeetupDetailsPage: FC<IMeetup> = ({title, description, address, image}) => {
  return (
    <section className={classes.detail}>
      <img src={image} alt={title}/>
      <h1>{title}</h1>
      <address>{address}</address>
      <p>{description}</p>
    </section>
  )
}

export default MeetupDetailsPage
