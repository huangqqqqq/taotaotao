//放大镜js
var glass = (function(){

    return{
        init(){
            //放大后图片的盒子
            // this.$big_img = document.querySelector('.big_glass_img');
            // //放大镜
            // this.$glass = document.querySelector('.glass');

            // //获取放置放大镜和展示图片的盒子
            // this.$img = document.querySelector('.slideshow_tel');

            // //获取放小图片的ul列表盒子
			// this.$ul_img = document.querySelector('.img_box');
            // // console.log(this.$ul_img);
            // //获取ul里面每一张图片
            // this.$small_img_all = this.$ul_img.children;
            
            this.event();
        },
        event(){
            const _this = this;
            
            //小盒子图片切换
            $('.img_box').on('mouseenter','img',function(){
                //小图片切换。改变展示图片的src
                $(this).parent().addClass('small_glass').siblings().removeClass('small_glass');
                var img_src = $(this).attr('src');
                $('.slideshow_tel img').attr('src',img_src);
                $('.big_glass_img img').attr('src',img_src);
            })
            //滑入大盒子就显示放大镜和放大后的图片
            $('.slideshow_tel').mouseenter(function(){
                $('.glass').css('display','block');
                $('.big_glass_img').css('display','block');
            })
            //滑出大盒子就隐藏放大镜和放大后的图片
            $('.slideshow_tel').mouseleave(function(){
                $('.glass').css('display','none');
                $('.big_glass_img').css('display','none');
            })
            //移动放大镜计算偏移量

            $('.slideshow_tel').mousemove(function(ev){
                ev = ev || window.event;
                var x = ev.pageX - $(this).offset().left - $('.glass').width() / 2;
                var y = ev.pageY - $(this).offset().top - $('.glass').height() / 2;
                // console.log(x,y)
                //判断边界

                var _x = $('.glass').position().left;
                var _y = $('.glass').position().top;

                var maxleft = $(this).width() - $(".glass").width();
                var maxtop = $(this).height() - $(".glass").height();

                if (x >= maxleft) {
					x = maxleft;
				} else if(x <= 0){
					x = 0;
				}
				if (y >= maxtop) {
					y = maxtop;
				} else if(y <= 0){
					y = 0;
				}
                $(".glass").css({ left: x + "px", top: y + "px"});
                $('.big_glass_img img').css({
                    left:2 * -x + "px", top: 2 * -y + "px"
                })
            })

        }
    }
}())
//放大镜
glass.init();


/**************************************************************/
//商品数据渲染
//将商品添加到本地存储

var shop_list = (function(){
   
    return{
        init(){
             //商品名称元素
            this.$title = document.querySelector('.phone_title');
            this.$small_title = document.querySelector('.shop_title');
            //商品价格
            this.$shop_price = document.querySelector('.shop_price');
            this.$save = document.querySelector('.save');
            //图片
            this.$shop_img = document.querySelector('.slideshow_tel>img');
            //放小图片的盒子
            this.$small_img = document.querySelector('.img_box');
            this.$small_img_all = this.$small_img.querySelectorAll('li img');
            //加入购物车按钮
            this.$add_btn = document.querySelector('.shop_btn');
            // console.log(this.$add_btn)
            this.event();
            this.getData();


        },
        event(){
            const _this = this;
            this.$add_btn.onclick = function(){
                //获取数量
                var count = document.querySelector('.num').value;
                _this.data[0].count = Number(count);
                _this.setItem(_this.data[0]);
            }
        },
        getData(){
            sendAjax('http://localhost:8088/huawei_vamll/vmall/server/php/shop.php',{
               method:'GET'
            }).then(res => {
                res = JSON.parse(res);
                if(res.code == 0){
                    this.data = res.data;
                    this.inserData(res.data)
                }else{
                    alert("获取信息失败, 请查询网络状况");
                }
            })
        },
        inserData(data){
            for(var i = 0;i < data.length; i++){
                for (const key in data[i]) {
                    var img = data[i][key];
                    this.$title.innerHTML = data[i].title;
                    this.$small_title.innerHTML = data[i].title;
                    //价格
                    this.$shop_price.innerHTML = data[i].price;
                    this.$save.innerHTML = data[i].save;
                    //图片
                    this.$shop_img.src = data[i].src;
                } 
            }
           var arr = [];
            for(let i = 0; i < this.$small_img_all.length;i++){
                for(var key in img[i]){
                    arr.push(img[i][key]);
                }
                this.$small_img_all[i].src = arr[i];
            }
        },
        setItem(data){
            
            var shopList = localStorage.getItem('shopList') || '[]';
            shopList = JSON.parse(shopList);
            console.log(shopList)
            for(var i = 0; i < shopList.length; i++) {
                if(data.id == shopList[i].id) {
                    // 此商品已经存在
                    shopList[i].count += data.count;
                    break;
                }
            }
            if(i == shopList.length) {
                // 商品不存在
                shopList.push(data);
            }
            localStorage.shopList = JSON.stringify(shopList);
            alert('商品已经加入购物车');


        }
    }
}())
shop_list.init();
/***************************************************************** */
//监听放大镜展示的滚动高度；
var scroll_glass =  (function(){

    return{
        init(){
            this.event();
        },
        event(){
            const _this = this;
           $(window).scroll(function(){
                //放大镜在一定滚动高度时不动
               if($(this).scrollTop() > 160){
                   $('.product_left').css({'position':'fixed',"top":0});
               }else if($(this).scrollTop() < 160){
                    $('.product_left').css({'position':'absolute'});
               }
                if($(this).scrollTop() > 400){
                    $('.product_left').css({'position':'absolute',"top":240});
               }
               //放大的图片的盒子在一定滚动高度时不动
                if($(this).scrollTop() > 160){
                    $('.big_glass_img').css({'position':'fixed',"top":10,"left":545});
                }else if($(this).scrollTop() <= 160){
                    $('.big_glass_img').css({'position':'absolute',"left":470});
                }
                if($(this).scrollTop() > 400){
                    $('.big_glass_img').css({'position':'absolute',"top":240,"left":470});
                }
           })


        }
    }
}())
scroll_glass.init();

