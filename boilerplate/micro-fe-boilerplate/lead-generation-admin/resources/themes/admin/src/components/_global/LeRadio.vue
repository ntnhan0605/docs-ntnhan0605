<template>
  <label class="le-radio-circle">
    <div>
      <slot />
    </div>
    <input @click="clicked" type="radio" :name="name" :checked="checked? 'checked' : false" />
    <span class="checkmark"></span>
  </label>
</template>

<script>
export default {
  props: ['label', 'checked', 'checkValue', 'name'],
  methods: {
    clicked(val) {
      this.$emit('input', this.checkValue);
    },
  },
};
</script>

<style scoped>
/* The container */
.le-radio-circle {
  display: inline-block;
  position: relative;
  padding-left: 35px;
  cursor: pointer;
  font-size: 15px;
  color: #1b3250;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default radio button */
.le-radio-circle input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* Create a custom radio button */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 22px;
  width: 22px;
  background-color: #fff;
  border-radius: 50%;
  border: 1px solid #3389f0;
}

/* On mouse-over, add a grey background color */
.le-radio-circle:hover input ~ .checkmark {
  background-color: #fff;
}

/* When the radio button is checked, add a blue background */
.le-radio-circle input:checked ~ .checkmark {
  background-color: #fff;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark:after {
  content: '';
  position: absolute;
  display: none;
}

/* Show the indicator (dot/circle) when checked */
.le-radio-circle input:checked ~ .checkmark:after {
  display: block;
}

/* Style the indicator (dot/circle) */
.le-radio-circle .checkmark:after {
  top: 50%;
  left: 50%;
  width: 16px;
  height: 16px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: #3389f0;
}
</style>

