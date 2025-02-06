import { useNavigate, useSearchParams } from "react-router";
import { unique } from "ts-functional";

export declare interface ISearch {
    q?: string;
    selectedTagIds: string[];
    sortBy: string;
    search: (term?:string, nav?: boolean) => void;
    selectTag: (tagId: string) => void;
    removeTag: (tagId: string) => void;
    setSortBy: (order: string) => void;
    clearAll: () => void;
    clearSearch: () => void;
}

export const useSearch = ():ISearch => {
    const [query, setQuery] = useSearchParams();
    const navigate = useNavigate();

    const {q, tags:selectedTagIdsRaw = "", sortBy = "newest"} = Object.fromEntries(query.entries()) as unknown as {q?: string, tags?: string, sortBy:string};
    const selectedTagIds:string[] = selectedTagIdsRaw ? selectedTagIdsRaw.split(',') : [];

    const updateQuery = (q: string | undefined, tags: string[], sortBy?: string) => {
        const params = {
            ...(!!q ? {q} : {}),
            ...(tags.length > 0 ? {tags: tags.join(",")} : {}),
            ...(!!sortBy ? {sortBy} : {}),
        };
        setQuery(params);
        navigate(`/products?${new URLSearchParams(params).toString()}`);
    }

    const search = (term?:string) => {
        updateQuery(term, selectedTagIds, sortBy);
    }

    const selectTag = (tagId: string) => {
        updateQuery(q, unique([...selectedTagIds, tagId]), sortBy);
    }

    const removeTag = (tagId: string) => {
        updateQuery(q, selectedTagIds.filter(id => id !== tagId), sortBy);
    }

    const setSortBy = (order: string) => {
        updateQuery(q, selectedTagIds, order);
    }

    const clearAll = () => {
        updateQuery(undefined, [], sortBy);
    }

    const clearSearch = () => {
        updateQuery(undefined, selectedTagIds, sortBy);
    }

    return {
        q, selectedTagIds, sortBy,
        search, selectTag, removeTag, setSortBy,
        clearAll, clearSearch,
    };
}