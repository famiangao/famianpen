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
    Worker.call(this,id,name,pay,workTimes);
}
Waiter.prototype=Object.create(Worker.prototype);
Waiter.prototype.constructor=Waiter;
Waiter.prototype.finishWork=function (tasks) {
    if(typeof tasks=='object'){

    }else {

    }
    this.workTimes++;
}
function Cooker(id,name,pay,workTimes) {
    Worker.call(this,id,name,pay,workTimes);
}
Cooker.prototype=Object.create(Worker.prototype);
Cooker.prototype.constructor=Waiter;
function Customer() {

}
Customer.prototype.order=function () {
    
}
Customer.prototype.eat=function () {

}
function Menu(name,cost,price) {
    this.name=name;
    this.cost=cost;
    this.price=price;
}
