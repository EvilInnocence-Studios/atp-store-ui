import { createInjector, inject, mergeProps } from "unstateless";
import {CartBtnComponent} from "./CartBtn.component";
import {ICartBtnInputProps, CartBtnProps, ICartBtnProps} from "./CartBtn.d";
import { useCart } from "@store/lib/useCart";

const injectCartBtnProps = createInjector(({}:ICartBtnInputProps):ICartBtnProps => {
    const cart = useCart();
    return {count: cart.products.length};
});

const connect = inject<ICartBtnInputProps, CartBtnProps>(mergeProps(
    injectCartBtnProps,
));

export const CartBtn = connect(CartBtnComponent);
