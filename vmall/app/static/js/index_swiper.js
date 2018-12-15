var swiper = (function () {
    var timer = null;
        return{
            init(){
                //最大的展示盒子
                this.$box = $('.box').first();
                //放置图片的盒子
                this.$imgbox = $('.imgbox').first();
                this.index = 0;
                this.event();
                this.autoPlay();
            },
            event(){
                const _this = this;

                    $('.tipbox li').mouseenter(function(){
                        $(this).addClass('active').siblings().removeClass('active');
                        _this.showimg($(this).index());
                        _this.autoPlay();
                    })
               

            },
            showimg(index){
                if (index >= $('.tipbox li').length) {
                    index = 0;
                }
                this.index = index;
               
                $('.imgbox div').stop().animate({
                    opacity:0,'z-index':1
                }).eq(index).stop().animate({
                    opacity:1,'z-index':2
                })
                $('.tipbox li').eq(index).addClass('active').siblings().removeClass('active');
                
            },
            autoPlay(){
                const _this = this;
                clearInterval(timer);
                timer = setInterval(function () {
                    _this.index++;
                    _this.showimg(_this.index);
                },3000)
            }
        }
}())