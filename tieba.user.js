// ==UserScript==
// @name       贴吧 — 只显示楼主 精简界面
// @namespace  https://github.com/WingGao/MyUserScript
// @version    0.3
// @description  用于贴吧 【只看楼主】 页面，清理无用部分。
// @match      http://tieba.baidu.com/p/*?see_lz=1*
// @copyright  2015+, WingGao
// ==/UserScript==


function clearpage() {
    //删除分享
    $(".share_btn_wrapper").remove();
    //举报按钮
    $(".j_jb_ele").remove();
    //回复按钮
    $(".p_reply").remove();
    //来自xxx
    $('.post-tail-wrap .tail-info a').parent().remove();
    //回复
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