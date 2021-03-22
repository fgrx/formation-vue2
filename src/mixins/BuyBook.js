export default {
	methods: {
		buyMixinAction(book) {
			this.$store.dispatch("addItemAction", book);
		},
	}
};
