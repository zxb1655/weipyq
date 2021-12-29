<template>
	<popup ref="emopopup" type="fadeInUp" :showMask="false" @hide="close">
		<view class="emoticon">
			<view class="emo_mask" @tap="closeEmo"></view>
			<scroll-view scroll-y="true" class="emo_content">
				<block v-for="(item,index) in emoList" :key="index">
					<img :src="item.URL" class="emo_img" @tap="tapEmo(item.name)"></img>
				</block>
			</scroll-view>
		</view>
	</popup>
</template>

<script>
	export default {
		name: "wei-article",
		data() {
			return {
				articleUrl: '',
			};
		},
		props: {
			isShow: {
				type: Boolean,
				default: false
			},
			emoList: {
				type: Array,
				default: []
			}
		},
		watch: {
			isShow(newVal, old) {
				if (newVal) {
					this.$refs.emopopup.show();
				} else {
					this.$refs.emopopup.hide();
				}
			}
		},
		methods: {
			tapEmo(value){
				this.$emit('currEmote',value)
			},
			closeEmo() {
				this.$refs.emopopup.hide();
			},
			close() {
				this.$emit("close")
			}
		}
	}
</script>

<style lang="scss">
	.emoticon {
		width: 765rpx;
		height: 100vh;

		.emo_mask {
			width: 765rpx;
			height: 60vh;
		}

		.emo_content {
			width: 765rpx;
			height: 40vh;
			padding: 20rpx 0;
			background-color: #f7f7f7;
		}
		
		.emo_img{
			width: 50rpx;
			height: 50rpx;
			margin: 20rpx;
		}
	}
</style>
