export default [
    { path: '/', component: { template: "<gdc-login></gdc-login>" } },
    { path: '/dash', redirect: '/dash/1' },
    { path: '/dash/:step', component: { template: "<gdc-form></gdc-form>" } },
]