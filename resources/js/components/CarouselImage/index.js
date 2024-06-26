// eslint-disable-next-line require-jsdoc
import Uploader from './uploader';

//vitePluginRequire('./index.css');
//.toString();
// eslint-disable-next-line require-jsdoc
export default class SimpleCarousel {
    /**
     * @param {CarousellData} data - previously saved data
     * @param {CarouselConfig} config - user config for Tool
     * @param {object} api - Editor.js API
     */
    constructor({data, config, api}) {
        this.api = api;
        this.data = data;
        this.IconClose = '<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '<path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" fill="#0F0F0F"/>\n' +
            '</svg>';
        this.IconLeft = '<svg class="icon " viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M351,9a15,15 0 01 19,0l29,29a15,15 0 01 0,19l-199,199l199,199a15,15 0 01 0,19l-29,29a15,15 0 01-19,0l-236-235a16,16 0 01 0-24z" /></svg>';
        this.IconRight = '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M312,256l-199-199a15,15 0 01 0-19l29-29a15,15 0 01 19,0l236,235a16,16 0 01 0,24l-236,235a15,15 0 01-19,0l-29-29a15,15 0 01 0-19z" /></svg>';
        this.config = {
            endpoints: config.endpoints || '',
            additionalRequestData: config.additionalRequestData || {},
            additionalRequestHeaders: config.additionalRequestHeaders || {},
            field: config.field || 'image',
            types: config.types || 'image/*',
            captionPlaceholder: this.api.i18n.t('Caption'),
            buttonContent: config.buttonContent || '',
            uploader: config.uploader || undefined
        };
        /**
         * Module for file uploading
         */
        this.uploader = new Uploader({
            config: this.config,
            onUpload: (response) => this.onUpload(response),
            onError: (error) => this.uploadingFailed(error)
        });
    }

    /**
     * CSS classes
     * @constructor
     */
    get CSS() {
        return {
            baseClass: this.api.styles.block,
            loading: this.api.styles.loader,
            input: this.api.styles.input,
            button: this.api.styles.button,

            /**
             * Tool's classes
             */
            wrapper: 'cdxcarousel-wrapper',
            addButton: 'cdxcarousel-addImage',
            block: 'cdxcarousel-block',
            item: 'cdxcarousel-item',
            removeBtn: 'cdxcarousel-removeBtn',
            leftBtn: 'cdxcarousel-leftBtn',
            rightBtn: 'cdxcarousel-rightBtn',
            inputUrl: 'cdxcarousel-inputUrl',
            caption: 'cdxcarousel-caption',
            list: 'cdxcarousel-list',
            imagePreloader: 'image-tool__image-preloader'
        };
    };

    /**
     * Get Tool toolbox settings
     * icon - Tool icon's SVG
     * title - title to show in toolbox
     *
     * @return {{icon: string, title: string}}
     */
    static get toolbox() {
        return {
            title: 'Carousel',
            icon: '<svg width="38" height="18" viewBox="0 0 38 18" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="10" y="0" width="18" height="18"><path fill-rule="evenodd" clip-rule="evenodd" d="M28 16V2C28 0.9 27.1 0 26 0H12C10.9 0 10 0.9 10 2V16C10 17.1 10.9 18 12 18H26C27.1 18 28 17.1 28 16V16ZM15.5 10.5L18 13.51L21.5 9L26 15H12L15.5 10.5V10.5Z"  /></mask><g mask="url(#mask0)"><rect x="10" width="18" height="18"  /></g><mask id="mask1" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="3" width="7" height="12"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 13.59L2.67341 9L7 4.41L5.66802 3L0 9L5.66802 15L7 13.59Z" fill="white"/></mask><g mask="url(#mask1)"><rect y="3" width="7.55735" height="12"  /></g><mask id="mask2" mask-type="alpha" maskUnits="userSpaceOnUse" x="31" y="3" width="7" height="12"><path fill-rule="evenodd" clip-rule="evenodd" d="M31 13.59L35.3266 9L31 4.41L32.332 3L38 9L32.332 15L31 13.59Z" fill="white"/></mask><g mask="url(#mask2)"><rect x="30.4426" y="2.25" width="7.55735" height="13" /></g></svg>'
        };
    }

