import { Col, Row, Spin, Table } from "antd";
import {OrderDetailsProps} from "./OrderDetails.d";
import styles from './OrderDetails.module.scss';
import { ProductFileDownloadBtn } from "../ProductFileDownloadBtn";
import { IProduct } from "@store-shared/product/types";
import { Image } from "../Image";
import dayjs from "dayjs";
import { overridable } from "@core/lib/overridable";

export const OrderDetailsComponent = overridable(({order, isLoading}:OrderDetailsProps) => {
    const columns = [{
        title: '',
        key: 'thumbnail',
        render: (item:IProduct) => <Image productId={item.id} imageId={item.thumbnailId} />,
        width: 64,
    },{
        title: 'Name',
        key: 'name',
        render: (item:IProduct) => <>
            {item.name}&nbsp;
            {order?.files.filter(file => file.productId === item.id).map(file => <ProductFileDownloadBtn small file={file} />)}
        </>
    },{
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        render: (price:number) => `$${price.toFixed(2)}`,
    }]
    return <Spin spinning={isLoading}>
        {order && <div className={styles.orderDetails}>
            <h1>Order Details (#{order.id})</h1>
            <h2>Date: {dayjs(order.createdAt).format("MMMM DD, YYYY")}</h2>
            <Table<IProduct> dataSource={order.items} columns={columns} pagination={false} />
            <Row className={styles.totals}>
                <Col xs={8}>SubTotal: ${order.subtotal.toFixed(2)}</Col>
                <Col xs={8}>Discount: ${order.discount.toFixed(2)}</Col>
                <Col xs={8}>Total: ${order.total.toFixed(2)}</Col>
            </Row>

            <h2>All Order Files</h2>
            <div className={styles.orderFiles}>
                {order.files.map(file => <ProductFileDownloadBtn key={file.id} file={file} />)}
            </div>
        </div>}
    </Spin>;
});