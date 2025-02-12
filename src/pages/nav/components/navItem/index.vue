<script setup lang="ts">

const { nav } = defineProps({
    nav: { type: Object, required: true, default: () => { } }
})

</script>

<template>
    <div class="navItem flex-column-center-center">
        <div class="title flex-start-center">
            <div class="icon flex-center-center">
                <img :src="nav.icon" />
            </div>
            <div class="name">
                {{ nav.name }}
            </div>
        </div>
        <div class="description">
            <n-ellipsis :line-clamp="2">
                {{ nav.descriptions }}
            </n-ellipsis>
        </div>

    </div>
</template>

<style scoped lang="scss">
.navItem {
    width: 240px;
    height: 100px;
    padding: 10px;
    border: 2px solid var(--border-color);
    border-radius: 8px;
    cursor: pointer;
    .title {
        width: 100%;
        height: 40px;
        margin-bottom: 5px;
        .icon {
            background-color: var(--tag-color);
            width: 40px;
            height: 40px;
            border-radius: 5px;

            img {
                width: 30px;
                height: 30px;
            }
        }

        .name {
            font-size: 15px;
            font-weight: bolder;
            margin-left: 10px;
        }
    }

    .description {
        height: 55px;
        width: 100%;
        margin-top: 5px;
        font-size: 14px;
        color: var(--text-color-2);
    }
    &:hover {
        border: 2px solid var(--primary-color);
    }
}
</style>
