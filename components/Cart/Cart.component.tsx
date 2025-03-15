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

export const CartComponent = ({userId, createOrder, onApprove, completeFreeOrder, isLoading, loginModal, ...cart}:CartProps) => {
    const columns = [{
        key: 'thumbnailImageId',
        render: (product:IProduct ) => <div className={styles.thumbnail}>
            <Image productId={product.id} imageId={product.thumbnailId} />
        </div>,
        width: 64,
    },{
        title: 'Product',
        key: 'product',
        render: (_:any, product:IProduct) => <>
            <span className={styles.productName}>{product.name}</span>
            <span className={styles.priceContainer}>
                <ProductPrice product={product} />
            </span>
        </>,
    }, {
        dataIndex: 'actions',
        key: 'actions',
        render: (_:any , product:IProduct) => <>
            <DeleteBtn entityType="product" onClick={() => cart.remove(product)}/>
        </>,
        width: 16,
    }];

    return <div className={styles.cart}>
        <Spin spinning={isLoading}>
            <h1><FontAwesomeIcon icon={faCartShopping} /> Your Cart</h1>
            <div className={styles.cartActions}>
                <Button type="link" danger onClick={cart.clear}>
                    <FontAwesomeIcon icon={faTrashAlt} /> Clear Cart
                </Button>
            </div>
            <div className={styles.cartItems}>
                <Table<IProduct>
                    dataSource={cart.products}
                    columns={columns}
                    pagination={false}
                    locale={{
                        emptyText: <><FontAwesomeIcon icon={faShoppingCart} /> Your cart is empty.</>,
                    }}
                    rowKey="id"
                    footer={() => <div className={styles.cartFooter}>
                        {cart.totals.subtotal !== cart.totals.total && <div className={styles.cartSubTotal}>
                            Subtotal: ${cart.totals.subtotal.toFixed(2)}
                        </div>}
                        {!!cart.totals.discount && <div className={styles.cartDiscount}>
                            Discount: ${cart.totals.discount.toFixed(2)}
                        </div>}
                        <div className={styles.cartTotal}>
                            Total: ${cart.totals.total.toFixed(2)}
                        </div>
                    </div>}
                />
            </div>
            {!!parseInt(userId) && <div className={styles.cartActions}>
                {cart.totals.total > 0 &&
                    <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
                }
                {cart.totals.total === 0 && cart.products.length > 0 &&
                    <Button type="primary" onClick={completeFreeOrder}>
                        <FontAwesomeIcon icon={faShoppingCart} /> Complete Order
                    </Button>
                }
            </div>}
            {!parseInt(userId) && <div className={styles.cartActions}>
                <Button type="primary" onClick={loginModal.open}>
                    <FontAwesomeIcon icon={faSignIn} /> Login to Checkout
                </Button>
            </div>}
        </Spin>
    </div>;
}
