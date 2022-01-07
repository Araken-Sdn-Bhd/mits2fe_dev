<template>
  <va-card>

    <div class="row align--center">
      <div class="flex xs12 md6"><h5>LIST OF PATIENTS</h5></div>
      <div class="flex xs12 md1 offset--md5">
        <button @click="$router.push({name: 'patient-registration'})" type="button" class="ml-2 btn btn-fill btn-md btn-yellow btn-circle">
          <div class="fa fa-plus" />
        </button>
      </div>
    </div>

    <div class="row">
      <div class="flex xs12 md3">
        <va-select
          v-model="branch"
          :label="$t('Branch')"
          :placeholder="$t('Filter By Branch')"
          :options="selectBranch"
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
      @row-clicked="showPatientProfile"
      :hoverable="true"
      clickable
    >

      <template slot="no" slot-scope="row">
        {{ row.rowIndex + 1 }}
      </template>

      <template slot="age" slot-scope="props">
        {{ getAge(props.rowData.age) }}
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
      branch: '',
      selectBranch: [],
      service: '',
      selectService: [],
    }
  },
  computed: {
    fields () {
      return [
        {
          name: '__slot:no',
          title: this.$t('NO'),
          width: '30px',
          height: '45px',
          dataClass: 'text-center',
        },
        {
          name: 'mrn',
          title: this.$t('MRN'),
          width: '10%',
        },
        {
          name: 'salutation',
          title: this.$t('SALUTATION'),
          width: '5%',
        },
        {
          name: 'name',
          title: this.$t('NAME'),
          width: '20%',
        },
        {
          name: '__slot:age',
          title: this.$t('AGE'),
          width: '5%',
        },
        {
          name: 'nricPassport',
          title: this.$t('NRIC/PASSPORT'),
          width: '15%',
        },
        {
          name: 'visit',
          title: this.$t('NEXT VISIT'),
          width: '10%',
        },
        {
          name: 'doctor',
          title: this.$t('ASSIGNED DOCTOR'),
          width: '15%',
        },
        {
          name: 'services',
          title: this.$t('SERVICES'),
          width: '15%',
        },
      ]
    },
    filteredData () {
      if ((!this.term || this.term.length < 1) && this.service === '' && this.branch === '') {
        return this.users
      }

      return this.users.filter(item => {
        return item.services.startsWith(this.service) &&
                item.branch.startsWith(this.branch) &&
                (item.name.toLowerCase().startsWith(this.term.toLowerCase()) ||
                item.mrn.toLowerCase().startsWith(this.term.toLowerCase()) ||
                item.nricPassport.toLowerCase().startsWith(this.term.toLowerCase()))
      })
    },
  },
  mounted () {
    this.$axios
      .get('http://127.0.0.1:8000/api/getPatientList')
      .then((response) => {
        this.users = response.data.data
        this.selectService = response.data.service
        this.selectBranch = response.data.branch
      })
  },
  methods: {
    getAge (birthdate) {
      var age = ''
      if (birthdate !== null) {
        age = new Date().getFullYear() - birthdate.toString().substring(0, 4)
      }
      return age
    },
    getTrendIcon (user) {
      if (user.trend === 'up') {
        return 'fa fa-caret-up'
      }

      if (user.trend === 'down') {
        return 'fa fa-caret-down'
      }

      return 'fa fa-minus'
    },
    getTrendColor (user) {
      if (user.trend === 'up') {
        return 'primary'
      }

      if (user.trend === 'down') {
        return 'danger'
      }

      return 'grey'
    },
    async showPatientProfile (user) {
      localStorage.setItem('ID', user.patient_id)
      this.$router.push({ path: 'patient-profile' })
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
