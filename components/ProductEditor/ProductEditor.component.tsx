import { Editable } from "@core/components/Editable";
import { Label } from "@core/components/Label";
import { onDateChange, onNumberChange } from "@core/lib/onInputChange";
import Editor from "@uiw/react-md-editor";
import { Card, Col, DatePicker, Radio, Row, Space, Spin, Switch } from "antd";
import dayjs from "dayjs";
import { ProductEditorProps } from "./ProductEditor.d";
import styles from './ProductEditor.module.scss';
import { ProductTagEditor } from "../ProductTagEditor";
import { ProductMediaEditor } from "../ProductMediaEditor";
import { RelatedProductsEditor } from "../RelatedProductsEditor";
import { ProductFilesEditor } from "../ProductFilesEditor";

export const ProductEditorComponent = ({product, isLoading, updateNumber, updateString, updateToggle}:ProductEditorProps) =>
    <Spin spinning={isLoading}>
        {!!product && <>
            <Row className={styles.productEditor} gutter={8}>
                <Col span={12} offset={6}>
                    <Space direction="vertical">
                        <Space>
                            <Switch checked={product.enabled} checkedChildren="Enabled" unCheckedChildren="Disabled" onChange={updateToggle("enabled")}/>
                            <DatePicker value={dayjs(product.releaseDate)} onChange={onDateChange(updateString("releaseDate"))}/>
                        </Space>
                        <h1>
                            <Label label="Name"><Editable value={product.name} onChange={updateString("name")}/></Label>
                        </h1>
                        <Space>
                            <Radio.Group block optionType="button" buttonStyle="solid" value={product.productType} onChange={(e) => updateString("productType")(e.target.value)}>
                                <Radio value="digital">Digital</Radio>
                                <Radio value="grouped">Grouped</Radio>
                            </Radio.Group>
                            <Switch
                                checked={product.subscriptionOnly}
                                checkedChildren="Subscription Only"
                                unCheckedChildren="Not Subscription Only"
                                onChange={updateToggle("subscriptionOnly")}
                            />
                            <Label label="Price"><Editable value={`${product.price}`} onChange={onNumberChange(updateNumber("price"))}/></Label>
                        </Space>

                        <Label label="SKU"><Editable value={product.sku} onChange={updateString("sku")}/></Label>

                        <Label label="URL">
                            <Editable value={product.url} onChange={updateString("url")}/><br/>
                        </Label>

                        <Card title="Short Description" size="small">
                            <Editor value={product.descriptionShort} onChange={updateString("descriptionShort")}/>
                        </Card>

                        <Card title="Description" size="small">
                            <Editor value={product.description} onChange={updateString("description")} />
                        </Card>

                        <Label label="Meta Title"><Editable value={product.metaTitle || ""} onChange={updateString("metaTitle")}/></Label>
                        <Label label="Meta Description"><Editable textArea value={product.metaDescription || ""} onChange={updateString("metaDescription")}/></Label>
                        <Label label="Meta Keywords"><Editable value={product.metaKeywords || ""} onChange={updateString("metaKeywords")}/></Label>

                        <ProductTagEditor productId={product.id} />
                        <ProductMediaEditor product={product} />
                        <RelatedProductsEditor productId={product.id} />
                        <ProductFilesEditor productId={product.id} />
                    </Space>
                </Col>
            </Row>
        </>}
    </Spin>;
