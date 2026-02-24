import { Editable } from "@core/components/Editable"
import { Label } from "@core/components/Label"
import { MarkdownEditor } from "@core/components/MarkdownEditor"
import { onNumberChange, onRadioChange } from "@core/lib/onInputChange"
import { IUpdater } from "@core/lib/useUpdater"
import { faCopy, faRefresh } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IProduct } from "@store-shared/product/types"
import { Button, Card, Radio, Space, Switch } from "antd"
import { storePlugins } from "./slots"

const copyUrlFromName = (product:IProduct, updateString:(field:keyof IProduct) => (value:string) => void) => () => {
    if (!product) return;
    const name = product.name || "";
    const url = name.replace(/\s+/g, "-").toLowerCase();
    updateString("url")(url);
}

const register = storePlugins.product.editor.details.register;

export const registerProductEditorDetailsPlugins = () => {
    // Product type and price controls
    register(1000, ({history:{entity:product}, updateString, updateNumber}:IUpdater<IProduct>) => <>
        <Space>
            <Radio.Group block optionType="button" buttonStyle="solid" value={product.productType} onChange={onRadioChange(updateString("productType"))}>
                <Radio value="digital">Digital</Radio>
                <Radio value="grouped">Grouped</Radio>
            </Radio.Group>
            <Label label="Price"><Editable value={`${product.price}`} onChange={onNumberChange(updateNumber("price"))}/></Label>
        </Space>
    </>);

    // Product SKU
    register(800, ({history:{entity:product}, updateString}:IUpdater<IProduct>) => <>
        <Label label="SKU"><Editable value={product.sku} onChange={updateString("sku")}/></Label>
    </>);

    // Product URL
    register(600, ({history:{entity:product}, updateString}:IUpdater<IProduct>) => <div style={{position: "relative"}}>
        <Label label="URL">
            <Editable value={product.url} onChange={updateString("url")}/>
            <Button
                onClick={copyUrlFromName(product, updateString)}
                type="link"
                style={{
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "24px",
                    height: "24px",
                    background: "transparent",
                    border: "none",
                }}
            >
                <FontAwesomeIcon icon={faRefresh} />
            </Button>
        </Label>
    </div>);

    // Is Discountable
    register(500, ({history:{entity:product}, updateToggle}:IUpdater<IProduct>) => <>
        <Space style={{width: "100%"}}>
            Discountable: <Switch checked={product.isDiscountable} onChange={updateToggle("isDiscountable")} checkedChildren="Yes" unCheckedChildren="No"/> 
        </Space>
    </>);

    // Product descriptions
    register(400, ({history:{entity:product}, updateString}:IUpdater<IProduct>) => <>
        <Card title="Short Description" size="small">
            <MarkdownEditor value={product.descriptionShort} onChange={updateString("descriptionShort")}/>
        </Card>

        <Card title="Description" size="small">
            <MarkdownEditor value={product.description} onChange={updateString("description")} />
        </Card>
    </>);

    // Meta tags
    register(200, ({history:{entity:product}, updateString}:IUpdater<IProduct>) => <>
        <Label label="Meta Title"><Editable value={product.metaTitle || ""} onChange={updateString("metaTitle")}/></Label>
        <Label label="Meta Description"><Editable textArea value={product.metaDescription || ""} onChange={updateString("metaDescription")}/></Label>
        <Label label="Meta Keywords"><Editable value={product.metaKeywords || ""} onChange={updateString("metaKeywords")}/></Label>
    </>);
}
