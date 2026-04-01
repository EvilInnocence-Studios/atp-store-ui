import { Select } from "antd";
import { MiniProduct } from "../MiniProduct";
import { ProductSearchProps } from "./ProductSearch.d";
import styles from './ProductSearch.module.scss';
import { overridable } from "@core/lib/overridable";

export const ProductSearchComponent = overridable(({ products, setSearch, onSelect, placeholder, classes = styles, value }: ProductSearchProps) => <div className={classes.productSearch}>
    <Select
        showSearch
        placeholder={placeholder || "Search for a product"}
        onSearch={setSearch}
        filterOption={false}
        value={value}
        onChange={onSelect}
    >
        {products.map(p => <Select.Option key={p.id}>
            <MiniProduct product={p} />
        </Select.Option>)}
    </Select>
</div>);
