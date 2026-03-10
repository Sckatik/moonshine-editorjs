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

const editorsMap = new WeakMap();

function createEditor(textarea, container) {
    if (editorsMap.has(textarea)) {
        return editorsMap.get(textarea);
    }

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
        .then(() => console.log(`Editor.js is ready to work!`))
        .catch((reason) => console.log(`Editor.js initialization failed because of ${reason}`));

    editorsMap.set(textarea, editor);

    if (textarea.id) {
        window.editors[textarea.id] = editor;
    }

    return editor;
}

function initEditorFromTextarea(textarea) {
    if (editorsMap.has(textarea)) {
        return;
    }

    const container = textarea.parentElement?.querySelector('.editorjs-container');
    if (container) {
        createEditor(textarea, container);
    }
}

function initAllEditors() {
    document.querySelectorAll('[data-type="editor-js"]').forEach(initEditorFromTextarea);
}

document.addEventListener('DOMContentLoaded', initAllEditors);

document.addEventListener('alpine:init', initAllEditors);

document.addEventListener('layouts:block-added', () => {
    initAllEditors();
});
