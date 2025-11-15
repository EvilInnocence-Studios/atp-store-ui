import { createInjector, inject, mergeProps } from "unstateless";
import {SortBySelectComponent} from "./SortBySelect.component";
import {ISortBySelectInputProps, SortBySelectProps, ISortBySelectProps} from "./SortBySelect.d";
import { overridable } from "@core/lib/overridable";
import { injectSearch } from "@store/lib/useSearch";
import { useSetting } from "@common/lib/setting/services";

const injectSortBySelectProps = createInjector(({}:ISortBySelectInputProps):ISortBySelectProps => {
    const isVisible = useSetting("store.showSortBySelect") === 'true';
    
    return {isVisible};
});

const connect = inject<ISortBySelectInputProps, SortBySelectProps>(mergeProps(
    injectSortBySelectProps,
    injectSearch,
));
export const connectSortBySelect = connect;

export const SortBySelect = overridable<ISortBySelectInputProps>(connect(SortBySelectComponent));
