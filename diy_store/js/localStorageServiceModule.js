(function(){
	angular.module("localStorageServiceModule",[])
		   .service("localStorageService",["$window",function($window){
		   		//此服务用于将添加到购物车的商品信息存入缓存

		   		//把字符串存入 localStorage
		   		this.set = function(key,value){
		   			$window.localStorage[key] = value
		   		}

		   		this.get = function(key) {
		   			return $window.localStorage[key];
		   		}
		   		//把对象存入localStorage
		   		this.setData = function(key,obj){
		   			console.log(obj);
		   			$window.localStorage[key] = angular.toJson(obj)
		   		}
		   		//获取存在localStorage中的对象
		   		this.getData = function(key){
		   			return angular.fromJson($window.localStorage[key]);
		   		}
		   		//清空localStorage的全部数据
		   		this.deleteData = function(){
		   			return localStorage.clear();
		   		}
		   }])
})()