<template>
  <view class="icon" :style="iconStyle"></view>
</template>

<script>
import #name# from './#name#.js';
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: String
    },
    fill: {
      type: [String, Array],
      default: ''
    }
  },
  computed: {
    iconStyle() {
      const SIGN = 'uni';
      const name = this.hyphen2Hump(`${SIGN}_${this.name}`);
      return #name#[name](this.options);
    }
  },
  data() {
    return {
      options: {
        quot: '"',
        svgSize: this.size,
        isStr: typeof this.fill === 'string',
        colors: this.fixColor()
      }
    };
  },
  methods: {
    fixColor() {
      const color = this.fill;
      if (typeof color === 'string') {
        return color.indexOf('#') === 0 ? this.hex2rgb(color) : color;
      }
      return color.map(function(item) {
        return item.indexOf('#') === 0 ? this.hex2rgb(item) : item;
      });
    },
    hex2rgb(hex) {
      const rgb = [];
      hex = hex.substr(1);
      if (hex.length === 3) {
        hex = hex.replace(/(.)/g, '$1$1');
      }
      hex.replace(/../g, (color) => {
        rgb.push(parseInt(color, 0x10));
        return color;
      });
      return 'rgb(' + rgb.join(',') + ')';
    },
    hyphen2Hump(str) {
      return str.replace(/-(\w)/g, (_match, letter) => letter.toUpperCase());
    }
  }
};
</script>

<style scoped>
.icon {
  background-repeat: no-repeat;
}
</style>
