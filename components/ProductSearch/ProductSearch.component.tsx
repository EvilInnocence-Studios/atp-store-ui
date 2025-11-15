import { Select } from "antd";
import { MiniProduct } from "../MiniProduct";
import { ProductSearchProps } from "./ProductSearch.d";
import styles from './ProductSearch.module.scss';
import { overridable } from "@core/lib/overridable";

export const ProductSearchComponent = overridable(({products, setSearch, onSelect, placeholder}:ProductSearchProps) => <div className={styles.productSearch}>
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
</div>);
