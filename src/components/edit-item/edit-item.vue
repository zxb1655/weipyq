<template>
	<view class="set-item iconfont" :class="{'green' : finish}">
		
		<view class="set-item-text set-slide" :class="[{'arrow' : arrow},iconName]" v-if="type == 'slide'">
			{{title}}
			<slider class="right-slide" :value="slideValue" block-color="#07c160" activeColor="#07c160" :max="max" @change="sliderChange" />
			<input @input="sliderChange" class="slide-text" type="text" :value="slideValue" />
		</view>
		<view class="set-item-text set-slide" :class="[{'arrow' : arrow},iconName]" v-if="type == 'switch'">
			{{title}}
			<switch @change="switchChange" color="#07c160" />
		</view>
		<view class="set-item-text" :class="[{'arrow' : arrow},iconName]" v-if="type == 'text'">
			{{title}}
			<text class="right-text">{{rightText}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "yy-form-item",
		computed: {
			iconName() {
				return `icon-${this.icon}`
			}
		},
		data(){
			return {
				slideValue: 0,
			}
		},
		methods:{
			sliderChange(e) {
				this.slideValue = e.detail.value
				this.$emit('slideValue', e.detail.value)
			},
			switchChange(e) {
				this.$emit('switchValue',e.target.value)
			}
		},
		props: {
			type: {
				type: String,
				default: 'text'
			},
			max: {
				type: Number | String,
				default: 100
			},
			title: {
				type: String,
				default: '标签内容'
			},
			icon: {
				type: String,
				default: 'good'
			},
			arrow: {
				type: Boolean,
				default: false
			},
			rightText: {
				type: String | Number,
				default: ''
			},
			finish: {
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style lang="scss">
	.set-item {
		position: relative;
		padding-left: 100rpx;
		background-color: white;
		box-sizing: border-box;

		&:active {
			background-color: #e5e5e5;
		}
		
		uni-slider{
			margin: 0;
		}

		.set-item-text {
			padding: 30rpx 65rpx 30rpx 0;
			border-bottom: 1rpx #f1f1f1 solid;
			font-size: 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			&::before {
				position: absolute;
				left: 25rpx;
				color: black;
				font-size: 40rpx;
			}
		}
		.set-slide{
			padding-right: 0;
		}

		.arrow {
			&::after {
				position: absolute;
				right: 20rpx;
				content: "\e6ab";
				font-size: 32rpx;
				top: 33rpx;
				color: #e6e6e6;
			}
		}
		.right-text {
			color: #ddd;
		}
		.right-slide{
			margin-left: 40rpx;
			flex: 1;
		}
		.slide-text{
			color: var(--green);
			width: 60rpx;
			padding-left: 20rpx;
			margin-left: 20rpx;
			margin-right: 10rpx;
		}
	}

	.green {
		color: var(--green);

		.right-text {
			color: inherit;
		}

		.set-item-text:before {
			color: var(--green);
			font-weight: bold;
		}
	}
</style>
