export default {
    "scalars": [
        2,
        3,
        7,
        12,
        16,
        20,
        27,
        42,
        43,
        82,
        86,
        88,
        89,
        100,
        113,
        118,
        124,
        127,
        131,
        132,
        133,
        149,
        153,
        157,
        159,
        167,
        231,
        240,
        248,
        260,
        268,
        271,
        310,
        316,
        321,
        326,
        327,
        328
    ],
    "types": {
        "AboutServerPayload": {
            "buildTime": [
                149
            ],
            "buildType": [
                248
            ],
            "discord": [
                248
            ],
            "github": [
                248
            ],
            "name": [
                248
            ],
            "revision": [
                248
            ],
            "version": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "AboutWebUI": {
            "channel": [
                326
            ],
            "tag": [
                248
            ],
            "updateTimestamp": [
                149
            ],
            "__typename": [
                248
            ]
        },
        "AuthMode": {},
        "BackupRestoreState": {},
        "BackupRestoreStatus": {
            "mangaProgress": [
                127
            ],
            "state": [
                3
            ],
            "totalManga": [
                127
            ],
            "__typename": [
                248
            ]
        },
        "BindTrackInput": {
            "clientMutationId": [
                248
            ],
            "mangaId": [
                127
            ],
            "private": [
                7
            ],
            "remoteId": [
                149
            ],
            "trackerId": [
                127
            ],
            "__typename": [
                248
            ]
        },
        "BindTrackPayload": {
            "clientMutationId": [
                248
            ],
            "trackRecord": [
                262
            ],
            "__typename": [
                248
            ]
        },
        "Boolean": {},
        "BooleanFilterInput": {
            "distinctFrom": [
                7
            ],
            "distinctFromAll": [
                7
            ],
            "distinctFromAny": [
                7
            ],
            "equalTo": [
                7
            ],
            "greaterThan": [
                7
            ],
            "greaterThanOrEqualTo": [
                7
            ],
            "in": [
                7
            ],
            "isNull": [
                7
            ],
            "lessThan": [
                7
            ],
            "lessThanOrEqualTo": [
                7
            ],
            "notDistinctFrom": [
                7
            ],
            "notEqualTo": [
                7
            ],
            "notEqualToAll": [
                7
            ],
            "notEqualToAny": [
                7
            ],
            "notIn": [
                7
            ],
            "__typename": [
                248
            ]
        },
        "CategoryConditionInput": {
            "default": [
                7
            ],
            "id": [
                127
            ],
            "name": [
                248
            ],
            "order": [
                127
            ],
            "__typename": [
                248
            ]
        },
        "CategoryEdge": {
            "cursor": [
                42
            ],
            "node": [
                18
            ],
            "__typename": [
                248
            ]
        },
        "CategoryFilterInput": {
            "and": [
                11
            ],
            "default": [
                8
            ],
            "id": [
                128
            ],
            "name": [
                249
            ],
            "not": [
                11
            ],
            "or": [
                11
            ],
            "order": [
                128
            ],
            "__typename": [
                248
            ]
        },
        "CategoryJobStatus": {},
        "CategoryMetaType": {
            "categoryId": [
                127
            ],
            "key": [
                248
            ],
            "value": [
                248
            ],
            "category": [
                18
            ],
            "__typename": [
                248
            ]
        },
        "CategoryMetaTypeInput": {
            "categoryId": [
                127
            ],
            "key": [
                248
            ],
            "value": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "CategoryNodeList": {
            "edges": [
                10
            ],
            "nodes": [
                18
            ],
            "pageInfo": [
                174
            ],
            "totalCount": [
                127
            ],
            "__typename": [
                248
            ]
        },
        "CategoryOrderBy": {},
        "CategoryOrderInput": {
            "by": [
                16
            ],
            "byType": [
                231
            ],
            "__typename": [
                248
            ]
        },
        "CategoryType": {
            "default": [
                7
            ],
            "id": [
                127
            ],
            "includeInDownload": [
                124
            ],
            "includeInUpdate": [
                124
            ],
            "name": [
                248
            ],
            "order": [
                127
            ],
            "mangas": [
                156
            ],
            "meta": [
                13
            ],
            "__typename": [
                248
            ]
        },
        "CategoryUpdateType": {
            "category": [
                18
            ],
            "status": [
                12
            ],
            "__typename": [
                248
            ]
        },
        "CbzMediaType": {},
        "ChapterConditionInput": {
            "chapterNumber": [
                118
            ],
            "fetchedAt": [
                149
            ],
            "id": [
                127
            ],
            "isBookmarked": [
                7
            ],
            "isDownloaded": [
                7
            ],
            "isRead": [
                7
            ],
            "lastPageRead": [
                127
            ],
            "lastReadAt": [
                149
            ],
            "mangaId": [
                127
            ],
            "name": [
                248
            ],
            "pageCount": [
                127
            ],
            "realUrl": [
                248
            ],
            "scanlator": [
                248
            ],
            "sourceOrder": [
                127
            ],
            "uploadDate": [
                149
            ],
            "url": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "ChapterEdge": {
            "cursor": [
                42
            ],
            "node": [
                29
            ],
            "__typename": [
                248
            ]
        },
        "ChapterFilterInput": {
            "and": [
                23
            ],
            "chapterNumber": [
                78
            ],
            "fetchedAt": [
                148
            ],
            "id": [
                128
            ],
            "inLibrary": [
                8
            ],
            "isBookmarked": [
                8
            ],
            "isDownloaded": [
                8
            ],
            "isRead": [
                8
            ],
            "lastPageRead": [
                128
            ],
            "lastReadAt": [
                148
            ],
            "mangaId": [
                128
            ],
            "name": [
                249
            ],
            "not": [
                23
            ],
            "or": [
                23
            ],
            "pageCount": [
                128
            ],
            "realUrl": [
                249
            ],
            "scanlator": [
                249
            ],
            "sourceOrder": [
                128
            ],
            "uploadDate": [
                148
            ],
            "url": [
                249
            ],
            "__typename": [
                248
            ]
        },
        "ChapterMetaType": {
            "chapterId": [
                127
            ],
            "key": [
                248
            ],
            "value": [
                248
            ],
            "chapter": [
                29
            ],
            "__typename": [
                248
            ]
        },
        "ChapterMetaTypeInput": {
            "chapterId": [
                127
            ],
            "key": [
                248
            ],
            "value": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "ChapterNodeList": {
            "edges": [
                22
            ],
            "nodes": [
                29
            ],
            "pageInfo": [
                174
            ],
            "totalCount": [
                127
            ],
            "__typename": [
                248
            ]
        },
        "ChapterOrderBy": {},
        "ChapterOrderInput": {
            "by": [
                27
            ],
            "byType": [
                231
            ],
            "__typename": [
                248
            ]
        },
        "ChapterType": {
            "chapterNumber": [
                118
            ],
            "fetchedAt": [
                149
            ],
            "id": [
                127
            ],
            "isBookmarked": [
                7
            ],
            "isDownloaded": [
                7
            ],
            "isRead": [
                7
            ],
            "lastPageRead": [
                127
            ],
            "lastReadAt": [
                149
            ],
            "mangaId": [
                127
            ],
            "name": [
                248
            ],
            "pageCount": [
                127
            ],
            "realUrl": [
                248
            ],
            "scanlator": [
                248
            ],
            "sourceOrder": [
                127
            ],
            "uploadDate": [
                149
            ],
            "url": [
                248
            ],
            "manga": [
                161
            ],
            "meta": [
                24
            ],
            "__typename": [
                248
            ]
        },
        "CheckBoxFilter": {
            "default": [
                7
            ],
            "name": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "CheckBoxPreference": {
            "currentValue": [
                7
            ],
            "default": [
                7
            ],
            "enabled": [
                7
            ],
            "key": [
                248
            ],
            "summary": [
                248
            ],
            "title": [
                248
            ],
            "visible": [
                7
            ],
            "__typename": [
                248
            ]
        },
        "CheckForServerUpdatesPayload": {
            "channel": [
                248
            ],
            "tag": [
                248
            ],
            "url": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "ClearCachedImagesInput": {
            "cachedPages": [
                7
            ],
            "cachedThumbnails": [
                7
            ],
            "clientMutationId": [
                248
            ],
            "downloadedThumbnails": [
                7
            ],
            "__typename": [
                248
            ]
        },
        "ClearCachedImagesPayload": {
            "cachedPages": [
                7
            ],
            "cachedThumbnails": [
                7
            ],
            "clientMutationId": [
                248
            ],
            "downloadedThumbnails": [
                7
            ],
            "__typename": [
                248
            ]
        },
        "ClearDownloaderInput": {
            "clientMutationId": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "ClearDownloaderPayload": {
            "clientMutationId": [
                248
            ],
            "downloadStatus": [
                83
            ],
            "__typename": [
                248
            ]
        },
        "ConnectKoSyncAccountInput": {
            "clientMutationId": [
                248
            ],
            "password": [
                248
            ],
            "serverAddress": [
                248
            ],
            "username": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "CreateBackupInput": {
            "clientMutationId": [
                248
            ],
            "flags": [
                175
            ],
            "__typename": [
                248
            ]
        },
        "CreateBackupPayload": {
            "clientMutationId": [
                248
            ],
            "url": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "CreateCategoryInput": {
            "clientMutationId": [
                248
            ],
            "default": [
                7
            ],
            "includeInDownload": [
                124
            ],
            "includeInUpdate": [
                124
            ],
            "name": [
                248
            ],
            "order": [
                127
            ],
            "__typename": [
                248
            ]
        },
        "CreateCategoryPayload": {
            "category": [
                18
            ],
            "clientMutationId": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "Cursor": {},
        "DatabaseType": {},
        "DeleteCategoryInput": {
            "categoryId": [
                127
            ],
            "clientMutationId": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "DeleteCategoryMetaInput": {
            "categoryId": [
                127
            ],
            "clientMutationId": [
                248
            ],
            "key": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "DeleteCategoryMetaPayload": {
            "category": [
                18
            ],
            "clientMutationId": [
                248
            ],
            "meta": [
                13
            ],
            "__typename": [
                248
            ]
        },
        "DeleteCategoryMetasInput": {
            "clientMutationId": [
                248
            ],
            "items": [
                48
            ],
            "__typename": [
                248
            ]
        },
        "DeleteCategoryMetasItemInput": {
            "categoryIds": [
                127
            ],
            "keys": [
                248
            ],
            "prefixes": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "DeleteCategoryMetasPayload": {
            "categories": [
                18
            ],
            "clientMutationId": [
                248
            ],
            "metas": [
                13
            ],
            "__typename": [
                248
            ]
        },
        "DeleteCategoryPayload": {
            "category": [
                18
            ],
            "clientMutationId": [
                248
            ],
            "mangas": [
                161
            ],
            "__typename": [
                248
            ]
        },
        "DeleteChapterMetaInput": {
            "chapterId": [
                127
            ],
            "clientMutationId": [
                248
            ],
            "key": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "DeleteChapterMetaPayload": {
            "chapter": [
                29
            ],
            "clientMutationId": [
                248
            ],
            "meta": [
                24
            ],
            "__typename": [
                248
            ]
        },
        "DeleteChapterMetasInput": {
            "clientMutationId": [
                248
            ],
            "items": [
                54
            ],
            "__typename": [
                248
            ]
        },
        "DeleteChapterMetasItemInput": {
            "chapterIds": [
                127
            ],
            "keys": [
                248
            ],
            "prefixes": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "DeleteChapterMetasPayload": {
            "chapters": [
                29
            ],
            "clientMutationId": [
                248
            ],
            "metas": [
                24
            ],
            "__typename": [
                248
            ]
        },
        "DeleteDownloadedChapterInput": {
            "clientMutationId": [
                248
            ],
            "id": [
                127
            ],
            "__typename": [
                248
            ]
        },
        "DeleteDownloadedChapterPayload": {
            "chapters": [
                29
            ],
            "clientMutationId": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "DeleteDownloadedChaptersInput": {
            "clientMutationId": [
                248
            ],
            "ids": [
                127
            ],
            "__typename": [
                248
            ]
        },
        "DeleteDownloadedChaptersPayload": {
            "chapters": [
                29
            ],
            "clientMutationId": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "DeleteGlobalMetaInput": {
            "clientMutationId": [
                248
            ],
            "key": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "DeleteGlobalMetaPayload": {
            "clientMutationId": [
                248
            ],
            "meta": [
                120
            ],
            "__typename": [
                248
            ]
        },
        "DeleteGlobalMetasInput": {
            "clientMutationId": [
                248
            ],
            "keys": [
                248
            ],
            "prefixes": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "DeleteGlobalMetasPayload": {
            "clientMutationId": [
                248
            ],
            "metas": [
                120
            ],
            "__typename": [
                248
            ]
        },
        "DeleteMangaMetaInput": {
            "clientMutationId": [
                248
            ],
            "key": [
                248
            ],
            "mangaId": [
                127
            ],
            "__typename": [
                248
            ]
        },
        "DeleteMangaMetaPayload": {
            "clientMutationId": [
                248
            ],
            "manga": [
                161
            ],
            "meta": [
                154
            ],
            "__typename": [
                248
            ]
        },
        "DeleteMangaMetasInput": {
            "clientMutationId": [
                248
            ],
            "items": [
                67
            ],
            "__typename": [
                248
            ]
        },
        "DeleteMangaMetasItemInput": {
            "keys": [
                248
            ],
            "mangaIds": [
                127
            ],
            "prefixes": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "DeleteMangaMetasPayload": {
            "clientMutationId": [
                248
            ],
            "mangas": [
                161
            ],
            "metas": [
                154
            ],
            "__typename": [
                248
            ]
        },
        "DeleteSourceMetaInput": {
            "clientMutationId": [
                248
            ],
            "key": [
                248
            ],
            "sourceId": [
                149
            ],
            "__typename": [
                248
            ]
        },
        "DeleteSourceMetaPayload": {
            "clientMutationId": [
                248
            ],
            "meta": [
                237
            ],
            "source": [
                243
            ],
            "__typename": [
                248
            ]
        },
        "DeleteSourceMetasInput": {
            "clientMutationId": [
                248
            ],
            "items": [
                72
            ],
            "__typename": [
                248
            ]
        },
        "DeleteSourceMetasItemInput": {
            "keys": [
                248
            ],
            "prefixes": [
                248
            ],
            "sourceIds": [
                149
            ],
            "__typename": [
                248
            ]
        },
        "DeleteSourceMetasPayload": {
            "clientMutationId": [
                248
            ],
            "metas": [
                237
            ],
            "sources": [
                243
            ],
            "__typename": [
                248
            ]
        },
        "DequeueChapterDownloadInput": {
            "clientMutationId": [
                248
            ],
            "id": [
                127
            ],
            "__typename": [
                248
            ]
        },
        "DequeueChapterDownloadPayload": {
            "clientMutationId": [
                248
            ],
            "downloadStatus": [
                83
            ],
            "__typename": [
                248
            ]
        },
        "DequeueChapterDownloadsInput": {
            "clientMutationId": [
                248
            ],
            "ids": [
                127
            ],
            "__typename": [
                248
            ]
        },
        "DequeueChapterDownloadsPayload": {
            "clientMutationId": [
                248
            ],
            "downloadStatus": [
                83
            ],
            "__typename": [
                248
            ]
        },
        "DoubleFilterInput": {
            "distinctFrom": [
                118
            ],
            "distinctFromAll": [
                118
            ],
            "distinctFromAny": [
                118
            ],
            "equalTo": [
                118
            ],
            "greaterThan": [
                118
            ],
            "greaterThanOrEqualTo": [
                118
            ],
            "in": [
                118
            ],
            "isNull": [
                7
            ],
            "lessThan": [
                118
            ],
            "lessThanOrEqualTo": [
                118
            ],
            "notDistinctFrom": [
                118
            ],
            "notEqualTo": [
                118
            ],
            "notEqualToAll": [
                118
            ],
            "notEqualToAny": [
                118
            ],
            "notIn": [
                118
            ],
            "__typename": [
                248
            ]
        },
        "DownloadChangedInput": {
            "maxUpdates": [
                127
            ],
            "__typename": [
                248
            ]
        },
        "DownloadEdge": {
            "cursor": [
                42
            ],
            "node": [
                84
            ],
            "__typename": [
                248
            ]
        },
        "DownloadNodeList": {
            "edges": [
                80
            ],
            "nodes": [
                84
            ],
            "pageInfo": [
                174
            ],
            "totalCount": [
                127
            ],
            "__typename": [
                248
            ]
        },
        "DownloadState": {},
        "DownloadStatus": {
            "queue": [
                84
            ],
            "state": [
                88
            ],
            "__typename": [
                248
            ]
        },
        "DownloadType": {
            "position": [
                127
            ],
            "progress": [
                118
            ],
            "state": [
                82
            ],
            "tries": [
                127
            ],
            "chapter": [
                29
            ],
            "manga": [
                161
            ],
            "__typename": [
                248
            ]
        },
        "DownloadUpdate": {
            "download": [
                84
            ],
            "type": [
                86
            ],
            "__typename": [
                248
            ]
        },
        "DownloadUpdateType": {},
        "DownloadUpdates": {
            "initial": [
                84
            ],
            "omittedUpdates": [
                7
            ],
            "state": [
                88
            ],
            "updates": [
                85
            ],
            "__typename": [
                248
            ]
        },
        "DownloaderState": {},
        "Duration": {},
        "Edge": {
            "cursor": [
                42
            ],
            "node": [
                172
            ],
            "on_CategoryEdge": [
                10
            ],
            "on_ChapterEdge": [
                22
            ],
            "on_DownloadEdge": [
                80
            ],
            "on_ExtensionEdge": [
                97
            ],
            "on_MangaEdge": [
                151
            ],
            "on_MetaEdge": [
                164
            ],
            "on_SourceEdge": [
                235
            ],
            "on_TrackRecordEdge": [
                257
            ],
            "on_TrackerEdge": [
                266
            ],
            "__typename": [
                248
            ]
        },
        "EditTextPreference": {
            "currentValue": [
                248
            ],
            "default": [
                248
            ],
            "dialogMessage": [
                248
            ],
            "dialogTitle": [
                248
            ],
            "enabled": [
                7
            ],
            "key": [
                248
            ],
            "summary": [
                248
            ],
            "text": [
                248
            ],
            "title": [
                248
            ],
            "visible": [
                7
            ],
            "__typename": [
                248
            ]
        },
        "EnqueueChapterDownloadInput": {
            "clientMutationId": [
                248
            ],
            "id": [
                127
            ],
            "__typename": [
                248
            ]
        },
        "EnqueueChapterDownloadPayload": {
            "clientMutationId": [
                248
            ],
            "downloadStatus": [
                83
            ],
            "__typename": [
                248
            ]
        },
        "EnqueueChapterDownloadsInput": {
            "clientMutationId": [
                248
            ],
            "ids": [
                127
            ],
            "__typename": [
                248
            ]
        },
        "EnqueueChapterDownloadsPayload": {
            "clientMutationId": [
                248
            ],
            "downloadStatus": [
                83
            ],
            "__typename": [
                248
            ]
        },
        "ExtensionConditionInput": {
            "apkName": [
                248
            ],
            "hasUpdate": [
                7
            ],
            "iconUrl": [
                248
            ],
            "isInstalled": [
                7
            ],
            "isNsfw": [
                7
            ],
            "isObsolete": [
                7
            ],
            "lang": [
                248
            ],
            "name": [
                248
            ],
            "pkgName": [
                248
            ],
            "repo": [
                248
            ],
            "versionCode": [
                127
            ],
            "versionName": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "ExtensionEdge": {
            "cursor": [
                42
            ],
            "node": [
                102
            ],
            "__typename": [
                248
            ]
        },
        "ExtensionFilterInput": {
            "and": [
                98
            ],
            "apkName": [
                249
            ],
            "hasUpdate": [
                8
            ],
            "iconUrl": [
                249
            ],
            "isInstalled": [
                8
            ],
            "isNsfw": [
                8
            ],
            "isObsolete": [
                8
            ],
            "lang": [
                249
            ],
            "name": [
                249
            ],
            "not": [
                98
            ],
            "or": [
                98
            ],
            "pkgName": [
                249
            ],
            "repo": [
                249
            ],
            "versionCode": [
                128
            ],
            "versionName": [
                249
            ],
            "__typename": [
                248
            ]
        },
        "ExtensionNodeList": {
            "edges": [
                97
            ],
            "nodes": [
                102
            ],
            "pageInfo": [
                174
            ],
            "totalCount": [
                127
            ],
            "__typename": [
                248
            ]
        },
        "ExtensionOrderBy": {},
        "ExtensionOrderInput": {
            "by": [
                100
            ],
            "byType": [
                231
            ],
            "__typename": [
                248
            ]
        },
        "ExtensionType": {
            "apkName": [
                248
            ],
            "hasUpdate": [
                7
            ],
            "iconUrl": [
                248
            ],
            "isInstalled": [
                7
            ],
            "isNsfw": [
                7
            ],
            "isObsolete": [
                7
            ],
            "lang": [
                248
            ],
            "name": [
                248
            ],
            "pkgName": [
                248
            ],
            "repo": [
                248
            ],
            "versionCode": [
                127
            ],
            "versionName": [
                248
            ],
            "source": [
                239
            ],
            "__typename": [
                248
            ]
        },
        "FetchChapterPagesInput": {
            "chapterId": [
                127
            ],
            "clientMutationId": [
                248
            ],
            "format": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "FetchChapterPagesPayload": {
            "chapter": [
                29
            ],
            "clientMutationId": [
                248
            ],
            "pages": [
                248
            ],
            "syncConflict": [
                252
            ],
            "__typename": [
                248
            ]
        },
        "FetchChaptersInput": {
            "clientMutationId": [
                248
            ],
            "mangaId": [
                127
            ],
            "__typename": [
                248
            ]
        },
        "FetchChaptersPayload": {
            "chapters": [
                29
            ],
            "clientMutationId": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "FetchExtensionsInput": {
            "clientMutationId": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "FetchExtensionsPayload": {
            "clientMutationId": [
                248
            ],
            "extensions": [
                102
            ],
            "__typename": [
                248
            ]
        },
        "FetchMangaInput": {
            "clientMutationId": [
                248
            ],
            "id": [
                127
            ],
            "__typename": [
                248
            ]
        },
        "FetchMangaPayload": {
            "clientMutationId": [
                248
            ],
            "manga": [
                161
            ],
            "__typename": [
                248
            ]
        },
        "FetchSourceMangaInput": {
            "clientMutationId": [
                248
            ],
            "filters": [
                117
            ],
            "page": [
                127
            ],
            "query": [
                248
            ],
            "source": [
                149
            ],
            "type": [
                113
            ],
            "__typename": [
                248
            ]
        },
        "FetchSourceMangaPayload": {
            "clientMutationId": [
                248
            ],
            "hasNextPage": [
                7
            ],
            "mangas": [
                161
            ],
            "__typename": [
                248
            ]
        },
        "FetchSourceMangaType": {},
        "FetchTrackInput": {
            "clientMutationId": [
                248
            ],
            "recordId": [
                127
            ],
            "__typename": [
                248
            ]
        },
        "FetchTrackPayload": {
            "clientMutationId": [
                248
            ],
            "trackRecord": [
                262
            ],
            "__typename": [
                248
            ]
        },
        "Filter": {
            "on_CheckBoxFilter": [
                30
            ],
            "on_GroupFilter": [
                122
            ],
            "on_HeaderFilter": [
                123
            ],
            "on_SelectFilter": [
                194
            ],
            "on_SeparatorFilter": [
                195
            ],
            "on_SortFilter": [
                230
            ],
            "on_TextFilter": [
                253
            ],
            "on_TriStateFilter": [
                272
            ],
            "__typename": [
                248
            ]
        },
        "FilterChangeInput": {
            "checkBoxState": [
                7
            ],
            "groupChange": [
                117
            ],
            "position": [
                127
            ],
            "selectState": [
                127
            ],
            "sortState": [
                233
            ],
            "textState": [
                248
            ],
            "triState": [
                271
            ],
            "__typename": [
                248
            ]
        },
        "Float": {},
        "GlobalMetaNodeList": {
            "edges": [
                164
            ],
            "nodes": [
                120
            ],
            "pageInfo": [
                174
            ],
            "totalCount": [
                127
            ],
            "__typename": [
                248
            ]
        },
        "GlobalMetaType": {
            "key": [
                248
            ],
            "value": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "GlobalMetaTypeInput": {
            "key": [
                248
            ],
            "value": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "GroupFilter": {
            "filters": [
                116
            ],
            "name": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "HeaderFilter": {
            "name": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "IncludeOrExclude": {},
        "InstallExternalExtensionInput": {
            "clientMutationId": [
                248
            ],
            "extensionFile": [
                321
            ],
            "__typename": [
                248
            ]
        },
        "InstallExternalExtensionPayload": {
            "clientMutationId": [
                248
            ],
            "extension": [
                102
            ],
            "__typename": [
                248
            ]
        },
        "Int": {},
        "IntFilterInput": {
            "distinctFrom": [
                127
            ],
            "distinctFromAll": [
                127
            ],
            "distinctFromAny": [
                127
            ],
            "equalTo": [
                127
            ],
            "greaterThan": [
                127
            ],
            "greaterThanOrEqualTo": [
                127
            ],
            "in": [
                127
            ],
            "isNull": [
                7
            ],
            "lessThan": [
                127
            ],
            "lessThanOrEqualTo": [
                127
            ],
            "notDistinctFrom": [
                127
            ],
            "notEqualTo": [
                127
            ],
            "notEqualToAll": [
                127
            ],
            "notEqualToAny": [
                127
            ],
            "notIn": [
                127
            ],
            "__typename": [
                248
            ]
        },
        "KoSyncConnectPayload": {
            "clientMutationId": [
                248
            ],
            "message": [
                248
            ],
            "status": [
                130
            ],
            "__typename": [
                248
            ]
        },
        "KoSyncStatusPayload": {
            "isLoggedIn": [
                7
            ],
            "serverAddress": [
                248
            ],
            "username": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "KoreaderSyncChecksumMethod": {},
        "KoreaderSyncConflictStrategy": {},
        "KoreaderSyncLegacyStrategy": {},
        "LastUpdateTimestampPayload": {
            "timestamp": [
                149
            ],
            "__typename": [
                248
            ]
        },
        "LibraryUpdateStatus": {
            "categoryUpdates": [
                19
            ],
            "jobsInfo": [
                319
            ],
            "mangaUpdates": [
                162
            ],
            "__typename": [
                248
            ]
        },
        "LibraryUpdateStatusChangedInput": {
            "maxUpdates": [
                127
            ],
            "__typename": [
                248
            ]
        },
        "ListPreference": {
            "currentValue": [
                248
            ],
            "default": [
                248
            ],
            "enabled": [
                7
            ],
            "entries": [
                248
            ],
            "entryValues": [
                248
            ],
            "key": [
                248
            ],
            "summary": [
                248
            ],
            "title": [
                248
            ],
            "visible": [
                7
            ],
            "__typename": [
                248
            ]
        },
        "LoginInput": {
            "clientMutationId": [
                248
            ],
            "password": [
                248
            ],
            "username": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "LoginPayload": {
            "accessToken": [
                248
            ],
            "clientMutationId": [
                248
            ],
            "refreshToken": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "LoginTrackerCredentialsInput": {
            "clientMutationId": [
                248
            ],
            "password": [
                248
            ],
            "trackerId": [
                127
            ],
            "username": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "LoginTrackerCredentialsPayload": {
            "clientMutationId": [
                248
            ],
            "isLoggedIn": [
                7
            ],
            "tracker": [
                270
            ],
            "__typename": [
                248
            ]
        },
        "LoginTrackerOAuthInput": {
            "callbackUrl": [
                248
            ],
            "clientMutationId": [
                248
            ],
            "trackerId": [
                127
            ],
            "__typename": [
                248
            ]
        },
        "LoginTrackerOAuthPayload": {
            "clientMutationId": [
                248
            ],
            "isLoggedIn": [
                7
            ],
            "tracker": [
                270
            ],
            "__typename": [
                248
            ]
        },
        "LogoutKoSyncAccountInput": {
            "clientMutationId": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "LogoutKoSyncAccountPayload": {
            "clientMutationId": [
                248
            ],
            "status": [
                130
            ],
            "__typename": [
                248
            ]
        },
        "LogoutTrackerInput": {
            "clientMutationId": [
                248
            ],
            "trackerId": [
                127
            ],
            "__typename": [
                248
            ]
        },
        "LogoutTrackerPayload": {
            "clientMutationId": [
                248
            ],
            "isLoggedIn": [
                7
            ],
            "tracker": [
                270
            ],
            "__typename": [
                248
            ]
        },
        "LongFilterInput": {
            "distinctFrom": [
                149
            ],
            "distinctFromAll": [
                149
            ],
            "distinctFromAny": [
                149
            ],
            "equalTo": [
                149
            ],
            "greaterThan": [
                149
            ],
            "greaterThanOrEqualTo": [
                149
            ],
            "in": [
                149
            ],
            "isNull": [
                7
            ],
            "lessThan": [
                149
            ],
            "lessThanOrEqualTo": [
                149
            ],
            "notDistinctFrom": [
                149
            ],
            "notEqualTo": [
                149
            ],
            "notEqualToAll": [
                149
            ],
            "notEqualToAny": [
                149
            ],
            "notIn": [
                149
            ],
            "__typename": [
                248
            ]
        },
        "LongString": {},
        "MangaConditionInput": {
            "artist": [
                248
            ],
            "author": [
                248
            ],
            "categoryIds": [
                127
            ],
            "chaptersLastFetchedAt": [
                149
            ],
            "description": [
                248
            ],
            "genre": [
                248
            ],
            "id": [
                127
            ],
            "inLibrary": [
                7
            ],
            "inLibraryAt": [
                149
            ],
            "initialized": [
                7
            ],
            "lastFetchedAt": [
                149
            ],
            "realUrl": [
                248
            ],
            "sourceId": [
                149
            ],
            "status": [
                159
            ],
            "thumbnailUrl": [
                248
            ],
            "title": [
                248
            ],
            "url": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "MangaEdge": {
            "cursor": [
                42
            ],
            "node": [
                161
            ],
            "__typename": [
                248
            ]
        },
        "MangaFilterInput": {
            "and": [
                152
            ],
            "artist": [
                249
            ],
            "author": [
                249
            ],
            "categoryId": [
                128
            ],
            "chaptersLastFetchedAt": [
                148
            ],
            "description": [
                249
            ],
            "genre": [
                249
            ],
            "id": [
                128
            ],
            "inLibrary": [
                8
            ],
            "inLibraryAt": [
                148
            ],
            "initialized": [
                8
            ],
            "lastFetchedAt": [
                148
            ],
            "not": [
                152
            ],
            "or": [
                152
            ],
            "realUrl": [
                249
            ],
            "sourceId": [
                148
            ],
            "status": [
                160
            ],
            "thumbnailUrl": [
                249
            ],
            "title": [
                249
            ],
            "url": [
                249
            ],
            "__typename": [
                248
            ]
        },
        "MangaJobStatus": {},
        "MangaMetaType": {
            "key": [
                248
            ],
            "mangaId": [
                127
            ],
            "value": [
                248
            ],
            "manga": [
                161
            ],
            "__typename": [
                248
            ]
        },
        "MangaMetaTypeInput": {
            "key": [
                248
            ],
            "mangaId": [
                127
            ],
            "value": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "MangaNodeList": {
            "edges": [
                151
            ],
            "nodes": [
                161
            ],
            "pageInfo": [
                174
            ],
            "totalCount": [
                127
            ],
            "__typename": [
                248
            ]
        },
        "MangaOrderBy": {},
        "MangaOrderInput": {
            "by": [
                157
            ],
            "byType": [
                231
            ],
            "__typename": [
                248
            ]
        },
        "MangaStatus": {},
        "MangaStatusFilterInput": {
            "distinctFrom": [
                159
            ],
            "distinctFromAll": [
                159
            ],
            "distinctFromAny": [
                159
            ],
            "equalTo": [
                159
            ],
            "greaterThan": [
                159
            ],
            "greaterThanOrEqualTo": [
                159
            ],
            "in": [
                159
            ],
            "isNull": [
                7
            ],
            "lessThan": [
                159
            ],
            "lessThanOrEqualTo": [
                159
            ],
            "notDistinctFrom": [
                159
            ],
            "notEqualTo": [
                159
            ],
            "notEqualToAll": [
                159
            ],
            "notEqualToAny": [
                159
            ],
            "notIn": [
                159
            ],
            "__typename": [
                248
            ]
        },
        "MangaType": {
            "artist": [
                248
            ],
            "author": [
                248
            ],
            "chaptersLastFetchedAt": [
                149
            ],
            "description": [
                248
            ],
            "genre": [
                248
            ],
            "id": [
                127
            ],
            "inLibrary": [
                7
            ],
            "inLibraryAt": [
                149
            ],
            "initialized": [
                7
            ],
            "lastFetchedAt": [
                149
            ],
            "realUrl": [
                248
            ],
            "sourceId": [
                149
            ],
            "status": [
                159
            ],
            "thumbnailUrl": [
                248
            ],
            "thumbnailUrlLastFetched": [
                149
            ],
            "title": [
                248
            ],
            "updateStrategy": [
                316
            ],
            "url": [
                248
            ],
            "age": [
                149
            ],
            "bookmarkCount": [
                127
            ],
            "categories": [
                15
            ],
            "chapters": [
                26
            ],
            "chaptersAge": [
                149
            ],
            "downloadCount": [
                127
            ],
            "firstUnreadChapter": [
                29
            ],
            "hasDuplicateChapters": [
                7
            ],
            "highestNumberedChapter": [
                29
            ],
            "lastReadChapter": [
                29
            ],
            "latestFetchedChapter": [
                29
            ],
            "latestReadChapter": [
                29
            ],
            "latestUploadedChapter": [
                29
            ],
            "meta": [
                154
            ],
            "source": [
                243
            ],
            "trackRecords": [
                259
            ],
            "unreadCount": [
                127
            ],
            "__typename": [
                248
            ]
        },
        "MangaUpdateType": {
            "status": [
                153
            ],
            "manga": [
                161
            ],
            "__typename": [
                248
            ]
        },
        "MetaConditionInput": {
            "key": [
                248
            ],
            "value": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "MetaEdge": {
            "cursor": [
                42
            ],
            "node": [
                120
            ],
            "__typename": [
                248
            ]
        },
        "MetaFilterInput": {
            "and": [
                165
            ],
            "key": [
                249
            ],
            "not": [
                165
            ],
            "or": [
                165
            ],
            "value": [
                249
            ],
            "__typename": [
                248
            ]
        },
        "MetaInput": {
            "key": [
                248
            ],
            "value": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "MetaOrderBy": {},
        "MetaOrderInput": {
            "by": [
                167
            ],
            "byType": [
                231
            ],
            "__typename": [
                248
            ]
        },
        "MetaType": {
            "key": [
                248
            ],
            "value": [
                248
            ],
            "on_CategoryMetaType": [
                13
            ],
            "on_ChapterMetaType": [
                24
            ],
            "on_GlobalMetaType": [
                120
            ],
            "on_MangaMetaType": [
                154
            ],
            "on_SourceMetaType": [
                237
            ],
            "__typename": [
                248
            ]
        },
        "MultiSelectListPreference": {
            "currentValue": [
                248
            ],
            "default": [
                248
            ],
            "dialogMessage": [
                248
            ],
            "dialogTitle": [
                248
            ],
            "enabled": [
                7
            ],
            "entries": [
                248
            ],
            "entryValues": [
                248
            ],
            "key": [
                248
            ],
            "summary": [
                248
            ],
            "title": [
                248
            ],
            "visible": [
                7
            ],
            "__typename": [
                248
            ]
        },
        "Mutation": {
            "createBackup": [
                39,
                {
                    "input": [
                        38
                    ]
                }
            ],
            "restoreBackup": [
                191,
                {
                    "input": [
                        190,
                        "RestoreBackupInput!"
                    ]
                }
            ],
            "createCategory": [
                41,
                {
                    "input": [
                        40,
                        "CreateCategoryInput!"
                    ]
                }
            ],
            "deleteCategory": [
                50,
                {
                    "input": [
                        44,
                        "DeleteCategoryInput!"
                    ]
                }
            ],
            "deleteCategoryMeta": [
                46,
                {
                    "input": [
                        45,
                        "DeleteCategoryMetaInput!"
                    ]
                }
            ],
            "deleteCategoryMetas": [
                49,
                {
                    "input": [
                        47,
                        "DeleteCategoryMetasInput!"
                    ]
                }
            ],
            "setCategoryMeta": [
                197,
                {
                    "input": [
                        196,
                        "SetCategoryMetaInput!"
                    ]
                }
            ],
            "setCategoryMetas": [
                200,
                {
                    "input": [
                        198,
                        "SetCategoryMetasInput!"
                    ]
                }
            ],
            "updateCategories": [
                276,
                {
                    "input": [
                        275,
                        "UpdateCategoriesInput!"
                    ]
                }
            ],
            "updateCategory": [
                283,
                {
                    "input": [
                        277,
                        "UpdateCategoryInput!"
                    ]
                }
            ],
            "updateCategoryOrder": [
                281,
                {
                    "input": [
                        280,
                        "UpdateCategoryOrderInput!"
                    ]
                }
            ],
            "updateMangaCategories": [
                300,
                {
                    "input": [
                        298,
                        "UpdateMangaCategoriesInput!"
                    ]
                }
            ],
            "updateMangasCategories": [
                305,
                {
                    "input": [
                        304,
                        "UpdateMangasCategoriesInput!"
                    ]
                }
            ],
            "deleteChapterMeta": [
                52,
                {
                    "input": [
                        51,
                        "DeleteChapterMetaInput!"
                    ]
                }
            ],
            "deleteChapterMetas": [
                55,
                {
                    "input": [
                        53,
                        "DeleteChapterMetasInput!"
                    ]
                }
            ],
            "fetchChapterPages": [
                104,
                {
                    "input": [
                        103,
                        "FetchChapterPagesInput!"
                    ]
                }
            ],
            "fetchChapters": [
                106,
                {
                    "input": [
                        105,
                        "FetchChaptersInput!"
                    ]
                }
            ],
            "setChapterMeta": [
                202,
                {
                    "input": [
                        201,
                        "SetChapterMetaInput!"
                    ]
                }
            ],
            "setChapterMetas": [
                205,
                {
                    "input": [
                        203,
                        "SetChapterMetasInput!"
                    ]
                }
            ],
            "updateChapter": [
                286,
                {
                    "input": [
                        284,
                        "UpdateChapterInput!"
                    ]
                }
            ],
            "updateChapters": [
                288,
                {
                    "input": [
                        287,
                        "UpdateChaptersInput!"
                    ]
                }
            ],
            "clearDownloader": [
                36,
                {
                    "input": [
                        35,
                        "ClearDownloaderInput!"
                    ]
                }
            ],
            "deleteDownloadedChapter": [
                57,
                {
                    "input": [
                        56,
                        "DeleteDownloadedChapterInput!"
                    ]
                }
            ],
            "deleteDownloadedChapters": [
                59,
                {
                    "input": [
                        58,
                        "DeleteDownloadedChaptersInput!"
                    ]
                }
            ],
            "dequeueChapterDownload": [
                75,
                {
                    "input": [
                        74,
                        "DequeueChapterDownloadInput!"
                    ]
                }
            ],
            "dequeueChapterDownloads": [
                77,
                {
                    "input": [
                        76,
                        "DequeueChapterDownloadsInput!"
                    ]
                }
            ],
            "enqueueChapterDownload": [
                93,
                {
                    "input": [
                        92,
                        "EnqueueChapterDownloadInput!"
                    ]
                }
            ],
            "enqueueChapterDownloads": [
                95,
                {
                    "input": [
                        94,
                        "EnqueueChapterDownloadsInput!"
                    ]
                }
            ],
            "reorderChapterDownload": [
                187,
                {
                    "input": [
                        186,
                        "ReorderChapterDownloadInput!"
                    ]
                }
            ],
            "startDownloader": [
                245,
                {
                    "input": [
                        244,
                        "StartDownloaderInput!"
                    ]
                }
            ],
            "stopDownloader": [
                247,
                {
                    "input": [
                        246,
                        "StopDownloaderInput!"
                    ]
                }
            ],
            "fetchExtensions": [
                108,
                {
                    "input": [
                        107,
                        "FetchExtensionsInput!"
                    ]
                }
            ],
            "installExternalExtension": [
                126,
                {
                    "input": [
                        125,
                        "InstallExternalExtensionInput!"
                    ]
                }
            ],
            "updateExtension": [
                291,
                {
                    "input": [
                        289,
                        "UpdateExtensionInput!"
                    ]
                }
            ],
            "updateExtensions": [
                293,
                {
                    "input": [
                        292,
                        "UpdateExtensionsInput!"
                    ]
                }
            ],
            "clearCachedImages": [
                34,
                {
                    "input": [
                        33,
                        "ClearCachedImagesInput!"
                    ]
                }
            ],
            "resetWebUIUpdateStatus": [
                333
            ],
            "updateWebUI": [
                332,
                {
                    "input": [
                        331,
                        "WebUIUpdateInput!"
                    ]
                }
            ],
            "connectKoSyncAccount": [
                129,
                {
                    "input": [
                        37,
                        "ConnectKoSyncAccountInput!"
                    ]
                }
            ],
            "logoutKoSyncAccount": [
                145,
                {
                    "input": [
                        144,
                        "LogoutKoSyncAccountInput!"
                    ]
                }
            ],
            "pullKoSyncProgress": [
                180,
                {
                    "input": [
                        179,
                        "PullKoSyncProgressInput!"
                    ]
                }
            ],
            "pushKoSyncProgress": [
                182,
                {
                    "input": [
                        181,
                        "PushKoSyncProgressInput!"
                    ]
                }
            ],
            "deleteMangaMeta": [
                65,
                {
                    "input": [
                        64,
                        "DeleteMangaMetaInput!"
                    ]
                }
            ],
            "deleteMangaMetas": [
                68,
                {
                    "input": [
                        66,
                        "DeleteMangaMetasInput!"
                    ]
                }
            ],
            "fetchManga": [
                110,
                {
                    "input": [
                        109,
                        "FetchMangaInput!"
                    ]
                }
            ],
            "setMangaMeta": [
                211,
                {
                    "input": [
                        210,
                        "SetMangaMetaInput!"
                    ]
                }
            ],
            "setMangaMetas": [
                214,
                {
                    "input": [
                        212,
                        "SetMangaMetasInput!"
                    ]
                }
            ],
            "updateManga": [
                303,
                {
                    "input": [
                        301,
                        "UpdateMangaInput!"
                    ]
                }
            ],
            "updateMangas": [
                307,
                {
                    "input": [
                        306,
                        "UpdateMangasInput!"
                    ]
                }
            ],
            "deleteGlobalMeta": [
                61,
                {
                    "input": [
                        60,
                        "DeleteGlobalMetaInput!"
                    ]
                }
            ],
            "deleteGlobalMetas": [
                63,
                {
                    "input": [
                        62,
                        "DeleteGlobalMetasInput!"
                    ]
                }
            ],
            "setGlobalMeta": [
                207,
                {
                    "input": [
                        206,
                        "SetGlobalMetaInput!"
                    ]
                }
            ],
            "setGlobalMetas": [
                209,
                {
                    "input": [
                        208,
                        "SetGlobalMetasInput!"
                    ]
                }
            ],
            "resetSettings": [
                189,
                {
                    "input": [
                        188,
                        "ResetSettingsInput!"
                    ]
                }
            ],
            "setSettings": [
                216,
                {
                    "input": [
                        215,
                        "SetSettingsInput!"
                    ]
                }
            ],
            "deleteSourceMeta": [
                70,
                {
                    "input": [
                        69,
                        "DeleteSourceMetaInput!"
                    ]
                }
            ],
            "deleteSourceMetas": [
                73,
                {
                    "input": [
                        71,
                        "DeleteSourceMetasInput!"
                    ]
                }
            ],
            "fetchSourceManga": [
                112,
                {
                    "input": [
                        111,
                        "FetchSourceMangaInput!"
                    ]
                }
            ],
            "setSourceMeta": [
                218,
                {
                    "input": [
                        217,
                        "SetSourceMetaInput!"
                    ]
                }
            ],
            "setSourceMetas": [
                221,
                {
                    "input": [
                        219,
                        "SetSourceMetasInput!"
                    ]
                }
            ],
            "updateSourcePreference": [
                309,
                {
                    "input": [
                        308,
                        "UpdateSourcePreferenceInput!"
                    ]
                }
            ],
            "bindTrack": [
                6,
                {
                    "input": [
                        5,
                        "BindTrackInput!"
                    ]
                }
            ],
            "fetchTrack": [
                115,
                {
                    "input": [
                        114,
                        "FetchTrackInput!"
                    ]
                }
            ],
            "loginTrackerCredentials": [
                141,
                {
                    "input": [
                        140,
                        "LoginTrackerCredentialsInput!"
                    ]
                }
            ],
            "loginTrackerOAuth": [
                143,
                {
                    "input": [
                        142,
                        "LoginTrackerOAuthInput!"
                    ]
                }
            ],
            "logoutTracker": [
                147,
                {
                    "input": [
                        146,
                        "LogoutTrackerInput!"
                    ]
                }
            ],
            "trackProgress": [
                255,
                {
                    "input": [
                        254,
                        "TrackProgressInput!"
                    ]
                }
            ],
            "unbindTrack": [
                274,
                {
                    "input": [
                        273,
                        "UnbindTrackInput!"
                    ]
                }
            ],
            "updateTrack": [
                318,
                {
                    "input": [
                        317,
                        "UpdateTrackInput!"
                    ]
                }
            ],
            "updateCategoryManga": [
                279,
                {
                    "input": [
                        278,
                        "UpdateCategoryMangaInput!"
                    ]
                }
            ],
            "updateLibrary": [
                297,
                {
                    "input": [
                        294,
                        "UpdateLibraryInput!"
                    ]
                }
            ],
            "updateLibraryManga": [
                296,
                {
                    "input": [
                        295,
                        "UpdateLibraryMangaInput!"
                    ]
                }
            ],
            "updateStop": [
                315,
                {
                    "input": [
                        314,
                        "UpdateStopInput!"
                    ]
                }
            ],
            "login": [
                139,
                {
                    "input": [
                        138,
                        "LoginInput!"
                    ]
                }
            ],
            "refreshToken": [
                185,
                {
                    "input": [
                        184,
                        "RefreshTokenInput!"
                    ]
                }
            ],
            "__typename": [
                248
            ]
        },
        "Node": {
            "on_CategoryMetaType": [
                13
            ],
            "on_CategoryType": [
                18
            ],
            "on_ChapterMetaType": [
                24
            ],
            "on_ChapterType": [
                29
            ],
            "on_DownloadType": [
                84
            ],
            "on_DownloadUpdate": [
                85
            ],
            "on_ExtensionType": [
                102
            ],
            "on_GlobalMetaType": [
                120
            ],
            "on_MangaMetaType": [
                154
            ],
            "on_MangaType": [
                161
            ],
            "on_PartialSettingsType": [
                176
            ],
            "on_SettingsType": [
                229
            ],
            "on_SourceMetaType": [
                237
            ],
            "on_SourceType": [
                243
            ],
            "on_TrackRecordType": [
                262
            ],
            "on_TrackerType": [
                270
            ],
            "on_MetaType": [
                169
            ],
            "on_Settings": [
                222
            ],
            "__typename": [
                248
            ]
        },
        "NodeList": {
            "edges": [
                90
            ],
            "nodes": [
                172
            ],
            "pageInfo": [
                174
            ],
            "totalCount": [
                127
            ],
            "on_CategoryNodeList": [
                15
            ],
            "on_ChapterNodeList": [
                26
            ],
            "on_DownloadNodeList": [
                81
            ],
            "on_ExtensionNodeList": [
                99
            ],
            "on_GlobalMetaNodeList": [
                119
            ],
            "on_MangaNodeList": [
                156
            ],
            "on_SourceNodeList": [
                239
            ],
            "on_TrackRecordNodeList": [
                259
            ],
            "on_TrackerNodeList": [
                267
            ],
            "__typename": [
                248
            ]
        },
        "PageInfo": {
            "endCursor": [
                42
            ],
            "hasNextPage": [
                7
            ],
            "hasPreviousPage": [
                7
            ],
            "startCursor": [
                42
            ],
            "__typename": [
                248
            ]
        },
        "PartialBackupFlagsInput": {
            "includeCategories": [
                7
            ],
            "includeChapters": [
                7
            ],
            "includeClientData": [
                7
            ],
            "includeHistory": [
                7
            ],
            "includeManga": [
                7
            ],
            "includeServerSettings": [
                7
            ],
            "includeTracking": [
                7
            ],
            "__typename": [
                248
            ]
        },
        "PartialSettingsType": {
            "authMode": [
                2
            ],
            "authPassword": [
                248
            ],
            "authUsername": [
                248
            ],
            "autoBackupIncludeCategories": [
                7
            ],
            "autoBackupIncludeChapters": [
                7
            ],
            "autoBackupIncludeClientData": [
                7
            ],
            "autoBackupIncludeHistory": [
                7
            ],
            "autoBackupIncludeManga": [
                7
            ],
            "autoBackupIncludeServerSettings": [
                7
            ],
            "autoBackupIncludeTracking": [
                7
            ],
            "autoDownloadAheadLimit": [
                127
            ],
            "autoDownloadIgnoreReUploads": [
                7
            ],
            "autoDownloadNewChapters": [
                7
            ],
            "autoDownloadNewChaptersLimit": [
                127
            ],
            "backupInterval": [
                127
            ],
            "backupPath": [
                248
            ],
            "backupTTL": [
                127
            ],
            "backupTime": [
                248
            ],
            "basicAuthEnabled": [
                7
            ],
            "basicAuthPassword": [
                248
            ],
            "basicAuthUsername": [
                248
            ],
            "databasePassword": [
                248
            ],
            "databaseType": [
                43
            ],
            "databaseUrl": [
                248
            ],
            "databaseUsername": [
                248
            ],
            "debugLogsEnabled": [
                7
            ],
            "downloadAsCbz": [
                7
            ],
            "downloadConversions": [
                227
            ],
            "downloadsPath": [
                248
            ],
            "electronPath": [
                248
            ],
            "excludeCompleted": [
                7
            ],
            "excludeEntryWithUnreadChapters": [
                7
            ],
            "excludeNotStarted": [
                7
            ],
            "excludeUnreadChapters": [
                7
            ],
            "extensionRepos": [
                248
            ],
            "flareSolverrAsResponseFallback": [
                7
            ],
            "flareSolverrEnabled": [
                7
            ],
            "flareSolverrSessionName": [
                248
            ],
            "flareSolverrSessionTtl": [
                127
            ],
            "flareSolverrTimeout": [
                127
            ],
            "flareSolverrUrl": [
                248
            ],
            "globalUpdateInterval": [
                118
            ],
            "gqlDebugLogsEnabled": [
                7
            ],
            "initialOpenInBrowserEnabled": [
                7
            ],
            "ip": [
                248
            ],
            "jwtAudience": [
                248
            ],
            "jwtRefreshExpiry": [
                89
            ],
            "jwtTokenExpiry": [
                89
            ],
            "koreaderSyncChecksumMethod": [
                131
            ],
            "koreaderSyncDeviceId": [
                248
            ],
            "koreaderSyncPercentageTolerance": [
                118
            ],
            "koreaderSyncServerUrl": [
                248
            ],
            "koreaderSyncStrategy": [
                133
            ],
            "koreaderSyncStrategyBackward": [
                132
            ],
            "koreaderSyncStrategyForward": [
                132
            ],
            "koreaderSyncUserkey": [
                248
            ],
            "koreaderSyncUsername": [
                248
            ],
            "localSourcePath": [
                248
            ],
            "maxLogFileSize": [
                248
            ],
            "maxLogFiles": [
                127
            ],
            "maxLogFolderSize": [
                248
            ],
            "maxSourcesInParallel": [
                127
            ],
            "opdsCbzMimetype": [
                20
            ],
            "opdsChapterSortOrder": [
                231
            ],
            "opdsEnablePageReadProgress": [
                7
            ],
            "opdsItemsPerPage": [
                127
            ],
            "opdsMarkAsReadOnDownload": [
                7
            ],
            "opdsShowOnlyDownloadedChapters": [
                7
            ],
            "opdsShowOnlyUnreadChapters": [
                7
            ],
            "opdsUseBinaryFileSizes": [
                7
            ],
            "port": [
                127
            ],
            "serveConversions": [
                227
            ],
            "socksProxyEnabled": [
                7
            ],
            "socksProxyHost": [
                248
            ],
            "socksProxyPassword": [
                248
            ],
            "socksProxyPort": [
                248
            ],
            "socksProxyUsername": [
                248
            ],
            "socksProxyVersion": [
                127
            ],
            "systemTrayEnabled": [
                7
            ],
            "updateMangas": [
                7
            ],
            "useHikariConnectionPool": [
                7
            ],
            "webUIChannel": [
                326
            ],
            "webUIFlavor": [
                327
            ],
            "webUIInterface": [
                328
            ],
            "webUIUpdateCheckInterval": [
                118
            ],
            "__typename": [
                248
            ]
        },
        "PartialSettingsTypeInput": {
            "authMode": [
                2
            ],
            "authPassword": [
                248
            ],
            "authUsername": [
                248
            ],
            "autoBackupIncludeCategories": [
                7
            ],
            "autoBackupIncludeChapters": [
                7
            ],
            "autoBackupIncludeClientData": [
                7
            ],
            "autoBackupIncludeHistory": [
                7
            ],
            "autoBackupIncludeManga": [
                7
            ],
            "autoBackupIncludeServerSettings": [
                7
            ],
            "autoBackupIncludeTracking": [
                7
            ],
            "autoDownloadIgnoreReUploads": [
                7
            ],
            "autoDownloadNewChapters": [
                7
            ],
            "autoDownloadNewChaptersLimit": [
                127
            ],
            "backupInterval": [
                127
            ],
            "backupPath": [
                248
            ],
            "backupTTL": [
                127
            ],
            "backupTime": [
                248
            ],
            "databasePassword": [
                248
            ],
            "databaseType": [
                43
            ],
            "databaseUrl": [
                248
            ],
            "databaseUsername": [
                248
            ],
            "debugLogsEnabled": [
                7
            ],
            "downloadAsCbz": [
                7
            ],
            "downloadConversions": [
                228
            ],
            "downloadsPath": [
                248
            ],
            "electronPath": [
                248
            ],
            "excludeCompleted": [
                7
            ],
            "excludeEntryWithUnreadChapters": [
                7
            ],
            "excludeNotStarted": [
                7
            ],
            "excludeUnreadChapters": [
                7
            ],
            "extensionRepos": [
                248
            ],
            "flareSolverrAsResponseFallback": [
                7
            ],
            "flareSolverrEnabled": [
                7
            ],
            "flareSolverrSessionName": [
                248
            ],
            "flareSolverrSessionTtl": [
                127
            ],
            "flareSolverrTimeout": [
                127
            ],
            "flareSolverrUrl": [
                248
            ],
            "globalUpdateInterval": [
                118
            ],
            "initialOpenInBrowserEnabled": [
                7
            ],
            "ip": [
                248
            ],
            "jwtAudience": [
                248
            ],
            "jwtRefreshExpiry": [
                89
            ],
            "jwtTokenExpiry": [
                89
            ],
            "koreaderSyncChecksumMethod": [
                131
            ],
            "koreaderSyncPercentageTolerance": [
                118
            ],
            "koreaderSyncStrategyBackward": [
                132
            ],
            "koreaderSyncStrategyForward": [
                132
            ],
            "localSourcePath": [
                248
            ],
            "maxLogFileSize": [
                248
            ],
            "maxLogFiles": [
                127
            ],
            "maxLogFolderSize": [
                248
            ],
            "maxSourcesInParallel": [
                127
            ],
            "opdsCbzMimetype": [
                20
            ],
            "opdsChapterSortOrder": [
                231
            ],
            "opdsEnablePageReadProgress": [
                7
            ],
            "opdsItemsPerPage": [
                127
            ],
            "opdsMarkAsReadOnDownload": [
                7
            ],
            "opdsShowOnlyDownloadedChapters": [
                7
            ],
            "opdsShowOnlyUnreadChapters": [
                7
            ],
            "opdsUseBinaryFileSizes": [
                7
            ],
            "port": [
                127
            ],
            "serveConversions": [
                228
            ],
            "socksProxyEnabled": [
                7
            ],
            "socksProxyHost": [
                248
            ],
            "socksProxyPassword": [
                248
            ],
            "socksProxyPort": [
                248
            ],
            "socksProxyUsername": [
                248
            ],
            "socksProxyVersion": [
                127
            ],
            "systemTrayEnabled": [
                7
            ],
            "updateMangas": [
                7
            ],
            "useHikariConnectionPool": [
                7
            ],
            "webUIChannel": [
                326
            ],
            "webUIFlavor": [
                327
            ],
            "webUIInterface": [
                328
            ],
            "webUIUpdateCheckInterval": [
                118
            ],
            "__typename": [
                248
            ]
        },
        "Preference": {
            "on_CheckBoxPreference": [
                31
            ],
            "on_EditTextPreference": [
                91
            ],
            "on_ListPreference": [
                137
            ],
            "on_MultiSelectListPreference": [
                170
            ],
            "on_SwitchPreference": [
                251
            ],
            "__typename": [
                248
            ]
        },
        "PullKoSyncProgressInput": {
            "chapterId": [
                127
            ],
            "clientMutationId": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "PullKoSyncProgressPayload": {
            "chapter": [
                29
            ],
            "clientMutationId": [
                248
            ],
            "syncConflict": [
                252
            ],
            "__typename": [
                248
            ]
        },
        "PushKoSyncProgressInput": {
            "chapterId": [
                127
            ],
            "clientMutationId": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "PushKoSyncProgressPayload": {
            "chapter": [
                29
            ],
            "clientMutationId": [
                248
            ],
            "success": [
                7
            ],
            "__typename": [
                248
            ]
        },
        "Query": {
            "restoreStatus": [
                4,
                {
                    "id": [
                        248,
                        "String!"
                    ]
                }
            ],
            "validateBackup": [
                323,
                {
                    "input": [
                        322,
                        "ValidateBackupInput!"
                    ]
                }
            ],
            "categories": [
                15,
                {
                    "condition": [
                        9
                    ],
                    "filter": [
                        11
                    ],
                    "orderBy": [
                        16
                    ],
                    "orderByType": [
                        231
                    ],
                    "order": [
                        17,
                        "[CategoryOrderInput!]"
                    ],
                    "before": [
                        42
                    ],
                    "after": [
                        42
                    ],
                    "first": [
                        127
                    ],
                    "last": [
                        127
                    ],
                    "offset": [
                        127
                    ]
                }
            ],
            "category": [
                18,
                {
                    "id": [
                        127,
                        "Int!"
                    ]
                }
            ],
            "chapter": [
                29,
                {
                    "id": [
                        127,
                        "Int!"
                    ]
                }
            ],
            "chapters": [
                26,
                {
                    "condition": [
                        21
                    ],
                    "filter": [
                        23
                    ],
                    "orderBy": [
                        27
                    ],
                    "orderByType": [
                        231
                    ],
                    "order": [
                        28,
                        "[ChapterOrderInput!]"
                    ],
                    "before": [
                        42
                    ],
                    "after": [
                        42
                    ],
                    "first": [
                        127
                    ],
                    "last": [
                        127
                    ],
                    "offset": [
                        127
                    ]
                }
            ],
            "downloadStatus": [
                83
            ],
            "extension": [
                102,
                {
                    "pkgName": [
                        248,
                        "String!"
                    ]
                }
            ],
            "extensions": [
                99,
                {
                    "condition": [
                        96
                    ],
                    "filter": [
                        98
                    ],
                    "orderBy": [
                        100
                    ],
                    "orderByType": [
                        231
                    ],
                    "order": [
                        101,
                        "[ExtensionOrderInput!]"
                    ],
                    "before": [
                        42
                    ],
                    "after": [
                        42
                    ],
                    "first": [
                        127
                    ],
                    "last": [
                        127
                    ],
                    "offset": [
                        127
                    ]
                }
            ],
            "aboutServer": [
                0
            ],
            "aboutWebUI": [
                1
            ],
            "checkForServerUpdates": [
                32
            ],
            "checkForWebUIUpdate": [
                329
            ],
            "getWebUIUpdateStatus": [
                333
            ],
            "koSyncStatus": [
                130
            ],
            "manga": [
                161,
                {
                    "id": [
                        127,
                        "Int!"
                    ]
                }
            ],
            "mangas": [
                156,
                {
                    "condition": [
                        150
                    ],
                    "filter": [
                        152
                    ],
                    "orderBy": [
                        157
                    ],
                    "orderByType": [
                        231
                    ],
                    "order": [
                        158,
                        "[MangaOrderInput!]"
                    ],
                    "before": [
                        42
                    ],
                    "after": [
                        42
                    ],
                    "first": [
                        127
                    ],
                    "last": [
                        127
                    ],
                    "offset": [
                        127
                    ]
                }
            ],
            "meta": [
                120,
                {
                    "key": [
                        248,
                        "String!"
                    ]
                }
            ],
            "metas": [
                119,
                {
                    "condition": [
                        163
                    ],
                    "filter": [
                        165
                    ],
                    "orderBy": [
                        167
                    ],
                    "orderByType": [
                        231
                    ],
                    "order": [
                        168,
                        "[MetaOrderInput!]"
                    ],
                    "before": [
                        42
                    ],
                    "after": [
                        42
                    ],
                    "first": [
                        127
                    ],
                    "last": [
                        127
                    ],
                    "offset": [
                        127
                    ]
                }
            ],
            "settings": [
                229
            ],
            "source": [
                243,
                {
                    "id": [
                        149,
                        "LongString!"
                    ]
                }
            ],
            "sources": [
                239,
                {
                    "condition": [
                        234
                    ],
                    "filter": [
                        236
                    ],
                    "orderBy": [
                        240
                    ],
                    "orderByType": [
                        231
                    ],
                    "order": [
                        241,
                        "[SourceOrderInput!]"
                    ],
                    "before": [
                        42
                    ],
                    "after": [
                        42
                    ],
                    "first": [
                        127
                    ],
                    "last": [
                        127
                    ],
                    "offset": [
                        127
                    ]
                }
            ],
            "searchTracker": [
                193,
                {
                    "input": [
                        192,
                        "SearchTrackerInput!"
                    ]
                }
            ],
            "trackRecord": [
                262,
                {
                    "id": [
                        127,
                        "Int!"
                    ]
                }
            ],
            "trackRecords": [
                259,
                {
                    "condition": [
                        256
                    ],
                    "filter": [
                        258
                    ],
                    "orderBy": [
                        260
                    ],
                    "orderByType": [
                        231
                    ],
                    "order": [
                        261,
                        "[TrackRecordOrderInput!]"
                    ],
                    "before": [
                        42
                    ],
                    "after": [
                        42
                    ],
                    "first": [
                        127
                    ],
                    "last": [
                        127
                    ],
                    "offset": [
                        127
                    ]
                }
            ],
            "tracker": [
                270,
                {
                    "id": [
                        127,
                        "Int!"
                    ]
                }
            ],
            "trackers": [
                267,
                {
                    "condition": [
                        265
                    ],
                    "orderBy": [
                        268
                    ],
                    "orderByType": [
                        231
                    ],
                    "order": [
                        269,
                        "[TrackerOrderInput!]"
                    ],
                    "before": [
                        42
                    ],
                    "after": [
                        42
                    ],
                    "first": [
                        127
                    ],
                    "last": [
                        127
                    ],
                    "offset": [
                        127
                    ]
                }
            ],
            "lastUpdateTimestamp": [
                134
            ],
            "libraryUpdateStatus": [
                135
            ],
            "updateStatus": [
                311
            ],
            "__typename": [
                248
            ]
        },
        "RefreshTokenInput": {
            "clientMutationId": [
                248
            ],
            "refreshToken": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "RefreshTokenPayload": {
            "accessToken": [
                248
            ],
            "clientMutationId": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "ReorderChapterDownloadInput": {
            "chapterId": [
                127
            ],
            "clientMutationId": [
                248
            ],
            "to": [
                127
            ],
            "__typename": [
                248
            ]
        },
        "ReorderChapterDownloadPayload": {
            "clientMutationId": [
                248
            ],
            "downloadStatus": [
                83
            ],
            "__typename": [
                248
            ]
        },
        "ResetSettingsInput": {
            "clientMutationId": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "ResetSettingsPayload": {
            "clientMutationId": [
                248
            ],
            "settings": [
                229
            ],
            "__typename": [
                248
            ]
        },
        "RestoreBackupInput": {
            "backup": [
                321
            ],
            "clientMutationId": [
                248
            ],
            "flags": [
                175
            ],
            "__typename": [
                248
            ]
        },
        "RestoreBackupPayload": {
            "clientMutationId": [
                248
            ],
            "id": [
                248
            ],
            "status": [
                4
            ],
            "__typename": [
                248
            ]
        },
        "SearchTrackerInput": {
            "query": [
                248
            ],
            "trackerId": [
                127
            ],
            "__typename": [
                248
            ]
        },
        "SearchTrackerPayload": {
            "trackSearches": [
                263
            ],
            "__typename": [
                248
            ]
        },
        "SelectFilter": {
            "default": [
                127
            ],
            "name": [
                248
            ],
            "values": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "SeparatorFilter": {
            "name": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "SetCategoryMetaInput": {
            "clientMutationId": [
                248
            ],
            "meta": [
                14
            ],
            "__typename": [
                248
            ]
        },
        "SetCategoryMetaPayload": {
            "clientMutationId": [
                248
            ],
            "meta": [
                13
            ],
            "__typename": [
                248
            ]
        },
        "SetCategoryMetasInput": {
            "clientMutationId": [
                248
            ],
            "items": [
                199
            ],
            "__typename": [
                248
            ]
        },
        "SetCategoryMetasItemInput": {
            "categoryIds": [
                127
            ],
            "metas": [
                166
            ],
            "__typename": [
                248
            ]
        },
        "SetCategoryMetasPayload": {
            "categories": [
                18
            ],
            "clientMutationId": [
                248
            ],
            "metas": [
                13
            ],
            "__typename": [
                248
            ]
        },
        "SetChapterMetaInput": {
            "clientMutationId": [
                248
            ],
            "meta": [
                25
            ],
            "__typename": [
                248
            ]
        },
        "SetChapterMetaPayload": {
            "clientMutationId": [
                248
            ],
            "meta": [
                24
            ],
            "__typename": [
                248
            ]
        },
        "SetChapterMetasInput": {
            "clientMutationId": [
                248
            ],
            "items": [
                204
            ],
            "__typename": [
                248
            ]
        },
        "SetChapterMetasItemInput": {
            "chapterIds": [
                127
            ],
            "metas": [
                166
            ],
            "__typename": [
                248
            ]
        },
        "SetChapterMetasPayload": {
            "chapters": [
                29
            ],
            "clientMutationId": [
                248
            ],
            "metas": [
                24
            ],
            "__typename": [
                248
            ]
        },
        "SetGlobalMetaInput": {
            "clientMutationId": [
                248
            ],
            "meta": [
                121
            ],
            "__typename": [
                248
            ]
        },
        "SetGlobalMetaPayload": {
            "clientMutationId": [
                248
            ],
            "meta": [
                120
            ],
            "__typename": [
                248
            ]
        },
        "SetGlobalMetasInput": {
            "clientMutationId": [
                248
            ],
            "metas": [
                166
            ],
            "__typename": [
                248
            ]
        },
        "SetGlobalMetasPayload": {
            "clientMutationId": [
                248
            ],
            "metas": [
                120
            ],
            "__typename": [
                248
            ]
        },
        "SetMangaMetaInput": {
            "clientMutationId": [
                248
            ],
            "meta": [
                155
            ],
            "__typename": [
                248
            ]
        },
        "SetMangaMetaPayload": {
            "clientMutationId": [
                248
            ],
            "meta": [
                154
            ],
            "__typename": [
                248
            ]
        },
        "SetMangaMetasInput": {
            "clientMutationId": [
                248
            ],
            "items": [
                213
            ],
            "__typename": [
                248
            ]
        },
        "SetMangaMetasItemInput": {
            "mangaIds": [
                127
            ],
            "metas": [
                166
            ],
            "__typename": [
                248
            ]
        },
        "SetMangaMetasPayload": {
            "clientMutationId": [
                248
            ],
            "mangas": [
                161
            ],
            "metas": [
                154
            ],
            "__typename": [
                248
            ]
        },
        "SetSettingsInput": {
            "clientMutationId": [
                248
            ],
            "settings": [
                177
            ],
            "__typename": [
                248
            ]
        },
        "SetSettingsPayload": {
            "clientMutationId": [
                248
            ],
            "settings": [
                229
            ],
            "__typename": [
                248
            ]
        },
        "SetSourceMetaInput": {
            "clientMutationId": [
                248
            ],
            "meta": [
                238
            ],
            "__typename": [
                248
            ]
        },
        "SetSourceMetaPayload": {
            "clientMutationId": [
                248
            ],
            "meta": [
                237
            ],
            "__typename": [
                248
            ]
        },
        "SetSourceMetasInput": {
            "clientMutationId": [
                248
            ],
            "items": [
                220
            ],
            "__typename": [
                248
            ]
        },
        "SetSourceMetasItemInput": {
            "metas": [
                166
            ],
            "sourceIds": [
                149
            ],
            "__typename": [
                248
            ]
        },
        "SetSourceMetasPayload": {
            "clientMutationId": [
                248
            ],
            "metas": [
                237
            ],
            "sources": [
                243
            ],
            "__typename": [
                248
            ]
        },
        "Settings": {
            "authMode": [
                2
            ],
            "authPassword": [
                248
            ],
            "authUsername": [
                248
            ],
            "autoBackupIncludeCategories": [
                7
            ],
            "autoBackupIncludeChapters": [
                7
            ],
            "autoBackupIncludeClientData": [
                7
            ],
            "autoBackupIncludeHistory": [
                7
            ],
            "autoBackupIncludeManga": [
                7
            ],
            "autoBackupIncludeServerSettings": [
                7
            ],
            "autoBackupIncludeTracking": [
                7
            ],
            "autoDownloadAheadLimit": [
                127
            ],
            "autoDownloadIgnoreReUploads": [
                7
            ],
            "autoDownloadNewChapters": [
                7
            ],
            "autoDownloadNewChaptersLimit": [
                127
            ],
            "backupInterval": [
                127
            ],
            "backupPath": [
                248
            ],
            "backupTTL": [
                127
            ],
            "backupTime": [
                248
            ],
            "basicAuthEnabled": [
                7
            ],
            "basicAuthPassword": [
                248
            ],
            "basicAuthUsername": [
                248
            ],
            "databasePassword": [
                248
            ],
            "databaseType": [
                43
            ],
            "databaseUrl": [
                248
            ],
            "databaseUsername": [
                248
            ],
            "debugLogsEnabled": [
                7
            ],
            "downloadAsCbz": [
                7
            ],
            "downloadConversions": [
                223
            ],
            "downloadsPath": [
                248
            ],
            "electronPath": [
                248
            ],
            "excludeCompleted": [
                7
            ],
            "excludeEntryWithUnreadChapters": [
                7
            ],
            "excludeNotStarted": [
                7
            ],
            "excludeUnreadChapters": [
                7
            ],
            "extensionRepos": [
                248
            ],
            "flareSolverrAsResponseFallback": [
                7
            ],
            "flareSolverrEnabled": [
                7
            ],
            "flareSolverrSessionName": [
                248
            ],
            "flareSolverrSessionTtl": [
                127
            ],
            "flareSolverrTimeout": [
                127
            ],
            "flareSolverrUrl": [
                248
            ],
            "globalUpdateInterval": [
                118
            ],
            "gqlDebugLogsEnabled": [
                7
            ],
            "initialOpenInBrowserEnabled": [
                7
            ],
            "ip": [
                248
            ],
            "jwtAudience": [
                248
            ],
            "jwtRefreshExpiry": [
                89
            ],
            "jwtTokenExpiry": [
                89
            ],
            "koreaderSyncChecksumMethod": [
                131
            ],
            "koreaderSyncDeviceId": [
                248
            ],
            "koreaderSyncPercentageTolerance": [
                118
            ],
            "koreaderSyncServerUrl": [
                248
            ],
            "koreaderSyncStrategy": [
                133
            ],
            "koreaderSyncStrategyBackward": [
                132
            ],
            "koreaderSyncStrategyForward": [
                132
            ],
            "koreaderSyncUserkey": [
                248
            ],
            "koreaderSyncUsername": [
                248
            ],
            "localSourcePath": [
                248
            ],
            "maxLogFileSize": [
                248
            ],
            "maxLogFiles": [
                127
            ],
            "maxLogFolderSize": [
                248
            ],
            "maxSourcesInParallel": [
                127
            ],
            "opdsCbzMimetype": [
                20
            ],
            "opdsChapterSortOrder": [
                231
            ],
            "opdsEnablePageReadProgress": [
                7
            ],
            "opdsItemsPerPage": [
                127
            ],
            "opdsMarkAsReadOnDownload": [
                7
            ],
            "opdsShowOnlyDownloadedChapters": [
                7
            ],
            "opdsShowOnlyUnreadChapters": [
                7
            ],
            "opdsUseBinaryFileSizes": [
                7
            ],
            "port": [
                127
            ],
            "serveConversions": [
                223
            ],
            "socksProxyEnabled": [
                7
            ],
            "socksProxyHost": [
                248
            ],
            "socksProxyPassword": [
                248
            ],
            "socksProxyPort": [
                248
            ],
            "socksProxyUsername": [
                248
            ],
            "socksProxyVersion": [
                127
            ],
            "systemTrayEnabled": [
                7
            ],
            "updateMangas": [
                7
            ],
            "useHikariConnectionPool": [
                7
            ],
            "webUIChannel": [
                326
            ],
            "webUIFlavor": [
                327
            ],
            "webUIInterface": [
                328
            ],
            "webUIUpdateCheckInterval": [
                118
            ],
            "on_PartialSettingsType": [
                176
            ],
            "on_SettingsType": [
                229
            ],
            "__typename": [
                248
            ]
        },
        "SettingsDownloadConversion": {
            "callTimeout": [
                89
            ],
            "compressionLevel": [
                118
            ],
            "connectTimeout": [
                89
            ],
            "headers": [
                224
            ],
            "mimeType": [
                248
            ],
            "target": [
                248
            ],
            "on_SettingsDownloadConversionType": [
                227
            ],
            "__typename": [
                248
            ]
        },
        "SettingsDownloadConversionHeader": {
            "name": [
                248
            ],
            "value": [
                248
            ],
            "on_SettingsDownloadConversionHeaderType": [
                225
            ],
            "__typename": [
                248
            ]
        },
        "SettingsDownloadConversionHeaderType": {
            "name": [
                248
            ],
            "value": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "SettingsDownloadConversionHeaderTypeInput": {
            "name": [
                248
            ],
            "value": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "SettingsDownloadConversionType": {
            "callTimeout": [
                89
            ],
            "compressionLevel": [
                118
            ],
            "connectTimeout": [
                89
            ],
            "headers": [
                225
            ],
            "mimeType": [
                248
            ],
            "target": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "SettingsDownloadConversionTypeInput": {
            "callTimeout": [
                89
            ],
            "compressionLevel": [
                118
            ],
            "connectTimeout": [
                89
            ],
            "headers": [
                226
            ],
            "mimeType": [
                248
            ],
            "target": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "SettingsType": {
            "authMode": [
                2
            ],
            "authPassword": [
                248
            ],
            "authUsername": [
                248
            ],
            "autoBackupIncludeCategories": [
                7
            ],
            "autoBackupIncludeChapters": [
                7
            ],
            "autoBackupIncludeClientData": [
                7
            ],
            "autoBackupIncludeHistory": [
                7
            ],
            "autoBackupIncludeManga": [
                7
            ],
            "autoBackupIncludeServerSettings": [
                7
            ],
            "autoBackupIncludeTracking": [
                7
            ],
            "autoDownloadAheadLimit": [
                127
            ],
            "autoDownloadIgnoreReUploads": [
                7
            ],
            "autoDownloadNewChapters": [
                7
            ],
            "autoDownloadNewChaptersLimit": [
                127
            ],
            "backupInterval": [
                127
            ],
            "backupPath": [
                248
            ],
            "backupTTL": [
                127
            ],
            "backupTime": [
                248
            ],
            "basicAuthEnabled": [
                7
            ],
            "basicAuthPassword": [
                248
            ],
            "basicAuthUsername": [
                248
            ],
            "databasePassword": [
                248
            ],
            "databaseType": [
                43
            ],
            "databaseUrl": [
                248
            ],
            "databaseUsername": [
                248
            ],
            "debugLogsEnabled": [
                7
            ],
            "downloadAsCbz": [
                7
            ],
            "downloadConversions": [
                227
            ],
            "downloadsPath": [
                248
            ],
            "electronPath": [
                248
            ],
            "excludeCompleted": [
                7
            ],
            "excludeEntryWithUnreadChapters": [
                7
            ],
            "excludeNotStarted": [
                7
            ],
            "excludeUnreadChapters": [
                7
            ],
            "extensionRepos": [
                248
            ],
            "flareSolverrAsResponseFallback": [
                7
            ],
            "flareSolverrEnabled": [
                7
            ],
            "flareSolverrSessionName": [
                248
            ],
            "flareSolverrSessionTtl": [
                127
            ],
            "flareSolverrTimeout": [
                127
            ],
            "flareSolverrUrl": [
                248
            ],
            "globalUpdateInterval": [
                118
            ],
            "gqlDebugLogsEnabled": [
                7
            ],
            "initialOpenInBrowserEnabled": [
                7
            ],
            "ip": [
                248
            ],
            "jwtAudience": [
                248
            ],
            "jwtRefreshExpiry": [
                89
            ],
            "jwtTokenExpiry": [
                89
            ],
            "koreaderSyncChecksumMethod": [
                131
            ],
            "koreaderSyncDeviceId": [
                248
            ],
            "koreaderSyncPercentageTolerance": [
                118
            ],
            "koreaderSyncServerUrl": [
                248
            ],
            "koreaderSyncStrategy": [
                133
            ],
            "koreaderSyncStrategyBackward": [
                132
            ],
            "koreaderSyncStrategyForward": [
                132
            ],
            "koreaderSyncUserkey": [
                248
            ],
            "koreaderSyncUsername": [
                248
            ],
            "localSourcePath": [
                248
            ],
            "maxLogFileSize": [
                248
            ],
            "maxLogFiles": [
                127
            ],
            "maxLogFolderSize": [
                248
            ],
            "maxSourcesInParallel": [
                127
            ],
            "opdsCbzMimetype": [
                20
            ],
            "opdsChapterSortOrder": [
                231
            ],
            "opdsEnablePageReadProgress": [
                7
            ],
            "opdsItemsPerPage": [
                127
            ],
            "opdsMarkAsReadOnDownload": [
                7
            ],
            "opdsShowOnlyDownloadedChapters": [
                7
            ],
            "opdsShowOnlyUnreadChapters": [
                7
            ],
            "opdsUseBinaryFileSizes": [
                7
            ],
            "port": [
                127
            ],
            "serveConversions": [
                227
            ],
            "socksProxyEnabled": [
                7
            ],
            "socksProxyHost": [
                248
            ],
            "socksProxyPassword": [
                248
            ],
            "socksProxyPort": [
                248
            ],
            "socksProxyUsername": [
                248
            ],
            "socksProxyVersion": [
                127
            ],
            "systemTrayEnabled": [
                7
            ],
            "updateMangas": [
                7
            ],
            "useHikariConnectionPool": [
                7
            ],
            "webUIChannel": [
                326
            ],
            "webUIFlavor": [
                327
            ],
            "webUIInterface": [
                328
            ],
            "webUIUpdateCheckInterval": [
                118
            ],
            "__typename": [
                248
            ]
        },
        "SortFilter": {
            "default": [
                232
            ],
            "name": [
                248
            ],
            "values": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "SortOrder": {},
        "SortSelection": {
            "ascending": [
                7
            ],
            "index": [
                127
            ],
            "__typename": [
                248
            ]
        },
        "SortSelectionInput": {
            "ascending": [
                7
            ],
            "index": [
                127
            ],
            "__typename": [
                248
            ]
        },
        "SourceConditionInput": {
            "id": [
                149
            ],
            "isNsfw": [
                7
            ],
            "lang": [
                248
            ],
            "name": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "SourceEdge": {
            "cursor": [
                42
            ],
            "node": [
                243
            ],
            "__typename": [
                248
            ]
        },
        "SourceFilterInput": {
            "and": [
                236
            ],
            "id": [
                148
            ],
            "isNsfw": [
                8
            ],
            "lang": [
                249
            ],
            "name": [
                249
            ],
            "not": [
                236
            ],
            "or": [
                236
            ],
            "__typename": [
                248
            ]
        },
        "SourceMetaType": {
            "key": [
                248
            ],
            "sourceId": [
                149
            ],
            "value": [
                248
            ],
            "source": [
                243
            ],
            "__typename": [
                248
            ]
        },
        "SourceMetaTypeInput": {
            "key": [
                248
            ],
            "sourceId": [
                149
            ],
            "value": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "SourceNodeList": {
            "edges": [
                235
            ],
            "nodes": [
                243
            ],
            "pageInfo": [
                174
            ],
            "totalCount": [
                127
            ],
            "__typename": [
                248
            ]
        },
        "SourceOrderBy": {},
        "SourceOrderInput": {
            "by": [
                240
            ],
            "byType": [
                231
            ],
            "__typename": [
                248
            ]
        },
        "SourcePreferenceChangeInput": {
            "checkBoxState": [
                7
            ],
            "editTextState": [
                248
            ],
            "listState": [
                248
            ],
            "multiSelectState": [
                248
            ],
            "position": [
                127
            ],
            "switchState": [
                7
            ],
            "__typename": [
                248
            ]
        },
        "SourceType": {
            "baseUrl": [
                248
            ],
            "displayName": [
                248
            ],
            "iconUrl": [
                248
            ],
            "id": [
                149
            ],
            "isConfigurable": [
                7
            ],
            "isNsfw": [
                7
            ],
            "lang": [
                248
            ],
            "name": [
                248
            ],
            "supportsLatest": [
                7
            ],
            "extension": [
                102
            ],
            "filters": [
                116
            ],
            "manga": [
                156
            ],
            "meta": [
                237
            ],
            "preferences": [
                178
            ],
            "__typename": [
                248
            ]
        },
        "StartDownloaderInput": {
            "clientMutationId": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "StartDownloaderPayload": {
            "clientMutationId": [
                248
            ],
            "downloadStatus": [
                83
            ],
            "__typename": [
                248
            ]
        },
        "StopDownloaderInput": {
            "clientMutationId": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "StopDownloaderPayload": {
            "clientMutationId": [
                248
            ],
            "downloadStatus": [
                83
            ],
            "__typename": [
                248
            ]
        },
        "String": {},
        "StringFilterInput": {
            "distinctFrom": [
                248
            ],
            "distinctFromAll": [
                248
            ],
            "distinctFromAny": [
                248
            ],
            "distinctFromInsensitive": [
                248
            ],
            "distinctFromInsensitiveAll": [
                248
            ],
            "distinctFromInsensitiveAny": [
                248
            ],
            "endsWith": [
                248
            ],
            "endsWithAll": [
                248
            ],
            "endsWithAny": [
                248
            ],
            "endsWithInsensitive": [
                248
            ],
            "endsWithInsensitiveAll": [
                248
            ],
            "endsWithInsensitiveAny": [
                248
            ],
            "equalTo": [
                248
            ],
            "greaterThan": [
                248
            ],
            "greaterThanInsensitive": [
                248
            ],
            "greaterThanOrEqualTo": [
                248
            ],
            "greaterThanOrEqualToInsensitive": [
                248
            ],
            "in": [
                248
            ],
            "inInsensitive": [
                248
            ],
            "includes": [
                248
            ],
            "includesAll": [
                248
            ],
            "includesAny": [
                248
            ],
            "includesInsensitive": [
                248
            ],
            "includesInsensitiveAll": [
                248
            ],
            "includesInsensitiveAny": [
                248
            ],
            "isNull": [
                7
            ],
            "lessThan": [
                248
            ],
            "lessThanInsensitive": [
                248
            ],
            "lessThanOrEqualTo": [
                248
            ],
            "lessThanOrEqualToInsensitive": [
                248
            ],
            "like": [
                248
            ],
            "likeAll": [
                248
            ],
            "likeAny": [
                248
            ],
            "likeInsensitive": [
                248
            ],
            "likeInsensitiveAll": [
                248
            ],
            "likeInsensitiveAny": [
                248
            ],
            "notDistinctFrom": [
                248
            ],
            "notDistinctFromInsensitive": [
                248
            ],
            "notEndsWith": [
                248
            ],
            "notEndsWithAll": [
                248
            ],
            "notEndsWithAny": [
                248
            ],
            "notEndsWithInsensitive": [
                248
            ],
            "notEndsWithInsensitiveAll": [
                248
            ],
            "notEndsWithInsensitiveAny": [
                248
            ],
            "notEqualTo": [
                248
            ],
            "notEqualToAll": [
                248
            ],
            "notEqualToAny": [
                248
            ],
            "notIn": [
                248
            ],
            "notInInsensitive": [
                248
            ],
            "notIncludes": [
                248
            ],
            "notIncludesAll": [
                248
            ],
            "notIncludesAny": [
                248
            ],
            "notIncludesInsensitive": [
                248
            ],
            "notIncludesInsensitiveAll": [
                248
            ],
            "notIncludesInsensitiveAny": [
                248
            ],
            "notLike": [
                248
            ],
            "notLikeAll": [
                248
            ],
            "notLikeAny": [
                248
            ],
            "notLikeInsensitive": [
                248
            ],
            "notLikeInsensitiveAll": [
                248
            ],
            "notLikeInsensitiveAny": [
                248
            ],
            "notStartsWith": [
                248
            ],
            "notStartsWithAll": [
                248
            ],
            "notStartsWithAny": [
                248
            ],
            "notStartsWithInsensitive": [
                248
            ],
            "notStartsWithInsensitiveAll": [
                248
            ],
            "notStartsWithInsensitiveAny": [
                248
            ],
            "startsWith": [
                248
            ],
            "startsWithAll": [
                248
            ],
            "startsWithAny": [
                248
            ],
            "startsWithInsensitive": [
                248
            ],
            "startsWithInsensitiveAll": [
                248
            ],
            "startsWithInsensitiveAny": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "Subscription": {
            "downloadChanged": [
                83
            ],
            "downloadStatusChanged": [
                87,
                {
                    "input": [
                        79,
                        "DownloadChangedInput!"
                    ]
                }
            ],
            "webUIUpdateStatusChange": [
                333
            ],
            "libraryUpdateStatusChanged": [
                320,
                {
                    "input": [
                        136,
                        "LibraryUpdateStatusChangedInput!"
                    ]
                }
            ],
            "updateStatusChanged": [
                311
            ],
            "__typename": [
                248
            ]
        },
        "SwitchPreference": {
            "currentValue": [
                7
            ],
            "default": [
                7
            ],
            "enabled": [
                7
            ],
            "key": [
                248
            ],
            "summary": [
                248
            ],
            "title": [
                248
            ],
            "visible": [
                7
            ],
            "__typename": [
                248
            ]
        },
        "SyncConflictInfoType": {
            "deviceName": [
                248
            ],
            "remotePage": [
                127
            ],
            "__typename": [
                248
            ]
        },
        "TextFilter": {
            "default": [
                248
            ],
            "name": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "TrackProgressInput": {
            "clientMutationId": [
                248
            ],
            "mangaId": [
                127
            ],
            "__typename": [
                248
            ]
        },
        "TrackProgressPayload": {
            "clientMutationId": [
                248
            ],
            "trackRecords": [
                262
            ],
            "__typename": [
                248
            ]
        },
        "TrackRecordConditionInput": {
            "finishDate": [
                149
            ],
            "id": [
                127
            ],
            "lastChapterRead": [
                118
            ],
            "libraryId": [
                149
            ],
            "mangaId": [
                127
            ],
            "private": [
                7
            ],
            "remoteId": [
                149
            ],
            "remoteUrl": [
                248
            ],
            "score": [
                118
            ],
            "startDate": [
                149
            ],
            "status": [
                127
            ],
            "title": [
                248
            ],
            "totalChapters": [
                127
            ],
            "trackerId": [
                127
            ],
            "__typename": [
                248
            ]
        },
        "TrackRecordEdge": {
            "cursor": [
                42
            ],
            "node": [
                262
            ],
            "__typename": [
                248
            ]
        },
        "TrackRecordFilterInput": {
            "and": [
                258
            ],
            "finishDate": [
                148
            ],
            "id": [
                128
            ],
            "lastChapterRead": [
                78
            ],
            "libraryId": [
                148
            ],
            "mangaId": [
                128
            ],
            "not": [
                258
            ],
            "or": [
                258
            ],
            "private": [
                8
            ],
            "remoteId": [
                148
            ],
            "remoteUrl": [
                249
            ],
            "score": [
                78
            ],
            "startDate": [
                148
            ],
            "status": [
                128
            ],
            "title": [
                249
            ],
            "totalChapters": [
                128
            ],
            "trackerId": [
                128
            ],
            "__typename": [
                248
            ]
        },
        "TrackRecordNodeList": {
            "edges": [
                257
            ],
            "nodes": [
                262
            ],
            "pageInfo": [
                174
            ],
            "totalCount": [
                127
            ],
            "__typename": [
                248
            ]
        },
        "TrackRecordOrderBy": {},
        "TrackRecordOrderInput": {
            "by": [
                260
            ],
            "byType": [
                231
            ],
            "__typename": [
                248
            ]
        },
        "TrackRecordType": {
            "finishDate": [
                149
            ],
            "id": [
                127
            ],
            "lastChapterRead": [
                118
            ],
            "libraryId": [
                149
            ],
            "mangaId": [
                127
            ],
            "private": [
                7
            ],
            "remoteId": [
                149
            ],
            "remoteUrl": [
                248
            ],
            "score": [
                118
            ],
            "startDate": [
                149
            ],
            "status": [
                127
            ],
            "title": [
                248
            ],
            "totalChapters": [
                127
            ],
            "trackerId": [
                127
            ],
            "displayScore": [
                248
            ],
            "manga": [
                161
            ],
            "tracker": [
                270
            ],
            "__typename": [
                248
            ]
        },
        "TrackSearchType": {
            "coverUrl": [
                248
            ],
            "finishedReadingDate": [
                149
            ],
            "id": [
                127
            ],
            "lastChapterRead": [
                118
            ],
            "libraryId": [
                149
            ],
            "private": [
                7
            ],
            "publishingStatus": [
                248
            ],
            "publishingType": [
                248
            ],
            "remoteId": [
                149
            ],
            "score": [
                118
            ],
            "startDate": [
                248
            ],
            "startedReadingDate": [
                149
            ],
            "status": [
                127
            ],
            "summary": [
                248
            ],
            "title": [
                248
            ],
            "totalChapters": [
                127
            ],
            "trackerId": [
                127
            ],
            "trackingUrl": [
                248
            ],
            "displayScore": [
                248
            ],
            "tracker": [
                270
            ],
            "__typename": [
                248
            ]
        },
        "TrackStatusType": {
            "name": [
                248
            ],
            "value": [
                127
            ],
            "__typename": [
                248
            ]
        },
        "TrackerConditionInput": {
            "icon": [
                248
            ],
            "id": [
                127
            ],
            "isLoggedIn": [
                7
            ],
            "name": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "TrackerEdge": {
            "cursor": [
                42
            ],
            "node": [
                270
            ],
            "__typename": [
                248
            ]
        },
        "TrackerNodeList": {
            "edges": [
                266
            ],
            "nodes": [
                270
            ],
            "pageInfo": [
                174
            ],
            "totalCount": [
                127
            ],
            "__typename": [
                248
            ]
        },
        "TrackerOrderBy": {},
        "TrackerOrderInput": {
            "by": [
                268
            ],
            "byType": [
                231
            ],
            "__typename": [
                248
            ]
        },
        "TrackerType": {
            "authUrl": [
                248
            ],
            "icon": [
                248
            ],
            "id": [
                127
            ],
            "isLoggedIn": [
                7
            ],
            "name": [
                248
            ],
            "supportsPrivateTracking": [
                7
            ],
            "supportsReadingDates": [
                7
            ],
            "supportsTrackDeletion": [
                7
            ],
            "isTokenExpired": [
                7
            ],
            "scores": [
                248
            ],
            "statuses": [
                264
            ],
            "trackRecords": [
                259
            ],
            "__typename": [
                248
            ]
        },
        "TriState": {},
        "TriStateFilter": {
            "default": [
                271
            ],
            "name": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "UnbindTrackInput": {
            "clientMutationId": [
                248
            ],
            "deleteRemoteTrack": [
                7
            ],
            "recordId": [
                127
            ],
            "__typename": [
                248
            ]
        },
        "UnbindTrackPayload": {
            "clientMutationId": [
                248
            ],
            "trackRecord": [
                262
            ],
            "__typename": [
                248
            ]
        },
        "UpdateCategoriesInput": {
            "clientMutationId": [
                248
            ],
            "ids": [
                127
            ],
            "patch": [
                282
            ],
            "__typename": [
                248
            ]
        },
        "UpdateCategoriesPayload": {
            "categories": [
                18
            ],
            "clientMutationId": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "UpdateCategoryInput": {
            "clientMutationId": [
                248
            ],
            "id": [
                127
            ],
            "patch": [
                282
            ],
            "__typename": [
                248
            ]
        },
        "UpdateCategoryMangaInput": {
            "categories": [
                127
            ],
            "clientMutationId": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "UpdateCategoryMangaPayload": {
            "clientMutationId": [
                248
            ],
            "updateStatus": [
                311
            ],
            "__typename": [
                248
            ]
        },
        "UpdateCategoryOrderInput": {
            "clientMutationId": [
                248
            ],
            "id": [
                127
            ],
            "position": [
                127
            ],
            "__typename": [
                248
            ]
        },
        "UpdateCategoryOrderPayload": {
            "categories": [
                18
            ],
            "clientMutationId": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "UpdateCategoryPatchInput": {
            "default": [
                7
            ],
            "includeInDownload": [
                124
            ],
            "includeInUpdate": [
                124
            ],
            "name": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "UpdateCategoryPayload": {
            "category": [
                18
            ],
            "clientMutationId": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "UpdateChapterInput": {
            "clientMutationId": [
                248
            ],
            "id": [
                127
            ],
            "patch": [
                285
            ],
            "__typename": [
                248
            ]
        },
        "UpdateChapterPatchInput": {
            "isBookmarked": [
                7
            ],
            "isRead": [
                7
            ],
            "lastPageRead": [
                127
            ],
            "__typename": [
                248
            ]
        },
        "UpdateChapterPayload": {
            "chapter": [
                29
            ],
            "clientMutationId": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "UpdateChaptersInput": {
            "clientMutationId": [
                248
            ],
            "ids": [
                127
            ],
            "patch": [
                285
            ],
            "__typename": [
                248
            ]
        },
        "UpdateChaptersPayload": {
            "chapters": [
                29
            ],
            "clientMutationId": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "UpdateExtensionInput": {
            "clientMutationId": [
                248
            ],
            "id": [
                248
            ],
            "patch": [
                290
            ],
            "__typename": [
                248
            ]
        },
        "UpdateExtensionPatchInput": {
            "install": [
                7
            ],
            "uninstall": [
                7
            ],
            "update": [
                7
            ],
            "__typename": [
                248
            ]
        },
        "UpdateExtensionPayload": {
            "clientMutationId": [
                248
            ],
            "extension": [
                102
            ],
            "__typename": [
                248
            ]
        },
        "UpdateExtensionsInput": {
            "clientMutationId": [
                248
            ],
            "ids": [
                248
            ],
            "patch": [
                290
            ],
            "__typename": [
                248
            ]
        },
        "UpdateExtensionsPayload": {
            "clientMutationId": [
                248
            ],
            "extensions": [
                102
            ],
            "__typename": [
                248
            ]
        },
        "UpdateLibraryInput": {
            "categories": [
                127
            ],
            "clientMutationId": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "UpdateLibraryMangaInput": {
            "clientMutationId": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "UpdateLibraryMangaPayload": {
            "clientMutationId": [
                248
            ],
            "updateStatus": [
                311
            ],
            "__typename": [
                248
            ]
        },
        "UpdateLibraryPayload": {
            "clientMutationId": [
                248
            ],
            "updateStatus": [
                135
            ],
            "__typename": [
                248
            ]
        },
        "UpdateMangaCategoriesInput": {
            "clientMutationId": [
                248
            ],
            "id": [
                127
            ],
            "patch": [
                299
            ],
            "__typename": [
                248
            ]
        },
        "UpdateMangaCategoriesPatchInput": {
            "addToCategories": [
                127
            ],
            "clearCategories": [
                7
            ],
            "removeFromCategories": [
                127
            ],
            "__typename": [
                248
            ]
        },
        "UpdateMangaCategoriesPayload": {
            "clientMutationId": [
                248
            ],
            "manga": [
                161
            ],
            "__typename": [
                248
            ]
        },
        "UpdateMangaInput": {
            "clientMutationId": [
                248
            ],
            "id": [
                127
            ],
            "patch": [
                302
            ],
            "__typename": [
                248
            ]
        },
        "UpdateMangaPatchInput": {
            "inLibrary": [
                7
            ],
            "__typename": [
                248
            ]
        },
        "UpdateMangaPayload": {
            "clientMutationId": [
                248
            ],
            "manga": [
                161
            ],
            "__typename": [
                248
            ]
        },
        "UpdateMangasCategoriesInput": {
            "clientMutationId": [
                248
            ],
            "ids": [
                127
            ],
            "patch": [
                299
            ],
            "__typename": [
                248
            ]
        },
        "UpdateMangasCategoriesPayload": {
            "clientMutationId": [
                248
            ],
            "mangas": [
                161
            ],
            "__typename": [
                248
            ]
        },
        "UpdateMangasInput": {
            "clientMutationId": [
                248
            ],
            "ids": [
                127
            ],
            "patch": [
                302
            ],
            "__typename": [
                248
            ]
        },
        "UpdateMangasPayload": {
            "clientMutationId": [
                248
            ],
            "mangas": [
                161
            ],
            "__typename": [
                248
            ]
        },
        "UpdateSourcePreferenceInput": {
            "change": [
                242
            ],
            "clientMutationId": [
                248
            ],
            "source": [
                149
            ],
            "__typename": [
                248
            ]
        },
        "UpdateSourcePreferencePayload": {
            "clientMutationId": [
                248
            ],
            "preferences": [
                178
            ],
            "source": [
                243
            ],
            "__typename": [
                248
            ]
        },
        "UpdateState": {},
        "UpdateStatus": {
            "completeJobs": [
                313
            ],
            "failedJobs": [
                313
            ],
            "isRunning": [
                7
            ],
            "pendingJobs": [
                313
            ],
            "runningJobs": [
                313
            ],
            "skippedCategories": [
                312
            ],
            "skippedJobs": [
                313
            ],
            "updatingCategories": [
                312
            ],
            "__typename": [
                248
            ]
        },
        "UpdateStatusCategoryType": {
            "categories": [
                15
            ],
            "__typename": [
                248
            ]
        },
        "UpdateStatusType": {
            "mangas": [
                156
            ],
            "__typename": [
                248
            ]
        },
        "UpdateStopInput": {
            "clientMutationId": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "UpdateStopPayload": {
            "clientMutationId": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "UpdateStrategy": {},
        "UpdateTrackInput": {
            "clientMutationId": [
                248
            ],
            "finishDate": [
                149
            ],
            "lastChapterRead": [
                118
            ],
            "private": [
                7
            ],
            "recordId": [
                127
            ],
            "scoreString": [
                248
            ],
            "startDate": [
                149
            ],
            "status": [
                127
            ],
            "__typename": [
                248
            ]
        },
        "UpdateTrackPayload": {
            "clientMutationId": [
                248
            ],
            "trackRecord": [
                262
            ],
            "__typename": [
                248
            ]
        },
        "UpdaterJobsInfoType": {
            "finishedJobs": [
                127
            ],
            "isRunning": [
                7
            ],
            "skippedCategoriesCount": [
                127
            ],
            "skippedMangasCount": [
                127
            ],
            "totalJobs": [
                127
            ],
            "__typename": [
                248
            ]
        },
        "UpdaterUpdates": {
            "categoryUpdates": [
                19
            ],
            "initial": [
                135
            ],
            "jobsInfo": [
                319
            ],
            "mangaUpdates": [
                162
            ],
            "omittedUpdates": [
                7
            ],
            "__typename": [
                248
            ]
        },
        "Upload": {},
        "ValidateBackupInput": {
            "backup": [
                321
            ],
            "__typename": [
                248
            ]
        },
        "ValidateBackupResult": {
            "missingSources": [
                324
            ],
            "missingTrackers": [
                325
            ],
            "__typename": [
                248
            ]
        },
        "ValidateBackupSource": {
            "id": [
                149
            ],
            "name": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "ValidateBackupTracker": {
            "name": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "WebUIChannel": {},
        "WebUIFlavor": {},
        "WebUIInterface": {},
        "WebUIUpdateCheck": {
            "channel": [
                326
            ],
            "tag": [
                248
            ],
            "updateAvailable": [
                7
            ],
            "__typename": [
                248
            ]
        },
        "WebUIUpdateInfo": {
            "channel": [
                326
            ],
            "tag": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "WebUIUpdateInput": {
            "clientMutationId": [
                248
            ],
            "__typename": [
                248
            ]
        },
        "WebUIUpdatePayload": {
            "clientMutationId": [
                248
            ],
            "updateStatus": [
                333
            ],
            "__typename": [
                248
            ]
        },
        "WebUIUpdateStatus": {
            "info": [
                330
            ],
            "progress": [
                127
            ],
            "state": [
                310
            ],
            "__typename": [
                248
            ]
        }
    }
}