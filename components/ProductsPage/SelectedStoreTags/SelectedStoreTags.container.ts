import { createInjector, inject, mergeProps } from "unstateless";
import {SelectedStoreTagsComponent} from "./SelectedStoreTags.component";
import {ISelectedStoreTagsInputProps, SelectedStoreTagsProps, ISelectedStoreTagsProps} from "./SelectedStoreTags.d";
import { overridable } from "@core/lib/overridable";
import { injectSearch } from "@store/lib/useSearch";

const injectSelectedStoreTagsProps = createInjector(({}:ISelectedStoreTagsInputProps):ISelectedStoreTagsProps => {
    return {};
});

const connect = inject<ISelectedStoreTagsInputProps, SelectedStoreTagsProps>(mergeProps(
    injectSelectedStoreTagsProps,
    injectSearch,
));

export const SelectedStoreTags = overridable<ISelectedStoreTagsInputProps>(connect(SelectedStoreTagsComponent));
export const connectSelectedStoreTags = connect;