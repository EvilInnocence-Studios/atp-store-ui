import { storePlugins } from "@store/lib/plugin/slots";
import { AddtoCartBtnProps } from "./AddtoCartBtn.d";
import { overridable } from "@core/lib/overridable";

export const AddtoCartBtnComponent = overridable(({product, addToCart, size}:AddtoCartBtnProps) => <>
        {storePlugins.cart.addButton.render({product, addToCart, size})}
    </>
);
