import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "antd";
import { WishlistBtnProps } from "./WishlistBtn.d";
import styles from './WishlistBtn.module.scss';

export const WishlistBtnComponent = ({add, isLoggedIn, loginModal}:WishlistBtnProps) =><>
    {isLoggedIn && <Button className={styles.wishlistBtn} type="link" onClick={add}>
        <FontAwesomeIcon icon={faHeart} /> Add to wishlist
    </Button>}
    {!isLoggedIn && <Button className={styles.wishlistBtn} type="link" onClick={loginModal.open}>
        <FontAwesomeIcon icon={faHeart} /> Login to Add to wishlist
    </Button>}
</>;
