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
        "Search": {
            defaultProductSortBy: {
                displayName: "Default Sort By",
                type: "select",
                defaultValue: "newest",
                description: "The default sorting order for product listings.",
                options: [
                    { value: "newest", label: "Newest" },
                    { value: "oldest", label: "Oldest" },
                    { value: "priceLow", label: "Price: Low to High" },
                    { value: "priceHigh", label: "Price: High to Low" },
                ],
            },
            defaultProductPerPage: {
                displayName: "Default Products Per Page",
                type: "string",
                defaultValue: "12",
                description: "The default number of products displayed per page.",
            },
        }
    },
};
