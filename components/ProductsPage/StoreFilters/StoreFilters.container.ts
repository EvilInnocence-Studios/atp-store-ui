import { useSetting } from "@common/lib/setting/services";
import { overridable } from "@core/lib/overridable";
import { useToggle } from "@core/lib/useToggle";
import { injectSearch } from "@store/lib/useSearch";
import { createInjector, inject, mergeProps } from "unstateless";
import { StoreFiltersComponent } from "./StoreFilters.component";
import { IStoreFiltersInputProps, IStoreFiltersProps, StoreFiltersProps } from "./StoreFilters.d";

const injectStoreFiltersProps = createInjector(({}:IStoreFiltersInputProps):IStoreFiltersProps => {
    const filters = useToggle();
    const showFilterBar = useSetting("store.showFilterBar") === "true";
    
    return {filters, showFilterBar};
});

const connect = inject<IStoreFiltersInputProps, StoreFiltersProps>(mergeProps(
    injectStoreFiltersProps,
    injectSearch,
));

export const StoreFilters = overridable<IStoreFiltersInputProps>(connect(StoreFiltersComponent));
export const connectStoreFilters = connect;