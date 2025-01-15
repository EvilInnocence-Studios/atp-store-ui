import { faCartPlus, faDownload, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { hasPermission } from "@uac/components/HasPermission";
import { Button } from "antd";
import clsx from "clsx";
import { AddtoCartBtnProps } from "./AddtoCartBtn.d";
import styles from './AddtoCartBtn.module.scss';

const Subscribed = hasPermission("product.subscription");

const classes = clsx([styles.addToCartBtn, "addToCartBtn"]);

export const AddtoCartBtnComponent = ({product, addToCart, download, subscribe}:AddtoCartBtnProps) => <>
        {product.subscriptionOnly && <>
            <Subscribed yes>
                <Button className={classes} type="primary" size="small" onClick={download}>
                    <FontAwesomeIcon icon={faDownload} /> Download
                </Button>
            </Subscribed>
            <Subscribed no>
                <Button className={classes} type="primary" size="small" onClick={subscribe}>
                    <FontAwesomeIcon icon={faUserPlus} /> Subscribe
                </Button>
            </Subscribed>
        </>}
        {!product.subscriptionOnly && <>
            {product.price > 0 && <Button className={classes} type="primary" size="small" onClick={addToCart}>
                <FontAwesomeIcon icon={faCartPlus} /> Add to cart
            </Button>}
            {product.price <= 0 && <Button className={classes} type="primary" size="small" onClick={download}>
                <FontAwesomeIcon icon={faDownload} /> Download
            </Button>}
        </>}
    </>;
