/**
 * Created by imamudinnaseem on 1/31/17.
 */

const _getComputedStyle = (element, prop) => {
    const INT = 10;
    return parseInt(window.getComputedStyle(element).getPropertyValue(prop), INT);
};
const getStyle = ({rippleSize, bgColor}) => $(
    `<style>
            .ripple-container {
                position: absolute;
                top: 0;
                left: 0;
                overflow: hidden;
                width: 100%;
                height: 100%;
                pointer-events: none;
            }
            .ripple {
                position: absolute;
                width: ${rippleSize}px;
                height: ${rippleSize}px;
                border-radius: 100%;
                background-color: ${bgColor};
                will-change: transform;
                top: 0;
                left: 0;
            }
            </style>`
);
(function ($) {
    'use strict';
    const status = {};
    var id = 0;
    $.fn.ripple = function (opt) {
        const self = this;
        this.css('position', 'relative');
        const options = $.extend({
            time: 500,
            bgColor: 'rgba(0,0,0,0.2)'
        }, opt);
        this.data('rippleId', id);
        const height = _getComputedStyle(this[0], 'height');
        const width = _getComputedStyle(this[0], 'width');
        const rippleSize = height > width ? height : width;
        const style = getStyle({rippleSize, bgColor: options.bgColor});
        const {top, left} = this.offset();
        const container = $(`<div class="ripple-container"></div>`);
        this.append(container);
        this.append(style);
        let mouseDownHandler = function (event) {
            const {clientX, clientY} = event;
            const two = 2;
            const rippleLeft = (clientX - left) - (rippleSize / two);
            const rippleTop = (clientY - top) - (rippleSize / two);
            let ripple = $('<div>')
                .attr('class', 'ripple')
                .css('left', rippleLeft)
                .css('top', rippleTop);
            ripple
                .appendTo(container);
            ripple[0].animate([
                {transform: 'scale(0)'},
                {transform: 'scale(2)'}
            ], {
                duration: options.time
            })
                .onfinish = () => ripple.remove();
        };
        status[id++] = true;
        $(this).on('mousedown', () => {
            status[self.data('rippleId')] && mouseDownHandler(event);
    });
        return this;
    };
    $.fn.enableRipple = function () {
        status[this.data('rippleId')] = true;
    };
    $.fn.disableRipple = function () {
        status[this.data('rippleId')] = false;
    };
}(jQuery));

