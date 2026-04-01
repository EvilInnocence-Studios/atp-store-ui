import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ILayoutEditorProps, LayoutEditor } from "@theming/lib/layout/componentRegistry";
import { Button } from "antd";

export const AddToCartBtnLayoutEditor:LayoutEditor = ({css, className}:ILayoutEditorProps) => <>
    {css && <style>{css}</style>}
    <span className={className}>
        <Button type="primary">
            <FontAwesomeIcon icon={faCartPlus} />
            Add to Cart
        </Button>
    </span>
</>;
