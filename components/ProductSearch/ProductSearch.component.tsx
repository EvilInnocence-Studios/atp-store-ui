import {ProductSearchProps} from "./ProductSearch.d";
import styles from './ProductSearch.module.scss';
import {Select} from "antd";
import { imgHost } from "../ProductMediaEditor/ProductMediaEditor.component";
import { dateDiff } from "./ProductSearch.container";
import { Image } from "../Image";
import { MiniProduct } from "../MiniProduct";

export const ProductSearchComponent = ({products, setSearch, match, onSelect, placeholder}:ProductSearchProps) => <div className={styles.productSearch}>
    <Select
        showSearch
        placeholder={placeholder}
        onSearch={setSearch}
        filterOption={false}
        value={null}
        onChange={onSelect}
    >
        {products.map(p => <Select.Option key={p.id}>
            <MiniProduct product={p} />
        </Select.Option>)}
    </Select>
</div>;
