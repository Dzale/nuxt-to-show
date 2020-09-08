<template>
    <div>
        <multiselect
                :placeholder="$t('common.multiselect.placeholder')"
                :tagPlaceholder="$t('common.multiselect.tagPlaceholder')"
                :show-labels="false"
                v-bind="$attrs"
                v-on="$listeners"
        ></multiselect>
        <div class="error" v-if="error">{{ fixErrorMessage(error) }}</div>
    </div>

    <!--:limitText="$t('common.multiselect.limitText')"-->
</template>

<script>
    export default {
        name: "NuxtMultiselect",
        props:{
            error:{
                type: String,
                default: null
            },
        },
    }
</script>

<style scoped>

</style>