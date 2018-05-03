<template>
    <div>
        <panel></panel>
    </div>

</template>

<script>
    import modal from './Modal'
    import panel from  './panel';
    import inputs from './someInut'
    export default{
        mounted() {
            console.log('Component mounted.')
        },
        components:{
            modal,
            panel,
            inputs
        }
    }
</script>

