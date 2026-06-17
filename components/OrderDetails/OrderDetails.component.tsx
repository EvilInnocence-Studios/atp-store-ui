import { overridable } from "@core/lib/overridable";
import { IProduct } from "@store-shared/product/types";
import { Spin, Table } from "antd";
import { Image } from "../Image";
import { ProductFileDownloadBtn } from "../ProductFileDownloadBtn";
import { OrderDetailsProps } from "./OrderDetails.d";
import styles from './OrderDetails.module.scss';

export const OrderDetailsComponent = overridable(({ order, isLoading, classes = styles }: OrderDetailsProps) => {
    const columns = [{
        title: '',
        key: 'thumbnail',
        render: (item: IProduct) => <Image productId={item.id} imageId={item.thumbnailId} />,
        width: 64,
    }, {
        title: 'Name',
        key: 'name',
        render: (item: IProduct) => <>
            {item.name}&nbsp;
            {order?.files.filter(file => file.productId === item.id).map(file => <ProductFileDownloadBtn small file={file} />)}
        </>
    }, {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        render: (price: number) => `$${price.toFixed(2)}`,
    }]
    return <Spin spinning={isLoading}>
        {order && <div className={classes.orderDetails}>
            <Table<IProduct> dataSource={order.items} columns={columns} pagination={false} />

            <h2>All Order Files</h2>
            <div className={classes.orderFiles}>
                {order.files.map(file => <ProductFileDownloadBtn key={file.id} file={file} />)}
            </div>
        </div>}
    </Spin>;
});