import { rendererPlugins } from "@core/lib/plugins/renderer";
import { rendererOptionPlugins } from "@core/lib/plugins/rendererOptions";
import { IUpdater } from "@core/lib/useUpdater";
import { IProduct } from "@store-shared/product/types";
import { AddtoCartButtonBasic } from "@store/components/AddtoCartBtn/AddToCartBtnBasic";

export interface IAddToCartPluginProps {
    product: IProduct;
    addToCart: () => void;
}

export const storePlugins = {
    product: {
        editor: {
            header: rendererPlugins<IUpdater<IProduct>>(),
            details: rendererPlugins<IUpdater<IProduct>>(),
        },
    },
    cart: {
        addButton: rendererOptionPlugins<IAddToCartPluginProps>(AddtoCartButtonBasic),
    }
};
