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
function Waiter(id,name,pay,workTimes) {
    if(typeof Waiter.instance==="object"){
        return Waiter.instance;
    }
    Worker.call(this,id,name,pay,workTimes);

    Waiter.instance=this;
}
Waiter.prototype=Object.create(Worker.prototype);
Waiter.prototype.constructor=Waiter;
Waiter.prototype.finishWork=function (tasks) {
    if(typeof tasks=='object'){
        if(typeof Cooker.instance==="object"){
            console.log("送到厨师");
            Cooker.instance.finishWork();
            customerTeam.shift();
        }
        else {
            alert("没有厨师！>=<");
        }
    }else {
        console.log("送菜");

    }
    this.workTimes++;
}
function Cooker(id,name,pay,workTimes) {
    if(typeof Cooker.instance==="object"){
        return Waiter.instance;
    }
    Worker.call(this,id,name,pay,workTimes);

    Cooker.instance=this;
}
Cooker.prototype=Object.create(Worker.prototype);
Cooker.prototype.constructor=Waiter;
Cooker.prototype.finishWork=function(){
    this.workTimes++;
    console.log("finish cook");
    Waiter.instance.finishWork();

}

let customerTeam=Array();
function Customer() {
    customerTeam.push(this);
}
Customer.prototype.order=function () {
    if(customerTeam[0]===this){
        let menuSize=menu.length;
        let orderNum;
        if(menuSize===0){
            orderNum=0;
        }else {
            orderNum=Math.ceil(Math.random()*(menuSize-0.1)+0.1);
        }
        let order=Array();
        while (orderNum>0){
            let arriveMune=Math.ceil(Math.random()*(menuSize-0.1)+0.1)-1;
            order.push(menu[arriveMune].name);
            orderNum--;
        }
        ///然后找个服务员来服务
        if(typeof Waiter.instance==="object"){
            Waiter.instance.finishWork(order);
        }
        else {
            alert("没有服务员！>=<");
        }
    }else {
        alert("请稍后，还没有到你:)")
    }

}
Customer.prototype.eat=function () {

}
let menu=Array();
//this代表的是新建的实例
function Variety(name,cost,price) {
    this.name=name;
    this.cost=cost;
    this.price=price;
}
Variety.prototype.addMenu=function() {

    menu.push(this);
    console.log("success add "+this.name);
}
