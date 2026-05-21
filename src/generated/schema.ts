// @ts-nocheck
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Scalars = {
    Boolean: boolean,
    Cursor: any,
    Duration: any,
    Float: number,
    Int: number,
    LongString: any,
    String: string,
    Upload: any,
}

export interface AboutServerPayload {
    buildTime: Scalars['LongString']
    buildType: Scalars['String']
    discord: Scalars['String']
    github: Scalars['String']
    name: Scalars['String']
    /** @deprecated The version includes the revision as the patch number */
    revision: Scalars['String']
    version: Scalars['String']
    __typename: 'AboutServerPayload'
}

export interface AboutWebUI {
    channel: WebUIChannel
    tag: Scalars['String']
    updateTimestamp: Scalars['LongString']
    __typename: 'AboutWebUI'
}

export type AuthMode = 'NONE' | 'BASIC_AUTH' | 'SIMPLE_LOGIN' | 'UI_LOGIN'

export type BackupRestoreState = 'IDLE' | 'SUCCESS' | 'FAILURE' | 'RESTORING_CATEGORIES' | 'RESTORING_MANGA' | 'RESTORING_META' | 'RESTORING_SETTINGS'

export interface BackupRestoreStatus {
    mangaProgress: Scalars['Int']
    state: BackupRestoreState
    totalManga: Scalars['Int']
    __typename: 'BackupRestoreStatus'
}

export interface BindTrackPayload {
    clientMutationId: (Scalars['String'] | null)
    trackRecord: TrackRecordType
    __typename: 'BindTrackPayload'
}

export interface CategoryEdge {
    cursor: Scalars['Cursor']
    node: CategoryType
    __typename: 'CategoryEdge'
}

export type CategoryJobStatus = 'UPDATING' | 'SKIPPED'

export interface CategoryMetaType {
    categoryId: Scalars['Int']
    key: Scalars['String']
    value: Scalars['String']
    category: CategoryType
    __typename: 'CategoryMetaType'
}

export interface CategoryNodeList {
    edges: CategoryEdge[]
    nodes: CategoryType[]
    pageInfo: PageInfo
    totalCount: Scalars['Int']
    __typename: 'CategoryNodeList'
}

export type CategoryOrderBy = 'ID' | 'NAME' | 'ORDER'

export interface CategoryType {
    default: Scalars['Boolean']
    id: Scalars['Int']
    includeInDownload: IncludeOrExclude
    includeInUpdate: IncludeOrExclude
    name: Scalars['String']
    order: Scalars['Int']
    mangas: MangaNodeList
    meta: CategoryMetaType[]
    __typename: 'CategoryType'
}

export interface CategoryUpdateType {
    category: CategoryType
    status: CategoryJobStatus
    __typename: 'CategoryUpdateType'
}

export type CbzMediaType = 'MODERN' | 'LEGACY' | 'COMPATIBLE'

export interface ChapterEdge {
    cursor: Scalars['Cursor']
    node: ChapterType
    __typename: 'ChapterEdge'
}

export interface ChapterMetaType {
    chapterId: Scalars['Int']
    key: Scalars['String']
    value: Scalars['String']
    chapter: ChapterType
    __typename: 'ChapterMetaType'
}

export interface ChapterNodeList {
    edges: ChapterEdge[]
    nodes: ChapterType[]
    pageInfo: PageInfo
    totalCount: Scalars['Int']
    __typename: 'ChapterNodeList'
}

export type ChapterOrderBy = 'ID' | 'SOURCE_ORDER' | 'NAME' | 'UPLOAD_DATE' | 'CHAPTER_NUMBER' | 'LAST_READ_AT' | 'FETCHED_AT'

export interface ChapterType {
    chapterNumber: Scalars['Float']
    fetchedAt: Scalars['LongString']
    id: Scalars['Int']
    isBookmarked: Scalars['Boolean']
    isDownloaded: Scalars['Boolean']
    isRead: Scalars['Boolean']
    lastPageRead: Scalars['Int']
    lastReadAt: Scalars['LongString']
    mangaId: Scalars['Int']
    name: Scalars['String']
    pageCount: Scalars['Int']
    realUrl: (Scalars['String'] | null)
    scanlator: (Scalars['String'] | null)
    sourceOrder: Scalars['Int']
    uploadDate: Scalars['LongString']
    url: Scalars['String']
    manga: MangaType
    meta: ChapterMetaType[]
    __typename: 'ChapterType'
}

export interface CheckBoxFilter {
    default: Scalars['Boolean']
    name: Scalars['String']
    __typename: 'CheckBoxFilter'
}

export interface CheckBoxPreference {
    currentValue: (Scalars['Boolean'] | null)
    default: Scalars['Boolean']
    enabled: Scalars['Boolean']
    key: (Scalars['String'] | null)
    summary: (Scalars['String'] | null)
    title: (Scalars['String'] | null)
    visible: Scalars['Boolean']
    __typename: 'CheckBoxPreference'
}

export interface CheckForServerUpdatesPayload {
    channel: Scalars['String']
    tag: Scalars['String']
    url: Scalars['String']
    __typename: 'CheckForServerUpdatesPayload'
}

export interface ClearCachedImagesPayload {
    cachedPages: (Scalars['Boolean'] | null)
    cachedThumbnails: (Scalars['Boolean'] | null)
    clientMutationId: (Scalars['String'] | null)
    downloadedThumbnails: (Scalars['Boolean'] | null)
    __typename: 'ClearCachedImagesPayload'
}

export interface ClearDownloaderPayload {
    clientMutationId: (Scalars['String'] | null)
    downloadStatus: DownloadStatus
    __typename: 'ClearDownloaderPayload'
}

export interface CreateBackupPayload {
    clientMutationId: (Scalars['String'] | null)
    url: Scalars['String']
    __typename: 'CreateBackupPayload'
}

export interface CreateCategoryPayload {
    category: CategoryType
    clientMutationId: (Scalars['String'] | null)
    __typename: 'CreateCategoryPayload'
}

export type DatabaseType = 'H2' | 'POSTGRESQL'

export interface DeleteCategoryMetaPayload {
    category: CategoryType
    clientMutationId: (Scalars['String'] | null)
    meta: (CategoryMetaType | null)
    __typename: 'DeleteCategoryMetaPayload'
}

export interface DeleteCategoryMetasPayload {
    categories: CategoryType[]
    clientMutationId: (Scalars['String'] | null)
    metas: CategoryMetaType[]
    __typename: 'DeleteCategoryMetasPayload'
}

export interface DeleteCategoryPayload {
    category: (CategoryType | null)
    clientMutationId: (Scalars['String'] | null)
    mangas: MangaType[]
    __typename: 'DeleteCategoryPayload'
}

export interface DeleteChapterMetaPayload {
    chapter: ChapterType
    clientMutationId: (Scalars['String'] | null)
    meta: (ChapterMetaType | null)
    __typename: 'DeleteChapterMetaPayload'
}

export interface DeleteChapterMetasPayload {
    chapters: ChapterType[]
    clientMutationId: (Scalars['String'] | null)
    metas: ChapterMetaType[]
    __typename: 'DeleteChapterMetasPayload'
}

export interface DeleteDownloadedChapterPayload {
    chapters: ChapterType
    clientMutationId: (Scalars['String'] | null)
    __typename: 'DeleteDownloadedChapterPayload'
}

export interface DeleteDownloadedChaptersPayload {
    chapters: ChapterType[]
    clientMutationId: (Scalars['String'] | null)
    __typename: 'DeleteDownloadedChaptersPayload'
}

export interface DeleteGlobalMetaPayload {
    clientMutationId: (Scalars['String'] | null)
    meta: (GlobalMetaType | null)
    __typename: 'DeleteGlobalMetaPayload'
}

export interface DeleteGlobalMetasPayload {
    clientMutationId: (Scalars['String'] | null)
    metas: GlobalMetaType[]
    __typename: 'DeleteGlobalMetasPayload'
}

export interface DeleteMangaMetaPayload {
    clientMutationId: (Scalars['String'] | null)
    manga: MangaType
    meta: (MangaMetaType | null)
    __typename: 'DeleteMangaMetaPayload'
}

export interface DeleteMangaMetasPayload {
    clientMutationId: (Scalars['String'] | null)
    mangas: MangaType[]
    metas: MangaMetaType[]
    __typename: 'DeleteMangaMetasPayload'
}

export interface DeleteSourceMetaPayload {
    clientMutationId: (Scalars['String'] | null)
    meta: (SourceMetaType | null)
    source: (SourceType | null)
    __typename: 'DeleteSourceMetaPayload'
}

export interface DeleteSourceMetasPayload {
    clientMutationId: (Scalars['String'] | null)
    metas: SourceMetaType[]
    sources: SourceType[]
    __typename: 'DeleteSourceMetasPayload'
}

export interface DequeueChapterDownloadPayload {
    clientMutationId: (Scalars['String'] | null)
    downloadStatus: DownloadStatus
    __typename: 'DequeueChapterDownloadPayload'
}

export interface DequeueChapterDownloadsPayload {
    clientMutationId: (Scalars['String'] | null)
    downloadStatus: DownloadStatus
    __typename: 'DequeueChapterDownloadsPayload'
}

export interface DownloadEdge {
    cursor: Scalars['Cursor']
    node: DownloadType
    __typename: 'DownloadEdge'
}

export interface DownloadNodeList {
    edges: DownloadEdge[]
    nodes: DownloadType[]
    pageInfo: PageInfo
    totalCount: Scalars['Int']
    __typename: 'DownloadNodeList'
}

export type DownloadState = 'QUEUED' | 'DOWNLOADING' | 'FINISHED' | 'ERROR'

export interface DownloadStatus {
    queue: DownloadType[]
    state: DownloaderState
    __typename: 'DownloadStatus'
}

export interface DownloadType {
    position: Scalars['Int']
    progress: Scalars['Float']
    state: DownloadState
    tries: Scalars['Int']
    chapter: ChapterType
    manga: MangaType
    __typename: 'DownloadType'
}

export interface DownloadUpdate {
    download: DownloadType
    type: DownloadUpdateType
    __typename: 'DownloadUpdate'
}

export type DownloadUpdateType = 'QUEUED' | 'DEQUEUED' | 'PAUSED' | 'STOPPED' | 'PROGRESS' | 'FINISHED' | 'ERROR' | 'POSITION'

export interface DownloadUpdates {
    /** The current download queue at the time of sending initial message. Is null for all following messages */
    initial: (DownloadType[] | null)
    /** Indicates whether updates have been omitted based on the "maxUpdates" subscription variable. In case updates have been omitted, the "downloadStatus" query should be re-fetched. */
    omittedUpdates: Scalars['Boolean']
    state: DownloaderState
    updates: DownloadUpdate[]
    __typename: 'DownloadUpdates'
}

export type DownloaderState = 'STARTED' | 'STOPPED'

export type Edge = (CategoryEdge | ChapterEdge | DownloadEdge | ExtensionEdge | MangaEdge | MetaEdge | SourceEdge | TrackRecordEdge | TrackerEdge) & { __isUnion?: true }

export interface EditTextPreference {
    currentValue: (Scalars['String'] | null)
    default: (Scalars['String'] | null)
    dialogMessage: (Scalars['String'] | null)
    dialogTitle: (Scalars['String'] | null)
    enabled: Scalars['Boolean']
    key: (Scalars['String'] | null)
    summary: (Scalars['String'] | null)
    text: (Scalars['String'] | null)
    title: (Scalars['String'] | null)
    visible: Scalars['Boolean']
    __typename: 'EditTextPreference'
}

export interface EnqueueChapterDownloadPayload {
    clientMutationId: (Scalars['String'] | null)
    downloadStatus: DownloadStatus
    __typename: 'EnqueueChapterDownloadPayload'
}

export interface EnqueueChapterDownloadsPayload {
    clientMutationId: (Scalars['String'] | null)
    downloadStatus: DownloadStatus
    __typename: 'EnqueueChapterDownloadsPayload'
}

export interface ExtensionEdge {
    cursor: Scalars['Cursor']
    node: ExtensionType
    __typename: 'ExtensionEdge'
}

export interface ExtensionNodeList {
    edges: ExtensionEdge[]
    nodes: ExtensionType[]
    pageInfo: PageInfo
    totalCount: Scalars['Int']
    __typename: 'ExtensionNodeList'
}

export type ExtensionOrderBy = 'PKG_NAME' | 'NAME' | 'APK_NAME'

export interface ExtensionType {
    apkName: Scalars['String']
    hasUpdate: Scalars['Boolean']
    iconUrl: Scalars['String']
    isInstalled: Scalars['Boolean']
    isNsfw: Scalars['Boolean']
    isObsolete: Scalars['Boolean']
    lang: Scalars['String']
    name: Scalars['String']
    pkgName: Scalars['String']
    repo: (Scalars['String'] | null)
    versionCode: Scalars['Int']
    versionName: Scalars['String']
    source: SourceNodeList
    __typename: 'ExtensionType'
}

export interface FetchChapterPagesPayload {
    chapter: ChapterType
    clientMutationId: (Scalars['String'] | null)
    pages: Scalars['String'][]
    syncConflict: (SyncConflictInfoType | null)
    __typename: 'FetchChapterPagesPayload'
}

export interface FetchChaptersPayload {
    chapters: ChapterType[]
    clientMutationId: (Scalars['String'] | null)
    __typename: 'FetchChaptersPayload'
}

export interface FetchExtensionsPayload {
    clientMutationId: (Scalars['String'] | null)
    extensions: ExtensionType[]
    __typename: 'FetchExtensionsPayload'
}

export interface FetchMangaPayload {
    clientMutationId: (Scalars['String'] | null)
    manga: MangaType
    __typename: 'FetchMangaPayload'
}

export interface FetchSourceMangaPayload {
    clientMutationId: (Scalars['String'] | null)
    hasNextPage: Scalars['Boolean']
    mangas: MangaType[]
    __typename: 'FetchSourceMangaPayload'
}

export type FetchSourceMangaType = 'SEARCH' | 'POPULAR' | 'LATEST'

export interface FetchTrackPayload {
    clientMutationId: (Scalars['String'] | null)
    trackRecord: TrackRecordType
    __typename: 'FetchTrackPayload'
}

export type Filter = (CheckBoxFilter | GroupFilter | HeaderFilter | SelectFilter | SeparatorFilter | SortFilter | TextFilter | TriStateFilter) & { __isUnion?: true }

export interface GlobalMetaNodeList {
    edges: MetaEdge[]
    nodes: GlobalMetaType[]
    pageInfo: PageInfo
    totalCount: Scalars['Int']
    __typename: 'GlobalMetaNodeList'
}

export interface GlobalMetaType {
    key: Scalars['String']
    value: Scalars['String']
    __typename: 'GlobalMetaType'
}

export interface GroupFilter {
    filters: Filter[]
    name: Scalars['String']
    __typename: 'GroupFilter'
}

export interface HeaderFilter {
    name: Scalars['String']
    __typename: 'HeaderFilter'
}

export type IncludeOrExclude = 'EXCLUDE' | 'INCLUDE' | 'UNSET'

export interface InstallExternalExtensionPayload {
    clientMutationId: (Scalars['String'] | null)
    extension: ExtensionType
    __typename: 'InstallExternalExtensionPayload'
}

export interface KoSyncConnectPayload {
    clientMutationId: (Scalars['String'] | null)
    message: (Scalars['String'] | null)
    status: KoSyncStatusPayload
    __typename: 'KoSyncConnectPayload'
}

export interface KoSyncStatusPayload {
    isLoggedIn: Scalars['Boolean']
    serverAddress: (Scalars['String'] | null)
    username: (Scalars['String'] | null)
    __typename: 'KoSyncStatusPayload'
}

export type KoreaderSyncChecksumMethod = 'BINARY' | 'FILENAME'

export type KoreaderSyncConflictStrategy = 'PROMPT' | 'KEEP_LOCAL' | 'KEEP_REMOTE' | 'DISABLED'

export type KoreaderSyncLegacyStrategy = 'PROMPT' | 'SILENT' | 'SEND' | 'RECEIVE' | 'DISABLED'

export interface LastUpdateTimestampPayload {
    timestamp: Scalars['LongString']
    __typename: 'LastUpdateTimestampPayload'
}

export interface LibraryUpdateStatus {
    categoryUpdates: CategoryUpdateType[]
    jobsInfo: UpdaterJobsInfoType
    mangaUpdates: MangaUpdateType[]
    __typename: 'LibraryUpdateStatus'
}

export interface ListPreference {
    currentValue: (Scalars['String'] | null)
    default: (Scalars['String'] | null)
    enabled: Scalars['Boolean']
    entries: Scalars['String'][]
    entryValues: Scalars['String'][]
    key: (Scalars['String'] | null)
    summary: (Scalars['String'] | null)
    title: (Scalars['String'] | null)
    visible: Scalars['Boolean']
    __typename: 'ListPreference'
}

export interface LoginPayload {
    accessToken: Scalars['String']
    clientMutationId: (Scalars['String'] | null)
    refreshToken: Scalars['String']
    __typename: 'LoginPayload'
}

export interface LoginTrackerCredentialsPayload {
    clientMutationId: (Scalars['String'] | null)
    isLoggedIn: Scalars['Boolean']
    tracker: TrackerType
    __typename: 'LoginTrackerCredentialsPayload'
}

export interface LoginTrackerOAuthPayload {
    clientMutationId: (Scalars['String'] | null)
    isLoggedIn: Scalars['Boolean']
    tracker: TrackerType
    __typename: 'LoginTrackerOAuthPayload'
}

export interface LogoutKoSyncAccountPayload {
    clientMutationId: (Scalars['String'] | null)
    status: KoSyncStatusPayload
    __typename: 'LogoutKoSyncAccountPayload'
}

export interface LogoutTrackerPayload {
    clientMutationId: (Scalars['String'] | null)
    isLoggedIn: Scalars['Boolean']
    tracker: TrackerType
    __typename: 'LogoutTrackerPayload'
}

export interface MangaEdge {
    cursor: Scalars['Cursor']
    node: MangaType
    __typename: 'MangaEdge'
}

export type MangaJobStatus = 'PENDING' | 'RUNNING' | 'COMPLETE' | 'FAILED' | 'SKIPPED'

export interface MangaMetaType {
    key: Scalars['String']
    mangaId: Scalars['Int']
    value: Scalars['String']
    manga: MangaType
    __typename: 'MangaMetaType'
}

export interface MangaNodeList {
    edges: MangaEdge[]
    nodes: MangaType[]
    pageInfo: PageInfo
    totalCount: Scalars['Int']
    __typename: 'MangaNodeList'
}

export type MangaOrderBy = 'ID' | 'TITLE' | 'IN_LIBRARY_AT' | 'LAST_FETCHED_AT'

export type MangaStatus = 'UNKNOWN' | 'ONGOING' | 'COMPLETED' | 'LICENSED' | 'PUBLISHING_FINISHED' | 'CANCELLED' | 'ON_HIATUS'

export interface MangaType {
    artist: (Scalars['String'] | null)
    author: (Scalars['String'] | null)
    chaptersLastFetchedAt: (Scalars['LongString'] | null)
    description: (Scalars['String'] | null)
    genre: Scalars['String'][]
    id: Scalars['Int']
    inLibrary: Scalars['Boolean']
    inLibraryAt: Scalars['LongString']
    initialized: Scalars['Boolean']
    lastFetchedAt: (Scalars['LongString'] | null)
    realUrl: (Scalars['String'] | null)
    sourceId: Scalars['LongString']
    status: MangaStatus
    thumbnailUrl: (Scalars['String'] | null)
    thumbnailUrlLastFetched: (Scalars['LongString'] | null)
    title: Scalars['String']
    updateStrategy: UpdateStrategy
    url: Scalars['String']
    age: (Scalars['LongString'] | null)
    bookmarkCount: Scalars['Int']
    categories: CategoryNodeList
    chapters: ChapterNodeList
    chaptersAge: (Scalars['LongString'] | null)
    downloadCount: Scalars['Int']
    firstUnreadChapter: (ChapterType | null)
    hasDuplicateChapters: Scalars['Boolean']
    highestNumberedChapter: (ChapterType | null)
    lastReadChapter: (ChapterType | null)
    latestFetchedChapter: (ChapterType | null)
    latestReadChapter: (ChapterType | null)
    latestUploadedChapter: (ChapterType | null)
    meta: MangaMetaType[]
    source: (SourceType | null)
    trackRecords: TrackRecordNodeList
    unreadCount: Scalars['Int']
    __typename: 'MangaType'
}

export interface MangaUpdateType {
    status: MangaJobStatus
    manga: MangaType
    __typename: 'MangaUpdateType'
}

export interface MetaEdge {
    cursor: Scalars['Cursor']
    node: GlobalMetaType
    __typename: 'MetaEdge'
}

export type MetaOrderBy = 'KEY' | 'VALUE'

export type MetaType = (CategoryMetaType | ChapterMetaType | GlobalMetaType | MangaMetaType | SourceMetaType) & { __isUnion?: true }

export interface MultiSelectListPreference {
    currentValue: (Scalars['String'][] | null)
    default: (Scalars['String'][] | null)
    dialogMessage: (Scalars['String'] | null)
    dialogTitle: (Scalars['String'] | null)
    enabled: Scalars['Boolean']
    entries: Scalars['String'][]
    entryValues: Scalars['String'][]
    key: (Scalars['String'] | null)
    summary: (Scalars['String'] | null)
    title: (Scalars['String'] | null)
    visible: Scalars['Boolean']
    __typename: 'MultiSelectListPreference'
}

export interface Mutation {
    createBackup: CreateBackupPayload
    restoreBackup: RestoreBackupPayload
    createCategory: (CreateCategoryPayload | null)
    deleteCategory: (DeleteCategoryPayload | null)
    deleteCategoryMeta: (DeleteCategoryMetaPayload | null)
    deleteCategoryMetas: (DeleteCategoryMetasPayload | null)
    setCategoryMeta: (SetCategoryMetaPayload | null)
    setCategoryMetas: (SetCategoryMetasPayload | null)
    updateCategories: (UpdateCategoriesPayload | null)
    updateCategory: (UpdateCategoryPayload | null)
    updateCategoryOrder: (UpdateCategoryOrderPayload | null)
    updateMangaCategories: (UpdateMangaCategoriesPayload | null)
    updateMangasCategories: (UpdateMangasCategoriesPayload | null)
    deleteChapterMeta: (DeleteChapterMetaPayload | null)
    deleteChapterMetas: (DeleteChapterMetasPayload | null)
    fetchChapterPages: (FetchChapterPagesPayload | null)
    fetchChapters: (FetchChaptersPayload | null)
    setChapterMeta: (SetChapterMetaPayload | null)
    setChapterMetas: (SetChapterMetasPayload | null)
    updateChapter: (UpdateChapterPayload | null)
    updateChapters: (UpdateChaptersPayload | null)
    clearDownloader: (ClearDownloaderPayload | null)
    deleteDownloadedChapter: (DeleteDownloadedChapterPayload | null)
    deleteDownloadedChapters: (DeleteDownloadedChaptersPayload | null)
    dequeueChapterDownload: (DequeueChapterDownloadPayload | null)
    dequeueChapterDownloads: (DequeueChapterDownloadsPayload | null)
    enqueueChapterDownload: (EnqueueChapterDownloadPayload | null)
    enqueueChapterDownloads: (EnqueueChapterDownloadsPayload | null)
    reorderChapterDownload: (ReorderChapterDownloadPayload | null)
    startDownloader: (StartDownloaderPayload | null)
    stopDownloader: (StopDownloaderPayload | null)
    fetchExtensions: (FetchExtensionsPayload | null)
    installExternalExtension: (InstallExternalExtensionPayload | null)
    updateExtension: (UpdateExtensionPayload | null)
    updateExtensions: (UpdateExtensionsPayload | null)
    clearCachedImages: ClearCachedImagesPayload
    resetWebUIUpdateStatus: (WebUIUpdateStatus | null)
    updateWebUI: (WebUIUpdatePayload | null)
    connectKoSyncAccount: KoSyncConnectPayload
    logoutKoSyncAccount: LogoutKoSyncAccountPayload
    pullKoSyncProgress: (PullKoSyncProgressPayload | null)
    pushKoSyncProgress: (PushKoSyncProgressPayload | null)
    deleteMangaMeta: (DeleteMangaMetaPayload | null)
    deleteMangaMetas: (DeleteMangaMetasPayload | null)
    fetchManga: (FetchMangaPayload | null)
    setMangaMeta: (SetMangaMetaPayload | null)
    setMangaMetas: (SetMangaMetasPayload | null)
    updateManga: (UpdateMangaPayload | null)
    updateMangas: (UpdateMangasPayload | null)
    deleteGlobalMeta: (DeleteGlobalMetaPayload | null)
    deleteGlobalMetas: (DeleteGlobalMetasPayload | null)
    setGlobalMeta: (SetGlobalMetaPayload | null)
    setGlobalMetas: (SetGlobalMetasPayload | null)
    resetSettings: ResetSettingsPayload
    setSettings: SetSettingsPayload
    deleteSourceMeta: (DeleteSourceMetaPayload | null)
    deleteSourceMetas: (DeleteSourceMetasPayload | null)
    fetchSourceManga: (FetchSourceMangaPayload | null)
    setSourceMeta: (SetSourceMetaPayload | null)
    setSourceMetas: (SetSourceMetasPayload | null)
    updateSourcePreference: (UpdateSourcePreferencePayload | null)
    bindTrack: BindTrackPayload
    fetchTrack: FetchTrackPayload
    loginTrackerCredentials: LoginTrackerCredentialsPayload
    loginTrackerOAuth: LoginTrackerOAuthPayload
    logoutTracker: LogoutTrackerPayload
    trackProgress: (TrackProgressPayload | null)
    unbindTrack: UnbindTrackPayload
    updateTrack: UpdateTrackPayload
    updateCategoryManga: (UpdateCategoryMangaPayload | null)
    updateLibrary: (UpdateLibraryPayload | null)
    updateLibraryManga: (UpdateLibraryMangaPayload | null)
    updateStop: UpdateStopPayload
    login: LoginPayload
    refreshToken: RefreshTokenPayload
    __typename: 'Mutation'
}

export type Node = (CategoryMetaType | CategoryType | ChapterMetaType | ChapterType | DownloadType | DownloadUpdate | ExtensionType | GlobalMetaType | MangaMetaType | MangaType | PartialSettingsType | SettingsType | SourceMetaType | SourceType | TrackRecordType | TrackerType) & { __isUnion?: true }

export type NodeList = (CategoryNodeList | ChapterNodeList | DownloadNodeList | ExtensionNodeList | GlobalMetaNodeList | MangaNodeList | SourceNodeList | TrackRecordNodeList | TrackerNodeList) & { __isUnion?: true }

export interface PageInfo {
    /** When paginating forwards, the cursor to continue. */
    endCursor: (Scalars['Cursor'] | null)
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean']
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean']
    /** When paginating backwards, the cursor to continue. */
    startCursor: (Scalars['Cursor'] | null)
    __typename: 'PageInfo'
}

