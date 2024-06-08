export default class VkIframe {

    constructor({data}) {
        this.data = data;
    }

    static get toolbox() {
        return {
            title: 'VK Video',
            icon: '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 112.196 112.196" style="enable-background:new 0 0 112.196 112.196;" xml:space="preserve"><g><g><circle id="XMLID_11_" style="fill:#4D76A1;" cx="56.098" cy="56.098" r="56.098"/></g><path style="fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;" d="M53.979,80.702h4.403c0,0,1.33-0.146,2.009-0.878 c0.625-0.672,0.605-1.934,0.605-1.934s-0.086-5.908,2.656-6.778c2.703-0.857,6.174,5.71,9.853,8.235 c2.782,1.911,4.896,1.492,4.896,1.492l9.837-0.137c0,0,5.146-0.317,2.706-4.363c-0.2-0.331-1.421-2.993-7.314-8.463 c-6.168-5.725-5.342-4.799,2.088-14.702c4.525-6.031,6.334-9.713,5.769-11.29c-0.539-1.502-3.867-1.105-3.867-1.105l-11.076,0.069 c0,0-0.821-0.112-1.43,0.252c-0.595,0.357-0.978,1.189-0.978,1.189s-1.753,4.667-4.091,8.636c-4.932,8.375-6.904,8.817-7.71,8.297 c-1.875-1.212-1.407-4.869-1.407-7.467c0-8.116,1.231-11.5-2.397-12.376c-1.204-0.291-2.09-0.483-5.169-0.514 c-3.952-0.041-7.297,0.012-9.191,0.94c-1.26,0.617-2.232,1.992-1.64,2.071c0.732,0.098,2.39,0.447,3.269,1.644 c1.135,1.544,1.095,5.012,1.095,5.012s0.652,9.554-1.523,10.741c-1.493,0.814-3.541-0.848-7.938-8.446 c-2.253-3.892-3.954-8.194-3.954-8.194s-0.328-0.804-0.913-1.234c-0.71-0.521-1.702-0.687-1.702-0.687l-10.525,0.069 c0,0-1.58,0.044-2.16,0.731c-0.516,0.611-0.041,1.875-0.041,1.875s8.24,19.278,17.57,28.993 C44.264,81.287,53.979,80.702,53.979,80.702L53.979,80.702z"/></g></svg>'
        };
    }

    render() {


        const container = document.createElement('div');
        container.innerHTML = '<p class="p-2"><b>VK видео - IFRAME</b></p>';
        const input = document.createElement('textarea');
        input.classList.add('cdx-input');
        input.placeholder = 'iframe vk';
        input.value = this.data && this.data.url ? this.data.url : '';
        container.appendChild(input);
        const iframeBlock = document.createElement('div');

        if (input.value) {
            this.getIframe(input.value, iframeBlock);
        }
        input.addEventListener('change', (event) => {
            this.getIframe(event.target.value, iframeBlock);
        });
        container.appendChild(iframeBlock);
        return container;
    }


    getIframe(value, iframeBlock) {
        const result = value.split(' ');
        let url = '';
        if (result[1] !== undefined) {
            url = result[1].replace('src="', '').replace('"', '');
        }
        iframeBlock.innerHTML = ""
        if (url) {
            const iframe = document.createElement("iframe");
            iframe.setAttribute("src", url);
            iframe.style.width = "100%";
            iframe.style.height = "480px";
            iframeBlock.appendChild(iframe);
        }
    }

    save(blockContent) {
        console.log(blockContent)
        return {
            url: blockContent.childNodes[1].value
        }
    }
}