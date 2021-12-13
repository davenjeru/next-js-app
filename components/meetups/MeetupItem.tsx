import Card from '../ui/Card';
import classes from './MeetupItem.module.css';
import {FC} from "react";
import {IMeetup} from "../../types";


const MeetupItem: FC<IMeetup> = props => (
  <li className={classes.item}>
    <Card>
      <div className={classes.image}>
        <img src={props.image} alt={props.title}/>
      </div>
      <div className={classes.content}>
        <h3>{props.title}</h3>
        <address>{props.address}</address>
      </div>
      <div className={classes.actions}>
        <button>Show Details</button>
      </div>
    </Card>
  </li>
);

export default MeetupItem;
