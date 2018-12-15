var top_hiden = (function (){
    return {
        init:function(){
            this.$top_img = document.querySelector('#top_hiden');
            this.$top_btn = document.querySelector('.top_btn');
            this.event();
        },
        event:function(){
            var _this = this;
            this.$top_btn.onclick = function () {
               _this.$top_img.style.display = 'none';
                }
        }
    }
}())



//下拉菜单
var menu = (function(){
    return{
        init:function(){
            //下拉菜单大盒子
            // this.$menu_img = document.querySelector('.menu_img');
            // console.log(this.$menu_img);
            // this.$phone = document.querySelector('.phone');
            // //获取所有的导航li
            // this.$menu_ul = document.querySelector('.menu_con');
            // this.$ul_liall = document.querySelector(".menu_con li");
            // console.log(this.$menu_ul);
            this.event();
        },
        event:function(){
            const _this = this;
           //菜单滑下
            $('.menu_con').on('mouseenter','li',function(){
                $(".menu_img").stop().slideDown('900');
                
            })
            $(".menu_img").mouseenter(function(){
                $(this).stop().css('display','block');
            })
            //菜单滑上
           
            $('.menu_con').on('mouseleave','li',function(){
                $(".menu_img").stop().slideUp('900');
            })
            $(".menu_img").mouseleave(function(){
                $(this).stop().slideUp('900');
            });

            
            $('.menu_con>li').eq(0).mouseenter(function(){
                $('.menu_img>div').eq(0).css('display','block').siblings().css('display','none');
            })
            $('.menu_con>li').eq(1).mouseenter(function(){
                $('.menu_img>div').eq(1).css('display','block').siblings().css('display','none');
            })
            $('.menu_con>li').eq(2).mouseenter(function(){
                $('.menu_img>div').eq(2).css('display','block').siblings().css('display','none');
            })
            $('.menu_con>li').eq(3).mouseenter(function(){
                $('.menu_img>div').eq(3).css('display','block').siblings().css('display','none');
            })
            $('.menu_con>li').eq(4).mouseenter(function(){
                $('.menu_img>div').eq(4).css('display','block').siblings().css('display','none');
            })
            $('.menu_con>li').eq(5).mouseenter(function(){
                $('.menu_img>div').eq(5).css('display','block').siblings().css('display','none');
            })
            
        }
    }
}())
