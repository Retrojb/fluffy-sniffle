import {PluginCommands} from "./pluginCommands";

export type FigmaPluginMessage = {
    command: PluginCommands
    payload?: any
};

export type FigmaPluginEvent = {
    data: {
        figmaPluginMessage: FigmaPluginMessage
    }
}