import { DeleteBtn } from "@core/components/DeleteBtn";
import { faCartShopping, faShoppingCart, faSignIn, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { IProduct } from "@store-shared/product/types";
import { Button, Spin, Table } from "antd";
import { Image } from "../Image";
import { ProductPrice } from "../ProductPrice";
import { CartProps } from "./Cart.d";
import styles from './Cart.module.scss';
import { overridable } from "@core/lib/overridable";

export const CartComponent = overridable(({ userId, createOrder, onApprove, onCancel, onError, completeFreeOrder, isLoading, loginModal, classes = styles, ...cart }: CartProps) => {
    const columns = [{
        key: 'thumbnailImageId',
        render: (product: IProduct) => <div className={classes.thumbnail}>
            <Image productId={product.id} imageId={product.thumbnailId} />
        </div>,
        width: 64,
    }, {
        title: 'Product',
        key: 'product',
        render: (_: any, product: IProduct) => <>
            <span className={classes.productName}>{product.name}</span>
            <span className={classes.priceContainer}>
                <ProductPrice product={product} />
            </span>
        </>,
    }, {
        dataIndex: 'actions',
        key: 'actions',
        render: (_: any, product: IProduct) => <>
            <DeleteBtn entityType="product" onClick={() => cart.remove(product)} />
        </>,
        width: 16,
    }];

    const handleCreateOrder = async (data: any, actions: any) => {
        try {
            const orderId = await createOrder(data, actions);
            if (!orderId) {
                throw new Error("Order ID is undefined or null.");
            }
            return orderId;
        } catch (error) {
            console.error("Error in createOrder:", error);
            onError(error);
            throw error; // Re-throw the error to handle it in the PayPal flow
        }
    };

    return <div className={classes.cart}>
        <Spin spinning={isLoading}>
            <h1><FontAwesomeIcon icon={faCartShopping} /> Your Cart</h1>
            <div className={classes.cartActions}>
                <Button type="link" danger onClick={cart.clear}>
                    <FontAwesomeIcon icon={faTrashAlt} /> Clear Cart
                </Button>
            </div>
            <div className={classes.cartItems}>
                <Table<IProduct>
                    dataSource={cart.products}
                    columns={columns}
                    pagination={false}
                    locale={{
                        emptyText: <><FontAwesomeIcon icon={faShoppingCart} /> Your cart is empty.</>,
                    }}
                    rowKey="id"
                    footer={() => <div className={classes.cartFooter}>
                        {cart.totals.subtotal !== cart.totals.total && <div className={classes.cartSubTotal}>
                            Subtotal: ${cart.totals.subtotal.toFixed(2)}
                        </div>}
                        {!!cart.totals.discount && <div className={classes.cartDiscount}>
                            Discount: ${cart.totals.discount.toFixed(2)}
                        </div>}
                        <div className={classes.cartTotal}>
                            Total: ${cart.totals.total.toFixed(2)}
                        </div>
                    </div>}
                />
            </div>
            {!!parseInt(userId) && <div className={classes.cartActions}>
                {cart.totals.total > 0 &&
                    <PayPalButtons
                        createOrder={handleCreateOrder}
                        onApprove={onApprove}
                        onCancel={onCancel}
                        onError={(error) => {
                            console.error("PayPal onError:", error);
                            onError(error);
                        }}
                    />
                }
                {cart.totals.total === 0 && cart.products.length > 0 &&
                    <Button type="primary" onClick={completeFreeOrder}>
                        <FontAwesomeIcon icon={faShoppingCart} /> Complete Order
                    </Button>
                }
            </div>}
            {!parseInt(userId) && <div className={classes.cartActions}>
                <Button type="primary" onClick={loginModal.open}>
                    <FontAwesomeIcon icon={faSignIn} /> Login to Checkout
                </Button>
            </div>}
        </Spin>
    </div>;
});
