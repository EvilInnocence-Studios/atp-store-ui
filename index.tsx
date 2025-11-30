import { ComponentRegistry } from "@core/lib/layout/componentRegistry";
import { IModule } from "@core/lib/module";
import { CartBtn } from "./components/CartBtn";
import { NewProducts } from "./components/NewProducts";
import { ProductSearchInput } from "./components/ProductSearchInput";
import { ShopLink } from "./components/ShopLink";
import { storeMenus } from "./lib/menus";
import { registerMyAccountTabPlugins } from "./lib/plugin/myAccountTabs";
import { registerProductEditorDetailsPlugins } from "./lib/plugin/productEditorDetails";
import { registerProductManagerColumnPlugins } from "./lib/plugin/productManagerColumns";
import { registerProductPricePlugins } from "./lib/plugin/productPrice";
import { registerUserManagerTabPlugins } from "./lib/plugin/userManagerTabs";
import { storeRoutes } from "./lib/routes";
import { storeSettings } from "./lib/settings";

export const module: IModule = {
    name: "store",
    menus: storeMenus,
    routes: storeRoutes,
    settings: storeSettings,
}

ComponentRegistry.register("ShopLink", ShopLink, { category: "Layouts", displayName: "Shop Link" });
ComponentRegistry.register("ProductSearchInput", ProductSearchInput, { category: "Layouts", displayName: "Product Search Input" });
ComponentRegistry.register("CartBtn", CartBtn, { category: "Layouts", displayName: "Cart Button" });
ComponentRegistry.register("NewProducts", NewProducts, { category: "Layouts", displayName: "New Products" });

registerMyAccountTabPlugins();
registerUserManagerTabPlugins();
registerProductEditorDetailsPlugins();
registerProductManagerColumnPlugins();
registerProductPricePlugins();
