$(function(){
         //内容的滚动
    //轮播图
    var swiper = new Swiper('.swiper-container', {
        effect: 'cube',
        grabCursor: true,
        cubeEffect: {
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
        },
        pagination: {
            el: '.swiper-pagination',
        },
    });

    //plan done

        $(".content-static div").click(function(){
            $(this).addClass("active").siblings().removeClass("active");
        })
       var flag="plan";
        $(".plan").click(function(){
            flag="plan";
            render();
        })
        $(".done").click(function(){
            flag="done";
            render();
        })
    //提交框
       $(".add").click(function(){
           $(".main").css("filter","blur(2px)").next().css("display","block").children().addClass("textscale");
       });
        $(".close").click(function(){
            $(".main").css("filter","none").next().css("display","none").children().removeClass("textscale");
            // var addContent=$("#add-content").val();
            // console.log(addContent);
            // addContent.;
            // $("#add-content").html("");
        });
    //处理数据
    {

        $(".submit").click(function(){
            $(".main").css("filter","none").next().css("display","none").children().removeClass("textscale");
              if($("#add-content").val()==""){
                  $(".tip").show().addClass("tipShow");
                  $(".tip").html("请输入内容");
                  return;
              }
              let contentVal=$("#add-content").val();
            $("#add-content").val("");
              let date=new Date();
              let year=date.getFullYear();
              let month=setZero(date.getMonth()+1);
              let days=setZero(date.getDate());
              let hours=setZero(date.getHours());
              let minutes=setZero(date.getMinutes());
              let time=`${year}-${month}-${days} ${hours}:${minutes}`;
              let data=getData();
              data.push({val:contentVal,time:time,isDone:false,isStart:false});
              saveData(data);
              render();
        })
        //取数据
        function render(){
            let data=getData();
            var str="";
            data.forEach(function(ele,index){
                // console.log(flag)
                if(ele.isDone==false && flag=="plan"){
                str+=`<li id="${index}"><p class="content-more">${ele.val}</p><time>${ele.time}</time>
                      <i>*</i><div class="todo-for finish">完成</div></li>
`;
                }
                if(ele.isDone==true&&flag=="done"){
                    str+=`<li id="${index}"><p class="content-more">${ele.val}</p><time>${ele.time}</time>
                      <i>*</i><div class="todo-for del">删除</div></li>
`;
                }
            })
            $(".content-text ul").html(str);
            todoEvent();
        }
        render();
        //内容为空的提示
        $(".tip").on("animationend",function(){
            $(".tip").hide().removeClass("tipShow");
        });
        //时间日期加零
        function setZero(n){
            return n<10?"0"+n:n;
        }
     function getData(){
        return localStorage.todo?JSON.parse(localStorage.todo):[];
     }
     function saveData(data) {
        localStorage.todo=JSON.stringify(data);
      }
      //添加事件的按钮
        function todoEvent(){
            var max=$(".content-text ul li .todo-for").width();
            $(".content-text ul li").each(function(index,ele){
                var sx,mx,movex;
                var pos="start";
                var hammer=new Hammer(ele);
                hammer.on("panstart",function(e){
                    $(ele).css("transition","none");
                    sx=e.center.x;
                    $(ele).siblings().css("x",0);
                })
                hammer.on("panmove",function(e){
                    var cx=e.center.x;
                    mx=cx-sx;
                    if(pos==="start" && mx>0){
                        return;
                    }
                    if(pos==="end" && mx<0) {
                        return;
                    }

                    if(pos==="start"){
                        movex=mx;
                    }else if(pos==="end"){
                        movex=mx-max;
                    }
                    if(Math.abs(mx)>max){
                        return;
                    }
                    // ele.style.transform = "translateX("+movex+"px)"
                    $(ele).css("x",movex);
                });
                hammer.on("panend",function () {
                    // ele.style.transition="all 1s ease";
                    $(ele).css("transition","all 1s ease");
                    if(Math.abs(movex)>max/2){
                        $(ele).css("x",-max);
                        pos="end"
                    }else{
                        $(ele).css("x",0);
                    }
                });

            })
        }
        //完成按钮，改变状态
        $(".content-text ul").on("click",".finish",function(){
            var id=$(this).parent().attr("id");
            var data=getData();
            data[id].isDone=true;
            saveData(data);
            render();
        })
        $(".content-text ul").on("click",".del",function(){
            var id=$(this).parent().attr("id");
            var data=getData();
            data.splice(id,1);
            saveData(data);
            render();
        })
        //对文本的修改
        $(".content-text ul").on("click",".content-more",function() {
            let id=$(this).parent().attr("id");
            let data=getData();
            let text=data[id].val;
            $(".mask2 .alertbox textarea").val(text);
            $(".main").css("filter","blur(2px)").prev().css("display","block").children().addClass("textscale");
            $(".submit2").click(function(){
                $(".main").css("filter","none").prev().css("display","none").children().removeClass("textscale");
                let xiugai=$(".mask2 .alertbox textarea");
                if(xiugai.val()==""){
                    $(".tip").show().addClass("tipShow");
                    $(".tip").html("内容不能为空");
                    return;
                }
                let contentValue=xiugai.val();
                let date=new Date();
                let year=date.getFullYear();
                let month=setZero(date.getMonth()+1);
                let days=setZero(date.getDate());
                let hours=setZero(date.getHours());
                let minutes=setZero(date.getMinutes());
                let time=`${year}-${month}-${days} ${hours}:${minutes}`;
                let data=getData();
                data[id].val=contentValue;
                data[id].time=time;
                saveData(data);
                render();
            })
        })

        $(".close2").click(function() {
            $(".main").css("filter", "none").prev().css("display", "none").children().removeClass("textscale");
         });
        }
    })
   //处理内容向下刷新


//rem 单位      js   媒体查询 @media screen and (min-width:325px){
//    html{
//       font-size:42.6667px;
// }
// }
//JSON.parse  转化为数组

// @media screen and (min-width){
//    html{
//       font-size:42.6667px;
// }
// }

//rem.js

//vw vh  c3   未有设计稿

// (function(){                                                     s
//     var
// })();
/*
   移动端   touchstart      touchmove    touchend  支持onclick事件
    移动端数据库    hammer.js      addEvent(){}
    完成时用事件委派     overflow:scroll   iscroll.js   滚动条插件iscroll5的文档
    text
 */