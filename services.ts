import { IMethods } from "@core/lib/types";
import { productServices } from "./lib/product/services";
import { wishlistServices } from "./lib/wishlist/services";

export const storeServices = (methods:IMethods) => ({
    ...productServices(methods),
    ...wishlistServices(methods),
});