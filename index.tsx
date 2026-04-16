import { IModule } from "@core/lib/module";
import { ComponentRegistry, LayoutRegistry } from "@theming/lib/layout/componentRegistry";
import { AddToCartBtn } from "./components/AddToCartBtn";
import { CartBtn } from "./components/CartBtn";
import { NewProducts } from "./components/NewProducts";
import { ProductDescription } from "./components/ProductPage/ProductDescription";
import { ProductMedia } from "./components/ProductPage/ProductMedia";
import { ProductName } from "./components/ProductPage/ProductName";
import { ProductPrice } from "./components/ProductPage/ProductPrice";
import { ProductTags } from "./components/ProductPage/ProductTags";
import { RelatedProducts } from "./components/ProductPage/RelatedProducts";
import { SubProducts } from "./components/ProductPage/SubProducts";
import { WishlistBtn } from "./components/ProductPage/WishlistBtn";
import { ProductSearchInput } from "./components/ProductSearchInput";
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

ComponentRegistry.register("ProductSearchInput", ProductSearchInput, { category: "Store", subCategory:"Browse", displayName: "Product Search Input" });
ComponentRegistry.register("CartBtn", CartBtn, { category: "Store", subCategory:"Actions", displayName: "Cart Button" });
ComponentRegistry.register("NewProducts", NewProducts, { category: "Store", subCategory:"Browse", displayName: "New Products" });
ComponentRegistry.register(ProductName);
ComponentRegistry.register(ProductMedia);
ComponentRegistry.register(ProductPrice);
ComponentRegistry.register(AddToCartBtn);
ComponentRegistry.register(WishlistBtn);
ComponentRegistry.register(ProductTags);
ComponentRegistry.register(ProductDescription);
ComponentRegistry.register(SubProducts);
ComponentRegistry.register(RelatedProducts);

registerMyAccountTabPlugins();
registerUserManagerTabPlugins();
registerProductEditorDetailsPlugins();
registerProductManagerColumnPlugins();
registerProductPricePlugins();

LayoutRegistry.register({
    name: "productPage",
    displayName: "Product Page",
    description: "Layout for product page",
    defaultLayout: {
        component: "Empty"
    },
    priority: 500,
})