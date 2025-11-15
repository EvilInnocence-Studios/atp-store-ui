import { overridable } from "@core/lib/overridable";
import {StoreFiltersProps} from "./StoreFilters.d";
import styles from './StoreFilters.module.scss';
import { Button } from "antd";
import { TagFacets } from "@common/components/TagFacets";

export const StoreFiltersComponent = overridable(({showFilterBar, filters, selectedTagIds, selectTag, removeTag}:StoreFiltersProps) =>
    <div className={styles.inlineFacets}>
        {showFilterBar && <div className={styles.filterHeader}>
            Filter Products...
            <Button onClick={filters.toggle} size="small" type="link">
                {filters.isset ? "Hide" : "Show"}
            </Button>
        </div>}
        {filters.isset && <>
            <hr/>
            <TagFacets selectedTagIds={selectedTagIds} selectTag={selectTag} removeTag={removeTag} />
        </>}
    </div>
);
