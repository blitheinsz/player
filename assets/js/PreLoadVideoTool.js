(function(win,$){
	
	var PreLoadVideoTool=win.SewisePDF.PreLoadVideoTool=function(plugin){
		this.videoArr=[];
		this.pdfPlugin=plugin;
	};
	PreLoadVideoTool.prototype.loadVideo=function(arr){
		for(var i=1;i<arr.length;i++){//从第二个开始加载
			var v=document.createElement("video");
			var obj=arr[i];
			//v.autoplay="autoplay";
			v.preload="auto";
			v.src=obj.url;
			v.volume=0;
			v.setAttribute("sTime",obj.seekTime);
			v.setAttribute("vurl",obj.url);
			$(v).bind("canplay",function(e){
				var stime=$(e.currentTarget).attr("sTime");
				if(e.currentTarget.currentTime<=0)//如果没有设置跳转时间
				 e.currentTarget.currentTime=parseInt(stime);
				$(e.currentTarget).unbind("canplay");
				//console.log("seeee",e.target);
			});
			this.videoArr.push({media:v,vurl:obj.url});
			v.style.position="absolute";
			v.style.display="none";
			$(this.pdfPlugin.videoContainer).append(v);
		}
	};
	PreLoadVideoTool.prototype.resetVideoByUrl=function(vurl){
		vurl=decodeURIComponent(vurl);
		for(var i=0;i<this.videoArr.length;i++){
			var turl=$(this.videoArr[i].media).attr("vurl");
			if(turl==vurl||vurl.indexOf(turl)>=0){//vurl可能包含http://
			  this.videoArr[i].media.autoplay=false;
			  this.videoArr[i].media.currentTime=parseInt($(this.videoArr[i].media).attr("sTime"));
			  this.videoArr[i].media.pause();
			  this.videoArr[i].media.volume=0;
			  //console.log("重置回收视频",vurl);
			}
		}
		
	};
	//获取指定的视频元素
	PreLoadVideoTool.prototype.getVideoByUrl=function(vurl){
		var tv;
		for(var i=0;i<this.videoArr.length;i++){
			if($(this.videoArr[i].media).attr("vurl")==vurl){
			  tv=this.videoArr[i].media;
			  $(tv).show();
			}else{
				$(this.videoArr[i].media).hide();
			}
		}
		return tv;
	};
	PreLoadVideoTool.prototype.clear=function(arr){
		for(var i=0;i<this.videoArr.length;i++){
			$(this.videoArr[i].media).unbind("canplay");
			this.videoArr[i].media.src="";
			$(this.videoArr[i].media).remove();
		}
		this.videoArr=[];
	};
})(window,window.jQuery);
