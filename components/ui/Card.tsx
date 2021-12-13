import classes from './Card.module.css';
import {FC} from "react";

const Card: FC = props => <div className={classes.card}>{props.children}</div>;

export default Card;
