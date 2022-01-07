<template>
  <div class="content">
    <div class="container-fluid">
      <h2 class="patient-name">{{sh_data.name}}</h2>

      <div class="row">
        <!--Demographic--->
        <div class="col-xl-9 mb-3">
          <va-card :title="$t('Demographic')">
            <div class="float-right">
              <router-link :to="{ name: 'shharp-demographic', query: { st: 'edit'}}">
                <button type="button" class="btn sizebtn">
                  <div class="fa fa-pencil-square-o"/>
                </button>
              </router-link>
            </div>

            <div class="row mt-2">
              <div class="col-xl-8">
                <div class="row mt-2">
                  <div class="col-sm-4"><b>MITS 2.0 Ref No</b></div>
                  <div class="col-sm-auto"><b>:</b></div>
                  <div class="col-sm-5">{{sh_data.mits_mrn}}</div>
                </div>

                <div class="row">
                  <div class="col-sm-4"><b>Hospital's MRN</b></div>
                  <div class="col-sm-auto"><b>:</b></div>
                  <div class="col-sm-5">{{sh_data.hospital_mrn}}</div>
                </div>

                <div class="row">
                  <div class="col-sm-4"><b>Mentari's MRN</b></div>
                  <div class="col-sm-auto"><b>:</b></div>
                  <div class="col-sm-5">{{sh_data.mentari_mrn}}</div>
                </div>

                <div class="row">
                  <div class="col-sm-4"><b>Gender</b></div>
                  <div class="col-sm-auto"><b>:</b></div>
                  <div class="col-sm-5">{{sh_data.gender}}</div>
                </div>

                <div class="row">
                  <div class="col-sm-4"><b>Date of Birth</b></div>
                  <div class="col-sm-auto"><b>:</b></div>
                  <div class="col-sm-5">{{birthdate}} {{age}}</div>
                </div>

                <div class="row">
                  <div class="col-sm-4"><b>Marital Status</b></div>
                  <div class="col-sm-auto"><b>:</b></div>
                  <div class="col-sm-5">{{sh_data.marital}}</div>
                </div>

                <div class="row mb-3">
                  <div class="col-sm-4"><b>Nationality</b></div>
                  <div class="col-sm-auto"><b>:</b></div>
                  <div class="col-sm-5">{{nationality}}</div>
                </div>

              </div>
              <div class="col-xl-4 mb-3">
                <b>Employment Status :</b>
                <div>{{sh_data.employment_status}}</div>
                <br>
                <b>Household Income Status :</b>
                <div>RM {{sh_data.min}} - RM {{sh_data.max}}</div>
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
        <div class="col-xl-9">
          <div class="row mt-3">
            <!--Visit History--->
            <div class="col-xl-12">
              <va-card :title="$t('Visit History')">
                <va-data-table
                  :fields="visitHistoryFields"
                  :data="visitHistory"
                  :per-page="5"
                >
                  <template slot="no" slot-scope="row">
                    {{ row.rowIndex + 1 }}
                  </template>

                  <template slot="actions">
                    <va-button flat small color="gray" icon="fa fa-eye" />
                    <va-button flat small color="gray" icon="fa fa-pencil" />
                  </template>
                </va-data-table>
              </va-card>
            </div>
          </div>

          <!--Appointment--->
          <div class="row mt-3">
            <div class="col-xl-12">
              <va-card :title="$t('Appointment')">
                <div class="row mt-2 mb-2">
                  <div class="col-sm-4"><b>Next Appointment</b></div>
                  <div class="col-sm-auto"><b>:</b></div>
                  <div class="col-sm">{{appointmentDate}}</div>
                </div>
              </va-card>
            </div>
          </div>

          <!--Clinical Information--->
          <div class="row mt-3">
            <div class="col-xl-12">
              <va-card :title="$t('Clinical Information')">
                <div class="row mt-2">
                  <div class="col-sm-4"><b>Date / Time</b></div>
                  <div class="col-sm-auto"><b>:</b></div>
                  <div class="col-sm">{{clinicalDate}}</div>
                </div>

                <div class="row">
                  <div class="col-sm-4"><b>Temperature</b></div>
                  <div class="col-sm-auto"><b>:</b></div>
                  <div class="col-sm">{{sh_data.temperature}} &deg;C</div>
                </div>

                <div class="row">
                  <div class="col-sm-4"><b>Blood Pressure</b></div>
                  <div class="col-sm-auto"><b>:</b></div>
                  <div class="col-sm">{{sh_data.blood_pressure}} mm/Hg</div>
                </div>

                <div class="row">
                  <div class="col-sm-4"><b>Pulse Rate</b></div>
                  <div class="col-sm-auto"><b>:</b></div>
                  <div class="col-sm">{{sh_data.pulse_rate}} bpm</div>
                </div>

                <div class="row">
                  <div class="col-sm-4"><b>Weight</b></div>
                  <div class="col-sm-auto"><b>:</b></div>
                  <div class="col-sm">{{sh_data.weight}} kg</div>
                </div>

                <div class="row">
                  <div class="col-sm-4"><b>Height</b></div>
                  <div class="col-sm-auto"><b>:</b></div>
                  <div class="col-sm">{{sh_data.height}} cm</div>
                </div>

                <div class="row">
                  <div class="col-sm-4"><b>BMI</b></div>
                  <div class="col-sm-auto"><b>:</b></div>
                  <div class="col-sm">{{sh_data.bmi}} kg/m&sup2;</div>
                </div>

                <div class="row mb-3">
                  <div class="col-sm-4"><b>Waist Circumference</b></div>
                  <div class="col-sm-auto"><b>:</b></div>
                  <div class="col-sm">{{sh_data.waist_circumference}} cm</div>
                </div>
              </va-card>
            </div>
          </div>

          <!--Attachments--->
          <div class="row mt-3 mb-2">
            <div class="col-xl-12">
              <va-card :title="$t('Attachments')">
                <va-data-table
                  :fields="attachmentsFields"
                  :data="attachments"
                  :per-page="5"
                >
                  <template slot="no" slot-scope="row">
                    {{ row.rowIndex + 1 }}
                  </template>

                  <template slot="actions">
                    <va-button flat small color="gray" icon="fa fa-eye" />
                    <va-button flat small color="gray" icon="fa fa-trash" />
                  </template>
                </va-data-table>
              </va-card>
            </div>
          </div>
        </div>

        <!--General Actions-->
        <div class="col-xl mt-3">
          <va-card :title="$t('General Actions')">
            <va-tree-root>
              <!-- SHHARP -->
              <va-tree-category label="SHHARP" class="ga-one">
                <router-link :to="{ name: 'shharp-history'}"><va-tree-node class="ga-two">View History</va-tree-node></router-link>
                <router-link :to="{ name: 'shharp-registry'}"><va-tree-node class="ga-two">Add New Registry</va-tree-node></router-link>
              </va-tree-category>
            </va-tree-root>
          </va-card>
        </div>
      </div>
      <div>
        <router-link to="/patient-management/patient-transaction-log">
          <button type="button" class="btn log-button">
            <b>View Transaction Log</b>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import visitHistory from '../../data/visitHistory.json'
