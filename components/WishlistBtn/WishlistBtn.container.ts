import { services } from "@core/lib/api";
import { flash } from "@core/lib/flash";
import { overridable } from "@core/lib/overridable";
import { useLoaderAsync } from "@core/lib/useLoader";
import { useLoggedInUser } from "@uac/lib/login/services";
import { useLoginForm } from "@uac/lib/useLoginForm";
import { createInjector, inject, mergeProps } from "unstateless";
import { WishlistBtnComponent } from "./WishlistBtn.component";
import { IWishlistBtnInputProps, IWishlistBtnProps, WishlistBtnProps } from "./WishlistBtn.d";

const injectWishlistBtnProps = createInjector(({product}:IWishlistBtnInputProps):IWishlistBtnProps => {
    const [user] = useLoggedInUser();
    const loader = useLoaderAsync();
    const loginModal = useLoginForm();

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
    
    return {add, isLoggedIn: !!user.user.id && user.user.id !== '' && user.user.id !== '0', loginModal};
});

const connect = inject<IWishlistBtnInputProps, WishlistBtnProps>(mergeProps(
    injectWishlistBtnProps,
));
export const connectWishlistBtn = connect;

export const WishlistBtn = overridable<IWishlistBtnInputProps>(connect(WishlistBtnComponent));
