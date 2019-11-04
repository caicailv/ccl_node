function fix(el) {
    el.ontouchmove = function (e) {
        e.preventDefault();
        let vw = $(window).width();
        let vh = $(window).height();
        if (e.targetTouches.length == 1) {
            let touch = e.targetTouches[0];
            let x = Number(touch.pageX); //页面触点X坐标
            let y = Number(touch.pageY); //页面触点Y坐标
            let stw = x / vw * 100;
            let sth = y / vh * 100;
            stw = stw.toFixed(2);
            sth = sth.toFixed(2);

            //处理边界情况
            if (stw < 0) {
                this.style.left = 0;
                this.style.right = 'auto';
            } else if (stw > 90) {
                this.style.left = 'auto';
                this.style.right = 0;
            } else {
                this.style.left = stw + 'vw';
                this.style.right = 'auto';
            }

            if (sth < 0) {
                this.style.top = 0;
                this.style.bottom = 'auto';
            } else if (sth > 90) {
                this.style.bottom = '0';
                this.style.top = 'auto';
            } else {
                this.style.top = sth + 'vh';
                this.style.bottom = 'auto'
            }

            //手指离开屏幕
            this.ontouchend = function () {
                if (stw > 50) {
                    this.style.left = 'auto'
                    this.style.right = 0;

                } else {
                    this.style.left = 0;
                    this.style.right = 'auto';
                };
                if (sth < 0) {
                    this.style.top = 0;
                } else if (sth >= 90) {
                    this.style.bottom = 0;
                    this.style.top = 'auto';

                }
            }
        }
    }
}
function car_fix(el) {
    let divWidth = null;//储存宽度
    el.ontouchmove = function (e) {
        $(this).removeClass('right');
        $(this).addClass('drag');
        if(divWidth==null) {
            divWidth = getComputedStyle(this).width;
            this.style.width = 'auto';
        }
        
        e.preventDefault();
        let vw = $(window).width();
        let vh = $(window).height();
        if (e.targetTouches.length == 1) {
            let touch = e.targetTouches[0];
            let x = Number(touch.pageX); //页面触点X坐标
            let y = Number(touch.pageY); //页面触点Y坐标
            let stw = x / vw * 100;
            let sth = y / vh * 100;
            stw = stw.toFixed(2);
            sth = sth.toFixed(2);

            //处理边界情况
            if (stw < 0) {
                this.style.left = 0;
                this.style.right = 'auto';
            } else if (stw > 90) {
                this.style.left = 'auto';
                this.style.right = 0;
            } else {
                this.style.left = stw + 'vw';
                this.style.right = 'auto';
            }

            if (sth < 0) {
                this.style.top = 0;
                this.style.bottom = 'auto';
            } else if (sth > 90) {
                this.style.bottom = '0';
                this.style.top = 'auto';
            } else {
                this.style.top = sth + 'vh';
                this.style.bottom = 'auto'
            }

            //手指离开屏幕
            this.ontouchend = function () {
                el.style.width = divWidth;
                divWidth = null;
                $(el).removeClass('drag');
                if (stw > 50) {
                    this.style.left = 'auto'
                    this.style.right = 0;
                $(el).addClass('right');

                } else {
                    this.style.left = 0;
                    this.style.right = 'auto';
                };
                if (sth < 0) {
                    this.style.top = 0;
                } else if (sth >= 90) {
                    this.style.bottom = 0;
                    this.style.top = 'auto';

                }
            }
        }
    }
}