import attachments from '../../data/attachments.json'

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
      sh_data: [],
      birthdate: '',
      age: '',
      nationality: '',

      appointmentDate: '',
      clinicalDate: '',
      empty: true,

      visitHistory: visitHistory.slice(),
      attachments: attachments.slice(),
    }
  },
  computed: {
    visitHistoryFields () {
      return [
        {
          name: '__slot:no',
          title: this.$t('No'),
          width: '5%',
          dataClass: 'text-center',
        },
        {
          name: 'activity',
          title: 'Clinical Activity',
          width: '25%',
        },
        {
          name: 'status',
          title: 'Status',
          width: '15%',
        },
        {
          name: 'date',
          title: 'Date',
          width: '15%',
        },
        {
          name: 'time',
          title: 'Time',
          width: '10%',
        },
        {
          name: 'created_by',
          title: 'Created By',
          width: '15%',
        },
        {
          name: '__slot:actions',
          dataClass: 'text-right',
          width: '15%',
        },
      ]
    },
    attachmentsFields () {
      return [
        {
          name: '__slot:no',
          title: this.$t('No'),
          width: '5%',
          dataClass: 'text-center',
        },
        {
          name: 'file',
          title: 'File Name',
          width: '30%',
        },
        {
          name: 'date',
          title: 'Date',
          width: '20%',
        },
        {
          name: 'time',
          title: 'Time',
          width: '20%',
        },
        {
          name: '__slot:actions',
          dataClass: 'text-right',
          width: '15%',
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
    getDateTime (datetime) {
      const d = new Date(datetime)
      const newDateTime = d.toLocaleString('en-MY')
      return newDateTime
    },
  },
  mounted () {
    var patientId = JSON.parse(localStorage.getItem('ID'))
    this.$axios
      .get('http://127.0.0.1:8000/api/getSHHARPProfile?patientId=' + patientId)
      .then((response) => {
        this.sh_data = response.data.data

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
        if (response.data.data.date == null) {
          this.appointmentDate = '--/--/-- --:--'
        } else {
          this.appointmentDate = response.data.data.date + ' ' + response.data.data.time
        }
        if (response.data.data.timestamp_create == null) {
          this.clinicalDate = '--/--/---- --:--:--'
        } else {
          this.clinicalDate = this.getDateTime(response.data.data.timestamp_create)
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
