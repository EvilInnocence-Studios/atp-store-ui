import { IOrder } from "@store-shared/order/types";
import { Col, Row, Spin, Table } from "antd";
import dayjs from "dayjs";
import { prop, sort } from "ts-functional";
import { OrderDetails } from "../OrderDetails";
import { UserOrderListProps } from "./UserOrderList.d";
import styles from './UserOrderList.module.scss';

export const UserOrderListComponent = ({user, orders, isLoading, selectOrder, selectedOrder}:UserOrderListProps) => {
    const columns = [{
        title: 'Order ID',
        dataIndex: 'id',
        key: 'id',
    }, {
        title: 'Subtotal',
        dataIndex: 'subtotal',
        key: 'subtotal',
        render: (subtotal:number) => `$${subtotal.toFixed(2)}`,
    },{
        title: 'Discount',
        dataIndex: 'discount',
        key: 'discount',
        render: (discount:number) => `$${discount.toFixed(2)}`,
    },{
        title: 'Coupon Code',
        dataIndex: 'couponCode',
        key: 'couponCode',
    }, {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
        render: (total:number) => `$${total.toFixed(2)}`,
    }, {
        title: 'Created',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (date:Date) => dayjs(date).format('MMMM D, YYYY'),
        defaultSortOrder: 'descend' as 'descend',
        sorter: sort.by(prop<IOrder, "createdAt">('createdAt')).asc,
    }]
    
    return <Spin spinning={isLoading}>
        <div className={styles.userOrderList}>
            <Row gutter={16}>
                <Col xs={12}>
                    <h1>Orders for {user.firstName} {user.lastName}</h1>
                    <Table<IOrder>
                        dataSource={orders}
                        columns={columns}
                        rowClassName={(record) => selectedOrder && selectedOrder.id === record.id ? styles.selected : ''}
                        onRow={(record) => ({onClick: selectOrder(record)})}
                    />
                </Col>
                <Col xs={12}>
                    {selectedOrder && <OrderDetails userId={selectedOrder.userId} orderId={selectedOrder.id} />}
                </Col>
            </Row>            
        </div>
    </Spin>;
}