import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ILayoutEditorProps, LayoutEditor } from "@theming/lib/layout/componentRegistry";
import { Button } from "antd";

export const WishlistBtnLayoutEditor:LayoutEditor = ({css, className}:ILayoutEditorProps) => <>
    {css && <style>{css}</style>}
    <Button type="link" className={className}>
        <FontAwesomeIcon icon={faHeart} /> Add to wishlist
    </Button>
</>;
