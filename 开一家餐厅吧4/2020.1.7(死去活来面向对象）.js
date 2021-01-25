
let customerTeam=Array();
let menu=Array();
let allEatFood=Array();
allEatFood[0]=Array();
allEatFood[1]=Array();
allEatFood[2]=Array();
let foodList=Array();
let cookMenu=Array();
//用于服务员不在餐厅时存客人点的菜，结构为[[[餐品，table],[餐品，table].....],[[餐品，table],[餐品，table].....]...]
let customerOrderArray=Array();
//建立服务员组，结构为[[服务员1],[服务员2]....]
let waiterArray=Array();
//建立厨师组，结构为[[厨师1],[厨师2]......]
let cookerArray=Array();
const timeUnit=1000;///1000=1秒
const restaurant="餐厅";
const kitchen="后厨";

let cost=document.querySelector("#cost span");
let cookerDefind=document.querySelector(".cookerDefind");
let beginCook=document.querySelector(".beginCook");
let cookerPeople=document.querySelector(".cookerPeople");
// let cookName=document.querySelector("#cookName span");
// let cookNeedTime=document.querySelector("#cookNeedTime span");
let surplusCookUl=document.querySelector("#surplusCook ul");
let surplusCookP=document.querySelector("#surplusCook p");
///服务员未定义
let waiterDefind=document.querySelector(".waiterDefind");
///服务员列表
let waiterPeople=document.querySelector(".waiterPeople");
let eating1=document.querySelector("#eating1");
let eating2=document.querySelector("#eating2");
let eatTeam=document.querySelectorAll(".eatTeam span");
let noWaiter=document.querySelector("#noWaiter");
let begin=document.querySelector("#begin");
let close=document.querySelector("#close");
let addWaiter=document.querySelector(".addWaiter");
let addCooker=document.querySelector(".addCooker");
let fireWaiter=document.querySelector(".fireWaiter");
let fireCooker=document.querySelector(".fireCooker");
let cookerId=0;
let waiterId=0;
if(sessionStorage.haveMoney){
    cost.textContent=sessionStorage.haveMoney;
}

function table(x) {
    this.work=false;
    this.id=x;
    this.people;
}
let table1=new table(1);
let table2=new table(2);
///点击begin，初始化
begin.onclick=function () {
    var m1=new Variety("宫保鸡丁",10,100,1);
    var m2=new Variety("鱼香肉丝",15,150,3);
    var m3=new Variety("梅菜扣肉",20,300,5);
    var m4=new Variety("爆椒鱼头",30,500,6);
    var m5=new Variety("油焖仓鼠",80,1000,8);
    m1.addMenu();
    m2.addMenu();
    m3.addMenu();
    m4.addMenu();
    m5.addMenu();
    var w1=new Waiter("waiter",10,1000);
    var co1=new Cooker("cooker",10,100);
    newCustomer();
}
function newCustomer() {
    if(customerTeam.length<6){
        var cu1=new Customer();
    }
    let time=Math.floor(Math.random()*10+10);
    setTimeout(newCustomer,time*1000);
}
close.onclick=function(){
    let totalMoney=cost.textContent;
    sessionStorage.haveMoney=Number(totalMoney);
    alert("总共赚了"+totalMoney+"元");
    location.reload();
}
//设置addWaiter按钮被点击之后
addWaiter.onclick=function () {
    if(waiterArray.length>=3){
        alert("最多有三个服务员");
        return;
    }
    var w1=new Waiter("waiter",10,1000);
}
addCooker.onclick=function () {
    if(cookerArray.length>=3){
        alert("最多有三个厨师");
        return;
    }
    var co1=new Cooker("cooker",10,100);
}
fireWaiter.onclick=function () {
    if(waiterArray.length<=1){
        alert("至少有一个服务员");
        return;
    }
    let thisFireWaiter=waiterArray.pop();
    waiterId--;
    let waiterUl=document.querySelector(".waiterId" + thisFireWaiter.id);
    waiterUl.parentNode.removeChild(waiterUl);
}
fireCooker.onclick=function () {
    if(cookerArray.length<=1){
        alert("至少有一个服务员");
        return;
    }
    let thisFireCooker=cookerArray.pop();
    cookerId--;
    let cookerUl=document.querySelector(".cookerId" + thisFireCooker.id);
    cookerUl.parentNode.removeChild(cookerUl);
}
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
//定义初始化厨师节点
let Cul=document.createElement("ul");
let Cli1=document.createElement("li");
let Cli2=document.createElement("li");
let Cli3=document.createElement("li");
let Cspan1=document.createElement("span");
let Cspan2=document.createElement("span");
let div1=document.createElement("div");
let div2=document.createElement("div");
Cli1.className="cookerName";

Cli2.textContent="正在做：";
Cspan1.className="cooking";
Cli2.appendChild(Cspan1);

Cli3.textContent="还需要：";
Cspan2.className="cookerNeedTime";
Cli3.appendChild(Cspan2);

div1.className="cookerFree";
div1.textContent="空闲";
div1.style="display:block";
div2.className="cookerWork";
div2.appendChild(Cli2);
div2.appendChild(Cli3);
div2.style="display:none";

Cul.appendChild(Cli1);
Cul.appendChild(div1);
Cul.appendChild(div2);



function Cooker(name,pay,workTimes) {
    Worker.call(this,cookerId++,name,pay,workTimes);

    console.log("cooker"+this.id);
    cookerDefind.style="display:none";
    beginCook.style="display:block";
    cookerArray.push(this);
    addCookerShow(this.id);
}
//在页面中增加厨师x号
//ul的class是cookerId+"x"(x从0开始计数）
function addCookerShow(x){

    let newCooker=Cul.cloneNode(true);
    newCooker.className="cookerId"+x;
    let li1=newCooker.querySelector(".cookerName");
    li1.textContent="厨师"+(x+1)+"号";
    cookerPeople.appendChild(newCooker);
}
Cooker.prototype=Object.create(Worker.prototype);
Cooker.prototype.constructor=Cooker;
Cooker.prototype.finishWork=function(){
    let cooking=document.querySelector(".cookerId"+this.id+" .cooking");
    let thisCooker=this;
    cooking.textContent=cookMenu[0][0].name;
        new Promise(function (resolve, reject) {
            thisCooker.workTimes++;
            let time=cookMenu[0][0].time;
            let needTime=time*timeUnit*3;
            let sameCookList=Array();
            sameCookList[0]= cookMenu.shift();
            let cookName=sameCookList[0][0].name;
            for (let i=0;i<cookMenu.length;i++){
                if(cookMenu[i][0].name===cookName){
                    sameCookList.push(cookMenu[i]);
                    cookMenu.splice(i,1);
                }
            }
            setTimeout(resolve,needTime,[sameCookList,cookMenu.length]);
            //设置厨师做菜倒计时
            let i=needTime;
            let  cookNeedTime=document.querySelector(".cookerId"+thisCooker.id+" .cookerNeedTime");
            setTimeout(countTime,1000,i);
            function countTime(i){
                cookNeedTime.textContent=i/1000+"s";
                i-=1000;
                if (i!=0){
                    setTimeout(countTime,1000,i);
                }
            }
            //设置厨师还有做什么菜
            if(cookMenu.length===0){
                surplusCookUl.textContent="";
                surplusCookP.textContent="没有要做的菜品";
            }
            else {
                surplusCookUl.textContent="";
                surplusCookP.textContent="还要做:";
                for (let i=0;i<cookMenu.length;i++){
                    let li=document.createElement("li");
                    li.textContent="     "+cookMenu[i][0].name;
                    surplusCookUl.appendChild(li);
                }
            }
        }).then(function (food) {
            for(let i=0;i<food[0].length;i++){
                console.log("厨师：第"+food[0][i][1].id+"桌的"+food[0][i][0].name+"做好啦");
            }
            //查看服务员在哪，是直接给服务员还是放在列表里面
            cooker_waiter(food[0]);
            //设置厨师是继续工作还是休息
            let cookerFree=document.querySelector(".cookerId"+thisCooker.id+" .cookerFree");
            let cookerWork=document.querySelector(".cookerId"+thisCooker.id+" .cookerWork");
            if(cookMenu.length===0){
                cookerFree.textContent="空闲";
                cookerWork.style="display:none";
            }else {
                thisCooker.finishWork(cookMenu);
            }
        })

}
function cooker_waiter(food){
    if(foodList.length===0) {
        for (let i = 0; i < waiterArray.length; i++) {
            ///查看第i个服务员在哪里
            let position = document.querySelector(".waiterId" + i + " .waiterPosition");
            //如果第i个服务员在餐厅
            if (position.textContent === kitchen) {
                waiterArray[i].finishWork(food,1);
                return
            }
        }
    }
    foodList.push(food);

}
function waiter_cooker(order){
    if(cookerArray[0]===undefined){
        alert("没有厨师");
        return;
    }
    //检查是否全部厨师都是空闲
    let haveCookerFree=false
    for (let i = 0; i < cookerArray.length; i++) {
        let cookerFree=document.querySelector(".cookerId"+i+" .cookerFree");
        if(cookerFree.textContent==="空闲"){
            haveCookerFree=true;
            break;
        }
    }
    if(cookMenu.length===0){
        cookMenu=order;
    }
    else {
        cookMenu.push.apply(cookMenu,order);
    }
    //设置是否给厨师传递任务
    if(haveCookerFree){
        for (let i = 0; i < cookerArray.length; i++) {
            let position=document.querySelector(".cookerId"+i);
            let positionFree=position.querySelector(".cookerFree");
            let positionWork=position.querySelector(".cookerWork");
            if(positionFree.textContent==="空闲"){
                positionFree.textContent="";
                positionWork.style="display:block";
                cookerArray[i].finishWork();
                if(cookMenu.length===0){
                    return;
                }
            }
        }
    }

}
//厨师定义完毕

//定义服务员
//定义初始化服务员节点

let ul=document.createElement("ul");
let li1=document.createElement("li");
let li2=document.createElement("li");
li1.className="waiterName";
let span=document.createElement("span");
span.className="waiterPosition";
li2.textContent="位置:"
li2.appendChild(span);
ul.appendChild(li1);
ul.appendChild(li2);
function Waiter(name,pay,workTimes) {
    Worker.call(this,waiterId++,name,pay,workTimes);

    waiterArray.push(this);
    waiterDefind.style="display:none";
    addWaiterShow(waiterArray.length-1)

}
//在页面中增加服务员x号
//服务员x号全部写在waitPeople标签内，每一位服务员用一个ul来表示
//ul的class是waiterId+"x"(x从0开始计数）
function addWaiterShow(x){
    let newWaiter=ul.cloneNode(true);
    newWaiter.className="waiterId"+x;
    let li1=newWaiter.querySelector(".waiterName");
    li1.textContent="服务员"+(x+1)+"号";
    let li2Span=newWaiter.querySelector(".waiterPosition");
    li2Span.textContent=restaurant;
    waiterPeople.appendChild(newWaiter);

}
Waiter.prototype=Object.create(Worker.prototype);
Waiter.prototype.constructor=Waiter;
//传入两个值是上菜，传入一个值是把菜单给厨师
Waiter.prototype.finishWork=function (order) {
    let thisWaiter=this;
    let waiterContent=document.querySelector(".waiterId"+this.id+" .waiterPosition");
    if(arguments[1]===undefined){
            console.log("服务员：把客人订单送到厨师");
            waiterContent.textContent="餐厅-->后厨";
            setTimeout(tocooker,timeUnit*3);
            function tocooker(){
                waiterContent.textContent=kitchen;
                waiter_cooker(order);
                //判断服务员是否需要继续上菜
               if(foodList.length!==0){
                    thisWaiter.finishWork(foodList.shift(),1);
                }
            }

}else {
         console.log("服务员：送"+order[0][0].name);
         waiterContent.textContent="后厨-->餐厅";
         setTimeout(toCustomer,timeUnit*3);
         function toCustomer() {
             waiterContent.textContent="餐厅";
            //检查是否全部厨师都是空闲
             let allCookerFree=true
             for (let i = 0; i < cookerArray.length; i++) {
                 let cookerFree=document.querySelector(".cookerId"+i+" .cookerFree");
                 if(cookerFree.textContent!=="空闲"){
                     allCookerFree=false;
                     break;
                 }
             }
             //判断是否有客人要点菜
             if(customerOrderArray.length!==0){
                thisWaiter.finishWork(customerOrderArray.shift());
             }
             //判断服务员是否需要继续上菜
             else if(!allCookerFree||foodList.length!==0){
                 waiterContent.textContent="餐厅-->后厨";
                 setTimeout(tocooker,timeUnit*3);
                 function tocooker(){
                     waiterContent.textContent="后厨";
                     if(foodList.length!==0){
                        thisWaiter.finishWork(foodList.shift(),1);
                     }
                 }
             }else {

             }
             //判断客人是否吃
             for (let i=0;i<order.length;i++) {
                 if (allEatFood[order[i][1].id][0]) {
                     allEatFood[order[i][1].id].push(order[i]);
                 } else {
                     allEatFood[order[i][1].id].push(order[i]);
                     order[i] [1].people.eat(order[i]);
                 }
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
    //看放在几号桌，或者放在排队里面
    if(table1.work===false){
        table1.work=true;
        table1.people=this;
        table1.people.order(table1);
    }else if(table2.work===false){
        table2.work=true;
        table2.people=this;
        table2.people.order(table2);
    }else {
        customerTeam.push(this);
        let customerNum=Number(eatTeam[0].textContent);
        for (let i in eatTeam){
            eatTeam[i].textContent=customerNum+1;
        }
    }

}
Customer.prototype.order=function(table){
    let eatingId="#eating"+(Number(table.id));
    let eating=document.querySelector(eatingId);
    let customerX=this;
    return new Promise(function (resolve, reject) {
        //如果有服务员
        if ( !customerX.orderFood) {
            console.log("客人顺利入座");
            eating.textContent="客人正在点吃的";
            setTimeout(resolve,3*timeUnit);
        }else alert("你已经点过食物了:)")
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
            order.push([menu[arriveMune],table]);
            orderNum--;
            orderList.push(menu[arriveMune].name);
            customerX.orderFoodMoney+=menu[arriveMune].price;

        }
        console.log("我要点"+orderList.join(" "));
        eating.textContent="客人等待上菜";

        customerOrder_Waiter(order);
    })
}
///建立order和waiter之间的连接
function customerOrder_Waiter(order){
    //检查是否雇佣服务员
    if(waiterArray[0]===undefined){
        alert("没有服务员");
        return;
    }
    if(customerOrderArray.length===0){
        for(let i=0;i<waiterArray.length;i++){
            ///查看第i个服务员在哪里
            let position=document.querySelector(".waiterId"+i+" .waiterPosition").textContent;
            //如果第i个服务员在餐厅
            if(position===restaurant){
                waiterArray[i].finishWork(order);
                return;
            }
        }
    }
    customerOrderArray.push(order);
}
Customer.prototype.eat=function (food) {
    let eatingId="#eating"+(Number(food[1].id));
    let eating=document.querySelector(eatingId);
    let customer=this;
    return new Promise(function (resolve, reject) {

        customer.orderFoodNum--;
        eating.textContent="正在吃"+allEatFood[food[1].id][0][0].name;
        setTimeout(resolve,timeUnit*2);



    }).then(function () {
        let arriveFood=allEatFood[food[1].id].shift();
        console.log("第"+food[1].id+"桌吃了"+arriveFood[0].name);
        eating.textContent="客人正在餐桌等待";
        //看还有食物没有吃，有的话继续吃
        if(allEatFood[food[1].id].length>0){
            customer.eat(allEatFood[food[1].id][0]);
        }
        //计算是否还有订单，没有就离开
        if(customer.orderFoodNum===0&&allEatFood[food[1].id].length===0){
            console.log("客人心满意足离开了，付了"+food[1].people.orderFoodMoney+"元钱");
            //设置总金额在网页上的的变化
            let oldMoney=Number(cost.textContent);
            cost.textContent=food[1].people.orderFoodMoney+oldMoney;
            //移除客人，客人离开
            food[1].work=false;
            //看接下来是否还有人来
            if(customerTeam[0]){
                console.log("新客人坐下吃饭");
                let customeirNum=Number(eatTeam[0].textContent);
                for (let i in eatTeam){
                    eatTeam[i].textContent=customerTeam.length-1;
                }
                let anoutherCustomer=customerTeam.shift();
                eating.textContent="新的客人坐下吃饭"
                food[1].work=true;
                food[1].people=anoutherCustomer;
                anoutherCustomer.order(food[1]);
            }else {
                eating.textContent="无人正在吃饭"
            }
        }

    })
}
function pushArray() {

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
