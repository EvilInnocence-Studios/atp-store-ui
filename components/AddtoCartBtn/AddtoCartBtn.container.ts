import { useNavigate } from "react-router";
import { createInjector, inject, mergeProps } from "unstateless";
import { AddtoCartBtnComponent } from "./AddtoCartBtn.component";
import { AddtoCartBtnProps, IAddtoCartBtnInputProps, IAddtoCartBtnProps } from "./AddtoCartBtn.d";
import { useCart } from "@store/lib/useCart";
import { flash } from "@core/lib/flash";

const injectAddtoCartBtnProps = createInjector(({product}:IAddtoCartBtnInputProps):IAddtoCartBtnProps => {
    const navigate = useNavigate();
    const cart = useCart();

    return {
        addToCart: () => {
            cart.add(product);
            flash.success("Product added to cart")();
        },
        download: () => {
            // Manually create an order, submit it, and then navigate to the user downloads page
        },
        subscribe: () => {navigate("/backstage-pass")},
    };
});

const connect = inject<IAddtoCartBtnInputProps, AddtoCartBtnProps>(mergeProps(
    injectAddtoCartBtnProps,
));

export const AddtoCartBtn = connect(AddtoCartBtnComponent);
