<template>
  <div>
    <button @click="incrementClickedTime" class="le-button padding-x-md">
      <v-icon class="text-md padding-bottom-xxxxs margin-right-xxs" color="white">mdi-plus</v-icon>Click me
    </button>
    <p>Clicked Time: {{ clickedTime }}</p>
    <p>Redux Store Count: {{ countFromRedux }}</p>
    <!-- <p>React Store Value: {{ reactValue }}</p> -->
    <button @click="reduxStoreClickedTime" class="le-button padding-x-md">
      <v-icon class="text-md padding-bottom-xxxxs margin-right-xxs" color="white">mdi-plus</v-icon>Clicked Me For Redux
    </button>
    <div id="react"></div>
     <!-- <Header></Header> -->
  </div>
</template>

<script>
// import Header from "newLeadGenerationAdmin/Header";

export default {
  // components: {
  //   Header,
  // },
  data() {
    return {
      clickedTime: 0,
      countFromRedux: 0,
      reduxStore: null,
    };
  },
  methods: {
    incrementClickedTime() {
      this.clickedTime += 1;
      this.updateReactComponent();
    },
    async updateReactComponent() {
      try {
        const module = await import("newLeadGenerationAdmin/App");
        const { mount } = module;
        const reactContainer = document.getElementById("react");

        if (reactContainer) {
          mount(reactContainer,{
            title: 'Frontend Team trying Micro FE',
            clickedTime: this.clickedTime
          });
        } else {
          console.error("React container is missing.");
        }
      } catch (error) {
        console.error("Error loading React component:", error);
      }
    },
    reduxStoreClickedTime() {
      if (this.reduxStore) {
        this.reduxStore.dispatch({ type: "counter/increment" }); // Dispatch Redux action
      }
    }
  },
  async created() {
    // Import redux store
    try {
      const { default: newAdminStore } = await import("newLeadGenerationStoreRedux/store");
      this.reduxStore = newAdminStore;

      this.reduxStore.subscribe(() => {
        this.countFromRedux = this.reduxStore.getState().counter.count; // Update local count
      });

      // Set initial count from Redux
      this.countFromRedux = this.reduxStore.getState().counter.count;

      console.log("✅ React Store Loaded in Vue:", this.reduxStore);
    } catch (error) {
      console.error("❌ Error loading Redux store:", error);
    }

    // Import react sweet state store
  },
  async mounted() {
    this.updateReactComponent();
  },
};
</script>
