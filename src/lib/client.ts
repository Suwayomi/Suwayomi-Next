import { createClient as createGenqlClient } from "@/generated"
import type {
    QueryGenqlSelection,
    MutationGenqlSelection,
    FieldsSelection,
    Query,
    Mutation,
} from "@/generated"
import Cookies from "js-cookie"
import { queryClient } from "./query-client"
import { useQuery, useMutation } from "@tanstack/react-query"
import type {
    UseQueryOptions,
    UseMutationOptions,
    FetchQueryOptions,
    QueryKey,
} from "@tanstack/react-query"

const rawClient = createGenqlClient({
    headers: async () => {
        let token: string | undefined
        // console.log("re-fetching the token")
        token = Cookies.get("suwayomi_access_token")
        const headers: Record<string, string> = {}
        if (token) {
            headers["Authorization"] = `Bearer ${token}`
        }
        return headers
    },
})

export const client = {
    ...rawClient,
    query: async <R extends QueryGenqlSelection>(
        request: R & { __name?: string },
        options?: Omit<
            FetchQueryOptions<FieldsSelection<Query, R>>,
            "queryKey" | "queryFn"
        >
    ): Promise<FieldsSelection<Query, R>> => {
        return queryClient.fetchQuery({
            queryKey: ["gql", "query", request],
            queryFn: () => rawClient.query(request),
            ...options,
        })
    },
    mutation: async <R extends MutationGenqlSelection>(
        request: R & { __name?: string }
    ): Promise<FieldsSelection<Mutation, R>> => {
        const result = await rawClient.mutation(request)
        queryClient.invalidateQueries({ queryKey: ["gql"] })
        return result
    },
}

export function useSuwayomiQuery<
    R extends QueryGenqlSelection,
    TData = FieldsSelection<Query, R>,
>(
    request: R & { __name?: string },
    options?: Partial<UseQueryOptions<FieldsSelection<Query, R>, Error, TData>>
) {
    return useQuery({
        queryKey: ["gql", "query", request],
        queryFn: () => rawClient.query(request),
        ...options,
    } as any)
}

export function useSuwayomiMutationQuery<
    R extends MutationGenqlSelection,
    TData = FieldsSelection<Mutation, R>,
>(
    request: R & { __name?: string },
    options?: Partial<
        UseQueryOptions<FieldsSelection<Mutation, R>, Error, TData>
    >
) {
    return useQuery({
        queryKey: ["gql", "mutation-query", request],
        queryFn: () => rawClient.mutation(request),
        ...options,
    } as any)
}

export function useSuwayomiMutation<
    R extends MutationGenqlSelection,
    TData = FieldsSelection<Mutation, R>,
>(options?: UseMutationOptions<TData, Error, R & { __name?: string }>) {
    return useMutation({
        mutationFn: (request) => rawClient.mutation(request) as Promise<TData>,
        ...options,
    })
}

export const logOut = () => {
    Cookies.remove("suwayomi_access_token")
    Cookies.remove("suwayomi_refresh_token")
    window.location.reload()
}
