// ==UserScript==
// @name       小米WIFI的VPN精简管理
// @namespace  https://github.com/WingGao/MyUserScript
// @version    0.1
// @description  小米WIFI的VPN精简管理
// @match      http://192.168.31.1/cgi-bin/luci/*/web/prosetting/vpn
// @copyright  2016+, WingGao
// ==/UserScript==

function clearVPN() {
    var vpnCont = $('#smartvpnmodecont');
    var vpnTable = vpnCont.find('table');
    var vpnTableHidden = true;
    vpnTable.hide();

    var addBtn = $('#addsmartvpnurl').click(function () {
        var urls = vpnTable.find('td:first-child').map(function (i, v) {
            return v.innerHTML;
        });
        console.log('click');
        setTimeout(function () {
            var resultDiv = document.createElement('div');
            var form = $('#addbyurl').append(resultDiv);

            var addText = $('#urladdr').on('keyup paste', function () {
                resultDiv.innerHTML = '';
                var url = addText.val();
                if (url.trim().length == 0)
                    return;
                urls.each(function (i, v) {
                    if (v.indexOf(url) == 0) {
                        resultDiv.innerHTML += v + '<br>';
                    }
                });
            });

        }, 500);
    });
    addBtn.after('<button class="btn btn-dft" id="addsmartvpnurl-aft"><span>显示地址</span></button>');
    var showBtn = $('#addsmartvpnurl-aft').click(function () {
        if (vpnTableHidden) {
            vpnTable.show();
            showBtn.find('span').text('隐藏地址');
            vpnTableHidden = false;
        } else {
            vpnTable.hide();
            showBtn.find('span').text('显示地址');
            vpnTableHidden = true;
        }

    })

}

$(document).ready(function () {
    clearVPN();
});