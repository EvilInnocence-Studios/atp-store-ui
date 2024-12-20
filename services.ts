import { IMethods } from "@core/lib/types";
import { productServices } from "./lib/product/services";

export const storeServices = (methods:IMethods) => ({
    ...productServices(methods),
});