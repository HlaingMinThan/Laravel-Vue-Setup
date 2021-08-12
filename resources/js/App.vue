<template>
    <div>
        <div>
            <router-link to="foo">Foo</router-link>
            <router-link to="bar">Bar</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    mounted() {
        //sample axios usage
        axios
            .get("https://jsonplaceholder.typicode.com/todos")
            .then(response => {
                console.log(response.data);
            });
    }
};
</script>
