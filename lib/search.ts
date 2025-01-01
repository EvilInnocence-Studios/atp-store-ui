import { ISynonym } from "@common-shared/synonym/types";
import { synonymReplace } from "@common/lib/synonym/util";
import { IProductFull } from "@store-shared/product/types";
import { add } from "lodash";
import { memoize, objMap, unique } from "ts-functional";
import { Index } from "ts-functional/dist/types";


// Field weights for the product search algorithm
const weights:Index<number> = {
    tags: 11,
    name: 10,
    metaTitle: 9,
    description: 8,
    descriptionShort: 7,
    metaDescription: 6,
    metaKeywords: 5,
    url: 4,
    brokeredAt: 3,
    sku: 2,
    productType: 1,
}

const check = "EI-S0050";
export const searchProduct = memoize((product:IProductFull, search:string, synonyms:ISynonym[]) => {
    if(search === "") return 0;
    const searchReplaced = synonymReplace(search, synonyms);
    const matchWeights = Object.values(objMap((weight:number, field:string) => {
        const value:string = field !== "tags"
            ? product[field as keyof IProductFull] as string
            : (product[field as keyof IProductFull] as string[]).join(" ");
        const replaced = synonymReplace(value, synonyms);
        const match = unique(replaced.toLocaleUpperCase().split(" ")).filter(word => !!word && searchReplaced.toLocaleUpperCase().includes(word));
        if(product.sku === check) {
            console.log(`Product ${product.name} has a match of ${match} in field ${field}`);
            console.log(match);
        }
        return match.length * weight;
    })(weights));
    const totalWeights = matchWeights.reduce(add, 0);
    if(product.sku === check) {console.log(`Product ${product.name} has a weight of ${totalWeights}`);}
    return totalWeights;
}, {});
