<template>
  <va-card>

    <div class="row align--center">
      <div class="flex xs12 md6"><h5>LIST OF PATIENTS</h5></div>
      <div class="flex xs12 md1 offset--md5">
        <button @click="$router.push({name: 'shharp-demographic'})" type="button" class="ml-2 btn btn-fill btn-md btn-yellow btn-circle">
          <div class="fa fa-plus" />
        </button>
      </div>
    </div>

    <div class="row">
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
      <div class="flex xs12 md3">
        <va-date-picker
          v-model="startDate"
          mode="single"
          placeholder="Filter By Self-Harm Start Date"
          label="Start Date"
        />
      </div>
      <div class="flex xs12 md3">
        <va-date-picker
          v-model="endDate"
          mode="single"
          placeholder="Filter By Self-Harm End Date"
          label="End Date"
        />
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

      <template slot="date" slot-scope="props">
        {{ getDate(props.rowData.date) }}
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
      startDate: '',
      endDate: '',
    }
  },
  mounted () {
    this.$axios
      .get('http://127.0.0.1:8000/api/getSHHARPList')
      .then((response) => {
        this.users = response.data.list
      })
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
          name: 'name',
          title: this.$t('NAME'),
          width: '25%',
        },
        {
          name: '__slot:age',
          title: this.$t('AGE'),
          width: '5%',
        },
        {
          name: 'nricPassport',
          title: this.$t('NRIC/PASSPORT'),
          width: '20%',
        },
        {
          name: 'mentari',
          title: this.$t('MENTARI'),
          width: '20%',
        },
        {
          name: '__slot:date',
          title: this.$t('LAST SEEN'),
          width: '13%',
        },
        {
          name: 'status',
          title: this.$t('SHHARP FORM STATUS'),
          width: '12%',
        },
      ]
    },
    filteredData () {
      if ((!this.term || this.term.length < 1) && this.startDate === '' && this.endDate === '') {
        return this.users
      }

      return this.users.filter(item => {
        return (item.name.toLowerCase().startsWith(this.term.toLowerCase()) ||
                item.nricPassport.toLowerCase().startsWith(this.term.toLowerCase())) &&
                (item.selfHarmDate >= this.startDate && item.selfHarmDate <= this.endDate)
      })
    },
  },
  methods: {
    getAge (birthdate) {
      if (birthdate !== null) {
        return new Date().getFullYear() - birthdate.toString().substring(0, 4)
      }
    },
    getDate (datetime) {
      if (datetime !== null) {
        const d = new Date(datetime)
        const newDate = d.toLocaleDateString('en-MY')
        return newDate
      }
    },
    showPatientProfile (user) {
      localStorage.setItem('ID', user.patient_id)
      this.$router.push({ name: 'shharp-profile' })
      // if (user.shharp_id === null) {
    },
    search: debounce(function (term) {
      this.term = term
    }, 400),
  },
  watch: {
    startDate: function () {
      if (this.startDate !== '') {
        const d = new Date(this.startDate)
        this.endDate = d.setDate(d.getDate() + 30)
      }
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
</style>
