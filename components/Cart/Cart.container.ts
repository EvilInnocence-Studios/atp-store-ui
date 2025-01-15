import { createInjector, inject, mergeProps } from "unstateless";
import {CartComponent} from "./Cart.component";
import {ICartInputProps, CartProps, ICartProps} from "./Cart.d";
import { useCart } from "@store/lib/useCart";

const injectCartProps = createInjector(({}:ICartInputProps):ICartProps => {
    const cart = useCart();

    return {...cart};
});

const connect = inject<ICartInputProps, CartProps>(mergeProps(
    injectCartProps,
));

export const Cart = connect(CartComponent);
