import { Button, Spin } from "antd";
import {UserWishlistProps} from "./UserWishlist.d";
import styles from './UserWishlist.module.scss';
import { ProductListItem } from "../ProductListItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const UserWishlistComponent = ({user, wishlist, isLoading, remove}:UserWishlistProps) =>
    <Spin spinning={isLoading}>
        <div className={styles.wishlistContainer}>
            <h1>Wishlist for {user.firstName} {user.lastName}</h1>
            <div className={styles.wishlistItems}>
                {wishlist.map(item => <div key={item.id} className={styles.wishlistItem}>
                    <ProductListItem product={item} />
                    <Button danger onClick={remove(item.id)}>
                        <FontAwesomeIcon icon={faTrash} /> Remove from wishlist
                    </Button>
                </div>)}
            </div>
        </div>
    </Spin>;
