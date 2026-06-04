import { ReaderConfig } from "./reader-config"

export default function ReaderSettings({ settings }: { settings?: any }) {
    return (
        <div className="space-y-8 pb-12">
            <div className="space-y-1">
                <h2 className="text-xl font-semibold tracking-tight">
                    Reader Settings
                </h2>
                <p className="text-sm text-muted-foreground">
                    These settings apply globally to the manga reader.
                </p>
            </div>
            <ReaderConfig className="" />
        </div>
    )
}
