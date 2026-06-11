import type { LibraryManga } from "./store"

const getTimeValue = (value: string): number => {
    const time = new Date(value).getTime()
    return isNaN(time) ? 0 : time
}

const sort = (a: LibraryManga, b: LibraryManga) => {
    const valA = a.lastReadChapter?.lastReadAt
    const valB = b.lastReadChapter?.lastReadAt
    return getTimeValue(valB) - getTimeValue(valA)
}

export const readLaterUtils = {
    sort,
}
