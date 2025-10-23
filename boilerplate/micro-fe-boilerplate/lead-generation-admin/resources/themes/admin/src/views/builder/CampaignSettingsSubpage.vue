<template>
	<v-card class="le-campaign-settings-tabs">
		<v-tabs vertical class="le-campaign-settings-tab">
			<v-tab active style="margin-bottom:80px">
				<img src="/img/icons/icon-timeframe.svg" />
				<div class="">
					<h3 class="font-bold text-none">Timeframe</h3>
				</div>
			</v-tab>
			<v-tab disabled>
				<img src="/img/icons/icon-frequency.svg" />
				<div class="">
					<h3 class="font-bold text-none">Apprearance Time</h3>
				</div>
			</v-tab>
			<v-tab disabled>
				<img src="/img/icons/icon-frequency.svg" />
				<div class="">
					<h3 class="font-bold text-none">Frequency</h3>
				</div>
			</v-tab>
			<v-tab disabled>
				<img src="/img/icons/icon-expected-leads.svg" />
				<div class="">
					<h3 class="font-bold text-none">Expected Leads</h3>
				</div>
			</v-tab>
			<v-tab disabled style="margin-bottom:70px">
				<img src="/img/icons/icon-price-per-lead.png" />
				<div class="">
					<h3 class="font-bold text-none">Price per Lead</h3>
				</div>
			</v-tab>
			<v-tab disabled>
				<img src="/img/icons/icon-sponsored-content.svg" />
				<div class="">
					<h3 class="font-bold text-none">Sponsored Content</h3>
					<p class="text-none">(Exclude all sponsored content)</p>
				</div>
			</v-tab>
			<v-tab disabled v-show="!isSponsoredContentValue">
				<img src="/img/icons/icon-sponsored-content.svg" />
				<div class="">
					<h3 class="font-bold text-none">Sponsored Content</h3>
					<p class="text-none">(Only show campaign for clients)</p>
				</div>
			</v-tab>

			<v-tab-item>
				<v-card flat>
					<div class="timeframe-header-input">
						<v-radio-group v-model="timeframeType">
							<div class="daterange-card">
								<v-radio :value="1">
									<template v-slot:label>
										<div class="font-12" :class="timeframeType == '1' ? '' : 'color-gray'">Start now / On going</div>
									</template>
								</v-radio>
							</div>
							<br />
							<div class="daterange-card d-flex">
								<v-radio :value="0" style="align-items: start">
								</v-radio>
								<v-card class="daterange-preview-card" outlined>
									<vc-date-picker class="le-date-picker" is-expanded :attributes='attrs' color="blue" v-model="startDate"
										:popover="{ visibility: 'click' }">
										<v-list-item class="preview-date">
											<div class="preview-date-group">
												<v-icon>mdi-calendar-range</v-icon>
												<span id="daterange-start-date">{{ startDateString ? startDateString : 'Start Date' }}</span>
											</div>
										</v-list-item>
									</vc-date-picker>
									<div v-show="dateError" class="le-error-text text-sx">{{ dateError }}</div>
								</v-card>
								<div class="le-select-time">
									<v-select :items="timeArray" outlined single-line prepend-inner-icon="mdi-clock-outline"
										placeholder="Start Time" v-model="startTime" hide-details>
									</v-select>
								</div>
								<span class="ml-30 mr-30 font-12 mt-2">to</span>
								<v-card class="daterange-preview-card" outlined>
									<vc-date-picker class="le-date-picker" is-expanded :attributes='attrs' color="blue" v-model="endDate"
										:popover="{ visibility: 'click' }">
										<v-list-item class="preview-date">
											<div class="preview-date-group">
												<v-icon>mdi-calendar-range</v-icon>
												<span id="daterange-end-date">{{ endDateString ? endDateString : 'End Date' }}</span>
											</div>
										</v-list-item>
									</vc-date-picker>
									<div v-show="dateError" class="le-error-text text-sx">{{ dateError }}</div>
								</v-card>
								<div class="le-select-time">
									<v-select :items="timeArray" outlined single-line prepend-inner-icon="mdi-clock-outline"
										placeholder="End Time" v-model="endTime" hide-details>
									</v-select>
								</div>
							</div>
						</v-radio-group>

					</div>
					<!-- Appearance Time -->
					<div class="timeframe-header-input" style="height: 92px;">
						<div class="d-flex">
							<div class="le-select-time" style="margin-left: 0;">
								<v-select :items="timeArray" outlined single-line prepend-inner-icon="mdi-clock-outline"
									placeholder="Start Time" v-model="apprStartTime" hide-details>
								</v-select>
							</div>
							<span class="ml-30 mr-30 font-12 mt-2">to</span>
							<div class="le-select-time">
								<v-select :items="timeArrayForEndTime" outlined single-line prepend-inner-icon="mdi-clock-outline"
									placeholder="End Time" v-model="apprEndTime" hide-details>
								</v-select>
							</div>
						</div>
					</div>
					<!-- Frequency -->
					<div class="input-wrapper d-flex justify-content-center align-items-center">
						<v-text-field single-line outlined v-model="frequencyValue" :error-messages="frequencyMatchError()">
							<template slot="append-outer"><span class="font-bold">day(s)</span></template>
						</v-text-field>
					</div>
					<div class="input-wrapper d-flex justify-content-center align-items-center">
						<v-text-field single-line outlined v-model="leadsValue" :error-messages="leadMatchError()">
							<template slot="append-outer"><span class="font-bold">leads</span></template>
						</v-text-field>
					</div>
					<div class="input-wrapper d-flex justify-content-center align-items-center">
						<v-text-field single-line outlined v-model="pricePerLeadValue" :error-messages="pricePerLeadMatchError()">
							<template slot="append-outer"><span class="font-bold">$</span></template>
						</v-text-field>
					</div>
					<div class="input-wrapper w-full d-flex align-start">
						<v-checkbox v-model="isSponsoredContentValue"
							v-tooltip.right="{ content: `<div class='le-tooltip-sponsor'>If the function <b>Exclude all sponsored content</b> is checked, the system will exclude all the clients' sponsored articles.</div>` }" />
					</div>
					<div class="input-wrapper w-full d-flex align-start" style="margin-top: -18px;">
						<v-autocomplete v-show="!isSponsoredContentValue" v-model="includeSponsoredOnlyListValue" :items="sponsorList"
							item-text="name" item-value="id" label="Select clients who sponsored this campaign" chips multiple outlined
							class="sponsor-autocomplete"></v-autocomplete>
					</div>
				</v-card>
			</v-tab-item>

		</v-tabs>
	</v-card>
