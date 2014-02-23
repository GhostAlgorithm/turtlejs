# Copyright (c) 2014 Jorge Alberto Gómez López <gomezlopez.jorge96@gmail.com>
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
# along with this program. If not, see <http://www.gnu.org/licenses/>.

function DockTracker(){
    this.dic = {};
    this.special_types = ["clampn"];

    this.add_dock("basic1arg", this.make_dock_descriptor([17, 1], [17, 43], [[115, 25]], null));
    this.add_dock("box", this.make_dock_descriptor(null, null, [[17, 25]], null));
    this.add_dock("basic", this.make_dock_descriptor([17, 1], [17, 35], null, null));
    this.add_dock("basic2arg", this.make_dock_descriptor([17, 1], [17, 85], [[115, 25], [115, 67]], null));
}

DockTracker.prototype = {
    constructor: DockTracker,
    add_dock: function(name, dock){
        this.dic[name] = dock;
    },
    get_dock: function(name){
        if (this.special_types.indexOf(name) > -1){
            if (name == "clampn"){
                return this.make_dock_descriptor([17, 1], [17, 95], [[133, 25]], null);
            }
        }
        return this.dic[name];
    },
    make_dock_descriptor: function(upper, lower, params, stack){
        var dock_descriptor = new DockDescriptor();

        if (upper != null){
            dock_descriptor.add_upper_dock(upper);
        }
        if (lower != null){
            dock_descriptor.add_lower_dock(lower);
        }
        if (params != null){
            for (var i=0; i<params.length; i++){
                dock_descriptor.add_param_dock(params[i]);
            }
        }
        if (stack != null){
            for (var i=0; i<stack.length; i++){
                dock_descriptor.add_stack_dock(stack[i]);
            }
        }

        return dock_descriptor;
    }
}
