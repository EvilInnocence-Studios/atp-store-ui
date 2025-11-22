import { Editable } from "@core/components/Editable";
import { Label } from "@core/components/Label";
import { onDateChange } from "@core/lib/onInputChange";
import { storePlugins } from "@store/lib/plugin/slots";
import { Col, DatePicker, Row, Space, Spin, Switch, Tabs } from "antd";
import dayjs from "dayjs";
import { ProductFilesEditor } from "../ProductFilesEditor";
import { ProductMediaEditor } from "../ProductMediaEditor";
import { ProductTagEditor } from "../ProductTagEditor";
import { RelatedProductsEditor } from "../RelatedProductsEditor";
import { SubProductsEditor } from "../SubProductsEditor";
import { ProductEditorProps } from "./ProductEditor.d";
import styles from './ProductEditor.module.scss';
import { overridable } from "@core/lib/overridable";

export const ProductEditorComponent = overridable(({
    product,
    copyUrlFromName,
    classes = styles,
    ...props
}: ProductEditorProps) =>
    <Spin spinning={props.isLoading}>
        {!!product && <>
            <Row className={classes.productEditor} gutter={8}>
                <Col span={24}>
                    <Space>
                        <Switch checked={product.enabled} checkedChildren="Enabled" unCheckedChildren="Disabled" onChange={props.updateToggle("enabled")} />
                        <DatePicker value={product.releaseDate ? dayjs(product.releaseDate) : undefined} onChange={onDateChange(props.updateString("releaseDate"))} />
                        <Switch checked={product.pinned} checkedChildren="Pinned" unCheckedChildren="Not Pinned" onChange={props.updateToggle("pinned")} />
                    </Space>
                    <div className={classes.updateButtons}><props.UpdateButtons /></div>
                    <h1>
                        <Label label="Name"><Editable value={product.name} onChange={props.updateString("name")} /></Label>
                    </h1>
                    <hr />
                    <Tabs tabPosition="left">
                        <Tabs.TabPane key="details" tab="Details">
                            <Space direction="vertical">
                                {storePlugins.product.editor.details.render(props)}
                            </Space>
                        </Tabs.TabPane>
                        <Tabs.TabPane key="tags" tab="Tags">
                            <ProductTagEditor productId={product.id} />
                        </Tabs.TabPane>
                        <Tabs.TabPane key="media" tab="Media">
                            <ProductMediaEditor product={product} update={props.updateString} />
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
    </Spin>
);
