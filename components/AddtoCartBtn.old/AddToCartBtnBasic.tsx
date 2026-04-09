import { overridable } from "@core/lib/overridable";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IAddToCartPluginProps } from "@store/lib/plugin/slots";
import { Button } from "antd";

// Default add to cart button if no plugins are registered or rendered
export const AddToCartButtonBasic = overridable(({ addToCart, size }:IAddToCartPluginProps) => 
    <Button type="primary" size={size} onClick={addToCart}>
        <FontAwesomeIcon icon={faCartPlus} /> Add to cart
    </Button>
);
