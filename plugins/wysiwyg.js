import Vue from 'vue'
import wysiwyg from "vue-wysiwyg";
Vue.use(wysiwyg, {
	hideModules: {
		"headings": true,
		"link": true,
		"code": true,
		"orderedList": true,
		"unorderedList": true,
		"image": true,
		"removeFormat": true,
		"separator": true
	}
});