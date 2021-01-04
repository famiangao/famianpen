showTable.onmouseover=function (e) {
    if(e.target.nodeName==="TD"&&e.target.parentNode.getAttribute("under")){
        canvasPartF(e);
        barChartF(e);
    }
}
showTable.onmouseout=function (e) {
    if(e.target.nodeName!=="INPUT"&&e.target.nodeName!=="TD"){

        canvasTotalF(e);
    }
}
function canvasPartF(e) {
    let canvas=document.getElementById("canvasPart").getContext("2d");
    canvas.clearRect(0,0,500,500);
    let xxxxxx=e.target;
    let canvasAimArray=e.target.parentNode.getAttribute("under").split(" ");
    canvas.beginPath();
    canvas.moveTo(50,0);
    canvas.lineTo(50,300);
    canvas.lineTo(350,300);
    canvas.stroke();
    for (let i=0;i<sourceData.length;i++){
        if(sourceData[i].region==canvasAimArray[0]&&sourceData[i].product==canvasAimArray[1]){
            let sale=Array;
            if(localStorage.getItem(canvasAimArray.join(" ")+"1")){
                for (let jj=0;jj<12;jj++){
                    sale[jj]=Number(localStorage.getItem(canvasAimArray.join(" ")+jj));
                }
            }
            else {
                sale=sourceData[i].sale;
            }
            let maxSale=0;
            for(let j=0;j<12;j++){
                if(maxSale<sale[j])maxSale=sale[j];
            }
            let moonLen=Math.ceil(maxSale/5);
            let step=300/(Math.ceil(maxSale/10)*10);
            step=Math.floor((step-step*0.05)*1000)/1000;
            for (let i=0;i<=maxSale+maxSale*0.1;i+=moonLen){
                let zzz=300-i*step;
                canvas.beginPath();
                canvas.moveTo(45,300-i*step);
                canvas.lineTo(50,300-i*step);
                canvas.stroke();
                canvas.font="12px serif";
                canvas.fillText(i,20,300-i*step);
            }
            let dateAt;


            dateAt=i;
            let fillCircle=new Path2D();
            let textCan=new Path2D();
            let moonStep=300/13;
            canvas.beginPath();
            //let rgb="#"+Math.floor(Math.random()*899999+100000);
            let rgb="rgb("+Math.random()*255+","+Math.random()*255+",0)";
            canvas.strokeStyle=rgb;
            canvas.moveTo(moonStep+50,300-sale[0]*step);
            fillCircle.arc(moonStep+50,300-sale[0]*step,3,0,2*Math.PI);
            canvas.fillText("1月",moonStep+40,320);

            for(let i=1;i<12;i++){
                fillCircle.moveTo((i+1)*moonStep+50,300-sale[i]*step);
                canvas.lineTo((i+1)*moonStep+50,300-sale[i]*step);
                fillCircle.arc((i+1)*moonStep+50,300-sale[i]*step,3,0,2*Math.PI);
                canvas.fillText(i+1+"月",(i+1)*moonStep+40,320);
            }
            canvas.stroke();
            canvas.fill(fillCircle);
        }


    }



}
function barChartF(e) {
    let barChartDiv=document.getElementById("bar_chart");
    barChartDiv.style="font-size: 13px;";
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
    //画横竖的线
    let line=document.createElementNS(xmls,"line");
    line.setAttribute("x1",33);
    line.setAttribute("y1",5);
    line.setAttribute("x2",33);
    line.setAttribute("y2",300);
    line.setAttribute("stroke","black");
    line.setAttribute("stroke-width","2");
    barChart.appendChild(line);

    let line1=document.createElementNS(xmls,"line");
    line1.setAttribute("x1",33);
    line1.setAttribute("y1",300);
    line1.setAttribute("x2",350);
    line1.setAttribute("y2",300);
    line1.setAttribute("stroke","black");
    line1.setAttribute("stroke-width","2");
    barChart.appendChild(line1);

    for(let i=0;i<sourceData.length;i++){
        if(sourceData[i].product===barChartAimArray[1]&&sourceData[i].region===barChartAimArray[0]){
            let sale=Array;
            if(localStorage.getItem(barChartAimArray.join(" ")+"1")){
                for (let jj=0;jj<12;jj++){
                    sale[jj]=Number(localStorage.getItem(barChartAimArray.join(" ")+jj));
                }
            }
            else {
                sale=sourceData[i].sale;
            }
            let maxSale=0;
            for(let j=0;j<12;j++){
                if(maxSale<sale[j])maxSale=sale[j];
            }
            let moonLen=Math.ceil(maxSale/5);
            let step=300/(Math.ceil(maxSale/10)*10);
            step=Math.floor((step-step*0.05)*1000)/1000;

            for(let i=0;i<=maxSale+maxSale*0.1;i+=moonLen){
                let line=document.createElementNS(xmls,"line");
                let text=document.createElementNS(xmls,"text");
                line.setAttribute("x1",30);
                line.setAttribute("y1",300-i*step);
                line.setAttribute("x2",33);
                line.setAttribute("y2",300-i*step);
                line.setAttribute("stroke","black");
                line.setAttribute("stroke-width","2");
                text.setAttribute("x",0);
                text.setAttribute("y",305-i*step);
                text.textContent=i;

                barChart.appendChild(line);
                barChart.appendChild(text);
            }
            let aimNum;

            aimNum=i;
            let widthMoon=300/24;
            for(let i=0;i<12;i++){
                let rect=document.createElementNS(xmls,"rect");
                let text=document.createElementNS(xmls,"text");
                rect.setAttribute("width",widthMoon);
                rect.setAttribute("height",sale[i]*step);
                rect.setAttribute("x",widthMoon*2*i+34);
                rect.setAttribute("y",299-sale[i]*step);
                rect.style="fill:blue;"
                barChart.appendChild(rect);
                text.textContent=i+1+"月";
                text.setAttribute("y","325");
                text.setAttribute("x",widthMoon*2*i+34);
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
    canvas.moveTo(50,0);
    canvas.lineTo(50,300);
    canvas.lineTo(350,300);
    canvas.stroke();
    let maxSale=0;
    for(let j=0;j<sourceData.length;j++){
        if(localStorage.getItem(sourceData[j].region+" "+sourceData[j].product+"1")){
            for (let k=0;k<12;k++){
                let numSale=Number(localStorage.getItem(sourceData[j].region+" "+sourceData[j].product+k));
                if(maxSale<numSale)maxSale=numSale;
            }
        }else {
            for (let k=0;k<12;k++){
                if(maxSale<sourceData[j].sale[k])maxSale=sourceData[j].sale[k];
            }
        }
    }
    let step=300/(Math.ceil(maxSale/10)*10);
    step=Math.floor((step-step*0.05)*1000)/1000;
    let moonLen=Math.ceil(maxSale/5);
    for (let i=0;i<=maxSale+maxSale*0.1;i+=moonLen){
        let zzz=300-i*step;
        canvas.beginPath();
        canvas.moveTo(45,300-i*step);
        canvas.lineTo(50,300-i*step);
        canvas.stroke();
        canvas.font="12px serif";
        canvas.fillText(i,20,300-i*step);
    }
    let dateAt;
    let moonStep=300/13;
    for (let i=0;i<sourceData.length;i++){
        let sale=Array;
        if(localStorage.getItem(sourceData[i].region+" "+sourceData[i].product+"1")){
            for (let jj=0;jj<12;jj++){
                sale[jj]=Number(localStorage.getItem(sourceData[i].region+" "+sourceData[i].product+jj));
            }
        }
        else {
            sale=sourceData[i].sale;
        }
        dateAt=i;
        let fillCircle=new Path2D();
        canvas.beginPath();
        //let rgb="#"+Math.floor(Math.random()*899999+100000);
        let rgb="rgb("+Math.random()*255+","+Math.random()*255+",0)";
        canvas.strokeStyle=rgb;
        canvas.moveTo(moonStep+50,300-sale[0]*step);
        fillCircle.arc(moonStep+50,300-sale[0]*step,3,0,2*Math.PI);

        for(let i=1;i<12;i++){
            fillCircle.moveTo((i+1)*moonStep+50,300-sale[i]*step);
            canvas.lineTo((i+1)*moonStep+50,300-sale[i]*step);
            fillCircle.arc((i+1)*moonStep+50,300-sale[i]*step,3,0,2*Math.PI);
        }
        canvas.stroke();
        canvas.fill(fillCircle);

    }
    canvas.fillText("1月",moonStep+40,320);

    for(let i=1;i<12;i++){
        canvas.fillText(i+1+"月",(i+1)*moonStep+40,320);
    }
    canvas.stroke();
}