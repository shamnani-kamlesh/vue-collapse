import CollapseWrapper from '/src/components/wrapper.vue'
import CollapseGroup from '/src/components/group.vue'
import {defaults} from '/src/defaults.js'

let VueCollapse = {};
VueCollapse.install = function (Vue, options) {

    // merge configs

    const settings = Object.assign(defaults, options);

    // creating required components

    Vue.component(settings.prefix + '-wrapper', CollapseWrapper);
    Vue.component(settings.prefix + '-group', CollapseGroup);

    // creates instance of settings in the Vue

    Vue.mixin({
        created: function () {
            this.$options.$vc = {
                settings : settings
            };
        }
    });

    // content directive

    Vue.directive(settings.basename + '-content', {

        // assigning css classes from settings

        bind (el, binding, vnode, oldVnode) {
            vnode.elm.classList.add(vnode.context.$options.$vc.settings.contentClassDefault);
            vnode.elm.classList.add(vnode.context.$options.$vc.settings.contentClassStart);
        }
    });

    // toggler directive

    Vue.directive(settings.basename + '-toggle', {

        // adding toggle class

        bind (el, binding, vnode, oldVnode) {
            vnode.elm.classList.add(vnode.context.$options.$vc.settings.togglerClassDefault);
        },

        // Creating custom toggler handler

        inserted (el, binding, vnode, oldVnode) {
            if (binding.value != null) {
                vnode.elm.addEventListener('click', function () {
                    vnode.context.$refs[binding.value].status = !vnode.context.$refs[binding.value].status;
                }.bind(this));
            }
        }
    });
};
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueCollapse)
}
export default VueCollapse;