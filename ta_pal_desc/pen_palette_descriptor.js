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

function PenPaletteDesc(){
    this.descriptors = [];
    this.init_descriptor();
}

PenPaletteDesc.prototype = {
    constructor: PenPaletteDesc,
    init_descriptor: function(){

        new BlockDescriptor(image_tracker.get_resource('basic'), 'basic', penup_block, null, ['penup_block', DEFAULT_LANG, FACTORY_SIDE, this.descriptors]);

        new BlockDescriptor(image_tracker.get_resource('basic'), 'basic', pendown_block, null, ['pendown_block', DEFAULT_LANG, FACTORY_SIDE, this.descriptors]);

        new BlockDescriptor(image_tracker.get_resource('basic1arg'), 'basic1arg', set_pen_size_block, null, ['set_pen_size_block', DEFAULT_LANG, FACTORY_SIDE, this.descriptors, ['int']]);

        var descriptor = new BlockDescriptor(image_tracker.get_resource('box2'), 'box', text_block, get_number, ['box_block', DEFAULT_LANG, FACTORY_SIDE, this.descriptors]);
        descriptor.component_positions = [0, 28, 82];

        new BlockDescriptor(image_tracker.get_resource('basic1arg'), 'basic1arg', set_color_block, null, ['set_color_block', DEFAULT_LANG, FACTORY_SIDE, this.descriptors, ['int']]);

        new BlockDescriptor(image_tracker.get_resource('basic1arg'), 'basic1arg', set_shade_block, null, ['set_shade_block', DEFAULT_LANG, FACTORY_SIDE, this.descriptors, ['int']]);

        new BlockDescriptor(image_tracker.get_resource('basic1arg'), 'basic1arg', set_gray_block, null, ['set_gray_block', DEFAULT_LANG, FACTORY_SIDE, this.descriptors, ['int']]);

        var descriptor = new BlockDescriptor(image_tracker.get_resource('box2'), 'box', null, get_pen_color, ['color_block', DEFAULT_LANG, FACTORY_SIDE, this.descriptors]);
        descriptor.component_positions = [0, 28, 82];

        var descriptor = new BlockDescriptor(image_tracker.get_resource('box2'), 'box', null, get_pen_shade, ['shade_block', DEFAULT_LANG, FACTORY_SIDE, this.descriptors]);
        descriptor.component_positions = [0, 28, 82];

        var descriptor = new BlockDescriptor(image_tracker.get_resource('box2'), 'box', null, get_pen_gray, ['gray_block', DEFAULT_LANG, FACTORY_SIDE, this.descriptors]);
        descriptor.component_positions = [0, 28, 82];
    },
    get_block_descriptor: function(name){
        return this.descriptors[name];
    }
}
