(function(){
	angular.module("orderModelModule",[])
	.service("orderModelService",["$http","APIPATH",function($http,APIPATH){
		   		// 用于提交订单
		   		this.orderUser = function(url,data,success,error){
		   			$http.post(APIPATH+url,data,{
		   				headers:{"Content-Type":"application/x-www-form-urlencoded" }
		   			})
		   				 .then(success,error);
		   		}
		   }])	   
})()