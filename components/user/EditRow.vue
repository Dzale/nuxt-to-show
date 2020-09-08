<template>
    <div class="row">
        <div class="col-md-6">
            <slot name="first"></slot>
        </div>
        <div class="col-md-6">
            <slot name="second"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "edit-row",
    }
</script>

<style scoped>

</style>