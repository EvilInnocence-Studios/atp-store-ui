import { DeleteBtn } from "@core/components/DeleteBtn";
import { Editable } from "@core/components/Editable";
import { faMoneyBill, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IDiscount } from "@store-shared/discount/types";
import { hasPermission } from "@uac/components/HasPermission";
import { Button, Col, Row, Select, Spin, Table } from "antd";
import { DiscountEditorProps } from "./DiscountEditor.d";
import styles from './DiscountEditor.module.scss';

const CanUpdate = hasPermission("discount.update");
const CanDelete = hasPermission("discount.delete");

export const DiscountEditorComponent = ({discounts, permissions, isLoading, update, remove, create}:DiscountEditorProps) => {
    const columns = [
        {
            title: 'Name',
            key: 'name',
            render: (_:any, discount:IDiscount) => <>
                <CanUpdate yes>
                    <Editable value={discount.name} onChange={update(discount.id, "name")} />
                </CanUpdate>
                <CanUpdate no>
                    {discount.name}
                </CanUpdate>
            </>,
        },
        {
            title: "Type",
            key: "type",
            render: (_:any, discount:IDiscount) => <>
                <CanUpdate yes>
                    <Select value={discount.type} onChange={update(discount.id, "type")} style={{width: 100}}>
                        <Select.Option value="product">Product</Select.Option>
                        <Select.Option value="cart">Cart</Select.Option>
                    </Select>
                </CanUpdate>
                <CanUpdate no>
                    {discount.type}
                </CanUpdate>
            </>,
        },
        {
            title: 'Amount',
            key: 'amount',
            render: (_:any, discount:IDiscount) => <>
                <CanUpdate yes>
                    <Editable value={`${discount.amount}`} onChange={update(discount.id, "amount")} />
                </CanUpdate>
                <CanUpdate no>
                    {discount.amount}
                </CanUpdate>
            </>,
        },
        {
            title: "Permission",
            key: "permission",
            render: (_:any, discount:IDiscount) => <>
                <CanUpdate yes>
                    <Select
                        value={discount.permissionId}
                        onChange={update(discount.id, "permissionId")}
                        style={{width: 200}}
                        allowClear
                    >
                        {permissions.map(p => <Select.Option key={p.id} value={p.id}>{p.name}</Select.Option>)}
                    </Select>
                </CanUpdate>
                <CanUpdate no>
                    {permissions.find(p => p.id === discount.permissionId)?.name}
                </CanUpdate>
            </>,
        },
        {
            title: 'Actions',
            dataIndex: 'id',
            key: 'actions',
            render: (id:string) => <>
                <CanDelete yes>
                    <DeleteBtn entityType="discount" onClick={remove(id)} />
                </CanDelete>
            </>,
        },
    ]
    
    return <Spin spinning={isLoading}>
        <div className={styles.discounts}>
            <h1><FontAwesomeIcon icon={faMoneyBill} /> Discounts</h1>
            <Row gutter={16}>
                <Col xs={6}>
                    <Button onClick={create} type="primary"><FontAwesomeIcon icon={faPlus} /> Create Discount</Button>
                </Col>
                <Col xs={12}>
                    <Table<IDiscount>
                        dataSource={discounts} rowKey="id"
                        columns={columns}
                        pagination={false}
                    />
                </Col>
            </Row>
        </div>
    </Spin>;
}