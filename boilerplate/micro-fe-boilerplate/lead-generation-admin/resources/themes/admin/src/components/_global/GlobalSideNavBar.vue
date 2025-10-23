<template>
  <nav class="le-sidebar">
    <div>
      <router-link to="/">
        <header class="padding-sm text-center" style="background: #0a54ae">
          <img width="37" src="/img/icons/logo_default.png" />
        </header>
      </router-link>
    </div>
    <div class="le-sidbar-item relative padding-sm">
      <div @click="toggleMenu">
        <div class="flex justify-center items-center white--text no-select" style=" width: 47px;height: 47px;  background-color: #0d6cde; border-radius: 50%; background-size: 50%;">
          <div>{{userData.first_name ? userData.first_name.split('')[0] : ''}}{{userData.last_name?userData.last_name.split('')[0]:''}}</div>
        </div>
      </div>
    </div>
    <GlobalSideBarMenu :user="userData" v-show="isShowMenu" />
    <router-link to="/">
      <div class="le-sidbar-item has-hover padding-sm" :class="{'le-active': currentPath == '/'}">
        <img class="padding-xs" v-tooltip.right="{content: `<div class='le-tooltip-sidebar'>Campaign</div>`}" src="/img/icons/group.svg" />
      </div>
    </router-link>
    <!-- <div class="le-sidbar-item has-hover padding-sm">
      <img class="padding-xs" v-tooltip.right="{content: `<div class='le-tooltip-sidebar'>Notification</div>`}" src="/img/icons/notification.svg" />
    </div>
    -->
    <div class="le-sidbar-item has-hover padding-sm">
      <a href="https://sites.google.com/hellohealthgroup.com/helloacademy/products/lead-collection-tool" target="blank">
        <img class="padding-xs" v-tooltip.right="{content: `<div class='le-tooltip-sidebar'>Support</div>`}" src="/img/icons/question.svg" />
      </a>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      isShowMenu: false,
      user: {},
      currentPath: '/',
    };
  },
  beforeMount() {
    this.$router.beforeEach((to, from, next) => {
      this.currentPath = to.path;
      this.isShowMenu = false;
      next();
    });
  },
  mounted() {
    $('body').on('click', '.sidebar-menu__link', () => {
      this.isShowMenu = false;
    });
    this.currentPath = this.$route.path;
  },
  computed: {
    ...mapState('auth', {
      userData: (state) => state.userData,
    }),
  },
  methods: {
    outsideClick() {
      if (this.isShowMenu) {
        this.isShowMenu = false;
      }
    },
    toggleMenu() {
      this.isShowMenu = !this.isShowMenu;
    },
  },
};
</script>

<style lang="scss" scoped>
.le-sidebar {
  height: 100%;
  background: #3389f0;
  position: fixed;
  left: var(--le-sidebar-filter-width);
  top: 0;
  width: var(--le-left-side-bar-width);
  z-index: 9;
}
.le-sidbar-item {
  height: var(--le-left-side-bar-width);
  margin-top: var(--le-left-side-bar-offset-top);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &.le-active {
    background: #0d6cde;
  }
}
.le-sidbar-item.has-hover:hover {
  background: #0d6cde;
}
</style>
