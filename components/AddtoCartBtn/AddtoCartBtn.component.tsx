import { faArrowUpRightFromSquare, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SubscribeButton } from "@subscription/components/SubscribeButton";
import { hasPermission } from "@uac/components/HasPermission";
import { Button } from "antd";
import clsx from "clsx";
import { AddtoCartBtnProps } from "./AddtoCartBtn.d";
import styles from './AddtoCartBtn.module.scss';

const Subscribed = hasPermission("product.subscription");

const classes = clsx([styles.addToCartBtn, "addToCartBtn"]);

export const AddtoCartBtnComponent = ({product, addToCart, brokeredLink}:AddtoCartBtnProps) => <>
        {product.subscriptionOnly && <>
            <Subscribed yes>
                <Button className={classes} type="primary" size="small" onClick={addToCart}>
                    <FontAwesomeIcon icon={faCartPlus} /> Add to cart
                </Button>
            </Subscribed>
            <Subscribed no>
                <SubscribeButton className={classes} />
            </Subscribed>
        </>}
        {!product.subscriptionOnly && <>
            {!product.brokeredAt && <>
                <Button className={classes} type="primary" size="small" onClick={addToCart}>
                    <FontAwesomeIcon icon={faCartPlus} /> Add to cart
                </Button>
            </>}
            {product.brokeredAt && <Button className={classes} type="primary" size="small" onClick={() => window.open(brokeredLink)}>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                {product.price > 0 ? "Brokered" : "Download"} At {product.brokeredAt}
            </Button>}
        </>}
    </>;
