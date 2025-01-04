import { createInjector, inject, mergeProps } from "unstateless";
import {CartComponent} from "./Cart.component";
import {ICartInputProps, CartProps, ICartProps} from "./Cart.d";

const injectCartProps = createInjector(({}:ICartInputProps):ICartProps => {
    return {};
});

const connect = inject<ICartInputProps, CartProps>(mergeProps(
    injectCartProps,
));

export const Cart = connect(CartComponent);
