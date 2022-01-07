<!-- Patient Record (Nurse View) -->
<template>
  <div class="content">
    <div class="container-fluid">
      <router-link :to="{ name: 'patient-profile'}">
        <h2 class="patient-name">{{pt_data.name}}</h2>
      </router-link>

      <div class="row">
        <!--Demographic--->
        <div class="col-xl-9 mb-3">
          <va-card :title="$t('Demographic')">
            <div class="float-right">
              <router-link :to="{ name: 'patient-registration', query: { st: 'edit'}}">
                <button type="button" class="btn sizebtn">
                  <div class="fa fa-pencil-square-o"/>
                </button>
              </router-link>
            </div>

            <div class="row mt-2">
              <div class="col-xl-9">
                <div class="row mt-2">
                  <div class="col-sm-4"><b>MITS 2.0 Ref No</b></div>
                  <div class="col-sm-auto"><b>:</b></div>
                  <div class="col-sm-5">MT30399</div>
                </div>

                <div class="row">
                  <div class="col-sm-4"><b>Hospital's MRN</b></div>
                  <div class="col-sm-auto"><b>:</b></div>
                  <div class="col-sm-5">{{pt_data.hospital_mrn}}</div>
                </div>

                <div class="row">
                  <div class="col-sm-4"><b>Mentari's MRN</b></div>
                  <div class="col-sm-auto"><b>:</b></div>
                  <div class="col-sm-5">{{pt_data.mentari_mrn}}</div>
                </div>

                <div class="row">
                  <div class="col-sm-4"><b>Gender</b></div>
                  <div class="col-sm-auto"><b>:</b></div>
                  <div class="col-sm-5">{{pt_data.gender}}</div>
                </div>

                <div class="row">
                  <div class="col-sm-4"><b>Date of Birth</b></div>
                  <div class="col-sm-auto"><b>:</b></div>
                  <div class="col-sm-5">{{birthdate}} {{age}}</div>
                </div>

                <div class="row">
                  <div class="col-sm-4"><b>Marital Status</b></div>
                  <div class="col-sm-auto"><b>:</b></div>
                  <div class="col-sm-5">{{pt_data.marital}}</div>
                </div>

                <div class="row">
                  <div class="col-sm-4"><b>Nationality</b></div>
                  <div class="col-sm-auto"><b>:</b></div>
                  <div class="col-sm-5">{{nationality}}</div>
                </div>

                <div class="row mb-3">
                  <div class="col-sm-4"><b>Contact No</b></div>
                  <div class="col-sm-auto"><b>:</b></div>
                  <div class="col-sm-5">{{pt_data.phone_no_1}}</div>
                </div>
              </div>
              <div class="col-xl-3 mb-3">
                <b>Allergies :</b>
                <i v-if="empty"> No allergies</i>
                <div v-for="allergy in allergies" :key="allergy.allergy_desc">
                  {{allergy.allergy_desc}}
                </div>
              </div>
            </div>
          </va-card>

        </div>
        <!--Alert--->
        <div class="col-xl">
          <va-card :title="$t('Alert')">
            <div class="float-right">
              <router-link :to="{}">
                <button type="button" class="btn sizebtn">
                  <div class="fa fa-pencil-square-o"/>
                </button>
              </router-link>
            </div>
            <div class="row mt-2 mb-5">
              Severe depression
            </div>
            <button type="button" class="ml-2 btn btn-fill btn-md btn-blue">
              Add Alert
            </button>
          </va-card>
        </div>
      </div>

      <div class="row">
        <div class="col-xl-12">
          <div class="row mt-3">
            <!--Visit History--->
            <div class="col-xl-12">
              <va-card :title="$t('Psychometric Test History')">
                <va-data-table
                  :fields="testFields"
                  :data="tests"
                  :per-page="5"
                >
                  <template slot="no" slot-scope="row">
                    {{ row.rowIndex + 1 }}
                  </template>
                </va-data-table>
              </va-card>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg-core.css'
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(VueFormGenerator)
// register globally
export default {
  components: {
  },
  data () {
    return {
      pt_data: [],
      allergies: [],
      birthdate: '',
      age: '',
      nationality: '',
      empty: true,

      tests: [],
    }
  },
  computed: {
    testFields () {
      return [
        {
          name: '__slot:no',
          title: this.$t('NO'),
          width: '5%',
          height: '45px',
          dataClass: 'text-center',
        },
        {
          name: '',
          title: 'Test Name',
        },
        {
          name: 'timestamp_create',
          title: 'Date Taken',
        },
        {
          name: '',
          title: 'Result',
        },
      ]
    },
  },
  methods: {
    getDate (datetime) {
      const d = new Date(datetime)
      const newDate = d.toLocaleDateString('en-MY')
      return newDate
    },
    getTime (datetime) {
      const d = new Date(datetime)
      const newTime = d.toLocaleTimeString('en-MY')
      return newTime
    },
  },
  mounted () {
    var patientId = JSON.parse(localStorage.getItem('ID'))
    this.$axios
      .get('http://127.0.0.1:8000/api/getPatientProfile?patient_id=' + patientId)
      .then((response) => {
        this.pt_data = response.data.data
        if (response.data.data.birthdate != null) {
          this.birthdate = this.getDate(response.data.data.birthdate)
          this.age = '(' + (new Date().getFullYear() - response.data.data.birthdate.toString().substring(0, 4)) + ' years old)'
        } else {
          this.birthdate = ''
        }
        if (response.data.data.citizenship_fk === 3) {
          this.nationality = 'Non-Malaysian ' + '(' + response.data.data.issuing_country + ')'
        } else {
          this.nationality = 'Malaysia'
        }
        this.allergies = response.data.allergy
        if (this.allergies.length > 0) {
          this.empty = false
        }
      })
  },

}
</script>
<!-- New step!
     Add Multiselect CSS. Can be added as a static asset or inside a component. -->
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
  .app-layout__main {
    background: hsl(0, 0%, 91%);
  }

  .p {
    font-size: 0.9rem;
  }

  .spacing {
    margin-right: 500px;
    width: 300px;
  }

  .sizebtn {
    font-size: 2rem;
  }

  .line {
    border-top: 1px solid rgb(189, 184, 184);
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .log-button:hover {
    text-decoration: underline;
    color: blue;
  }

  .no-padding {
    padding: none;
    margin: none;
  }

  .ga-one {
    border-radius: 0.375rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    padding-left: 1rem;
    box-shadow: 0 2px 3px 0 rgba(168, 168, 168, 0.795);
    margin-bottom: 5px;
    cursor: pointer;
    background-color: #f5f8f9;
  }

  .ga-two {
    color: #212529;
  }

  .ga-two:hover {
    text-decoration: underline;
  }
</style>
