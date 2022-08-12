import React from 'react';
import { useState } from "react";
import {commands} from "@configs/commands";
import {ExportToUrl} from "@components/ExportToUrl";
import {GeneralSettings} from "@components/GeneralSettings";
import {createRoot} from "react-dom/client";
import {FigmaPluginEvent} from "../../types/figmaPluginMessage";
import {PluginCommands} from "../../types/pluginCommands";

const PluginUI = () => {
    const [ figmaSettings, setFigmaSettings ] = useState(null);
    const [ activePage, setActivePage ] = useState(null);

    const onmessage = (event: FigmaPluginEvent) => {
        const { command, payload } = event.data.figmaPluginMessage || {} as { command: PluginCommands, payload: any };
        if([commands.exportToUrl, commands.generalSettings].includes(command)) {
            setFigmaSettings({
                ...payload.settings,
                fileName: payload.settings.fileName || payload.metadata.fileName
            });
            setActivePage(command);
        }
    };

    // @ts-ignore
    return (
        <div>
            <p>This is something</p>
            <main>
                { activePage === commands.generalSettings && <GeneralSettings /> };
                { activePage === commands.exportToUrl && <ExportToUrl /> };
            </main>
        </div>
    )

};

const root = createRoot(document.getElementById('pluginUI'));
root.render(<PluginUI />)