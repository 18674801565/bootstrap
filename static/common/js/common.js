
$(function () {

    //侧栏选中样式
    $(".side_visited").click(function (e) {
        e.preventDefault()
        $(this).next().toggle();
        //自身添加active样式，移除兄弟active样式,及所有孩子（a）的activeTwo样式
        $(this).parent("li").addClass("active").siblings().removeClass("active");
        $(".side_visited_two").removeClass("activeTwo");
        //
        //侧栏右侧图标
        let side_span = $(this).children("span");
        if (side_span.length == 2) {
            side_span.last().toggleClass(
                "glyphicon-menu-up",
                "glyphicon-menu-down"
            )
        }
        //取消默认方法
        return false;
    })



})