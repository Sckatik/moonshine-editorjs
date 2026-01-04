<style>
    .cdx-checklist {
        gap: 6px;
        display: flex;
        flex-direction: column
    }

    .cdx-checklist__item {
        display: flex;
        box-sizing: content-box;
        align-items: flex-start
    }

    .cdx-checklist__item-text {
        outline: none;
        flex-grow: 1;
        line-height: 1.57em
    }

    .cdx-checklist__item-checkbox {
        width: 22px;
        height: 22px;
        display: flex;
        align-items: center;
        margin-right: 8px;
        margin-top: calc(.785em - 11px);
    }

    .cdx-checklist__item-checkbox svg {
        opacity: 0;
        height: 20px;
        width: 20px;
        position: absolute;
        left: -1px;
        top: -1px;
        max-height: 20px
    }

    .cdx-checklist__item-checkbox-check {
        display: inline-block;
        flex-shrink: 0;
        position: relative;
        width: 20px;
        height: 20px;
        box-sizing: border-box;
        margin-left: 0;
        border-radius: 5px;
        border: 1px solid #C9C9C9;
        background: #fff
    }

    .cdx-checklist__item-checkbox-check:before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border-radius: 100%;
        background-color: #369fff;
        visibility: hidden;
        pointer-events: none;
        transform: scale(1);
        transition: transform .4s ease-out, opacity .4s
    }

    .cdx-checklist__item--checked .cdx-checklist__item-checkbox-check {
        background: #369FFF;
        border-color: #369fff
    }

    .cdx-checklist__item--checked .cdx-checklist__item-checkbox-check svg {
        opacity: 1
    }

    .cdx-checklist__item--checked .cdx-checklist__item-checkbox-check svg path {
        stroke: #fff
    }

    .cdx-checklist__item--checked .cdx-checklist__item-checkbox-check:before {
        opacity: 0;
        visibility: visible;
        transform: scale(2.5)
    }
</style>

<div class="ce-block__content">
    <div class="cdx-block cdx-checklist">
        @foreach($data['items'] as $item)
            <div class="cdx-checklist__item {{$item['checked'] ? 'cdx-checklist__item--checked' : ''}} ">
                <div class="cdx-checklist__item-checkbox">
                <span class="cdx-checklist__item-checkbox-check">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                         viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                              d="M7 12L10.4884 15.8372C10.5677 15.9245 10.705 15.9245 10.7844 15.8372L17 9"></path></svg></span>
                </div>
                <div class="cdx-checklist__item-text" data-empty="false">
                    {{$item['text']}}
                </div>
            </div>
        @endforeach
    </div>
</div>
