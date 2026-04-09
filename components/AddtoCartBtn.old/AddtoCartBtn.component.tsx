import { overridable } from "@core/lib/overridable";
import { storePlugins } from "@store/lib/plugin/slots";
import { AddToCartBtnProps } from "./AddToCartBtn.d";

export const AddToCartBtnComponent = overridable(({className, css, product, addToCart, size}:AddToCartBtnProps) => <>
    {css && <style>{css}</style>}
    <span className={className}>
        {product && storePlugins.cart.addButton.render({product, addToCart, size})}
    </span>
</>);