export interface PartialSettingsType {
    authMode: (AuthMode | null)
    authPassword: (Scalars['String'] | null)
    authUsername: (Scalars['String'] | null)
    autoBackupIncludeCategories: (Scalars['Boolean'] | null)
    autoBackupIncludeChapters: (Scalars['Boolean'] | null)
    autoBackupIncludeClientData: (Scalars['Boolean'] | null)
    autoBackupIncludeHistory: (Scalars['Boolean'] | null)
    autoBackupIncludeManga: (Scalars['Boolean'] | null)
    autoBackupIncludeServerSettings: (Scalars['Boolean'] | null)
    autoBackupIncludeTracking: (Scalars['Boolean'] | null)
    /** @deprecated Replaced with autoDownloadNewChaptersLimit, replace with autoDownloadNewChaptersLimit */
    autoDownloadAheadLimit: (Scalars['Int'] | null)
    autoDownloadIgnoreReUploads: (Scalars['Boolean'] | null)
    autoDownloadNewChapters: (Scalars['Boolean'] | null)
    autoDownloadNewChaptersLimit: (Scalars['Int'] | null)
    backupInterval: (Scalars['Int'] | null)
    backupPath: (Scalars['String'] | null)
    backupTTL: (Scalars['Int'] | null)
    backupTime: (Scalars['String'] | null)
    /** @deprecated Removed - prefer authMode, replace with authMode */
    basicAuthEnabled: (Scalars['Boolean'] | null)
    /** @deprecated Removed - prefer authPassword, replace with authPassword */
    basicAuthPassword: (Scalars['String'] | null)
    /** @deprecated Removed - prefer authUsername, replace with authUsername */
    basicAuthUsername: (Scalars['String'] | null)
    databasePassword: (Scalars['String'] | null)
    databaseType: (DatabaseType | null)
    databaseUrl: (Scalars['String'] | null)
    databaseUsername: (Scalars['String'] | null)
    debugLogsEnabled: (Scalars['Boolean'] | null)
    downloadAsCbz: (Scalars['Boolean'] | null)
    downloadConversions: (SettingsDownloadConversionType[] | null)
    downloadsPath: (Scalars['String'] | null)
    electronPath: (Scalars['String'] | null)
    excludeCompleted: (Scalars['Boolean'] | null)
    excludeEntryWithUnreadChapters: (Scalars['Boolean'] | null)
    excludeNotStarted: (Scalars['Boolean'] | null)
    excludeUnreadChapters: (Scalars['Boolean'] | null)
    extensionRepos: (Scalars['String'][] | null)
    flareSolverrAsResponseFallback: (Scalars['Boolean'] | null)
    flareSolverrEnabled: (Scalars['Boolean'] | null)
    flareSolverrSessionName: (Scalars['String'] | null)
    flareSolverrSessionTtl: (Scalars['Int'] | null)
    flareSolverrTimeout: (Scalars['Int'] | null)
    flareSolverrUrl: (Scalars['String'] | null)
    globalUpdateInterval: (Scalars['Float'] | null)
    /** @deprecated Removed - does not do anything */
    gqlDebugLogsEnabled: (Scalars['Boolean'] | null)
    initialOpenInBrowserEnabled: (Scalars['Boolean'] | null)
    ip: (Scalars['String'] | null)
    jwtAudience: (Scalars['String'] | null)
    jwtRefreshExpiry: (Scalars['Duration'] | null)
    jwtTokenExpiry: (Scalars['Duration'] | null)
    koreaderSyncChecksumMethod: (KoreaderSyncChecksumMethod | null)
    /** @deprecated Moved to preference store. Is supposed to be random and gets auto generated, replace with MOVE TO PREFERENCES */
    koreaderSyncDeviceId: (Scalars['String'] | null)
    koreaderSyncPercentageTolerance: (Scalars['Float'] | null)
    /** @deprecated Moved to preference store. User is supposed to use a login/logout mutation, replace with MOVE TO PREFERENCES */
    koreaderSyncServerUrl: (Scalars['String'] | null)
    /** @deprecated Replaced with koreaderSyncStrategyForward and koreaderSyncStrategyBackward, replace with koreaderSyncStrategyForward, koreaderSyncStrategyBackward */
    koreaderSyncStrategy: (KoreaderSyncLegacyStrategy | null)
    koreaderSyncStrategyBackward: (KoreaderSyncConflictStrategy | null)
    koreaderSyncStrategyForward: (KoreaderSyncConflictStrategy | null)
    /** @deprecated Moved to preference store. User is supposed to use a login/logout mutation, replace with MOVE TO PREFERENCES */
    koreaderSyncUserkey: (Scalars['String'] | null)
    /** @deprecated Moved to preference store. User is supposed to use a login/logout mutation, replace with MOVE TO PREFERENCES */
    koreaderSyncUsername: (Scalars['String'] | null)
    localSourcePath: (Scalars['String'] | null)
    maxLogFileSize: (Scalars['String'] | null)
    maxLogFiles: (Scalars['Int'] | null)
    maxLogFolderSize: (Scalars['String'] | null)
    maxSourcesInParallel: (Scalars['Int'] | null)
    opdsCbzMimetype: (CbzMediaType | null)
    opdsChapterSortOrder: (SortOrder | null)
    opdsEnablePageReadProgress: (Scalars['Boolean'] | null)
    opdsItemsPerPage: (Scalars['Int'] | null)
    opdsMarkAsReadOnDownload: (Scalars['Boolean'] | null)
    opdsShowOnlyDownloadedChapters: (Scalars['Boolean'] | null)
    opdsShowOnlyUnreadChapters: (Scalars['Boolean'] | null)
    opdsUseBinaryFileSizes: (Scalars['Boolean'] | null)
    port: (Scalars['Int'] | null)
    serveConversions: (SettingsDownloadConversionType[] | null)
    socksProxyEnabled: (Scalars['Boolean'] | null)
    socksProxyHost: (Scalars['String'] | null)
    socksProxyPassword: (Scalars['String'] | null)
    socksProxyPort: (Scalars['String'] | null)
    socksProxyUsername: (Scalars['String'] | null)
    socksProxyVersion: (Scalars['Int'] | null)
    systemTrayEnabled: (Scalars['Boolean'] | null)
    updateMangas: (Scalars['Boolean'] | null)
    useHikariConnectionPool: (Scalars['Boolean'] | null)
    webUIChannel: (WebUIChannel | null)
    webUIFlavor: (WebUIFlavor | null)
    webUIInterface: (WebUIInterface | null)
    webUIUpdateCheckInterval: (Scalars['Float'] | null)
    __typename: 'PartialSettingsType'
}

export type Preference = (CheckBoxPreference | EditTextPreference | ListPreference | MultiSelectListPreference | SwitchPreference) & { __isUnion?: true }

export interface PullKoSyncProgressPayload {
    chapter: (ChapterType | null)
    clientMutationId: (Scalars['String'] | null)
    syncConflict: (SyncConflictInfoType | null)
    __typename: 'PullKoSyncProgressPayload'
}

export interface PushKoSyncProgressPayload {
    chapter: (ChapterType | null)
    clientMutationId: (Scalars['String'] | null)
    success: Scalars['Boolean']
    __typename: 'PushKoSyncProgressPayload'
}

export interface Query {
    restoreStatus: (BackupRestoreStatus | null)
    validateBackup: ValidateBackupResult
    categories: CategoryNodeList
    category: CategoryType
    chapter: ChapterType
    chapters: ChapterNodeList
    downloadStatus: DownloadStatus
    extension: ExtensionType
    extensions: ExtensionNodeList
    aboutServer: AboutServerPayload
    aboutWebUI: AboutWebUI
    checkForServerUpdates: CheckForServerUpdatesPayload[]
    checkForWebUIUpdate: WebUIUpdateCheck
    getWebUIUpdateStatus: WebUIUpdateStatus
    koSyncStatus: KoSyncStatusPayload
    manga: MangaType
    mangas: MangaNodeList
    meta: GlobalMetaType
    metas: GlobalMetaNodeList
    settings: SettingsType
    source: SourceType
    sources: SourceNodeList
    searchTracker: SearchTrackerPayload
    trackRecord: TrackRecordType
    trackRecords: TrackRecordNodeList
    tracker: TrackerType
    trackers: TrackerNodeList
    lastUpdateTimestamp: LastUpdateTimestampPayload
    libraryUpdateStatus: LibraryUpdateStatus
    /** @deprecated Replaced with libraryUpdateStatus, replace with libraryUpdateStatus */
    updateStatus: UpdateStatus
    __typename: 'Query'
}

export interface RefreshTokenPayload {
    accessToken: Scalars['String']
    clientMutationId: (Scalars['String'] | null)
    __typename: 'RefreshTokenPayload'
}

export interface ReorderChapterDownloadPayload {
    clientMutationId: (Scalars['String'] | null)
    downloadStatus: DownloadStatus
    __typename: 'ReorderChapterDownloadPayload'
}

export interface ResetSettingsPayload {
    clientMutationId: (Scalars['String'] | null)
    settings: SettingsType
    __typename: 'ResetSettingsPayload'
}

export interface RestoreBackupPayload {
    clientMutationId: (Scalars['String'] | null)
    id: Scalars['String']
    status: (BackupRestoreStatus | null)
    __typename: 'RestoreBackupPayload'
}

export interface SearchTrackerPayload {
    trackSearches: TrackSearchType[]
    __typename: 'SearchTrackerPayload'
}

export interface SelectFilter {
    default: Scalars['Int']
    name: Scalars['String']
    values: Scalars['String'][]
    __typename: 'SelectFilter'
}

export interface SeparatorFilter {
    name: Scalars['String']
    __typename: 'SeparatorFilter'
}

export interface SetCategoryMetaPayload {
    clientMutationId: (Scalars['String'] | null)
    meta: CategoryMetaType
    __typename: 'SetCategoryMetaPayload'
}

export interface SetCategoryMetasPayload {
    categories: CategoryType[]
    clientMutationId: (Scalars['String'] | null)
    metas: CategoryMetaType[]
    __typename: 'SetCategoryMetasPayload'
}

export interface SetChapterMetaPayload {
    clientMutationId: (Scalars['String'] | null)
    meta: ChapterMetaType
    __typename: 'SetChapterMetaPayload'
}

export interface SetChapterMetasPayload {
    chapters: ChapterType[]
    clientMutationId: (Scalars['String'] | null)
    metas: ChapterMetaType[]
    __typename: 'SetChapterMetasPayload'
}

export interface SetGlobalMetaPayload {
    clientMutationId: (Scalars['String'] | null)
    meta: GlobalMetaType
    __typename: 'SetGlobalMetaPayload'
}

export interface SetGlobalMetasPayload {
    clientMutationId: (Scalars['String'] | null)
    metas: GlobalMetaType[]
    __typename: 'SetGlobalMetasPayload'
}

export interface SetMangaMetaPayload {
    clientMutationId: (Scalars['String'] | null)
    meta: MangaMetaType
    __typename: 'SetMangaMetaPayload'
}

export interface SetMangaMetasPayload {
    clientMutationId: (Scalars['String'] | null)
    mangas: MangaType[]
    metas: MangaMetaType[]
    __typename: 'SetMangaMetasPayload'
}

export interface SetSettingsPayload {
    clientMutationId: (Scalars['String'] | null)
    settings: SettingsType
    __typename: 'SetSettingsPayload'
}

export interface SetSourceMetaPayload {
    clientMutationId: (Scalars['String'] | null)
    meta: SourceMetaType
    __typename: 'SetSourceMetaPayload'
}

export interface SetSourceMetasPayload {
    clientMutationId: (Scalars['String'] | null)
    metas: SourceMetaType[]
    sources: SourceType[]
    __typename: 'SetSourceMetasPayload'
}

export type Settings = (PartialSettingsType | SettingsType) & { __isUnion?: true }

export type SettingsDownloadConversion = (SettingsDownloadConversionType) & { __isUnion?: true }

export type SettingsDownloadConversionHeader = (SettingsDownloadConversionHeaderType) & { __isUnion?: true }

export interface SettingsDownloadConversionHeaderType {
    name: Scalars['String']
    value: Scalars['String']
    __typename: 'SettingsDownloadConversionHeaderType'
}

export interface SettingsDownloadConversionType {
    callTimeout: (Scalars['Duration'] | null)
    compressionLevel: (Scalars['Float'] | null)
    connectTimeout: (Scalars['Duration'] | null)
    headers: (SettingsDownloadConversionHeaderType[] | null)
    mimeType: Scalars['String']
    target: Scalars['String']
    __typename: 'SettingsDownloadConversionType'
}

export interface SettingsType {
    authMode: AuthMode
    authPassword: Scalars['String']
    authUsername: Scalars['String']
    autoBackupIncludeCategories: Scalars['Boolean']
    autoBackupIncludeChapters: Scalars['Boolean']
    autoBackupIncludeClientData: Scalars['Boolean']
    autoBackupIncludeHistory: Scalars['Boolean']
    autoBackupIncludeManga: Scalars['Boolean']
    autoBackupIncludeServerSettings: Scalars['Boolean']
    autoBackupIncludeTracking: Scalars['Boolean']
    /** @deprecated Replaced with autoDownloadNewChaptersLimit, replace with autoDownloadNewChaptersLimit */
    autoDownloadAheadLimit: Scalars['Int']
    autoDownloadIgnoreReUploads: Scalars['Boolean']
    autoDownloadNewChapters: Scalars['Boolean']
    autoDownloadNewChaptersLimit: Scalars['Int']
    backupInterval: Scalars['Int']
    backupPath: Scalars['String']
    backupTTL: Scalars['Int']
    backupTime: Scalars['String']
    /** @deprecated Removed - prefer authMode, replace with authMode */
    basicAuthEnabled: Scalars['Boolean']
    /** @deprecated Removed - prefer authPassword, replace with authPassword */
    basicAuthPassword: Scalars['String']
    /** @deprecated Removed - prefer authUsername, replace with authUsername */
    basicAuthUsername: Scalars['String']
    databasePassword: Scalars['String']
    databaseType: DatabaseType
    databaseUrl: Scalars['String']
    databaseUsername: Scalars['String']
    debugLogsEnabled: Scalars['Boolean']
    downloadAsCbz: Scalars['Boolean']
    downloadConversions: SettingsDownloadConversionType[]
    downloadsPath: Scalars['String']
    electronPath: Scalars['String']
    excludeCompleted: Scalars['Boolean']
    excludeEntryWithUnreadChapters: Scalars['Boolean']
    excludeNotStarted: Scalars['Boolean']
    excludeUnreadChapters: Scalars['Boolean']
    extensionRepos: Scalars['String'][]
    flareSolverrAsResponseFallback: Scalars['Boolean']
    flareSolverrEnabled: Scalars['Boolean']
    flareSolverrSessionName: Scalars['String']
    flareSolverrSessionTtl: Scalars['Int']
    flareSolverrTimeout: Scalars['Int']
    flareSolverrUrl: Scalars['String']
    globalUpdateInterval: Scalars['Float']
    /** @deprecated Removed - does not do anything */
    gqlDebugLogsEnabled: Scalars['Boolean']
    initialOpenInBrowserEnabled: Scalars['Boolean']
    ip: Scalars['String']
    jwtAudience: Scalars['String']
    jwtRefreshExpiry: Scalars['Duration']
    jwtTokenExpiry: Scalars['Duration']
    koreaderSyncChecksumMethod: KoreaderSyncChecksumMethod
    /** @deprecated Moved to preference store. Is supposed to be random and gets auto generated, replace with MOVE TO PREFERENCES */
    koreaderSyncDeviceId: Scalars['String']
    koreaderSyncPercentageTolerance: Scalars['Float']
    /** @deprecated Moved to preference store. User is supposed to use a login/logout mutation, replace with MOVE TO PREFERENCES */
    koreaderSyncServerUrl: Scalars['String']
    /** @deprecated Replaced with koreaderSyncStrategyForward and koreaderSyncStrategyBackward, replace with koreaderSyncStrategyForward, koreaderSyncStrategyBackward */
    koreaderSyncStrategy: KoreaderSyncLegacyStrategy
    koreaderSyncStrategyBackward: KoreaderSyncConflictStrategy
    koreaderSyncStrategyForward: KoreaderSyncConflictStrategy
    /** @deprecated Moved to preference store. User is supposed to use a login/logout mutation, replace with MOVE TO PREFERENCES */
    koreaderSyncUserkey: Scalars['String']
    /** @deprecated Moved to preference store. User is supposed to use a login/logout mutation, replace with MOVE TO PREFERENCES */
    koreaderSyncUsername: Scalars['String']
    localSourcePath: Scalars['String']
    maxLogFileSize: Scalars['String']
    maxLogFiles: Scalars['Int']
    maxLogFolderSize: Scalars['String']
    maxSourcesInParallel: Scalars['Int']
    opdsCbzMimetype: CbzMediaType
    opdsChapterSortOrder: SortOrder
    opdsEnablePageReadProgress: Scalars['Boolean']
    opdsItemsPerPage: Scalars['Int']
    opdsMarkAsReadOnDownload: Scalars['Boolean']
    opdsShowOnlyDownloadedChapters: Scalars['Boolean']
    opdsShowOnlyUnreadChapters: Scalars['Boolean']
    opdsUseBinaryFileSizes: Scalars['Boolean']
    port: Scalars['Int']
    serveConversions: SettingsDownloadConversionType[]
    socksProxyEnabled: Scalars['Boolean']
    socksProxyHost: Scalars['String']
    socksProxyPassword: Scalars['String']
    socksProxyPort: Scalars['String']
    socksProxyUsername: Scalars['String']
    socksProxyVersion: Scalars['Int']
    systemTrayEnabled: Scalars['Boolean']
    updateMangas: Scalars['Boolean']
    useHikariConnectionPool: Scalars['Boolean']
    webUIChannel: WebUIChannel
    webUIFlavor: WebUIFlavor
    webUIInterface: WebUIInterface
    webUIUpdateCheckInterval: Scalars['Float']
    __typename: 'SettingsType'
}

export interface SortFilter {
    default: (SortSelection | null)
    name: Scalars['String']
    values: Scalars['String'][]
    __typename: 'SortFilter'
}

export type SortOrder = 'ASC' | 'DESC' | 'ASC_NULLS_FIRST' | 'DESC_NULLS_FIRST' | 'ASC_NULLS_LAST' | 'DESC_NULLS_LAST'

export interface SortSelection {
    ascending: Scalars['Boolean']
    index: Scalars['Int']
    __typename: 'SortSelection'
}

export interface SourceEdge {
    cursor: Scalars['Cursor']
    node: SourceType
    __typename: 'SourceEdge'
}

export interface SourceMetaType {
    key: Scalars['String']
    sourceId: Scalars['LongString']
    value: Scalars['String']
    source: SourceType
    __typename: 'SourceMetaType'
}

export interface SourceNodeList {
    edges: SourceEdge[]
    nodes: SourceType[]
    pageInfo: PageInfo
    totalCount: Scalars['Int']
    __typename: 'SourceNodeList'
}

export type SourceOrderBy = 'ID' | 'NAME' | 'LANG'

export interface SourceType {
    baseUrl: (Scalars['String'] | null)
    displayName: Scalars['String']
    iconUrl: Scalars['String']
    id: Scalars['LongString']
    isConfigurable: Scalars['Boolean']
    isNsfw: Scalars['Boolean']
    lang: Scalars['String']
    name: Scalars['String']
    supportsLatest: Scalars['Boolean']
    extension: ExtensionType
    filters: Filter[]
    manga: MangaNodeList
    meta: SourceMetaType[]
    preferences: Preference[]
    __typename: 'SourceType'
}

export interface StartDownloaderPayload {
    clientMutationId: (Scalars['String'] | null)
    downloadStatus: DownloadStatus
    __typename: 'StartDownloaderPayload'
}

export interface StopDownloaderPayload {
    clientMutationId: (Scalars['String'] | null)
    downloadStatus: DownloadStatus
    __typename: 'StopDownloaderPayload'
}

export interface Subscription {
    /** @deprecated Replaced with downloadStatusChanged, replace with downloadStatusChanged(input) */
    downloadChanged: DownloadStatus
    downloadStatusChanged: DownloadUpdates
    webUIUpdateStatusChange: WebUIUpdateStatus
    libraryUpdateStatusChanged: UpdaterUpdates
    /** @deprecated Replaced with updates, replace with updates(input) */
    updateStatusChanged: UpdateStatus
    __typename: 'Subscription'
}

export interface SwitchPreference {
    currentValue: (Scalars['Boolean'] | null)
    default: Scalars['Boolean']
    enabled: Scalars['Boolean']
    key: (Scalars['String'] | null)
    summary: (Scalars['String'] | null)
    title: (Scalars['String'] | null)
    visible: Scalars['Boolean']
    __typename: 'SwitchPreference'
}

export interface SyncConflictInfoType {
    deviceName: Scalars['String']
    remotePage: Scalars['Int']
    __typename: 'SyncConflictInfoType'
}

export interface TextFilter {
    default: Scalars['String']
    name: Scalars['String']
    __typename: 'TextFilter'
}

export interface TrackProgressPayload {
    clientMutationId: (Scalars['String'] | null)
    trackRecords: TrackRecordType[]
    __typename: 'TrackProgressPayload'
}

export interface TrackRecordEdge {
    cursor: Scalars['Cursor']
    node: TrackRecordType
    __typename: 'TrackRecordEdge'
}

export interface TrackRecordNodeList {
    edges: TrackRecordEdge[]
    nodes: TrackRecordType[]
    pageInfo: PageInfo
    totalCount: Scalars['Int']
    __typename: 'TrackRecordNodeList'
}

export type TrackRecordOrderBy = 'ID' | 'MANGA_ID' | 'TRACKER_ID' | 'REMOTE_ID' | 'TITLE' | 'LAST_CHAPTER_READ' | 'TOTAL_CHAPTERS' | 'SCORE' | 'START_DATE' | 'FINISH_DATE' | 'PRIVATE'

export interface TrackRecordType {
    finishDate: Scalars['LongString']
    id: Scalars['Int']
    lastChapterRead: Scalars['Float']
    libraryId: (Scalars['LongString'] | null)
    mangaId: Scalars['Int']
    private: Scalars['Boolean']
    remoteId: Scalars['LongString']
    remoteUrl: Scalars['String']
    score: Scalars['Float']
    startDate: Scalars['LongString']
    status: Scalars['Int']
    title: Scalars['String']
    totalChapters: Scalars['Int']
    trackerId: Scalars['Int']
    displayScore: Scalars['String']
    manga: MangaType
    tracker: TrackerType
    __typename: 'TrackRecordType'
}

export interface TrackSearchType {
    coverUrl: Scalars['String']
    finishedReadingDate: Scalars['LongString']
    id: Scalars['Int']
    lastChapterRead: Scalars['Float']
    libraryId: (Scalars['LongString'] | null)
    private: Scalars['Boolean']
    publishingStatus: Scalars['String']
    publishingType: Scalars['String']
    remoteId: Scalars['LongString']
    score: Scalars['Float']
    startDate: Scalars['String']
    startedReadingDate: Scalars['LongString']
    status: Scalars['Int']
    summary: Scalars['String']
    title: Scalars['String']
    totalChapters: Scalars['Int']
    trackerId: Scalars['Int']
    trackingUrl: Scalars['String']
    displayScore: Scalars['String']
    tracker: TrackerType
    __typename: 'TrackSearchType'
}

export interface TrackStatusType {
    name: Scalars['String']
    value: Scalars['Int']
    __typename: 'TrackStatusType'
}

export interface TrackerEdge {
    cursor: Scalars['Cursor']
    node: TrackerType
    __typename: 'TrackerEdge'
}

export interface TrackerNodeList {
    edges: TrackerEdge[]
    nodes: TrackerType[]
    pageInfo: PageInfo
    totalCount: Scalars['Int']
    __typename: 'TrackerNodeList'
}

export type TrackerOrderBy = 'ID' | 'NAME' | 'IS_LOGGED_IN'

export interface TrackerType {
    authUrl: (Scalars['String'] | null)
    icon: Scalars['String']
    id: Scalars['Int']
    isLoggedIn: Scalars['Boolean']
    name: Scalars['String']
    supportsPrivateTracking: Scalars['Boolean']
    supportsReadingDates: Scalars['Boolean']
    supportsTrackDeletion: Scalars['Boolean']
    isTokenExpired: Scalars['Boolean']
    scores: Scalars['String'][]
    statuses: TrackStatusType[]
    trackRecords: TrackRecordNodeList
    __typename: 'TrackerType'
}

export type TriState = 'IGNORE' | 'INCLUDE' | 'EXCLUDE'

export interface TriStateFilter {
    default: TriState
    name: Scalars['String']
    __typename: 'TriStateFilter'
}

export interface UnbindTrackPayload {
    clientMutationId: (Scalars['String'] | null)
    trackRecord: (TrackRecordType | null)
    __typename: 'UnbindTrackPayload'
}

export interface UpdateCategoriesPayload {
    categories: CategoryType[]
    clientMutationId: (Scalars['String'] | null)
    __typename: 'UpdateCategoriesPayload'
}

export interface UpdateCategoryMangaPayload {
    clientMutationId: (Scalars['String'] | null)
    updateStatus: UpdateStatus
    __typename: 'UpdateCategoryMangaPayload'
}

export interface UpdateCategoryOrderPayload {
    categories: CategoryType[]
    clientMutationId: (Scalars['String'] | null)
    __typename: 'UpdateCategoryOrderPayload'
}

export interface UpdateCategoryPayload {
    category: CategoryType
    clientMutationId: (Scalars['String'] | null)
    __typename: 'UpdateCategoryPayload'
}

export interface UpdateChapterPayload {
    chapter: ChapterType
    clientMutationId: (Scalars['String'] | null)
    __typename: 'UpdateChapterPayload'
}

export interface UpdateChaptersPayload {
    chapters: ChapterType[]
    clientMutationId: (Scalars['String'] | null)
    __typename: 'UpdateChaptersPayload'
}

export interface UpdateExtensionPayload {
    clientMutationId: (Scalars['String'] | null)
    extension: (ExtensionType | null)
    __typename: 'UpdateExtensionPayload'
}

export interface UpdateExtensionsPayload {
    clientMutationId: (Scalars['String'] | null)
    extensions: ExtensionType[]
    __typename: 'UpdateExtensionsPayload'
}

export interface UpdateLibraryMangaPayload {
    clientMutationId: (Scalars['String'] | null)
    updateStatus: UpdateStatus
    __typename: 'UpdateLibraryMangaPayload'
}

export interface UpdateLibraryPayload {
    clientMutationId: (Scalars['String'] | null)
    updateStatus: LibraryUpdateStatus
    __typename: 'UpdateLibraryPayload'
}

export interface UpdateMangaCategoriesPayload {
    clientMutationId: (Scalars['String'] | null)
    manga: MangaType
    __typename: 'UpdateMangaCategoriesPayload'
}

export interface UpdateMangaPayload {
    clientMutationId: (Scalars['String'] | null)
    manga: MangaType
    __typename: 'UpdateMangaPayload'
}

export interface UpdateMangasCategoriesPayload {
    clientMutationId: (Scalars['String'] | null)
    mangas: MangaType[]
    __typename: 'UpdateMangasCategoriesPayload'
}

