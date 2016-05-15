//冒泡排序可视化

	var view = document.getElementById('view_pic');   //视窗
	var Qusort = document.getElementById('Quicksort');  //快速排序
	var right_in = document.getElementById('right_in'); //右入
	var left_out = document.getElementById('left_out'); //左出
	var right_out = document.getElementById('right_out');  //右出
	var random = document.getElementById('random');  //随机产生
	var Busort = document.getElementById('Bubblesort');   //排序

	const min = 60;
	const max = 60;
	var timer = null;
	var arr = [];   //与dom结点对应，存放dom的高度
	var count = 0;  //用于计数交换次数，使用定时器实现动态的效果
	//var flag = false; //标志位，若正在排序不能进行其他排序

	createFragment();

	//事件触发
	random.addEventListener('click',Random);
	Busort.addEventListener('click',BubbleSort);
	Qusort.addEventListener('click',function(){
		Quicksort(arr,0,arr.length-1);
	});




	//随机
	function Random(){
		clearInterval(timer);
		clearAllNode(view); //清除现有
		arr = [];
		count = 0;
		createFragment();   //生成随机
	}

	//冒泡排序
	function BubbleSort(){

		clearInterval(timer);
		let length = view.childNodes.length;
		let i = 0; 
		let j = 0;
		
		timer = setInterval(function(){
			//比较n-1趟
			if(i<length-1){
				
				//每一趟比较n-i-1次
				if(j<length-i-1){
				
					if(arr[j] > arr[j+1])
					{
						//交换数组元素，并交换两个div的高度
						[arr[j],arr[j+1]] = [arr[j+1],arr[j]];

						view.childNodes[j].style.height = arr[j]+'px';
						view.childNodes[j+1].style.height = arr[j+1]+'px';

						resetBg();
						view.childNodes[j+1].style.background = "#e65";
					}
					j++;
				}
				else
				{
					j=0;
					i++;
				}
			}
			else
			{
					resetBg();
					clearInterval(timer);		
			}
		},20);

	}

	//快速排序
	function Quicksort(arr,s,t){

		var i;
		if(s<t)
		{
			i = Partition(arr,s,t);  
			if(s<i-1)
			{
				Quicksort(arr,s,i-1);
			}
			if(i<t){
				Quicksort(arr,i+1,t);
			}
			
		}	
		setTimeout(resetBg,100*count);
	}

	function Partition(arr,i,j){
		var temp = arr[i];
		
		while(i<j){
			while(i<j && arr[j] >= temp)  //arr[j]比比较值大就前移
				j--;
				
			if(i<j)  //一旦比比较值小就与arr[i]交换
			{
				[arr[i],arr[j]] = [arr[j],arr[i]];
				count++;

				//通过立即执行的方法把这一刻的参数存起来传入，在count*100秒后执行
				(function(arr,i,j,count){ 
					setTimeout(function(){
						view.childNodes[i].style.height = arr[i]+'px';
						view.childNodes[j].style.height = arr[j]+'px';

						resetBg();
						view.childNodes[i].style.background = "#e65";

					},count*100);
				})(arr,i,j,count);

				i++;
			}

			while(i<j && arr[i] <= temp)
				i++;   //arr[i]比比较值小就前移

			if(i<j){   //比比较值大就和arr[j]交换
				[arr[i],arr[j]] = [arr[j],arr[i]];
				count++;

				(function(arr,i,j,count){
					setTimeout(function(){
						view.childNodes[i].style.height = arr[i]+'px';
						view.childNodes[j].style.height = arr[j]+'px';

						resetBg();
						view.childNodes[i].style.background = "#e65";

					},count*100);
				})(arr,i,j,count);

				j--;
			}			
		
		}

		arr[i] = temp;
		return i;
	}

	//批量添加
	function createFragment(){
	
		var fragment = document.createDocumentFragment();
		var div = null;

		for(let i=0;i<min;i++){
			div = document.createElement('div');
			div.className = "pic";
			arr.push(parseInt(Math.random()*360+10));
			div.style.height = arr[arr.length-1]+'px';
			fragment.appendChild(div);
		}
		//第一次加载的时候view里面含有文本节点，所以需要清空
		clearAllNode(view);
		view.appendChild(fragment);
		
	}

	//批量删除
	function clearAllNode(parentNode){

		while(parentNode.firstChild){
			parentNode.removeChild(parentNode.firstChild);
		}
	}

	//重置颜色
	function resetBg(){
		var length = view.childNodes.length;
		for(let i=0;i<length;i++){
			view.childNodes[i].style.background = "#6688ff";
		}
	}

