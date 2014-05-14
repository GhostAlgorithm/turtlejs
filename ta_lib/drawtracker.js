/* Copyright (c) 2014 Jorge Alberto Gómez López <gomezlopez.jorge96@gmail.com>
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program. If not, see <http://www.gnu.org/licenses/>.*/

function DrawTracker(layer, turtle){
    this.lines = [];
    this.shapes = [];
    this.labels = [];
    this.pen_down = true;
    this.pen_size = 3;
    this.stroke_line = "#FF0000";
    this.layer = layer;
    this.turtle = turtle;
    this.points = [];
    this.points.push(turtle.get_xy()[0]);
    this.points.push(turtle.get_xy()[1]);
    this.make_base_line();

    this.shade = 50;
    this.gray = 100;
    this.color = 0;
}

DrawTracker.prototype = {
    constructor: DrawTracker,
    add_point: function(point){
        if (this.pen_down){
            this.points.push(point[0]);
            this.points.push(point[1]);
            this.line.setPoints(this.points);
        }else{
            this.lines.push(this.line);
            this.points = [this.turtle.get_xy()[0], this.turtle.get_xy()[1]];
            this.make_base_line();
        }
    },
    clear_canvas: function(){
        this.turtle.reset_pos();
        this.reset_scroll_pos();
        for (var i=0; i<this.lines.length; i++){
            this.lines[i].remove();
        }
        for (var i=0; i<this.shapes.length; i++){
            this.shapes[i].remove();
        }
        for (var i=0; i<this.labels.length; i++){
            this.labels[i].remove();
        }
        this.stroke_line = "red";
        this.line.remove();
        this.lines = [];
        this.shapes = [];
        this.labels = [];
        this.points = [this.turtle.get_xy()[0], this.turtle.get_xy()[1]];
        this.make_base_line();
    },
    check_repos: function(){
        if (this.points.length == 2){
            this.points[0] = this.turtle.get_xy()[0];
            this.points[1] = this.turtle.get_xy()[1];
        }else{
            this.end_line();
        }
    },
    pen_up: function(){
        this.pen_down = false;
    },
    pen_down_action: function(){
        this.pen_down = true;
    },
    make_base_line: function(){
        this.line = new Kinetic.Line({
            points: this.points,
            strokeWidth: this.pen_size,
            lineCap: 'round',
            lineJoin: 'round',
            stroke: this.stroke_line
        });
        //this.line.opacity(1.0);
        this.layer.add(this.line);
    },
    set_pen_size: function(value){
        if (this.pen_size != value){
            this.pen_size = value;
            this.lines.push(this.line);
            this.points = [this.turtle.get_xy()[0], this.turtle.get_xy()[1]];
            this.make_base_line();
        }
    },
    set_pen_color: function(value){
        if (!isNaN(parseInt(value))){
            value = this.set_fgcolor(null, null, value);
        }
        this.on_color_change(value);
    },
    get_pen_color: function(){
        return this.color;
    },
    set_pen_shade: function(value){
        value = this.set_fgcolor(value, null, null);
        this.on_color_change(value);
    },
    get_pen_shade: function(){
        return this.shade;
    },
    set_pen_gray: function(value){
        value = this.set_fgcolor(null, value, null);
        this.on_color_change(value);
    },
    get_pen_gray: function(){
        return this.gray;
    },
    on_color_change: function(value){
        if (this.stroke_line != value){
            this.stroke_line = value;
            this.lines.push(this.line);
            this.points = [this.turtle.get_xy()[0], this.turtle.get_xy()[1]];
            this.make_base_line();
        }
    },
    add_shape: function(shape){
        this.shapes.push(shape);
        this.end_line();
    },
    add_label: function(str, turtle){
        var pos = turtle.get_xy();
        var lbl = new Kinetic.Text({
            x: pos[0] + 27,
            y: pos[1],
            text: str,
            fontSize: 19,
            fontFamily: 'Calibri',
            fill: this.stroke_line
        });
        this.labels.push(lbl);
        this.layer.add(lbl);
    },
    end_line: function(){
        if (this.points.length > 2){
            this.lines.push(this.line);
        }
        this.points = [this.turtle.get_xy()[0], this.turtle.get_xy()[1]];
        this.make_base_line();
    },
    reset_scroll_pos: function(){
        $("#canvas").scrollTop(2000 - ($(window).height()/2) + 25);
        $("#canvas").scrollLeft(2000 - ($(window).width()/2));
    },
    wrap100: function(n){
        n = parseInt(n);
        n = n % 200;

        if (n < 0){
            if (n > -101){
                n = 100 + n;
            } else{
                n = 199 + n;
            }
        }

        if (n > 99){
            n = 199 - n;
        }
        return n;
    },
    set_fgcolor: function(shade, gray, color){
        if (shade != null){
            this.shade = shade;
        }
        if (gray != null){
            this.gray = gray;
        }
        if (color != null){
            this.color = color;
        }

        var sh = (this.wrap100(this.shade) - 50) / 50.0;
        //sh = Math.round(sh * 100) / 100;

        rgb = COLOR_TABLE2[this.wrap100(this.color)];
        var r = (rgb >> 8) & 0xFF00;
        r = this.calc_gray(r, this.gray, false);
        r = this.calc_shade(r, sh, false);
        var g = rgb & 0xFF00;
        g = this.calc_gray(g, this.gray, false);
        g = this.calc_shade(g, sh, false);
        var b = (rgb << 8) & 0xFF00;
        b = this.calc_gray(b, this.gray, false);
        b = this.calc_shade(b, sh, false);
      
        //var final_color = (r * 256)  + g + (b >> 8);
        var arr_rgb = [r >> 8, g >> 8, b >> 8];
        var final_color = (arr_rgb[0] * 65536) + (arr_rgb[1] * 256) + (arr_rgb[2]);
        final_color = final_color.toString(16);

        var zeroes = "";

        for (var i = 0; i<(6 -final_color.length); i++){
            zeroes += "0";
        }

        final_color = "#" + zeroes + final_color;
        final_color = final_color.toUpperCase();
        return final_color; 
    },
    calc_gray: function(color, gray, invert){
        if (gray == 100){
            return parseInt(color);
        }
        if (invert){
            if (gray == 0){
                return parseInt(color);
            } else{
                return parseInt(((color * 100) - (32768 * (100 - gray))) / gray);
            }
        } else{
            return parseInt(((color * gray) + (32768 * (100 - gray))) / 100);
        }
    },
    calc_shade: function(color, shade, invert){
        if (invert){
            if (shade == -1){
                return parseInt(color);
            } else if (shade < 0){
                return parseInt(color / (1 + shade));
            }
            return parseInt((color - 65536 * shade) / (1 - shade));
        } else{
            if (shade < 0){
                return parseInt(color * (1 + shade));
            }
            return parseInt(color + (65536 - color) * shade);
        }
    }
}
