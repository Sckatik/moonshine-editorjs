/**
 * Public extension point of the MoonShine Editor.js field.
 *
 * External packages register additional Editor.js tools BEFORE the field
 * initializes (deferred scripts run before the DOMContentLoaded handler):
 *
 *   window.MoonShineEditorJs.registerTool('myTool', {
 *       class: MyTool,
 *       config: { ... },
 *       shortcut: 'CMD+ALT+M',
 *   });
 */
window.MoonShineEditorJs = window.MoonShineEditorJs || {
    /** @type {Object<string, Object>} registered tool definitions keyed by name */
    tools: {},

    /** Set by field.js once an editor instance is ready — registrations after that are ignored */
    _editorReady: false,

    /**
     * Register an Editor.js tool definition.
     *
     * @param {string} name
     * @param {Object} definition — editor.js tool config: { class, config?, shortcut?, inlineToolbar?, tunes? }
     */
    registerTool(name, definition) {
        if (this._editorReady) {
            console.warn('[editorjs] late tool registration ignored: ' + name);

            return;
        }

        this.tools[name] = definition;
    },
};
