import Vue from 'vue';
import com from './Animate.vue';

const Animate = Vue.extend(com);
export default function ({
  imgLeft,
  imgTop,
  width,
  height,
  disx,
  disy,
  src,
}) {
  // 每次创建一个实列
  const app = new Animate({
    el: document.createElement('div'),
    data() {
      return {
        imgLeft,
        imgTop,
        width,
        height,
        disx: 0,
        disy: 0,
        src,
        sx: 1,
        opacity: 1,
        destroy: true,
      };
    },
  });
  document.body.appendChild(app.$el);
  setTimeout(() => {
    app.sx = 0.3;
    app.disx = disx;
    app.disy = disy;
    app.opacity = 0;
  }, 0);
  setTimeout(() => {
    app.destroy = false;
  }, 1100);
}
