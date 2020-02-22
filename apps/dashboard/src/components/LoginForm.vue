<template>
  <q-card>
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-card-section style="max-height: 50vh; min-width: 20vw" class="scroll">
        <q-input
          filled
          type="email"
          v-model="value.email"
          label="Email"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <q-input
          filled
          type="password"
          v-model="value.password"
          label="Password"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn type="submit" flat label="Login" color="primary" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
export default {
  name: 'LoginForm',
  props: {
    value: {
      type: Object
    }
  },
  computed: {
    localValue: {
      get () { return this.value },
      set (localValue) { this.$emit('input', localValue) }
    }
  },
  methods: {
    onSubmit () {
      this.$emit('submit', this.localValue)
    }
  }
}
</script>
