
$(function () {

    //侧栏选中样式
    $(".side_visited").click(function () {
        $(this).next().toggle();
        $(this).parent("li").addClass("active").siblings().removeClass("active");
        //侧栏右侧图标
        let side_span = $(this).children("span");
        if (side_span.length == 2) {
            side_span.last().toggleClass(
                "glyphicon-menu-up",
                "glyphicon-menu-down"
            )
        }
        //取消默认方法

    })



})