<template>
  <div class="q-pa-md">
    <user-form-dialog v-model="dialogOpen" title="Create new user" @submit="createUser" />
    <q-card class="my-card">
      <q-table
        title="Users"
        :grid="$q.screen.xs"
        :columns="columns"
        :data="usersNodes"
        :loading="$apollo.queries.users.loading"
        :pagination="pagination"
        row-key="id"
        @request="onRequest"
        binary-state-sort
      >
        <template v-slot:top-right>
          <q-btn color="primary" label="Add User" @click="dialogOpen = true" icon="add" />
        </template>

        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">{{ col.label }}</q-th>
            <q-th auto-width />
          </q-tr>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">{{ col.value }}</q-td>
            <q-td auto-width>
              <q-btn
                size="sm"
                color="negative"
                dense
                @click="deleteUser(props.row.id)"
                icon="remove"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card>
  </div>
</template>

<script>
import { gql } from 'apollo-boost'
import { createUser } from '../mixins/createUser'
import { deleteUser } from '../mixins/deleteUser'
import UserFormDialog from 'components/UserFormDialog'

const USERS_QUERY = gql`
  query PageIndexQuery ($first: Int, $orderBy: String, $desc: Boolean, $page: Int, $after: String){
    users(first: $first, orderBy: $orderBy, desc: $desc, page: $page, after: $after)
    @connection(key: "users", filter: ["first", "orderBy", "desc", "page", "after"]) {
      totalCount
      pageInfo {
        startCursor
        endCursor
      }
      edges {
        node {
          id
          firstName
          lastName
          email
        }
      }
    }
  }
`

export default {
  name: 'PageIndex',
  mixins: [createUser, deleteUser],
  components: {
    UserFormDialog
  },
  apollo: {
    users: {
      query: USERS_QUERY,
      variables () {
        return {
          first: this.pagination.rowsPerPage,
          orderBy: this.pagination.sortBy,
          desc: this.pagination.descending,
          page: this.pagination.page
        }
      }
    }
  },
  data () {
    return {
      dialogOpen: false,
      tablePagination: {
        sortBy: 'id',
        descending: false,
        page: 1,
        rowsPerPage: 10
      },
      columns: [
        {
          name: 'firstName',
          label: 'First Name',
          field: 'firstName',
          sortable: true,
          align: 'left'
        },
        {
          name: 'lastName',
          label: 'Last Name',
          field: 'lastName',
          sortable: true,
          align: 'left'
        },
        {
          name: 'email',
          label: 'Email',
          field: 'email',
          sortable: true,
          align: 'left'
        }
      ]
    }
  },
  computed: {
    pagination () {
      return {
        ...this.tablePagination,
        rowsNumber: this.users && this.users.totalCount
      }
    },
    usersNodes () {
      return this.users && this.users.edges && this.users.edges.map(({ node }) => node)
    }
  },
  methods: {
    onRequest ({ pagination }) {
      this.tablePagination = { ...pagination }
    }
  }
}
</script>
