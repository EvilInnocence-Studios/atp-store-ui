import { Button } from "antd";
import {AddtoCartBtnProps} from "./AddtoCartBtn.d";
import styles from './AddtoCartBtn.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faDoorOpen, faDownload } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import { hasPermission } from "@uac/components/HasPermission";

const Subscribed = hasPermission("product.subscription");

const classes = clsx([styles.addToCartBtn, "addToCartBtn"]);

export const AddtoCartBtnComponent = ({product, addToCart, download, subscribe}:AddtoCartBtnProps) => <>
        {product.subscriptionOnly && <>
            <Subscribed yes>
                <Button className={classes} type="primary" size="small" onClick={download}>
                    <FontAwesomeIcon icon={faDownload} />
                </Button>
            </Subscribed>
            <Subscribed no>
                <Button className={classes} type="primary" size="small" onClick={subscribe}>
                    <FontAwesomeIcon icon={faDoorOpen} /> Subscribe
                </Button>
            </Subscribed>
        </>}
        {!product.subscriptionOnly && <>
            {product.price > 0 && <Button className={classes} type="primary" size="small" onClick={addToCart}>
                <FontAwesomeIcon icon={faCartPlus} />
            </Button>}
            {product.price <= 0 && <Button className={classes} type="primary" size="small" onClick={download}>
                <FontAwesomeIcon icon={faDownload} />
            </Button>}
        </>}
    </>;
