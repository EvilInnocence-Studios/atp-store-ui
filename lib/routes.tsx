import { withRoute } from "@core/lib/withRoute";
import { Cart } from "@store/components/Cart";
import { MyAccount } from "@store/components/MyAccount";
import { ProductEditor } from "@store/components/ProductEditor";
import { ProductPage } from "@store/components/ProductPage";
import { ProductsPage } from "@store/components/ProductsPage";
import { ProductManager } from "../components/ProductManager";

export const storeRoutes = {
    admin: [
        {path: "/products", component: ProductManager},
        {path: "/products/:productId", component: withRoute(ProductEditor)},
    ],
    public: [
        {path: "/my-account/:tab",    component: withRoute(MyAccount)   },
        {path: "/cart",               component: Cart                   },
        {path: "/products",           component: ProductsPage           },
        {path: "/products/:url",      component: withRoute(ProductPage) },
    ]
}