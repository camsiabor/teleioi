
const directive = {

    props: [ ],

    mounted(el, binding) {
        const observer = new IntersectionObserver( entries => {
            const target = entries[0];
            if (!target.isIntersecting) {
                return;
            }
            observer.disconnect();
            const toggle = binding.value.toggle;
            if (toggle) {
                toggle.value = true;
            }
            const callback = binding.value.callback;
            if (callback) {
                callback(el, binding);
            }
        });

        observer.observe(el);
        binding.value.observer = observer;
    },

    unmounted(el, binding) {
        if (binding.value.observer) {
            binding.value.observer.disconnect();
        }
    }
};

export default directive;



