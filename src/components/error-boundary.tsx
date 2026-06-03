import * as React from "react"
import { AlertTriangle, RotateCcw, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Props {
    children: React.ReactNode
}

interface State {
    hasError: boolean
    error: Error | null
}

export class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6 text-center">
                    <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                        <AlertTriangle className="size-10" />
                    </div>
                    <h1 className="mb-2 text-2xl font-black tracking-tight">Something went wrong</h1>
                    <p className="mb-8 max-w-md text-muted-foreground">
                        {this.state.error?.message || "An unexpected error occurred in the application module."}
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Button
                            onClick={() => window.location.reload()}
                            className="gap-2 font-bold"
                        >
                            <RotateCcw className="size-4" />
                            Reload Page
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => window.location.href = "/"}
                            className="gap-2 font-bold"
                        >
                            <Home className="size-4" />
                            Go Home
                        </Button>
                    </div>
                    {process.env.NODE_ENV === "development" && (
                        <pre className="mt-12 max-w-full overflow-auto rounded-lg border border-border/40 bg-muted/50 p-4 text-left text-xs font-mono text-muted-foreground/70">
                            {this.state.error?.stack}
                        </pre>
                    )}
                </div>
            )
        }

        return this.props.children
    }
}
