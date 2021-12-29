<template>
	<view>
		<view class="html2canvas" :prop="domId">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	import { base64ToPath } from '@/static/libs/image-tools.js';
	import html2canvas from 'html2canvas';
	export default {
		name: 'html2canvas',
		props: {
			domId: {
				type: String,
				required: true
			}
		},
		methods: {
			async createImg() {
				try {
					this.showLoading()
					const timeout = setTimeout(async ()=> {
						const shareContent = document.querySelector(this.domId);
						const canvas = await html2canvas(shareContent,{
							width: shareContent.offsetWidth,//设置canvas尺寸与所截图尺寸相同，防止白边
							height: shareContent.offsetHeight,//防止白边
							logging: true,
							useCORS: true
						});
						const base64 = canvas.toDataURL('image/jpeg', 1);
						this.renderFinish(base64)
						clearTimeout(timeout);
					}, 100);
				} catch(error){
					console.log(error)
				}
			},
			async renderFinish(base64) {
				try{
					this.$emit('renderFinish', base64);
					// const imgPath = await base64ToPath(base64, '.jpeg');
					// this.$emit('renderFinish', imgPath);
				}catch(e){
					console.log('html2canvas error', e)
				}
			},
			showLoading() {
				uni.showToast({
					title: "正在生成海报",
					icon: "none",
					mask: true,
					duration: 100000
				})
			},
		}
	}
</script>


