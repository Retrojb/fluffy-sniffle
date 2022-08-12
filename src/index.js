// Initiate UI
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { commands } from "./configs/commands";
import { cachePluginSettings, getFigmaFileId, getPluginSettings, resetPluginSettings } from "./utils/pluginSettings";
import pluginConfig from "./configs/pluginConfig";
import { getAccessToken, setAccessToken } from "./utils/accessToken";
figma.showUI(__html__, {
    themeColors: true,
    visible: false
});
// Open UI
if ([commands.exportToUrl, commands.generalSettings].includes(figma.command)) {
    const openUI = () => __awaiter(void 0, void 0, void 0, function* () {
        const pluginSettings = getPluginSettings();
        figma.ui.resize(pluginConfig.ui[figma.command].width, pluginConfig.ui[figma.command].height);
        // Sets the Figma Settings
        figma.ui.postMessage({
            command: figma.command,
            payload: {
                pluginSettings: Object.assign(Object.assign({}, pluginSettings), { accessToken: yield getAccessToken(getFigmaFileId(figma)) }),
                data: 'FIGURE THIS OUT',
                metadata: {
                    figmaFileName: figma.root.name
                }
            }
        } || {});
        figma.ui.show();
    });
    // noinspection JSIgnoredPromiseFromCall
    openUI();
}
if (figma.command === commands.reset) {
    resetPluginSettings();
    figma.notify('Plugin Settings have been reset');
    figma.closePlugin();
}
figma.ui.onmessage = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    const { command, payload } = msg;
    if (command === commands.closePlugin) {
        if ((payload === null || payload === void 0 ? void 0 : payload.notification) !== undefined && (payload === null || payload === void 0 ? void 0 : payload.notification) !== '') {
            figma.notify(payload.notification);
        }
        figma.ui.hide();
        figma.closePlugin();
    }
    if (command === commands.saveSettings) {
        cachePluginSettings(payload.settings);
        yield setAccessToken(getFigmaFileId(figma), payload.accessToken);
        if (payload.closePlugin && payload.closePlugin === true) {
            figma.closePlugin();
        }
    }
});
// Close UI
