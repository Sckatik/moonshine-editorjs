import Paragraph from '@editorjs/paragraph';

export default class ParagraphCustom extends Paragraph {
    static get pasteConfig() {
        return {
            tags: ['P', 'BR']
        };
    }
}
