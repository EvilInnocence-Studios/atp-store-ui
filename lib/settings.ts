import { ISettingContainer } from "@common/lib/setting/types";

export const storeSettings:ISettingContainer = {
    "Store": {
        "Media": {
            productImageFolder: {
                displayName: "Product Image Folder",
                type: "string",
                defaultValue: "",
                description: "The folder where product images are stored.",
            },
        },
    },
};
