import { services } from "@core/lib/api";
import { flash } from "@core/lib/flash";
import { overridable } from "@core/lib/overridable";
import { useLoaderAsync } from "@core/lib/useLoader";
import { IProduct } from "@store-shared/product/types";
import { useLoggedInUser } from "@uac/lib/login/services";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { UserWishlistComponent } from "./UserWishlist.component";
import { IUserWishlistInputProps, IUserWishlistProps, UserWishlistProps } from "./UserWishlist.d";

const injectUserWishlistProps = createInjector(({userId}:IUserWishlistInputProps):IUserWishlistProps => {
    const [{user}] = useLoggedInUser();
    const [wishlist, setWishlist] = useState<IProduct[]>([]);
    const loader = useLoaderAsync();

    const refresh = () => {
        if(user.id) {
            loader(async () => {
                services().wishlist.search(user.id).then(setWishlist);
            });
        }
    }

    useEffect(refresh, [userId]);

    const remove = (productId:string) => () => {
        loader(() => 
            services().wishlist.remove(user.id, productId)
            .then(flash.success("Product removed from wishlist"))
            .then(refresh)
        )
    }

    return {user, wishlist, isLoading: loader.isLoading, remove};
});

const connect = inject<IUserWishlistInputProps, UserWishlistProps>(mergeProps(
    injectUserWishlistProps,
));
export const connectUserWishlist = connect;

export const UserWishlist = overridable<IUserWishlistInputProps>(connect(UserWishlistComponent));
