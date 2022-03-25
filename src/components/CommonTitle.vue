<template>
    <div class='title'>
        <van-nav-bar
                :title="title"
                left-text="返回"
                left-arrow
                @click-left="onClickLeft"
        />
    </div>
</template>

<script>
    export default {
        name: 'CommonTitle',
        props: ['title'],
        methods: {
            onClickLeft() {
                this.$router.back()
            }
        }
    }
</script>

<style lang="less" scoped>

</style>
