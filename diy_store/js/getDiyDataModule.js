(function(){
	angular.module("getDiyDataModule", [])
			// 封装一个服务，用于从diy.php中获取diy商品表中的数据
	       .service("getDiyData", ["$http", "APIPATH", function($http, APIPATH){
	       		this.requestData = function(url, data, success_callback, error_callback){
	       			$http.get(APIPATH+url, {
	       				params:data
	       			}).then(function(response){
	       				if (response.data.code === 0) {
	       					success_callback(response.data.data);
	       				} else {
	       					error_callback(response.data)
	       				}
	       			}, function(error_response){
	       				error_callback(error_response);
	       			})
	       		}
	       }])
})()