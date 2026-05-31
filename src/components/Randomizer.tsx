import { Dices } from "lucide-react"
import { Button } from "./ui/button"

interface Props<T> {
    items: T[]
    onSelect: (i: T) => void
}
export function Randomizer<T>(props: Props<T>) {
    const onAction = () => {
        const randomIndex = Math.floor(Math.random() * props.items.length)
        props.onSelect(props.items[randomIndex])
    }
    return (
        <Button
            variant="outline"
            size="icon-sm"
            title="Randomizer"
            onClick={onAction}
        >
            <Dices className="size-4" />
        </Button>
    )
}
