function TextComponent(size, font, color, x, y, Area) {
    this.x = x;
    this.y = y;
    this.text = "NONE";
    
    this.update = function() {
        ctx = Area.context;
        ctx.font = size + " " + font;
        ctx.fillStyle = color;
        ctx.fillText(this.text, this.x, this.y);
    }
    
}