import { Spin } from "antd";
import {UserWishlistProps} from "./UserWishlist.d";
import styles from './UserWishlist.module.scss';
import { ProductListItem } from "../ProductListItem";

export const UserWishlistComponent = ({user, wishlist, isLoading}:UserWishlistProps) =>
    <Spin spinning={isLoading}>
        <div className={styles.wishlistContainer}>
            <h1>Wishlist for {user.firstName} {user.lastName}</h1>
            <div className={styles.wishlistItems}>
                {wishlist.map(item => <ProductListItem key={item.id} product={item} />)}
            </div>
        </div>
    </Spin>;
