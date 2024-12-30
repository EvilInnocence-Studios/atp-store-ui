import { ISynonym } from "@common-shared/synonym/types";
import { synonymReplace } from "@common/lib/synonym/util";
import { IProductFull } from "@store-shared/product/types";
import { add } from "lodash";
import { memoize, trim } from "ts-functional";

export const searchString = memoize((product:IProductFull, synonyms:ISynonym[]) => synonymReplace(JSON.stringify(product), synonyms));

export const searchMatch = memoize((needle:string, haystack:string) =>
    needle
        .split(" ")
        .map(trim)
        .map(s => haystack.toLocaleLowerCase().includes(s.toLocaleLowerCase()) ? 1 : 0)
        .reduce(add, 0)
);
