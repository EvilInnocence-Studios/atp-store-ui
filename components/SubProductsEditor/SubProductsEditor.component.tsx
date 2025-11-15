import { Spin } from "antd";
import {SubProductsEditorProps} from "./SubProductsEditor.d";
import styles from './SubProductsEditor.module.scss';
import { ProductSearch } from "../ProductSearch";
import { MiniProduct } from "../MiniProduct";
import { DeleteBtn } from "@core/components/DeleteBtn";
import { overridable } from "@core/lib/overridable";

export const SubProductsEditorComponent = overridable(({subProducts, isLoading, add, remove}:SubProductsEditorProps) =>
    <Spin spinning={isLoading}>
        <div className={styles.subProductEditor}>
            <h2>Sub Products</h2>
            <ProductSearch onSelect={add} />
            <div className={styles.subProductList}>
                {subProducts.map((subProduct) =>
                    <div key={subProduct.id}>
                        <MiniProduct product={subProduct} />
                        <DeleteBtn entityType="sub product" onClick={() => remove(subProduct.id)} />
                    </div>
                )}
            </div>
        </div>
    </Spin>
);
