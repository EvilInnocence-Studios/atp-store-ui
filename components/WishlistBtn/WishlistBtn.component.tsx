import { Button } from "antd";
import {WishlistBtnProps} from "./WishlistBtn.d";
import styles from './WishlistBtn.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export const WishlistBtnComponent = ({add}:WishlistBtnProps) =>
    <Button className={styles.wishlistBtn} type="link" onClick={add}>
        <FontAwesomeIcon icon={faHeart} /> Add to wishlist
    </Button>;
