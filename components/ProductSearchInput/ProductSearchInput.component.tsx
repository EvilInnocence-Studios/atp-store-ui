import { onInputChange } from "@core/lib/onInputChange";
import { Input } from "antd";
import { ProductSearchInputProps } from "./ProductSearchInput.d";

export const ProductSearchInputComponent = ({query, setQuery, runSearch}:ProductSearchInputProps) =>
    <Input.Search
        value={query}
        placeholder="Search products"
        onChange={onInputChange(setQuery)}
        onSearch={runSearch}
    />;
