import { createInjector, inject, mergeProps } from "unstateless";
import {WishlistBtnComponent} from "./WishlistBtn.component";
import {IWishlistBtnInputProps, WishlistBtnProps, IWishlistBtnProps} from "./WishlistBtn.d";
import { useLoaderAsync } from "@core/lib/useLoader";
import { services } from "@core/lib/api";
import { useLoggedInUser } from "@uac/lib/login/services";
import { flash } from "@core/lib/flash";

const injectWishlistBtnProps = createInjector(({product}:IWishlistBtnInputProps):IWishlistBtnProps => {
    const [user] = useLoggedInUser();
    const loader = useLoaderAsync();

    const add = () => {
        if(user.user.id) {
            loader(async () => {
                services().wishlist.add(user.user.id, product.id)
                    .then(flash.success(`Added ${product.name} to your wishlist`));
            });
        } else {
            flash.error("You must be logged in to add to your wishlist");
        }
    };
    
    return {add};
});

const connect = inject<IWishlistBtnInputProps, WishlistBtnProps>(mergeProps(
    injectWishlistBtnProps,
));

export const WishlistBtn = connect(WishlistBtnComponent);
