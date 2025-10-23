<template>
	<section class="le-page">
		<!-- TODO: Nav, stepper -->
		<nav class="le-fixed-topnav"></nav>
		<nav class="le-nav-btn-control-fixed">
			<div class="flex gap-xs">
				<button v-if="step != 'TARGET'" @click="backStep" class="le-button">Back</button>
				<button v-if="isEditMode" @click="createOrEditCampaign" :disabled="!isValid()"
					class="le-button save-btn">Save</button>
				<button v-if="step != 'SETTINGS'" :title="errorText" @click="nextStep" :disabled="!isValidStep()"
					class="le-button">Next</button>
				<button v-if="!isEditMode && step == 'SETTINGS'" :disabled="!isValid()" @click="createOrEditCampaign"
					class="le-button success-btn">Comfirm</button>
			</div>
		</nav>
		<nav class="le-stepper-fixed">
			<v-stepper class="le-stepper" v-model.number="stepNumber">
				<v-stepper-header>
					<v-stepper-step @click="isEditMode && setStep('TARGET')" step="1" :complete="true">
						<div class="text-uppercase" :class="{ 'cursor-pointer': isEditMode }">Target</div>
					</v-stepper-step>
					<v-icon>mdi-chevron-right</v-icon>
					<v-stepper-step @click="isEditMode && setStep('TEMPLATE')" step="2" :complete="stepNumber >= 1">
						<div class="text-uppercase" :class="{ 'cursor-pointer': isEditMode }">Template</div>
					</v-stepper-step>
					<v-icon>mdi-chevron-right</v-icon>
					<v-stepper-step @click="isEditMode && setStep('TRIGGER')" step="3" :complete="stepNumber >= 2">
						<div class="text-uppercase" :class="{ 'cursor-pointer': isEditMode }">Trigger</div>
					</v-stepper-step>
					<v-icon>mdi-chevron-right</v-icon>
					<v-stepper-step @click="isEditMode && setStep('DESIGN')" step="4" :complete="stepNumber >= 3">
						<div class="text-uppercase" :class="{ 'cursor-pointer': isEditMode }">Design</div>
					</v-stepper-step>
					<v-icon>mdi-chevron-right</v-icon>
					<v-stepper-step @click="isEditMode && setStep('SETTINGS')" step="5" :complete="stepNumber >= 4">
						<div class="text-uppercase" :class="{ 'cursor-pointer': isEditMode }">Settings</div>
					</v-stepper-step>
				</v-stepper-header>
			</v-stepper>
		</nav>

		<!-- TODO: FULL PAGE Step TEMPLATE -->
		<section v-show="step == 'TEMPLATE'" class="padding-bottom-xxl">
			<aside>
				<div class="text-center padding-xl margin-bottom-lg" style="background: #f8f8f8">
					<h4 class="font-semibold">LAYOUTS</h4>
				</div>
				<div class="padding-x-md" style="max-width: 1280px; margin: 0 auto">
					<div class="grid gap-xs">
						<div title="Click to select layout" @click="selectLayout(item)"
							:class="{ selected: item.value == currentLayout }" class="le-layout-item col-6 margin-bottom-xxxl"
							v-for="(item, index) in listLayout" :key="index">
							<div class="font-semibold margin-bottom-md">{{ item.name }}</div>
							<div v-show="!!item.description" class="le-layout-description margin-bottom-sm" style="max-width: 390px">{{ item.description }}</div>
							<div>
								<div class="relative" style="max-width: 390px">
									<img :src="'/img/newbuilder/layout/' + item.images[0]" alt />
									<img v-if="item.images[1]" class="absolute" style="bottom: -50px; right: -30px"
										:src="'/img/newbuilder/layout/' + item.images[1]" alt />
								</div>
							</div>
						</div>
					</div>
				</div>
			</aside>
		</section>

		<!-- TODO: FULL PAGE Step TARGET -->
		<section v-show="step == 'TARGET'" class>
			<div class="flex" style="max-width: 1200px">
				<aside class="le-fullpage-sidebar">
					<div @click="targetPage = 'pages'" :class="{ 'le-active': targetPage == 'pages' }"
						class="le-sidebar-item flex items-center justify-center no-select">
						<img src="/img/icons/target_pages.svg" alt />
						<span>Page</span>
					</div>
					<div @click="targetPage = 'devices'" :class="{ 'le-active': targetPage == 'devices' }"
						class="le-sidebar-item flex items-center justify-center no-select">
						<img src="/img/icons/target_devices.svg" alt />
						<span>Devices</span>
					</div>
				</aside>
				<div class="width-100% padding-top-sm">
					<section class="padding-y-xxl padding-x-xl">
						<aside v-show="targetPage == 'pages'">
							<v-radio-group hide-details class="mt-0" v-model="targetLinkType">
								<!-- Type Links" -->
								<div class="flex margin-bottom-md">
									<div style="min-width: 120px">
										<div>
											<span class="font-semibold text-16">Links:</span>
										</div>
									</div>
									<div class="width-100%">
										<div class="mb-3">
											<v-radio :value="'link'">
												<template v-slot:label>
													<div class="font-semibold text-18 color-black-2">Which links you would like to run campaigns on?
													</div>
												</template>
											</v-radio>
										</div>
										<div>
											<section v-for="(i, index) in listTargetAdded" :key="'target-' + index" class="margin-bottom-0">
												<div class="flex">
													<div class="padding-sm padding-top-lg text-no-wrap">• {{ index + 1 }}</div>
													<div class="padding-right-sm padding-top-sm padding-bottom-sm" style="min-width: 160px">
														<v-select-input class="le-has-arrow arrow-right-black-select" :clearable="false"
															v-model="i.type" :options="listOptionsLink"></v-select-input>
														<div v-show="i.type.value == 'start_with'">
															<div @click="addOption('excluding', i.options.sub_target)"
																class="color-primary padding-sm margin-top-xs font-semibold cursor-pointer no-select">
																<span title="Click to add excluding link">— Excluding</span>
															</div>
															<div v-if="i.options.sub_target && i.options.sub_target.length">
																<div v-for="t in i.options.sub_target.length - 1" :key="'target' + t"
																	@click="addOption('excluding', i.options.sub_target)"
																	class="no-select color-primary padding-sm margin-top-xs font-semibold cursor-pointer">
																	<span title="Click to add excluding link">— Excluding</span>
																</div>
															</div>
														</div>
													</div>

													<div class="padding-y-sm width-100%">
														<div class="flex margin-bottom-xs items-start">
															<div class="relative le-input-link-wrap" style="width: calc(100% - 145px)">
																<img hidden class="le-input-link-img-status" src="/img/icons/error.svg" />
																<img hidden class="le-input-link-img-status" src="/img/icons/success.svg" />
																<v-text-field @input="decodeInputURL(i, 'target')" :class="{ valid: !i.error }"
																	hide-details
																	:append-icon="i.target ? (!i.error ? 'mdi-check-circle' : 'mdi-close-circle') : ''"
																	:error="!!i.error" :error-messages="i.error" @keyup.native="checkLink(i)"
																	v-model="i.target" placeholder="https://" outlined spellcheck="false"></v-text-field>
															</div>
															<img v-if="index" draggable="false" @click="removeLink(index)" src="/img/icons/delete.svg"
																class="le-delete-img margin-top-md cursor-pointer margin-left-sm no-select"
																style="min-width: 18px" />
															<div v-else style="width: 18px; padding-top: 10px" class="margin-left-sm">
																<p @click="addLink" style="white-space: nowrap"
																	class="cursor-pointer color-primary font-semibold no-select">＋ Add more link</p>
															</div>
														</div>
														<div v-show="i.error" class="le-error-text text-xs">{{ i.error }}</div>

														<!-- list Excluding -->
														<div v-show="i.type.value == 'start_with'">
															<div v-for="(item, index) in i.options.sub_target" :key="'Excluding' + index">
																<div class="flex margin-bottom-xs items-start" style="width: calc(100% - 116px)">
																	<v-text-field @input="decodeInputURL(i, 'target')" hide-details v-model="item.value"
																		placeholder="https://" outlined></v-text-field>
																	<img draggable="false" @click="removeArrayByIndexRef(i.options.sub_target, index)"
																		src="/img/icons/delete.svg"
																		class="le-delete-img margin-top-md cursor-pointer margin-left-sm no-select"
																		style="min-width: 18px" />
																</div>
															</div>
														</div>
													</div>
												</div>
											</section>
										</div>
									</div>
								</div>

								<!-- Type CSV -->
								<div class="margin-top-md margin-bottom-xl">
									<div class="flex">
										<div style="min-width: 120px">
											<!-- -->
										</div>
										<div class="width-100%" style="max-width: 610px">
											<div class="d-flex">
												<div style="flex: 0 0 70px" class="margin-right-xl">
													<v-radio :value="'csv'">
														<template v-slot:label>
															<div style="min-width: 70px" class="font-semibold text-18 color-black-2">CSV File</div>
														</template>
													</v-radio>
												</div>
												<div v-if="!csvData.isImported" class="width-100%">
													<div v-show="!isAddedCSV">
														<vue-dropzone ref="leadCsv" @vdropzone-success="csvSuccess"
															@vdropzone-file-added="onAddCSVFile" @vdropzone-error="onErrorCSVFile"
															@vdropzone-removed-file="onRemoveCSVFile" class="margin-bottom-sm" id="dropzone"
															:options="dropzoneOptions" :useCustomSlot="true" :includeStyling="true">
															<div class="dropzone-custom-content">
																<img src="/img/icons/upload.svg" alt />
																<div class="margin-top-md no-select">
																	Drag and drop here or
																	<span class="color-primary">browse</span> files to upload
																</div>
															</div>
														</vue-dropzone>
														<div class="text-right text-sm">
															<a @click="downloadSample">Download Reference CSV File</a>
														</div>
													</div>
													<!-- Preview csv uploaded -->
													<div v-show="isAddedCSV">
														<div class="d-flex items-start">
															<img v-if="csvData.status == -1" class="mt-2" src="/img/icons/file_upload_error.svg" />
															<img v-else class="mt-2" src="/img/icons/file_upload.svg" />

															<div class="width-100% px-3">
																<div :class="{ 'color-error': csvData.status == -1 }" class="text-sm">{{ csvData.name }}
																</div>
																<v-progress-linear class="margin-y-xxs"
																	:color="csvData.status == -1 ? 'gray' : csvData.loading ? 'blue' : 'green'"
																	:value="csvData.loading ? 0 : 100" :indeterminate="csvData.loading" rounded
																	height="4"></v-progress-linear>
																<div v-if="csvData.status != -1" class="text-sm">{{ csvData.size }}</div>
																<div v-if="csvData.status == -1">
																	<div class="text-xs color-error" v-for="(s, index) in csvData.errors"
																		:key="'csv-error-' + index">
																		<v-icon color="error" class="text-md">mdi-information</v-icon>
																		{{ s }}
																	</div>
																</div>
															</div>
															<div class="d-flex">
																<img v-if="csvData.status == -1" title="Click to remove" @click="removeCsv" width="22"
																	class="mt-4 fill-height cursor-pointer" src="/img/icons/upload_error.svg" />
																<img v-else title="Click to remove" @click="removeCsv" width="22"
																	class="mt-4 fill-height cursor-pointer" style="filter: grayscale(1); opacity: 0.5"
																	src="/img/icons/upload_error.svg" />
															</div>
														</div>
													</div>
												</div>
												<div v-if="csvData.isImported" class="width-100%">
													<div class="mt-2 d-flex items-center">
														<img src="/img/csv_file_type.svg" />
														<div class="color-primary text-sm ml-3 mr-5">{{ csvData.name }}</div>
														<div>
															<v-icon title="Click to download" @click="downloadCsv" class="cursor-pointer"
																style="margin-right: 2px">mdi-download-circle-outline</v-icon>
															<v-icon title="Click to remove" @click="removeCsv">mdi-close-circle-outline</v-icon>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</v-radio-group>
							<!-- Type Tags -->
							<div class="margin-top-md margin-bottom-xxl">
								<div class="flex">
									<div style="min-width: 120px">
										<div>
											<span class="font-semibold color-black-2 text-16">Tags:</span>
										</div>
									</div>
									<div class="width-100%">
										<div class="font-semibold text-18 margin-bottom-md">Which tags you would like to run campaigns on?
										</div>
										<multiselect hideSelected v-model="listTagsAdded" @tag="addTag" :options="listOptionsTags"
											:searchable="true" :multiple="true" :taggable="true" :close-on-select="true" :show-labels="true"
											placeholder="Search or add a tag"></multiselect>
									</div>
								</div>
							</div>
						</aside>
						<!-- Devices target subpage -->
						<aside v-show="targetPage == 'devices'">
							<div class="text-md color-black-2 margin-bottom-lg">Devices</div>
							<div class="margin-bottom-xl" v-for="i in listDevice" :key="'device-' + i.label">
								<LeCheckbox class v-model="i.checked">
									<span class="margin-left-sm">
										{{ i.label }}
										<img class="margin-left-md" style="vertical-align: middle" :src="`/img/icons/device_${i.value}.svg`"
											alt />
									</span>
								</LeCheckbox>
							</div>
						</aside>
					</section>
				</div>
			</div>
		</section>

		<!-- TODO: Trigger page -->
		<section v-show="step == 'TRIGGER'">
			<div class="padding-top-xl padding-left-xxl">
				<div class="font-semibold">Choose when the visitors see the popup. You have to choose one.</div>
				<div>
					<div class="grid">
						<div class="col-6">
							<div class="grid">
								<div class="col-12 col-6@md col-4@lg">
									<div @click="chooseTrigger('on_landing')" :class="{ 'le-active': triggerPage == 'on_landing' }"
										class="le-trigger-item text-center padding-y-md cursor-pointer">
										<img draggable="false" src="/img/icons/trigger_landing.svg" alt />
										<div class="color-primary text-15">On Landing</div>
										<small class="color-gray-300">When users load the page</small>
									</div>
								</div>
								<div class="col-12 col-6@md col-4@lg">
									<div @click="chooseTrigger('on_scroll')" :class="{ 'le-active': triggerPage == 'on_scroll' }"
										class="le-trigger-item text-center padding-y-md cursor-pointer">
										<img draggable="false" src="/img/icons/trigger_scroll.svg" alt />
										<div class="color-primary text-15">On Scroll</div>
										<small class="color-gray-300">When users scroll on the page</small>
									</div>
								</div>
							</div>
						</div>
						<div class="col-6">
							<aside v-show="triggerPage == 'on_landing'">
								<div>
									<LeCheckbox :value="true" class="no-click">
										<span class="font-semibold color-black-2 text-18">Time on Page</span>
									</LeCheckbox>
									<div class="flex items-center" style="padding-left: 35px">
										<div class="margin-right-md text-15">The visitors are on the page for</div>
										<div>
											<div>
												<input v-model="timeOnNumber" min="3" max="100" class="le-input-number margin-right-sm"
													type="number" oninput="this.value = Math.abs(this.value)" />
												<span class="text-sm font-bold">Second (s)</span>
											</div>
										</div>
									</div>
								</div>
							</aside>
							<aside v-show="triggerPage == 'on_scroll'">
								<div>
									<LeCheckbox :value="true" class="no-click">
										<span class="font-semibold color-black-2 text-18">Show after Scrolling</span>
									</LeCheckbox>
									<div class="flex items-center" style="padding-left: 35px">
										<div class="margin-right-md text-15">The visitors scroll</div>
										<div class="flex items-center">
											<div class="le-has-arrow arrow-right-black">
												<select v-model="scrollNumber" class="le-input-number margin-right-sm">
													<option value="25">25</option>
													<option value="50">50</option>
													<option value="75">75</option>
													<option value="100">100</option>
												</select>
											</div>
											<span class="text-sm font-bold">% of the page</span>
										</div>
									</div>
								</div>
							</aside>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- TODO: DESIGN PAGE -->
		<section v-show="['DESIGN'].includes(step)" class="padding-top-0">
			<BuilderDesignLayout></BuilderDesignLayout>

			<portal to="builderCampaignName">
				<div class="padding-sm">
					<div class="mb-1 text-sm color-primary">Campaign name</div>
					<input class="le-input-builder" v-model="campaignName" type="text" placeholder="Campaign name..." />
				</div>
			</portal>
		</section>

		<!-- TODO: SETTINGS PAGE -->
		<section v-show="step == 'SETTINGS'">
			<div class="padding-x-lg padding-top-lg">
				<div class="margin-top-xl flex gap-sm flex-wrap">
					<CampaignSettingsSubpage :apprStartTime="apprStartTime" @apprStartTime="onApprStartTime"
						:apprEndTime="apprEndTime" @apprEndTime="onApprEndTime" :startDateRange="startDateRange"
						@startDateRangeChange="onStartDateRangeChange" :endDateRange="endDateRange"
						@endDateRangeChange="onEndDateRangeChange" :startTimeRange="startTimeRange"
						@startTimeRangeChange="onStartTimeRangeChange" :endTimeRange="endTimeRange"
						@endTimeRangeChange="onEndTimeRangeChange" :frequency="campaignSettingsFrequency"
						@frequencyChange="onFrequencyChange" :leads="campaignSettingsLeads" @leadsChange="onLeadsChange"
						:pricePerLead="campaignSettingsPricePerLeads" @pricePerLeadChange="onPricePerLeadChange"
						:isSponsoredContent="isSponsoredContent" @isSponsoredContentChange="onIsSponsoredContentChange"
						:forever="forever" @foreverChange="onForeverChange" :includeSponsoredOnlyList="includeSponsoredOnlyList"
						@includeSponsoredOnlyList="onIncludeSponsoredList" />
				</div>
			</div>
		</section>
	</section>
