// var a = 1; 
// function callback() { 
//     console.log(a, this) 
// } 
// function fn(c) { 
//     var a = 2 
//     //  函数甲种调用模式
//     // 函数调用模式：函数()
//     // 方法调用模式：对象.方法()
//     // 构造函数调用模式：new Function()
//     // 上下文调用模式：context  函数.call(this)  函数.apply(this)
//     c() 
// } 

// fn(callback)
var obj = {
    name:'jack',
    age:20,
    sayHi:function(){
        console.log(name+":"+age);
    }
}

obj.sayHi();