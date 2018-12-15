var login_check = (function(){
    return{
        init(){
            //记住账号提示
            this.$account_con = document.querySelector('.account_con');
            this.$allt = document.querySelector('.allt');
            //更多
            this.$mron = document.querySelector('.mron_a');
            this.$mron_con = document.querySelector('.mron_con');
            

            //切换登录方式元素获取；
            //账号登录按钮
            this.$id_btn = document.querySelector('#id_btn');
            //获取账号登录的整个元素
            this.$login_inp = document.querySelector('.login_inp');
            //扫码登录按钮
            this.$code_btn = document.querySelector('#code_btn');

            //鼠标移入元素变换位置
            //获取放置二维码和手机标志的
            this.$login_ma = document.querySelector('.login_ma');
            this.$ma_con = document.querySelector('.ma_con');
            this.$ma_phone = document.querySelector('.ma_phone');


            this.event();
        },
        event(){
            const _this = this;
            //选择记住账号鼠标移入提示信息
            this.$account_con.onmouseenter = function(ev){
                ev = ev || window.event;
                _this.$allt.style.display = 'block';
            }
            this.$account_con.onmouseleave = function(ev){
                ev = ev || window.event;
                _this.$allt.style.display = 'none';
            }
            //显示更多菜单
            this.$mron.addEventListener('click',function(ev){
                ev = ev || window.event;
                _this.$mron_con.style.display = 'block';
                ev.stopPropagation(); 
            })
            //隐藏更多菜单
            document.addEventListener('click',function(){
                _this.$mron_con.style.display = 'none';  
            })

            //切换登录方式点击事件；
            //账号登录按钮事件
            this.$id_btn.onclick = function(){
                _this.$login_inp.style.display = 'block';
                this.className = 'active';
                _this.$code_btn.className = '';
                _this.$login_ma.style.display = 'none';
            }
            //扫码登录按钮事件
            this.$code_btn.onclick = function(){
                this.className = 'active';
                _this.$login_ma.style.display = 'block';
                _this.$id_btn.className = '';
                _this.$login_inp.style.display = 'none';
            }

            this.$ma_con.onmouseenter = function(ev){
                ev = ev || window.event;
                move(this,{left:20},300);
                move(_this.$ma_phone,{opacity:100},300);
            }
            this.$login_ma.onmouseleave = function(ev){
                ev = ev || window.event;
                move(_this.$ma_con,{left:109},300);
                move(_this.$ma_phone,{opacity:0},300);
            }

        }
    }
}())


//登录验证
var login = (function(){

    return{
        init(){
            // this.$user = document.querySelector('#username');
            // this.$pass = document.querySelector('#password');
            this.$btn = document.querySelector('.login_btn');
            this.$p = document.querySelector('.danger');
            //获取两个input
            this.$div_reg = document.querySelector('.login_reg');
            
            this.$inp = this.$div_reg.querySelectorAll('input');
            this.event();
        },
        event(){
            const _this = this;
            
            //username的登录验证
            this.$inp[0].onblur = function(){
                _this.$p.innerHTML = '';
                var reg = /^1[35789]\d{9}$/;
                var bool = reg.test(this.value);
                if(bool){
                    _this.$p.className = 'bg-success';
                    _this.$p.innerHTML = '';
                }else{
                    _this.$p.className = 'danger';
                    _this.$p.innerHTML = '请输入正确的华为帐号';
                }

            }
            for(var i = 0; i< this.$inp.length;i++){
                this.$inp[i].oninput = function(){
                    _this.$p.innerHTML = '';
                }
            }
            //password的登录验证
            
            //点击提交按钮后的验证
            this.$btn.onclick = function(){
                for (let i = 0; i < _this.$inp.length; i++) {
                    if(_this.$inp[0].value == ''){
                        _this.$p.innerHTML = '请输入您的账号';
                        return false;
                    }else if(_this.$inp[1].value == ''){
                        _this.$p.className = 'danger';
                        _this.$p.innerHTML = '请输入您的密码';
                        return false;
                    }
                }
                sendAjax('http://localhost:8088/huawei_vamll/vmall/server/php/login.php',{
                    data:{
                        user:_this.$inp[0].value,
                        pass:_this.$inp[1].value
                    }
                })
                .then(res =>{
                    res = JSON.parse(res);
                    if(res.code == 0){
                        location.href = 'index.html';
                        document.cookie = "name="+res.data;
                    }else if(res.code == 10000){
                        _this.$p.className = 'danger';
                        _this.$p.innerHTML = res.data;
                    }
                })


            }

        }
    }
}())