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
import ParagraphCustom from './components/paragraphCustom.js';

export default class EditorConfigTools {

    static get getTools() {
        const tools = {}
        if (editorJsConf.paragraph.activated) {
            tools.paragraph = {
                class: ParagraphCustom,
                shortcut: editorJsConf.paragraph.shortcut
            };
        }
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
                class: CustomImage,
                config: {
                    endpoints: {
                        byFile: '/admin/editor-js-field/upload/file',
                        byUrl: '/admin/editor-js-field/upload/url'
                    },
                    additionalRequestHeaders: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content
                    }
                },
                shortcut: editorJsConf.image.shortcut
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
                    endpoint: '/admin/editor-js-field/fetch/url',
                    additionalRequestHeaders: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content
                    }
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
       //adding custom tool
        if (editorJsConf.custom) {
            Object.keys(editorJsConf.custom).forEach(function(key) {
                tools[key] = editorJsConf.custom[key];
            });
        }

        return tools;
    }

}
