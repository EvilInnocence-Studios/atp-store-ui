import { Link } from "react-router";
import {CartBtnProps} from "./CartBtn.d";
import styles from './CartBtn.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Badge } from "antd";
import clsx from "clsx";

export const CartBtnComponent = ({count}:CartBtnProps) =>
    <Link to="/cart" className={clsx([styles.cartBtn, "cartBtn"])}>
        <FontAwesomeIcon icon={faCartShopping} />
        <Badge count={count}/>
    </Link>;
