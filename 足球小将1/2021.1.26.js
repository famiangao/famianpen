//基本变量
const realWidth=200;
const realHeight=100;
const realPlayerSize=2;
const xmls="http://www.w3.org/2000/svg";
let playerId=0;//记录是哪个球员
let playerTeam=Object();//记录都生成了哪些球员
let webFootballingWidth;
let webFootBallingHeight;
let wabToReal;//真实尺寸*webToReal=虚拟尺寸
let picture=document.querySelector(".picture");
let ground=document.querySelector(".ground");
let player=document.querySelector(".player");
//设置canvas的长宽
window.onload=begin();
function begin() {
    ground.width=picture.offsetWidth;
    ground.height=picture.offsetHeight;
}
//工厂模式
///接口文件
var Interface=function (name,methods) {
    if(arguments.length<2){
        alert("必须是两个参数");
    }
    this.name=name;
    this.methods=Array();
    for(let i=0;i<methods.length;i++){
        if(typeof methods[i]!="string"){
            alert("函数名必须是字符串类型");
        }else {
            this.methods.push(methods[i]);
        }
    }

};
Interface.ensureImplement=function (object) {
    if(arguments.length<2){
        throw  new Error("参数必须不少于两个");
        return false;
    }
    for(var i=1;i<arguments.length;i++){
        var inter=arguments[i];
        if(inter.constructor!=Interface){
            throw  new Error("如果是接口类的话，就必须是Interface类型");
        }
        for(let j=0;j<inter.methods.length;j++){
            let method=inter.methods[i];
            if(!object[method]||typeof object[method]!="function" ){//实现类中必须有方法名字与接口中所用方法名相同
                throw  new Error("实现类中没有完全实现接口中的所有方法")
            }
        }
    }
}
function footballing(width,height) {
    let groundWidth=ground.width;
    let groundHeight=ground.height;
    //width用groundWidth时height是多少
    let needHeight=groundWidth*height/width;
    //height用groundHeight时width是多少
    let needWidth=groundHeight*width/height;
    ground=ground.getContext('2d');
    ground.fillStyle="#7fbb41";
    if(needHeight<=groundHeight){
        webFootBallingHeight=needHeight;
        webFootballingWidth=groundWidth
        wabToReal=groundWidth/width;
        ground.fillRect(0,0,groundWidth,needHeight);
    }else {
        webFootballingWidth=needWidth;
        webFootBallingHeight=needHeight;
        wabToReal=needWidth/width;
        ground.fillRect(0,0,needWidth,groundHeight);
    }
}
footballing(realWidth,realHeight);
function Player() {
    this.id="player"+playerId++;
    let webPlayerSize=realPlayerSize*wabToReal;
    let svg=document.createElementNS(xmls,"svg");
    svg.setAttribute("width",webPlayerSize*3);
    svg.setAttribute("height",webPlayerSize*3);
    svg.setAttribute("class",this.id);
    let circle=document.createElementNS(xmls,"circle");
    circle.setAttribute("r",webPlayerSize);
    circle.setAttribute("cx","11");
    circle.setAttribute("cy","11");
    let rgb="rgb("+Math.random()*200+",0,"+Math.random()*200+")";
    circle.setAttribute("fill",rgb);
    svg.appendChild(circle);
    player.appendChild(svg);
    this.VNum=Math.floor(Math.random()*98.99+1);
    this.VMax=Math.floor(6+(this.VNum-1)*(9/98));
    this.VNum=Math.floor(3+(this.VNum-1)*(4.5/98));
    this.burstTime=Math.floor(4-(Math.floor(Math.random()*98.99))*3/98);//需要多少秒后达到最高速度
    this.keepBurstTime=Math.floor(10+(Math.floor(Math.random()*98.99))*5/98);//达到最高速度后能维持多少秒
    console.log(webPlayerSize+" "+this.VNum+" "+this.VMax+" "+this.burstTime+" "+this.keepBurstTime);
    playerTeam[this.id]=this;
}
player.addEventListener("click",addSvgTransform);
let play0=new Player();
let play1=new Player();
let play2=new Player();
let play3=new Player();
let play4=new Player();


function addSvgTransform() {
    let allSvg=document.querySelectorAll(".player svg");
    let totalRoad=(Number(webFootballingWidth)-300)/wabToReal;//总共需要走的路
    for(let i=0;i<allSvg.length;i++){
        let thisId=allSvg[i].getAttribute("class");
        let thisPlayer=playerTeam[thisId];
        let transNum=bessel(totalRoad,thisPlayer.VNum,thisPlayer.VMax,thisPlayer.burstTime,thisPlayer.keepBurstTime);
        let moreNum=50
        allSvg[i].style="transform:  translateX("+(Number(webFootballingWidth)-moreNum)+"px)  translateY("+(Number(webFootBallingHeight)-moreNum)+"px);transition:  all "+transNum.time+" "+transNum.bessel;
    }
}
function bessel(totalRoad,VNum,VMax,burstTime,keepBurstTime) {
    //需要返回要用的时间和贝塞尔曲线的四个数字，返回一个对象
    let returnObject=Object();
    let beginRoad=VNum*burstTime;
    let beginTime=beginRoad/VNum;
    if(beginRoad>=totalRoad){
        returnObject.time=totalRoad/VNum;
        returnObject.bessel="cubic-bezier(.8,0,1,1)";
        returnObject.time=Math.floor(returnObject.time)+"s";
        return returnObject;//返回1
    }else {
        totalRoad-=beginRoad;
        returnObject.time=beginRoad/VNum;
    }
    let middleRoad=VMax*keepBurstTime;
    if(middleRoad>=totalRoad){
        let middleTime=totalRoad/VMax;
        returnObject.time+=middleTime;
        let temp=Math.ceil(middleTime/returnObject.time*100)/100;
        let B1=temp*2>1?temp:temp*2;
        returnObject.bessel="cubic-bezier("+B1+",0,0.85,1.25)";
        returnObject.time=Math.floor(returnObject.time)+"s";
        return returnObject;//返回2
    }else {
        totalRoad-=middleRoad;
        returnObject.time+=middleRoad/VMax;
    }
    let endRoad=VNum*totalRoad;
    let endTime=endRoad/VNum;
    returnObject.time+=endTime;
    let B1Temp=Math.ceil(beginTime/returnObject.time*100)/100;
    let B1=B1Temp*2>1?B1Temp:B1Temp*2;
    let B3Temp=Math.ceil(endTime/returnObject.time*100)/100;
    let B3=B3Temp*2>1?B3Temp:B3Temp*2;
    returnObject.bessel="cubic-bezier("+B1+",.01,"+B3+",1)";
    returnObject.time=Math.floor(returnObject.time)+"s";
    return returnObject;//返回3
}