export default class BlockText {
    constructor({data, api}) {
        this.data = data;
        this.api = api;
    }

    static get toolbox() {
        return {
            title: 'Текстовый блок',
            icon: '<svg viewBox="0 0 470 470" xmlns="http://www.w3.org/2000/svg"><g id="Layer_2" data-name="Layer 2"><g id="block_quote"><path d="m235 470c-129.79 0-235-105.21-235-235 0-129.79 105.21-235 235-235 129.79 0 235 105.21 235 235 0 129.79-105.21 235-235 235zm0-452.26c-120 0-217.26 97.26-217.26 217.26 0 120 97.26 217.26 217.26 217.26 120 0 217.26-97.26 217.26-217.26 0-120-97.26-217.26-217.26-217.26z"></path><g id="icon"><rect height="36.99" rx="18.49" transform="matrix(-1 0 0 -1 558.24 395.48)" width="171.76" x="193.24" y="179.25"></rect><rect height="36.99" rx="18.49" transform="matrix(-1 0 0 -1 558.24 543.79)" width="171.76" x="193.24" y="253.4"></rect><rect height="36.99" rx="18.49" transform="matrix(-1 0 0 -1 558.24 692.1)" width="171.76" x="193.24" y="327.56"></rect><rect height="36.99" rx="18.49" transform="matrix(0 -1 1 0 -149.16 396.15)" width="171.76" x="37.61" y="254.16"></rect><rect height="36.99" rx="18.49" transform="matrix(-1 0 0 -1 470 247.17)" width="260" x="105" y="105.09"></rect></g></g></g></svg>'
        };
    }

    render() {
        const container = document.createElement('div');
        container.innerHTML = '<p class="p-2"><b>Текстовый блок</b></p>';
        const input = document.createElement('input');
        input.classList.add('cdx-input');
        input.placeholder = 'Название блока';
        input.setAttribute('type', 'text');
        input.setAttribute('name', 'name');

        const content = document.createElement('textarea');
        content.classList.add('cdx-input');
        content.placeholder = 'Контент';
        // content.setAttribute('type', 'text');
        content.setAttribute('name', 'content');
        //input.value = this.data && this.data.name ? this.data.name : '';
        //<div class="ce-paragraph cdx-block" contenteditable="true" data-placeholder=""></div>
        container.appendChild(input);
        container.appendChild(content);
        // container.innerHTML = '<div class="ce-paragraph cdx-block" contenteditable="true" data-placeholder=""></div>';
        return container;
    }

    save(blockContent) {
        console.log(blockContent)
        return {
            name: blockContent.childNodes[1].value
        }
    }
}
