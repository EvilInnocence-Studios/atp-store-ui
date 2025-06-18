import { faArrowRight, faArrowUpRightFromSquare, faCartPlus, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { hasPermission } from "@uac/components/HasPermission";
import { Button, Modal } from "antd";
import clsx from "clsx";
import { Link } from "react-router";
import { SignUpForm } from "@subscription/components/SignUpForm";
import { AddtoCartBtnProps } from "./AddtoCartBtn.d";
import styles from './AddtoCartBtn.module.scss';

const Subscribed = hasPermission("product.subscription");

const classes = clsx([styles.addToCartBtn, "addToCartBtn"]);

export const AddtoCartBtnComponent = ({product, addToCart, bspModal, brokeredLink}:AddtoCartBtnProps) => <>
        {product.subscriptionOnly && <>
            <Subscribed yes>
                <Button className={classes} type="primary" size="small" onClick={addToCart}>
                    <FontAwesomeIcon icon={faCartPlus} /> Add to cart
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
            <SignUpForm />
        </Modal>
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
