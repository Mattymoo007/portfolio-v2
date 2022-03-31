import {
  ContentfulClientApi,
  createClient,
  CreateClientParams,
} from "contentful"

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || ""
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || ""

const clientConfig: CreateClientParams = {
  space: space,
  accessToken: accessToken,
}

const client: ContentfulClientApi = createClient(clientConfig)

export const contentful = {
  asset: (id: string, query?: any) => {
    return client.getAsset(id, query)
  },
  assets: (query?: any) => {
    return client.getAssets(query)
  },
  contentType: (id: string) => {
    return client.getContentType(id)
  },
  contentTypes: (query?: any) => {
    return client.getContentTypes(query)
  },
  entry: async <T = any>(id: string, query: any = {}) => {
    return client.getEntry<T>(id, {
      ...query,
    })
  },
  entries: async <T = any>(query: any = {}) => {
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
  sync: (query: any = {}) => {
    return client.sync(query)
  },
}
