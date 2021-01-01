showTable.onmouseover=function (e) {
    if(e.target.nodeName==="TD"&&e.target.parentNode.getAttribute("under")){
        canvasPartF(e);
        barChartF(e);
    }
}
showTable.onmouseout=function (e) {
    canvasTotalF(e);
}
function canvasPartF(e) {
    let canvas=document.getElementById("canvasPart").getContext("2d");
    canvas.clearRect(0,0,500,500);
    let xxxxxx=e.target;
    let canvasAimArray=e.target.parentNode.getAttribute("under").split(" ");
    canvas.beginPath();
    canvas.moveTo(50,50);
    canvas.lineTo(50,450);
    canvas.lineTo(450,450);
    canvas.stroke();
    for (let i=0;i<sourceData.length;i++){
        if(sourceData[i].region==canvasAimArray[0]&&sourceData[i].product==canvasAimArray[1]){
            let maxSale=0;
            for(let j=0;j<12;j++){
                if(maxSale<sourceData[i].sale[j])maxSale=sourceData[i].sale[j];
            }
            let moonLen=Math.ceil(maxSale/5);
            let step=400/(Math.ceil(maxSale/10)*10);
            step=Math.floor((step-step*0.1)*10)/10;
            for (let i=0;i<=maxSale+maxSale*0.1;i+=moonLen){
                let zzz=450-i*step;
                canvas.beginPath();
                canvas.moveTo(45,450-i*step);
                canvas.lineTo(50,450-i*step);
                canvas.stroke();
                canvas.font="13px serif";
                canvas.fillText(i,20,450-i*step);
            }
            let dateAt;


            dateAt=i;
            let fillCircle=new Path2D();
            let textCan=new Path2D();
            let moonStep=400/13;
            canvas.beginPath();
            //let rgb="#"+Math.floor(Math.random()*899999+100000);
            let rgb="rgb("+Math.random()*255+","+Math.random()*255+",0)";
            canvas.strokeStyle=rgb;
            canvas.moveTo(moonStep+50,450-sourceData[dateAt].sale[0]*step);
            fillCircle.arc(moonStep+50,450-sourceData[dateAt].sale[0]*step,3,0,2*Math.PI);
            canvas.fillText("1月",moonStep+50,470);

            for(let i=1;i<12;i++){
                fillCircle.moveTo((i+1)*moonStep+50,450-sourceData[dateAt].sale[i]*step);
                canvas.lineTo((i+1)*moonStep+50,450-sourceData[dateAt].sale[i]*step);
                fillCircle.arc((i+1)*moonStep+50,450-sourceData[dateAt].sale[i]*step,3,0,2*Math.PI);
                canvas.fillText(i+1+"月",(i+1)*moonStep+50,470);
            }
            canvas.stroke();
            canvas.fill(fillCircle);
        }


    }



}
function barChartF(e) {
    let barChartDiv=document.getElementById("bar_chart");
    let barChartAimArray=e.target.parentNode.getAttribute("under").split(" ");
    const xmls="http://www.w3.org/2000/svg";
    barChartDiv.style.display="block";
    let barChart;
    for(let i=0;i<barChartDiv.childNodes.length;i++){
        if(barChartDiv.childNodes[i].nodeName=="svg"){

            barChart=barChartDiv.childNodes[i];
            break;
        }
    }barChart.style.display="block";
    barChart.textContent="";
    let line=document.createElementNS(xmls,"line");
    line.setAttribute("x1",33);
    line.setAttribute("y1",5);
    line.setAttribute("x2",33);
    line.setAttribute("y2",405);
    line.setAttribute("stroke","black");
    line.setAttribute("stroke-width","2");
    barChart.appendChild(line);

    let line1=document.createElementNS(xmls,"line");
    line1.setAttribute("x1",33);
    line1.setAttribute("y1",405);
    line1.setAttribute("x2",555);
    line1.setAttribute("y2",405);
    line1.setAttribute("stroke","black");
    line1.setAttribute("stroke-width","2");
    barChart.appendChild(line1);

    for(let i=0;i<sourceData.length;i++){
        if(sourceData[i].product===barChartAimArray[1]&&sourceData[i].region===barChartAimArray[0]){

            let maxSale=0;
            for(let j=0;j<12;j++){
                if(maxSale<sourceData[i].sale[j])maxSale=sourceData[i].sale[j];
            }
            let moonLen=Math.ceil(maxSale/5);
            let step=400/(Math.ceil(maxSale/10)*10);
            step=Math.floor((step-step*0.1)*10)/10;

            for(let i=0;i<=maxSale+maxSale*0.1;i+=moonLen){
                let line=document.createElementNS(xmls,"line");
                let text=document.createElementNS(xmls,"text");
                line.setAttribute("x1",30);
                line.setAttribute("y1",405-i*step);
                line.setAttribute("x2",33);
                line.setAttribute("y2",405-i*step);
                line.setAttribute("stroke","black");
                line.setAttribute("stroke-width","2");
                text.setAttribute("x",0);
                text.setAttribute("y",410-i*step);
                text.textContent=i;

                barChart.appendChild(line);
                barChart.appendChild(text);
            }
            let aimNum;

            aimNum=i;

            for(let i=0;i<12;i++){
                let rect=document.createElementNS(xmls,"rect");
                let text=document.createElementNS(xmls,"text");
                rect.setAttribute("width","22");
                rect.setAttribute("height",sourceData[aimNum].sale[i]*step);
                rect.setAttribute("x",44*i+34);
                rect.setAttribute("y",405-sourceData[aimNum].sale[i]*step);
                rect.style="fill:blue;"
                barChart.appendChild(rect);
                text.textContent=i+1+"月";
                text.setAttribute("y","425");
                text.setAttribute("x",44*i+34);
                barChart.appendChild(text);
            }
            break;
        }
    }

}

function canvasTotalF(e) {
    let canvas=document.getElementById("canvasPart").getContext("2d");
    canvas.clearRect(0,0,500,500);
    canvas.beginPath();
    canvas.moveTo(50,50);
    canvas.lineTo(50,450);
    canvas.lineTo(450,450);
    canvas.stroke();
    let step=0.5;
    for (let i=0;i<=700;i+=50){
        let zzz=450-i*step;
        canvas.beginPath();
        canvas.moveTo(45,450-i*step);
        canvas.lineTo(50,450-i*step);
        canvas.stroke();
        canvas.font="13px serif";
        canvas.fillText(i,20,450-i*step);
    }
    let dateAt;
    for (let i=0;i<sourceData.length;i++){
        dateAt=i;
        let fillCircle=new Path2D();
        let moonStep=400/13;
        canvas.beginPath();
        //let rgb="#"+Math.floor(Math.random()*899999+100000);
        let rgb="rgb("+Math.random()*255+","+Math.random()*255+",0)";
        canvas.strokeStyle=rgb;
        canvas.moveTo(moonStep+50,450-sourceData[dateAt].sale[0]*step);
        fillCircle.arc(moonStep+50,450-sourceData[dateAt].sale[0]*step,3,0,2*Math.PI);

        for(let i=1;i<12;i++){
            fillCircle.moveTo((i+1)*moonStep+50,450-sourceData[dateAt].sale[i]*step);
            canvas.lineTo((i+1)*moonStep+50,450-sourceData[dateAt].sale[i]*step);
            fillCircle.arc((i+1)*moonStep+50,450-sourceData[dateAt].sale[i]*step,3,0,2*Math.PI);
        }
        canvas.stroke();
        canvas.fill(fillCircle);

    }
}