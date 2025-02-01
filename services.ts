import { IMethods } from "@core/lib/types";
import { cartServices } from "./lib/cart/services";
import { discountServices } from "./lib/discount/services";
import { orderServices } from "./lib/order/services";
import { productServices } from "./lib/product/services";
import { wishlistServices } from "./lib/wishlist/services";

export const storeServices = (methods:IMethods) => ({
    ...cartServices(methods),
    ...discountServices(methods),
    ...orderServices(methods),
    ...productServices(methods),
    ...wishlistServices(methods),
});