</template>

<script>
import { mapState, createNamespacedHelpers } from 'vuex';
import draggable from 'vuedraggable';
import Multiselect from 'vue-multiselect';
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import { CAMPAIGN_STEPS, CAMPAIGN_TARGET_TYPE } from '@/constants/app-constants';
import Api from '@/api';
import { API_PATH, API_STATUS } from '@/constants/api-constants';
import { ROUTER } from '@/constants/router-constant';

import { DISPLAY_TYPE, listDevice, listLayout } from './listData';
import { CAMPPAIGN_TRIGGER } from '@/constants/app-constants';
import CampaignSettingsSubpage from './CampaignSettingsSubpage';
import { convertActionBlock, convertDataForm, convertDataTextBlocks, convertDataThankYou, convertImageBlocks, mappingFormAddedData, removeImageValueBase64ForPost } from './convertData';

import BuilderDesignLayout from './BuilderDesignLayout';
import { findDuplicateKeyField, findTNCWithWrongURLFormat } from './listAddField'
const { mapGetters: mapGettersBuilder } = createNamespacedHelpers('builder');

export default {
	components: {
		draggable,
		Multiselect,
		vueDropzone: vue2Dropzone,
		CampaignSettingsSubpage,
		BuilderDesignLayout,
	},
	data() {
		return {
			// Campaign Info
			isEditMode: false,
			campaignName: 'Campaign ',
			editId: null,
			queryData: {}, // Data get from query string like ?siteID=1
			campaignStatus: 1,
			errorText: '',
			// Nav steper
			step: CAMPAIGN_STEPS.TARGET,
			stepNumber: 0,
			listSteps: _.values(CAMPAIGN_STEPS),
			// Csv
			csvFile: null,
			csvData: {
				isImported: false,
				status: 0,
				loading: true,
				name: 'lead.csv',
				size: 0,
				errors: [],
			},
			isAddedCSV: false,
			dropzoneOptions: {
				url: Api.getUri({ url: API_PATH.CSV_VALIDATION }),
				paramName: 'csv',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
				},
				params: {
					site_id: `${this.$route.query.siteID}`,
				},
				thumbnailWidth: 150,
				maxFilesize: 10,
				maxFiles: 1,
				acceptedFiles: '.csv, application/vnd.ms-excel, text/csv',
			},
			// Target links or tags
			listDevice: listDevice(),
			targetPage: 'pages',
			targetLinkType: 'link', // or 'csv'
			listOptionsTags: ['covid', 'health', 'virus'],
			listOptionsLink: [
				{ label: 'Start with', value: 'start_with' },
				{ label: 'Exact match', value: 'exact_match' },
			],
			listTagsAdded: [],
			listTargetAdded: [
				{
					target: '',
					error: 'Please add link',
					valid: false,
					type: { label: 'Start with', value: 'start_with' },
					options: {
						sub_target: [],
					},
				},
			],
			// Trigger
			triggerPage: 'on_landing',
			scrollNumber: 25,
			timeOnNumber: 3,
			ruleShowPopup: 'time',
			// Campaign Settings
			startDateRange: new Date(),
			endDateRange: new Date(),
			startTimeRange: '00:00',
			endTimeRange: '00:00',
			apprStartTime: '',
			apprEndTime: '',
			campaignSettingsFrequency: '7',
			campaignSettingsLeads: '500',
			campaignSettingsPricePerLeads: 2.5,
			isSponsoredContent: true,
			includeSponsoredOnlyList: [],
			impressions: '',
			forever: 1,
			isExpired: false,
			// End Campaign Settings

			// TODO: new builder
			listLayout: listLayout,
		};
	},
	computed: {
		...mapGettersBuilder(['hasPhoneOtpField']),
		...mapState('auth', {
			userData: (state) => state.userData,
		}),
		...mapState('builder', {
			currentLayout: (state) => state.currentLayout,
			sponsorListHash: (state) => state.sponsorList
		}),
		isShowThankYou: {
			get() {
				return this.$store.state.builder.isShowThankYou;
			},
			set(value) {
				this.$store.commit('builder/SET_DATA', {
					key: 'isShowThankYou',
					value,
				});
			},
		},
		formattedStartDate: function () {
			let m = moment(this.startDateRange, 'ddd MMM D YYYY HH:mm:ss ZZ');
			let startHour = this.startTimeRange ? this.startTimeRange.split(':')[0] : '00';
			m.set({ h: parseInt(startHour), m: 0 });
			return m.format('YYYY-MM-DD HH:mm:ss');
		},
		formattedEndDate: function () {
			let m = moment(this.endDateRange, 'ddd MMM D YYYY HH:mm:ss ZZ');
			let endHour = this.endTimeRange ? this.endTimeRange.split(':')[0] : '00';
			m.set({ h: parseInt(endHour), m: 0 });
			return m.format('YYYY-MM-DD HH:mm:ss');
		},
	},
	beforeMount() {
		this.isEditMode = this.$router.currentRoute.meta.mode == 'edit';
		//TODO: load data query
		const campaignNameQuery = this.$route.query.campaignName;
		const siteQuery = this.$route.query.siteID;
		const clientQuery = this.$route.query.clientID;
		this.userData.hostname = this.$route.query.siteURL || '';
		if (campaignNameQuery) {
			this.campaignName = campaignNameQuery;
		}
		if (siteQuery) {
			this.queryData['site'] = siteQuery;
		}
		if (clientQuery) {
			this.queryData['client'] = clientQuery;
		}
		// TODO: LOAD DATA FROM API
		if (this.isEditMode) {
			const { params = {} } = this.$route;
			const { id } = params;
			if (id) {
				this.editId = id;
				Api.get(API_PATH.CAMPAIGN + `/` + id).then((res) => {
					if (res.data._status == API_STATUS.SUCCESS) {
						const data = res.data._data;
						const { campaign = {} } = data;
						this.campaignName = campaign.name;
						console.log(`beforeMount -> campaign`, campaign);
						const extra = campaign.extra_fields;
						console.log('😀 extra', extra);

						// newbuilder
						this.$store.commit('builder/SET_DATA', {
							key: 'popupShowThankYou',
							value: extra.popupShowThankYou,
						});

						this.$store.commit('builder/SET_DATA', {
							key: 'imageBlocks',
							value: convertImageBlocks(campaign),
						});

						if (extra.popupVersion != '2.1') {
							// TODO:  Convert data for newbuilder
							this.$store.commit('builder/SET_DATA', {
								key: 'listBlockAdded',
								value: convertDataForm(campaign),
							});
							this.$store.commit('builder/SET_DATA', {
								key: 'textBlocks',
								value: convertDataTextBlocks(campaign),
							});
							this.$store.commit('builder/SET_DATA', {
								key: 'actionBlocks',
								value: convertActionBlock(campaign),
							});
							this.$store.commit('builder/SET_DATA', {
								key: 'listBlockThankyou',
								value: convertDataThankYou(campaign),
							});
							this.$store.commit('builder/SET_DATA', {
								key: 'currentLayout',
								value: 'LightBoxA',
							});
						} else {
							// newbuider
							this.$store.commit('builder/SET_DATA', {
								key: 'actionBlocks',
								value: JSON.parse(extra.actionBlocks),
							});

							this.$store.commit('builder/SET_DATA', {
								key: 'textBlocks',
								value: JSON.parse(extra.textBlocks),
							});

							this.$store.commit('builder/SET_DATA', {
								key: 'listBlockAdded',
								value: JSON.parse(extra.listBlockAdded),
							});

							this.$store.commit('builder/SET_DATA', {
								key: 'listBlockThankyou',
								value: JSON.parse(extra.listBlockThankyou),
							});

							this.$store.commit('builder/SET_DATA', {
								key: 'currentLayout',
								value: extra.currentLayout,
							});
							// TODO: list layout only desktop
							if (['Sidebar', 'Fullscreen', 'Slider'].includes(extra.currentLayout)) {
								this.$store.commit('builder/SET_DATA', {
									key: 'displayType',
									value: 'Desktop',
								});
								this.$store.commit('builder/SET_DATA', {
									key: 'displayOn',
									value: 'Desktop',
								});
							}
							this.$store.commit('builder/SET_DATA', {
								key: 'popupInlinePosition',
								value: _.get(extra, 'popupInlinePosition', '6th'),
							});
						}

						// list field show
						try {
							this.campaignStatus = campaign.status;

							// TODO: LOAD DATA FROM campaign.target
							const listTargetTags = campaign.targets.filter((i) => i.type == CAMPAIGN_TARGET_TYPE.TAGS);
							const listTargetLinks = campaign.targets.filter((i) => i.type == CAMPAIGN_TARGET_TYPE.LINKS && i.is_import == 0 && ['start_with', 'exact_match'].includes(i.option));
							if (listTargetTags && listTargetTags.length) {
								this.listTagsAdded = listTargetTags.map((i) => String(i.target));
							}
							if (listTargetLinks && listTargetLinks.length) {
								const typeObj = {
									start_with: {
										label: 'Start with',
										value: 'start_with',
									},
									exact_match: {
										label: 'Exatch match',
										value: 'exact_match',
									},
								};
								const dataConvertLink = listTargetLinks.map((i) => ({
									valid: true,
									target: decodeURI(i.target),
									options: {
										sub_target: i.sub_target.map((v) => {
											// Noted: Need decode twice for get data
											const decodeValue = decodeURI(decodeURI(v.value));
											return {
												option: v.option,
												value: decodeValue,
											};
										}),
									},
									type: typeObj[i.option],
								}));
								this.listTargetAdded = dataConvertLink;
							} else {
								this.listTargetAdded[0].target = 'https://' + campaign.site.name + '/sample' || '';
								this.userData.hostname = campaign.site.name;
								this.checkLink(this.listTargetAdded[0]);
							}

							this.queryData['site'] = campaign.site.id;
							this.queryData['client'] = campaign.client.id;
						} catch (error) {
							console.error('Cant parse data campaign', error);
						}

						// extra field
						this.popUpTitle = extra.title;
						this.popUpSubmit = extra.submit;
						this.popupDesc = extra.desc;

						// CSV
						this.targetLinkType = extra.targetLinkType || 'link';
						this.csvData.isImported = Boolean(campaign.is_target_import);

						if (extra.csvName) {
							this.csvData.name = extra.csvName;
						}

						// Time
						this.startDateRange = moment(campaign.started_at, 'YYYY-MM-DD HH:mm:ss');
						this.endDateRange = moment(campaign.ended_at, 'YYYY-MM-DD HH:mm:ss');
						this.startTimeRange = this.startDateRange.format('HH:mm');
						this.endTimeRange = this.endDateRange.format('HH:mm');

						// Frequency
						let campaignSettingsFrequency = Number(_.get(_.find(campaign.rules, ['rule', 'days_to_show_again']), 'value'));

						this.campaignSettingsFrequency = campaignSettingsFrequency;

						// Excluded sponsored
						let isExcludedSponsored = Number(_.get(_.find(campaign.rules, ['rule', 'exclude_sponsored']), 'value'));
						this.isSponsoredContent = isExcludedSponsored == '1' ? true : false;

						// Excluded sponsored list
						try {
							// TODO: Rename later exclude_sponsored_list -> include_sponsored_only_list
							const valueFromApi = _.get(_.find(campaign.rules, ['rule', 'exclude_sponsored_list']), 'value')
							const includeSponsoredOnlyList = valueFromApi instanceof Array ? valueFromApi : JSON.parse(valueFromApi)
							this.includeSponsoredOnlyList = includeSponsoredOnlyList.map(sObj => sObj.id)
						} catch (err) {
							console.error(err)
						}

						// Apprearance time
						this.apprStartTime = _.get(_.find(campaign.rules, ['rule', 'appearance_time']), 'value.startTime') || ''
						this.apprEndTime = _.get(_.find(campaign.rules, ['rule', 'appearance_time']), 'value.endTime') || ''

						// KPIs
						let leads = campaign.kpis ? Number(campaign.kpis.lead) : '';
						this.campaignSettingsLeads = leads;
						let impressions = campaign.kpis ? Number(campaign.kpis.impression) : '';
						this.impressions = impressions ? impressions : '';

						// Forever
						this.forever = campaign.forever;

						// Price
						this.campaignSettingsPricePerLeads = campaign.price;

						// Load rules
						campaign.rules &&
							campaign.rules.length &&
							campaign.rules.forEach((i) => {
								if (i.rule == 'scroll') {
									this.triggerPage = 'on_scroll';
									this.ruleShowPopup = 'scroll';
									this.scrollNumber = Number(i.value);
								}
								if (i.rule == 'time') {
									this.ruleShowPopup = 'time';
									this.triggerPage = 'on_landing';
									this.timeOnNumber = Number(i.value);
								}
							});

						// TODO: HP-534 List devices:
						if (data.campaign.device_types && data.campaign.device_types.length) {
							const listDeviceID = data.campaign.device_types.map((d) => d.id);
							this.listDevice.forEach((d) => {
								if (listDeviceID.includes(d.value)) {
									d.checked = true;
								} else {
									d.checked = false;
								}
							});
						}
						// HP-534 End List devices:
						// set step
						this.setStep(CAMPAIGN_STEPS.DESIGN);
						// TODO: is_expired
						this.isExpired = data.campaign.is_expired;
					}
				});
			}
		}
	},
	mounted() {
		validate.validators.contain_link = function (value, options) {
			if (!value.includes(options)) {
				return `not include ${options}.`;
			}
		};

		this.isEditMode = this.$router.currentRoute.meta.mode == 'edit';

		this.listTargetAdded[0].target = 'https://' + this.userData.hostname + '/sample' || '';
		this.checkLink(this.listTargetAdded[0]);
	},
	methods: {
		chooseTrigger(type) {
			this.triggerPage = type;
			if (type == 'on_scroll') {
				this.ruleShowPopup = 'scroll';
			}
			if (type == 'on_landing') {
				this.ruleShowPopup = 'time';
			}
		},
		onAddCSVFile(file) {
			console.log(`onAddCSVFile -> file`, file);
			this.targetLinkType = 'csv';
			this.csvData.status = 0;
			this.csvData.errors = [];
			this.csvData.name = file.name;
			this.csvData.size = bytes2Size(file.size, 2);

			function bytes2Size(byteVal) {
				var units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
				var kounter = 0;
				var kb = 1024;
				var div = byteVal / 1;
				while (div >= kb) {
					kounter++;
					div = div / kb;
				}
				return div.toFixed(1) + ' ' + units[kounter];
			}

			this.isAddedCSV = true;
			this.csvFile = file;
		},
		onRemoveCSVFile(file, error, xhr) {
			this.isAddedCSV = false;
		},
		onErrorCSVFile(file, message, xhr) {
			this.isAddedCSV = true;
			this.csvData.status = -1;
			this.csvData.errors = ['Something wrong, please try again'];
			this.csvData.name = file.name;
			this.csvData.loading = false;
		},
		//- UTILS
		deleteArrayByIndex: function (field, index) {
			this[field].splice(index, 1);
		},
		removeArrayByIndexRef(list, index) {
			list.splice(index, 1);
		},
		addTag(newTag) {
			this.listOptionsTags.push(newTag);
			this.listTagsAdded.push(newTag);
		},
		addOption(type, list) {
			list.push({ option: type, value: '' });
		},
		isValid() {
			if (this.targetLinkType == 'csv' && this.csvData.status == -1) {
				return false;
			}

			if (!this.isEditMode && this.targetLinkType == 'csv' && [0, -1].includes(this.csvData.status)) {
				return false;
			}

			if (this.isEditMode && this.targetLinkType == 'csv' && !this.csvFile && !this.csvData.isImported) {
				return false;
			}

			return Boolean(this.campaignName);
		},
		//- CREATE OR UPDATE CAMPAIGN
		createOrEditCampaign() {
			// TODO: Check if expired, then call reactivate
			if (this.isEditMode && this.isExpired) {
				let activationData = {
					started_at: this.forever ? null : this.formattedStartDate,
					ended_at: this.forever ? null : this.formattedEndDate,
				};
				Api.post(API_PATH.CAMPAIGN + `/${this.editId}/activation`, activationData)
					.then((res) => { })
					.catch((e) => { });
			}
			let dataRule = [
				{
					rule: 'campaign_popup_exit',
					value: '7',
				},
				{
					rule: 'site_popup_exit',
					value: '7',
				},
				{
					rule: 'show_again_after_submit',
					value: '0',
				},
				//
				{
					rule: 'show_again_after_exit',
					value: '0',
				},
				{
					rule: 'appearance_time',
					value: {
						startTime: this.apprStartTime,
						endTime: this.apprEndTime,
					}
				},
			];
			// TODO: Campaign Settings (set frequency)
			if (this.campaignSettingsFrequency) {
				dataRule.push({
					rule: 'days_to_show_again',
					value: this.campaignSettingsFrequency,
				});
			}
			// TODO: Campaign Settings (set exclude sponsored)
			dataRule.push({
				rule: 'exclude_sponsored',
				value: this.isSponsoredContent ? '1' : '0',
			});

			// Set include sponsored clients only list
			// TODO: Rename later exclude_sponsored_list -> include_sponsored_only_list
			dataRule.push({
				rule: 'exclude_sponsored_list',
				value: this.includeSponsoredOnlyList
					?.map(sponsoredId => {
						return this.sponsorListHash[this.$route.query.siteID].find(s => s.id === sponsoredId)
					})
					.filter(Boolean) || []
			})

			if (this.ruleShowPopup == 'scroll') {
				dataRule.push({ rule: 'scroll', value: this.scrollNumber });
			}
			if (this.ruleShowPopup == 'time') {
				dataRule.push({ rule: 'time', value: this.timeOnNumber });
			}
			let targetsData = [];

			const tempLinks = this.listTargetAdded.map((i) => ({
				type: CAMPAIGN_TARGET_TYPE.LINKS,
				option: i.type.value,
				target: (i.target.includes('%') ? i.target : encodeURI(i.target)).toLowerCase(),
				sub_target:
					i.type.value === 'start_with'
						? i.options.sub_target.map((v) => ({
							option: v.option,
							value: (v.value.includes('%') ? v.value : encodeURI(v.value)).toLowerCase(),
						}))
						: null,
			}));
			targetsData = targetsData.concat(_.cloneDeep(tempLinks));

			const tempTags = this.listTagsAdded.map((name) => ({
				type: CAMPAIGN_TARGET_TYPE.TAGS,
				target: name,
			}));
			targetsData = targetsData.concat(_.cloneDeep(tempTags));

			let triggerType = '';
			if (this.ruleShowPopup == 'scroll') {
				triggerType = CAMPPAIGN_TRIGGER.TRIGGER_TYPE_ON_SCROLL;
			} else {
				triggerType = CAMPPAIGN_TRIGGER.TRIGGER_TYPE_ON_LANDING;
			}

			// TODO: HP-534 List devices:
			let listDevicesChecked = this.listDevice.filter((d) => d.checked).map((d) => d.value);
			// HP-534 End List devices:
			// TODO: Campaign Settings (set kpis)
			let kpis = [];
			if (this.campaignSettingsLeads != null) {
				kpis.push({
					name: 'lead',
					value: this.campaignSettingsLeads,
				});
			}

			const builderState = this.$store.state.builder;

			/** Validate block added value empty or not */
			const foundFieldEmptyValue = builderState.listBlockAdded.find(o => !o?.data?.value)
			if (builderState.listBlockAdded.length && foundFieldEmptyValue) {
				this.$notify({
					title: `The field ${foundFieldEmptyValue.data?.placeholder || foundFieldEmptyValue.name} has empty value. Please check again!`,
					type: 'error',
				});
				try {
					document.querySelector('.mark-error-value')?.click()
					requestAnimationFrame(() => {
						document.querySelector('.error-border')?.scrollIntoView({ behavior: "smooth" })
						document.querySelector('.error-border')?.focus()
					})
				} catch (err) {}
				return
			}

			/** Validate block added value duplicated or not */
			const foundFieldDuplicatedValue = findDuplicateKeyField(builderState.listBlockAdded)
			if (builderState.listBlockAdded.length && foundFieldDuplicatedValue) {
				this.$notify({
					title: `The key of block "${foundFieldDuplicatedValue.data?.placeholder || foundFieldDuplicatedValue.name}" is duplicated. Please select that field and type another value!`,
					type: 'error',
				});
				return
			}

			/** Validate TNCBlock with wrong format of URL */
			const errorTNC = findTNCWithWrongURLFormat(builderState.listBlockAdded)
			if (errorTNC) {
				this.$notify({
					title: errorTNC,
					type: 'error',
				});
				return
			}

			const data = {
				name: this.campaignName,
				// TODO: newbuilder
				display_type: DISPLAY_TYPE[builderState.currentLayout.replace('Mobile', '').replace('Desktop', '')].value,
				device_types: listDevicesChecked,
				status: this.campaignStatus,
				rules: dataRule,
				trigger_type: triggerType,
				// TODO: newbuilder mapping dataform
				forms: mappingFormAddedData(builderState.listBlockAdded),
				extra_fields: {
					// Version
					popupVersion: '2.1',
					// csv
					csvName: this.csvData.name,
					targetLinkType: this.targetLinkType,
					// TODO: newbuilder
					popupShowThankYou: builderState.popupShowThankYou,
					currentLayout: builderState.currentLayout,
					actionBlocks: JSON.stringify(builderState.actionBlocks),
					listBlockAdded: JSON.stringify(builderState.listBlockAdded),
					listBlockThankyou: JSON.stringify(builderState.listBlockThankyou),
					textBlocks: JSON.stringify(builderState.textBlocks),
					popupInlinePosition: builderState.popupInlinePosition,
					imageBlocks: JSON.stringify(removeImageValueBase64ForPost(builderState.imageBlocks)),
				},
				is_target_import: this.targetLinkType == 'link' ? 0 : 1,
				started_at: this.forever ? null : this.formattedStartDate,
				ended_at: this.forever ? null : this.formattedEndDate,
				forever: this.forever,
				targets: targetsData,
				trigger_type: this.triggerPage,
				// TODO: add site and client query data
				site_id: this.queryData['site'],
				client_id: this.queryData['client'],
				// TODO: Campaign Settings
				kpis: kpis,
				// TODO: Price
				price: this.campaignSettingsPricePerLeads,
				// TODO: newbuilder Images
				image: _.get(builderState, 'imageBlocks.imageMobile.data.value', null),
				// image
				image_desktop: _.get(builderState, 'imageBlocks.imageDesktop.data.value', null),
				thank_you_image: _.get(builderState, 'imageBlocks.imageThankYou.data.value', null),
				image_background: _.get(builderState, 'imageBlocks.imageBackground.data.value', null),
				image_overlay_desktop: _.get(builderState, 'imageBlocks.imageOverlayDesktop.data.value', null),
				image_overlay_mobile: _.get(builderState, 'imageBlocks.imageOverlayMobile.data.value', null),
			};

			Api[this.isEditMode ? 'put' : 'post'](API_PATH.CAMPAIGN + (this.isEditMode ? `/${this.editId}` : ''), data)
				.then((res) => {
					const dataRes = res.data;
					if (dataRes._status == API_STATUS.SUCCESS) {
						const campaignID = dataRes._data.model.id;
						if (this.csvFile) {
							this.uploadCSV(campaignID)
								.then((r) => {
									if (r.data._status == 1) {
										this.afterSuccess();
									} else {
										const message = r.data._messages[0];
										this.$notify({
											title: message,
											text: 'Please try again or contact admin!',
											type: 'error',
										});
									}
								})
								.catch((e) => {
									console.error(e);
								});
						} else {
							this.afterSuccess();
						}
					} else {
						this.$notify({
							title: res.data._messages[0],
							type: 'error',
						});
					}
				})
				.catch((e) => { });
		},
		afterSuccess() {
			if (this.isEditMode) {
				this.$notify({
					title: 'Campaign has been updated!',
					type: 'success',
				});
				this.$router.push('/');
			} else {
				this.$router.push(ROUTER.CREATE_CAMPAIGN_SUCCESS.path);
			}
		},
		// TODO UPLOAD CSV
		uploadCSV(id) {
			if (!this.csvFile) return;
			let formData = new FormData();
			formData.append('csv', this.csvFile);
			formData.append('_method', 'put');
			return Api.post(API_PATH.CAMPAIGN + `/${id}?_target`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
		},
		//- TARGET LINK
		checkLink(link) {
			const validLink = validate(
				{ linkInput: link.target },
				{
					linkInput: {
						url: true,
						contain_link: this.userData.hostname,
					},
				},
			);
			link.error = _.head(_.get(validLink, 'linkInput'));
			if (!link.error) {
				link.valid = true;
			}
			this.$forceUpdate();
		},
		addLink() {
			const linkAdded = {
				target: 'https://' + this.userData.hostname + '/' || '',
				error: 'Please add link',
				valid: false,
				type: { label: 'Exact match', value: 'exact_match' },
				options: {
					sub_target: [],
				},
			};
			this.listTargetAdded.push(linkAdded);
			this.checkLink(linkAdded);
		},
		removeLink(indexRemove) {
			this.listTargetAdded = this.listTargetAdded.filter((i, index) => index != indexRemove);
		},
		//- UPLOAD IMAGE
		readURL(e, dataField) {
			const input = e.target;
			if (input.files && input.files[0]) {
				if (input.files[0].size > 520000) {
					Swal.fire('Your image is too large', 'Please upload an image that is less than 500Kb.', 'info');
					return;
				}
				const reader = new FileReader();
				const app = this;
				reader.readAsDataURL(input.files[0]); // convert to base64 string
				reader.onload = function (e) {
					app[dataField] = e.target.result;
				};
			}
		},
		removeImage(dataField) {
			this[dataField] = null;
		},
		//- STEPPER
		backStep() {
			if (this.stepNumber > 0) {
				this.stepNumber--;
				this.setStep();
			}
		},
		nextStep() {
			/** Auto show Thank You Page to design if has OTP field in the form when user click on Next button */
			if (this.step === CAMPAIGN_STEPS.DESIGN && !this.isShowThankYou && this.hasPhoneOtpField) {
				this.isShowThankYou = true
				return
			}
			if (this.stepNumber < this.listSteps.length - 1) {
				this.stepNumber++;
				this.setStep();
			}
		},
		setStep(step) {
			if (step) {
				this.step = step;
				this.stepNumber = _.findIndex(this.listSteps, (i) => i == step);
			} else {
				this.step = this.listSteps[this.stepNumber];
			}
		},
		isValidStep() {
			let isValid = true;
			const { step, listTagsAdded, listTargetAdded } = this;
			if (step == CAMPAIGN_STEPS.TARGET) {
				if (!isValid) {
					this.errorText = 'Please add at least one link or tag.';
				}
			}
			// CSV valid
			if (step == CAMPAIGN_STEPS.TARGET) {
				if (!this.isEditMode && this.targetLinkType == 'csv' && [0, -1].includes(this.csvData.status)) {
					isValid = false;
				}
			}
			// newbuilder
			if (step == CAMPAIGN_STEPS.TEMPLATE && !this.currentLayout) {
				isValid = false;
			}

			return isValid;
		},
		// Buider page

		decodeInputURL(i, k) {
			if (!i[k]) return;
			i[k] = decodeURI(i[k]);
		},
		// Campaign Settings
		onApprStartTime(value) { this.apprStartTime = value },
		onApprEndTime(value) { this.apprEndTime = value },
		onStartDateRangeChange(value) {
			this.startDateRange = value;
		},
		onEndDateRangeChange(value) {
			this.endDateRange = value;
		},
		onStartTimeRangeChange(value) {
			this.startTimeRange = value;
		},
		onEndTimeRangeChange(value) {
			this.endTimeRange = value;
		},
		onFrequencyChange(value) {
			this.campaignSettingsFrequency = value;
		},
		onLeadsChange(value) {
			this.campaignSettingsLeads = value;
		},
		onPricePerLeadChange(value) {
			this.campaignSettingsPricePerLeads = value;
		},
		onIsSponsoredContentChange(value) {
			this.isSponsoredContent = value;
		},
		onIncludeSponsoredList(value) {
			this.includeSponsoredOnlyList = value
		},
		onTimeRangeChange(value) {
			this.timeRange = value;
		},
		onForeverChange(value) {
			this.forever = value;
		},
		// upload csv
		downloadSample() {
			Api.post(API_PATH.CSV_DOWNLOAD_SAMPLE, {
				site_id: this.$route.query.siteID,
			}).then((res) => {
				this.exportCSV(res.data, `lead-sample-${this.$route.query.siteURL}.csv`);
			});
		},
		csvSuccess(file, res) {
			this.csvData.status = res._status;
			this.csvData.loading = false;
			if (res._status == -1) {
				this.csvData.errors = res._messages;
			}
		},
		downloadCsv() {
			Api.get(`/api/admin/campaign/${this.editId}/targets/csv`).then((res) => {
				this.exportCSV(res.data, this.csvData.name);
			});
		},
		removeCsv() {
			if (this.$refs.leadCsv) {
				this.$refs.leadCsv.removeAllFiles();
			}
			this.csvData.status = -1;
			this.csvData.isImported = false;
		},
		exportCSV(data, name) {
			var blob = new Blob([data]);
			var link = document.createElement('a');
			link.href = window.URL.createObjectURL(blob);
			link.download = `${name}`;
			link.click();
			link.remove();
		},
		// end upload csv
		// TODO: newbuilder
		selectLayout(item) {
			this.$store.commit('builder/reset');
			this.$store.commit('builder/setSampleLayoutBlock', item);
			this.$store.commit('builder/SET_DATA', {
				key: 'currentLayout',
				value: item.value,
			});
			// TODO: newbuilder reset other layout option
			this.$store.commit('builder/SET_DATA', {
				key: 'displayOn',
				value: item.displayOn,
			});
			this.$store.commit('builder/SET_DATA', {
				key: 'displayType',
				value: item.displayOn == 'both' ? 'Mobile' : item.displayOn,
			});
			this.$store.commit('builder/SET_DATA', {
				key: 'popupInlinePosition',
				value: '6th',
			});
			this.setStep('TRIGGER');
		},
	},
	destroyed() {
		// TODO: newbuilder
		this.$store.commit('builder/reset');
	},
};
</script>import { includes } from 'lodash';

