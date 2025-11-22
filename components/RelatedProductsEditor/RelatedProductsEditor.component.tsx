import { overridable } from "@core/lib/overridable";
import { Spin } from "antd";
import { MiniProduct } from "../MiniProduct";
import { ProductSearch } from "../ProductSearch/ProductSearch.container";
import { RelatedProductsEditorProps } from "./RelatedProductsEditor.d";
import styles from './RelatedProductsEditor.module.scss';

export const RelatedProductsEditorComponent = overridable(({ related, isLoading, add, remove, classes = styles }: RelatedProductsEditorProps) =>
    <Spin spinning={isLoading}>
        <div className={classes.relatedProductsEditor}>
            <ProductSearch onSelect={add} placeholder="Add related product" />

            <div className={classes.relatedProducts}>
                {related.map(product => <MiniProduct key={product.id} product={product} onRemove={remove(product)} />)}
            </div>
        </div>
    </Spin>
);
