/*
* @Author: john
* @Date:   2017-02-26 08:57:41
* @Last Modified by:   john
* @Last Modified time: 2017-03-02 10:20:09
*/

'use strict';
$(function(){
	// 头部改变函数
	// 当向下滚动时，头部的颜色也要变化,过完轮播图那块，颜色恢复正常
	(function chead(){
       var  opacity=0;
       $(window).scroll(function() {
       	if($(window).scrollTop()<$(".jd_lunbo").height())
       	{
       		opacity=$(window).scrollTop()/$(".jd_lunbo").height()*0.85;
       	}else{
       		opacity=0.85
       	}
       	// console.log(opacity);
       	$(".jd_header_box").css("background","rgba(201,21,35,"+opacity+")")
       });
	})();
	// 控制轮播图的函数
    (function lunbo(){

    	var imgbox=$(".jd_lunbo ul:first-child");
    	console.log(imgbox);
    	var w=$(".jd_lunbo").width();
    	console.log(w);
    	var addtransition=function(){
    		imgbox.css({
    			transition: "all .4s"
    		});
    	}
    	var removetransition=function(){
    		imgbox.css({
    			transition: "none"
    		});
    	}
    	var setTranslateX=function(translatex){
    		imgbox.css({
    			transform: "translateX("+translatex+"px)"
    		});
    	}
    	var index=1;
    	// 自动播放
    	var timer=setInterval(function(){
    		index++;
    		addtransition();
    		setTranslateX(-index*w);
    		if(index>=9){
        	index=1;
        	removetransition();
        	setTranslateX(-index*w);
        	}else if(index<=0){
            index=8;
        	removetransition();
        	setTranslateX(-index*w);
        	}
            $(".jd_lunbo ul:last-child li").eq(index-1).addClass('now').siblings('li').removeClass('now');
    		
    	},3000);

        // 移动端特有的touch事件
        var startX=0;
        var moveX=0;
        var distanceX=0;
        var ismove=false;
        imgbox[0].addEventListener("touchstart", function(e){
        	clearInterval(timer);
        	startX=e.touches[0].clientX;
        	console.log(startX);
        })
        imgbox[0].addEventListener("touchmove", function(e){
        	clearInterval(timer);
        	ismove=true;
        	moveX=e.touches[0].clientX;
        	distanceX=moveX-startX;
        	console.log(distanceX);
        	var currentX=-index*w+distanceX;
        	removetransition();
        	setTranslateX(currentX);
        })
        imgbox[0].addEventListener("touchend", function(e){
        	if(ismove&&(Math.abs(distanceX)>w/3)){
        		if (distanceX>0) {
        			index--;
        			if(index<=0){
                     index=8;
                 }
        		}
        		else{
        			index++;
        			if(index>=9){
        				index=1;
        	
        			}
        		}
        		addtransition();
        		setTranslateX(-index*w);
        		$(".jd_lunbo ul:last-child li").eq(index-1).addClass('now').siblings('li').removeClass('now');
        	}else{
        		addtransition();
        		setTranslateX(-index*w);
        		$(".jd_lunbo ul:last-child li").eq(index-1).addClass('now').siblings('li').removeClass('now');
        	}
            
        })
        var startX=0;
        var moveX=0;
        var distanceX=0;
        var ismove=false;
        clearInterval(timer);
        var timer1=setInterval(function(){
            index++;
            addtransition();
            setTranslateX(-index*w);
            if(index>=9){
            index=1;
            removetransition();
            setTranslateX(-index*w);
            }else if(index<=0){
            index=8;
            removetransition();
            setTranslateX(-index*w);
            }
            $(".jd_lunbo ul:last-child li").eq(index-1).addClass('now').siblings('li').removeClass('now');
            
        },3000);
    })();	
    // 倒计时函数
    (function timego(){
         var time = 5 * 60 * 60 ;
         var timer = null;
        timer = setInterval(function(){
        if(time <= 0){
            clearInterval(timer);
            return false;
        }
        time -- ;
        /*格式化*/
        var h = Math.floor(time/3600);
        var m = Math.floor(time%3600/60);
        var s = time%60;

        console.log(h);
        console.log(m);
        console.log(s);

        $(".sk_time span").eq(0).html(Math.floor(h/10));
        $(".sk_time span").eq(1).html(h%10);
        $(".sk_time span").eq(3).html(Math.floor(m/10));
        $(".sk_time span").eq(4).html(m%10);
        $(".sk_time span").eq(6).html(Math.floor(s/10));
        $(".sk_time span").eq(7).html(s%10);

    },1000);
    })();
});