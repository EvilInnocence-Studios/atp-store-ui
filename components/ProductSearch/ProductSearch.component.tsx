import {ProductSearchProps} from "./ProductSearch.d";
import styles from './ProductSearch.module.scss';
import {Select} from "antd";
import { imgHost } from "../ProductMediaEditor/ProductMediaEditor.component";

export const ProductSearchComponent = ({products, search, setSearch}:ProductSearchProps) => <div className={styles.productSearch}>
    <Select
        showSearch
        onSearch={setSearch}
        filterOption={false}
    >
        {products.map(p => <Select.Option key={p.id}>
            <img width={48} src={`${imgHost(p.id)}${p.thumbnailUrl}`} style={{float: "left", marginRight: "8px"}}/>
            {p.name}<br/>{p.sku}
        </Select.Option>)}
    </Select>
</div>;
