var stage=new createjs.Stage("gameView");
createjs.Ticker.setFPS(30);
createjs.Ticker.addEventListener("tick",stage)
var gameView=new createjs.Container();
gameView.x=30;
gameView.y=30;
stage.addChild(gameView);
var circArry=[[],[],[],[],[],[],[],[],[]];//圆圈数组
var currentCat;
var move_none=-1,move_left=0,move_up_left=1,
    move_up_right=2,move_right=3,move_down_right=4,move_down_left=5;
function getMoveDir(cat) {
    var distanceMAP = [];//当前位置
    //left
    var can = true;
    for (var x = cat.indexX; x>=0; x--) {
        if (circArry[x][cat.indexY].getCircleType() == Circle.TYPE_SELECTED) {
            can = false;
            distanceMAP[move_left] = cat.indexX - x;
            break;
        }
    }
    if (can) {
        return move_left;
    }
    //left up
    can = true;
    x = cat.indexX, y = cat.indexY;
    while (true) {
        if (circArry[x][y].getCircleType() == Circle.TYPE_SELECTED) {
            can = false
            distanceMAP[move_up_left] = cat.indexY - y;
            break;
        }
        if (y % 2 == 0) {//判断单双行
            x--;
        }
        y--;
        if (x < 0 || y < 0) {
            break;
        }
    }
    if (can) {
        return move_up_left
    };
    //right up
    can = true;
    x = cat.indexX, y = cat.indexY;
    while (true) {
        if(circArry[x][y].getCircleType() == Circle.TYPE_SELECTED) {
        can = false;
        distanceMAP[move_up_right] = cat.indexY - y;
        break;
    }
    if (y % 2 == 1) {
        x++;
    }
    y--;
    if (x > 8 || y < 0) {
        break;
    }
}
    if(can){
        return move_up_right;
    };
    //right
    can = true;
    for(var x=cat.indexX;x<9;x++){
        if (circArry[x][cat.indexY].getCircleType() == Circle.TYPE_SELECTED){
            can=false;
            distanceMAP[move_right] = x-cat.indexX;
            break;
        }
    }
    if(can){
        return move_right;
    };
    //right-down
    can=true;
    x = cat.indexX, y = cat.indexY;
    while (true){
        if(circArry[x][y].getCircleType()==Circle.TYPE_SELECTED){
            can=false;
            distanceMAP[move_down_right] =y-cat.indexY;
            break;
        }
        if(y%2==1){
            x++
        }
        y++;
        if(y>8||x>8){
            break;
        }
    }
    if(can){
        return move_down_right;
    };
    //left-down
    can=true;
    x = cat.indexX, y = cat.indexY;
    while (true){
        if(circArry[x][y].getCircleType()==Circle.TYPE_SELECTED){
            can=false;
            distanceMAP[move_down_left] =y-cat.indexY;
            break;
        }
        if(y%2==0){
            x--
        }
        y++;
        if(y>8||x<0){
            break;
        }
    }
    if (can){
        return move_down_left;
    };
    var maxDir=-1,maxValue=-1;
    for(var dir=0;dir<distanceMAP.length;dir++){
        if(distanceMAP[dir]>maxValue){
            maxValue=distanceMAP[dir];
            maxDir=dir;
        }
    }
    if(maxValue>1){
        return maxDir
    }else {
        return move_none;
    }
};
function circleClicked(event) {
    if(event.target.getCircleType() !=Circle.TYPE_CAT )
    {event.target.setCircleType(Circle.TYPE_SELECTED);}else { return;}
    if(currentCat.indexX==0||currentCat.indexX==8||currentCat.indexY==0||currentCat.indexY==8){
        alert("挑战失败，游戏结束！");
        return;
    }
    //判断设置六个方向的值
    var dir=getMoveDir(currentCat)
    switch (dir){
        case move_left:
            currentCat.setCircleType(Circle.TYPE_UNSELECTED);
            currentCat=circArry[currentCat.indexX-1][currentCat.indexY];
            currentCat.setCircleType(Circle.TYPE_CAT);
            break;
        case move_up_left:
            currentCat.setCircleType(Circle.TYPE_UNSELECTED);
            currentCat=circArry[currentCat.indexY%2?currentCat.indexX:currentCat.indexX-1][currentCat.indexY-1];
            currentCat.setCircleType(Circle.TYPE_CAT);
            break;
        case move_up_right:
            currentCat.setCircleType(Circle.TYPE_UNSELECTED);
            currentCat=circArry[currentCat.indexY%2?currentCat.indexX+1:currentCat.indexX][currentCat.indexY-1];
            currentCat.setCircleType(Circle.TYPE_CAT);
            break;
        case move_right:
            currentCat.setCircleType(Circle.TYPE_UNSELECTED);
            currentCat=circArry[currentCat.indexX+1][currentCat.indexY];
            currentCat.setCircleType(Circle.TYPE_CAT);
            break;
        case move_down_right:
            currentCat.setCircleType(Circle.TYPE_UNSELECTED);
            currentCat=circArry[currentCat.indexY%2?currentCat.indexX+1:currentCat.indexX][currentCat.indexY+1];
            currentCat.setCircleType(Circle.TYPE_CAT);
            break;
        case move_down_left:
            currentCat.setCircleType(Circle.TYPE_UNSELECTED);
            currentCat=circArry[currentCat.indexY%2?currentCat.indexX:currentCat.indexX-1][currentCat.indexY+1];
            currentCat.setCircleType(Circle.TYPE_CAT);
            break;
        default:
            alert("游戏胜利")
    }
};
// 画图函数
function addCircles() {
    for(var indexY=0;indexY<9;indexY++){
        for(var indexX=0;indexX<9;indexX++){
            var c=new Circle();
            gameView.addChild(c);
            circArry[indexX][indexY]=c;
            c.indexX=indexX;
            c.indexY=indexY;
            c.x=indexY%2?indexX*55+25:indexX*55;
            c.y=indexY*55;
            if(indexX==4&&indexY==4){
                c.setCircleType(3)
                currentCat=c;
            }else if(Math.random()<0.1){
                c.setCircleType(Circle.TYPE_SELECTED);
            }
            c.addEventListener("click",circleClicked)
        }
    }
};
addCircles();
var btn=document.getElementsByTagName("input")[0];
btn.onclick=function () {//刷新页面
    window.location.reload();
};

