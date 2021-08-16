<template>
    <div>
        <!-- logout -->
        <div v-if="$auth.user()">
            <h3>username is -{{ $auth.user().name }}</h3>
            <h3>username is -{{ $auth.user().email }}</h3>
            <form @submit.prevent="logout">
                <input type="submit" value="logout" />
            </form>
        </div>
        <!-- login -->
        <div v-else>
            <form @submit.prevent="login">
                <label for="">email</label>
                <input type="text" v-model="params.email" />
                <label for="">password</label>
                <input type="text" v-model="params.password" />
                <input type="submit" value="login" />
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            params: {
                email: "",
                password: ""
            }
        };
    },
    methods: {
        login() {
            this.$auth.login({
                params: this.params,
                redirect: "/success-route",
                remember: this.remember,
                staySignedIn: true,
                fetchUser: true
            });
        },
        logout() {
            this.$auth.logout({
                redirect: "/login"
            });
        }
    }
};
</script>

<style></style>
