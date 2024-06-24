/*!
 * dropdown-menu.js v1.0.0
 * https://github.com/InuHa98/dropdown-menu
 *
 * @author InuHa
 */

;(function (factory) {
    "use strict";

    try {
        if (typeof define === 'function' && define.amd) {
            define(['jquery'], factory);
        }
        else if (typeof exports == "object" && typeof module == "object") {
            module.exports = factory(require('jquery'));
        }
        else {
            factory(jQuery);
        }
    } catch (error) {
        factory();
    }

})(function($){
    let difference_rate = 10;
    let $parent = '.drop-menu';
    let content = '.drop-menu__content';
    let class_hide = 'drop-menu__bg-hide';

    $(document).on('click', $parent,  function(e){
        e.stopPropagation();

        let ele_menu = $(this).children(content);
        let preference = $(this).data('preference');

        if(ele_menu.length < 1){
            return;
        }

        let bgHide = $(`<div class="${class_hide}"></div>`);
        if($(this).hasClass('show')){
            $(this).removeClass('show');
            bgHide.remove();
        } else {

            let offset = this.getBoundingClientRect();
            let padding = difference_rate * 2;

            let top = offset.top - (ele_menu.outerHeight() / 2), // mid y
                left = offset.left - (ele_menu.outerWidth() / 2), // mid x
                __x_origin = 'left',
                __y_origin = 'top';


            if(($(window).height() - offset.top) > ele_menu.outerHeight()){ // bottom
                top = offset.top + difference_rate;
            } else if(offset.top > ele_menu.outerHeight()){ // top
                __y_origin = 'bottom';
                top = offset.top - ele_menu.outerHeight() + (difference_rate * 2);
            }

            if((top + ele_menu.outerHeight()) >= $(window).height()){
                if(offset.top > ($(window).height() / 2))
                {
                    __y_origin = 'bottom';
                }
                else
                {
                    __y_origin = 'top';
                }
                top = $(window).height() - ele_menu.outerHeight() - (difference_rate / 2);
            }

            if(top <= 0){
                top = (difference_rate/ 2);
            }

            if(preference == 'right' || offset.left > (($(window).width() / 2) + ele_menu.outerWidth()))
            {
                if(offset.left > ele_menu.outerWidth() + padding){ // left
                    __x_origin = 'right';
                    left = offset.left - ele_menu.outerWidth() + $(this).width(); //+ (difference_rate * 2)
                } else if(($(window).width() - offset.left) > ele_menu.outerWidth() + padding){ // right
                    left = offset.left;
                }
            }
            else
            {
                if(($(window).width() - offset.left) > ele_menu.outerWidth() + padding){ // right
                    left = offset.left;
                } else if(offset.left > ele_menu.outerWidth() + padding){ // left
                    __x_origin = 'right';
                    left = offset.left - ele_menu.outerWidth() + $(this).width(); //+ (difference_rate * 2)
                }
            }

            if((left + ele_menu.outerWidth()) >= $(window).width()){
                if(offset.left > ($(window).width() / 2))
                {
                    __x_origin = 'right';
                }
                else
                {
                    __x_origin = 'left';
                }
                left = $(window).width() - ele_menu.outerWidth() - (difference_rate / 2);
            }

            if(left <= 0){
                left = (difference_rate / 2);
            }

            ele_menu.css({
                'transform-origin': __x_origin+' '+__y_origin,
                top: top + 'px',
                left: left + 'px'
            });


            $(document).find($parent).removeClass('show');
            $(this).addClass('show');
            $(this).prepend(bgHide);
        }

        bgHide.off('click.dropdownMenu');
        bgHide.on('click.dropdownMenu', function(e){
            $($parent + '.show').removeClass('show');
            bgHide.remove();
        });
        ele_menu.find('li').on('click.dropdownMenu', function(e){
            bgHide.remove();
        });
        $(window).off('resize.dropdownMenu');
        $(window).on('resize.dropdownMenu', function(){
            $($parent + '.show').removeClass('show');
            bgHide.remove();
        });
    });
});