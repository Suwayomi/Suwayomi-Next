import * as React from "react"
import MainClient from "./MainClient"

export default function Main({ children }: { children: React.ReactNode }) {
    return <MainClient initialData={null}>{children}</MainClient>
}
