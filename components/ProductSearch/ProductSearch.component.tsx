import {ProductSearchProps} from "./ProductSearch.d";
import styles from './ProductSearch.module.scss';
import {Select} from "antd";
import { imgHost } from "../ProductMediaEditor/ProductMediaEditor.component";
import { dateDiff } from "./ProductSearch.container";

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
            <img width={48} src={`${imgHost(p.id)}${p.thumbnailUrl}`} style={{float: "left", marginRight: "8px"}}/>
            {p.name}<br/>{p.sku}<br/>({Math.floor(match(p))}, {dateDiff(p)})
        </Select.Option>)}
    </Select>
</div>;
