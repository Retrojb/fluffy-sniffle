
// Initiate UI

import {commands} from "./configs/commands";
import {PluginCommands} from "../types/pluginCommands";
import {PluginSettings} from "../types/pluginSettings";
import {cachePluginSettings, getFigmaFileId, getPluginSettings, resetPluginSettings} from "./utils/pluginSettings";
import pluginConfig from "./configs/pluginConfig";
import {getAccessToken, setAccessToken} from "./utils/accessToken";
import {FigmaPluginMessage} from "../types/figmaPluginMessage";

figma.showUI(__html__, {
    themeColors: true,
    visible: false
});

// Open UI
if([commands.exportToUrl, commands.generalSettings].includes(figma.command as PluginCommands)) {

    const openUI = async () => {
        const pluginSettings: PluginSettings = getPluginSettings();

        figma.ui.resize(pluginConfig.ui[figma.command].width, pluginConfig.ui[figma.command].height);
        // Sets the Figma Settings
        figma.ui.postMessage({
            command: figma.command as PluginCommands,
            payload: {
                pluginSettings: {
                    ...pluginSettings,
                    ...{ accessToken: await getAccessToken(getFigmaFileId(figma)) }
                },
                data: 'FIGURE THIS OUT',
                metadata: {
                    figmaFileName: figma.root.name
                }
            }
        } || {} as FigmaPluginMessage)

        figma.ui.show();
    }
    // noinspection JSIgnoredPromiseFromCall
    openUI();
}

if(figma.command === commands.reset) {
    resetPluginSettings();
    figma.notify('Plugin Settings have been reset');
    figma.closePlugin();
}

figma.ui.onmessage = async (msg: FigmaPluginMessage) => {
    const { command, payload } = msg;
    if (command === commands.closePlugin) {
        if (payload?.notification !== undefined && payload?.notification !== '') {
            figma.notify(payload.notification);
        }
        figma.ui.hide();
        figma.closePlugin();
    }

    if (command === commands.saveSettings) {
        cachePluginSettings(payload.settings);
        await setAccessToken(getFigmaFileId(figma), payload.accessToken);
        if (payload.closePlugin && payload.closePlugin === true) {
            figma.closePlugin();
        }
    }
}

// Close UI