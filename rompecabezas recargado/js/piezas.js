var Pieza = function (ii, xx, yy, ww, hh) {
    this.id = ii,
    this.x = xx,
    this.y = yy,
    this.width = ww,
    this.height = hh,
    this.path = "",
    this.image = new Image();
    this.xCrop = 0;
    this.yCrop = 0;
    
    this.setImageURL = function(url){
        this.path = url;
        this.image.src = this.path;
    }
    this.setImageCrop = function(xx, yy){
        this.xCrop = xx;
        this.yCrop = yy;
    }
}