import Header from '@editorjs/header';
import List from "@editorjs/list";
import Checklist from '@editorjs/checklist';
import Delimiter from '@editorjs/delimiter';
import VkIframe from "./components/vkIframe.js";
import Youtube from "./components/youtube.js";
import Table from '@editorjs/table';
import CustomImage from './components/customImage.js';
import InlineCode from '@editorjs/inline-code';
import RawTool from '@editorjs/raw';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import LinkTool from '@editorjs/link';

export default class EditorConfigTools {

    static get getTools() {
        const tools = {}
        if (editorJsConf.header.activated) {
            tools.header = {
                class: Header,
                shortcut: editorJsConf.header.shortcut
            };
        }
        if (editorJsConf.list.activated) {
            tools.list = {
                class: List, inlineToolbar: editorJsConf.list.inlineToolbar, config: {
                    defaultStyle: 'unordered'
                }, shortcut: editorJsConf.list.shortcut
            }
        }
        if (editorJsConf.image.activated) {
            tools.image = {
                class: CustomImage, config: {
                    endpoints: {
                        byFile: '/moonshine/editor-js-field/upload/file',
                        byUrl: '/moonshine/editor-js-field/upload/url'
                    }
                }, shortcut: editorJsConf.image.shortcut
            }
        }
        if (editorJsConf.quote.activated) {
            tools.quote = {
                class: Quote, shortcut: editorJsConf.quote.shortcut
            };
        }
        if (editorJsConf.vkVideo.activated) {
            tools.vkVideo = {
                class: VkIframe, shortcut: editorJsConf.vkVideo.shortcut
            };
        }
        if (editorJsConf.youtube.activated) {
            tools.youtube = {
                class: Youtube, shortcut: editorJsConf.youtube.shortcut
            };
        }
        if (editorJsConf.delimiter.activated) {
            tools.delimiter = Delimiter;
        }
        if (editorJsConf.table.activated) {
            tools.table = {
                class: Table, inlineToolbar: editorJsConf.table.inlineToolbar
            }
        }
        if (editorJsConf.raw.activated) {
            tools.raw = RawTool;
        }
        if (editorJsConf.marker.activated) {
            tools.marker = {
                class: Marker, shortcut: editorJsConf.marker.shortcut
            };
        }
        if (editorJsConf.checklist.activated) {
            tools.checklist = {
                class: Checklist,
                inlineToolbar: editorJsConf.checklist.inlineToolbar,
                shortcut: editorJsConf.checklist.shortcut
            };
        }
        if (editorJsConf.link.activated) {
            tools.linkTool = {
                class: LinkTool,
                config: {
                    endpoint: '/moonshine/editor-js-field/fetch/url',
                },
                inlineToolbar: false,
                shortcut: editorJsConf.link.shortcut
            };
        }
        if (editorJsConf.inlineCode.activated) {
            tools.inlineCode = {
                class: InlineCode,
                inlineToolbar: false,
                shortcut: editorJsConf.inlineCode.shortcut
            };
        }


        return tools;
    }

}
