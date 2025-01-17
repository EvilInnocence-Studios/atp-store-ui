import { services } from "@core/lib/api";
import { useLoaderAsync } from "@core/lib/useLoader";
import { IProduct } from "@store-shared/product/types";
import { SafeUser } from "@uac-shared/user/types";
import { useLoggedInUser } from "@uac/lib/login/services";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { UserWishlistComponent } from "./UserWishlist.component";
import { IUserWishlistInputProps, IUserWishlistProps, UserWishlistProps } from "./UserWishlist.d";

const injectUserWishlistProps = createInjector(({userId}:IUserWishlistInputProps):IUserWishlistProps => {
    const [{user}] = useLoggedInUser();
    const [wishlist, setWishlist] = useState<IProduct[]>([]);
    const loader = useLoaderAsync();

    useEffect(() => {
        if(user.id) {
            loader(async () => {
                services().wishlist.search(user.id).then(setWishlist);
            });
        }
    }, [userId]);


    return {user, wishlist, isLoading: loader.isLoading};
});

const connect = inject<IUserWishlistInputProps, UserWishlistProps>(mergeProps(
    injectUserWishlistProps,
));

export const UserWishlist = connect(UserWishlistComponent);
