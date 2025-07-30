import { Editable } from "@core/components/Editable"
import { Label } from "@core/components/Label"
import { onNumberChange, onRadioChange } from "@core/lib/onInputChange"
import { IUpdater } from "@core/lib/useUpdater"
import { faCopy } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IProduct } from "@store-shared/product/types"
import Editor from "@uiw/react-md-editor"
import { Button, Card, Radio, Space } from "antd"
import { storePlugins } from "./slots"


const copyUrlFromName = (product:IProduct, updateString:(field:keyof IProduct) => (value:string) => void) => () => {
    if (!product) return;
    const name = product.name || "";
    const url = name.replace(/\s+/g, "-").toLowerCase();
    updateString("url")(url);
}

export const registerProductEditorDetailsPlugins = () => {
    // Product type and price controls
    storePlugins.product.editor.details.register(1000, ({history:{entity:product}, updateString, updateNumber}:IUpdater<IProduct>) => <>
        <Space>
            <Radio.Group block optionType="button" buttonStyle="solid" value={product.productType} onChange={onRadioChange(updateString("productType"))}>
                <Radio value="digital">Digital</Radio>
                <Radio value="grouped">Grouped</Radio>
            </Radio.Group>
            <Label label="Price"><Editable value={`${product.price}`} onChange={onNumberChange(updateNumber("price"))}/></Label>
        </Space>
    </>);

    // Product SKU
    storePlugins.product.editor.details.register(800, ({history:{entity:product}, updateString}:IUpdater<IProduct>) => <>
        <Label label="SKU"><Editable value={product.sku} onChange={updateString("sku")}/></Label>
    </>);

    // Product URL
    storePlugins.product.editor.details.register(600, ({history:{entity:product}, updateString}:IUpdater<IProduct>) => <>
        <Label label="URL"><Editable value={product.url} onChange={updateString("url")}/></Label>
        <div style={{textAlign: "right"}}>
            <Button onClick={copyUrlFromName(product, updateString)}>
                <FontAwesomeIcon icon={faCopy} /> Copy url from name
            </Button>
        </div>
    </>);

    // Product descriptions
    storePlugins.product.editor.details.register(400, ({history:{entity:product}, updateString}:IUpdater<IProduct>) => <>
        <Card title="Short Description" size="small">
            <Editor value={product.descriptionShort} onChange={updateString("descriptionShort")}/>
        </Card>

        <Card title="Description" size="small">
            <Editor value={product.description} onChange={updateString("description")} />
        </Card>
    </>);

    // Meta tags
    storePlugins.product.editor.details.register(200, ({history:{entity:product}, updateString}:IUpdater<IProduct>) => <>
        <Label label="Meta Title"><Editable value={product.metaTitle || ""} onChange={updateString("metaTitle")}/></Label>
        <Label label="Meta Description"><Editable textArea value={product.metaDescription || ""} onChange={updateString("metaDescription")}/></Label>
        <Label label="Meta Keywords"><Editable value={product.metaKeywords || ""} onChange={updateString("metaKeywords")}/></Label>
    </>);
}
