import { Editable } from "@core/components/Editable";
import { Label } from "@core/components/Label";
import { onDateChange, onNumberChange, onRadioChange } from "@core/lib/onInputChange";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Editor from "@uiw/react-md-editor";
import { Button, Card, Col, DatePicker, Radio, Row, Space, Spin, Switch, Tabs } from "antd";
import dayjs from "dayjs";
import { ProductFilesEditor } from "../ProductFilesEditor";
import { ProductMediaEditor } from "../ProductMediaEditor";
import { ProductTagEditor } from "../ProductTagEditor";
import { RelatedProductsEditor } from "../RelatedProductsEditor";
import { SubProductsEditor } from "../SubProductsEditor";
import { ProductEditorProps } from "./ProductEditor.d";
import styles from './ProductEditor.module.scss';

export const ProductEditorComponent = ({
    product, isLoading,
    updateNumber, updateString, updateToggle, UpdateButtons,
    copyUrlFromName,
}:ProductEditorProps) =>
    <Spin spinning={isLoading}>
        {!!product && <>
            <Row className={styles.productEditor} gutter={8}>
                <Col span={24}>
                    <Space>
                        <Switch checked={product.enabled} checkedChildren="Enabled" unCheckedChildren="Disabled" onChange={updateToggle("enabled")}/>
                        <DatePicker value={product.releaseDate ? dayjs(product.releaseDate) : undefined} onChange={onDateChange(updateString("releaseDate"))}/>
                    </Space>
                    <div className={styles.updateButtons}><UpdateButtons /></div>
                    <h1>
                        <Label label="Name"><Editable value={product.name} onChange={updateString("name")}/></Label>
                    </h1>
                    <hr/>
                    <Tabs tabPosition="left">
                        <Tabs.TabPane key="details" tab="Details">
                            <Space direction="vertical">
                                <Space>
                                    <Radio.Group block optionType="button" buttonStyle="solid" value={product.productType} onChange={onRadioChange(updateString("productType"))}>
                                        <Radio value="digital">Digital</Radio>
                                        <Radio value="grouped">Grouped</Radio>
                                    </Radio.Group>
                                    <Label label="Price"><Editable value={`${product.price}`} onChange={onNumberChange(updateNumber("price"))}/></Label>
                                </Space>
                                <Switch
                                        checked={product.subscriptionOnly}
                                        checkedChildren="Subscription Required"
                                        unCheckedChildren="No Subscription Required"
                                        onChange={updateToggle("subscriptionOnly")}
                                    />

                                <Label label="SKU"><Editable value={product.sku} onChange={updateString("sku")}/></Label>

                                <Label label="URL">
                                    <Editable value={product.url} onChange={updateString("url")}/>
                                </Label>
                                <div style={{textAlign: "right"}}>
                                    <Button onClick={copyUrlFromName}>
                                        <FontAwesomeIcon icon={faCopy} /> Copy url from name
                                    </Button>
                                </div>

                                <Label label="Brokered">
                                    <Editable placeholder="Brokered At" value={product.brokeredAt || ""} onChange={updateString("brokeredAt")} />
                                    <Editable placeholder="Brokered Product Id" value={product.brokerageProductId || ""} onChange={updateString("brokerageProductId")} />
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
                            </Space>
                        </Tabs.TabPane>
                        <Tabs.TabPane key="tags" tab="Tags">
                            <ProductTagEditor productId={product.id} />
                        </Tabs.TabPane>
                        <Tabs.TabPane key="media" tab="Media">
                            <ProductMediaEditor product={product} update={updateString}/>
                        </Tabs.TabPane>
                        <Tabs.TabPane key="related" tab="Related">
                            <RelatedProductsEditor productId={product.id} />
                        </Tabs.TabPane>
                        {product.productType === "digital" && <Tabs.TabPane key="files" tab="Files">
                            <ProductFilesEditor productId={product.id} />
                        </Tabs.TabPane>}
                        {product.productType === "grouped" && <Tabs.TabPane key="grouped" tab="Sub Products">
                            <SubProductsEditor productId={product.id} />
                        </Tabs.TabPane>}
                    </Tabs>
                </Col>
            </Row>
        </>}
    </Spin>;