    /**
     * Renders Block content
     * @public
     *
     * @return {HTMLDivElement}
     */
    render() {
        /*
         * Structure
         * <wrapper>
         *  <list>
         *    <item/>
         *    ...
         *  </list>
         *  <addButton>
         * </wrapper>
         */
        // Создаем базу для начала
        this.wrapper = make('div', [this.CSS.wrapper]);
        this.list = make('div', [this.CSS.list]);
        this.addButton = this.createAddButton();

        this.list.appendChild(this.addButton);
        this.wrapper.appendChild(this.list);
        if (this.data.length > 0) {
            console.log('load_item render', this.data);
            for (const load of this.data) {
                const loadItem = this.creteNewItem(load.url, load.caption);

                this.list.insertBefore(loadItem, this.addButton);
            }
        }
        return this.wrapper;
    }

    // eslint-disable-next-line require-jsdoc
    save(blockContent) {
        const list = blockContent.getElementsByClassName(this.CSS.item);
        const data = [];

        if (list.length > 0) {
            for (const item of list) {
                if (item.firstChild.value) {
                    data.push({
                        url: item.firstChild.value,
                        caption: item.lastChild.value
                    });
                }
            }
        }
        return data;
    }

    /**
     * Create Image block
     * @public
     *
     * @param {string} url - url of saved or upload image
     * @param {string} caption - caption of image
     *
     * Structure
     * <item>
     *  <url/>
     *  <removeButton/>
     *  <img/>
     *  <caption>
     * </item>
     *
     * @return {HTMLDivElement}
     */
    creteNewItem(url, caption) {
        // Create item, remove button and field for image url
        const block = make('div', [this.CSS.block]);
        const item = make('div', [this.CSS.item]);
        const removeBtn = make('div', [this.CSS.removeBtn]);
        const leftBtn = make('div', [this.CSS.leftBtn]);
        const rightBtn = make('div', [this.CSS.rightBtn]);
        const imageUrl = make('input', [this.CSS.inputUrl]);
        const imagePreloader = make('div', [this.CSS.imagePreloader]);

        imageUrl.value = url;
        leftBtn.innerHTML = this.IconLeft;
        leftBtn.style = 'padding: 8px;';
        leftBtn.addEventListener('click', () => {
            var index = Array.from(block.parentNode.children).indexOf(block);

            if (index != 0) {
                block.parentNode.insertBefore(block, block.parentNode.children[index - 1]);
            }
        });
        rightBtn.innerHTML = this.IconRight;
        rightBtn.style = 'padding: 8px;';
        rightBtn.addEventListener('click', () => {
            var index = Array.from(block.parentNode.children).indexOf(block);

            if (index != block.parentNode.children.length - 2) {
                block.parentNode.insertBefore(block, block.parentNode.children[index + 2]);
            }
        });
        removeBtn.innerHTML = this.IconClose;
        removeBtn.addEventListener('click', () => {
            block.remove();
        });
        removeBtn.style.display = 'none';

        item.appendChild(imageUrl);
        item.appendChild(removeBtn);
        item.appendChild(leftBtn);
        item.appendChild(rightBtn);
        block.appendChild(item);
        /*
         * If data already yet
         * We create Image view
         */
        if (url) {
            this._createImage(url, item, caption, removeBtn);
        } else {
            item.appendChild(imagePreloader);
        }
        return block;
    }