export interface UpdateMangasPayload {
    clientMutationId: (Scalars['String'] | null)
    mangas: MangaType[]
    __typename: 'UpdateMangasPayload'
}

export interface UpdateSourcePreferencePayload {
    clientMutationId: (Scalars['String'] | null)
    preferences: Preference[]
    source: SourceType
    __typename: 'UpdateSourcePreferencePayload'
}

export type UpdateState = 'IDLE' | 'DOWNLOADING' | 'FINISHED' | 'ERROR'

export interface UpdateStatus {
    completeJobs: UpdateStatusType
    failedJobs: UpdateStatusType
    isRunning: Scalars['Boolean']
    pendingJobs: UpdateStatusType
    runningJobs: UpdateStatusType
    skippedCategories: UpdateStatusCategoryType
    skippedJobs: UpdateStatusType
    updatingCategories: UpdateStatusCategoryType
    __typename: 'UpdateStatus'
}

export interface UpdateStatusCategoryType {
    categories: CategoryNodeList
    __typename: 'UpdateStatusCategoryType'
}

export interface UpdateStatusType {
    mangas: MangaNodeList
    __typename: 'UpdateStatusType'
}

export interface UpdateStopPayload {
    clientMutationId: (Scalars['String'] | null)
    __typename: 'UpdateStopPayload'
}

export type UpdateStrategy = 'ALWAYS_UPDATE' | 'ONLY_FETCH_ONCE'

export interface UpdateTrackPayload {
    clientMutationId: (Scalars['String'] | null)
    trackRecord: (TrackRecordType | null)
    __typename: 'UpdateTrackPayload'
}

export interface UpdaterJobsInfoType {
    finishedJobs: Scalars['Int']
    isRunning: Scalars['Boolean']
    skippedCategoriesCount: Scalars['Int']
    skippedMangasCount: Scalars['Int']
    totalJobs: Scalars['Int']
    __typename: 'UpdaterJobsInfoType'
}

export interface UpdaterUpdates {
    categoryUpdates: CategoryUpdateType[]
    /** The current update status at the time of sending the initial message. Is null for all following messages */
    initial: (LibraryUpdateStatus | null)
    jobsInfo: UpdaterJobsInfoType
    mangaUpdates: MangaUpdateType[]
    /** Indicates whether updates have been omitted based on the "maxUpdates" subscription variable. In case updates have been omitted, the "updateStatus" query should be re-fetched. */
    omittedUpdates: Scalars['Boolean']
    __typename: 'UpdaterUpdates'
}

export interface ValidateBackupResult {
    missingSources: ValidateBackupSource[]
    missingTrackers: ValidateBackupTracker[]
    __typename: 'ValidateBackupResult'
}

export interface ValidateBackupSource {
    id: Scalars['LongString']
    name: Scalars['String']
    __typename: 'ValidateBackupSource'
}

export interface ValidateBackupTracker {
    name: Scalars['String']
    __typename: 'ValidateBackupTracker'
}

export type WebUIChannel = 'BUNDLED' | 'STABLE' | 'PREVIEW'

export type WebUIFlavor = 'WEBUI' | 'VUI' | 'CUSTOM'

export type WebUIInterface = 'BROWSER' | 'ELECTRON'

export interface WebUIUpdateCheck {
    channel: WebUIChannel
    tag: Scalars['String']
    updateAvailable: Scalars['Boolean']
    __typename: 'WebUIUpdateCheck'
}

export interface WebUIUpdateInfo {
    channel: WebUIChannel
    tag: Scalars['String']
    __typename: 'WebUIUpdateInfo'
}

export interface WebUIUpdatePayload {
    clientMutationId: (Scalars['String'] | null)
    updateStatus: WebUIUpdateStatus
    __typename: 'WebUIUpdatePayload'
}

export interface WebUIUpdateStatus {
    info: WebUIUpdateInfo
    progress: Scalars['Int']
    state: UpdateState
    __typename: 'WebUIUpdateStatus'
}

