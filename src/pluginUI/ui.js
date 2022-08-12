import React from 'react';
import { useState } from "react";
import { commands } from "@configs/commands";
import { ExportToUrl } from "@components/ExportToUrl";
import { GeneralSettings } from "@components/GeneralSettings";
import { createRoot } from "react-dom/client";
const PluginUI = () => {
    const [figmaSettings, setFigmaSettings] = useState(null);
    const [activePage, setActivePage] = useState(null);
    const onmessage = (event) => {
        const { command, payload } = event.data.figmaPluginMessage || {};
        if ([commands.exportToUrl, commands.generalSettings].includes(command)) {
            setFigmaSettings(Object.assign(Object.assign({}, payload.settings), { fileName: payload.settings.fileName || payload.metadata.fileName }));
            setActivePage(command);
        }
    };
    // @ts-ignore
    return (React.createElement("div", null,
        React.createElement("p", null, "This is something"),
        React.createElement("main", null,
            activePage === commands.generalSettings && React.createElement(GeneralSettings, null),
            ";",
            activePage === commands.exportToUrl && React.createElement(ExportToUrl, null),
            ";")));
};
const root = createRoot(document.getElementById('pluginUI'));
root.render(React.createElement(PluginUI, null));
