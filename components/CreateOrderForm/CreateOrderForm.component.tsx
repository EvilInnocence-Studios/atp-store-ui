import { Button, Modal } from "antd";
import {CreateOrderFormProps} from "./CreateOrderForm.d";
import styles from './CreateOrderForm.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faClose } from "@fortawesome/free-solid-svg-icons";
import { ProductSearch } from "../ProductSearch";
import { MiniProduct } from "../MiniProduct";

export const CreateOrderFormComponent = ({modal, isLoading, products, createOrder}:CreateOrderFormProps) => <>
    <Button
        className={styles.createOrderButton}
        type="primary"
        size="small"
        onClick={modal.open}
    >
        <FontAwesomeIcon icon={faCartPlus} /> Create new order
    </Button>
    <Modal
        title="Create new order"
        open={modal.visible}
        onCancel={modal.close}
        destroyOnClose
        width={800}
        footer={<>
            <Button
                type="primary"
                onClick={createOrder}
                loading={isLoading}
            >
                <FontAwesomeIcon icon={faCartPlus} /> Create Order
            </Button>
            <Button
                onClick={modal.close}
                disabled={isLoading}
            >
                <FontAwesomeIcon icon={faClose} /> Cancel
            </Button>
        </>}
        className={styles.createOrderModal}
        >
        <div className={styles.createOrderForm}>
            <ProductSearch onSelect={products.add} />
            <h3>Selected Products <Button danger size="small" onClick={products.clear}>Clear</Button></h3>
            {products.items.map((product) => <MiniProduct productId={product} key={product} onRemove={products.remove} />)}
        </div>
    </Modal>
</>;