export interface AboutServerPayloadGenqlSelection{
    buildTime?: boolean | number
    buildType?: boolean | number
    discord?: boolean | number
    github?: boolean | number
    name?: boolean | number
    /** @deprecated The version includes the revision as the patch number */
    revision?: boolean | number
    version?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AboutWebUIGenqlSelection{
    channel?: boolean | number
    tag?: boolean | number
    updateTimestamp?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface BackupRestoreStatusGenqlSelection{
    mangaProgress?: boolean | number
    state?: boolean | number
    totalManga?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface BindTrackInput {clientMutationId?: (Scalars['String'] | null),mangaId: Scalars['Int'],
/** This will only work if the tracker of the track record supports private tracking */
private?: (Scalars['Boolean'] | null),remoteId: Scalars['LongString'],trackerId: Scalars['Int']}

export interface BindTrackPayloadGenqlSelection{
    clientMutationId?: boolean | number
    trackRecord?: TrackRecordTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface BooleanFilterInput {distinctFrom?: (Scalars['Boolean'] | null),distinctFromAll?: (Scalars['Boolean'][] | null),distinctFromAny?: (Scalars['Boolean'][] | null),equalTo?: (Scalars['Boolean'] | null),greaterThan?: (Scalars['Boolean'] | null),greaterThanOrEqualTo?: (Scalars['Boolean'] | null),in?: (Scalars['Boolean'][] | null),isNull?: (Scalars['Boolean'] | null),lessThan?: (Scalars['Boolean'] | null),lessThanOrEqualTo?: (Scalars['Boolean'] | null),notDistinctFrom?: (Scalars['Boolean'] | null),notEqualTo?: (Scalars['Boolean'] | null),notEqualToAll?: (Scalars['Boolean'][] | null),notEqualToAny?: (Scalars['Boolean'][] | null),notIn?: (Scalars['Boolean'][] | null)}

export interface CategoryConditionInput {default?: (Scalars['Boolean'] | null),id?: (Scalars['Int'] | null),name?: (Scalars['String'] | null),order?: (Scalars['Int'] | null)}

export interface CategoryEdgeGenqlSelection{
    cursor?: boolean | number
    node?: CategoryTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CategoryFilterInput {and?: (CategoryFilterInput[] | null),default?: (BooleanFilterInput | null),id?: (IntFilterInput | null),name?: (StringFilterInput | null),not?: (CategoryFilterInput | null),or?: (CategoryFilterInput[] | null),order?: (IntFilterInput | null)}

export interface CategoryMetaTypeGenqlSelection{
    categoryId?: boolean | number
    key?: boolean | number
    value?: boolean | number
    category?: CategoryTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CategoryMetaTypeInput {categoryId: Scalars['Int'],key: Scalars['String'],value: Scalars['String']}

export interface CategoryNodeListGenqlSelection{
    edges?: CategoryEdgeGenqlSelection
    nodes?: CategoryTypeGenqlSelection
    pageInfo?: PageInfoGenqlSelection
    totalCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CategoryOrderInput {by: CategoryOrderBy,byType?: (SortOrder | null)}

export interface CategoryTypeGenqlSelection{
    default?: boolean | number
    id?: boolean | number
    includeInDownload?: boolean | number
    includeInUpdate?: boolean | number
    name?: boolean | number
    order?: boolean | number
    mangas?: MangaNodeListGenqlSelection
    meta?: CategoryMetaTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CategoryUpdateTypeGenqlSelection{
    category?: CategoryTypeGenqlSelection
    status?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ChapterConditionInput {chapterNumber?: (Scalars['Float'] | null),fetchedAt?: (Scalars['LongString'] | null),id?: (Scalars['Int'] | null),isBookmarked?: (Scalars['Boolean'] | null),isDownloaded?: (Scalars['Boolean'] | null),isRead?: (Scalars['Boolean'] | null),lastPageRead?: (Scalars['Int'] | null),lastReadAt?: (Scalars['LongString'] | null),mangaId?: (Scalars['Int'] | null),name?: (Scalars['String'] | null),pageCount?: (Scalars['Int'] | null),realUrl?: (Scalars['String'] | null),scanlator?: (Scalars['String'] | null),sourceOrder?: (Scalars['Int'] | null),uploadDate?: (Scalars['LongString'] | null),url?: (Scalars['String'] | null)}

export interface ChapterEdgeGenqlSelection{
    cursor?: boolean | number
    node?: ChapterTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ChapterFilterInput {and?: (ChapterFilterInput[] | null),chapterNumber?: (DoubleFilterInput | null),fetchedAt?: (LongFilterInput | null),id?: (IntFilterInput | null),inLibrary?: (BooleanFilterInput | null),isBookmarked?: (BooleanFilterInput | null),isDownloaded?: (BooleanFilterInput | null),isRead?: (BooleanFilterInput | null),lastPageRead?: (IntFilterInput | null),lastReadAt?: (LongFilterInput | null),mangaId?: (IntFilterInput | null),name?: (StringFilterInput | null),not?: (ChapterFilterInput | null),or?: (ChapterFilterInput[] | null),pageCount?: (IntFilterInput | null),realUrl?: (StringFilterInput | null),scanlator?: (StringFilterInput | null),sourceOrder?: (IntFilterInput | null),uploadDate?: (LongFilterInput | null),url?: (StringFilterInput | null)}

export interface ChapterMetaTypeGenqlSelection{
    chapterId?: boolean | number
    key?: boolean | number
    value?: boolean | number
    chapter?: ChapterTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ChapterMetaTypeInput {chapterId: Scalars['Int'],key: Scalars['String'],value: Scalars['String']}

export interface ChapterNodeListGenqlSelection{
    edges?: ChapterEdgeGenqlSelection
    nodes?: ChapterTypeGenqlSelection
    pageInfo?: PageInfoGenqlSelection
    totalCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ChapterOrderInput {by: ChapterOrderBy,byType?: (SortOrder | null)}

export interface ChapterTypeGenqlSelection{
    chapterNumber?: boolean | number
    fetchedAt?: boolean | number
    id?: boolean | number
    isBookmarked?: boolean | number
    isDownloaded?: boolean | number
    isRead?: boolean | number
    lastPageRead?: boolean | number
    lastReadAt?: boolean | number
    mangaId?: boolean | number
    name?: boolean | number
    pageCount?: boolean | number
    realUrl?: boolean | number
    scanlator?: boolean | number
    sourceOrder?: boolean | number
    uploadDate?: boolean | number
    url?: boolean | number
    manga?: MangaTypeGenqlSelection
    meta?: ChapterMetaTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CheckBoxFilterGenqlSelection{
    default?: boolean | number
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CheckBoxPreferenceGenqlSelection{
    currentValue?: boolean | number
    default?: boolean | number
    enabled?: boolean | number
    key?: boolean | number
    summary?: boolean | number
    title?: boolean | number
    visible?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CheckForServerUpdatesPayloadGenqlSelection{
    channel?: boolean | number
    tag?: boolean | number
    url?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ClearCachedImagesInput {cachedPages?: (Scalars['Boolean'] | null),cachedThumbnails?: (Scalars['Boolean'] | null),clientMutationId?: (Scalars['String'] | null),downloadedThumbnails?: (Scalars['Boolean'] | null)}

export interface ClearCachedImagesPayloadGenqlSelection{
    cachedPages?: boolean | number
    cachedThumbnails?: boolean | number
    clientMutationId?: boolean | number
    downloadedThumbnails?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ClearDownloaderInput {clientMutationId?: (Scalars['String'] | null)}

export interface ClearDownloaderPayloadGenqlSelection{
    clientMutationId?: boolean | number
    downloadStatus?: DownloadStatusGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ConnectKoSyncAccountInput {clientMutationId?: (Scalars['String'] | null),password: Scalars['String'],serverAddress: Scalars['String'],username: Scalars['String']}

export interface CreateBackupInput {clientMutationId?: (Scalars['String'] | null),flags?: (PartialBackupFlagsInput | null)}

export interface CreateBackupPayloadGenqlSelection{
    clientMutationId?: boolean | number
    url?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CreateCategoryInput {clientMutationId?: (Scalars['String'] | null),default?: (Scalars['Boolean'] | null),includeInDownload?: (IncludeOrExclude | null),includeInUpdate?: (IncludeOrExclude | null),name: Scalars['String'],order?: (Scalars['Int'] | null)}

export interface CreateCategoryPayloadGenqlSelection{
    category?: CategoryTypeGenqlSelection
    clientMutationId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DeleteCategoryInput {categoryId: Scalars['Int'],clientMutationId?: (Scalars['String'] | null)}

export interface DeleteCategoryMetaInput {categoryId: Scalars['Int'],clientMutationId?: (Scalars['String'] | null),key: Scalars['String']}

export interface DeleteCategoryMetaPayloadGenqlSelection{
    category?: CategoryTypeGenqlSelection
    clientMutationId?: boolean | number
    meta?: CategoryMetaTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DeleteCategoryMetasInput {clientMutationId?: (Scalars['String'] | null),items: DeleteCategoryMetasItemInput[]}

export interface DeleteCategoryMetasItemInput {categoryIds: Scalars['Int'][],keys?: (Scalars['String'][] | null),prefixes?: (Scalars['String'][] | null)}

export interface DeleteCategoryMetasPayloadGenqlSelection{
    categories?: CategoryTypeGenqlSelection
    clientMutationId?: boolean | number
    metas?: CategoryMetaTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DeleteCategoryPayloadGenqlSelection{
    category?: CategoryTypeGenqlSelection
    clientMutationId?: boolean | number
    mangas?: MangaTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DeleteChapterMetaInput {chapterId: Scalars['Int'],clientMutationId?: (Scalars['String'] | null),key: Scalars['String']}

export interface DeleteChapterMetaPayloadGenqlSelection{
    chapter?: ChapterTypeGenqlSelection
    clientMutationId?: boolean | number
    meta?: ChapterMetaTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DeleteChapterMetasInput {clientMutationId?: (Scalars['String'] | null),items: DeleteChapterMetasItemInput[]}

export interface DeleteChapterMetasItemInput {chapterIds: Scalars['Int'][],keys?: (Scalars['String'][] | null),prefixes?: (Scalars['String'][] | null)}

export interface DeleteChapterMetasPayloadGenqlSelection{
    chapters?: ChapterTypeGenqlSelection
    clientMutationId?: boolean | number
    metas?: ChapterMetaTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DeleteDownloadedChapterInput {clientMutationId?: (Scalars['String'] | null),id: Scalars['Int']}

export interface DeleteDownloadedChapterPayloadGenqlSelection{
    chapters?: ChapterTypeGenqlSelection
    clientMutationId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DeleteDownloadedChaptersInput {clientMutationId?: (Scalars['String'] | null),ids: Scalars['Int'][]}

export interface DeleteDownloadedChaptersPayloadGenqlSelection{
    chapters?: ChapterTypeGenqlSelection
    clientMutationId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DeleteGlobalMetaInput {clientMutationId?: (Scalars['String'] | null),key: Scalars['String']}

export interface DeleteGlobalMetaPayloadGenqlSelection{
    clientMutationId?: boolean | number
    meta?: GlobalMetaTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DeleteGlobalMetasInput {clientMutationId?: (Scalars['String'] | null),keys?: (Scalars['String'][] | null),prefixes?: (Scalars['String'][] | null)}

export interface DeleteGlobalMetasPayloadGenqlSelection{
    clientMutationId?: boolean | number
    metas?: GlobalMetaTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DeleteMangaMetaInput {clientMutationId?: (Scalars['String'] | null),key: Scalars['String'],mangaId: Scalars['Int']}

export interface DeleteMangaMetaPayloadGenqlSelection{
    clientMutationId?: boolean | number
    manga?: MangaTypeGenqlSelection
    meta?: MangaMetaTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DeleteMangaMetasInput {clientMutationId?: (Scalars['String'] | null),items: DeleteMangaMetasItemInput[]}

export interface DeleteMangaMetasItemInput {keys?: (Scalars['String'][] | null),mangaIds: Scalars['Int'][],prefixes?: (Scalars['String'][] | null)}

export interface DeleteMangaMetasPayloadGenqlSelection{
    clientMutationId?: boolean | number
    mangas?: MangaTypeGenqlSelection
    metas?: MangaMetaTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DeleteSourceMetaInput {clientMutationId?: (Scalars['String'] | null),key: Scalars['String'],sourceId: Scalars['LongString']}

export interface DeleteSourceMetaPayloadGenqlSelection{
    clientMutationId?: boolean | number
    meta?: SourceMetaTypeGenqlSelection
    source?: SourceTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DeleteSourceMetasInput {clientMutationId?: (Scalars['String'] | null),items: DeleteSourceMetasItemInput[]}

export interface DeleteSourceMetasItemInput {keys?: (Scalars['String'][] | null),prefixes?: (Scalars['String'][] | null),sourceIds: Scalars['LongString'][]}

export interface DeleteSourceMetasPayloadGenqlSelection{
    clientMutationId?: boolean | number
    metas?: SourceMetaTypeGenqlSelection
    sources?: SourceTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DequeueChapterDownloadInput {clientMutationId?: (Scalars['String'] | null),id: Scalars['Int']}

export interface DequeueChapterDownloadPayloadGenqlSelection{
    clientMutationId?: boolean | number
    downloadStatus?: DownloadStatusGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DequeueChapterDownloadsInput {clientMutationId?: (Scalars['String'] | null),ids: Scalars['Int'][]}

export interface DequeueChapterDownloadsPayloadGenqlSelection{
    clientMutationId?: boolean | number
    downloadStatus?: DownloadStatusGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DoubleFilterInput {distinctFrom?: (Scalars['Float'] | null),distinctFromAll?: (Scalars['Float'][] | null),distinctFromAny?: (Scalars['Float'][] | null),equalTo?: (Scalars['Float'] | null),greaterThan?: (Scalars['Float'] | null),greaterThanOrEqualTo?: (Scalars['Float'] | null),in?: (Scalars['Float'][] | null),isNull?: (Scalars['Boolean'] | null),lessThan?: (Scalars['Float'] | null),lessThanOrEqualTo?: (Scalars['Float'] | null),notDistinctFrom?: (Scalars['Float'] | null),notEqualTo?: (Scalars['Float'] | null),notEqualToAll?: (Scalars['Float'][] | null),notEqualToAny?: (Scalars['Float'][] | null),notIn?: (Scalars['Float'][] | null)}

export interface DownloadChangedInput {
/** Sets a max number of updates that can be contained in a download update message.Everything above this limit will be omitted and the "downloadStatus" should be re-fetched via the corresponding query. Due to the graphql subscription execution strategy not supporting batching for data loaders, the data loaders run into the n+1 problem, which can cause the server to get unresponsive until the status update has been handled. This is an issue e.g. when mass en- or dequeuing downloads. */
maxUpdates?: (Scalars['Int'] | null)}

export interface DownloadEdgeGenqlSelection{
    cursor?: boolean | number
    node?: DownloadTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DownloadNodeListGenqlSelection{
    edges?: DownloadEdgeGenqlSelection
    nodes?: DownloadTypeGenqlSelection
    pageInfo?: PageInfoGenqlSelection
    totalCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DownloadStatusGenqlSelection{
    queue?: DownloadTypeGenqlSelection
    state?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DownloadTypeGenqlSelection{
    position?: boolean | number
    progress?: boolean | number
    state?: boolean | number
    tries?: boolean | number
    chapter?: ChapterTypeGenqlSelection
    manga?: MangaTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DownloadUpdateGenqlSelection{
    download?: DownloadTypeGenqlSelection
    type?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DownloadUpdatesGenqlSelection{
    /** The current download queue at the time of sending initial message. Is null for all following messages */
    initial?: DownloadTypeGenqlSelection
    /** Indicates whether updates have been omitted based on the "maxUpdates" subscription variable. In case updates have been omitted, the "downloadStatus" query should be re-fetched. */
    omittedUpdates?: boolean | number
    state?: boolean | number
    updates?: DownloadUpdateGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface EdgeGenqlSelection{
    /** A cursor for use in pagination. */
    cursor?: boolean | number
    /** The [T] at the end of the edge. */
    node?: NodeGenqlSelection
    on_CategoryEdge?: CategoryEdgeGenqlSelection
    on_ChapterEdge?: ChapterEdgeGenqlSelection
    on_DownloadEdge?: DownloadEdgeGenqlSelection
    on_ExtensionEdge?: ExtensionEdgeGenqlSelection
    on_MangaEdge?: MangaEdgeGenqlSelection
    on_MetaEdge?: MetaEdgeGenqlSelection
    on_SourceEdge?: SourceEdgeGenqlSelection
    on_TrackRecordEdge?: TrackRecordEdgeGenqlSelection
    on_TrackerEdge?: TrackerEdgeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface EditTextPreferenceGenqlSelection{
    currentValue?: boolean | number
    default?: boolean | number
    dialogMessage?: boolean | number
    dialogTitle?: boolean | number
    enabled?: boolean | number
    key?: boolean | number
    summary?: boolean | number
    text?: boolean | number
    title?: boolean | number
    visible?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface EnqueueChapterDownloadInput {clientMutationId?: (Scalars['String'] | null),id: Scalars['Int']}

export interface EnqueueChapterDownloadPayloadGenqlSelection{
    clientMutationId?: boolean | number
    downloadStatus?: DownloadStatusGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface EnqueueChapterDownloadsInput {clientMutationId?: (Scalars['String'] | null),ids: Scalars['Int'][]}

export interface EnqueueChapterDownloadsPayloadGenqlSelection{
    clientMutationId?: boolean | number
    downloadStatus?: DownloadStatusGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ExtensionConditionInput {apkName?: (Scalars['String'] | null),hasUpdate?: (Scalars['Boolean'] | null),iconUrl?: (Scalars['String'] | null),isInstalled?: (Scalars['Boolean'] | null),isNsfw?: (Scalars['Boolean'] | null),isObsolete?: (Scalars['Boolean'] | null),lang?: (Scalars['String'] | null),name?: (Scalars['String'] | null),pkgName?: (Scalars['String'] | null),repo?: (Scalars['String'] | null),versionCode?: (Scalars['Int'] | null),versionName?: (Scalars['String'] | null)}

export interface ExtensionEdgeGenqlSelection{
    cursor?: boolean | number
    node?: ExtensionTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ExtensionFilterInput {and?: (ExtensionFilterInput[] | null),apkName?: (StringFilterInput | null),hasUpdate?: (BooleanFilterInput | null),iconUrl?: (StringFilterInput | null),isInstalled?: (BooleanFilterInput | null),isNsfw?: (BooleanFilterInput | null),isObsolete?: (BooleanFilterInput | null),lang?: (StringFilterInput | null),name?: (StringFilterInput | null),not?: (ExtensionFilterInput | null),or?: (ExtensionFilterInput[] | null),pkgName?: (StringFilterInput | null),repo?: (StringFilterInput | null),versionCode?: (IntFilterInput | null),versionName?: (StringFilterInput | null)}

export interface ExtensionNodeListGenqlSelection{
    edges?: ExtensionEdgeGenqlSelection
    nodes?: ExtensionTypeGenqlSelection
    pageInfo?: PageInfoGenqlSelection
    totalCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ExtensionOrderInput {by: ExtensionOrderBy,byType?: (SortOrder | null)}

export interface ExtensionTypeGenqlSelection{
    apkName?: boolean | number
    hasUpdate?: boolean | number
    iconUrl?: boolean | number
    isInstalled?: boolean | number
    isNsfw?: boolean | number
    isObsolete?: boolean | number
    lang?: boolean | number
    name?: boolean | number
    pkgName?: boolean | number
    repo?: boolean | number
    versionCode?: boolean | number
    versionName?: boolean | number
    source?: SourceNodeListGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FetchChapterPagesInput {chapterId: Scalars['Int'],clientMutationId?: (Scalars['String'] | null),format?: (Scalars['String'] | null)}

export interface FetchChapterPagesPayloadGenqlSelection{
    chapter?: ChapterTypeGenqlSelection
    clientMutationId?: boolean | number
    pages?: boolean | number
    syncConflict?: SyncConflictInfoTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FetchChaptersInput {clientMutationId?: (Scalars['String'] | null),mangaId: Scalars['Int']}

export interface FetchChaptersPayloadGenqlSelection{
    chapters?: ChapterTypeGenqlSelection
    clientMutationId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FetchExtensionsInput {clientMutationId?: (Scalars['String'] | null)}

export interface FetchExtensionsPayloadGenqlSelection{
    clientMutationId?: boolean | number
    extensions?: ExtensionTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FetchMangaInput {clientMutationId?: (Scalars['String'] | null),id: Scalars['Int']}

export interface FetchMangaPayloadGenqlSelection{
    clientMutationId?: boolean | number
    manga?: MangaTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FetchSourceMangaInput {clientMutationId?: (Scalars['String'] | null),filters?: (FilterChangeInput[] | null),page: Scalars['Int'],query?: (Scalars['String'] | null),source: Scalars['LongString'],type: FetchSourceMangaType}

export interface FetchSourceMangaPayloadGenqlSelection{
    clientMutationId?: boolean | number
    hasNextPage?: boolean | number
    mangas?: MangaTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FetchTrackInput {clientMutationId?: (Scalars['String'] | null),recordId: Scalars['Int']}

export interface FetchTrackPayloadGenqlSelection{
    clientMutationId?: boolean | number
    trackRecord?: TrackRecordTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FilterGenqlSelection{
    on_CheckBoxFilter?:CheckBoxFilterGenqlSelection,
    on_GroupFilter?:GroupFilterGenqlSelection,
    on_HeaderFilter?:HeaderFilterGenqlSelection,
    on_SelectFilter?:SelectFilterGenqlSelection,
    on_SeparatorFilter?:SeparatorFilterGenqlSelection,
    on_SortFilter?:SortFilterGenqlSelection,
    on_TextFilter?:TextFilterGenqlSelection,
    on_TriStateFilter?:TriStateFilterGenqlSelection,
    __typename?: boolean | number
}

export interface FilterChangeInput {checkBoxState?: (Scalars['Boolean'] | null),groupChange?: (FilterChangeInput | null),position: Scalars['Int'],selectState?: (Scalars['Int'] | null),sortState?: (SortSelectionInput | null),textState?: (Scalars['String'] | null),triState?: (TriState | null)}

export interface GlobalMetaNodeListGenqlSelection{
    edges?: MetaEdgeGenqlSelection
    nodes?: GlobalMetaTypeGenqlSelection
    pageInfo?: PageInfoGenqlSelection
    totalCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface GlobalMetaTypeGenqlSelection{
    key?: boolean | number
    value?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface GlobalMetaTypeInput {key: Scalars['String'],value: Scalars['String']}

export interface GroupFilterGenqlSelection{
    filters?: FilterGenqlSelection
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface HeaderFilterGenqlSelection{
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface InstallExternalExtensionInput {clientMutationId?: (Scalars['String'] | null),extensionFile: Scalars['Upload']}

export interface InstallExternalExtensionPayloadGenqlSelection{
    clientMutationId?: boolean | number
    extension?: ExtensionTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface IntFilterInput {distinctFrom?: (Scalars['Int'] | null),distinctFromAll?: (Scalars['Int'][] | null),distinctFromAny?: (Scalars['Int'][] | null),equalTo?: (Scalars['Int'] | null),greaterThan?: (Scalars['Int'] | null),greaterThanOrEqualTo?: (Scalars['Int'] | null),in?: (Scalars['Int'][] | null),isNull?: (Scalars['Boolean'] | null),lessThan?: (Scalars['Int'] | null),lessThanOrEqualTo?: (Scalars['Int'] | null),notDistinctFrom?: (Scalars['Int'] | null),notEqualTo?: (Scalars['Int'] | null),notEqualToAll?: (Scalars['Int'][] | null),notEqualToAny?: (Scalars['Int'][] | null),notIn?: (Scalars['Int'][] | null)}

export interface KoSyncConnectPayloadGenqlSelection{
    clientMutationId?: boolean | number
    message?: boolean | number
    status?: KoSyncStatusPayloadGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface KoSyncStatusPayloadGenqlSelection{
    isLoggedIn?: boolean | number
    serverAddress?: boolean | number
    username?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface LastUpdateTimestampPayloadGenqlSelection{
    timestamp?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface LibraryUpdateStatusGenqlSelection{
    categoryUpdates?: CategoryUpdateTypeGenqlSelection
    jobsInfo?: UpdaterJobsInfoTypeGenqlSelection
    mangaUpdates?: MangaUpdateTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface LibraryUpdateStatusChangedInput {
/** Sets a max number of updates that can be contained in a updater update message.Everything above this limit will be omitted and the "updateStatus" should be re-fetched via the corresponding query. Due to the graphql subscription execution strategy not supporting batching for data loaders, the data loaders run into the n+1 problem, which can cause the server to get unresponsive until the status update has been handled. This is an issue e.g. when starting an update. */
maxUpdates?: (Scalars['Int'] | null)}

export interface ListPreferenceGenqlSelection{
    currentValue?: boolean | number
    default?: boolean | number
    enabled?: boolean | number
    entries?: boolean | number
    entryValues?: boolean | number
    key?: boolean | number
    summary?: boolean | number
    title?: boolean | number
    visible?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface LoginInput {clientMutationId?: (Scalars['String'] | null),password: Scalars['String'],username: Scalars['String']}

export interface LoginPayloadGenqlSelection{
    accessToken?: boolean | number
    clientMutationId?: boolean | number
    refreshToken?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface LoginTrackerCredentialsInput {clientMutationId?: (Scalars['String'] | null),password: Scalars['String'],trackerId: Scalars['Int'],username: Scalars['String']}

export interface LoginTrackerCredentialsPayloadGenqlSelection{
    clientMutationId?: boolean | number
    isLoggedIn?: boolean | number
    tracker?: TrackerTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface LoginTrackerOAuthInput {callbackUrl: Scalars['String'],clientMutationId?: (Scalars['String'] | null),trackerId: Scalars['Int']}

export interface LoginTrackerOAuthPayloadGenqlSelection{
    clientMutationId?: boolean | number
    isLoggedIn?: boolean | number
    tracker?: TrackerTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface LogoutKoSyncAccountInput {clientMutationId?: (Scalars['String'] | null)}

export interface LogoutKoSyncAccountPayloadGenqlSelection{
    clientMutationId?: boolean | number
    status?: KoSyncStatusPayloadGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface LogoutTrackerInput {clientMutationId?: (Scalars['String'] | null),trackerId: Scalars['Int']}

export interface LogoutTrackerPayloadGenqlSelection{
    clientMutationId?: boolean | number
    isLoggedIn?: boolean | number
    tracker?: TrackerTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface LongFilterInput {distinctFrom?: (Scalars['LongString'] | null),distinctFromAll?: (Scalars['LongString'][] | null),distinctFromAny?: (Scalars['LongString'][] | null),equalTo?: (Scalars['LongString'] | null),greaterThan?: (Scalars['LongString'] | null),greaterThanOrEqualTo?: (Scalars['LongString'] | null),in?: (Scalars['LongString'][] | null),isNull?: (Scalars['Boolean'] | null),lessThan?: (Scalars['LongString'] | null),lessThanOrEqualTo?: (Scalars['LongString'] | null),notDistinctFrom?: (Scalars['LongString'] | null),notEqualTo?: (Scalars['LongString'] | null),notEqualToAll?: (Scalars['LongString'][] | null),notEqualToAny?: (Scalars['LongString'][] | null),notIn?: (Scalars['LongString'][] | null)}

export interface MangaConditionInput {artist?: (Scalars['String'] | null),author?: (Scalars['String'] | null),categoryIds?: (Scalars['Int'][] | null),chaptersLastFetchedAt?: (Scalars['LongString'] | null),description?: (Scalars['String'] | null),genre?: (Scalars['String'][] | null),id?: (Scalars['Int'] | null),inLibrary?: (Scalars['Boolean'] | null),inLibraryAt?: (Scalars['LongString'] | null),initialized?: (Scalars['Boolean'] | null),lastFetchedAt?: (Scalars['LongString'] | null),realUrl?: (Scalars['String'] | null),sourceId?: (Scalars['LongString'] | null),status?: (MangaStatus | null),thumbnailUrl?: (Scalars['String'] | null),title?: (Scalars['String'] | null),url?: (Scalars['String'] | null)}

export interface MangaEdgeGenqlSelection{
    cursor?: boolean | number
    node?: MangaTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MangaFilterInput {and?: (MangaFilterInput[] | null),artist?: (StringFilterInput | null),author?: (StringFilterInput | null),categoryId?: (IntFilterInput | null),chaptersLastFetchedAt?: (LongFilterInput | null),description?: (StringFilterInput | null),genre?: (StringFilterInput | null),id?: (IntFilterInput | null),inLibrary?: (BooleanFilterInput | null),inLibraryAt?: (LongFilterInput | null),initialized?: (BooleanFilterInput | null),lastFetchedAt?: (LongFilterInput | null),not?: (MangaFilterInput | null),or?: (MangaFilterInput[] | null),realUrl?: (StringFilterInput | null),sourceId?: (LongFilterInput | null),status?: (MangaStatusFilterInput | null),thumbnailUrl?: (StringFilterInput | null),title?: (StringFilterInput | null),url?: (StringFilterInput | null)}

export interface MangaMetaTypeGenqlSelection{
    key?: boolean | number
    mangaId?: boolean | number
    value?: boolean | number
    manga?: MangaTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MangaMetaTypeInput {key: Scalars['String'],mangaId: Scalars['Int'],value: Scalars['String']}

export interface MangaNodeListGenqlSelection{
    edges?: MangaEdgeGenqlSelection
    nodes?: MangaTypeGenqlSelection
    pageInfo?: PageInfoGenqlSelection
    totalCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MangaOrderInput {by: MangaOrderBy,byType?: (SortOrder | null)}

export interface MangaStatusFilterInput {distinctFrom?: (MangaStatus | null),distinctFromAll?: (MangaStatus[] | null),distinctFromAny?: (MangaStatus[] | null),equalTo?: (MangaStatus | null),greaterThan?: (MangaStatus | null),greaterThanOrEqualTo?: (MangaStatus | null),in?: (MangaStatus[] | null),isNull?: (Scalars['Boolean'] | null),lessThan?: (MangaStatus | null),lessThanOrEqualTo?: (MangaStatus | null),notDistinctFrom?: (MangaStatus | null),notEqualTo?: (MangaStatus | null),notEqualToAll?: (MangaStatus[] | null),notEqualToAny?: (MangaStatus[] | null),notIn?: (MangaStatus[] | null)}

export interface MangaTypeGenqlSelection{
    artist?: boolean | number
    author?: boolean | number
    chaptersLastFetchedAt?: boolean | number
    description?: boolean | number
    genre?: boolean | number
    id?: boolean | number
    inLibrary?: boolean | number
    inLibraryAt?: boolean | number
    initialized?: boolean | number
    lastFetchedAt?: boolean | number
    realUrl?: boolean | number
    sourceId?: boolean | number
    status?: boolean | number
    thumbnailUrl?: boolean | number
    thumbnailUrlLastFetched?: boolean | number
    title?: boolean | number
    updateStrategy?: boolean | number
    url?: boolean | number
    age?: boolean | number
    bookmarkCount?: boolean | number
    categories?: CategoryNodeListGenqlSelection
    chapters?: ChapterNodeListGenqlSelection
    chaptersAge?: boolean | number
    downloadCount?: boolean | number
    firstUnreadChapter?: ChapterTypeGenqlSelection
    hasDuplicateChapters?: boolean | number
    highestNumberedChapter?: ChapterTypeGenqlSelection
    lastReadChapter?: ChapterTypeGenqlSelection
    latestFetchedChapter?: ChapterTypeGenqlSelection
    latestReadChapter?: ChapterTypeGenqlSelection
    latestUploadedChapter?: ChapterTypeGenqlSelection
    meta?: MangaMetaTypeGenqlSelection
    source?: SourceTypeGenqlSelection
    trackRecords?: TrackRecordNodeListGenqlSelection
    unreadCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MangaUpdateTypeGenqlSelection{
    status?: boolean | number
    manga?: MangaTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MetaConditionInput {key?: (Scalars['String'] | null),value?: (Scalars['String'] | null)}

export interface MetaEdgeGenqlSelection{
    cursor?: boolean | number
    node?: GlobalMetaTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MetaFilterInput {and?: (MetaFilterInput[] | null),key?: (StringFilterInput | null),not?: (MetaFilterInput | null),or?: (MetaFilterInput[] | null),value?: (StringFilterInput | null)}

export interface MetaInput {key: Scalars['String'],value: Scalars['String']}

export interface MetaOrderInput {by: MetaOrderBy,byType?: (SortOrder | null)}

export interface MetaTypeGenqlSelection{
    key?: boolean | number
    value?: boolean | number
    on_CategoryMetaType?: CategoryMetaTypeGenqlSelection
    on_ChapterMetaType?: ChapterMetaTypeGenqlSelection
    on_GlobalMetaType?: GlobalMetaTypeGenqlSelection
    on_MangaMetaType?: MangaMetaTypeGenqlSelection
    on_SourceMetaType?: SourceMetaTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MultiSelectListPreferenceGenqlSelection{
    currentValue?: boolean | number
    default?: boolean | number
    dialogMessage?: boolean | number
    dialogTitle?: boolean | number
    enabled?: boolean | number
    entries?: boolean | number
    entryValues?: boolean | number
    key?: boolean | number
    summary?: boolean | number
    title?: boolean | number
    visible?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MutationGenqlSelection{
    createBackup?: (CreateBackupPayloadGenqlSelection & { __args?: {input?: (CreateBackupInput | null)} })
    restoreBackup?: (RestoreBackupPayloadGenqlSelection & { __args: {input: RestoreBackupInput} })
    createCategory?: (CreateCategoryPayloadGenqlSelection & { __args: {input: CreateCategoryInput} })
    deleteCategory?: (DeleteCategoryPayloadGenqlSelection & { __args: {input: DeleteCategoryInput} })
    deleteCategoryMeta?: (DeleteCategoryMetaPayloadGenqlSelection & { __args: {input: DeleteCategoryMetaInput} })
    deleteCategoryMetas?: (DeleteCategoryMetasPayloadGenqlSelection & { __args: {input: DeleteCategoryMetasInput} })
    setCategoryMeta?: (SetCategoryMetaPayloadGenqlSelection & { __args: {input: SetCategoryMetaInput} })
    setCategoryMetas?: (SetCategoryMetasPayloadGenqlSelection & { __args: {input: SetCategoryMetasInput} })
    updateCategories?: (UpdateCategoriesPayloadGenqlSelection & { __args: {input: UpdateCategoriesInput} })
    updateCategory?: (UpdateCategoryPayloadGenqlSelection & { __args: {input: UpdateCategoryInput} })
    updateCategoryOrder?: (UpdateCategoryOrderPayloadGenqlSelection & { __args: {input: UpdateCategoryOrderInput} })
    updateMangaCategories?: (UpdateMangaCategoriesPayloadGenqlSelection & { __args: {input: UpdateMangaCategoriesInput} })
    updateMangasCategories?: (UpdateMangasCategoriesPayloadGenqlSelection & { __args: {input: UpdateMangasCategoriesInput} })
    deleteChapterMeta?: (DeleteChapterMetaPayloadGenqlSelection & { __args: {input: DeleteChapterMetaInput} })
    deleteChapterMetas?: (DeleteChapterMetasPayloadGenqlSelection & { __args: {input: DeleteChapterMetasInput} })
    fetchChapterPages?: (FetchChapterPagesPayloadGenqlSelection & { __args: {input: FetchChapterPagesInput} })
    fetchChapters?: (FetchChaptersPayloadGenqlSelection & { __args: {input: FetchChaptersInput} })
    setChapterMeta?: (SetChapterMetaPayloadGenqlSelection & { __args: {input: SetChapterMetaInput} })
    setChapterMetas?: (SetChapterMetasPayloadGenqlSelection & { __args: {input: SetChapterMetasInput} })
    updateChapter?: (UpdateChapterPayloadGenqlSelection & { __args: {input: UpdateChapterInput} })
    updateChapters?: (UpdateChaptersPayloadGenqlSelection & { __args: {input: UpdateChaptersInput} })
    clearDownloader?: (ClearDownloaderPayloadGenqlSelection & { __args: {input: ClearDownloaderInput} })
    deleteDownloadedChapter?: (DeleteDownloadedChapterPayloadGenqlSelection & { __args: {input: DeleteDownloadedChapterInput} })
    deleteDownloadedChapters?: (DeleteDownloadedChaptersPayloadGenqlSelection & { __args: {input: DeleteDownloadedChaptersInput} })
    dequeueChapterDownload?: (DequeueChapterDownloadPayloadGenqlSelection & { __args: {input: DequeueChapterDownloadInput} })
    dequeueChapterDownloads?: (DequeueChapterDownloadsPayloadGenqlSelection & { __args: {input: DequeueChapterDownloadsInput} })
    enqueueChapterDownload?: (EnqueueChapterDownloadPayloadGenqlSelection & { __args: {input: EnqueueChapterDownloadInput} })
    enqueueChapterDownloads?: (EnqueueChapterDownloadsPayloadGenqlSelection & { __args: {input: EnqueueChapterDownloadsInput} })
    reorderChapterDownload?: (ReorderChapterDownloadPayloadGenqlSelection & { __args: {input: ReorderChapterDownloadInput} })
    startDownloader?: (StartDownloaderPayloadGenqlSelection & { __args: {input: StartDownloaderInput} })
    stopDownloader?: (StopDownloaderPayloadGenqlSelection & { __args: {input: StopDownloaderInput} })
    fetchExtensions?: (FetchExtensionsPayloadGenqlSelection & { __args: {input: FetchExtensionsInput} })
    installExternalExtension?: (InstallExternalExtensionPayloadGenqlSelection & { __args: {input: InstallExternalExtensionInput} })
    updateExtension?: (UpdateExtensionPayloadGenqlSelection & { __args: {input: UpdateExtensionInput} })
    updateExtensions?: (UpdateExtensionsPayloadGenqlSelection & { __args: {input: UpdateExtensionsInput} })
    clearCachedImages?: (ClearCachedImagesPayloadGenqlSelection & { __args: {input: ClearCachedImagesInput} })
    resetWebUIUpdateStatus?: WebUIUpdateStatusGenqlSelection
    updateWebUI?: (WebUIUpdatePayloadGenqlSelection & { __args: {input: WebUIUpdateInput} })
    connectKoSyncAccount?: (KoSyncConnectPayloadGenqlSelection & { __args: {input: ConnectKoSyncAccountInput} })
    logoutKoSyncAccount?: (LogoutKoSyncAccountPayloadGenqlSelection & { __args: {input: LogoutKoSyncAccountInput} })
    pullKoSyncProgress?: (PullKoSyncProgressPayloadGenqlSelection & { __args: {input: PullKoSyncProgressInput} })
    pushKoSyncProgress?: (PushKoSyncProgressPayloadGenqlSelection & { __args: {input: PushKoSyncProgressInput} })
    deleteMangaMeta?: (DeleteMangaMetaPayloadGenqlSelection & { __args: {input: DeleteMangaMetaInput} })
    deleteMangaMetas?: (DeleteMangaMetasPayloadGenqlSelection & { __args: {input: DeleteMangaMetasInput} })
    fetchManga?: (FetchMangaPayloadGenqlSelection & { __args: {input: FetchMangaInput} })
    setMangaMeta?: (SetMangaMetaPayloadGenqlSelection & { __args: {input: SetMangaMetaInput} })
    setMangaMetas?: (SetMangaMetasPayloadGenqlSelection & { __args: {input: SetMangaMetasInput} })
    updateManga?: (UpdateMangaPayloadGenqlSelection & { __args: {input: UpdateMangaInput} })
    updateMangas?: (UpdateMangasPayloadGenqlSelection & { __args: {input: UpdateMangasInput} })
    deleteGlobalMeta?: (DeleteGlobalMetaPayloadGenqlSelection & { __args: {input: DeleteGlobalMetaInput} })
    deleteGlobalMetas?: (DeleteGlobalMetasPayloadGenqlSelection & { __args: {input: DeleteGlobalMetasInput} })
    setGlobalMeta?: (SetGlobalMetaPayloadGenqlSelection & { __args: {input: SetGlobalMetaInput} })
    setGlobalMetas?: (SetGlobalMetasPayloadGenqlSelection & { __args: {input: SetGlobalMetasInput} })
    resetSettings?: (ResetSettingsPayloadGenqlSelection & { __args: {input: ResetSettingsInput} })
    setSettings?: (SetSettingsPayloadGenqlSelection & { __args: {input: SetSettingsInput} })
    deleteSourceMeta?: (DeleteSourceMetaPayloadGenqlSelection & { __args: {input: DeleteSourceMetaInput} })
    deleteSourceMetas?: (DeleteSourceMetasPayloadGenqlSelection & { __args: {input: DeleteSourceMetasInput} })
    fetchSourceManga?: (FetchSourceMangaPayloadGenqlSelection & { __args: {input: FetchSourceMangaInput} })
    setSourceMeta?: (SetSourceMetaPayloadGenqlSelection & { __args: {input: SetSourceMetaInput} })
    setSourceMetas?: (SetSourceMetasPayloadGenqlSelection & { __args: {input: SetSourceMetasInput} })
    updateSourcePreference?: (UpdateSourcePreferencePayloadGenqlSelection & { __args: {input: UpdateSourcePreferenceInput} })
    bindTrack?: (BindTrackPayloadGenqlSelection & { __args: {input: BindTrackInput} })
    fetchTrack?: (FetchTrackPayloadGenqlSelection & { __args: {input: FetchTrackInput} })
    loginTrackerCredentials?: (LoginTrackerCredentialsPayloadGenqlSelection & { __args: {input: LoginTrackerCredentialsInput} })
    loginTrackerOAuth?: (LoginTrackerOAuthPayloadGenqlSelection & { __args: {input: LoginTrackerOAuthInput} })
    logoutTracker?: (LogoutTrackerPayloadGenqlSelection & { __args: {input: LogoutTrackerInput} })
    trackProgress?: (TrackProgressPayloadGenqlSelection & { __args: {input: TrackProgressInput} })
    unbindTrack?: (UnbindTrackPayloadGenqlSelection & { __args: {input: UnbindTrackInput} })
    updateTrack?: (UpdateTrackPayloadGenqlSelection & { __args: {input: UpdateTrackInput} })
    updateCategoryManga?: (UpdateCategoryMangaPayloadGenqlSelection & { __args: {input: UpdateCategoryMangaInput} })
    updateLibrary?: (UpdateLibraryPayloadGenqlSelection & { __args: {input: UpdateLibraryInput} })
    updateLibraryManga?: (UpdateLibraryMangaPayloadGenqlSelection & { __args: {input: UpdateLibraryMangaInput} })
    updateStop?: (UpdateStopPayloadGenqlSelection & { __args: {input: UpdateStopInput} })
    login?: (LoginPayloadGenqlSelection & { __args: {input: LoginInput} })
    refreshToken?: (RefreshTokenPayloadGenqlSelection & { __args: {input: RefreshTokenInput} })
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface NodeGenqlSelection{
    on_CategoryMetaType?:CategoryMetaTypeGenqlSelection,
    on_CategoryType?:CategoryTypeGenqlSelection,
    on_ChapterMetaType?:ChapterMetaTypeGenqlSelection,
    on_ChapterType?:ChapterTypeGenqlSelection,
    on_DownloadType?:DownloadTypeGenqlSelection,
    on_DownloadUpdate?:DownloadUpdateGenqlSelection,
    on_ExtensionType?:ExtensionTypeGenqlSelection,
    on_GlobalMetaType?:GlobalMetaTypeGenqlSelection,
    on_MangaMetaType?:MangaMetaTypeGenqlSelection,
    on_MangaType?:MangaTypeGenqlSelection,
    on_PartialSettingsType?:PartialSettingsTypeGenqlSelection,
    on_SettingsType?:SettingsTypeGenqlSelection,
    on_SourceMetaType?:SourceMetaTypeGenqlSelection,
    on_SourceType?:SourceTypeGenqlSelection,
    on_TrackRecordType?:TrackRecordTypeGenqlSelection,
    on_TrackerType?:TrackerTypeGenqlSelection,
    on_MetaType?: MetaTypeGenqlSelection,
    on_Settings?: SettingsGenqlSelection,
    __typename?: boolean | number
}

export interface NodeListGenqlSelection{
    /** A list of edges which contains the [T] and cursor to aid in pagination. */
    edges?: EdgeGenqlSelection
    /** A list of [T] objects. */
    nodes?: NodeGenqlSelection
    /** Information to aid in pagination. */
    pageInfo?: PageInfoGenqlSelection
    /** The count of all nodes you could get from the connection. */
    totalCount?: boolean | number
    on_CategoryNodeList?: CategoryNodeListGenqlSelection
    on_ChapterNodeList?: ChapterNodeListGenqlSelection
    on_DownloadNodeList?: DownloadNodeListGenqlSelection
    on_ExtensionNodeList?: ExtensionNodeListGenqlSelection
    on_GlobalMetaNodeList?: GlobalMetaNodeListGenqlSelection
    on_MangaNodeList?: MangaNodeListGenqlSelection
    on_SourceNodeList?: SourceNodeListGenqlSelection
    on_TrackRecordNodeList?: TrackRecordNodeListGenqlSelection
    on_TrackerNodeList?: TrackerNodeListGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PageInfoGenqlSelection{
    /** When paginating forwards, the cursor to continue. */
    endCursor?: boolean | number
    /** When paginating forwards, are there more items? */
    hasNextPage?: boolean | number
    /** When paginating backwards, are there more items? */
    hasPreviousPage?: boolean | number
    /** When paginating backwards, the cursor to continue. */
    startCursor?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PartialBackupFlagsInput {includeCategories?: (Scalars['Boolean'] | null),includeChapters?: (Scalars['Boolean'] | null),includeClientData?: (Scalars['Boolean'] | null),includeHistory?: (Scalars['Boolean'] | null),includeManga?: (Scalars['Boolean'] | null),includeServerSettings?: (Scalars['Boolean'] | null),includeTracking?: (Scalars['Boolean'] | null)}

export interface PartialSettingsTypeGenqlSelection{
    authMode?: boolean | number
    authPassword?: boolean | number
    authUsername?: boolean | number
    autoBackupIncludeCategories?: boolean | number
    autoBackupIncludeChapters?: boolean | number
    autoBackupIncludeClientData?: boolean | number
    autoBackupIncludeHistory?: boolean | number
    autoBackupIncludeManga?: boolean | number
    autoBackupIncludeServerSettings?: boolean | number
    autoBackupIncludeTracking?: boolean | number
    /** @deprecated Replaced with autoDownloadNewChaptersLimit, replace with autoDownloadNewChaptersLimit */
    autoDownloadAheadLimit?: boolean | number
    autoDownloadIgnoreReUploads?: boolean | number
    autoDownloadNewChapters?: boolean | number
    autoDownloadNewChaptersLimit?: boolean | number
    backupInterval?: boolean | number
    backupPath?: boolean | number
    backupTTL?: boolean | number
    backupTime?: boolean | number
    /** @deprecated Removed - prefer authMode, replace with authMode */
    basicAuthEnabled?: boolean | number
    /** @deprecated Removed - prefer authPassword, replace with authPassword */
    basicAuthPassword?: boolean | number
    /** @deprecated Removed - prefer authUsername, replace with authUsername */
    basicAuthUsername?: boolean | number
    databasePassword?: boolean | number
    databaseType?: boolean | number
    databaseUrl?: boolean | number
    databaseUsername?: boolean | number
    debugLogsEnabled?: boolean | number
    downloadAsCbz?: boolean | number
    downloadConversions?: SettingsDownloadConversionTypeGenqlSelection
    downloadsPath?: boolean | number
    electronPath?: boolean | number
    excludeCompleted?: boolean | number
    excludeEntryWithUnreadChapters?: boolean | number
    excludeNotStarted?: boolean | number
    excludeUnreadChapters?: boolean | number
    extensionRepos?: boolean | number
    flareSolverrAsResponseFallback?: boolean | number
    flareSolverrEnabled?: boolean | number
    flareSolverrSessionName?: boolean | number
    flareSolverrSessionTtl?: boolean | number
    flareSolverrTimeout?: boolean | number
    flareSolverrUrl?: boolean | number
    globalUpdateInterval?: boolean | number
    /** @deprecated Removed - does not do anything */
    gqlDebugLogsEnabled?: boolean | number
    initialOpenInBrowserEnabled?: boolean | number
    ip?: boolean | number
    jwtAudience?: boolean | number
    jwtRefreshExpiry?: boolean | number
    jwtTokenExpiry?: boolean | number
    koreaderSyncChecksumMethod?: boolean | number
    /** @deprecated Moved to preference store. Is supposed to be random and gets auto generated, replace with MOVE TO PREFERENCES */
    koreaderSyncDeviceId?: boolean | number
    koreaderSyncPercentageTolerance?: boolean | number
    /** @deprecated Moved to preference store. User is supposed to use a login/logout mutation, replace with MOVE TO PREFERENCES */
    koreaderSyncServerUrl?: boolean | number
    /** @deprecated Replaced with koreaderSyncStrategyForward and koreaderSyncStrategyBackward, replace with koreaderSyncStrategyForward, koreaderSyncStrategyBackward */
    koreaderSyncStrategy?: boolean | number
    koreaderSyncStrategyBackward?: boolean | number
    koreaderSyncStrategyForward?: boolean | number
    /** @deprecated Moved to preference store. User is supposed to use a login/logout mutation, replace with MOVE TO PREFERENCES */
    koreaderSyncUserkey?: boolean | number
    /** @deprecated Moved to preference store. User is supposed to use a login/logout mutation, replace with MOVE TO PREFERENCES */
    koreaderSyncUsername?: boolean | number
    localSourcePath?: boolean | number
    maxLogFileSize?: boolean | number
    maxLogFiles?: boolean | number
    maxLogFolderSize?: boolean | number
    maxSourcesInParallel?: boolean | number
    opdsCbzMimetype?: boolean | number
    opdsChapterSortOrder?: boolean | number
    opdsEnablePageReadProgress?: boolean | number
    opdsItemsPerPage?: boolean | number
    opdsMarkAsReadOnDownload?: boolean | number
    opdsShowOnlyDownloadedChapters?: boolean | number
    opdsShowOnlyUnreadChapters?: boolean | number
    opdsUseBinaryFileSizes?: boolean | number
    port?: boolean | number
    serveConversions?: SettingsDownloadConversionTypeGenqlSelection
    socksProxyEnabled?: boolean | number
    socksProxyHost?: boolean | number
    socksProxyPassword?: boolean | number
    socksProxyPort?: boolean | number
    socksProxyUsername?: boolean | number
    socksProxyVersion?: boolean | number
    systemTrayEnabled?: boolean | number
    updateMangas?: boolean | number
    useHikariConnectionPool?: boolean | number
    webUIChannel?: boolean | number
    webUIFlavor?: boolean | number
    webUIInterface?: boolean | number
    webUIUpdateCheckInterval?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PartialSettingsTypeInput {authMode?: (AuthMode | null),authPassword?: (Scalars['String'] | null),authUsername?: (Scalars['String'] | null),autoBackupIncludeCategories?: (Scalars['Boolean'] | null),autoBackupIncludeChapters?: (Scalars['Boolean'] | null),autoBackupIncludeClientData?: (Scalars['Boolean'] | null),autoBackupIncludeHistory?: (Scalars['Boolean'] | null),autoBackupIncludeManga?: (Scalars['Boolean'] | null),autoBackupIncludeServerSettings?: (Scalars['Boolean'] | null),autoBackupIncludeTracking?: (Scalars['Boolean'] | null),autoDownloadIgnoreReUploads?: (Scalars['Boolean'] | null),autoDownloadNewChapters?: (Scalars['Boolean'] | null),autoDownloadNewChaptersLimit?: (Scalars['Int'] | null),backupInterval?: (Scalars['Int'] | null),backupPath?: (Scalars['String'] | null),backupTTL?: (Scalars['Int'] | null),backupTime?: (Scalars['String'] | null),databasePassword?: (Scalars['String'] | null),databaseType?: (DatabaseType | null),databaseUrl?: (Scalars['String'] | null),databaseUsername?: (Scalars['String'] | null),debugLogsEnabled?: (Scalars['Boolean'] | null),downloadAsCbz?: (Scalars['Boolean'] | null),downloadConversions?: (SettingsDownloadConversionTypeInput[] | null),downloadsPath?: (Scalars['String'] | null),electronPath?: (Scalars['String'] | null),excludeCompleted?: (Scalars['Boolean'] | null),excludeEntryWithUnreadChapters?: (Scalars['Boolean'] | null),excludeNotStarted?: (Scalars['Boolean'] | null),excludeUnreadChapters?: (Scalars['Boolean'] | null),extensionRepos?: (Scalars['String'][] | null),flareSolverrAsResponseFallback?: (Scalars['Boolean'] | null),flareSolverrEnabled?: (Scalars['Boolean'] | null),flareSolverrSessionName?: (Scalars['String'] | null),flareSolverrSessionTtl?: (Scalars['Int'] | null),flareSolverrTimeout?: (Scalars['Int'] | null),flareSolverrUrl?: (Scalars['String'] | null),globalUpdateInterval?: (Scalars['Float'] | null),initialOpenInBrowserEnabled?: (Scalars['Boolean'] | null),ip?: (Scalars['String'] | null),jwtAudience?: (Scalars['String'] | null),jwtRefreshExpiry?: (Scalars['Duration'] | null),jwtTokenExpiry?: (Scalars['Duration'] | null),koreaderSyncChecksumMethod?: (KoreaderSyncChecksumMethod | null),koreaderSyncPercentageTolerance?: (Scalars['Float'] | null),koreaderSyncStrategyBackward?: (KoreaderSyncConflictStrategy | null),koreaderSyncStrategyForward?: (KoreaderSyncConflictStrategy | null),localSourcePath?: (Scalars['String'] | null),maxLogFileSize?: (Scalars['String'] | null),maxLogFiles?: (Scalars['Int'] | null),maxLogFolderSize?: (Scalars['String'] | null),maxSourcesInParallel?: (Scalars['Int'] | null),opdsCbzMimetype?: (CbzMediaType | null),opdsChapterSortOrder?: (SortOrder | null),opdsEnablePageReadProgress?: (Scalars['Boolean'] | null),opdsItemsPerPage?: (Scalars['Int'] | null),opdsMarkAsReadOnDownload?: (Scalars['Boolean'] | null),opdsShowOnlyDownloadedChapters?: (Scalars['Boolean'] | null),opdsShowOnlyUnreadChapters?: (Scalars['Boolean'] | null),opdsUseBinaryFileSizes?: (Scalars['Boolean'] | null),port?: (Scalars['Int'] | null),serveConversions?: (SettingsDownloadConversionTypeInput[] | null),socksProxyEnabled?: (Scalars['Boolean'] | null),socksProxyHost?: (Scalars['String'] | null),socksProxyPassword?: (Scalars['String'] | null),socksProxyPort?: (Scalars['String'] | null),socksProxyUsername?: (Scalars['String'] | null),socksProxyVersion?: (Scalars['Int'] | null),systemTrayEnabled?: (Scalars['Boolean'] | null),updateMangas?: (Scalars['Boolean'] | null),useHikariConnectionPool?: (Scalars['Boolean'] | null),webUIChannel?: (WebUIChannel | null),webUIFlavor?: (WebUIFlavor | null),webUIInterface?: (WebUIInterface | null),webUIUpdateCheckInterval?: (Scalars['Float'] | null)}

export interface PreferenceGenqlSelection{
    on_CheckBoxPreference?:CheckBoxPreferenceGenqlSelection,
    on_EditTextPreference?:EditTextPreferenceGenqlSelection,
    on_ListPreference?:ListPreferenceGenqlSelection,
    on_MultiSelectListPreference?:MultiSelectListPreferenceGenqlSelection,
    on_SwitchPreference?:SwitchPreferenceGenqlSelection,
    __typename?: boolean | number
}

export interface PullKoSyncProgressInput {chapterId: Scalars['Int'],clientMutationId?: (Scalars['String'] | null)}

export interface PullKoSyncProgressPayloadGenqlSelection{
    chapter?: ChapterTypeGenqlSelection
    clientMutationId?: boolean | number
    syncConflict?: SyncConflictInfoTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PushKoSyncProgressInput {chapterId: Scalars['Int'],clientMutationId?: (Scalars['String'] | null)}

export interface PushKoSyncProgressPayloadGenqlSelection{
    chapter?: ChapterTypeGenqlSelection
    clientMutationId?: boolean | number
    success?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QueryGenqlSelection{
    restoreStatus?: (BackupRestoreStatusGenqlSelection & { __args: {id: Scalars['String']} })
    validateBackup?: (ValidateBackupResultGenqlSelection & { __args: {input: ValidateBackupInput} })
    categories?: (CategoryNodeListGenqlSelection & { __args?: {condition?: (CategoryConditionInput | null), filter?: (CategoryFilterInput | null), orderBy?: (CategoryOrderBy | null), orderByType?: (SortOrder | null), order?: (CategoryOrderInput[] | null), before?: (Scalars['Cursor'] | null), after?: (Scalars['Cursor'] | null), first?: (Scalars['Int'] | null), last?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null)} })
    category?: (CategoryTypeGenqlSelection & { __args: {id: Scalars['Int']} })
    chapter?: (ChapterTypeGenqlSelection & { __args: {id: Scalars['Int']} })
    chapters?: (ChapterNodeListGenqlSelection & { __args?: {condition?: (ChapterConditionInput | null), filter?: (ChapterFilterInput | null), orderBy?: (ChapterOrderBy | null), orderByType?: (SortOrder | null), order?: (ChapterOrderInput[] | null), before?: (Scalars['Cursor'] | null), after?: (Scalars['Cursor'] | null), first?: (Scalars['Int'] | null), last?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null)} })
    downloadStatus?: DownloadStatusGenqlSelection
    extension?: (ExtensionTypeGenqlSelection & { __args: {pkgName: Scalars['String']} })
    extensions?: (ExtensionNodeListGenqlSelection & { __args?: {condition?: (ExtensionConditionInput | null), filter?: (ExtensionFilterInput | null), orderBy?: (ExtensionOrderBy | null), orderByType?: (SortOrder | null), order?: (ExtensionOrderInput[] | null), before?: (Scalars['Cursor'] | null), after?: (Scalars['Cursor'] | null), first?: (Scalars['Int'] | null), last?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null)} })
    aboutServer?: AboutServerPayloadGenqlSelection
    aboutWebUI?: AboutWebUIGenqlSelection
    checkForServerUpdates?: CheckForServerUpdatesPayloadGenqlSelection
    checkForWebUIUpdate?: WebUIUpdateCheckGenqlSelection
    getWebUIUpdateStatus?: WebUIUpdateStatusGenqlSelection
    koSyncStatus?: KoSyncStatusPayloadGenqlSelection
    manga?: (MangaTypeGenqlSelection & { __args: {id: Scalars['Int']} })
    mangas?: (MangaNodeListGenqlSelection & { __args?: {condition?: (MangaConditionInput | null), filter?: (MangaFilterInput | null), orderBy?: (MangaOrderBy | null), orderByType?: (SortOrder | null), order?: (MangaOrderInput[] | null), before?: (Scalars['Cursor'] | null), after?: (Scalars['Cursor'] | null), first?: (Scalars['Int'] | null), last?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null)} })
    meta?: (GlobalMetaTypeGenqlSelection & { __args: {key: Scalars['String']} })
    metas?: (GlobalMetaNodeListGenqlSelection & { __args?: {condition?: (MetaConditionInput | null), filter?: (MetaFilterInput | null), orderBy?: (MetaOrderBy | null), orderByType?: (SortOrder | null), order?: (MetaOrderInput[] | null), before?: (Scalars['Cursor'] | null), after?: (Scalars['Cursor'] | null), first?: (Scalars['Int'] | null), last?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null)} })
    settings?: SettingsTypeGenqlSelection
    source?: (SourceTypeGenqlSelection & { __args: {id: Scalars['LongString']} })
    sources?: (SourceNodeListGenqlSelection & { __args?: {condition?: (SourceConditionInput | null), filter?: (SourceFilterInput | null), orderBy?: (SourceOrderBy | null), orderByType?: (SortOrder | null), order?: (SourceOrderInput[] | null), before?: (Scalars['Cursor'] | null), after?: (Scalars['Cursor'] | null), first?: (Scalars['Int'] | null), last?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null)} })
    searchTracker?: (SearchTrackerPayloadGenqlSelection & { __args: {input: SearchTrackerInput} })
    trackRecord?: (TrackRecordTypeGenqlSelection & { __args: {id: Scalars['Int']} })
    trackRecords?: (TrackRecordNodeListGenqlSelection & { __args?: {condition?: (TrackRecordConditionInput | null), filter?: (TrackRecordFilterInput | null), orderBy?: (TrackRecordOrderBy | null), orderByType?: (SortOrder | null), order?: (TrackRecordOrderInput[] | null), before?: (Scalars['Cursor'] | null), after?: (Scalars['Cursor'] | null), first?: (Scalars['Int'] | null), last?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null)} })
    tracker?: (TrackerTypeGenqlSelection & { __args: {id: Scalars['Int']} })
    trackers?: (TrackerNodeListGenqlSelection & { __args?: {condition?: (TrackerConditionInput | null), orderBy?: (TrackerOrderBy | null), orderByType?: (SortOrder | null), order?: (TrackerOrderInput[] | null), before?: (Scalars['Cursor'] | null), after?: (Scalars['Cursor'] | null), first?: (Scalars['Int'] | null), last?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null)} })
    lastUpdateTimestamp?: LastUpdateTimestampPayloadGenqlSelection
    libraryUpdateStatus?: LibraryUpdateStatusGenqlSelection
    /** @deprecated Replaced with libraryUpdateStatus, replace with libraryUpdateStatus */
    updateStatus?: UpdateStatusGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RefreshTokenInput {clientMutationId?: (Scalars['String'] | null),refreshToken: Scalars['String']}

export interface RefreshTokenPayloadGenqlSelection{
    accessToken?: boolean | number
    clientMutationId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ReorderChapterDownloadInput {chapterId: Scalars['Int'],clientMutationId?: (Scalars['String'] | null),to: Scalars['Int']}

export interface ReorderChapterDownloadPayloadGenqlSelection{
    clientMutationId?: boolean | number
    downloadStatus?: DownloadStatusGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ResetSettingsInput {clientMutationId?: (Scalars['String'] | null)}

export interface ResetSettingsPayloadGenqlSelection{
    clientMutationId?: boolean | number
    settings?: SettingsTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RestoreBackupInput {backup: Scalars['Upload'],clientMutationId?: (Scalars['String'] | null),flags?: (PartialBackupFlagsInput | null)}

export interface RestoreBackupPayloadGenqlSelection{
    clientMutationId?: boolean | number
    id?: boolean | number
    status?: BackupRestoreStatusGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SearchTrackerInput {query: Scalars['String'],trackerId: Scalars['Int']}

export interface SearchTrackerPayloadGenqlSelection{
    trackSearches?: TrackSearchTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SelectFilterGenqlSelection{
    default?: boolean | number
    name?: boolean | number
    values?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SeparatorFilterGenqlSelection{
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SetCategoryMetaInput {clientMutationId?: (Scalars['String'] | null),meta: CategoryMetaTypeInput}

export interface SetCategoryMetaPayloadGenqlSelection{
    clientMutationId?: boolean | number
    meta?: CategoryMetaTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SetCategoryMetasInput {clientMutationId?: (Scalars['String'] | null),items: SetCategoryMetasItemInput[]}

export interface SetCategoryMetasItemInput {categoryIds: Scalars['Int'][],metas: MetaInput[]}

export interface SetCategoryMetasPayloadGenqlSelection{
    categories?: CategoryTypeGenqlSelection
    clientMutationId?: boolean | number
    metas?: CategoryMetaTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SetChapterMetaInput {clientMutationId?: (Scalars['String'] | null),meta: ChapterMetaTypeInput}

export interface SetChapterMetaPayloadGenqlSelection{
    clientMutationId?: boolean | number
    meta?: ChapterMetaTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SetChapterMetasInput {clientMutationId?: (Scalars['String'] | null),items: SetChapterMetasItemInput[]}

export interface SetChapterMetasItemInput {chapterIds: Scalars['Int'][],metas: MetaInput[]}

export interface SetChapterMetasPayloadGenqlSelection{
    chapters?: ChapterTypeGenqlSelection
    clientMutationId?: boolean | number
    metas?: ChapterMetaTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SetGlobalMetaInput {clientMutationId?: (Scalars['String'] | null),meta: GlobalMetaTypeInput}

export interface SetGlobalMetaPayloadGenqlSelection{
    clientMutationId?: boolean | number
    meta?: GlobalMetaTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SetGlobalMetasInput {clientMutationId?: (Scalars['String'] | null),metas: MetaInput[]}

export interface SetGlobalMetasPayloadGenqlSelection{
    clientMutationId?: boolean | number
    metas?: GlobalMetaTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SetMangaMetaInput {clientMutationId?: (Scalars['String'] | null),meta: MangaMetaTypeInput}

export interface SetMangaMetaPayloadGenqlSelection{
    clientMutationId?: boolean | number
    meta?: MangaMetaTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SetMangaMetasInput {clientMutationId?: (Scalars['String'] | null),items: SetMangaMetasItemInput[]}

export interface SetMangaMetasItemInput {mangaIds: Scalars['Int'][],metas: MetaInput[]}

export interface SetMangaMetasPayloadGenqlSelection{
    clientMutationId?: boolean | number
    mangas?: MangaTypeGenqlSelection
    metas?: MangaMetaTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SetSettingsInput {clientMutationId?: (Scalars['String'] | null),settings: PartialSettingsTypeInput}

export interface SetSettingsPayloadGenqlSelection{
    clientMutationId?: boolean | number
    settings?: SettingsTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SetSourceMetaInput {clientMutationId?: (Scalars['String'] | null),meta: SourceMetaTypeInput}

export interface SetSourceMetaPayloadGenqlSelection{
    clientMutationId?: boolean | number
    meta?: SourceMetaTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SetSourceMetasInput {clientMutationId?: (Scalars['String'] | null),items: SetSourceMetasItemInput[]}

export interface SetSourceMetasItemInput {metas: MetaInput[],sourceIds: Scalars['LongString'][]}

export interface SetSourceMetasPayloadGenqlSelection{
    clientMutationId?: boolean | number
    metas?: SourceMetaTypeGenqlSelection
    sources?: SourceTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SettingsGenqlSelection{
    authMode?: boolean | number
    authPassword?: boolean | number
    authUsername?: boolean | number
    autoBackupIncludeCategories?: boolean | number
    autoBackupIncludeChapters?: boolean | number
    autoBackupIncludeClientData?: boolean | number
    autoBackupIncludeHistory?: boolean | number
    autoBackupIncludeManga?: boolean | number
    autoBackupIncludeServerSettings?: boolean | number
    autoBackupIncludeTracking?: boolean | number
    /** @deprecated Replaced with autoDownloadNewChaptersLimit, replace with autoDownloadNewChaptersLimit */
    autoDownloadAheadLimit?: boolean | number
    autoDownloadIgnoreReUploads?: boolean | number
    autoDownloadNewChapters?: boolean | number
    autoDownloadNewChaptersLimit?: boolean | number
    backupInterval?: boolean | number
    backupPath?: boolean | number
    backupTTL?: boolean | number
    backupTime?: boolean | number
    /** @deprecated Removed - prefer authMode, replace with authMode */
    basicAuthEnabled?: boolean | number
    /** @deprecated Removed - prefer authPassword, replace with authPassword */
    basicAuthPassword?: boolean | number
    /** @deprecated Removed - prefer authUsername, replace with authUsername */
    basicAuthUsername?: boolean | number
    databasePassword?: boolean | number
    databaseType?: boolean | number
    databaseUrl?: boolean | number
    databaseUsername?: boolean | number
    debugLogsEnabled?: boolean | number
    downloadAsCbz?: boolean | number
    downloadConversions?: SettingsDownloadConversionGenqlSelection
    downloadsPath?: boolean | number
    electronPath?: boolean | number
    excludeCompleted?: boolean | number
    excludeEntryWithUnreadChapters?: boolean | number
    excludeNotStarted?: boolean | number
    excludeUnreadChapters?: boolean | number
    extensionRepos?: boolean | number
    flareSolverrAsResponseFallback?: boolean | number
    flareSolverrEnabled?: boolean | number
    flareSolverrSessionName?: boolean | number
    flareSolverrSessionTtl?: boolean | number
    flareSolverrTimeout?: boolean | number
    flareSolverrUrl?: boolean | number
    globalUpdateInterval?: boolean | number
    /** @deprecated Removed - does not do anything */
    gqlDebugLogsEnabled?: boolean | number
    initialOpenInBrowserEnabled?: boolean | number
    ip?: boolean | number
    jwtAudience?: boolean | number
    jwtRefreshExpiry?: boolean | number
    jwtTokenExpiry?: boolean | number
    koreaderSyncChecksumMethod?: boolean | number
    /** @deprecated Moved to preference store. Is supposed to be random and gets auto generated, replace with MOVE TO PREFERENCES */
    koreaderSyncDeviceId?: boolean | number
    koreaderSyncPercentageTolerance?: boolean | number
    /** @deprecated Moved to preference store. User is supposed to use a login/logout mutation, replace with MOVE TO PREFERENCES */
    koreaderSyncServerUrl?: boolean | number
    /** @deprecated Replaced with koreaderSyncStrategyForward and koreaderSyncStrategyBackward, replace with koreaderSyncStrategyForward, koreaderSyncStrategyBackward */
    koreaderSyncStrategy?: boolean | number
    koreaderSyncStrategyBackward?: boolean | number
    koreaderSyncStrategyForward?: boolean | number
    /** @deprecated Moved to preference store. User is supposed to use a login/logout mutation, replace with MOVE TO PREFERENCES */
    koreaderSyncUserkey?: boolean | number
    /** @deprecated Moved to preference store. User is supposed to use a login/logout mutation, replace with MOVE TO PREFERENCES */
    koreaderSyncUsername?: boolean | number
    localSourcePath?: boolean | number
    maxLogFileSize?: boolean | number
    maxLogFiles?: boolean | number
    maxLogFolderSize?: boolean | number
    maxSourcesInParallel?: boolean | number
    opdsCbzMimetype?: boolean | number
    opdsChapterSortOrder?: boolean | number
    opdsEnablePageReadProgress?: boolean | number
    opdsItemsPerPage?: boolean | number
    opdsMarkAsReadOnDownload?: boolean | number
    opdsShowOnlyDownloadedChapters?: boolean | number
    opdsShowOnlyUnreadChapters?: boolean | number
    opdsUseBinaryFileSizes?: boolean | number
    port?: boolean | number
    serveConversions?: SettingsDownloadConversionGenqlSelection
    socksProxyEnabled?: boolean | number
    socksProxyHost?: boolean | number
    socksProxyPassword?: boolean | number
    socksProxyPort?: boolean | number
    socksProxyUsername?: boolean | number
    socksProxyVersion?: boolean | number
    systemTrayEnabled?: boolean | number
    updateMangas?: boolean | number
    useHikariConnectionPool?: boolean | number
    webUIChannel?: boolean | number
    webUIFlavor?: boolean | number
    webUIInterface?: boolean | number
    webUIUpdateCheckInterval?: boolean | number
    on_PartialSettingsType?: PartialSettingsTypeGenqlSelection
    on_SettingsType?: SettingsTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SettingsDownloadConversionGenqlSelection{
    callTimeout?: boolean | number
    compressionLevel?: boolean | number
    connectTimeout?: boolean | number
    headers?: SettingsDownloadConversionHeaderGenqlSelection
    mimeType?: boolean | number
    target?: boolean | number
    on_SettingsDownloadConversionType?: SettingsDownloadConversionTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SettingsDownloadConversionHeaderGenqlSelection{
    name?: boolean | number
    value?: boolean | number
    on_SettingsDownloadConversionHeaderType?: SettingsDownloadConversionHeaderTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SettingsDownloadConversionHeaderTypeGenqlSelection{
    name?: boolean | number
    value?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SettingsDownloadConversionHeaderTypeInput {name: Scalars['String'],value: Scalars['String']}

export interface SettingsDownloadConversionTypeGenqlSelection{
    callTimeout?: boolean | number
    compressionLevel?: boolean | number
    connectTimeout?: boolean | number
    headers?: SettingsDownloadConversionHeaderTypeGenqlSelection
    mimeType?: boolean | number
    target?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SettingsDownloadConversionTypeInput {callTimeout?: (Scalars['Duration'] | null),compressionLevel?: (Scalars['Float'] | null),connectTimeout?: (Scalars['Duration'] | null),headers?: (SettingsDownloadConversionHeaderTypeInput[] | null),mimeType: Scalars['String'],target: Scalars['String']}

export interface SettingsTypeGenqlSelection{
    authMode?: boolean | number
    authPassword?: boolean | number
    authUsername?: boolean | number
    autoBackupIncludeCategories?: boolean | number
    autoBackupIncludeChapters?: boolean | number
    autoBackupIncludeClientData?: boolean | number
    autoBackupIncludeHistory?: boolean | number
    autoBackupIncludeManga?: boolean | number
    autoBackupIncludeServerSettings?: boolean | number
    autoBackupIncludeTracking?: boolean | number
    /** @deprecated Replaced with autoDownloadNewChaptersLimit, replace with autoDownloadNewChaptersLimit */
    autoDownloadAheadLimit?: boolean | number
    autoDownloadIgnoreReUploads?: boolean | number
    autoDownloadNewChapters?: boolean | number
    autoDownloadNewChaptersLimit?: boolean | number
    backupInterval?: boolean | number
    backupPath?: boolean | number
    backupTTL?: boolean | number
    backupTime?: boolean | number
    /** @deprecated Removed - prefer authMode, replace with authMode */
    basicAuthEnabled?: boolean | number
    /** @deprecated Removed - prefer authPassword, replace with authPassword */
    basicAuthPassword?: boolean | number
    /** @deprecated Removed - prefer authUsername, replace with authUsername */
    basicAuthUsername?: boolean | number
    databasePassword?: boolean | number
    databaseType?: boolean | number
    databaseUrl?: boolean | number
    databaseUsername?: boolean | number
    debugLogsEnabled?: boolean | number
    downloadAsCbz?: boolean | number
    downloadConversions?: SettingsDownloadConversionTypeGenqlSelection
    downloadsPath?: boolean | number
    electronPath?: boolean | number
    excludeCompleted?: boolean | number
    excludeEntryWithUnreadChapters?: boolean | number
    excludeNotStarted?: boolean | number
    excludeUnreadChapters?: boolean | number
    extensionRepos?: boolean | number
    flareSolverrAsResponseFallback?: boolean | number
    flareSolverrEnabled?: boolean | number
    flareSolverrSessionName?: boolean | number
    flareSolverrSessionTtl?: boolean | number
    flareSolverrTimeout?: boolean | number
    flareSolverrUrl?: boolean | number
    globalUpdateInterval?: boolean | number
    /** @deprecated Removed - does not do anything */
    gqlDebugLogsEnabled?: boolean | number
    initialOpenInBrowserEnabled?: boolean | number
    ip?: boolean | number
    jwtAudience?: boolean | number
    jwtRefreshExpiry?: boolean | number
    jwtTokenExpiry?: boolean | number
    koreaderSyncChecksumMethod?: boolean | number
    /** @deprecated Moved to preference store. Is supposed to be random and gets auto generated, replace with MOVE TO PREFERENCES */
    koreaderSyncDeviceId?: boolean | number
    koreaderSyncPercentageTolerance?: boolean | number
    /** @deprecated Moved to preference store. User is supposed to use a login/logout mutation, replace with MOVE TO PREFERENCES */
    koreaderSyncServerUrl?: boolean | number
    /** @deprecated Replaced with koreaderSyncStrategyForward and koreaderSyncStrategyBackward, replace with koreaderSyncStrategyForward, koreaderSyncStrategyBackward */
    koreaderSyncStrategy?: boolean | number
    koreaderSyncStrategyBackward?: boolean | number
    koreaderSyncStrategyForward?: boolean | number
    /** @deprecated Moved to preference store. User is supposed to use a login/logout mutation, replace with MOVE TO PREFERENCES */
    koreaderSyncUserkey?: boolean | number
    /** @deprecated Moved to preference store. User is supposed to use a login/logout mutation, replace with MOVE TO PREFERENCES */
    koreaderSyncUsername?: boolean | number
    localSourcePath?: boolean | number
    maxLogFileSize?: boolean | number
    maxLogFiles?: boolean | number
    maxLogFolderSize?: boolean | number
    maxSourcesInParallel?: boolean | number
    opdsCbzMimetype?: boolean | number
    opdsChapterSortOrder?: boolean | number
    opdsEnablePageReadProgress?: boolean | number
    opdsItemsPerPage?: boolean | number
    opdsMarkAsReadOnDownload?: boolean | number
    opdsShowOnlyDownloadedChapters?: boolean | number
    opdsShowOnlyUnreadChapters?: boolean | number
    opdsUseBinaryFileSizes?: boolean | number
    port?: boolean | number
    serveConversions?: SettingsDownloadConversionTypeGenqlSelection
    socksProxyEnabled?: boolean | number
    socksProxyHost?: boolean | number
    socksProxyPassword?: boolean | number
    socksProxyPort?: boolean | number
    socksProxyUsername?: boolean | number
    socksProxyVersion?: boolean | number
    systemTrayEnabled?: boolean | number
    updateMangas?: boolean | number
    useHikariConnectionPool?: boolean | number
    webUIChannel?: boolean | number
    webUIFlavor?: boolean | number
    webUIInterface?: boolean | number
    webUIUpdateCheckInterval?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SortFilterGenqlSelection{
    default?: SortSelectionGenqlSelection
    name?: boolean | number
    values?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SortSelectionGenqlSelection{
    ascending?: boolean | number
    index?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SortSelectionInput {ascending: Scalars['Boolean'],index: Scalars['Int']}

export interface SourceConditionInput {id?: (Scalars['LongString'] | null),isNsfw?: (Scalars['Boolean'] | null),lang?: (Scalars['String'] | null),name?: (Scalars['String'] | null)}

export interface SourceEdgeGenqlSelection{
    cursor?: boolean | number
    node?: SourceTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SourceFilterInput {and?: (SourceFilterInput[] | null),id?: (LongFilterInput | null),isNsfw?: (BooleanFilterInput | null),lang?: (StringFilterInput | null),name?: (StringFilterInput | null),not?: (SourceFilterInput | null),or?: (SourceFilterInput[] | null)}

export interface SourceMetaTypeGenqlSelection{
    key?: boolean | number
    sourceId?: boolean | number
    value?: boolean | number
    source?: SourceTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SourceMetaTypeInput {key: Scalars['String'],sourceId: Scalars['LongString'],value: Scalars['String']}

export interface SourceNodeListGenqlSelection{
    edges?: SourceEdgeGenqlSelection
    nodes?: SourceTypeGenqlSelection
    pageInfo?: PageInfoGenqlSelection
    totalCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SourceOrderInput {by: SourceOrderBy,byType?: (SortOrder | null)}

export interface SourcePreferenceChangeInput {checkBoxState?: (Scalars['Boolean'] | null),editTextState?: (Scalars['String'] | null),listState?: (Scalars['String'] | null),multiSelectState?: (Scalars['String'][] | null),position: Scalars['Int'],switchState?: (Scalars['Boolean'] | null)}

export interface SourceTypeGenqlSelection{
    baseUrl?: boolean | number
    displayName?: boolean | number
    iconUrl?: boolean | number
    id?: boolean | number
    isConfigurable?: boolean | number
    isNsfw?: boolean | number
    lang?: boolean | number
    name?: boolean | number
    supportsLatest?: boolean | number
    extension?: ExtensionTypeGenqlSelection
    filters?: FilterGenqlSelection
    manga?: MangaNodeListGenqlSelection
    meta?: SourceMetaTypeGenqlSelection
    preferences?: PreferenceGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface StartDownloaderInput {clientMutationId?: (Scalars['String'] | null)}

export interface StartDownloaderPayloadGenqlSelection{
    clientMutationId?: boolean | number
    downloadStatus?: DownloadStatusGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface StopDownloaderInput {clientMutationId?: (Scalars['String'] | null)}

export interface StopDownloaderPayloadGenqlSelection{
    clientMutationId?: boolean | number
    downloadStatus?: DownloadStatusGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface StringFilterInput {distinctFrom?: (Scalars['String'] | null),distinctFromAll?: (Scalars['String'][] | null),distinctFromAny?: (Scalars['String'][] | null),distinctFromInsensitive?: (Scalars['String'] | null),distinctFromInsensitiveAll?: (Scalars['String'][] | null),distinctFromInsensitiveAny?: (Scalars['String'][] | null),endsWith?: (Scalars['String'] | null),endsWithAll?: (Scalars['String'][] | null),endsWithAny?: (Scalars['String'][] | null),endsWithInsensitive?: (Scalars['String'] | null),endsWithInsensitiveAll?: (Scalars['String'][] | null),endsWithInsensitiveAny?: (Scalars['String'][] | null),equalTo?: (Scalars['String'] | null),greaterThan?: (Scalars['String'] | null),greaterThanInsensitive?: (Scalars['String'] | null),greaterThanOrEqualTo?: (Scalars['String'] | null),greaterThanOrEqualToInsensitive?: (Scalars['String'] | null),in?: (Scalars['String'][] | null),inInsensitive?: (Scalars['String'][] | null),includes?: (Scalars['String'] | null),includesAll?: (Scalars['String'][] | null),includesAny?: (Scalars['String'][] | null),includesInsensitive?: (Scalars['String'] | null),includesInsensitiveAll?: (Scalars['String'][] | null),includesInsensitiveAny?: (Scalars['String'][] | null),isNull?: (Scalars['Boolean'] | null),lessThan?: (Scalars['String'] | null),lessThanInsensitive?: (Scalars['String'] | null),lessThanOrEqualTo?: (Scalars['String'] | null),lessThanOrEqualToInsensitive?: (Scalars['String'] | null),like?: (Scalars['String'] | null),likeAll?: (Scalars['String'][] | null),likeAny?: (Scalars['String'][] | null),likeInsensitive?: (Scalars['String'] | null),likeInsensitiveAll?: (Scalars['String'][] | null),likeInsensitiveAny?: (Scalars['String'][] | null),notDistinctFrom?: (Scalars['String'] | null),notDistinctFromInsensitive?: (Scalars['String'] | null),notEndsWith?: (Scalars['String'] | null),notEndsWithAll?: (Scalars['String'][] | null),notEndsWithAny?: (Scalars['String'][] | null),notEndsWithInsensitive?: (Scalars['String'] | null),notEndsWithInsensitiveAll?: (Scalars['String'][] | null),notEndsWithInsensitiveAny?: (Scalars['String'][] | null),notEqualTo?: (Scalars['String'] | null),notEqualToAll?: (Scalars['String'][] | null),notEqualToAny?: (Scalars['String'][] | null),notIn?: (Scalars['String'][] | null),notInInsensitive?: (Scalars['String'][] | null),notIncludes?: (Scalars['String'] | null),notIncludesAll?: (Scalars['String'][] | null),notIncludesAny?: (Scalars['String'][] | null),notIncludesInsensitive?: (Scalars['String'] | null),notIncludesInsensitiveAll?: (Scalars['String'][] | null),notIncludesInsensitiveAny?: (Scalars['String'][] | null),notLike?: (Scalars['String'] | null),notLikeAll?: (Scalars['String'][] | null),notLikeAny?: (Scalars['String'][] | null),notLikeInsensitive?: (Scalars['String'] | null),notLikeInsensitiveAll?: (Scalars['String'][] | null),notLikeInsensitiveAny?: (Scalars['String'][] | null),notStartsWith?: (Scalars['String'] | null),notStartsWithAll?: (Scalars['String'][] | null),notStartsWithAny?: (Scalars['String'][] | null),notStartsWithInsensitive?: (Scalars['String'] | null),notStartsWithInsensitiveAll?: (Scalars['String'][] | null),notStartsWithInsensitiveAny?: (Scalars['String'][] | null),startsWith?: (Scalars['String'] | null),startsWithAll?: (Scalars['String'][] | null),startsWithAny?: (Scalars['String'][] | null),startsWithInsensitive?: (Scalars['String'] | null),startsWithInsensitiveAll?: (Scalars['String'][] | null),startsWithInsensitiveAny?: (Scalars['String'][] | null)}

export interface SubscriptionGenqlSelection{
    /** @deprecated Replaced with downloadStatusChanged, replace with downloadStatusChanged(input) */
    downloadChanged?: DownloadStatusGenqlSelection
    downloadStatusChanged?: (DownloadUpdatesGenqlSelection & { __args: {input: DownloadChangedInput} })
    webUIUpdateStatusChange?: WebUIUpdateStatusGenqlSelection
    libraryUpdateStatusChanged?: (UpdaterUpdatesGenqlSelection & { __args: {input: LibraryUpdateStatusChangedInput} })
    /** @deprecated Replaced with updates, replace with updates(input) */
    updateStatusChanged?: UpdateStatusGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SwitchPreferenceGenqlSelection{
    currentValue?: boolean | number
    default?: boolean | number
    enabled?: boolean | number
    key?: boolean | number
    summary?: boolean | number
    title?: boolean | number
    visible?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SyncConflictInfoTypeGenqlSelection{
    deviceName?: boolean | number
    remotePage?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TextFilterGenqlSelection{
    default?: boolean | number
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TrackProgressInput {clientMutationId?: (Scalars['String'] | null),mangaId: Scalars['Int']}

export interface TrackProgressPayloadGenqlSelection{
    clientMutationId?: boolean | number
    trackRecords?: TrackRecordTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TrackRecordConditionInput {finishDate?: (Scalars['LongString'] | null),id?: (Scalars['Int'] | null),lastChapterRead?: (Scalars['Float'] | null),libraryId?: (Scalars['LongString'] | null),mangaId?: (Scalars['Int'] | null),private?: (Scalars['Boolean'] | null),remoteId?: (Scalars['LongString'] | null),remoteUrl?: (Scalars['String'] | null),score?: (Scalars['Float'] | null),startDate?: (Scalars['LongString'] | null),status?: (Scalars['Int'] | null),title?: (Scalars['String'] | null),totalChapters?: (Scalars['Int'] | null),trackerId?: (Scalars['Int'] | null)}

export interface TrackRecordEdgeGenqlSelection{
    cursor?: boolean | number
    node?: TrackRecordTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TrackRecordFilterInput {and?: (TrackRecordFilterInput[] | null),finishDate?: (LongFilterInput | null),id?: (IntFilterInput | null),lastChapterRead?: (DoubleFilterInput | null),libraryId?: (LongFilterInput | null),mangaId?: (IntFilterInput | null),not?: (TrackRecordFilterInput | null),or?: (TrackRecordFilterInput[] | null),private?: (BooleanFilterInput | null),remoteId?: (LongFilterInput | null),remoteUrl?: (StringFilterInput | null),score?: (DoubleFilterInput | null),startDate?: (LongFilterInput | null),status?: (IntFilterInput | null),title?: (StringFilterInput | null),totalChapters?: (IntFilterInput | null),trackerId?: (IntFilterInput | null)}

export interface TrackRecordNodeListGenqlSelection{
    edges?: TrackRecordEdgeGenqlSelection
    nodes?: TrackRecordTypeGenqlSelection
    pageInfo?: PageInfoGenqlSelection
    totalCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TrackRecordOrderInput {by: TrackRecordOrderBy,byType?: (SortOrder | null)}

export interface TrackRecordTypeGenqlSelection{
    finishDate?: boolean | number
    id?: boolean | number
    lastChapterRead?: boolean | number
    libraryId?: boolean | number
    mangaId?: boolean | number
    private?: boolean | number
    remoteId?: boolean | number
    remoteUrl?: boolean | number
    score?: boolean | number
    startDate?: boolean | number
    status?: boolean | number
    title?: boolean | number
    totalChapters?: boolean | number
    trackerId?: boolean | number
    displayScore?: boolean | number
    manga?: MangaTypeGenqlSelection
    tracker?: TrackerTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TrackSearchTypeGenqlSelection{
    coverUrl?: boolean | number
    finishedReadingDate?: boolean | number
    id?: boolean | number
    lastChapterRead?: boolean | number
    libraryId?: boolean | number
    private?: boolean | number
    publishingStatus?: boolean | number
    publishingType?: boolean | number
    remoteId?: boolean | number
    score?: boolean | number
    startDate?: boolean | number
    startedReadingDate?: boolean | number
    status?: boolean | number
    summary?: boolean | number
    title?: boolean | number
    totalChapters?: boolean | number
    trackerId?: boolean | number
    trackingUrl?: boolean | number
    displayScore?: boolean | number
    tracker?: TrackerTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TrackStatusTypeGenqlSelection{
    name?: boolean | number
    value?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TrackerConditionInput {icon?: (Scalars['String'] | null),id?: (Scalars['Int'] | null),isLoggedIn?: (Scalars['Boolean'] | null),name?: (Scalars['String'] | null)}

export interface TrackerEdgeGenqlSelection{
    cursor?: boolean | number
    node?: TrackerTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TrackerNodeListGenqlSelection{
    edges?: TrackerEdgeGenqlSelection
    nodes?: TrackerTypeGenqlSelection
    pageInfo?: PageInfoGenqlSelection
    totalCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TrackerOrderInput {by: TrackerOrderBy,byType?: (SortOrder | null)}

export interface TrackerTypeGenqlSelection{
    authUrl?: boolean | number
    icon?: boolean | number
    id?: boolean | number
    isLoggedIn?: boolean | number
    name?: boolean | number
    supportsPrivateTracking?: boolean | number
    supportsReadingDates?: boolean | number
    supportsTrackDeletion?: boolean | number
    isTokenExpired?: boolean | number
    scores?: boolean | number
    statuses?: TrackStatusTypeGenqlSelection
    trackRecords?: TrackRecordNodeListGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TriStateFilterGenqlSelection{
    default?: boolean | number
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UnbindTrackInput {clientMutationId?: (Scalars['String'] | null),
/** This will only work if the tracker of the track record supports deleting tracks */
deleteRemoteTrack?: (Scalars['Boolean'] | null),recordId: Scalars['Int']}

export interface UnbindTrackPayloadGenqlSelection{
    clientMutationId?: boolean | number
    trackRecord?: TrackRecordTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UpdateCategoriesInput {clientMutationId?: (Scalars['String'] | null),ids: Scalars['Int'][],patch: UpdateCategoryPatchInput}

export interface UpdateCategoriesPayloadGenqlSelection{
    categories?: CategoryTypeGenqlSelection
    clientMutationId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UpdateCategoryInput {clientMutationId?: (Scalars['String'] | null),id: Scalars['Int'],patch: UpdateCategoryPatchInput}

export interface UpdateCategoryMangaInput {categories: Scalars['Int'][],clientMutationId?: (Scalars['String'] | null)}

export interface UpdateCategoryMangaPayloadGenqlSelection{
    clientMutationId?: boolean | number
    updateStatus?: UpdateStatusGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UpdateCategoryOrderInput {clientMutationId?: (Scalars['String'] | null),id: Scalars['Int'],position: Scalars['Int']}

export interface UpdateCategoryOrderPayloadGenqlSelection{
    categories?: CategoryTypeGenqlSelection
    clientMutationId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UpdateCategoryPatchInput {default?: (Scalars['Boolean'] | null),includeInDownload?: (IncludeOrExclude | null),includeInUpdate?: (IncludeOrExclude | null),name?: (Scalars['String'] | null)}

export interface UpdateCategoryPayloadGenqlSelection{
    category?: CategoryTypeGenqlSelection
    clientMutationId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UpdateChapterInput {clientMutationId?: (Scalars['String'] | null),id: Scalars['Int'],patch: UpdateChapterPatchInput}

export interface UpdateChapterPatchInput {isBookmarked?: (Scalars['Boolean'] | null),isRead?: (Scalars['Boolean'] | null),lastPageRead?: (Scalars['Int'] | null)}

export interface UpdateChapterPayloadGenqlSelection{
    chapter?: ChapterTypeGenqlSelection
    clientMutationId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UpdateChaptersInput {clientMutationId?: (Scalars['String'] | null),ids: Scalars['Int'][],patch: UpdateChapterPatchInput}

export interface UpdateChaptersPayloadGenqlSelection{
    chapters?: ChapterTypeGenqlSelection
    clientMutationId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UpdateExtensionInput {clientMutationId?: (Scalars['String'] | null),id: Scalars['String'],patch: UpdateExtensionPatchInput}

export interface UpdateExtensionPatchInput {install?: (Scalars['Boolean'] | null),uninstall?: (Scalars['Boolean'] | null),update?: (Scalars['Boolean'] | null)}

export interface UpdateExtensionPayloadGenqlSelection{
    clientMutationId?: boolean | number
    extension?: ExtensionTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UpdateExtensionsInput {clientMutationId?: (Scalars['String'] | null),ids: Scalars['String'][],patch: UpdateExtensionPatchInput}

export interface UpdateExtensionsPayloadGenqlSelection{
    clientMutationId?: boolean | number
    extensions?: ExtensionTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UpdateLibraryInput {categories?: (Scalars['Int'][] | null),clientMutationId?: (Scalars['String'] | null)}

export interface UpdateLibraryMangaInput {clientMutationId?: (Scalars['String'] | null)}

export interface UpdateLibraryMangaPayloadGenqlSelection{
    clientMutationId?: boolean | number
    updateStatus?: UpdateStatusGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UpdateLibraryPayloadGenqlSelection{
    clientMutationId?: boolean | number
    updateStatus?: LibraryUpdateStatusGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UpdateMangaCategoriesInput {clientMutationId?: (Scalars['String'] | null),id: Scalars['Int'],patch: UpdateMangaCategoriesPatchInput}

export interface UpdateMangaCategoriesPatchInput {addToCategories?: (Scalars['Int'][] | null),clearCategories?: (Scalars['Boolean'] | null),removeFromCategories?: (Scalars['Int'][] | null)}

export interface UpdateMangaCategoriesPayloadGenqlSelection{
    clientMutationId?: boolean | number
    manga?: MangaTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UpdateMangaInput {clientMutationId?: (Scalars['String'] | null),id: Scalars['Int'],patch: UpdateMangaPatchInput}

export interface UpdateMangaPatchInput {inLibrary?: (Scalars['Boolean'] | null)}

export interface UpdateMangaPayloadGenqlSelection{
    clientMutationId?: boolean | number
    manga?: MangaTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UpdateMangasCategoriesInput {clientMutationId?: (Scalars['String'] | null),ids: Scalars['Int'][],patch: UpdateMangaCategoriesPatchInput}

export interface UpdateMangasCategoriesPayloadGenqlSelection{
    clientMutationId?: boolean | number
    mangas?: MangaTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UpdateMangasInput {clientMutationId?: (Scalars['String'] | null),ids: Scalars['Int'][],patch: UpdateMangaPatchInput}

export interface UpdateMangasPayloadGenqlSelection{
    clientMutationId?: boolean | number
    mangas?: MangaTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UpdateSourcePreferenceInput {change: SourcePreferenceChangeInput,clientMutationId?: (Scalars['String'] | null),source: Scalars['LongString']}

export interface UpdateSourcePreferencePayloadGenqlSelection{
    clientMutationId?: boolean | number
    preferences?: PreferenceGenqlSelection
    source?: SourceTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UpdateStatusGenqlSelection{
    completeJobs?: UpdateStatusTypeGenqlSelection
    failedJobs?: UpdateStatusTypeGenqlSelection
    isRunning?: boolean | number
    pendingJobs?: UpdateStatusTypeGenqlSelection
    runningJobs?: UpdateStatusTypeGenqlSelection
    skippedCategories?: UpdateStatusCategoryTypeGenqlSelection
    skippedJobs?: UpdateStatusTypeGenqlSelection
    updatingCategories?: UpdateStatusCategoryTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UpdateStatusCategoryTypeGenqlSelection{
    categories?: CategoryNodeListGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UpdateStatusTypeGenqlSelection{
    mangas?: MangaNodeListGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UpdateStopInput {clientMutationId?: (Scalars['String'] | null)}

export interface UpdateStopPayloadGenqlSelection{
    clientMutationId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UpdateTrackInput {clientMutationId?: (Scalars['String'] | null),
/** This will only work if the tracker of the track record supports reading dates */
finishDate?: (Scalars['LongString'] | null),lastChapterRead?: (Scalars['Float'] | null),
/** This will only work if the tracker of the track record supports private tracking */
private?: (Scalars['Boolean'] | null),recordId: Scalars['Int'],scoreString?: (Scalars['String'] | null),
/** This will only work if the tracker of the track record supports reading dates */
startDate?: (Scalars['LongString'] | null),status?: (Scalars['Int'] | null)}

export interface UpdateTrackPayloadGenqlSelection{
    clientMutationId?: boolean | number
    trackRecord?: TrackRecordTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UpdaterJobsInfoTypeGenqlSelection{
    finishedJobs?: boolean | number
    isRunning?: boolean | number
    skippedCategoriesCount?: boolean | number
    skippedMangasCount?: boolean | number
    totalJobs?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UpdaterUpdatesGenqlSelection{
    categoryUpdates?: CategoryUpdateTypeGenqlSelection
    /** The current update status at the time of sending the initial message. Is null for all following messages */
    initial?: LibraryUpdateStatusGenqlSelection
    jobsInfo?: UpdaterJobsInfoTypeGenqlSelection
    mangaUpdates?: MangaUpdateTypeGenqlSelection
    /** Indicates whether updates have been omitted based on the "maxUpdates" subscription variable. In case updates have been omitted, the "updateStatus" query should be re-fetched. */
    omittedUpdates?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ValidateBackupInput {backup: Scalars['Upload']}

export interface ValidateBackupResultGenqlSelection{
    missingSources?: ValidateBackupSourceGenqlSelection
    missingTrackers?: ValidateBackupTrackerGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ValidateBackupSourceGenqlSelection{
    id?: boolean | number
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ValidateBackupTrackerGenqlSelection{
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface WebUIUpdateCheckGenqlSelection{
    channel?: boolean | number
    tag?: boolean | number
    updateAvailable?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface WebUIUpdateInfoGenqlSelection{
    channel?: boolean | number
    tag?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface WebUIUpdateInput {clientMutationId?: (Scalars['String'] | null)}

export interface WebUIUpdatePayloadGenqlSelection{
    clientMutationId?: boolean | number
    updateStatus?: WebUIUpdateStatusGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface WebUIUpdateStatusGenqlSelection{
    info?: WebUIUpdateInfoGenqlSelection
    progress?: boolean | number
    state?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


    const AboutServerPayload_possibleTypes: string[] = ['AboutServerPayload']
    export const isAboutServerPayload = (obj?: { __typename?: any } | null): obj is AboutServerPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isAboutServerPayload"')
      return AboutServerPayload_possibleTypes.includes(obj.__typename)
    }
    


    const AboutWebUI_possibleTypes: string[] = ['AboutWebUI']
    export const isAboutWebUI = (obj?: { __typename?: any } | null): obj is AboutWebUI => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isAboutWebUI"')
      return AboutWebUI_possibleTypes.includes(obj.__typename)
    }
    


    const BackupRestoreStatus_possibleTypes: string[] = ['BackupRestoreStatus']
    export const isBackupRestoreStatus = (obj?: { __typename?: any } | null): obj is BackupRestoreStatus => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isBackupRestoreStatus"')
      return BackupRestoreStatus_possibleTypes.includes(obj.__typename)
    }
    


    const BindTrackPayload_possibleTypes: string[] = ['BindTrackPayload']
    export const isBindTrackPayload = (obj?: { __typename?: any } | null): obj is BindTrackPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isBindTrackPayload"')
      return BindTrackPayload_possibleTypes.includes(obj.__typename)
    }
    


    const CategoryEdge_possibleTypes: string[] = ['CategoryEdge']
    export const isCategoryEdge = (obj?: { __typename?: any } | null): obj is CategoryEdge => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCategoryEdge"')
      return CategoryEdge_possibleTypes.includes(obj.__typename)
    }
    


    const CategoryMetaType_possibleTypes: string[] = ['CategoryMetaType']
    export const isCategoryMetaType = (obj?: { __typename?: any } | null): obj is CategoryMetaType => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCategoryMetaType"')
      return CategoryMetaType_possibleTypes.includes(obj.__typename)
    }
    


    const CategoryNodeList_possibleTypes: string[] = ['CategoryNodeList']
    export const isCategoryNodeList = (obj?: { __typename?: any } | null): obj is CategoryNodeList => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCategoryNodeList"')
      return CategoryNodeList_possibleTypes.includes(obj.__typename)
    }
    


    const CategoryType_possibleTypes: string[] = ['CategoryType']
    export const isCategoryType = (obj?: { __typename?: any } | null): obj is CategoryType => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCategoryType"')
      return CategoryType_possibleTypes.includes(obj.__typename)
    }
    


    const CategoryUpdateType_possibleTypes: string[] = ['CategoryUpdateType']
    export const isCategoryUpdateType = (obj?: { __typename?: any } | null): obj is CategoryUpdateType => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCategoryUpdateType"')
      return CategoryUpdateType_possibleTypes.includes(obj.__typename)
    }
    


    const ChapterEdge_possibleTypes: string[] = ['ChapterEdge']
    export const isChapterEdge = (obj?: { __typename?: any } | null): obj is ChapterEdge => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isChapterEdge"')
      return ChapterEdge_possibleTypes.includes(obj.__typename)
    }
    


    const ChapterMetaType_possibleTypes: string[] = ['ChapterMetaType']
    export const isChapterMetaType = (obj?: { __typename?: any } | null): obj is ChapterMetaType => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isChapterMetaType"')
      return ChapterMetaType_possibleTypes.includes(obj.__typename)
    }
    


    const ChapterNodeList_possibleTypes: string[] = ['ChapterNodeList']
    export const isChapterNodeList = (obj?: { __typename?: any } | null): obj is ChapterNodeList => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isChapterNodeList"')
      return ChapterNodeList_possibleTypes.includes(obj.__typename)
    }
    


    const ChapterType_possibleTypes: string[] = ['ChapterType']
    export const isChapterType = (obj?: { __typename?: any } | null): obj is ChapterType => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isChapterType"')
      return ChapterType_possibleTypes.includes(obj.__typename)
    }
    


    const CheckBoxFilter_possibleTypes: string[] = ['CheckBoxFilter']
    export const isCheckBoxFilter = (obj?: { __typename?: any } | null): obj is CheckBoxFilter => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCheckBoxFilter"')
      return CheckBoxFilter_possibleTypes.includes(obj.__typename)
    }
    


    const CheckBoxPreference_possibleTypes: string[] = ['CheckBoxPreference']
    export const isCheckBoxPreference = (obj?: { __typename?: any } | null): obj is CheckBoxPreference => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCheckBoxPreference"')
      return CheckBoxPreference_possibleTypes.includes(obj.__typename)
    }
    


    const CheckForServerUpdatesPayload_possibleTypes: string[] = ['CheckForServerUpdatesPayload']
    export const isCheckForServerUpdatesPayload = (obj?: { __typename?: any } | null): obj is CheckForServerUpdatesPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCheckForServerUpdatesPayload"')
      return CheckForServerUpdatesPayload_possibleTypes.includes(obj.__typename)
    }
    


    const ClearCachedImagesPayload_possibleTypes: string[] = ['ClearCachedImagesPayload']
    export const isClearCachedImagesPayload = (obj?: { __typename?: any } | null): obj is ClearCachedImagesPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isClearCachedImagesPayload"')
      return ClearCachedImagesPayload_possibleTypes.includes(obj.__typename)
    }
    


    const ClearDownloaderPayload_possibleTypes: string[] = ['ClearDownloaderPayload']
    export const isClearDownloaderPayload = (obj?: { __typename?: any } | null): obj is ClearDownloaderPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isClearDownloaderPayload"')
      return ClearDownloaderPayload_possibleTypes.includes(obj.__typename)
    }
    


    const CreateBackupPayload_possibleTypes: string[] = ['CreateBackupPayload']
    export const isCreateBackupPayload = (obj?: { __typename?: any } | null): obj is CreateBackupPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCreateBackupPayload"')
      return CreateBackupPayload_possibleTypes.includes(obj.__typename)
    }
    


    const CreateCategoryPayload_possibleTypes: string[] = ['CreateCategoryPayload']
    export const isCreateCategoryPayload = (obj?: { __typename?: any } | null): obj is CreateCategoryPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCreateCategoryPayload"')
      return CreateCategoryPayload_possibleTypes.includes(obj.__typename)
    }
    


    const DeleteCategoryMetaPayload_possibleTypes: string[] = ['DeleteCategoryMetaPayload']
    export const isDeleteCategoryMetaPayload = (obj?: { __typename?: any } | null): obj is DeleteCategoryMetaPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDeleteCategoryMetaPayload"')
      return DeleteCategoryMetaPayload_possibleTypes.includes(obj.__typename)
    }
    


    const DeleteCategoryMetasPayload_possibleTypes: string[] = ['DeleteCategoryMetasPayload']
    export const isDeleteCategoryMetasPayload = (obj?: { __typename?: any } | null): obj is DeleteCategoryMetasPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDeleteCategoryMetasPayload"')
      return DeleteCategoryMetasPayload_possibleTypes.includes(obj.__typename)
    }
    


    const DeleteCategoryPayload_possibleTypes: string[] = ['DeleteCategoryPayload']
    export const isDeleteCategoryPayload = (obj?: { __typename?: any } | null): obj is DeleteCategoryPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDeleteCategoryPayload"')
      return DeleteCategoryPayload_possibleTypes.includes(obj.__typename)
    }
    


    const DeleteChapterMetaPayload_possibleTypes: string[] = ['DeleteChapterMetaPayload']
    export const isDeleteChapterMetaPayload = (obj?: { __typename?: any } | null): obj is DeleteChapterMetaPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDeleteChapterMetaPayload"')
      return DeleteChapterMetaPayload_possibleTypes.includes(obj.__typename)
    }
    


    const DeleteChapterMetasPayload_possibleTypes: string[] = ['DeleteChapterMetasPayload']
    export const isDeleteChapterMetasPayload = (obj?: { __typename?: any } | null): obj is DeleteChapterMetasPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDeleteChapterMetasPayload"')
      return DeleteChapterMetasPayload_possibleTypes.includes(obj.__typename)
    }
    


    const DeleteDownloadedChapterPayload_possibleTypes: string[] = ['DeleteDownloadedChapterPayload']
    export const isDeleteDownloadedChapterPayload = (obj?: { __typename?: any } | null): obj is DeleteDownloadedChapterPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDeleteDownloadedChapterPayload"')
      return DeleteDownloadedChapterPayload_possibleTypes.includes(obj.__typename)
    }
    


    const DeleteDownloadedChaptersPayload_possibleTypes: string[] = ['DeleteDownloadedChaptersPayload']
    export const isDeleteDownloadedChaptersPayload = (obj?: { __typename?: any } | null): obj is DeleteDownloadedChaptersPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDeleteDownloadedChaptersPayload"')
      return DeleteDownloadedChaptersPayload_possibleTypes.includes(obj.__typename)
    }
    


    const DeleteGlobalMetaPayload_possibleTypes: string[] = ['DeleteGlobalMetaPayload']
    export const isDeleteGlobalMetaPayload = (obj?: { __typename?: any } | null): obj is DeleteGlobalMetaPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDeleteGlobalMetaPayload"')
      return DeleteGlobalMetaPayload_possibleTypes.includes(obj.__typename)
    }
    


    const DeleteGlobalMetasPayload_possibleTypes: string[] = ['DeleteGlobalMetasPayload']
    export const isDeleteGlobalMetasPayload = (obj?: { __typename?: any } | null): obj is DeleteGlobalMetasPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDeleteGlobalMetasPayload"')
      return DeleteGlobalMetasPayload_possibleTypes.includes(obj.__typename)
    }
    


    const DeleteMangaMetaPayload_possibleTypes: string[] = ['DeleteMangaMetaPayload']
    export const isDeleteMangaMetaPayload = (obj?: { __typename?: any } | null): obj is DeleteMangaMetaPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDeleteMangaMetaPayload"')
      return DeleteMangaMetaPayload_possibleTypes.includes(obj.__typename)
    }
    


    const DeleteMangaMetasPayload_possibleTypes: string[] = ['DeleteMangaMetasPayload']
    export const isDeleteMangaMetasPayload = (obj?: { __typename?: any } | null): obj is DeleteMangaMetasPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDeleteMangaMetasPayload"')
      return DeleteMangaMetasPayload_possibleTypes.includes(obj.__typename)
    }
    


    const DeleteSourceMetaPayload_possibleTypes: string[] = ['DeleteSourceMetaPayload']
    export const isDeleteSourceMetaPayload = (obj?: { __typename?: any } | null): obj is DeleteSourceMetaPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDeleteSourceMetaPayload"')
      return DeleteSourceMetaPayload_possibleTypes.includes(obj.__typename)
    }
    


    const DeleteSourceMetasPayload_possibleTypes: string[] = ['DeleteSourceMetasPayload']
    export const isDeleteSourceMetasPayload = (obj?: { __typename?: any } | null): obj is DeleteSourceMetasPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDeleteSourceMetasPayload"')
      return DeleteSourceMetasPayload_possibleTypes.includes(obj.__typename)
    }
    


    const DequeueChapterDownloadPayload_possibleTypes: string[] = ['DequeueChapterDownloadPayload']
    export const isDequeueChapterDownloadPayload = (obj?: { __typename?: any } | null): obj is DequeueChapterDownloadPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDequeueChapterDownloadPayload"')
      return DequeueChapterDownloadPayload_possibleTypes.includes(obj.__typename)
    }
    


    const DequeueChapterDownloadsPayload_possibleTypes: string[] = ['DequeueChapterDownloadsPayload']
    export const isDequeueChapterDownloadsPayload = (obj?: { __typename?: any } | null): obj is DequeueChapterDownloadsPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDequeueChapterDownloadsPayload"')
      return DequeueChapterDownloadsPayload_possibleTypes.includes(obj.__typename)
    }
    


    const DownloadEdge_possibleTypes: string[] = ['DownloadEdge']
    export const isDownloadEdge = (obj?: { __typename?: any } | null): obj is DownloadEdge => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDownloadEdge"')
      return DownloadEdge_possibleTypes.includes(obj.__typename)
    }
    


    const DownloadNodeList_possibleTypes: string[] = ['DownloadNodeList']
    export const isDownloadNodeList = (obj?: { __typename?: any } | null): obj is DownloadNodeList => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDownloadNodeList"')
      return DownloadNodeList_possibleTypes.includes(obj.__typename)
    }
    


    const DownloadStatus_possibleTypes: string[] = ['DownloadStatus']
    export const isDownloadStatus = (obj?: { __typename?: any } | null): obj is DownloadStatus => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDownloadStatus"')
      return DownloadStatus_possibleTypes.includes(obj.__typename)
    }
    


    const DownloadType_possibleTypes: string[] = ['DownloadType']
    export const isDownloadType = (obj?: { __typename?: any } | null): obj is DownloadType => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDownloadType"')
      return DownloadType_possibleTypes.includes(obj.__typename)
    }
    


    const DownloadUpdate_possibleTypes: string[] = ['DownloadUpdate']
    export const isDownloadUpdate = (obj?: { __typename?: any } | null): obj is DownloadUpdate => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDownloadUpdate"')
      return DownloadUpdate_possibleTypes.includes(obj.__typename)
    }
    


    const DownloadUpdates_possibleTypes: string[] = ['DownloadUpdates']
    export const isDownloadUpdates = (obj?: { __typename?: any } | null): obj is DownloadUpdates => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDownloadUpdates"')
      return DownloadUpdates_possibleTypes.includes(obj.__typename)
    }
    


    const Edge_possibleTypes: string[] = ['CategoryEdge','ChapterEdge','DownloadEdge','ExtensionEdge','MangaEdge','MetaEdge','SourceEdge','TrackRecordEdge','TrackerEdge']
    export const isEdge = (obj?: { __typename?: any } | null): obj is Edge => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isEdge"')
      return Edge_possibleTypes.includes(obj.__typename)
    }
    


    const EditTextPreference_possibleTypes: string[] = ['EditTextPreference']
    export const isEditTextPreference = (obj?: { __typename?: any } | null): obj is EditTextPreference => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isEditTextPreference"')
      return EditTextPreference_possibleTypes.includes(obj.__typename)
    }
    


    const EnqueueChapterDownloadPayload_possibleTypes: string[] = ['EnqueueChapterDownloadPayload']
    export const isEnqueueChapterDownloadPayload = (obj?: { __typename?: any } | null): obj is EnqueueChapterDownloadPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isEnqueueChapterDownloadPayload"')
      return EnqueueChapterDownloadPayload_possibleTypes.includes(obj.__typename)
    }
    


    const EnqueueChapterDownloadsPayload_possibleTypes: string[] = ['EnqueueChapterDownloadsPayload']
    export const isEnqueueChapterDownloadsPayload = (obj?: { __typename?: any } | null): obj is EnqueueChapterDownloadsPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isEnqueueChapterDownloadsPayload"')
      return EnqueueChapterDownloadsPayload_possibleTypes.includes(obj.__typename)
    }
    


    const ExtensionEdge_possibleTypes: string[] = ['ExtensionEdge']
    export const isExtensionEdge = (obj?: { __typename?: any } | null): obj is ExtensionEdge => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isExtensionEdge"')
      return ExtensionEdge_possibleTypes.includes(obj.__typename)
    }
    


    const ExtensionNodeList_possibleTypes: string[] = ['ExtensionNodeList']
    export const isExtensionNodeList = (obj?: { __typename?: any } | null): obj is ExtensionNodeList => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isExtensionNodeList"')
      return ExtensionNodeList_possibleTypes.includes(obj.__typename)
    }
    


    const ExtensionType_possibleTypes: string[] = ['ExtensionType']
    export const isExtensionType = (obj?: { __typename?: any } | null): obj is ExtensionType => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isExtensionType"')
      return ExtensionType_possibleTypes.includes(obj.__typename)
    }
    


    const FetchChapterPagesPayload_possibleTypes: string[] = ['FetchChapterPagesPayload']
    export const isFetchChapterPagesPayload = (obj?: { __typename?: any } | null): obj is FetchChapterPagesPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isFetchChapterPagesPayload"')
      return FetchChapterPagesPayload_possibleTypes.includes(obj.__typename)
    }
    


    const FetchChaptersPayload_possibleTypes: string[] = ['FetchChaptersPayload']
    export const isFetchChaptersPayload = (obj?: { __typename?: any } | null): obj is FetchChaptersPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isFetchChaptersPayload"')
      return FetchChaptersPayload_possibleTypes.includes(obj.__typename)
    }
    


    const FetchExtensionsPayload_possibleTypes: string[] = ['FetchExtensionsPayload']
    export const isFetchExtensionsPayload = (obj?: { __typename?: any } | null): obj is FetchExtensionsPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isFetchExtensionsPayload"')
      return FetchExtensionsPayload_possibleTypes.includes(obj.__typename)
    }
    


    const FetchMangaPayload_possibleTypes: string[] = ['FetchMangaPayload']
    export const isFetchMangaPayload = (obj?: { __typename?: any } | null): obj is FetchMangaPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isFetchMangaPayload"')
      return FetchMangaPayload_possibleTypes.includes(obj.__typename)
    }
    


    const FetchSourceMangaPayload_possibleTypes: string[] = ['FetchSourceMangaPayload']
    export const isFetchSourceMangaPayload = (obj?: { __typename?: any } | null): obj is FetchSourceMangaPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isFetchSourceMangaPayload"')
      return FetchSourceMangaPayload_possibleTypes.includes(obj.__typename)
    }
    


    const FetchTrackPayload_possibleTypes: string[] = ['FetchTrackPayload']
    export const isFetchTrackPayload = (obj?: { __typename?: any } | null): obj is FetchTrackPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isFetchTrackPayload"')
      return FetchTrackPayload_possibleTypes.includes(obj.__typename)
    }
    


    const Filter_possibleTypes: string[] = ['CheckBoxFilter','GroupFilter','HeaderFilter','SelectFilter','SeparatorFilter','SortFilter','TextFilter','TriStateFilter']
    export const isFilter = (obj?: { __typename?: any } | null): obj is Filter => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isFilter"')
      return Filter_possibleTypes.includes(obj.__typename)
    }
    


    const GlobalMetaNodeList_possibleTypes: string[] = ['GlobalMetaNodeList']
    export const isGlobalMetaNodeList = (obj?: { __typename?: any } | null): obj is GlobalMetaNodeList => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isGlobalMetaNodeList"')
      return GlobalMetaNodeList_possibleTypes.includes(obj.__typename)
    }
    


    const GlobalMetaType_possibleTypes: string[] = ['GlobalMetaType']
    export const isGlobalMetaType = (obj?: { __typename?: any } | null): obj is GlobalMetaType => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isGlobalMetaType"')
      return GlobalMetaType_possibleTypes.includes(obj.__typename)
    }
    


    const GroupFilter_possibleTypes: string[] = ['GroupFilter']
    export const isGroupFilter = (obj?: { __typename?: any } | null): obj is GroupFilter => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isGroupFilter"')
      return GroupFilter_possibleTypes.includes(obj.__typename)
    }
    


    const HeaderFilter_possibleTypes: string[] = ['HeaderFilter']
    export const isHeaderFilter = (obj?: { __typename?: any } | null): obj is HeaderFilter => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isHeaderFilter"')
      return HeaderFilter_possibleTypes.includes(obj.__typename)
    }
    


    const InstallExternalExtensionPayload_possibleTypes: string[] = ['InstallExternalExtensionPayload']
    export const isInstallExternalExtensionPayload = (obj?: { __typename?: any } | null): obj is InstallExternalExtensionPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isInstallExternalExtensionPayload"')
      return InstallExternalExtensionPayload_possibleTypes.includes(obj.__typename)
    }
    


    const KoSyncConnectPayload_possibleTypes: string[] = ['KoSyncConnectPayload']
    export const isKoSyncConnectPayload = (obj?: { __typename?: any } | null): obj is KoSyncConnectPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isKoSyncConnectPayload"')
      return KoSyncConnectPayload_possibleTypes.includes(obj.__typename)
    }
    


    const KoSyncStatusPayload_possibleTypes: string[] = ['KoSyncStatusPayload']
    export const isKoSyncStatusPayload = (obj?: { __typename?: any } | null): obj is KoSyncStatusPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isKoSyncStatusPayload"')
      return KoSyncStatusPayload_possibleTypes.includes(obj.__typename)
    }
    


    const LastUpdateTimestampPayload_possibleTypes: string[] = ['LastUpdateTimestampPayload']
    export const isLastUpdateTimestampPayload = (obj?: { __typename?: any } | null): obj is LastUpdateTimestampPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isLastUpdateTimestampPayload"')
      return LastUpdateTimestampPayload_possibleTypes.includes(obj.__typename)
    }
    


    const LibraryUpdateStatus_possibleTypes: string[] = ['LibraryUpdateStatus']
    export const isLibraryUpdateStatus = (obj?: { __typename?: any } | null): obj is LibraryUpdateStatus => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isLibraryUpdateStatus"')
      return LibraryUpdateStatus_possibleTypes.includes(obj.__typename)
    }
    


    const ListPreference_possibleTypes: string[] = ['ListPreference']
    export const isListPreference = (obj?: { __typename?: any } | null): obj is ListPreference => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isListPreference"')
      return ListPreference_possibleTypes.includes(obj.__typename)
    }
    


    const LoginPayload_possibleTypes: string[] = ['LoginPayload']
    export const isLoginPayload = (obj?: { __typename?: any } | null): obj is LoginPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isLoginPayload"')
      return LoginPayload_possibleTypes.includes(obj.__typename)
    }
    


    const LoginTrackerCredentialsPayload_possibleTypes: string[] = ['LoginTrackerCredentialsPayload']
    export const isLoginTrackerCredentialsPayload = (obj?: { __typename?: any } | null): obj is LoginTrackerCredentialsPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isLoginTrackerCredentialsPayload"')
      return LoginTrackerCredentialsPayload_possibleTypes.includes(obj.__typename)
    }
    


    const LoginTrackerOAuthPayload_possibleTypes: string[] = ['LoginTrackerOAuthPayload']
    export const isLoginTrackerOAuthPayload = (obj?: { __typename?: any } | null): obj is LoginTrackerOAuthPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isLoginTrackerOAuthPayload"')
      return LoginTrackerOAuthPayload_possibleTypes.includes(obj.__typename)
    }
    


    const LogoutKoSyncAccountPayload_possibleTypes: string[] = ['LogoutKoSyncAccountPayload']
    export const isLogoutKoSyncAccountPayload = (obj?: { __typename?: any } | null): obj is LogoutKoSyncAccountPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isLogoutKoSyncAccountPayload"')
      return LogoutKoSyncAccountPayload_possibleTypes.includes(obj.__typename)
    }
    


    const LogoutTrackerPayload_possibleTypes: string[] = ['LogoutTrackerPayload']
    export const isLogoutTrackerPayload = (obj?: { __typename?: any } | null): obj is LogoutTrackerPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isLogoutTrackerPayload"')
      return LogoutTrackerPayload_possibleTypes.includes(obj.__typename)
    }
    


    const MangaEdge_possibleTypes: string[] = ['MangaEdge']
    export const isMangaEdge = (obj?: { __typename?: any } | null): obj is MangaEdge => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMangaEdge"')
      return MangaEdge_possibleTypes.includes(obj.__typename)
    }
    


    const MangaMetaType_possibleTypes: string[] = ['MangaMetaType']
    export const isMangaMetaType = (obj?: { __typename?: any } | null): obj is MangaMetaType => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMangaMetaType"')
      return MangaMetaType_possibleTypes.includes(obj.__typename)
    }
    


    const MangaNodeList_possibleTypes: string[] = ['MangaNodeList']
    export const isMangaNodeList = (obj?: { __typename?: any } | null): obj is MangaNodeList => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMangaNodeList"')
      return MangaNodeList_possibleTypes.includes(obj.__typename)
    }
    


    const MangaType_possibleTypes: string[] = ['MangaType']
    export const isMangaType = (obj?: { __typename?: any } | null): obj is MangaType => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMangaType"')
      return MangaType_possibleTypes.includes(obj.__typename)
    }
    


    const MangaUpdateType_possibleTypes: string[] = ['MangaUpdateType']
    export const isMangaUpdateType = (obj?: { __typename?: any } | null): obj is MangaUpdateType => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMangaUpdateType"')
      return MangaUpdateType_possibleTypes.includes(obj.__typename)
    }
    


    const MetaEdge_possibleTypes: string[] = ['MetaEdge']
    export const isMetaEdge = (obj?: { __typename?: any } | null): obj is MetaEdge => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMetaEdge"')
      return MetaEdge_possibleTypes.includes(obj.__typename)
    }
    


    const MetaType_possibleTypes: string[] = ['CategoryMetaType','ChapterMetaType','GlobalMetaType','MangaMetaType','SourceMetaType']
    export const isMetaType = (obj?: { __typename?: any } | null): obj is MetaType => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMetaType"')
      return MetaType_possibleTypes.includes(obj.__typename)
    }
    


    const MultiSelectListPreference_possibleTypes: string[] = ['MultiSelectListPreference']
    export const isMultiSelectListPreference = (obj?: { __typename?: any } | null): obj is MultiSelectListPreference => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMultiSelectListPreference"')
      return MultiSelectListPreference_possibleTypes.includes(obj.__typename)
    }
    


    const Mutation_possibleTypes: string[] = ['Mutation']
    export const isMutation = (obj?: { __typename?: any } | null): obj is Mutation => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMutation"')
      return Mutation_possibleTypes.includes(obj.__typename)
    }
    


    const Node_possibleTypes: string[] = ['CategoryMetaType','CategoryType','ChapterMetaType','ChapterType','DownloadType','DownloadUpdate','ExtensionType','GlobalMetaType','MangaMetaType','MangaType','PartialSettingsType','SettingsType','SourceMetaType','SourceType','TrackRecordType','TrackerType']
    export const isNode = (obj?: { __typename?: any } | null): obj is Node => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isNode"')
      return Node_possibleTypes.includes(obj.__typename)
    }
    


    const NodeList_possibleTypes: string[] = ['CategoryNodeList','ChapterNodeList','DownloadNodeList','ExtensionNodeList','GlobalMetaNodeList','MangaNodeList','SourceNodeList','TrackRecordNodeList','TrackerNodeList']
    export const isNodeList = (obj?: { __typename?: any } | null): obj is NodeList => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isNodeList"')
      return NodeList_possibleTypes.includes(obj.__typename)
    }
    


    const PageInfo_possibleTypes: string[] = ['PageInfo']
    export const isPageInfo = (obj?: { __typename?: any } | null): obj is PageInfo => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPageInfo"')
      return PageInfo_possibleTypes.includes(obj.__typename)
    }
    


    const PartialSettingsType_possibleTypes: string[] = ['PartialSettingsType']
    export const isPartialSettingsType = (obj?: { __typename?: any } | null): obj is PartialSettingsType => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPartialSettingsType"')
      return PartialSettingsType_possibleTypes.includes(obj.__typename)
    }
    


    const Preference_possibleTypes: string[] = ['CheckBoxPreference','EditTextPreference','ListPreference','MultiSelectListPreference','SwitchPreference']
    export const isPreference = (obj?: { __typename?: any } | null): obj is Preference => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPreference"')
      return Preference_possibleTypes.includes(obj.__typename)
    }
    


    const PullKoSyncProgressPayload_possibleTypes: string[] = ['PullKoSyncProgressPayload']
    export const isPullKoSyncProgressPayload = (obj?: { __typename?: any } | null): obj is PullKoSyncProgressPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPullKoSyncProgressPayload"')
      return PullKoSyncProgressPayload_possibleTypes.includes(obj.__typename)
    }
    


    const PushKoSyncProgressPayload_possibleTypes: string[] = ['PushKoSyncProgressPayload']
    export const isPushKoSyncProgressPayload = (obj?: { __typename?: any } | null): obj is PushKoSyncProgressPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPushKoSyncProgressPayload"')
      return PushKoSyncProgressPayload_possibleTypes.includes(obj.__typename)
    }
    


    const Query_possibleTypes: string[] = ['Query']
    export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
      return Query_possibleTypes.includes(obj.__typename)
    }
    


    const RefreshTokenPayload_possibleTypes: string[] = ['RefreshTokenPayload']
    export const isRefreshTokenPayload = (obj?: { __typename?: any } | null): obj is RefreshTokenPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isRefreshTokenPayload"')
      return RefreshTokenPayload_possibleTypes.includes(obj.__typename)
    }
    


    const ReorderChapterDownloadPayload_possibleTypes: string[] = ['ReorderChapterDownloadPayload']
    export const isReorderChapterDownloadPayload = (obj?: { __typename?: any } | null): obj is ReorderChapterDownloadPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isReorderChapterDownloadPayload"')
      return ReorderChapterDownloadPayload_possibleTypes.includes(obj.__typename)
    }
    


    const ResetSettingsPayload_possibleTypes: string[] = ['ResetSettingsPayload']
    export const isResetSettingsPayload = (obj?: { __typename?: any } | null): obj is ResetSettingsPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isResetSettingsPayload"')
      return ResetSettingsPayload_possibleTypes.includes(obj.__typename)
    }
    


    const RestoreBackupPayload_possibleTypes: string[] = ['RestoreBackupPayload']
    export const isRestoreBackupPayload = (obj?: { __typename?: any } | null): obj is RestoreBackupPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isRestoreBackupPayload"')
      return RestoreBackupPayload_possibleTypes.includes(obj.__typename)
    }
    


    const SearchTrackerPayload_possibleTypes: string[] = ['SearchTrackerPayload']
    export const isSearchTrackerPayload = (obj?: { __typename?: any } | null): obj is SearchTrackerPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSearchTrackerPayload"')
      return SearchTrackerPayload_possibleTypes.includes(obj.__typename)
    }
    


    const SelectFilter_possibleTypes: string[] = ['SelectFilter']
    export const isSelectFilter = (obj?: { __typename?: any } | null): obj is SelectFilter => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSelectFilter"')
      return SelectFilter_possibleTypes.includes(obj.__typename)
    }
    


    const SeparatorFilter_possibleTypes: string[] = ['SeparatorFilter']
    export const isSeparatorFilter = (obj?: { __typename?: any } | null): obj is SeparatorFilter => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSeparatorFilter"')
      return SeparatorFilter_possibleTypes.includes(obj.__typename)
    }
    


    const SetCategoryMetaPayload_possibleTypes: string[] = ['SetCategoryMetaPayload']
    export const isSetCategoryMetaPayload = (obj?: { __typename?: any } | null): obj is SetCategoryMetaPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSetCategoryMetaPayload"')
      return SetCategoryMetaPayload_possibleTypes.includes(obj.__typename)
    }
    


    const SetCategoryMetasPayload_possibleTypes: string[] = ['SetCategoryMetasPayload']
    export const isSetCategoryMetasPayload = (obj?: { __typename?: any } | null): obj is SetCategoryMetasPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSetCategoryMetasPayload"')
      return SetCategoryMetasPayload_possibleTypes.includes(obj.__typename)
    }
    


    const SetChapterMetaPayload_possibleTypes: string[] = ['SetChapterMetaPayload']
    export const isSetChapterMetaPayload = (obj?: { __typename?: any } | null): obj is SetChapterMetaPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSetChapterMetaPayload"')
      return SetChapterMetaPayload_possibleTypes.includes(obj.__typename)
    }
    


    const SetChapterMetasPayload_possibleTypes: string[] = ['SetChapterMetasPayload']
    export const isSetChapterMetasPayload = (obj?: { __typename?: any } | null): obj is SetChapterMetasPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSetChapterMetasPayload"')
      return SetChapterMetasPayload_possibleTypes.includes(obj.__typename)
    }
    


    const SetGlobalMetaPayload_possibleTypes: string[] = ['SetGlobalMetaPayload']
    export const isSetGlobalMetaPayload = (obj?: { __typename?: any } | null): obj is SetGlobalMetaPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSetGlobalMetaPayload"')
      return SetGlobalMetaPayload_possibleTypes.includes(obj.__typename)
    }
    


    const SetGlobalMetasPayload_possibleTypes: string[] = ['SetGlobalMetasPayload']
    export const isSetGlobalMetasPayload = (obj?: { __typename?: any } | null): obj is SetGlobalMetasPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSetGlobalMetasPayload"')
      return SetGlobalMetasPayload_possibleTypes.includes(obj.__typename)
    }
    


    const SetMangaMetaPayload_possibleTypes: string[] = ['SetMangaMetaPayload']
    export const isSetMangaMetaPayload = (obj?: { __typename?: any } | null): obj is SetMangaMetaPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSetMangaMetaPayload"')
      return SetMangaMetaPayload_possibleTypes.includes(obj.__typename)
    }
    


    const SetMangaMetasPayload_possibleTypes: string[] = ['SetMangaMetasPayload']
    export const isSetMangaMetasPayload = (obj?: { __typename?: any } | null): obj is SetMangaMetasPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSetMangaMetasPayload"')
      return SetMangaMetasPayload_possibleTypes.includes(obj.__typename)
    }
    


    const SetSettingsPayload_possibleTypes: string[] = ['SetSettingsPayload']
    export const isSetSettingsPayload = (obj?: { __typename?: any } | null): obj is SetSettingsPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSetSettingsPayload"')
      return SetSettingsPayload_possibleTypes.includes(obj.__typename)
    }
    


    const SetSourceMetaPayload_possibleTypes: string[] = ['SetSourceMetaPayload']
    export const isSetSourceMetaPayload = (obj?: { __typename?: any } | null): obj is SetSourceMetaPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSetSourceMetaPayload"')
      return SetSourceMetaPayload_possibleTypes.includes(obj.__typename)
    }
    


    const SetSourceMetasPayload_possibleTypes: string[] = ['SetSourceMetasPayload']
    export const isSetSourceMetasPayload = (obj?: { __typename?: any } | null): obj is SetSourceMetasPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSetSourceMetasPayload"')
      return SetSourceMetasPayload_possibleTypes.includes(obj.__typename)
    }
    


    const Settings_possibleTypes: string[] = ['PartialSettingsType','SettingsType']
    export const isSettings = (obj?: { __typename?: any } | null): obj is Settings => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSettings"')
      return Settings_possibleTypes.includes(obj.__typename)
    }
    


    const SettingsDownloadConversion_possibleTypes: string[] = ['SettingsDownloadConversionType']
    export const isSettingsDownloadConversion = (obj?: { __typename?: any } | null): obj is SettingsDownloadConversion => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSettingsDownloadConversion"')
      return SettingsDownloadConversion_possibleTypes.includes(obj.__typename)
    }
    


    const SettingsDownloadConversionHeader_possibleTypes: string[] = ['SettingsDownloadConversionHeaderType']
    export const isSettingsDownloadConversionHeader = (obj?: { __typename?: any } | null): obj is SettingsDownloadConversionHeader => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSettingsDownloadConversionHeader"')
      return SettingsDownloadConversionHeader_possibleTypes.includes(obj.__typename)
    }
    


    const SettingsDownloadConversionHeaderType_possibleTypes: string[] = ['SettingsDownloadConversionHeaderType']
    export const isSettingsDownloadConversionHeaderType = (obj?: { __typename?: any } | null): obj is SettingsDownloadConversionHeaderType => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSettingsDownloadConversionHeaderType"')
      return SettingsDownloadConversionHeaderType_possibleTypes.includes(obj.__typename)
    }
    


    const SettingsDownloadConversionType_possibleTypes: string[] = ['SettingsDownloadConversionType']
    export const isSettingsDownloadConversionType = (obj?: { __typename?: any } | null): obj is SettingsDownloadConversionType => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSettingsDownloadConversionType"')
      return SettingsDownloadConversionType_possibleTypes.includes(obj.__typename)
    }
    


    const SettingsType_possibleTypes: string[] = ['SettingsType']
    export const isSettingsType = (obj?: { __typename?: any } | null): obj is SettingsType => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSettingsType"')
      return SettingsType_possibleTypes.includes(obj.__typename)
    }
    


    const SortFilter_possibleTypes: string[] = ['SortFilter']
    export const isSortFilter = (obj?: { __typename?: any } | null): obj is SortFilter => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSortFilter"')
      return SortFilter_possibleTypes.includes(obj.__typename)
    }
    


    const SortSelection_possibleTypes: string[] = ['SortSelection']
    export const isSortSelection = (obj?: { __typename?: any } | null): obj is SortSelection => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSortSelection"')
      return SortSelection_possibleTypes.includes(obj.__typename)
    }
    


    const SourceEdge_possibleTypes: string[] = ['SourceEdge']
    export const isSourceEdge = (obj?: { __typename?: any } | null): obj is SourceEdge => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSourceEdge"')
      return SourceEdge_possibleTypes.includes(obj.__typename)
    }
    


    const SourceMetaType_possibleTypes: string[] = ['SourceMetaType']
    export const isSourceMetaType = (obj?: { __typename?: any } | null): obj is SourceMetaType => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSourceMetaType"')
      return SourceMetaType_possibleTypes.includes(obj.__typename)
    }
    


    const SourceNodeList_possibleTypes: string[] = ['SourceNodeList']
    export const isSourceNodeList = (obj?: { __typename?: any } | null): obj is SourceNodeList => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSourceNodeList"')
      return SourceNodeList_possibleTypes.includes(obj.__typename)
    }
    


    const SourceType_possibleTypes: string[] = ['SourceType']
    export const isSourceType = (obj?: { __typename?: any } | null): obj is SourceType => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSourceType"')
      return SourceType_possibleTypes.includes(obj.__typename)
    }
    


    const StartDownloaderPayload_possibleTypes: string[] = ['StartDownloaderPayload']
    export const isStartDownloaderPayload = (obj?: { __typename?: any } | null): obj is StartDownloaderPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isStartDownloaderPayload"')
      return StartDownloaderPayload_possibleTypes.includes(obj.__typename)
    }
    


    const StopDownloaderPayload_possibleTypes: string[] = ['StopDownloaderPayload']
    export const isStopDownloaderPayload = (obj?: { __typename?: any } | null): obj is StopDownloaderPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isStopDownloaderPayload"')
      return StopDownloaderPayload_possibleTypes.includes(obj.__typename)
    }
    


    const Subscription_possibleTypes: string[] = ['Subscription']
    export const isSubscription = (obj?: { __typename?: any } | null): obj is Subscription => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSubscription"')
      return Subscription_possibleTypes.includes(obj.__typename)
    }
    


    const SwitchPreference_possibleTypes: string[] = ['SwitchPreference']
    export const isSwitchPreference = (obj?: { __typename?: any } | null): obj is SwitchPreference => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSwitchPreference"')
      return SwitchPreference_possibleTypes.includes(obj.__typename)
    }
    


    const SyncConflictInfoType_possibleTypes: string[] = ['SyncConflictInfoType']
    export const isSyncConflictInfoType = (obj?: { __typename?: any } | null): obj is SyncConflictInfoType => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSyncConflictInfoType"')
      return SyncConflictInfoType_possibleTypes.includes(obj.__typename)
    }
    


    const TextFilter_possibleTypes: string[] = ['TextFilter']
    export const isTextFilter = (obj?: { __typename?: any } | null): obj is TextFilter => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isTextFilter"')
      return TextFilter_possibleTypes.includes(obj.__typename)
    }
    


    const TrackProgressPayload_possibleTypes: string[] = ['TrackProgressPayload']
    export const isTrackProgressPayload = (obj?: { __typename?: any } | null): obj is TrackProgressPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isTrackProgressPayload"')
      return TrackProgressPayload_possibleTypes.includes(obj.__typename)
    }
    


    const TrackRecordEdge_possibleTypes: string[] = ['TrackRecordEdge']
    export const isTrackRecordEdge = (obj?: { __typename?: any } | null): obj is TrackRecordEdge => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isTrackRecordEdge"')
      return TrackRecordEdge_possibleTypes.includes(obj.__typename)
    }
    


    const TrackRecordNodeList_possibleTypes: string[] = ['TrackRecordNodeList']
    export const isTrackRecordNodeList = (obj?: { __typename?: any } | null): obj is TrackRecordNodeList => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isTrackRecordNodeList"')
      return TrackRecordNodeList_possibleTypes.includes(obj.__typename)
    }
    


    const TrackRecordType_possibleTypes: string[] = ['TrackRecordType']
    export const isTrackRecordType = (obj?: { __typename?: any } | null): obj is TrackRecordType => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isTrackRecordType"')
      return TrackRecordType_possibleTypes.includes(obj.__typename)
    }
    


    const TrackSearchType_possibleTypes: string[] = ['TrackSearchType']
    export const isTrackSearchType = (obj?: { __typename?: any } | null): obj is TrackSearchType => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isTrackSearchType"')
      return TrackSearchType_possibleTypes.includes(obj.__typename)
    }
    


    const TrackStatusType_possibleTypes: string[] = ['TrackStatusType']
    export const isTrackStatusType = (obj?: { __typename?: any } | null): obj is TrackStatusType => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isTrackStatusType"')
      return TrackStatusType_possibleTypes.includes(obj.__typename)
    }
    


    const TrackerEdge_possibleTypes: string[] = ['TrackerEdge']
    export const isTrackerEdge = (obj?: { __typename?: any } | null): obj is TrackerEdge => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isTrackerEdge"')
      return TrackerEdge_possibleTypes.includes(obj.__typename)
    }
    


    const TrackerNodeList_possibleTypes: string[] = ['TrackerNodeList']
    export const isTrackerNodeList = (obj?: { __typename?: any } | null): obj is TrackerNodeList => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isTrackerNodeList"')
      return TrackerNodeList_possibleTypes.includes(obj.__typename)
    }
    


    const TrackerType_possibleTypes: string[] = ['TrackerType']
    export const isTrackerType = (obj?: { __typename?: any } | null): obj is TrackerType => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isTrackerType"')
      return TrackerType_possibleTypes.includes(obj.__typename)
    }
    


    const TriStateFilter_possibleTypes: string[] = ['TriStateFilter']
    export const isTriStateFilter = (obj?: { __typename?: any } | null): obj is TriStateFilter => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isTriStateFilter"')
      return TriStateFilter_possibleTypes.includes(obj.__typename)
    }
    


    const UnbindTrackPayload_possibleTypes: string[] = ['UnbindTrackPayload']
    export const isUnbindTrackPayload = (obj?: { __typename?: any } | null): obj is UnbindTrackPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUnbindTrackPayload"')
      return UnbindTrackPayload_possibleTypes.includes(obj.__typename)
    }
    


    const UpdateCategoriesPayload_possibleTypes: string[] = ['UpdateCategoriesPayload']
    export const isUpdateCategoriesPayload = (obj?: { __typename?: any } | null): obj is UpdateCategoriesPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUpdateCategoriesPayload"')
      return UpdateCategoriesPayload_possibleTypes.includes(obj.__typename)
    }
    


    const UpdateCategoryMangaPayload_possibleTypes: string[] = ['UpdateCategoryMangaPayload']
    export const isUpdateCategoryMangaPayload = (obj?: { __typename?: any } | null): obj is UpdateCategoryMangaPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUpdateCategoryMangaPayload"')
      return UpdateCategoryMangaPayload_possibleTypes.includes(obj.__typename)
    }
    


    const UpdateCategoryOrderPayload_possibleTypes: string[] = ['UpdateCategoryOrderPayload']
    export const isUpdateCategoryOrderPayload = (obj?: { __typename?: any } | null): obj is UpdateCategoryOrderPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUpdateCategoryOrderPayload"')
      return UpdateCategoryOrderPayload_possibleTypes.includes(obj.__typename)
    }
    


    const UpdateCategoryPayload_possibleTypes: string[] = ['UpdateCategoryPayload']
    export const isUpdateCategoryPayload = (obj?: { __typename?: any } | null): obj is UpdateCategoryPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUpdateCategoryPayload"')
      return UpdateCategoryPayload_possibleTypes.includes(obj.__typename)
    }
    


    const UpdateChapterPayload_possibleTypes: string[] = ['UpdateChapterPayload']
    export const isUpdateChapterPayload = (obj?: { __typename?: any } | null): obj is UpdateChapterPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUpdateChapterPayload"')
      return UpdateChapterPayload_possibleTypes.includes(obj.__typename)
    }
    


    const UpdateChaptersPayload_possibleTypes: string[] = ['UpdateChaptersPayload']
    export const isUpdateChaptersPayload = (obj?: { __typename?: any } | null): obj is UpdateChaptersPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUpdateChaptersPayload"')
      return UpdateChaptersPayload_possibleTypes.includes(obj.__typename)
    }
    


    const UpdateExtensionPayload_possibleTypes: string[] = ['UpdateExtensionPayload']
    export const isUpdateExtensionPayload = (obj?: { __typename?: any } | null): obj is UpdateExtensionPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUpdateExtensionPayload"')
      return UpdateExtensionPayload_possibleTypes.includes(obj.__typename)
    }
    


    const UpdateExtensionsPayload_possibleTypes: string[] = ['UpdateExtensionsPayload']
    export const isUpdateExtensionsPayload = (obj?: { __typename?: any } | null): obj is UpdateExtensionsPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUpdateExtensionsPayload"')
      return UpdateExtensionsPayload_possibleTypes.includes(obj.__typename)
    }
    


    const UpdateLibraryMangaPayload_possibleTypes: string[] = ['UpdateLibraryMangaPayload']
    export const isUpdateLibraryMangaPayload = (obj?: { __typename?: any } | null): obj is UpdateLibraryMangaPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUpdateLibraryMangaPayload"')
      return UpdateLibraryMangaPayload_possibleTypes.includes(obj.__typename)
    }
    


    const UpdateLibraryPayload_possibleTypes: string[] = ['UpdateLibraryPayload']
    export const isUpdateLibraryPayload = (obj?: { __typename?: any } | null): obj is UpdateLibraryPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUpdateLibraryPayload"')
      return UpdateLibraryPayload_possibleTypes.includes(obj.__typename)
    }
    


    const UpdateMangaCategoriesPayload_possibleTypes: string[] = ['UpdateMangaCategoriesPayload']
    export const isUpdateMangaCategoriesPayload = (obj?: { __typename?: any } | null): obj is UpdateMangaCategoriesPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUpdateMangaCategoriesPayload"')
      return UpdateMangaCategoriesPayload_possibleTypes.includes(obj.__typename)
    }
    


    const UpdateMangaPayload_possibleTypes: string[] = ['UpdateMangaPayload']
    export const isUpdateMangaPayload = (obj?: { __typename?: any } | null): obj is UpdateMangaPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUpdateMangaPayload"')
      return UpdateMangaPayload_possibleTypes.includes(obj.__typename)
    }
    


    const UpdateMangasCategoriesPayload_possibleTypes: string[] = ['UpdateMangasCategoriesPayload']
    export const isUpdateMangasCategoriesPayload = (obj?: { __typename?: any } | null): obj is UpdateMangasCategoriesPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUpdateMangasCategoriesPayload"')
      return UpdateMangasCategoriesPayload_possibleTypes.includes(obj.__typename)
    }
    


    const UpdateMangasPayload_possibleTypes: string[] = ['UpdateMangasPayload']
    export const isUpdateMangasPayload = (obj?: { __typename?: any } | null): obj is UpdateMangasPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUpdateMangasPayload"')
      return UpdateMangasPayload_possibleTypes.includes(obj.__typename)
    }
    


    const UpdateSourcePreferencePayload_possibleTypes: string[] = ['UpdateSourcePreferencePayload']
    export const isUpdateSourcePreferencePayload = (obj?: { __typename?: any } | null): obj is UpdateSourcePreferencePayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUpdateSourcePreferencePayload"')
      return UpdateSourcePreferencePayload_possibleTypes.includes(obj.__typename)
    }
    


    const UpdateStatus_possibleTypes: string[] = ['UpdateStatus']
    export const isUpdateStatus = (obj?: { __typename?: any } | null): obj is UpdateStatus => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUpdateStatus"')
      return UpdateStatus_possibleTypes.includes(obj.__typename)
    }
    


    const UpdateStatusCategoryType_possibleTypes: string[] = ['UpdateStatusCategoryType']
    export const isUpdateStatusCategoryType = (obj?: { __typename?: any } | null): obj is UpdateStatusCategoryType => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUpdateStatusCategoryType"')
      return UpdateStatusCategoryType_possibleTypes.includes(obj.__typename)
    }
    


