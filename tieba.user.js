// ==UserScript==
// @name       贴吧 — 只显示楼主 精简界面
// @namespace  https://github.com/WingGao/MyUserScript
// @version    0.1
// @description  用于贴吧 【只看楼主】 页面，清理无用部分。
// @match      http://tieba.baidu.com/p/*?see_lz=1*
// @copyright  2015+, WingGao
// ==/UserScript==


function clearpage() {
    //删除分享
    $(".share_btn_wrapper").remove();
    //回复
    $(".core_reply_tail").remove();
    $(".j_lzl_container").remove();

    //作者
    $(".d_author").remove();

    //右侧
    $(".right_section").remove();
    $(".tbui_aside_float_bar").remove();


    //沙发移除
    $("#sofa_post").remove();

    //推荐帖子
    $(".thread_recommend").remove();

}

$(document).ready(function () {
    clearpage();
    $(document).scroll(function () {
        clearpage();
    });
});