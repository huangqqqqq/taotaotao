function move($ele,targetObj,time,callback){
	if (typeof $ele === 'string') {
		//判断类型
		$ele = document.querySelector($ele);
	}
	//清除定时器
	clearInterval($ele.timer);
	
	var speedObj = {};
	for (var attr in targetObj) {
		var init = getStyle($ele,attr);
		
		if (attr == 'opacity') {
			init *= 100;
		}
		init = parseFloat(init);
		var speed = (targetObj[attr] - init) / (time / 10);
		
		speedObj[attr] = speed;
	}
	
	$ele.timer = setInterval(_ => {
		var flag = true;
		
		for (var attr in targetObj) {
			var init = getStyle($ele,attr);
			
			if (attr == 'opacity') {
				init *= 100;
			}
			init = parseFloat(init);
			
			init += speedObj[attr];
			
			if ((speedObj[attr] >= 0 && init >= targetObj[attr]) || (speedObj[attr] <= 0 && init <= targetObj[attr])) {
				init = targetObj[attr];
			} else{
				flag = false;
			}
			if (attr == 'opacity') {
				$ele.style[attr] = init /100;
			}else{
				$ele.style[attr] = init + 'px';
			}
			
		}
		if (flag) {
			clearInterval($ele.timer);
			if (typeof callback === 'function') {
				callback($ele);
			}
		}
	},10)
	
}

function getStyle(ele,attr){
	if(window.getComputedStyle){
		return window.getComputedStyle(ele,null)[attr];
	}
	return ele.currentStyle[attr];
}
