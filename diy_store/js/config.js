(function(){
	angular.module("configModule", [])
			//api的路径
		   .constant("APIPATH", "http://localhost/phphomework/xm/php/diy_api/")
		  	
		  //图片的路径
		   .constant("IMAGEPATH", "http://localhost/phphomework/xm/php/diy_images/")
	       
		   
	       //配置 注入路由 路由必须写在config中
	       .config(["$routeProvider", function($routeProvider) {


	       		//路由
	       		$routeProvider
	       			.when("/diyList", {
	       				// 查所有DIY的列表
	       				templateUrl:"./tpl/diyList.html",
	       				controller:"diyListCtrl",
	       				controllerAs:"dl"//给控制器起一个别名，在视图中使用时：别名.属性；在控制器里通过this设置值
	       			})
	       			.when("/diyDetail/:id", {
	       				// /diyDetail 后加/:id，是路由的传参方法，id前的冒号必须加上
	       				templateUrl : "./tpl/diyDetail.html",
	       				controller:"diyDetailCtrl"
	       			})
	       			.when("/register",{
	       				templateUrl:"./tpl/reg.html",
	       				controller:"registerCtrl"
	       			})
	       			.when("/login",{
	       				templateUrl:"./tpl/login.html",
	       				controller:"loginCtrl"
	       			})
	       			.when("/diyShopcar",{
	       				//查看购物车
	       				templateUrl:"./tpl/diyshopcar.html",
	       				controller:"diyShopcarCtrl"
	       			})
	       			.when("/diyOrder",{
	       				//添加订单的页面
	       				templateUrl:"./tpl/diyorder.html",
	       				controller:"diyOrderCtrl"
	       			})
	       			.otherwise({
	       				redirectTo:"/diyList"
	       			});

	       }])

})()