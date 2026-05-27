import BrowseClientPage from "./client";

export default async function BrowsePage() {
    // We no longer need to fetch extensions or sources here because
    // they are already fetched in the root layout and available via
    // the global store. This avoids redundant queries and double waterfalls.
    return <BrowseClientPage />;
}
