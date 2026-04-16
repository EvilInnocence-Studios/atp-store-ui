import { overridable } from "@core/lib/overridable";
import { injectProductContextProps, IProductContextProps } from "@store/lib/context";
import { withLayoutMetadata } from "@theming/lib/layout/componentRegistry";
import { createInjector, inject, mergeProps } from "unstateless";
import { AddToCartBtnComponent } from "./AddToCartBtn.component";
import { AddToCartBtnProps, IAddToCartBtnInputProps, IAddToCartBtnProps } from "./AddToCartBtn.d";
import { AddToCartBtnLayoutEditor } from "./AddToCartBtn.layout";
import { AddToCartBtnPropEditor } from "./AddToCartBtn.props";
import icon from './icon.svg';
import { useCart } from "@store/lib/useCart";
import { flash } from "@core/lib/flash";

const injectAddToCartBtnProps = createInjector(({product}:IAddToCartBtnInputProps & IProductContextProps):IAddToCartBtnProps => {
    const cart = useCart();

    return {
        addToCart: () => {
            if (!product) return;

            cart.add(product);
            flash.success("Product added to cart")();
        },
    };
});

const connect = inject<IAddToCartBtnInputProps, AddToCartBtnProps>(mergeProps(
    injectProductContextProps,
    injectAddToCartBtnProps,
));
export const connectAddToCartBtn = connect;

export const AddToCartBtn = withLayoutMetadata(
    overridable<IAddToCartBtnInputProps>(connect(AddToCartBtnComponent)),
    {
        name: "AddToCartBtn",
        displayName: "Add To Cart Button",
        category: "Store",
        subCategory: "Actions",
        description: "",
        icon,
        getSlotDisplayName: (slotName, props) => props[slotName] || slotName,
        layoutEditor: AddToCartBtnLayoutEditor,
        propEditor: AddToCartBtnPropEditor,
    }
);
