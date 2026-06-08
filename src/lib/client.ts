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
        options?: Omit<FetchQueryOptions<FieldsSelection<Query, R>>, "queryKey" | "queryFn">
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
        // Mutations are typically not cached via fetchQuery
        return rawClient.mutation(request)
    },
}

/**
 * Hook for declarative GraphQL queries
 */
export function useSuwayomiQuery<R extends QueryGenqlSelection>(
    request: R & { __name?: string },
    options?: Omit<UseQueryOptions<FieldsSelection<Query, R>>, "queryKey" | "queryFn">
) {
    return useQuery({
        queryKey: ["gql", "query", request],
        queryFn: () => rawClient.query(request),
        ...options,
    })
}

/**
 * Hook for declarative GraphQL mutations
 */
export function useSuwayomiMutation<R extends MutationGenqlSelection>(
    mutateFn: (variables: R & { __name?: string }) => Promise<FieldsSelection<Mutation, R>>,
    options?: UseMutationOptions<FieldsSelection<Mutation, R>, Error, R & { __name?: string }>
) {
    return useMutation({
        mutationFn: mutateFn,
        ...options,
    })
}

export const logOut = () => {
    Cookies.remove("suwayomi_access_token")
    Cookies.remove("suwayomi_refresh_token")
    window.location.reload()
}
