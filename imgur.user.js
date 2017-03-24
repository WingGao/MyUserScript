// ==UserScript==
// @name       imgur.com
// @namespace  https://github.com/WingGao/MyUserScript
// @version    1.1
// @description  get bbs code
// @match      *://imgur.com/a/*
// @copyright  2017+, WingGao
// ==/UserScript==

Imgur.Gallery.EmbedBBS = React.createClass({
    displayName: "Gallery-Embed",
    componentDidMount: function () {
        console.log('from bbs');
    },
    getCount: function () {
        return $('.post-grid-images .post-grid-image').length;
    },
    getEmbedCode: function (a, b) {
        var h = '';
        $('.post-grid-images .post-grid-image').each(function (i, v) {
            v = $(v);
            h += '[img]http:' + v.attr('data-href') + '[/img]\n';
        });
        return h;
    },
    copy: function () {
        var a = $('#cboxContent .embed-copy');
        a.select();
        try {
            document.execCommand("copy"),
                window.getSelection().removeAllRanges()
        } catch (b) {
        }
        flashElement($(a), 100, null)
    },
    render: function () {
        return React.createElement("div", null, React.createElement("p", {
                className: "embed-action"
            }, "Copy + Paste this Code " + this.getCount()),
            // React.createElement(Imgur.Elements.Copy, {
            //     value: this.getEmbedCode(!0, !0),
            //     inputClass: "copy-input embed-copy",
            //     copyClass: "copy"
            // }),
            React.createElement('div', {className: 'copywrapper'},
                React.createElement('textarea', {
                    className: 'copy-input embed-copy copyflash',
                    // style: {width: 500},
                    rows: 20
                }, this.getEmbedCode()),
                React.createElement('button', {
                    className: 'copy',
                    // id: 'wing-copy',
                    onClick: this.copy.bind(this)
                }, 'Copy'))
        );
    }
});

function hanldeBBS() {
    $.colorbox({
        href: '<div id="embed-modal"></div>',
        open: true,
        inline: true,
        top: '15%',
        transition: 'none',
        scrolling: false,
        width: 593,
        height: 587,
        className: 'blurbox blurbox--scroll',
        title: 'Embed BBS',
        onComplete: _.bind(function () {
            ReactDOM.render(React.createElement(Imgur.Gallery.EmbedBBS, {
                hash: 1,
                title: 2,
                in_gallery: true,
                is_album: true,
                nsfw: false
            }), document.getElementById('embed-modal'));
        }, this)
    });
}

$(document).ready(function () {
    $('#post-options .post-options-extra').append('<li class="extra-option" id="wing-bbs"><span class="extra-option-icon icon-embed"></span>Embed BBS</li>');
    $('#wing-bbs').click(hanldeBBS);
});