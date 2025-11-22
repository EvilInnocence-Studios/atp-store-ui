import { faCartPlus, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { hasPermission } from "@uac/components/HasPermission";
import { Button, Modal } from "antd";
import { MiniProduct } from "../MiniProduct";
import { ProductSearch } from "../ProductSearch";
import { CreateOrderFormProps } from "./CreateOrderForm.d";
import styles from './CreateOrderForm.module.scss';
import { overridable } from "@core/lib/overridable";

const CanCreate = hasPermission("order.create");

export const CreateOrderFormComponent = overridable(({ modal, isLoading, products, createOrder, classes = styles }: CreateOrderFormProps) => <CanCreate yes>
    <Button
        className={classes.createOrderButton}
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
        className={classes.createOrderModal}
    >
        <div className={classes.createOrderForm}>
            <ProductSearch onSelect={products.add} />
            <h3>Selected Products <Button danger size="small" onClick={products.clear}>Clear</Button></h3>
            {products.items.map((product) => <MiniProduct productId={product} key={product} onRemove={products.remove} />)}
        </div>
    </Modal>
</CanCreate>);
