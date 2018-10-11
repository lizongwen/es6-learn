"use strict"
//变量声明
let m=1;
console.log(m);//1

//常量声明
const A=10;
console.log(A);//10
//A=10
//console.log(A);//报错，A已经被声明过了，不能再声明了
//F=30
//console.log(F);//报错，严格模式F未被声明不允许调用

//字符串：静态字符串用单引号，动态字符串用反引号
const a='foo';
const b='t';
const c='ball'
//const d=`连接${a}${b}${c}`;
//console.log(d);

//数组解构赋值
const [X,Y,Z]=[1,2,3];//数组解构const X=1,const Y=2,const Z=3

//对象解构赋值
function getFullName({firstName,lastName}){
	console.log(firstName,lastName)
}

getFullName({
	lastName:'zongwen',
	firstName:'li'//传递给形参同名的参数，所以位置可变动
})

function processInput({lleft,rright,ttop,bbottom}){
	return {lleft,rright,ttop,bbottom}
}
let {lleft,rright,ttop,bbottom} = processInput({lleft:1,rright:2,ttop:3,bbottom:4})
console.log(lleft,rright,ttop,bbottom);

//对象定义,单行定义最后省略逗号，多行定义最后不省略逗号
const obj1={k1:1,k2:2};
const obj2={
	k1:1,
	k2:2,
}
//const定义的对象不允许随意添加对象属性，要通过Object.assign方法添加属性
const obj3={};
obj3.x=3;
console.log(obj3)

const obj4 ={};
Object.assign(obj4,{x:4});
//或者如下写法,先定义x属性，值为空
const obj5={x:null};
obj5.x=5;

//对象属性名称可以用表达式动态生成
const obj6={
	id:6,
	["name"+1]:'li'
}
console.log(obj6['name1'])

function getName(name){
	return name;
}
const obj7={
	id:7,
	[getName('name')]:'li'
}
console.log(obj7['name']);


//对象的声明优化
let ref='go';
var obj8={
	ref,
};
console.log(obj8.ref);


//数组扩展运算符...
var items=["老王","35","爱好邻居"];
const itemCopy=[...items];
console.log(itemCopy);//["老王","35","爱好邻居"]

function test(...data){
	console.log(data)
	console.log(data instanceof Array)//true说明data是数组
}
test('老李',25,'足球');//["老李","25","足球"]

//Array.from方法将类似数组的对象转为数组
const divs=document.querySelectorAll('div');
const nodes=Array.from(divs);
console.log(nodes);//[div#1, div#2, div#3, div#4, div#5, div#6, div#7, div#8, div#9, div#10]


//函数
//箭头函数
(function(){
	console.log('welcome ES5');
})();

(()=>{
	console.log('welcome ES6');
})();

//数组map方法
let arryMap1=[1,2,3]
arryMap1.map(function(x){
	return x*x;
});
console.log(arryMap1)//1,4,9

var arryMap2=[4,5,6]
arryMap2.map((x)=>{
	return x*x;
});
console.log(arryMap2)//1,4,9

var arryMap3=[7,8,9]
arryMap3.map(x=>x*x);
console.log(arryMap3)//1,4,9

//箭头函数取代Function.prototype.bind
function getInfo(name,age){
	console.log('name:'+name,'age:'+age);
}
const boundMethod1=function(...params){
	return getInfo.apply(this,params);
}
boundMethod1('li','32');//name:li age:32

const boundMethod2=getInfo.bind(this);
boundMethod2('cl','33');//name:cl age:33

const boundMethod3=(...params)=>getInfo.apply(this,params);
boundMethod3('lzwcl','65')////name:lzwcl age:65


//this指向的改变
this._num=550;
const self1=this;

function show(data){
	console.log(this._num);
}
const boundMethod4=function (...params){
	//this._num=params;
	show.apply(self1,params);
}
boundMethod4(300);//550

//this指向的改变
this._num=550;
const self2=this;

function show(data){
	console.log(this._num);
}
const boundMethod5=function (...params){
	this._num=params;
	show.apply(self2,params);
}
new boundMethod5(300);//550

this.num1=500;
var f = {
	num1:'内部',
	p:function(){
		console.log(this.num1)
	}
}
var fn=f.p.bind(this);
fn();


//传递对象解构参数
function divide(a,b,{
	option1
}={}){
	console.log(option1);
}
divide('测试',22)//undefined
divide('测试',22,{option1:true})//true


//arguments数组对象转数组args，args数组转args字符串

function concatenateAll(){
	const args=Array.prototype.slice.call(arguments);
	return args.join('');
}
let str1=concatenateAll('arg1','arg2','arg3');
console.log(str1)//arg1arg2arg3
//改成
function concatenateAll(...args){
	return args.join('');
}
let str2=concatenateAll('arg4','arg5','arg6');
console.log(str2)//arg1arg2arg3


//给参数设置默认值
function handle(opts){
	opts= opts || {};
	console.log(opts)//abc
}
handle('abc');

function handle(opts={}){
	console.log(opts)//xyz
}
handle('xyz');

//Map用法
var arr=[["name","li"],["age",35]];
let map=new Map(arr);
map.set("hoby","JS");
console.log(map);
//for of循环，键
for(let key of map.keys()){
	console.log(key);//name age hoby
}
//值
for(let value of map.values()){
	console.log(value)//li 35 JS
}
//实体
for(let item of map.entries()){
	console.log(item)//["name","li"] ["age","35"] ["hoby","JS"]
}

//Class
class Queue {
	constructor(contents=[]){
		this._queue=[...contents];
	}
	pop(){
		const value = this._queue[0];
		this._queue.splice(0,1);
		return value;
	}
}
let queue=new Queue(["123","456","789"]);
let rs=queue.pop();
console.log(rs);


//extends实现继承
class PeekableQueue extends Queue{
	//新增的方法
	peek (){	
		return this._queue[0];
	}
	//重写父类的pop方法
	pop (){
		return this._queue[1]
	}
}

let peekablequeue =new PeekableQueue(["abc","efg","lmn"]);
let rs1=peekablequeue.peek();
let rs2=peekablequeue.pop();
console.log(rs1);
console.log(rs2);



//模块?

//节点生成器
function* helloWorldGenerator(){
	yield 'hello';
	yield 'world';
	return 'ending';
}

var hw=helloWorldGenerator();
console.log(hw.next());
console.log(hw.next());
console.log(hw.next());
