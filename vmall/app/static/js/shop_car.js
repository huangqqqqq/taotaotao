var shop_car = (function () {
    var $shop_box = document.querySelector('.readonly_wrap');
    var $sum = document.querySelector('.sum_price');
    //总共选择几件商品
    var $num_count = document.querySelector('.num_count');
    //优惠多少钱
    var $cheap = document.querySelector('.cheap');


    return {
        init() {
            this.shopList = null;
            this.getshopList();
            this.insertData();
            //删除按钮
            
            this.$inp_par = document.querySelector('.readonly_bottom');
            this.event();
        },
        event() {
            const _this = this;
            $shop_box.oninput = function(ev){
                ev = ev || window.event;
                var target = ev.target || ev.srcElement;
                if(target.nodeName == 'INPUT'){
                    _this.shopList[0].count = Number(target.value);
                    _this.setshopList();
                    _this.insertData();
                }
                
            }
            $shop_box.onclick = function (ev) {
                ev = ev || window.event;
                var target = ev.target || ev.srcElement;
                var node = target.parentNode.parentNode.parentNode.parentNode;
                if(target.className == 'btn'){
                    node.remove();
                    localStorage.clear();
                }
                
                

            }
        },
        insertData() {
            $shop_box.innerHTML = '';
            this.shopList.forEach((item, index) => {
                $shop_box.innerHTML = `
                    <div class="readonly_bottom clearfix">
                    <div class="count_goods">
                        <a href="javascript:;">
                            <img src="${this.shopList[index].src}">
                        </a>
                        <ul>
                            <li>
                                <a href="javascript:;">${this.shopList[index].title}</a>
                            </li>
                            <li>
                                <span>¥ ${this.shopList[index].price}</span>
                                </br>
                                <i>${this.shopList[index].save}.00</i>
                            </li>
                            <li class="inp_par">
                                <div class="tel_nub">
                                    <!-- //商品数量 -->
                                    <input type="number" class ="count_inp" min="1" max="100" value="${this.shopList[index].count}" />
                                    
                                </div>
                            </li>
                            <li>
                                <!-- //价格小计 -->
                                <span>¥ ${this.shopList[index].count * this.shopList[index].price}.00</span>
                                </br>
                                <!-- //节省多少钱，每台省800 -->
                                <i>省 ¥${this.shopList[index].count * 800}.00</i>
                            </li>
                            <li>
                                <a class="btn" href="javascript:;">删除</a>
                            </li>
                        </ul>
                    </div>
                </div>
            `;
                $sum.innerHTML = `￥ ${this.shopList[index].count * this.shopList[index].price} `;
                $num_count.innerHTML = `${this.shopList[index].count}`;
                $cheap.innerHTML = `¥${this.shopList[index].count * 800}.00`;
            })
            this.setshopList();
        },
        getshopList(){
            this.shopList = JSON.parse(localStorage.shopList);
        },
        setshopList(){
            localStorage.shopList = JSON.stringify(this.shopList);
        }
    }

}())