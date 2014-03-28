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

function BasicBlockPalette(width, height, fill_color, layer, pal_desc, global_tracker){
    this.container = null;
    this.global_tracker = global_tracker;
    this.pal_desc = pal_desc;
    this.init_palette(width, height, fill_color, layer);
}

BasicBlockPalette.prototype = {
    constructor: BasicBlockPalette,
    init_palette: function(width, height, fill_color, layer){
        this.container = new PaletteContainer(width, height, fill_color, layer);
        this.make_block_factories();
    },
    show: function(){
        this.container.show();
    },
    hide: function(){
        this.container.hide();
    },
    is_visible: function(){
        return this.container.is_visible();
    },
    is_collide: function(point){
        return this.container.is_collide(point);
    },
    make_block_factories: function(){
        var sprit1 = new Sprite([NA_ARRANGE, 'block_res/basic1arg.svg'], this.container.layer, true);
        new BlockFactory([5, 5], sprit1, 'forward_block', this, [DEFAULT_LANG, BLOCK_SIDE, 'forward']);
        sprit1 = new Sprite([NA_ARRANGE, 'block_res/basic1arg.svg'], this.container.layer, true);
        new BlockFactory([120, 5], sprit1, 'backward_block', this, [DEFAULT_LANG, BLOCK_SIDE, 'backward']);

        sprit1 = new Sprite([NA_ARRANGE, 'block_res/basic1arg.svg'], this.container.layer, true);
        new BlockFactory([235, 5], sprit1, 'right_block', this, [DEFAULT_LANG, BLOCK_SIDE, 'right']);

        sprit1 = new Sprite([NA_ARRANGE, 'block_res/basic1arg.svg'], this.container.layer, true);
        new BlockFactory([350, 5], sprit1, 'left_block', this, [DEFAULT_LANG, BLOCK_SIDE, 'left']);

        sprit1 = new Sprite([HORIZ_ARRANGE, 'block_res/box-left.svg', 'block_res/box-center.svg', 'block_res/box-right.svg'], this.container.layer, true, false, null, null, [0, 28, 12]);
        new BlockFactory([5, 55], sprit1, 'box_block', this, [DEFAULT_LANG, BLOCK_SIDE, 'number']);

        sprit1 = new Sprite([NA_ARRANGE, 'block_res/basic.svg'], this.container.layer, true);
        new BlockFactory([120, 55], sprit1, 'clean_block', this, [DEFAULT_LANG, BLOCK_SIDE, 'clean']);

        sprit1 = new Sprite([NA_ARRANGE, 'block_res/basic2arg.svg'], this.container.layer, true);
        new BlockFactory([5, 100], sprit1, 'setxy_block', this, [DEFAULT_LANG, BLOCK_SIDE, 'setxy']);

        sprit1 = new Sprite([NA_ARRANGE, 'block_res/box.svg'], this.container.layer, true);
        sprit1.set_label('x', 40, 13, 19, 'Calibri', 'black');
        block_factory1 = new BlockFactory([125, 100], sprit1, 'box_block', this, null);
        this.container.add_block_factory('number', block_factory1);

        sprit1 = new Sprite([NA_ARRANGE, 'block_res/box.svg'], this.container.layer, true);
        sprit1.set_label('y', 40, 13, 19, 'Calibri', 'black');
        block_factory1 = new BlockFactory([125, 145], sprit1, 'box_block', this, null);
        this.container.add_block_factory('number', block_factory1);

        sprit1 = new Sprite([NA_ARRANGE, 'block_res/basic2arg.svg'], this.container.layer, true);
        new BlockFactory([215, 100], sprit1, 'arc_block', this, [DEFAULT_LANG, BLOCK_SIDE, 'arc']);

        sprit1 = new Sprite([NA_ARRANGE, 'block_res/basic1arg.svg'], this.container.layer, true);
        new BlockFactory([235, 53], sprit1, 'set_heading_block', this, [DEFAULT_LANG, BLOCK_SIDE, 'heading']);

        sprit1 = new Sprite([NA_ARRANGE, 'block_res/box.svg'], this.container.layer, true);
        sprit1.set_label('h', 35, 13, 19, 'Calibri', 'black');
        block_factory1 = new BlockFactory([350, 55], sprit1, 'heading_block', this, null);
        this.container.add_block_factory('number', block_factory1);
    }
}
