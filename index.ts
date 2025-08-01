import { IModule } from "@core/lib/module";
import { storeMenus } from "./lib/menus";
import { registerMyAccountTabPlugins } from "./lib/plugin/myAccountTabs";
import { storeRoutes } from "./lib/routes";
import { storeSettings } from "./lib/settings";
import { registerProductEditorDetailsPlugins } from "./lib/plugin/productEditorDetails";
import { registerProductManagerColumnPlugins } from "./lib/plugin/productManagerColumns";

export const module:IModule = {
    name: "store",
    menus: storeMenus,
    routes: storeRoutes,
    settings: storeSettings,
}

registerMyAccountTabPlugins();
registerProductEditorDetailsPlugins();
registerProductManagerColumnPlugins();