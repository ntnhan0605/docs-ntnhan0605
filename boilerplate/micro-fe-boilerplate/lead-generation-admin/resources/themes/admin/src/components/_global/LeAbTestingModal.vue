<template>
  <v-row justify="center">
    <v-dialog v-model="isShow" persistent max-width="435px">
      <v-card class="le-select-modal-site">
        <v-card-title class="modal-title">
          <span class="headline">Experiment - A/B Test</span>
        </v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-row>
              <v-col v-for="(i, index) in listVariant" class="form-column relative" cols="12" :key="index">
                <label class="form-label">Variant {{index + 1}}</label>
                <v-text-field class="le-input-text-mini" v-model="i.value" dense hide-details autofocus outlined required></v-text-field>
                <!-- <div class="le-error-text text-xs">{{}}</div> -->
                <div v-if="index + 1 == listVariant.length" class="absolute" style="top: calc(50%  + 4px); right : -32px; transform: translateX(-50%);">
                  <button title="Click to add new variant" @click="listVariant.push({value: ''})">
                    <img draggable="false" class="no-select" src="/img/icons/add.svg" alt />
                  </button>
                </div>
                <div v-if="index > 1" class="absolute" style="top: calc(50%  + 4px); right : 5px; transform: translateX(-50%);">
                  <button title="Click to delete current variant" @click="listVariant.splice(index,1)">
                    <img class="no-select" draggable="false" width="15" style="filter: grayscale(1);opacity: 0.7;" src="/img/icons/delete.svg" alt />
                  </button>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col class="form-column d-flex justify-space-between" cols="12">
                <v-btn class="close-btn" @click="toogleModal(false)" text>cancel</v-btn>
                <v-btn :disabled="!isValid" class="create-btn" color="white" @click="createVariant" text>create</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import Api from '../../api';
import { API_PATH, API_STATUS } from '../../constants/api-constants';
export default {
  props: ['isShow'],
  data() {
    return {
      listVariant: [],
      campaign: {},
    };
  },
  mounted() {
    this.listVariant.push({ value: '' });
    this.listVariant.push({ value: '' });
  },
  computed: {
    isValid() {
      return this.listVariant.every((i) => i.value);
    },
  },
  methods: {
    toogleModal(isHide) {
      this.$emit('toogleModal', isHide);
      if (!isHide) {
        // Reset
        this.listVariant = [
          { value: '' },
          { value: '' },
        ];
      }
    },
    createVariant() {
      const campaign = this.campaign;
      const data = {
        variant_names: this.listVariant.map((i) => i.value),
      };
      Api.post(`${API_PATH.CAMPAIGN}/${campaign.id}/variants`, data)
        .then((r) => {
          if (r.data._status == API_STATUS.SUCCESS) {
            this.$emit('toogleModal', false);
          } else {
          }
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          this.$emit('refreshList', true);
        });
    },
  },
};
</script>

<style>
</style>
