<template>
	<view class="pageindex">
		<view class="bar" @tap="isAuto = !isAuto">
			<view class="barlist" :class="{'active': !isAuto}">自动生成版</view>
			<view class="barlist" :class="{'active': isAuto}">截图版</view>
		</view>
		<radio-group @change="radioChange">
			<swiper @change="changeSwiper" :interval="3000" class="swiper" circular previous-margin="120rpx" next-margin="120rpx">
				<swiper-item class="list" v-for="(item, index) in items" :key="item.value">
					<label class="label">
						<view class="title">样式{{item.value}} : </view>
						<view class="num">{{item.title}}</view>
						<image class="list_img" :src="`../../static/img/type${index+1}.jpeg`" mode="widthFix"></image>
						<radio :value="item.value" color="#07c160" :checked="index === current" />
					</label>
				</swiper-item>
			</swiper>
		</radio-group>
		<view class="btn_box">
			<view class="btn" @click="goEdit">
				进 入
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				isAuto: false,
				items: [{
						value: '一',
						title: '图文样式',
						checked: 'true'
					},
					{
						value: '二',
						title: '链接样式'
					},
					{
						value: '三',
						title: '主图样式'
					},
				],
				current: 0
			}
		},
		methods: {
			changeSwiper(e){
				this.current = e.detail.current
			},
			radioChange: function(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.detail.value) {
						this.current = i;
						break;
					}
				}
			},
			goEdit() {
				if(this.isAuto){
					uni.navigateTo({
						url: `/pages/autoEdit/autoEdit?type=${this.current}`
					})
				} else {
					uni.navigateTo({
						url: `/pages/edit/edit?type=${this.current}`
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.pageindex {
		.bar{
			display: flex;
			justify-content: space-between;
			align-items: center;
			border: 2rpx solid var(--green);
			border-radius: 10rpx;
			width: 600rpx;
			margin: 20rpx auto 0;
			height: 70rpx;
			
			.barlist{
				padding: 10rpx;
				width: 100%;
				text-align: center;
				color: #333;
				border-radius: 10rpx;
				&.active{
					color: #fff;
					background-color: var(--green);
				}
			}
		}
		
		.list_box {
			width: 100%;
			overflow: scroll;
			display: flex;
		}

		.swiper {
			width: 100%;
			height: 1130rpx;
		}

		.list {
			width: 600rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			margin-bottom: 20rpx;
		}

		.label {
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		.title {
			color: var(--green);
			font-size: 22rpx;
		}

		.num {
			color: var(--green);
			font-size: 32rpx;
			margin-bottom: 10rpx;
			font-weight: 900;
			letter-spacing: 4rpx;
		}

		.list_img {
			width: 420rpx;
			margin-bottom: 20rpx;
		}

		.btn {
			display: inline-block;
			border-radius: 10rpx;
			background-color: var(--green);
			padding: 10rpx 30rpx;
			color: white;
		}

		.btn_box {
			text-align: center;
			padding: 50rpx;
		}
	}
</style>
