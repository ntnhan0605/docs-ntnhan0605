<template>
  <label class="le-radiocheckbox">
    {{ label }}
    <input @click="clicked" type="radio" :name="name" :checked="checked? 'checked' : false" />
    <span class="checkmark"></span>
  </label>
</template>

<script>
export default {
  props: ['label', 'checked', 'checkValue', 'name'],
  mounted() {
    console.log(this.value);
  },
  methods: {
    clicked(val) {
      this.$emit('input', this.checkValue);
    },
  },
};
</script>

<style scoped>
/* The container */
.le-radiocheckbox {
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
.le-radiocheckbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* Create a custom radio button */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #3389f0;
}

/* On mouse-over, add a grey background color */
.le-radiocheckbox:hover input ~ .checkmark {
  background-color: #fff;
}

/* When the radio button is checked, add a blue background */
.le-radiocheckbox input:checked ~ .checkmark {
  background-color: #3389f0;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark:after {
  content: '';
  position: absolute;
  display: none;
}

/* Show the indicator (dot/circle) when checked */
.le-radiocheckbox input:checked ~ .checkmark:after {
  display: block;
}

/* Style the indicator (dot/circle) */
.le-radiocheckbox .checkmark:after {
  top: 2px;
  left: 8px;
  width: 8px;
  height: 15px;
  transform: rotate(45deg);
  border-right: 1.5px solid white;
  border-bottom: 1.5px solid white;
  border-radius: 1px;
}
</style>

