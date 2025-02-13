import { useSearchParams } from "react-router";
import { objFilter, objMap, unique } from "ts-functional";
import { Index } from "ts-functional/dist/types";

interface IParams extends Index<string> {
}

export declare interface ISearch {
    q?: string;
    selectedTagIds: string[];
    sortBy: string;
    perPage: string;
    page: string;
    search: (term:string) => void;
    selectTag: (tagId: string) => void;
    removeTag: (tagId: string) => void;
    setSortBy: (order: string) => void;
    setPerPage: (perPage: string) => void;
    setPage: (page:string) => void;
    updateQuery: (params:IParams) => void;
    clearAll: () => void;
    clearSearch: () => void;
}

export const useSearch = ():ISearch => {
    const [query, setQuery] = useSearchParams();

    const {
        q,
        tags:selectedTagIdsRaw = "",
        sortBy = "newest",
        perPage = "12",
        page = "1",
    } = Object.fromEntries(query.entries()) as unknown as IParams;
    const selectedTagIds:string[] = selectedTagIdsRaw ? selectedTagIdsRaw.split(',') : [];

    const updateQuery = (params:IParams) => {
        console.log("Updating", params);
        setQuery((old:URLSearchParams) => {
            const oldParams:IParams = Object.fromEntries(old.entries()) as unknown as IParams;
            const newParams = objMap<string, IParams>(
                (value:any, key:keyof IParams) => params[key] || value,
            )({...oldParams, ...params});
            const filtered = objFilter(value => !! value)(newParams);
            console.log("Updated params", old.toString(), filtered);
            return filtered as unknown as URLSearchParams;
        });        
    }

    const search = (term:string) => {
        updateQuery({q: term, page: "1"});
    }

    const selectTag = (tagId: string) => {
        updateQuery({tags: unique([...selectedTagIds, tagId]).join(','), page: "1"});
    }

    const removeTag = (tagId: string) => {
        updateQuery({tags: selectedTagIds.filter(id => id !== tagId).join(',')});
    }

    const setSortBy = (order: string) => {
        updateQuery({sortBy: order});
    }

    const setPerPage = (perPage: string) => {
        updateQuery({perPage, page: "1"});
    }

    const setPage = (page:string) => {
        updateQuery({page});
    }

    const clearAll = () => {
        setQuery({sortBy, perPage, page});
    }

    const clearSearch = () => {
        setQuery({sortBy, perPage, page, tags: selectedTagIds.join(',')});
    }

    return {
        q, selectedTagIds, sortBy, perPage, page, 
        search, selectTag, removeTag, setSortBy, setPerPage, setPage, updateQuery,
        clearAll, clearSearch,
    };
}