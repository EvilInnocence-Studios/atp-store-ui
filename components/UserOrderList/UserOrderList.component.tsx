import { IOrder } from "@store-shared/order/types";
import { Col, Row, Spin, Table } from "antd";
import dayjs from "dayjs";
import { prop, sort } from "ts-functional";
import { OrderDetails } from "../OrderDetails";
import { UserOrderListProps } from "./UserOrderList.d";
import styles from './UserOrderList.module.scss';
import { CreateOrderForm } from "../CreateOrderForm";
import { overridable } from "@core/lib/overridable";

export const UserOrderListComponent = overridable(({ user, orders, isLoading, selectOrder, selectedOrder, refresh, classes = styles }: UserOrderListProps) => {
    const columns = [{
        title: 'Order ID',
        dataIndex: 'id',
        key: 'id',
    }, {
        title: 'Subtotal',
        dataIndex: 'subtotal',
        key: 'subtotal',
        render: (subtotal: number) => `$${subtotal.toFixed(2)}`,
    }, {
        title: 'Discount',
        dataIndex: 'discount',
        key: 'discount',
        render: (discount: number, order: IOrder) => <>
            ${discount.toFixed(2)}
            {discount > 0 && !!order.couponCode && <>
                <br /> {order.couponCode}
            </>}
        </>,
    }, {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
        render: (total: number) => `$${total.toFixed(2)}`,
    }, {
        title: 'Created',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (date: Date) => dayjs(date).format('MMMM D, YYYY'),
        defaultSortOrder: 'descend' as 'descend',
        sorter: sort.by(prop<IOrder, "createdAt">('createdAt')).asc,
    }]

    return <Spin spinning={isLoading}>
        <div className={classes.userOrderList}>
            <Row gutter={16}>
                <Col xs={24} xl={12}>
                    <CreateOrderForm userId={user.id} onCreateOrder={refresh} />
                    <h1>Orders for {user.userName}</h1>
                    <Table<IOrder>
                        dataSource={orders}
                        columns={columns}
                        rowClassName={(record) => selectedOrder && selectedOrder.id === record.id ? classes.selected : ''}
                        onRow={(record) => ({ onClick: selectOrder(record) })}
                    />
                </Col>
                <Col xs={24} xl={12}>
                    {selectedOrder && <OrderDetails userId={selectedOrder.userId} orderId={selectedOrder.id} />}
                </Col>
            </Row>
        </div>
    </Spin>;
});