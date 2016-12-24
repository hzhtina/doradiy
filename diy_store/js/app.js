(function(){
	angular.module("diyStore", ["ngRoute", "configModule","localStorageServiceModule", "getDiyDataModule","diyListCtrlModule", "diyDetailCtrlModule","diyShopcarModule","userModelModule","userModule","cookieServiceModule","ionic","orderModelModule","orderModule"])
		   .service("shopcarData",["localStorageService","cookieService",function(localStorageService,cookieService){
		   		//本服务用于从缓存中获取购物车数据
		   		var data = localStorageService.getData("shopcar"+cookieService.getCookie("users_id"));
		   		if(data){
		   			this.data = data;
		   		}else{
		   			this.data = {};
		   		}
		   }])
		   .controller("mainCtrl",["$scope","cookieService","$http","shopcarData","$location","localStorageService","$ionicSideMenuDelegate",function($scope,cookieService,$http,shopcarData,$location,localStorageService,$ionicSideMenuDelegate){
		   		$scope.toggleLeft = function() {
			   		$ionicSideMenuDelegate.toggleLeft();
			   		
			  	};
			  	$scope.toggleRight = function() {
			   		$ionicSideMenuDelegate.toggleRight();
			   		console.log("0");
			  	};
		   		//使登陆成功后显示“hello！xxx”
				var user = {};//字符串只有深拷贝，对象有浅拷贝
	       		user.username = cookieService.getCookie('user');
	 			
	 			$scope.user = user;


	       		console.log($scope.user.username);

	 			//退出登录
	 			$scope.logout = function(){
	 				//删除cookie
	 				cookieService.deleteCookie("user");
	 				cookieService.deleteCookie("users_id");
	 				// //清空localStorage的全部数据(localStorage中存放了购物车内的商品信息)
	 				// localStorageService.deleteData();

	 				//把购物车图标上显示的数据清除
	 				$scope.countShopcar = 0;

	 				//删除数据
	 				$scope.user.username = false;
	 				$location.path("/diyList");
	 			}


	 			//定义购物车数量
	       		$scope.countShopcar = 0;
	       		//监听购物车信息变化
	       		$scope.$watch(function(){
	       			return shopcarData.data;
	       		}, function(){
	       			var num = 0;
	       			var total = 0;
	       			for (var i in shopcarData.data) {
	       				num ++;
	       				total += shopcarData.data[i].product_price * shopcarData.data[i].shopcar_num;
	       			}
	       			$scope.countShopcar = num; //改变购物车数量
	       			$scope.countShopcarcopy = num;//给购物车数量存一个备份
	       			$scope.total = total;  //改变总价
	       			if(cookieService.getCookie('user')){
	       				//账户登录后
	       				//把购物车信息填入缓存
	       				localStorageService.setData('shopcar'+cookieService.getCookie("users_id"), shopcarData.data);
	       			}
	       			
	       		}, true);

	       		//页面跳转到购物车
	       		$scope.gotoShopcar = function(){
	       			//判断用户是否登录
	       			if(cookieService.getCookie('user')){
	       				//用户已登录
	       				$location.path("/diyShopcar");
	       			}else{
	       				//用户未登录，跳转至登录页面
	       				$location.path("/login");
	       			}
	       			
	       			
	       		}
		   }])
		   
})()