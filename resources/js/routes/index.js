function render(template) {
    return require(`@/pages/${template}.vue`).default;
}

export default [
    { path: "/foo", component: render("Foo") },
    { path: "/bar", component: render("Bar") }
];
