import { onInputChange } from "@core/lib/onInputChange";
import { Input } from "antd";
import { ProductSearchInputProps } from "./ProductSearchInput.d";
import { overridable } from "@core/lib/overridable";

export const ProductSearchInputComponent = overridable(({css, className, query, setQuery, runSearch}:ProductSearchInputProps) => <>
    {css && <style>{css}</style>}
    <Input.Search
        className={className}
        value={query}
        placeholder="Search products"
        onChange={onInputChange(setQuery)}
        onSearch={runSearch}
    />
</>);
