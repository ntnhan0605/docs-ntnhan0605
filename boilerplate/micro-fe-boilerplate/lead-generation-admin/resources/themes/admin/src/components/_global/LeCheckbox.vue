<template>
  <label class="le-checkbox">
    <slot></slot>
    <input ref="lecheckbox" type="checkbox" :checked="value" @input="updateData" />
    <span class="checkmark"></span>
  </label>
</template>

<script>
export default {
  props: ['value'],
  methods: {
    updateData() {
      this.$emit('input', this.$refs.lecheckbox.checked);
    },
  },
};
</script>

<style scoped>
.le-checkbox {
  position: relative;
  cursor: pointer;
  font-size: 15px;
  user-select: none;
  padding: 1.5px;
  padding-left: 35px;
}

/* Hide the browser's default checkbox */
.le-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #fff;
  border: 1px solid #2196f3;
  border-radius: 4px;
}

/* On mouse-over, add a grey background color */
.le-checkbox:hover input ~ .checkmark {
  background-color: #fff;
}

/* When the checkbox is checked, add a blue background */
.le-checkbox input:checked ~ .checkmark {
  background-color: #2196f3;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: '';
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.le-checkbox input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.le-checkbox .checkmark:after {
  top: 2px;
  left: 8px;
  width: 8px;
  height: 15px;
  transform: rotate(45deg);
  border-right: 2.5px solid white;
  border-bottom: 2.5px solid white;
  border-radius: 1px;
}
</style>
