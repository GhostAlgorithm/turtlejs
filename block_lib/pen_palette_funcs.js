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

function penup_block(params){
    params[1].pen_up();
}

function pendown_block(params){
    params[1].pen_down_action();
}

function set_pen_size_block(params){
    if (params[2].has_all_slots()){
        var values = params[2].get_slot_values();
        params[1].set_pen_size(values[0]);
    }else{
        alert('Missing value from set pen size block');
    }
}

function pen_size_value_block(){
    
}
