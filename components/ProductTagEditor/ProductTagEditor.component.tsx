import { EntityTagEditor } from "@common/components/EntityTagEditor";
import { services } from "@core/lib/api";
import { ProductTagEditorProps } from "./ProductTagEditor.d";

export const ProductTagEditorComponent = ({productId}:ProductTagEditorProps) =>
    <EntityTagEditor
        search={() => services().product.tag.search(productId)}
        create={(tagId:number) => services().product.tag.create(productId, tagId)}
        remove={(tagId:number) => services().product.tag.remove(productId, tagId)}
    />;
