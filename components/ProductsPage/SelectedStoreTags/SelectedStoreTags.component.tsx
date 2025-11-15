import { SelectedTags } from "@common/components/SelectedTags";
import { overridable } from "@core/lib/overridable";
import { SelectedStoreTagsProps } from "./SelectedStoreTags.d";

export const SelectedStoreTagsComponent = overridable(({selectedTagIds, clearAll, clearSearch, q, removeTag}:SelectedStoreTagsProps) =>
    <SelectedTags selectedTagIds={selectedTagIds} clearSearch={clearSearch} q={q} removeTag={removeTag} clearAll={clearAll} />
);
