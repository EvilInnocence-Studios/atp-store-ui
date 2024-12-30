import { ProductSearch } from "../ProductSearch/ProductSearch.container";
import {RelatedProductsEditorProps} from "./RelatedProductsEditor.d";
import styles from './RelatedProductsEditor.module.scss';

export const RelatedProductsEditorComponent = ({}:RelatedProductsEditorProps) =>
    <div>
        <ProductSearch />
    </div>;
