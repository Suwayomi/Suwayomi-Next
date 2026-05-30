import { client } from "@/lib/client";

export type Category = {
    id: number;
    name: string;
    default: boolean;
    order: number;
};

export async function fetchCategories(): Promise<Category[]> {
    const result = await client.query({
        categories: {
            nodes: {
                id: true,
                name: true,
                default: true,
                order: true,
            },
        },
    });

    return (result.categories?.nodes as Category[]) ?? [];
}
