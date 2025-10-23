<template>
  <a-popover v-model="visible" @visibleChange="(visible) => $emit('visibleChange', visible)" trigger="click" :placement="placement || 'bottomLeft'" arrow="false" overlayClassName="popoverFilter">
    <div slot="title" class="popoverFilter--title" v-show="!!title">
      {{ title }}
      <a-icon type="plus" @click="onClose" class="popoverFilter--title-close" style="transform: rotate(45deg)" />
    </div>
    <div slot="content" class="popoverFilter--content">
      <div class="popoverFilter--body">
        <slot name="overlay">
          <a-empty class="popoverFilter--empty" />
        </slot>
      </div>
      <div class="popoverFilter--footer">
        <a-button :size="size" type="link" @click="onReset" class="btnReset">
          <a-icon viewBox="0 0 16 17">
            <svg width="16" height="17" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.78977 14.3872C6.47695 14.6846 7.2137 14.8334 8.00002 14.8334C8.78635 14.8334 9.5231 14.6846 10.2103 14.3872C10.8975 14.0898 11.4966 13.6855 12.0077 13.1744C12.5188 12.6633 12.9231 12.0641 13.2205 11.377C13.518 10.6898 13.6667 9.95304 13.6667 9.16671C13.6667 8.38039 13.518 7.64364 13.2205 6.95646C12.9231 6.26929 12.5188 5.67014 12.0077 5.15903C11.4966 4.64793 10.8975 4.24366 10.2103 3.94623C9.5231 3.64879 8.78635 3.50006 8.00002 3.50006H7.82309L8.54362 2.77955C8.64704 2.67614 8.69704 2.55905 8.69362 2.42828C8.6902 2.29751 8.6402 2.18042 8.54362 2.077C8.4402 1.97359 8.32033 1.92124 8.18401 1.91995C8.04769 1.91867 7.92996 1.9676 7.83082 2.06675L6.31929 3.57186C6.19878 3.69237 6.13852 3.83297 6.13852 3.99365C6.13852 4.15434 6.19878 4.29494 6.31929 4.41545L7.81799 5.92055C7.92141 6.02397 8.04021 6.07397 8.17439 6.07055C8.30858 6.06712 8.42738 6.01371 8.53079 5.9103C8.62738 5.80687 8.67631 5.68871 8.67759 5.55581C8.67887 5.42291 8.62994 5.30689 8.53079 5.20775L7.82309 4.50005H8.00002C9.30002 4.50005 10.4028 4.95282 11.3084 5.85838C12.2139 6.76394 12.6667 7.86671 12.6667 9.16671C12.6667 10.4667 12.2139 11.5695 11.3084 12.475C10.4028 13.3806 9.30002 13.8334 8.00002 13.8334C6.70002 13.8334 5.59725 13.3806 4.69169 12.475C3.78614 11.5695 3.33336 10.4667 3.33336 9.16671C3.33336 9.02484 3.2855 8.90604 3.18977 8.81031C3.09405 8.71459 2.97525 8.66673 2.83337 8.66673C2.6915 8.66673 2.5727 8.71459 2.47697 8.81031C2.38124 8.90604 2.33337 9.02484 2.33337 9.16671C2.33337 9.95304 2.4821 10.6898 2.77954 11.377C3.07697 12.0641 3.48124 12.6633 3.99234 13.1744C4.50345 13.6855 5.1026 14.0898 5.78977 14.3872Z"
              />
            </svg>
          </a-icon>
          Reset
        </a-button>
        <a-button :size="size" type="primary" @click="onApply"> Apply </a-button>
      </div>
    </div>
    <a-button :size="size" :loading="loading" class="popoverFilter--button">
      <slot name="icon-prefix"></slot>
      <slot></slot>
      <a-badge :count="count" v-show="!!count" class="popoverFilter--button-badge" />
      <slot name="icon-suffix"> </slot>
    </a-button>
  </a-popover>
</template>

<script>
export default {
  name: 'DropdownFilter',
  props: ['title', 'size', 'loading', 'count', 'placement'],
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    onClose(visible) {
      this.visible = typeof visible === 'boolean' ? visible : !this.visible;
    },
    onReset() {
      this.visible = false;
      this.$emit('reset');
    },
    onApply() {
      this.visible = false;
      this.$emit('apply');
    },
  },
};
</script>

<style lang="scss">
.popoverFilter {
  --popoverFilter-padding: 12px;
  .ant-popover-title {
    padding: 0;
    min-height: 0;
  }
  .ant-popover-inner-content {
    min-width: 220px;
    max-width: 400px;
    padding: 0;
  }
}

.popoverFilter--title {
  padding: var(--popoverFilter-padding);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.popoverFilter--title-close {
  font-size: 20px;
}

.popoverFilter--button {
  display: inline-flex !important;
  align-items: center;
  .popoverFilter--button-badge {
    margin-left: 4px;
    .ant-badge-count {
      color: var(--color-primary);
      background-color: var(--color-blue50);
      font-weight: 600;
      font-size: 14px;
      min-width: 24px;
      height: 24px;
      line-height: 24px;
    }
  }
}

.popoverFilter--empty {
  padding-block: 20px;
}

.popoverFilter--content {
  width: 100%;
}

.popoverFilter--body {
  max-height: 328px;
  overflow: overlay;
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 6px;
  }
}

.popoverFilter--footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--popoverFilter-padding);
  border-top: 1px solid var(--color-neutral100);

  .ant-btn {
    border-radius: 8px !important;
  }

  .btnReset {
    padding-inline: 8px;
  }
}
</style>
