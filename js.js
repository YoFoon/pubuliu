$(function(){
	var oUl = document.getElementById('ul1');
    var aLi = oUl.getElementsByTagName('li');
    var iLen = aLi.length;
    var iPage = 1;
    var flag = true;

	getList();

	function getList(){
		$.post('getPics.php',{cpage:iPage},function(data){
			if(!data.length){//后续没有数据
                    falg = false;
                    return;
                }

                for(var i = 0; i< data.length; i++){
                    var _index = getShort();
                    var oDiv = document.createElement('div');

                    var  oImg = document.createElement('img');
                    oImg.src=data[i].preview;
                    oImg.style.height= data[i].height * (270 / data[i].width) + 'px';
                    oImg.style.width = '270px';
                    oDiv.appendChild(oImg);

                    var oP = document.createElement('p');
                    oP.innerHTML = data[i].title;
                    oDiv.appendChild( oP );

                    aLi[_index].appendChild(oDiv);
			}
			flag = true;
		},'json');
	}

	window.onscroll = function(){
		var _index = getShort();
        var oLi = aLi[_index];
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if(getTop(oLi) + oLi.offsetHeight < document.documentElement.clientHeight + scrollTop ){
            if(flag){
                flag = false;
                iPage++;
                getList();
            }
        }
	};

	function getTop(obj){
		var iTop = 0;
		while(obj){
			iTop += obj.offsetTop;
			obj = obj.offsetParent;
		}
		return iTop;
	}

	function getShort(){
		var index = 0;
		var iH = aLi[index].offsetHeight;
		for( var i= 0; i< iLen; i ++ ){
			if( aLi[i].offsetHeight<iH){
				index = i;
				iH = aLi[i].offsetHeight;
			}
		}
		return index;
	};
});