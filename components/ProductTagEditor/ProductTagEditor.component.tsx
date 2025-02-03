import { EntityTagEditor } from "@common/components/EntityTagEditor";
import { services } from "@core/lib/api";
import { ProductTagEditorProps } from "./ProductTagEditor.d";

export const ProductTagEditorComponent = ({productId}:ProductTagEditorProps) =>
    <EntityTagEditor
        search={() => services().product.tag.search(productId)}
        create={(tagId:string) => services().product.tag.create(productId, tagId)}
        remove={(tagId:string) => services().product.tag.remove(productId, tagId)}
    />;