    const UpdateStatusType_possibleTypes: string[] = ['UpdateStatusType']
    export const isUpdateStatusType = (obj?: { __typename?: any } | null): obj is UpdateStatusType => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUpdateStatusType"')
      return UpdateStatusType_possibleTypes.includes(obj.__typename)
    }
    


    const UpdateStopPayload_possibleTypes: string[] = ['UpdateStopPayload']
    export const isUpdateStopPayload = (obj?: { __typename?: any } | null): obj is UpdateStopPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUpdateStopPayload"')
      return UpdateStopPayload_possibleTypes.includes(obj.__typename)
    }
    


    const UpdateTrackPayload_possibleTypes: string[] = ['UpdateTrackPayload']
    export const isUpdateTrackPayload = (obj?: { __typename?: any } | null): obj is UpdateTrackPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUpdateTrackPayload"')
      return UpdateTrackPayload_possibleTypes.includes(obj.__typename)
    }
    


    const UpdaterJobsInfoType_possibleTypes: string[] = ['UpdaterJobsInfoType']
    export const isUpdaterJobsInfoType = (obj?: { __typename?: any } | null): obj is UpdaterJobsInfoType => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUpdaterJobsInfoType"')
      return UpdaterJobsInfoType_possibleTypes.includes(obj.__typename)
    }
    


    const UpdaterUpdates_possibleTypes: string[] = ['UpdaterUpdates']
    export const isUpdaterUpdates = (obj?: { __typename?: any } | null): obj is UpdaterUpdates => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUpdaterUpdates"')
      return UpdaterUpdates_possibleTypes.includes(obj.__typename)
    }
    


    const ValidateBackupResult_possibleTypes: string[] = ['ValidateBackupResult']
    export const isValidateBackupResult = (obj?: { __typename?: any } | null): obj is ValidateBackupResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isValidateBackupResult"')
      return ValidateBackupResult_possibleTypes.includes(obj.__typename)
    }
    


    const ValidateBackupSource_possibleTypes: string[] = ['ValidateBackupSource']
    export const isValidateBackupSource = (obj?: { __typename?: any } | null): obj is ValidateBackupSource => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isValidateBackupSource"')
      return ValidateBackupSource_possibleTypes.includes(obj.__typename)
    }
    


    const ValidateBackupTracker_possibleTypes: string[] = ['ValidateBackupTracker']
    export const isValidateBackupTracker = (obj?: { __typename?: any } | null): obj is ValidateBackupTracker => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isValidateBackupTracker"')
      return ValidateBackupTracker_possibleTypes.includes(obj.__typename)
    }
    


    const WebUIUpdateCheck_possibleTypes: string[] = ['WebUIUpdateCheck']
    export const isWebUIUpdateCheck = (obj?: { __typename?: any } | null): obj is WebUIUpdateCheck => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isWebUIUpdateCheck"')
      return WebUIUpdateCheck_possibleTypes.includes(obj.__typename)
    }
    


    const WebUIUpdateInfo_possibleTypes: string[] = ['WebUIUpdateInfo']
    export const isWebUIUpdateInfo = (obj?: { __typename?: any } | null): obj is WebUIUpdateInfo => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isWebUIUpdateInfo"')
      return WebUIUpdateInfo_possibleTypes.includes(obj.__typename)
    }
    


    const WebUIUpdatePayload_possibleTypes: string[] = ['WebUIUpdatePayload']
    export const isWebUIUpdatePayload = (obj?: { __typename?: any } | null): obj is WebUIUpdatePayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isWebUIUpdatePayload"')
      return WebUIUpdatePayload_possibleTypes.includes(obj.__typename)
    }
    


    const WebUIUpdateStatus_possibleTypes: string[] = ['WebUIUpdateStatus']
    export const isWebUIUpdateStatus = (obj?: { __typename?: any } | null): obj is WebUIUpdateStatus => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isWebUIUpdateStatus"')
      return WebUIUpdateStatus_possibleTypes.includes(obj.__typename)
    }
    

