import { Button, Spin } from "antd";
import { UserWishlistProps } from "./UserWishlist.d";
import styles from './UserWishlist.module.scss';
import { ProductListItem } from "../ProductListItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { overridable } from "@core/lib/overridable";

export const UserWishlistComponent = overridable(({ user, wishlist, isLoading, remove, classes = styles }: UserWishlistProps) =>
    <Spin spinning={isLoading}>
        <div className={classes.wishlistContainer}>
            <h1>Wishlist for {user.firstName} {user.lastName}</h1>
            <div className={classes.wishlistItems}>
                {wishlist.map(item => <div key={item.id} className={classes.wishlistItem}>
                    <ProductListItem product={item} />
                    <Button danger onClick={remove(item.id)}>
                        <FontAwesomeIcon icon={faTrash} /> Remove from wishlist
                    </Button>
                </div>)}
            </div>
        </div>
    </Spin>
);
