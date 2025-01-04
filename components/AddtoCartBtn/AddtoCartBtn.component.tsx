import { Button } from "antd";
import {AddtoCartBtnProps} from "./AddtoCartBtn.d";
import styles from './AddtoCartBtn.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

export const AddtoCartBtnComponent = ({}:AddtoCartBtnProps) =>
    <Button className={clsx([styles.addToCartBtn, "addToCartBtn"])} type="primary" size="small">
        <FontAwesomeIcon icon={faCartPlus} />
    </Button>;
