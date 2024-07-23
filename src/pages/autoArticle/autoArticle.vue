<template>
	<view class="pagearticle" ref="render">
		<renderimg-popup :imgUrl="renderUrl" :isShow="isShowRender" @close="isShowRender = false" />
		<view class="hotBox" @tap="handleRight"></view>
		<view class="content" @touchstart="hideLong">
			<html2canvas ref="html2canvas" :domId="domId" @renderFinish="renderFinish">
				<view id="poster">
					<img :src="pageData.articleImgList[0]" class="autoImg"></image>
					<view class="comment">
						<comment-module isAuto :pageData="pageData" @showSelect="showSelect" />
					</view>
					<img v-if="pageData.articleImgList.length >1" :src="pageData.articleImgList[1]" class="autoComImg"></image>
					<longselect-module @cancel="longSelectHidden = false" @renderImg="preImg" :coordinate='coordinate' :hidden="longSelectHidden" />
					<input-module @blur="blurInput" :focus='false' :isFixed="isFixed" @inputMsg='getComment' />
					<view class="input"></view>
				</view>
			</html2canvas>
		</view>
	</view>
</template>

<script>
	import html2canvas from 'html2canvas';
	export default {
		data() {
			return {
				isShowRender: false,
				isFixed: true,
				coordinate: {},
				longSelectHidden: false,
				pageData: {
					type: 0,
					articleImgList: [],
					comment: {
						commentNum: 0,
						goodUserAvatarList: 0,
						commentUserList: []
					}
				},
				domId: '',
				renderUrl: ''
			}
		},
		mounted() {
			this.domId = '#poster'
		},
		onLoad(options) {
			if (options.data) {
				this.pageData = JSON.parse(options.data)
			}
		},
		methods: {
			preImg() {
				this.isFixed = false
				setTimeout(()=>{
          this.$refs.html2canvas.createImg();
        },200)
			},
			handleRight(){
				this.coordinate = {
					x: 220,
					y: 50
				}
				this.longSelectHidden = true
			},
			renderFinish(filePath) {
				this.renderUrl = filePath
				uni.hideToast();
				this.isShowRender = true
			},
			showSelect(data) {
				this.coordinate = data
				this.longSelectHidden = true
			},
			hideLong() {
				this.longSelectHidden = false
			},
		}
	}
</script>

<style lang="scss">
/* 针对手机设备 */
@media screen and (max-width: 768px) {
  .pagearticle {
    width: 100vw;
  }
}
/* 针对桌面设备 */
@media screen and (min-width: 1024px) {
  .pagearticle {
    width: 550px;
    height: 100vh;
    margin: 0 auto;
    box-shadow: 0 0 5px #eee;
  }
}
	.pagearticle {
		
		.input{
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 150upx;
		}
		
		.autoImg{
			width: 100%;
		}
		.autoComImg{
			width: 100%;
			margin-top: -134upx;
			margin-bottom: 150upx;
		}
		
		.hotBox{
			width: 200upx;
			height: 200upx;
			position: fixed;
			z-index: 1;
			top: 0;
			right: 0;
		}
		
		#poster{
			min-height: 100vh;
			position: relative;
		}

		.comment {
			padding-bottom: 2upx;
		}
	}
</style>
