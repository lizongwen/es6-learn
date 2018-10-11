function func1(){
	console.log("我是模块外")
}
function func2(){
	console.log("我是函数二")
}
export {func1 as f1,func2 as f2}
