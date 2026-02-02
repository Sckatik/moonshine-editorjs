import Image from "@editorjs/image"

// extend the image tool to enhance the image removal lifecycle
export default class CustomImage extends Image {
    removed() {
        console.log('removed');
        // access the image block's file data
        const {file} = this._data
        axios.post(
            '/admin/editor-js-field/delete/file',
            {
                _method: 'delete',
                urlFile: file.url
            },
            {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content,
            }
        ).then((response) => console.log(response))
            .catch((error) => console.log(error));
    }
}
