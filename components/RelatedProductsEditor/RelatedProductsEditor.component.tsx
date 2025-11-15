import { Spin } from "antd";
import { ProductSearch } from "../ProductSearch/ProductSearch.container";
import { RelatedProductsEditorProps } from "./RelatedProductsEditor.d";
import styles from './RelatedProductsEditor.module.scss';
import { Image } from "../Image";
import { DeleteBtn } from "@core/components/DeleteBtn";
import { overridable } from "@core/lib/overridable";

export const RelatedProductsEditorComponent = overridable(({related, add, remove, isLoading}:RelatedProductsEditorProps) =>
    <Spin spinning={isLoading}>
        <ProductSearch onSelect={add} placeholder="Add related product"/>

        <div className={styles.relatedProducts}>
            {related.map(p => <div key={p.id} className={styles.relatedProduct}>
                <DeleteBtn entityType="related product" onClick={remove(p)}/>
                <Image productId={p.id} imageId={p.thumbnailId}/><br/>
                {p.name}
            </div>)}
        </div>
    </Spin>
);