export const enumAuthMode = {
   NONE: 'NONE' as const,
   BASIC_AUTH: 'BASIC_AUTH' as const,
   SIMPLE_LOGIN: 'SIMPLE_LOGIN' as const,
   UI_LOGIN: 'UI_LOGIN' as const
}

export const enumBackupRestoreState = {
   IDLE: 'IDLE' as const,
   SUCCESS: 'SUCCESS' as const,
   FAILURE: 'FAILURE' as const,
   RESTORING_CATEGORIES: 'RESTORING_CATEGORIES' as const,
   RESTORING_MANGA: 'RESTORING_MANGA' as const,
   RESTORING_META: 'RESTORING_META' as const,
   RESTORING_SETTINGS: 'RESTORING_SETTINGS' as const
}

export const enumCategoryJobStatus = {
   UPDATING: 'UPDATING' as const,
   SKIPPED: 'SKIPPED' as const
}

export const enumCategoryOrderBy = {
   ID: 'ID' as const,
   NAME: 'NAME' as const,
   ORDER: 'ORDER' as const
}

export const enumCbzMediaType = {
   MODERN: 'MODERN' as const,
   LEGACY: 'LEGACY' as const,
   COMPATIBLE: 'COMPATIBLE' as const
}

export const enumChapterOrderBy = {
   ID: 'ID' as const,
   SOURCE_ORDER: 'SOURCE_ORDER' as const,
   NAME: 'NAME' as const,
   UPLOAD_DATE: 'UPLOAD_DATE' as const,
   CHAPTER_NUMBER: 'CHAPTER_NUMBER' as const,
   LAST_READ_AT: 'LAST_READ_AT' as const,
   FETCHED_AT: 'FETCHED_AT' as const
}

