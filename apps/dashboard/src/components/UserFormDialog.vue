<template>
  <q-dialog v-model="localValue">
    <q-card>
      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-card-section>
          <div class="text-h6">{{title}}</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh; min-width: 20vw" class="scroll">
          <q-input
            filled
            v-model="formFields.firstName"
            label="First name"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

          <q-input
            filled
            v-model="formFields.lastName"
            label="Last name"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

          <q-input
            filled
            type="email"
            v-model="formFields.email"
            label="Email"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

          <q-input
            filled
            type="password"
            v-model="formFields.password"
            label="Password"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="standard" v-close-popup />
          <q-btn type="submit" flat label="Create user" color="primary" v-close-popup />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'UserFormDialog',
  props: {
    value: {
      type: Boolean
    },
    title: {
      type: String
    }
  },
  data () {
    return {
      formFields: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      }
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
      this.$emit('submit', this.formFields)
      this.formFields = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      }
    }
  }
}
</script>
