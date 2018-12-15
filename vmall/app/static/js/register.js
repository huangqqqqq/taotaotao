var register = (function () {
    //获取整个表单
    var $form = document.querySelector('.form-box');
    //获取按钮
    var $reg_btn = document.querySelector('.btn');
    //获取所有input
    var $inp_all = $form.querySelectorAll('input');

    //所有的正则表达式；
    var checkinput = {
        username:function(val){
            var reg = /^1[35789]\d{9}$/;
            return reg.test(val) ? 1 : 0;
        },
        code:function(val){
            var reg = /^\w{4}$/;
            return reg.test(val) ? 1 : 0;
        },
        password:function(val){
            var reg = /^\w{8,13}$/;
            return reg.test(val) ? 1 : 0;
        },
        repassword:function(val){
            var ele = document.getElementById('password');
            return ele.value == val ? 1 : 0;
        }
    }
    return{
        init(){
            this.event();
        },
        event(){
            const _this = this;
            for(var i = 0; i < $inp_all.length;i++){
                $inp_all[i].onblur = function(){
                    var val = this.value.trim();

                    //获取p元素
                    var $p = this.nextElementSibling;
                    if(val == ''){
                        $p.className = 'danger';
                        $p.innerHTML = '输入内容为空，请正确填写';
                    }else{
                        var bool = checkinput[this.name](val);
                        if(bool){
                            //将来使用ajax请求
                            if (this.name == 'username') {
                                sendAjax('http://localhost:8088/huawei_vamll/vmall/server/php/register.php',{
                                    data:{
                                        user:this.value
                                    }
                                }).then(res =>{
                                    res = JSON.parse(res);
                                    if (res.code == 10000) {
                                        $p.className = 'bg-success';
                                        $p.innerHTML = '';
                                    }else if(res.code == 0){
                                        $p.className = 'danger';
                                        $p.innerHTML = res.data;
                                    }
                                })
                            }
                            //说明输入正确
                            $p.className = 'bg-success';
                            $p.innerHTML = '';
                        }else{
                            $p.className = 'danger';
                            $p.innerHTML = this.getAttribute('hint');
                        }
                    }
                }
            }
            //提交表单
            $reg_btn.onclick = function(){
                for(var i = 0;i < $inp_all.length;i++){
                    if($inp_all[i].nextElementSibling.className != 'bg-success'){
                        $inp_all[i].focus();
                        return false;
                    }
                }
                //验证通过，将所有数据发送至后台
                sendAjax('http://localhost:8088/huawei_vamll/vmall/server/php/reg_to_sql.php',{
                    data:{
                        user:$form.username.value,
                        pass:$form.password.value,
                        mark:'主动注册'
                    }
                })
                .then(res =>{
                    if (res == 1) {
                        location.href = 'login.html';
                    } else {
                        alert('注册失败,您的网络不稳定');
                    }
                })

            }





        }
    
    
    
    
    
    }
} ())