    /**
     * Create Image View
     * @public
     *
     * @param {string} url - url of saved or upload image
     * @param {HTMLDivElement} item - block of created image
     * @param {string} captionText - caption of image
     * @param {HTMLDivElement} removeBtn - button for remove image block
     *
     * @return {HTMLDivElement}
     */
    _createImage(url, item, captionText, removeBtn) {
        const image = document.createElement('img');
        const caption = make('input', [this.CSS.caption, this.CSS.input]);

        image.src = url;
        if (captionText) {
            caption.value = captionText;
        }
        caption.placeholder = this.config.captionPlaceholder;

        removeBtn.style.display = 'flex';

        item.appendChild(image);
        item.appendChild(caption);
    }

    /**
     * File uploading callback
     * @private
     *
     * @param {Response} response
     */
    onUpload(response) {
        if (response.success && response.file) {
            // Берем последний созданный элемент и ставим изображение с сервера
            console.log(this.list);
            console.log(this.list.childNodes.length);
            console.log(this.list.childNodes.length - 1);
            this._createImage(response.file.url, this.list.childNodes[this.list.childNodes.length - 2].firstChild, '', this.list.childNodes[this.list.childNodes.length - 2].firstChild.childNodes[1]);
            this.list.childNodes[this.list.childNodes.length - 2].firstChild.childNodes[2].style.backgroundImage = '';
            this.list.childNodes[this.list.childNodes.length - 2].firstChild.firstChild.value = response.file.url;
            this.list.childNodes[this.list.childNodes.length - 2].firstChild.classList.add('cdxcarousel-item--empty');
        } else {
            this.uploadingFailed('incorrect response: ' + JSON.stringify(response));
        }
    }

    /**
     * Handle uploader errors
     * @private
     *
     * @param {string} errorText
     */
    uploadingFailed(errorText) {
        console.log('Gallery : uploading failed because of', errorText);

        this.api.notifier.show({
            message: this.api.i18n.t('Can not upload an image, try another'),
            style: 'error'
        });
    }

    /**
     * Shows uploading preloader
     * @param {string} src - preview source
     */
    showPreloader(src) {
        this.nodes.imagePreloader.style.backgroundImage = `url(${src})`;
    }

    // eslint-disable-next-line require-jsdoc
    onSelectFile() {
        // Создаем элемент
        this.uploader.uploadSelectedFile({
            onPreview: (src) => {
                const newItem = this.creteNewItem('', '');

                newItem.firstChild.lastChild.style.backgroundImage = `url(${src})`;
                console.log('preload', newItem.firstChild.lastChild);
                this.list.insertBefore(newItem, this.addButton);
                console.log(src);
            }
        });
    }

    /**
     * Create add button
     * @private
     */
    createAddButton() {
        const addButton = make('div', [this.CSS.button, this.CSS.addButton]);
        const block = make('div', [this.CSS.block]);

        addButton.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">\n' +
            '    <path d="M3.15 13.628A7.749 7.749 0 0 0 10 17.75a7.74 7.74 0 0 0 6.305-3.242l-2.387-2.127-2.765 2.244-4.389-4.496-3.614 3.5zm-.787-2.303l4.446-4.371 4.52 4.63 2.534-2.057 3.533 2.797c.23-.734.354-1.514.354-2.324a7.75 7.75 0 1 0-15.387 1.325zM10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10z"/>\n' +
            '</svg>  Добавить картинку';
        //`${buttonIcon}`;
        addButton.addEventListener('click', () => {
            this.onSelectFile();
        });
        block.appendChild(addButton);

        return block;
    }
}

/**
 * Helper for making Elements with attributes
 *
 * @param  {string} tagName           - new Element tag name
 * @param  {array|string} classNames  - list or name of CSS class
 * @param  {Object} attributes        - any attributes
 * @return {Element}
 */
export const make = function make(tagName, classNames = null, attributes = {}) {
    const el = document.createElement(tagName);

    if (Array.isArray(classNames)) {
        el.classList.add(...classNames);
    } else if (classNames) {
        el.classList.add(classNames);
    }

    for (const attrName in attributes) {
        el[attrName] = attributes[attrName];
    }

    return el;
};
