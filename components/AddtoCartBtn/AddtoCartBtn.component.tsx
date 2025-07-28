import { plugins } from "@store/lib/plugin/slots";
import { AddtoCartBtnProps } from "./AddtoCartBtn.d";

export const AddtoCartBtnComponent = ({product, addToCart}:AddtoCartBtnProps) => <>
        {plugins.cart.addButton.render({product, addToCart})}
    </>;
