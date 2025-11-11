import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "antd";
import { AddtoCartBtnProps } from "./AddtoCartBtn.d";

// Default add to cart button if no plugins are registered or rendered
export const AddtoCartButtonBasic = ({ addToCart, size }:AddtoCartBtnProps) => 
    <Button type="primary" size={size} onClick={addToCart}>
        <FontAwesomeIcon icon={faCartPlus} /> Add to cart
    </Button>;
