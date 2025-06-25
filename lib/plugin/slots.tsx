import { rendererPlugins } from "@core/lib/plugins/renderer";
import { IUpdater } from "@core/lib/useUpdater";
import { IProduct } from "@store-shared/product/types";

export const plugins = {
    product: {
        editor: {
            header: rendererPlugins<IUpdater<IProduct>>(),
            details: rendererPlugins<IUpdater<IProduct>>(),
        },
    },
};
