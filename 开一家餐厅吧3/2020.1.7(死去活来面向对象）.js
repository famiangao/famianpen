
let customerTeam=Array();
let menu=Array();
let allEatFood=Array();
let fodList=Array();
const timeUnit=1000;///1000=1秒
let cost=document.querySelector("#cost span");
let cookerState=document.querySelector(".cooker #state");
let cookWhat=document.querySelector("#cookWhat");
let cookName=document.querySelector("#cookName span");
let cookNeedTime=document.querySelector("#cookNeedTime span");
let surplusCookUl=document.querySelector("#surplusCook ul");
let surplusCookP=document.querySelector("#surplusCook p");
let waiterContent=document.querySelector("#position span:nth-of-type(2)");
let eating=document.querySelector("#eating");
let eatTeam=document.querySelector("#eatTeam span");
let noWaiter=document.querySelector("#noWaiter");

function Restaurant(cash,seats,staff) {
    this.cash=cash;
    this.seats=seats;
    this.staff=staff;
}
Restaurant.prototype.hire=function (person) {
    this.staff.push(person.id);
}
Restaurant.prototype.fire=function (person) {
    let num=this.staff.indexOf(person.id);
    if(num!==-1){
        this.staff.splice(num,1);
    }
}
function Worker(id,name,pay,workTimes) {
    this.id=id;
    this.name=name;
    this.pay=pay;
    this.workTimes=workTimes;
}
Worker.prototype.finishWork=function () {
    this.workTimes++;
}
//定义厨师
function Cooker(id,name,pay,workTimes) {
    if(typeof Cooker.instance==="object"){
        return Waiter.instance;
    }
    Worker.call(this,id,name,pay,workTimes);

    Cooker.instance=this;
    console.log("cooker1");
    cookerState.textContent="空闲";
}
Cooker.prototype=Object.create(Worker.prototype);
Cooker.prototype.constructor=Cooker;
Cooker.prototype.finishWork=function(cookMenu){
            cookName.textContent=cookMenu[0].name;
            new Promise(function (resolve, reject) {
            this.workTimes++;
            let time=cookMenu[0].time;
            let needTime=time*timeUnit*3;
            setTimeout(resolve,needTime,[cookMenu[0],cookMenu.length]);
            //设置厨师做菜倒计时
            let i=needTime;
            setTimeout(countTime,1000,i);
            function countTime(i){
                cookNeedTime.textContent=i/1000+"s";
                i-=1000;
                if (i!=0){
                    setTimeout(countTime,1000,i);
                }
            }
                cookMenu.shift();
            //设置厨师还有做什么菜
            if(cookMenu.length===0){
                surplusCookUl.textContent="";
                surplusCookP.textContent="没有要做的菜品了";
            }
            else {
                surplusCookUl.textContent="";
                for (let i=0;i<cookMenu.length;i++){
                    let li=document.createElement("li");
                    li.textContent="     "+cookMenu[i].name;
                    surplusCookUl.appendChild(li);
                }
            }
             }).then(function (food) {
                console.log("厨师："+food[0].name+"做好啦");
                //查看服务员在哪，是直接给服务员还是放在列表里面
                let waiterContentX=waiterContent.textContent;
                if(waiterContentX!=="后厨"||fodList.length!==0){
                    fodList.push(food[0]);
                }else {
                    Waiter.instance.finishWork(food[0]);
                }
                //设置厨师是继续工作还是休息
                if(food[1]===1){
                    cookWhat.style="display:none";
                    cookerState.textContent="空闲";
                }else {
                    Cooker.instance.finishWork(cookMenu);
                }
            })


}
//厨师定义完毕
//定义服务员
function Waiter(id,name,pay,workTimes) {
    if(typeof Waiter.instance==="object"){
        return Waiter.instance;
    }
    Worker.call(this,id,name,pay,workTimes);

    Waiter.instance=this;
    waiterContent.textContent="餐厅"
    noWaiter.style="display: inline-block";
}
Waiter.prototype=Object.create(Worker.prototype);
Waiter.prototype.constructor=Waiter;
Waiter.prototype.finishWork=function (tasks) {
    if(tasks[0]){
        if(typeof Cooker.instance==="object"){
            console.log("服务员：把客人订单送到厨师");
            waiterContent.textContent="餐厅-->后厨";
            setTimeout(tocooker,timeUnit*3);
            function tocooker(){
                //避免厨师的重复调用，先定义
                waiterContent.textContent="后厨";
                cookerState.textContent="正在做菜";
                cookWhat.style="display:block";
                Cooker.instance.finishWork(tasks);
            }
        }
        else {
            alert("没有厨师！>=<");
        }
    }else {
        console.log("服务员：送"+tasks.name);
        waiterContent.textContent="后厨-->餐厅";
        setTimeout(toCustomer,timeUnit*3);
        function toCustomer() {
            waiterContent.textContent="餐厅";
            //判断服务员是否需要继续上菜
            if( customerTeam[0].orderFoodNum>1){
                waiterContent.textContent="餐厅-->后厨";
                setTimeout(tocooker,timeUnit*3);
                function tocooker(){
                    waiterContent.textContent="后厨";
                    if(fodList.length!==0){
                        Waiter.instance.finishWork(fodList.shift());
                    }
                }
            }else {

            }
            //判断客人是否吃
            if(allEatFood[0]){
                allEatFood.push(tasks);
            }
            else {
                allEatFood.push(tasks);
                customerTeam[0].eat();
            }

        }

    }
    this.workTimes++;
}
//服务员定义完毕
//定义顾客
function Customer() {
    this.orderFood=false;
    this.orderFoodNum=0;
    this.orderFoodMoney=0;
    if(customerTeam[0]){
        customerTeam.push(this);
        let customerNum=Number(eatTeam.textContent);
        eatTeam.textContent=customerNum+1;
    }else {
        customerTeam.push(this);
        customerTeam[0].order();
        eating.textContent="新的客人坐下吃饭"
    }
}
Customer.prototype.order=function(){
    let customerX=this;
    return new Promise(function (resolve, reject) {
        if(customerTeam[0]===customerX&&!customerX.orderFood){
            ///然后找个服务员来服务
            if(typeof Waiter.instance==="object"){
                console.log("客人顺利入座");
                eating.textContent="客人正在点吃的";
                setTimeout(resolve,3*timeUnit);
            }
            else {
                alert("没有服务员！>=<");
            }
        }else {
            alert("请稍后，还没有到你:)")
        }

    }).then(function () {
        let menuSize=menu.length;
        let orderNum;
        if(menuSize===0){
            orderNum=0;
        }else {
            orderNum=Math.ceil(Math.random()*(menuSize-0.1)+0.1);
        }
        //定义是否点了餐和点了多少餐
        customerX.orderFood=true;
        customerX.orderFoodNum=orderNum;
        let order=Array();
        let orderList=Array();
        while (orderNum>0){
            let arriveMune=Math.ceil(Math.random()*(menuSize-0.1)+0.1)-1;
            order.push(menu[arriveMune]);
            orderNum--;
            orderList.push(menu[arriveMune].name);
            customerX.orderFoodMoney+=menu[arriveMune].price;

        }
        console.log("我要点"+orderList.join(" "));
        eating.textContent="客人点了餐等待上菜";

        Waiter.instance.finishWork(order);
    })
}
Customer.prototype.eat=function () {
    let customer=this;
    return new Promise(function (resolve, reject) {

        customer.orderFoodNum--;
        eating.textContent="正在吃"+allEatFood[0].name;
        setTimeout(resolve,timeUnit*2);



    }).then(function () {
        let arriveFood=allEatFood.shift();
        console.log("我吃了"+arriveFood.name);
        eating.textContent="客人正在餐桌等待";
        //看还有食物没有吃，有的话继续吃
        if(allEatFood.length>0){
            customer.eat();
        }
        //计算是否还有订单，没有就离开
        if(customer.orderFoodNum===0&&allEatFood.length===0){
            console.log("客人心满意足离开了，付了"+customerTeam[0].orderFoodMoney+"元钱");
            //设置总金额在网页上的的变化
            let oldMoney=Number(cost.textContent);
            cost.textContent=customerTeam[0].orderFoodMoney+oldMoney;
            //移除客人，客人离开
            customerTeam.shift();
            //看接下来是否还有人来
            if(customerTeam[0]){
                console.log("店里来了新的客人");
                let customerNum=Number(eatTeam.textContent);
                eatTeam.textContent=customerNum-1;
                eating.textContent="新的客人坐下吃饭"
                customerTeam[0].order();
            }else {
                eating.textContent="无人正在吃饭"
            }
        }

    })
}
//顾客定义完毕
//定义菜单
//this代表的是新建的实例
function Variety(name,cost,price,time) {
    this.name=name;
    this.cost=cost;
    this.price=price;
    this.time=time;
}
Variety.prototype.addMenu=function() {

    menu.push(this);
    console.log("success add "+this.name);
}
