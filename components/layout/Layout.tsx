import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';
import {FC} from "react";

const Layout: FC = props => (
  <div>
    <MainNavigation/>
    <main className={classes.main}>{props.children}</main>
  </div>
);

export default Layout;
