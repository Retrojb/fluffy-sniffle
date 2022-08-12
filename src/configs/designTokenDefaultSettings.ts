import {PluginSettings} from "../../types/pluginSettings";

export const designTokenDefaultSettings: PluginSettings = {
    fileName: 'Figma Design Tokens',
    extension: '.json',
    serverUrl: '',
    accessToken: undefined,
    acceptHeaders: 'application/json',
    contentType: 'text/plain;charset=UTF-8',
    authType: 'Bearer',
    reference: 'main',
    readonly: false,
    exports: {
        color: true
    }
}