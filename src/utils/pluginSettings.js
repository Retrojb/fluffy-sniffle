import pluginConfig from "../configs/pluginConfig";
import { designTokenDefaultSettings } from "../configs/designTokenDefaultSettings";
const getPluginSettings = () => {
    const cachedPluginSettings = figma.root.getPluginData(pluginConfig.key.settings);
    if (cachedPluginSettings === '') {
        return designTokenDefaultSettings;
    }
};
const cachePluginSettings = (designTokenSettings) => {
    let pluginSettings = Object.assign(Object.assign({}, designTokenDefaultSettings), designTokenSettings);
    figma.root.setPluginData(pluginConfig.key.settings, JSON.stringify(pluginSettings));
};
const resetPluginSettings = () => {
    // TODO: Investigate this
    figma.root.setPluginData(pluginConfig.key.settings, JSON.stringify(designTokenDefaultSettings));
};
const getFigmaFileId = (figma) => {
    let figmaFileId = figma.root.getPluginData(pluginConfig.key.figmaFileId);
    if (figmaFileId === undefined || figmaFileId === '') {
        figma.root.setPluginData(pluginConfig.key.figmaFileId, `${figma.root.name} ${Math.floor(Math.random() * 10000)}`);
        figmaFileId = figma.root.getPluginData(pluginConfig.key.figmaFileId);
    }
    return figmaFileId;
};
export { getPluginSettings, cachePluginSettings, resetPluginSettings, getFigmaFileId };
