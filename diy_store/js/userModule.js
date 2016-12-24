(function(){
	//将注册与登录的控制器写在同一个模块中
	angular.module("userModule",[])
		   .controller("registerCtrl",["$scope","userModelService","$httpParamSerializer","$location", "$ionicPopup","$timeout",function($scope,userModelService,$httpParamSerializer,$location, $ionicPopup, $timeout){
		   		
		   		// 一个提示对话框
		   $scope.showAlert = function(tit,tem) {
		     var alertPopup = $ionicPopup.alert({
		       title: tit,
		       template: tem
		     });
		     alertPopup.then(function(res) {
		       
		     });
		   };



		   		$scope.doRegister = function(){
		   			if($scope.pwd !== $scope.repwd){
		   				$scope.pass = true;
		   				return;
		   				
		   			}
		   			//console.log($scope.username);
		   			//console.log($scope.pwd);
		   			// 此处传递的参数应该是 串行化的字符串，但此处也可以传递对象(只要通过内置服务$httpParamSerializer,此服务可以将一个对象转换为串行化的格式)
		   			console.log($httpParamSerializer({
		   				username:$scope.username,
		   				password:$scope.pwd
		   			}));//参数是一个对象,把对象转化为一个序列化的字符串，POST要求的参数正好是一个序列化的字符串
		   			userModelService.postUser("register.php",$httpParamSerializer({
		   				username:$scope.username,
		   				password:$scope.pwd
		   			}),function(data){
		   				if(data.data.code === 0){
		   					$scope.showAlert("朵拉提醒","注册成功!请登录");
		   					$location.path("/login");
		   				}else{
		   					$scope.showAlert("朵拉提醒","注册失败");
		   				}
		   			},function(data){
		   				$scope.showAlert("朵拉提醒","注册失败");
		   				console.log(data);
		   			})
		   		}
		   		//验证用户名是否已经存在
		   		$scope.name = false;//默认用户名可用，页面打开时不会出现“用户名已存在”
		   		$scope.usernameCheck = function(){
		   			userModelService.postUser("usernamecheck.php",$httpParamSerializer({
		   				username:$scope.username
		   			}),function(data){
		   				console.log(data.data);

		   				if(data.data.code === 0){
		   					//$scope.name用于<span ng-show="name" style="color:red">用户名已存在!</span>
		   					$scope.name = true;//用户名已存在
		   					
		   					
		   					
		   				}else{
		   					$scope.name = false;//用户名可用
		   					
		   					
		   					
		   				}
		   				//判断用户名和密码是否已通过验证,
				   		if($scope.name || $scope.pass){
				   			$scope.submitcheck = true;
				   			
				   		}else{
				   			$scope.submitcheck = false;
				   			
				   		}

		   			},function(data){

		   			})
		   		}

		   		
		   }])
		   .controller("loginCtrl",["$scope","userModelService","$httpParamSerializer","$location","cookieService","$ionicPopup","$timeout",function($scope,userModelService,$httpParamSerializer,$location,cookieService,$ionicPopup,$timeout){
		   		$scope.showAlert = function(tit,tem) {
				    var alertPopup = $ionicPopup.alert({
				       title: tit,
				       template: tem
				    });
				     alertPopup.then(function(res) {
				     
				    });
				};
		   		$scope.doLogin = function(){
		   			userModelService.postUser("userInfoLogin.php",$httpParamSerializer({
		   				username:$scope.username,
		   				password:$scope.pwd
		   			}),function(response){
		   				 if(response.data.code === 0){
		   				 	// 执行登录，把用户名以及用户id存入cookie 跳转之前先将用户信息存入浏览器缓存cookie
		   				 	cookieService.setCookie("user",response.data.data["users_name"]);
		   				 	cookieService.setCookie("users_id",response.data.data["users_id"]);
		   				 	
		   				 	$scope.user.username = response.data.data['users_name'];
		   				 	$scope.showAlert("朵拉提醒","登录成功");
		   				 	//登录成功后显示购物车内商品数量（之前可能登录过，并添加过商品）
		   				 	$scope.countShopcar = $scope.countShopcarcopy;
		   				 	console.log($scope.countShopcarcopy);
		   				 	$location.path("/diyList");
		   				 }else{
		   				 	$scope.showAlert("朵拉提醒","登录失败"+response.data.data);
		   				 

		   				 }
		   				//console.log(response.data);
		   			},function(){
		   				$scope.showAlert("朵拉提醒","登录失败");
		   			})
		   		}
		   }])


})()