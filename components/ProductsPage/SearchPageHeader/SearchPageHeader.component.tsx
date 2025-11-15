import { overridable } from "@core/lib/overridable";
import { CategoryLinks } from "../../CategoryLinks";
import { SelectedStoreTags } from "../SelectedStoreTags";
import { SortBySelect } from "../SortBySelect";
import { StoreFilters } from "../StoreFilters";
import { SearchPageHeaderProps } from "./SearchPageHeader.d";

export const SearchPageHeaderComponent = overridable(({}:SearchPageHeaderProps) =><>
    <CategoryLinks />
    <SelectedStoreTags />
    <StoreFilters />
    <SortBySelect />
</>);
