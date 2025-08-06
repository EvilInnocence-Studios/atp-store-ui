import { ISettingContainer } from "@common/lib/setting/types";

export const storeSettings:ISettingContainer = {
    "Store": {
        "General": {
            defaultProductSku: {
                displayName: "Default Product SKU",
                type: "string",
                defaultValue: "",
                description: "The default SKU to use for new products.",
            },
            productImageFolder: {
                displayName: "Product Image Folder",
                type: "string",
                defaultValue: "",
                description: "The folder where product images are stored.",
            },
        },
    },
};
