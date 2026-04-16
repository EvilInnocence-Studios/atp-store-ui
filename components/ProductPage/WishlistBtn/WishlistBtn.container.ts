import { services } from "@core/lib/api";
import { flash } from "@core/lib/flash";
import { overridable } from "@core/lib/overridable";
import { useLoaderAsync } from "@core/lib/useLoader";
import { injectProductContextProps, IProductContextProps } from "@store/lib/context";
import { withLayoutMetadata } from "@theming/lib/layout/componentRegistry";
import { useLoggedInUser } from "@uac/lib/login/services";
import { useLoginForm } from "@uac/lib/useLoginForm";
import { createInjector, inject, mergeProps } from "unstateless";
import icon from './icon.svg';
import { WishlistBtnComponent } from "./WishlistBtn.component";
import { IWishlistBtnInputProps, IWishlistBtnProps, WishlistBtnProps } from "./WishlistBtn.d";
import { WishlistBtnLayoutEditor } from "./WishlistBtn.layout";
import { WishlistBtnPropEditor } from "./WishlistBtn.props";

const injectWishlistBtnProps = createInjector(({product}:IWishlistBtnInputProps & IProductContextProps):IWishlistBtnProps => {
    const [user] = useLoggedInUser();
    const loader = useLoaderAsync();
    const loginModal = useLoginForm();

    const add = () => {
        if(user.user.id && product) {
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
    injectProductContextProps,
    injectWishlistBtnProps,
));
export const connectWishlistBtn = connect;

export const WishlistBtn = withLayoutMetadata(
    overridable<IWishlistBtnInputProps>(connect(WishlistBtnComponent)),
    {
        name: "WishlistBtn",
        displayName: "Wishlist Btn",
        category: "Store",
        subCategory: "Actions",
        description: "",
        icon,
        getSlotDisplayName: (slotName, props) => props[slotName] || slotName,
        layoutEditor: WishlistBtnLayoutEditor,
        propEditor: WishlistBtnPropEditor,
    }
);