export const enumDatabaseType = {
   H2: 'H2' as const,
   POSTGRESQL: 'POSTGRESQL' as const
}

export const enumDownloadState = {
   QUEUED: 'QUEUED' as const,
   DOWNLOADING: 'DOWNLOADING' as const,
   FINISHED: 'FINISHED' as const,
   ERROR: 'ERROR' as const
}

export const enumDownloadUpdateType = {
   QUEUED: 'QUEUED' as const,
   DEQUEUED: 'DEQUEUED' as const,
   PAUSED: 'PAUSED' as const,
   STOPPED: 'STOPPED' as const,
   PROGRESS: 'PROGRESS' as const,
   FINISHED: 'FINISHED' as const,
   ERROR: 'ERROR' as const,
   POSITION: 'POSITION' as const
}

export const enumDownloaderState = {
   STARTED: 'STARTED' as const,
   STOPPED: 'STOPPED' as const
}

export const enumExtensionOrderBy = {
   PKG_NAME: 'PKG_NAME' as const,
   NAME: 'NAME' as const,
   APK_NAME: 'APK_NAME' as const
}

export const enumFetchSourceMangaType = {
   SEARCH: 'SEARCH' as const,
   POPULAR: 'POPULAR' as const,
   LATEST: 'LATEST' as const
}

