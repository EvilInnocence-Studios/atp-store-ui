import { IModule } from "@core/lib/module";
import { storeMenus } from "./lib/menus";
import { storeRoutes } from "./lib/routes";
import { storeSettings } from "./lib/settings";
import { uacPlugins } from "@uac/lib/plugin/slots";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { UserOrderList } from "./components/UserOrderList";

export const module:IModule = {
    name: "store",
    menus: storeMenus,
    routes: storeRoutes,
    settings: storeSettings,
}

uacPlugins.myAccount.tabs.register({
    key: "orders",
    title: "My Orders",
    icon: faCartShopping,
    priority: 800,
    component: UserOrderList,
});