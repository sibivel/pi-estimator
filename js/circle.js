var Circle = {
    getPoint : function(l){
        var x = Math.floor(Math.random() * l);
        var y = Math.floor(Math.random() * l);
        return {x : x,
                y : y};
    },
    checkPoint : function (point, l, r){
        return (Math.sqrt(Math.pow((l/2-point.x),2) + Math.pow((l/2-point.y),2)) < r);
    },
    estimatePi : function estimatePi(inCount, total){
        //circle area = pi * r ^2
        //square area = (2r)^2
        //(pi * r^2)/4r^2 = inCount/total
        //pi/4 = inCount/total
        //pi = 4 * inCount/total
        return 4 * inCount/total
    }
}
