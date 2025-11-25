import { IMethods } from "@core/lib/types";
import { cartServices } from "./cart/services";
import { discountServices } from "./discount/services";
import { orderServices } from "./order/services";
import { productServices } from "./product/services";
import { reportServices } from "./report/services";
import { wishlistServices } from "./wishlist/services";

export const storeServices = (methods:IMethods) => ({
    ...cartServices(methods),
    ...discountServices(methods),
    ...orderServices(methods),
    ...productServices(methods),
    ...wishlistServices(methods),
    ...reportServices(methods),
});
