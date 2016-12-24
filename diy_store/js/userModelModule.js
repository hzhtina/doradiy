(function(){
	angular.module("userModelModule",[])
		   .service("userModelService",["$http","APIPATH",function($http,APIPATH){
		   		// 用于注册或登录
		   		this.postUser = function(url,data,success,error){
		   			$http.post(APIPATH+url,data,{
		   				headers:{"Content-Type":"application/x-www-form-urlencoded" }
		   			})
		   				 .then(success,error);
		   		}
		   }])
})()