export type PluginSettings = {
    fileName: string,
    extension: string,
    serverUrl?: string,
    accessToken?: string,
    acceptHeaders?: string,
    contentType?: string,
    authType: string,
    reference: string,
    readonly?: boolean,
    exports: {
        color: boolean
    }
}