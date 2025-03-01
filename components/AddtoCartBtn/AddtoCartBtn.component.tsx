import { faArrowRight, faArrowUpRightFromSquare, faCartPlus, faDownload, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { hasPermission } from "@uac/components/HasPermission";
import { Button, Modal } from "antd";
import clsx from "clsx";
import { AddtoCartBtnProps } from "./AddtoCartBtn.d";
import styles from './AddtoCartBtn.module.scss';
import { BSPSignupForm } from "../BSPSignupForm";
import { Link } from "react-router";

const Subscribed = hasPermission("product.subscription");

const classes = clsx([styles.addToCartBtn, "addToCartBtn"]);

export const AddtoCartBtnComponent = ({product, addToCart, download, bspModal, brokeredLink}:AddtoCartBtnProps) => <>
        {product.subscriptionOnly && <>
            <Subscribed yes>
                <Button className={classes} type="primary" size="small" onClick={download}>
                    <FontAwesomeIcon icon={faDownload} /> Download
                </Button>
            </Subscribed>
            <Subscribed no>
                <Button className={classes} type="primary" size="small" onClick={bspModal.on}>
                    <FontAwesomeIcon icon={faUserPlus} /> Subscribe
                </Button>
            </Subscribed>
        </>}
        <Modal
            wrapClassName={styles.bspModal}
            title="Subscribe to Backstage Pass"
            open={bspModal.isset}
            onCancel={bspModal.off}
            footer={<Link to="/backstage-pass">Learn more <FontAwesomeIcon icon={faArrowRight} /></Link>}
        >
            <BSPSignupForm />
        </Modal>
        {!product.subscriptionOnly && <>
            {!product.brokeredAt && <>
                {product.price > 0 && <Button className={classes} type="primary" size="small" onClick={addToCart}>
                    <FontAwesomeIcon icon={faCartPlus} /> Add to cart
                </Button>}
                {product.price <= 0 && <Button className={classes} type="primary" size="small" onClick={download}>
                    <FontAwesomeIcon icon={faDownload} /> Download
                </Button>}
            </>}
            {product.brokeredAt && <Button className={classes} type="primary" size="small" onClick={() => window.open(brokeredLink)}>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> Brokered At {product.brokeredAt}
            </Button>}
        </>}
    </>;
