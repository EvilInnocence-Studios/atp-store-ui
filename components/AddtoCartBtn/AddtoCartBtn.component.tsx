import { storePlugins } from "@store/lib/plugin/slots";
import { AddtoCartBtnProps } from "./AddtoCartBtn.d";

export const AddtoCartBtnComponent = ({product, addToCart, size}:AddtoCartBtnProps) => <>
        {storePlugins.cart.addButton.render({product, addToCart, size})}
    </>;
