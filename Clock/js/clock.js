/*
 * @Author: chenjun
 * @Date:   2017-10-31 18:32:13
 * @Last Modified by:   chenjun
 * @Last Modified time: 2017-11-01 10:23:07
 */

(function(w, d) {
    var Clock = function() {
        this.dom = d.querySelector(arguments[0]);
        this.options = {
            bgColor: '#fff',
            width: 300,
            height: 300,
            hColor: '#555', // 时针颜色
            mColor: 'gold', // 分针颜色
            sColor: 'orange', // 秒针颜色
            boxShadow: 'inset 0 0 60px #999',
            cBgcolor: '#E91E63',
        }
    };
    Clock.prototype = {
        init: function(o) {
            this.extend(this.options, o);
            this.clockMark();
            this.drawPointer();
            var dateTime = new Date();
            var oHours = dateTime.getHours();
            var oMinutes = dateTime.getMinutes();
            var oSeconds = dateTime.getSeconds();
            var oH = this.dom.querySelector('.h');
            var oM = this.dom.querySelector('.m');
            var oS = this.dom.querySelector('.s');
            var oC = this.dom.querySelector('.c');
            //初始化时分秒
            oH.style.cssText = 'width:' + this.options.width / 2 * (3 / 6) + 'px;background:' + this.options.hColor + ';transform:rotate(' + (-90 + oHours * 30 + oMinutes * 6 / 12) + 'deg);height:5px;position:absolute;left:' + this.options.width / 2 + 'px;top:' + this.options.height / 2 + 'px;transform-origin:0 0';
            oM.style.cssText = 'width:' + this.options.width / 2 * (4 / 6) + 'px;background:' + this.options.mColor + ';transform:rotate(' + (-90 + oMinutes * 6) + 'deg);height:5px;position:absolute;left:' + this.options.width / 2 + 'px;top:' + this.options.height / 2 + 'px;transform-origin:0 0';
            oS.style.cssText = 'width:' + this.options.width / 2 * (5 / 6) + 'px;background:' + this.options.sColor + ';transform:rotate(' + (-90 + oSeconds * 6) + 'deg);height:5px;position:absolute;left:' + this.options.width / 2 + 'px;top:' + this.options.height / 2 + 'px;transform-origin:0 0';
            // 中心圆点
            oC.style.cssText = 'width:20px;height:20px;background:' + this.options.cBgcolor + ';border-radius:50%;position:absolute;left:' + (this.options.width - 20) / 2 + 'px;z-index:100;top:' + (this.options.height - 20) / 2 + 'px;'
            //运动时分秒
            var timer = setInterval(function() {
                dateTime = new Date();
                oHours = dateTime.getHours();
                oMinutes = dateTime.getMinutes();
                oSeconds = dateTime.getSeconds();
                oH.style.transform = 'rotate(' + (-90 + oHours * 30 + oMinutes * 6 / 12) + 'deg)';
                oM.style.transform = 'rotate(' + (-90 + oMinutes * 6) + 'deg)';
                oS.style.transform = 'rotate(' + (-90 + oSeconds * 6) + 'deg)';
            }, 1000);
        },
        // 刻度
        clockMark: function() {
            this.dom.style.cssText = "background:" + this.options.bgColor + ";width:" + this.options.width + "px;height:" + this.options.height + "px;" + "border-radius:50%;box-shadow:" + this.options.boxShadow;
            var temp = document.createDocumentFragment();
            for (var i = 0; i < 60; i++) {
                var oDiv = document.createElement('div');
                oDiv.className = 'kedu'
                oDiv.style.cssText = 'height:6px;width:4px;background:#555;line-height:0;font-size:0;display:block;position:absolute;left:' + this.options.width / 2 + 'px;top:0';
                oDiv.style.transform = 'rotate(' + i * 6 + 'deg)';
                oDiv.style.transformOrigin = '0 ' + this.options.width / 2 + 'px'
                if (i % 5 == 0) {
                    oDiv.style.height = '15px';
                }
                if (i % 15 == 0) {
                    oDiv.style.backgroundColor = '#f00';
                }
                temp.appendChild(oDiv);
            }
            this.dom.appendChild(temp);
        },
        //  时分秒及中心圆点
        drawPointer: function() {
            var arrPoint = ['h', 'm', 's', 'c'];
            for (var i = 0; i < 4; i++) {
                var pointDiv = document.createElement('div');
                pointDiv.className = arrPoint[i];
                this.dom.appendChild(pointDiv)
            }
        },
        extend: function(a, b) {
            for (var key in b) {
                if (b.hasOwnProperty(key)) {
                    a[key] = b[key]
                }
            }
            return a;
        }
    }

    function clock(o) {
        return new Clock(o)
    }
    window.clock = clock;
})(window, document);