import { withRoute } from "@core/lib/withRoute";
import { Cart } from "@store/components/Cart";
import { MyAccount } from "@store/components/MyAccount";
import { ProductEditor } from "@store/components/ProductEditor";
import { ProductManager } from "../components/ProductManager";

export const storeRoutes = {
    admin: [
        {path: "/products", component: ProductManager},
        {path: "/products/:productId", component: withRoute(ProductEditor)},
    ],
    public: [
        {path: "/my-account", component: MyAccount},
        {path: "/cart", component: Cart},
    ]
}