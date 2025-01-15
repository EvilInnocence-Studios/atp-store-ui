import { Link } from "react-router";
import {CartBtnProps} from "./CartBtn.d";
import styles from './CartBtn.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Badge } from "antd";

export const CartBtnComponent = ({count}:CartBtnProps) =>
    <Link to="/cart" className={styles.cartBtn}>
        <FontAwesomeIcon icon={faCartShopping} />
        <Badge count={count}/>
    </Link>;
