<template>
  <va-card>
    <div class="row align--center">
      <div class="flex xs12 md6"><h5>LIST OF APPOINTMENTS</h5></div>
      <div class="flex xs12 md1 offset--md5">
        <button @click="$router.push({name: 'patient-appointmentBooking'})" type="button" class="ml-2 btn btn-fill btn-md btn-yellow btn-circle">
          <div class="fa fa-plus" />
        </button>
      </div>
    </div>

    <div class="row">
      <div class="flex xs12 md3">
        <va-date-picker
          v-model="date"
          mode="single"
          placeholder="Filter By Date"
          label="Date"
        />
      </div>
      <div class="flex xs12 md3">
        <va-select
          v-model="service"
          :label="$t('Services')"
          :placeholder="$t('Filter By Service')"
          :options="selectService"
        />
      </div>
      <div class="flex xs12 md6">
        <va-input
          :value="term"
          :placeholder="$t('Search By Name/NRIC/Passport/MRN')"
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
    >

      <template slot="no" slot-scope="row">
        {{ row.rowIndex + 1 }}
      </template>

      <template slot="name" slot-scope="props">
        <div @click="showPatientProfile(props.rowData)" style="cursor: pointer;">
          {{ props.rowData.name }}
        </div>
      </template>

      <template slot="status" slot-scope="props">
        <span class="cell-red" v-if="props.rowData.status === 'No Show'">
          {{ props.rowData.status }}
        </span>
        <span class="cell-yellow" v-else-if="props.rowData.status === 'Processing'">
          {{ props.rowData.status }}
        </span>
        <span class="cell-green" v-else-if="props.rowData.status === 'Ready'">
          {{ props.rowData.status }}
        </span>
        <span class="cell-blue" v-else-if="props.rowData.status === 'Completed'">
          {{ props.rowData.status }}
        </span>
        <span v-else>
          {{ props.rowData.status }}
        </span>
      </template>

      <template slot="date" slot-scope="props">
        {{ getDate(props.rowData.date) }}
      </template>

      <template slot="actions" slot-scope="props">
        <va-button flat small color="#61CE70" icon="fa fa-check" @click="tick(props.rowData)" class="ma-0">
        </va-button>
        <va-button flat small color="#75757" icon="fa fa-pencil" @click="edit(props.rowData)" class="ma-0 edit-button">
        </va-button>
        <va-button flat small color="#DC3545" icon="fa fa-close" @click="noShow(props.rowData)" class="ma-0">
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
      date: '',
      formatDate: '',
      service: '',
      selectService: [],
    }
  },
  mounted () {
    this.$axios
      .get('http://127.0.0.1:8000/api/getAppointmentList')
      .then((response) => {
        this.users = response.data.data
        this.selectService = response.data.service
      })
  },
  computed: {
    fields () {
      return [
        {
          name: '__slot:no',
          title: this.$t('NO'),
          width: '2%',
          height: '45px',
          dataClass: 'text-center',
        },
        {
          name: 'mrn',
          title: this.$t('MRN'),
          width: '8%',
        },
        {
          name: 'salutation',
          title: this.$t('SALUTATION'),
          width: '5%',
        },
        {
          name: '__slot:name',
          title: this.$t('NAME'),
          width: '18%',
        },
        {
          name: 'nricPassport',
          title: this.$t('NRIC/PASSPORT'),
          width: '10%',
        },
        {
          name: '__slot:status',
          title: this.$t('STATUS'),
          width: '10%',
        },
        {
          name: '__slot:date',
          title: this.$t('APPT. DATE'),
          width: '10%',
        },
        {
          name: 'time',
          title: this.$t('APPT. TIME'),
          width: '7%',
        },
        {
          name: 'doctor',
          title: this.$t('ASSIGNED DOCTOR'),
          width: '10%',
        },
        {
          name: 'services',
          title: this.$t('SERVICES'),
          width: '10%',
        },
        {
          name: '__slot:actions',
          title: this.$t('ACTION'),
          width: '10%',
        },
      ]
    },
    filteredData () {
      if ((!this.term || this.term.length < 1) && this.date === '' && this.service === '') {
        return this.users
      }

      return this.users.filter(item => {
        return item.services.startsWith(this.service) &&
                    item.date.startsWith(this.formatDate) &&
                    (item.name.toLowerCase().startsWith(this.term.toLowerCase()) ||
                    item.mrn.toLowerCase().startsWith(this.term.toLowerCase()) ||
                    item.nricPassport.toLowerCase().startsWith(this.term.toLowerCase()))
      })
    },
  },
  methods: {
    getDate (datetime) {
      const d = new Date(datetime)
      const newDate = d.toLocaleDateString('en-MY')
      return newDate
    },
    async showPatientProfile (user) {
      localStorage.setItem('ID', user.patient_id)
      this.$router.push({ path: 'patient-profile' })
    },
    async tick (rowData) {
      if (rowData.services !== '') {
        const data = new FormData()
        data.append('appointmentId', rowData.appointment_id)
        data.append('serviceType', rowData.services)
        const url = 'http://127.0.0.1:8000/api/tickAttendance'
        await this.$axios.post(url, data)
        this.refreshList()
      }
    },
    edit (rowData) {
      localStorage.setItem('appointmentId', rowData.appointment_id)
      this.$router.push({ name: 'patient-appointmentBooking', query: { st: 'edit' } })
    },
    async noShow (rowData) {
      const data = new FormData()
      data.append('appointmentId', rowData.appointment_id)
      const url = 'http://127.0.0.1:8000/api/noShowAttendance'
      await this.$axios.post(url, data)
      this.refreshList()
    },
    refreshList () {
      this.$axios
        .get('http://127.0.0.1:8000/api/getAppointmentList')
        .then((response) => {
          this.users = response.data.data
        })
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
  watch: {
    date: function () {
      var year = this.date.toString().slice(0, 4)
      var month = this.date.toString().slice(5, 7)
      var day = this.date.toString().slice(8, 10)
      var formatted = year + '/' + month + '/' + day
      this.formatDate = formatted
    },
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

.cell-red {
  background-color: #ff4433;
  float: left;
  width: 100%;
  text-align: center;
  font-weight: 600;
  padding: 5px;
}

.cell-yellow {
  background-color: #ffff00;
  float: left;
  width: 100%;
  text-align: center;
  font-weight: 600;
  padding: 5px;
}

.cell-green {
  background-color: #66cd00;
  float: left;
  width: 100%;
  text-align: center;
  font-weight: 600;
  padding: 5px;
}

.cell-blue {
  background-color: #40e0d0;
  float: left;
  width: 100%;
  text-align: center;
  font-weight: 600;
  padding: 5px;
}

.edit-button:hover {
  background-color: rgb(201, 201, 201);
}

</style>
