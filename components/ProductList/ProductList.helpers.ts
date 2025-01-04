import { objMap, pipe, range, reduce } from "ts-functional";

import { IProductFull } from "@store-shared/product/types";
import { IElement, IPlacedProduct, IPoint, IProductElement, IProductGroup, ISlot, PlacedProductList, ProductGroups, ProductList, SlotList } from "./ProductList.d";

export const randomProducts = (products:IProductFull[]):ProductList => products
    .filter(p => p.enabled && p.thumbnailId)
    .map(p => {
        const size = Math.floor(Math.random() * 1.05) + 1;

        return {
            size: {x: size, y: size},
            origin: null,
            ...p,
        };
    });

const sizeId = (image:IElement):string => `${image.size.x}:${image.size.y}`;

const newGroup = (product:IProductElement):IProductGroup => ({
    size: product.size,
    products: [],
    slots: [],
})

const addProductToGroup = (product:IProductElement, oldGroup?:IProductGroup):IProductGroup => {
    const group:IProductGroup = oldGroup || newGroup(product);
    group.products = [...group.products, product];
    return group;
}


const generateSlots = (gridSize:IPoint, slotSize:IPoint):SlotList => {
    const slots:SlotList = [];
    range(0, gridSize.y-slotSize.y).forEach(y => {
        range(0, gridSize.x-slotSize.x).forEach(x => {
            slots.push({
                origin: {x, y},
                size: slotSize,
            })
        })
    });

    return slots;
}

const addSlots = (gridSize:IPoint) => (group:IProductGroup) => ({
    ...group,
    slots: generateSlots(gridSize, group.size),
});

const addAllSlots = (gridSize:IPoint) => objMap<IProductGroup, IProductGroup>(addSlots(gridSize));

export const groupProducts = (products:IProductElement[], gridSize:IPoint):ProductGroups => {
    const groups:ProductGroups = products.reduce(
        (groups:ProductGroups, product:IProductElement) => ({
            ...groups,
            [sizeId(product)]: addProductToGroup(product, groups[sizeId(product)]),
        }),
        {} as ProductGroups,
    );

    return addAllSlots(gridSize)(groups);
}

function shuffleArray<T>(array: T[]): T[] {
    const shuffledArray = [...array]; // Create a copy to avoid mutating the original array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      // Pick a random index between 0 and i (inclusive)
      const randomIndex = Math.floor(Math.random() * (i + 1));
  
      // Swap the elements at i and randomIndex
      [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
    }
    return shuffledArray;
  }

/*
while images are left
    of the existing slot types, determine which one has the lowest y index
    insert an image into the gallery list
    remove that slot and any intersecting slots
    if no slots of a type are left but there are images of that type left
        extend the slot lists
*/
export const arrangeProducts = (groupedProducts:ProductGroups):PlacedProductList => {
    const getFirstSlot = (imgGroup:IProductGroup):ISlot => imgGroup.slots[0];
    const getAllFirstSlots = pipe(objMap(getFirstSlot), Object.values);

    const getImageCount = (imgGroup:IProductGroup):number => imgGroup.products.length;
    const getImageCounts = pipe(objMap(getImageCount), Object.values, reduce((c, i) => c+i, 0));

    const sortSlots = (a:ISlot, b:ISlot) => a.origin.y - b.origin.y || a.origin.x - b.origin.x;

    // Iterate over the groups until there are no images left to place
    const placedImages:PlacedProductList = [];
    while(getImageCounts(groupedProducts)) {
        // Determine the slot with the lowest position
        const firstSlot:ISlot = shuffleArray(getAllFirstSlots(groupedProducts) as ISlot[]).sort(sortSlots)[0];
        const groupId = sizeId(firstSlot);

        // Get the first image with the same size as the chosen slot
        const imagesForThisSlot:ProductList = groupedProducts[groupId].products;
        const newImage:IPlacedProduct = imagesForThisSlot[0] as IPlacedProduct;

        // Assign the slot's origin to the chosen image
        newImage.origin = firstSlot.origin;
        placedImages.push(newImage);

        // Remove the chosen images from the list of images left to process
        groupedProducts[groupId] = {
            ...groupedProducts[groupId],
            products: imagesForThisSlot.slice(1),
        }

        // If the list of images for the chosen slot size is empty, remove its whole group
        if(groupedProducts[groupId].products.length === 0) {
            delete(groupedProducts[groupId]);
        }

        // Remove the slots that overlap the chosen slot
        const filterSlots = (slot:ISlot) => {
            // Calculate the boundaries of slot1
            const slot1Right = slot.origin.x + slot.size.x;
            const slot1Top = slot.origin.y + slot.size.y;

            // Calculate the boundaries of slot2
            const slot2Right = firstSlot.origin.x + firstSlot.size.x;
            const slot2Top = firstSlot.origin.y + firstSlot.size.y;

            // Check for overlap using rectangle overlap rules
            const noOverlap =
                slot1Right    <= firstSlot.origin.x || // slot is completely to the left of firstSlot
                slot.origin.x >= slot2Right         || // slot is completely to the right of firstSlot
                slot1Top      <= firstSlot.origin.y || // slot is completely below firstSlot
                slot.origin.y >= slot2Top;             // slot is completely above firstSlot

            // Return true if there is no overlap, false otherwise
            return noOverlap;
        }
        groupedProducts = objMap<IProductGroup, IProductGroup>(group => ({
            ...group,
            slots: group.slots.filter(filterSlots),
        }))(groupedProducts);
    }

    return placedImages;
}
