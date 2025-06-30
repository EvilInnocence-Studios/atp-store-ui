import { IModule } from "@core-shared/module";
import { storeMenus } from "./lib/menus";
import { storeRoutes } from "./lib/routes";
import { storeSettings } from "./lib/settings";

export const module:IModule = {
    name: "store",
    menus: storeMenus,
    routes: storeRoutes,
    settings: storeSettings,
}