</template>
<script>
import { IS_STAGING } from '../../constants';
export default {
	props: [
		'startDateRange', 'endDateRange',
		'startTimeRange', 'endTimeRange',
		'apprStartTime', 'apprEndTime',
		'frequency', 'leads', 'pricePerLead', 'isSponsoredContent',
		'forever', 'includeSponsoredOnlyList'
	],
	data: function () {
		return {
			attrs: [
				{
					key: "saturday and sunday",
					highlight: {
						color: 'white',
						fillMode: 'light',
						contentClass: 'text-red',
					},
					dates: {
						weekdays: [1, 7]
					}
				},
				{
					key: "normalday",
					highlight: {
						color: 'white',
						fillMode: 'light',
						contentClass: 'text-deep-blue',
					},
					dates: {
						weekdays: [2, 3, 4, 5, 6]
					}
				},
			],
			timeArray: [
				{
					value: '00:00',
					text: '00:00'
				},
				{
					value: '01:00',
					text: '01:00'
				},
				{
					value: '02:00',
					text: '02:00'
				},
				{
					value: '03:00',
					text: '03:00'
				},
				{
					value: '04:00',
					text: '04:00'
				},
				{
					value: '05:00',
					text: '05:00'
				},
				{
					value: '06:00',
					text: '06:00'
				},
				{
					value: '07:00',
					text: '07:00'
				},
				{
					value: '08:00',
					text: '08:00'
				},
				{
					value: '09:00',
					text: '09:00'
				},
				{
					value: '10:00',
					text: '10:00'
				},
				{
					value: '11:00',
					text: '11:00'
				},
				{
					value: '12:00',
					text: '12:00'
				},
				{
					value: '13:00',
					text: '13:00'
				},
				{
					value: '14:00',
					text: '14:00'
				},
				{
					value: '15:00',
					text: '15:00'
				},
				{
					value: '16:00',
					text: '16:00'
				},
				{
					value: '17:00',
					text: '17:00'
				},
				{
					value: '18:00',
					text: '18:00'
				},
				{
					value: '19:00',
					text: '19:00'
				},
				{
					value: '20:00',
					text: '20:00'
				},
				{
					value: '21:00',
					text: '21:00'
				},
				{
					value: '22:00',
					text: '22:00'
				},
				{
					value: '23:00',
					text: '23:00'
				},
			],
			startDate: !this.forever ? this.startDateRange : null,
			endDate: !this.forever ? this.endDateRange : null,
			startTime: !this.forever ? this.startTimeRange : null,
			endTime: !this.forever ? this.endTimeRange : null,
			timeframeType: this.forever,
			frequencyValue: this.frequency,
			pricePerLeadValue: this.pricePerLead,
			leadsValue: this.leads,
			isSponsoredContentValue: this.isSponsoredContent,
			includeSponsoredOnlyListValue: this.includeSponsoredOnlyList,
			dateError: '',
			apprStartTime: this.apprStartTime,
			apprEndTime: this.apprEndTime,
		}
	},
	computed: {
		startDateString: function () {
			if (this.startDate) {
				return moment(String(this.startDate)).format('MMM D, YYYY')
			}
		},
		endDateString: function () {
			if (this.endDate) {
				return moment(String(this.endDate)).format('MMM D, YYYY')
			}
		},
		fullStartDate: function () {
			if (this.startDate) {
				let m = moment(this.startDate, 'ddd MMM D YYYY HH:mm:ss ZZ')
				let startHour = this.startTime ? this.startTime.split(':')[0] : '00'
				m.set({ h: parseInt(startHour), m: 0 })
				return m
			}
		},
		fullEndDate: function () {
			if (this.endDate) {
				let m = moment(this.endDate, 'ddd MMM D YYYY HH:mm:ss ZZ')
				let endHour = this.endTime ? this.endTime.split(':')[0] : '00'
				m.set({ h: parseInt(endHour), m: 0 })
				return m
			}
		},
		sponsorList: function () {
			return this.$store.state.builder.sponsorList?.[this.$route.query.siteID] || []
		},
		timeArrayForEndTime: function () {
			const foundStartIdx = this.timeArray.findIndex((item) => item.value === this.apprStartTime)
			return this.timeArray.filter((item, idx) => {

				return idx > foundStartIdx
			})
		}
	},
	watch: {
		apprStartTime: {
			handler: function () {
				const foundStartIdx = this.timeArray.findIndex((item) => item.value === this.apprStartTime)
				const foundEndIdx = this.timeArray.findIndex((item) => item.value === this.apprEndTime)

				if (foundEndIdx !== -1 && foundEndIdx <= foundStartIdx) {
					this.apprEndTime = ''
				}

				this.$emit('apprStartTime', this.apprStartTime)
			}
		},
		apprEndTime: {
			handler: function () {
				this.$emit('apprEndTime', this.apprEndTime)
			}
		},
		startDateRange: {
			handler: function () {
				if (!this.forever) {
					this.startDate = this.startDateRange
					this.dateMatchError()
				}
			},
			deep: true
		},
		endDateRange: {
			handler: function () {
				if (!this.forever) {
					this.endDate = this.endDateRange
					this.dateMatchError()
				}
			},
			deep: true
		},
		startDate: {
			handler: function () {
				this.$emit('startDateRangeChange', this.startDate)
				this.dateMatchError()
			},
			deep: true
		},
		endDate: {
			handler: function () {
				this.$emit('endDateRangeChange', this.endDate)
				this.dateMatchError()
			},
			deep: true
		},
		startTimeRange: {
			handler: function () {
				if (!this.forever) {
					this.startTime = this.startTimeRange
					this.dateMatchError()
				}
			},
			deep: true
		},
		endTimeRange: {
			handler: function () {
				if (!this.forever) {
					this.endTime = this.endTimeRange
					this.dateMatchError()
				}
			},
			deep: true
		},
		startTime: {
			handler: function () {
				this.$emit('startTimeRangeChange', this.startTime)
				this.dateMatchError()
			},
			deep: true
		},
		endTime: {
			handler: function () {
				this.$emit('endTimeRangeChange', this.endTime)
				this.dateMatchError()
			},
			deep: true
		},
		frequency: {
			handler: function () {
				this.frequencyValue = this.frequency
			}
		},
		frequencyValue: {
			handler: function () {
				this.$emit('frequencyChange', this.frequencyValue)
			},
			deep: true
		},
		leads: {
			handler: function () {
				this.leadsValue = this.leads
			}
		},
		leadsValue: {
			handler: function () {
				this.$emit('leadsChange', this.leadsValue)
			},
			deep: true
		},
		pricePerLead: {
			handler: function () {
				this.pricePerLeadValue = this.pricePerLead
			}
		},
		pricePerLeadValue: {
			handler: function () {
				this.$emit('pricePerLeadChange', this.pricePerLeadValue)
			},
			deep: true
		},
		isSponsoredContent: {
			handler: function () {
				this.isSponsoredContentValue = this.isSponsoredContent
			}
		},
		isSponsoredContentValue: {
			handler: function () {
				this.$emit('isSponsoredContentChange', this.isSponsoredContentValue)
				if (this.isSponsoredContentValue) {
					this.includeSponsoredOnlyListValue = []
				}
			},
			deep: true
		},
		includeSponsoredOnlyList: {
			handler: function () {
				this.includeSponsoredOnlyListValue = this.includeSponsoredOnlyList
			}
		},
		includeSponsoredOnlyListValue: {
			handler: function () {
				this.$emit('includeSponsoredOnlyList', this.includeSponsoredOnlyListValue)
			},
			deep: true
		},
		forever: {
			handler: function () {
				this.timeframeType = this.forever
			},
			deep: true
		},
		timeframeType: {
			handler: function () {
				this.$emit('foreverChange', this.timeframeType)
			},
			deep: true
		}
	},
	created() {
		this.IS_STAGING = IS_STAGING
		this.IS_PRODUCTION = !IS_STAGING
	},
	mounted() {
		this.$store.dispatch('builder/actFetchSponsor', this.$route.query.siteID)
	},
	methods: {
		frequencyMatchError() {
			return ((!this.frequencyValue) || (this.frequencyValue && !isNaN(this.frequencyValue))) ? '' : 'Frequency must be a number'
		},
		leadMatchError() {
			return ((!this.leadsValue) || (this.leadsValue && !isNaN(this.leadsValue))) ? '' : 'Leads must be a number'
		},
		pricePerLeadMatchError() {
			return ((!this.pricePerLead) || (this.pricePerLead && !isNaN(this.pricePerLead))) ? '' : 'Price per lead must be a number'
		},
		timeMatchError() {
			if (this.startTime && this.endTime) {
				let startHour = this.startTime.split(':')[0]
				startHour = parseInt(startHour)
				let endHour = this.endTime.split(':')[0]
				endHour = parseInt(endHour)
				return (startHour > endHour) ? 'Start Hour must be less than End Hour' : ''
			} else return ''
		},
		dateMatchError() {
			if (this.startDate && this.endDate) {
				if (this.fullStartDate.isAfter(this.fullEndDate)) {
					this.dateError = 'Start Date must be less than End Date'
				} else {
					this.dateError = ''
				}
			} else {
				this.dateError = ''
			}
		}
	}
}
</script>
<style>
.v-list-item .v-list-item__title {
	font-size: 12px;
}
</style>
