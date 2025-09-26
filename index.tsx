import { IModule } from "@core/lib/module";
import { sitePlugins } from "@public/index";
import { Col } from "antd";
import { NewProducts } from "./components/NewProducts";
import { storeMenus } from "./lib/menus";
import { registerMyAccountTabPlugins } from "./lib/plugin/myAccountTabs";
import { registerProductEditorDetailsPlugins } from "./lib/plugin/productEditorDetails";
import { registerProductManagerColumnPlugins } from "./lib/plugin/productManagerColumns";
import { storeRoutes } from "./lib/routes";
import { storeSettings } from "./lib/settings";
import { useSetting } from "@common/lib/setting/services";

export const module:IModule = {
    name: "store",
    menus: storeMenus,
    routes: storeRoutes,
    settings: storeSettings,
}

registerMyAccountTabPlugins();
registerProductEditorDetailsPlugins();
registerProductManagerColumnPlugins();

sitePlugins.homepage.register(50, () => {
    const showNewProducts = useSetting("homepage.showNewProductsOnHomepage") === "true";

    return <>
        {showNewProducts && <Col xs={24}>
            <NewProducts />
        </Col>}
    </>;
});