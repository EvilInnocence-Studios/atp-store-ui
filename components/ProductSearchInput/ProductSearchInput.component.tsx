import { onInputChange } from "@core/lib/onInputChange";
import { Input } from "antd";
import { ProductSearchInputProps } from "./ProductSearchInput.d";
import { overridable } from "@core/lib/overridable";

export const ProductSearchInputComponent = overridable(({query, setQuery, runSearch}:ProductSearchInputProps) =>
    <Input.Search
        value={query}
        placeholder="Search products"
        onChange={onInputChange(setQuery)}
        onSearch={runSearch}
    />
);