export const enumIncludeOrExclude = {
   EXCLUDE: 'EXCLUDE' as const,
   INCLUDE: 'INCLUDE' as const,
   UNSET: 'UNSET' as const
}

export const enumKoreaderSyncChecksumMethod = {
   BINARY: 'BINARY' as const,
   FILENAME: 'FILENAME' as const
}

export const enumKoreaderSyncConflictStrategy = {
   PROMPT: 'PROMPT' as const,
   KEEP_LOCAL: 'KEEP_LOCAL' as const,
   KEEP_REMOTE: 'KEEP_REMOTE' as const,
   DISABLED: 'DISABLED' as const
}

export const enumKoreaderSyncLegacyStrategy = {
   PROMPT: 'PROMPT' as const,
   SILENT: 'SILENT' as const,
   SEND: 'SEND' as const,
   RECEIVE: 'RECEIVE' as const,
   DISABLED: 'DISABLED' as const
}

export const enumMangaJobStatus = {
   PENDING: 'PENDING' as const,
   RUNNING: 'RUNNING' as const,
   COMPLETE: 'COMPLETE' as const,
   FAILED: 'FAILED' as const,
   SKIPPED: 'SKIPPED' as const
}

export const enumMangaOrderBy = {
   ID: 'ID' as const,
   TITLE: 'TITLE' as const,
   IN_LIBRARY_AT: 'IN_LIBRARY_AT' as const,
   LAST_FETCHED_AT: 'LAST_FETCHED_AT' as const
}

export const enumMangaStatus = {
   UNKNOWN: 'UNKNOWN' as const,
   ONGOING: 'ONGOING' as const,
   COMPLETED: 'COMPLETED' as const,
   LICENSED: 'LICENSED' as const,
   PUBLISHING_FINISHED: 'PUBLISHING_FINISHED' as const,
   CANCELLED: 'CANCELLED' as const,
   ON_HIATUS: 'ON_HIATUS' as const
}

export const enumMetaOrderBy = {
   KEY: 'KEY' as const,
   VALUE: 'VALUE' as const
}

export const enumSortOrder = {
   ASC: 'ASC' as const,
   DESC: 'DESC' as const,
   ASC_NULLS_FIRST: 'ASC_NULLS_FIRST' as const,
   DESC_NULLS_FIRST: 'DESC_NULLS_FIRST' as const,
   ASC_NULLS_LAST: 'ASC_NULLS_LAST' as const,
   DESC_NULLS_LAST: 'DESC_NULLS_LAST' as const
}

export const enumSourceOrderBy = {
   ID: 'ID' as const,
   NAME: 'NAME' as const,
   LANG: 'LANG' as const
}

export const enumTrackRecordOrderBy = {
   ID: 'ID' as const,
   MANGA_ID: 'MANGA_ID' as const,
   TRACKER_ID: 'TRACKER_ID' as const,
   REMOTE_ID: 'REMOTE_ID' as const,
   TITLE: 'TITLE' as const,
   LAST_CHAPTER_READ: 'LAST_CHAPTER_READ' as const,
   TOTAL_CHAPTERS: 'TOTAL_CHAPTERS' as const,
   SCORE: 'SCORE' as const,
   START_DATE: 'START_DATE' as const,
   FINISH_DATE: 'FINISH_DATE' as const,
   PRIVATE: 'PRIVATE' as const
}

export const enumTrackerOrderBy = {
   ID: 'ID' as const,
   NAME: 'NAME' as const,
   IS_LOGGED_IN: 'IS_LOGGED_IN' as const
}

export const enumTriState = {
   IGNORE: 'IGNORE' as const,
   INCLUDE: 'INCLUDE' as const,
   EXCLUDE: 'EXCLUDE' as const
}

export const enumUpdateState = {
   IDLE: 'IDLE' as const,
   DOWNLOADING: 'DOWNLOADING' as const,
   FINISHED: 'FINISHED' as const,
   ERROR: 'ERROR' as const
}

export const enumUpdateStrategy = {
   ALWAYS_UPDATE: 'ALWAYS_UPDATE' as const,
   ONLY_FETCH_ONCE: 'ONLY_FETCH_ONCE' as const
}

export const enumWebUiChannel = {
   BUNDLED: 'BUNDLED' as const,
   STABLE: 'STABLE' as const,
   PREVIEW: 'PREVIEW' as const
}

export const enumWebUiFlavor = {
   WEBUI: 'WEBUI' as const,
   VUI: 'VUI' as const,
   CUSTOM: 'CUSTOM' as const
}

export const enumWebUiInterface = {
   BROWSER: 'BROWSER' as const,
   ELECTRON: 'ELECTRON' as const
}
