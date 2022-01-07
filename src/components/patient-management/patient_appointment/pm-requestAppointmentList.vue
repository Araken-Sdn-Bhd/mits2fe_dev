<template>
  <va-card>
    <div class="row align--center">
      <div class="flex xs12 md6"><h5>LIST OF APPOINTMENT REQUESTS</h5></div>
    </div>

    <div class="row">
      <div class="flex xs12 md6">
        <va-input
          :value="term"
          :placeholder="$t('Search By Name/NRIC')"
          @input="search"
          removable
        >
          <va-icon name="fa fa-search" slot="prepend" />
        </va-input>
      </div>
    </div>

    <va-data-table
      :fields="fields"
      :data="filteredData"
      :per-page="parseInt(perPage)"
      :hoverable="true"
      clickable
    >

      <template slot="no" slot-scope="row">
        {{ row.rowIndex + 1 }}
      </template>

      <template slot="date" slot-scope="props">
        {{ getDate(props.rowData.date) }}
      </template>

      <template slot="actions" slot-scope="props">
        <va-button flat small color="black" icon="fa fa-calendar-o" @click="redirectToBookAppointment(props.rowData)" class="ma-0">
        </va-button>
      </template>

    </va-data-table>

    <div class="row">
      <div class="flex xs12 md2 offset--md10">
        <va-select
          v-model="perPage"
          :label="$t('tables.perPage')"
          :options="perPageOptions"
          noClear
        />
      </div>
    </div>

  </va-card>
</template>

<script>
import { debounce } from 'lodash'

export default {
  data () {
    return {
      term: '',
      no: 1,
      perPage: '25',
      perPageOptions: ['25', '50', '100', '150', '200'],
      users: [],
    }
  },
  mounted () {
    this.$axios
      .get('http://127.0.0.1:8000/api/getRequestAppointmentList')
      .then((response) => {
        this.users = response.data.data
      })
  },
  computed: {
    fields () {
      return [
        {
          name: '__slot:no',
          title: this.$t('NO'),
          width: '25px',
          height: '45px',
          dataClass: 'text-center',
        },
        {
          name: 'name',
          title: this.$t('NAME'),
          width: '30%',
        },
        {
          name: 'nricPassport',
          title: this.$t('NRIC/PASSPORT'),
          width: '10%',
        },
        {
          name: 'contact',
          title: this.$t('CONTACT NUMBER'),
          width: '15%',
        },
        {
          name: 'email',
          title: this.$t('EMAIL'),
          width: '20%',
        },
        {
          name: '__slot:date',
          title: this.$t('DATE'),
          width: '15%',
        },
        {
          name: '__slot:actions',
          title: this.$t('ACTION'),
          width: '10%',
          dataClass: 'text-center',
        },
      ]
    },
    filteredData () {
      if (!this.term || this.term.length < 1) {
        return this.users
      }

      return this.users.filter(item => {
        return (item.name.toLowerCase().startsWith(this.term.toLowerCase()) ||
                  item.nricPassport.toLowerCase().startsWith(this.term.toLowerCase()))
      })
    },
  },
  methods: {
    getDate (datetime) {
      return datetime.substring(0, 10)
    },
    async redirectToBookAppointment (rowData) {
      const data = new FormData()
      data.append('requestAppointmentData', JSON.stringify(rowData))
      const url = 'http://127.0.0.1:8000/api/requestAppointmentPartialRegistration'
      const response = await this.$axios.post(url, data)
      localStorage.setItem('ID', JSON.stringify(response.data.patientId))

      localStorage.setItem('requestAppointmentId', rowData.request_appointment_id)
      localStorage.setItem('nricPassport', rowData.nricPassport)
      this.$router.push({ name: 'patient-appointmentBooking', query: { st: 'reqApp' } })
    },
    launchToast () {
      this.showToast(
        ' Registration Successful !',
        {
          icon: 'fa-check',
          position: 'top-center',
          duration: 2500,
          fullWidth: false,
        },
      )
    },
    search: debounce(function (term) {
      this.term = term
    }, 400),
  },
}
</script>

<style>
thead {
  background-color: #bbf2eb;
}

.va-card__header-title {
  color: #000000 !important;
  font-size: 1rem !important;
}
</style>
