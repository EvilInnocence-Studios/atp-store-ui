import { DeleteBtn } from "@core/components/DeleteBtn";
import { faCartShopping, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { IProduct } from "@store-shared/product/types";
import { Button, Table } from "antd";
import { Image } from "../Image";
import { CartProps } from "./Cart.d";
import styles from './Cart.module.scss';

export const CartComponent = ({userId, createOrder, onApprove, ...cart}:CartProps) => {
    const columns = [{
        key: 'thumbnailImageId',
        render: (product:IProduct ) => <div className={styles.thumbnail}><Image productId={product.id} imageId={product.thumbnailId} /></div>,
        width: 64,
    },{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        render: (price:number) => `$${price.toFixed(2)}`,
    }, {
        dataIndex: 'actions',
        key: 'actions',
        render: (_:any , product:IProduct) => <>
            <DeleteBtn entityType="product" onClick={() => cart.remove(product)}/>
        </>,
        width: 16,
    }];

    return <div className={styles.cart}>
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
                rowKey="id"
                footer={() => <div className={styles.cartFooter}>
                    <div className={styles.cartSubTotal}>Subtotal: ${cart.subTotal().toFixed(2)}</div>
                    <div className={styles.cartTotal}>Total: ${cart.total().toFixed(2)}</div>
                </div>}
            />
        </div>
        <div className={styles.cartActions}>
            <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
        </div>
    </div>;
}
