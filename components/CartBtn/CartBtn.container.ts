import { overridable } from "@core/lib/overridable";
import { useCart } from "@store/lib/useCart";
import { createInjector, inject, mergeProps } from "unstateless";
import { CartBtnComponent } from "./CartBtn.component";
import { CartBtnProps, ICartBtnInputProps, ICartBtnProps } from "./CartBtn.d";

const injectCartBtnProps = createInjector(({}:ICartBtnInputProps):ICartBtnProps => {
    const cart = useCart();
    return {count: cart.products.length};
});

const connect = inject<ICartBtnInputProps, CartBtnProps>(mergeProps(
    injectCartBtnProps,
));export const connectCartBtn = connect;

export const CartBtn = overridable<ICartBtnInputProps>(connect(CartBtnComponent));
