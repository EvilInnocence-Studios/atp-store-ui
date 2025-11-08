import { overridable } from "@core/lib/overridable";
import { Select } from "antd";
import { SortBySelectProps } from "./SortBySelect.d";
import styles from './SortBySelect.module.scss';

export const SortBySelectComponent = overridable<SortBySelectProps>(({sortBy, setSortBy, isVisible}:SortBySelectProps) => isVisible ?
    <div className={styles.orderSelect}>
        <Select placeholder="Sort By" value={sortBy} onChange={setSortBy}>
            <Select.Option value="newest">Newest</Select.Option>
            <Select.Option value="oldest">Oldest</Select.Option>
            <Select.Option value="priceLow">Price: Low to High</Select.Option>
            <Select.Option value="priceHigh">Price: High to Low</Select.Option>
        </Select>
    </div> : null
);
