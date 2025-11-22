import { Button, Spin, Table, Tabs } from "antd";
import { SalesReportProps } from "./SalesReport.d";
import styles from './SalesReport.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { overridable } from "@core/lib/overridable";

export const SalesReportComponent = overridable(({ data, salesByDate, salesByWeek, salesByMonth, isLoading, refresh, classes = styles }: SalesReportProps) =>
    <Spin spinning={isLoading} tip="Loading sales report...">
        <div className={classes.salesReport}>
            <h1>Sales Report</h1>
            <Button onClick={refresh} disabled={isLoading}><FontAwesomeIcon icon={faRefresh} /> Refresh</Button>
            {!isLoading && data.length === 0 && <p>No sales data available.</p>}
            {!isLoading && data.length > 0 &&
                <Tabs defaultActiveKey="date" className={classes.tabs}>
                    <Tabs.TabPane tab="All Orders" key="allOrders">
                        <Table dataSource={data} rowKey="id">
                            <Table.Column title="Order ID" dataIndex="id" key="id" />
                            <Table.Column title="Customer" dataIndex="userId" key="customerId" />
                            <Table.Column title="Total Amount" dataIndex="total" key="total" render={(amount) => `$${amount.toFixed(2)}`} />
                            <Table.Column title="Date" dataIndex="createdAt" key="createdAt" render={(date) => new Date(date).toLocaleDateString()} />
                            <Table.Column title="Status" dataIndex="status" key="status" />
                        </Table>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="By Date" key="date">
                        <Table dataSource={Object.entries(salesByDate).map(([date, orders]) => ({
                            date,
                            total: orders.reduce((sum, order) => sum + order.total, 0),
                            count: orders.length
                        }))} rowKey="date">
                            <Table.Column title="Date" dataIndex="date" key="date" />
                            <Table.Column title="Total Sales" dataIndex="total" key="total" render={(amount) => `$${amount.toFixed(2)}`} />
                            <Table.Column title="Order Count" dataIndex="count" key="count" />
                        </Table>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="By Week" key="week">
                        <Table dataSource={Object.entries(salesByWeek).map(([week, orders]) => ({
                            week,
                            total: orders.reduce((sum, order) => sum + order.total, 0),
                            count: orders.length
                        }))} rowKey="week">
                            <Table.Column title="Week" dataIndex="week" key="week" />
                            <Table.Column title="Total Sales" dataIndex="total" key="total" render={(amount) => `$${amount.toFixed(2)}`} />
                            <Table.Column title="Order Count" dataIndex="count" key="count" />
                        </Table>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="By Month" key="month">
                        <Table dataSource={Object.entries(salesByMonth).map(([month, orders]) => ({
                            month,
                            total: orders.reduce((sum, order) => sum + order.total, 0),
                            count: orders.length
                        }))} rowKey="month">
                            <Table.Column title="Month" dataIndex="month" key="month" />
                            <Table.Column title="Total Sales" dataIndex="total" key="total" render={(amount) => `$${amount.toFixed(2)}`} />
                            <Table.Column title="Order Count" dataIndex="count" key="count" />
                        </Table>
                    </Tabs.TabPane>
                </Tabs>
            }
        </div>
    </Spin>
);
