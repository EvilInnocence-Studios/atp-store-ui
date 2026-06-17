import { overridable } from "@core/lib/overridable";
import { IOrder } from "@store-shared/order/types";
import { Spin, Table } from "antd";
import dayjs from "dayjs";
import { prop, sort } from "ts-functional";
import { CreateOrderForm } from "../CreateOrderForm";
import { OrderDetails } from "../OrderDetails";
import { UserOrderListProps } from "./UserOrderList.d";
import styles from './UserOrderList.module.scss';

export const UserOrderListComponent = overridable(({ user, orders, isLoading, refresh, classes = styles }: UserOrderListProps) => {
    const columns = [{
        title: 'Created',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (date: Date) => <div className={classes.columnData}>
            <span>{dayjs(date).format('MMMM D, YYYY')}</span>
            <span>{dayjs(date).format('h:mm a')}</span>
        </div>,
        defaultSortOrder: 'descend' as 'descend',
        sorter: sort.by(prop<IOrder, "createdAt">('createdAt')).asc,
    }, {
        title: "Details",
        dataIndex: 'id',
        key: 'id',
        render: (_id: number, order: IOrder) => <div className={classes.columnData}>
            <span><b>Subtotal:</b> {order.subtotal.toFixed(2)}</span>
            <span><b>Discount:</b> {order.discount.toFixed(2)}</span>
            <span><b>Total:</b> {order.total.toFixed(2)}</span>
        </div>,
    }]

    return <Spin spinning={isLoading}>
        <div className={classes.userOrderList}>
            <CreateOrderForm userId={user.id} onCreateOrder={refresh} />
            <h1>Orders for {user.userName}</h1>
            <Table<IOrder>
                style={{ width: '100%' }}
                dataSource={orders}
                columns={columns}
                rowKey="id"
                expandable={{
                    expandedRowRender: (order) => <OrderDetails userId={order.userId} orderId={order.id} />,
                    rowExpandable: () => true,
                }}
            />
        </div>
    </Spin>;
});