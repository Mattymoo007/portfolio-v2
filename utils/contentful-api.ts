import { ContentfulClientApi, createClient } from "contentful"

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN

const clientConfig: IContentfulClientConfig = {
  space: space,
  accessToken: accessToken,
}

const client: ContentfulClientApi = createClient(clientConfig)

export const contentful = {
  asset: (id: string, query?: IContentfulGetAssetQuery) => {
    return client.getAsset(id, query)
  },
  assets: (query?: IContentGetAssetsQuery) => {
    return client.getAssets(query)
  },
  contentType: (id: string) => {
    return client.getContentType(id)
  },
  contentTypes: (query?: Partial<IContentfulSearchQuery>) => {
    return client.getContentTypes(query)
  },
  entry: async <T = any>(
    id: string,
    query: Partial<IContentfulBaseQuery> = {}
  ) => {
    return client.getEntry<T>(id, {
      ...query,
    })
  },
  entries: async <T = any>(query: Partial<IContentfulGetEntriesQuery> = {}) => {
    return client.getEntries<T>({
      ...query,
    })
  },
  space: () => {
    return client.getSpace()
  },
  locales: () => {
    return client.getLocales()
  },
  parseEntries: (raw: any) => {
    return client.parseEntries(raw)
  },
  sync: (query: Partial<IContentfulSyncQuery> = {}) => {
    return client.sync(query)
  },
}
