import EditorJS from '@editorjs/editorjs';
import EditorConfigTools from './editorConfigTools.js';

/**
 * Internationalzation config
 */
const i18nConfig = {
    /**
     * @type {I18nDictionary}
     */
    messages: {
        /**
         * Other below: translation of different UI components of the editor.js core
         */
        ui: {
            blockTunes: {
                toggler: {
                    'Click to tune': 'Нажмите, чтобы настроить',
                    'or drag to move': 'или перетащите',
                },
            },
            inlineToolbar: {
                converter: {
                    'Convert to': 'Конвертировать в',
                },
            },
            toolbar: {
                toolbox: {
                    Add: 'Добавить',
                },
            },
            labels: {
                list: {
                    Ordered: 'Нумерованный',
                    Unordered: 'Маркированный',
                },
            },
        },

        /**
         * Section for translation Tool Names: both block and inline tools
         */
        toolNames: {
            Text: 'Параграф',
            Heading: 'Заголовок',
            List: 'Список',
            Warning: 'Примечание',
            Checklist: 'Чеклист',
            Quote: 'Цитата',
            Code: 'Код',
            Delimiter: 'Разделитель',
            'Raw HTML': 'HTML-фрагмент',
            Table: 'Таблица',
            Link: 'Ссылка',
            Marker: 'Маркер',
            Bold: 'Полужирный',
            Italic: 'Курсив',
            InlineCode: 'Фрагмент кода (выделить)',
            Image: 'Картинка',
        },

        /**
         * Section for passing translations to the external tools classes
         */
        tools: {
            /**
             * Each subsection is the i18n dictionary that will be passed to the corresponded plugin
             * The name of a plugin should be equal the name you specify in the 'tool' section for that plugin
             */
            warning: {
                // <-- 'Warning' tool will accept this dictionary section
                Title: 'Название',
                Message: 'Сообщение',
            },

            /**
             * Link is the internal Inline Tool
             */
            link: {
                'Add a link': 'Вставьте ссылку',
            },
            /**
             * The "stub" is an internal block tool, used to fit blocks that does not have the corresponded plugin
             */
            stub: {
                'The block can not be displayed correctly.': 'Блок не может быть отображен',
            },
            list: {
                Ordered: 'Нумерованный',
                Unordered: 'Маркированный',
            },
        },

        /**
         * Section allows to translate Block Tunes
         */
        blockTunes: {
            /**
             * Each subsection is the i18n dictionary that will be passed to the corresponded Block Tune plugin
             * The name of a plugin should be equal the name you specify in the 'tunes' section for that plugin
             *
             * Also, there are few internal block tunes: "delete", "moveUp" and "moveDown"
             */
            delete: {
                Delete: 'Удалить',
            },
            moveUp: {
                'Move up': 'Переместить вверх',
            },
            moveDown: {
                'Move down': 'Переместить вниз',
            },
        },
    },
};

window.editors = window.editors || {};

function createEditor(textarea, container, editorId) {
    const data = JSON.parse(textarea.value || '{}');

    const editor = new EditorJS({
        holder: container,
        tools: EditorConfigTools.getTools,
        i18n: i18nConfig,
        data: data,
        onChange: async () => {
            const savedData = await editor.save();
            textarea.value = JSON.stringify(savedData);
        },
    });

    editor.isReady
        .then(() => console.log(`Editor.js (${editorId}) is ready to work!`))
        .catch((reason) => console.log(`Editor.js (${editorId}) initialization failed because of ${reason}`));

    window.editors[editorId] = editor;
    return editor;
}

function initEditorFromTextarea(textarea) {
    const editorId = textarea.id;
    if (window.editors[editorId]) return;

    const container = textarea.parentElement?.querySelector('.editorjs-container');
    if (container) {
        createEditor(textarea, container, editorId);
    }
}

function initAllEditors() {
    document.querySelectorAll('[data-type="editor-js"]').forEach(initEditorFromTextarea);
}

window.addEventListener('DOMContentLoaded', initAllEditors);
document.addEventListener('alpine:init', initAllEditors);

/**
 * MutationObserver отслеживает добавление новых DOM-элементов.
 * Нужен для автоматической инициализации EditorJS при динамическом
 * добавлении блоков через пакет moonshine/layouts-field.
 */
const editorObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
            if (node.nodeType !== Node.ELEMENT_NODE) return;

            const textareas = node.matches('[data-type="editor-js"]') ? [node] : [...node.querySelectorAll('[data-type="editor-js"]')];

            textareas.forEach(initEditorFromTextarea);
        });
    });
});

editorObserver.observe(document.body, { childList: true, subtree: true });
