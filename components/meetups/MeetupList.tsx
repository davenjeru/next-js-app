import MeetupItem from './MeetupItem';
import classes from './MeetupList.module.css';
import {IMeetup} from "../../types";
import {FC} from "react";

const MeetupList: FC<{ meetups: IMeetup[] }> = props => (
  <ul className={classes.list}>
    {props.meetups.map((meetup) => (
      <MeetupItem
        key={meetup.id}
        {...meetup}
      />
    ))}
  </ul>
);

export default MeetupList;
