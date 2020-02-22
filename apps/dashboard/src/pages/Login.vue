<template>
  <q-page padding>
    <login-form v-model="loginDetails" @submit="submit" />
  </q-page>
</template>

<script>
import { logIn } from '../mixins/logIn'
import LoginForm from 'components/LoginForm'

export default {
  name: 'Login',
  mixins: [logIn],
  components: {
    LoginForm
  },
  data () {
    return {
      loginDetails: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    submit () {
      this.logIn(this.loginDetails)
    }
  }
}
</script>
