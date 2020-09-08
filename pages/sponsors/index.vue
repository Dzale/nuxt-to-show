<template>
	 <section class="mt80 align-left">
	 	
	 </section>
</template>
<script>
    export default {
        name: "sponsors",
        mounted() {
            fadeOutLoader();
        },
        head() {
            return {
				title: this.$t('meta.sponsor.title'),
                meta: [
					{ hid: 'description', name: 'description', content: this.$t('meta.sponsor.desc') },
                    { hid: 'robots', name: 'robots', content: 'noindex' }
                ]
            }
        }
    }
</script>

<style scoped>
    h1 { font-size: 2.5em; text-align: center; font-weight: bold; margin-bottom: 20px;}
    h2 { font-size: 1.2em; margin-top: 15px;}
    h3 { font-size: 1.1em; margin-top: 7px; }
    ul { list-style: circle inside none;  }
    ul li { margin: 5px; color: #878C9F;}
    b { font-weight: bold; }
</style>