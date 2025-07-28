import { flash } from "@core/lib/flash";
import { useCart } from "@store/lib/useCart";
import { createInjector, inject, mergeProps } from "unstateless";
import { AddtoCartBtnComponent } from "./AddtoCartBtn.component";
import { AddtoCartBtnProps, IAddtoCartBtnInputProps, IAddtoCartBtnProps } from "./AddtoCartBtn.d";

const injectAddtoCartBtnProps = createInjector(({product}:IAddtoCartBtnInputProps):IAddtoCartBtnProps => {
    const cart = useCart();

    return {
        addToCart: () => {
            cart.add(product);
            flash.success("Product added to cart")();
        },
    };
});

const connect = inject<IAddtoCartBtnInputProps, AddtoCartBtnProps>(mergeProps(
    injectAddtoCartBtnProps,
));

export const AddtoCartBtn = connect(AddtoCartBtnComponent);
