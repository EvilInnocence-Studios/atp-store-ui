import { rendererPlugins } from "@core/lib/plugins/renderer";
import { rendererOptionPlugins } from "@core/lib/plugins/rendererOptions";
import { tableColumns } from "@core/lib/plugins/tableColumns";
import { ITableFilters } from "@core/lib/useTableFilters";
import { IUpdater } from "@core/lib/useUpdater";
import { IProduct } from "@store-shared/product/types";
import { AddtoCartButtonBasic } from "@store/components/AddtoCartBtn/AddToCartBtnBasic";

export interface IAddToCartPluginProps {
    product: IProduct;
    addToCart: () => void;
}

export interface IProductTableColumnProps {
    filters: ITableFilters<IProduct>;
    remove: (id:string) => () => void;
}

export const storePlugins = {
    product: {
        editor: {
            header: rendererPlugins<IUpdater<IProduct>>(),
            details: rendererPlugins<IUpdater<IProduct>>(),
        },
        manager: {
            columns: tableColumns<IProduct, IProductTableColumnProps>(),
        }
    },
    cart: {
        addButton: rendererOptionPlugins<IAddToCartPluginProps>(AddtoCartButtonBasic),
    }
};
