<template>
  <div class="content">
    <div class="container-fluid">
      <h2 class="patient-name">{{pt_data.name}}</h2>

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
                  <div class="col-sm-5">{{pt_data.mits_mrn}}</div>
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
        <div class="col-xl-9">
          <!--Visit History--->
          <div class="row mt-3">
            <div class="col-xl-12">
              <va-card :title="$t('Visit History')">
                <va-data-table
                  :fields="visitHistoryFields"
                  :data="visitHistory"
                  :per-page="5"
                >
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
                  <div class="col-sm">{{pt_data.temperature}} &deg;C</div>
                </div>

                <div class="row">
                  <div class="col-sm-4"><b>Blood Pressure</b></div>
                  <div class="col-sm-auto"><b>:</b></div>
                  <div class="col-sm">{{pt_data.blood_pressure}} mm/Hg</div>
                </div>

                <div class="row">
                  <div class="col-sm-4"><b>Pulse Rate</b></div>
                  <div class="col-sm-auto"><b>:</b></div>
                  <div class="col-sm">{{pt_data.pulse_rate}} bpm</div>
                </div>

                <div class="row">
                  <div class="col-sm-4"><b>Weight</b></div>
                  <div class="col-sm-auto"><b>:</b></div>
                  <div class="col-sm">{{pt_data.weight}} kg</div>
                </div>

                <div class="row">
                  <div class="col-sm-4"><b>Height</b></div>
                  <div class="col-sm-auto"><b>:</b></div>
                  <div class="col-sm">{{pt_data.height}} cm</div>
                </div>

                <div class="row">
                  <div class="col-sm-4"><b>BMI</b></div>
                  <div class="col-sm-auto"><b>:</b></div>
                  <div class="col-sm">{{pt_data.bmi}} kg/m&sup2;</div>
                </div>

                <div class="row mb-3">
                  <div class="col-sm-4"><b>Waist Circumference</b></div>
                  <div class="col-sm-auto"><b>:</b></div>
                  <div class="col-sm">{{pt_data.waist_circumference}} cm</div>
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
              <!-- Clinical Information -->
              <va-tree-category label="Clinical Information" class="ga-one">
                <router-link :to="{ name: 'clinical-history'}"><va-tree-node class="ga-two">View History</va-tree-node></router-link>
                <router-link :to="{ name: 'clinical-information'}"><va-tree-node class="ga-two">Add New Reading</va-tree-node></router-link>
              </va-tree-category>
              <!-- Psychometric Test -->
              <va-tree-category label="Psychometric Test" class="ga-one">
                <router-link :to="{ name: 'psychometric-test-history'}"><va-tree-node class="ga-two">View History</va-tree-node></router-link>
                <va-tree-category label="Take New Test" >
                  <router-link :to="{ name: 'dass'}"><va-tree-node class="ga-two">DASS</va-tree-node></router-link>
                  <va-tree-node class="ga-two">PHQ-9</va-tree-node>
                  <router-link :to="{ name: 'cbi'}"><va-tree-node class="ga-two">CBI</va-tree-node></router-link>
                  <va-tree-node class="ga-two">WHO DAS</va-tree-node>
                  <va-tree-node class="ga-two">BDI</va-tree-node>
                  <va-tree-node class="ga-two">BAI</va-tree-node>
                  <va-tree-node class="ga-two">ATQ</va-tree-node>
                  <va-tree-node class="ga-two">PSP</va-tree-node>
                  <va-tree-node class="ga-two">Self-Harm Act & Suicidal Intent Scale</va-tree-node>
                  <va-tree-node class="ga-two">Suicidal Risk</va-tree-node>
                </va-tree-category>
              </va-tree-category>
              <!-- Clinical Documentation -->
              <va-tree-category label="Clinical Documentation" class="ga-one">
                <va-tree-category label="Clinical and Intervention Notes" >
                  <va-tree-category label="Clerking Notes" >
                    <va-tree-node class="ga-two">Patient Index Form</va-tree-node>
                    <router-link :to="{ name: 'counselling_clerking_note'}"><va-tree-node class="ga-two">Counsellor Clerking Note</va-tree-node></router-link>
                    <router-link :to="{ name: 'psychiatry_clerking_note'}"><va-tree-node class="ga-two">Psychiatry Clerking Note</va-tree-node></router-link>
                  </va-tree-category>
                  <va-tree-category label="Progress Notes" >
                    <router-link :to="{ name: 'progress_note'}"><va-tree-node class="ga-two">Progress Note</va-tree-node></router-link>
                    <router-link :to="{ name: 'counselling_progress_note'}"><va-tree-node class="ga-two">Counselling Progress Note</va-tree-node></router-link>
                    <router-link :to="{ name: 'patient_care_plan'}"><va-tree-node class="ga-two">Patient Care Plan and Case Review Form</va-tree-node></router-link>
                  </va-tree-category>
                  <va-tree-category label="Discharge Notes" >
                    <router-link :to="{ name: 'consultation_discharge_note'}"><va-tree-node class="ga-two">Consultation Discharge Note</va-tree-node></router-link>
                    <va-tree-node class="ga-two">Rehab Discharge Note</va-tree-node>
                    <va-tree-node class="ga-two">CPI Discharge Note</va-tree-node>
                  </va-tree-category>
                </va-tree-category>
                <va-tree-category label="Consent Forms and Information Sheets" >
                  <va-tree-category label="Consent Form">
                    <va-tree-node class="ga-two">CPS Homevisit Consent Form</va-tree-node>
                    <va-tree-node class="ga-two">CPS Homevisit Withdrawal Form</va-tree-node>
                    <va-tree-node class="ga-two">CPS Police Referral Form</va-tree-node>
                    <va-tree-node class="ga-two">Photography Consent Form</va-tree-node>
                    <va-tree-node class="ga-two">SE Consent Form</va-tree-node>
                    <va-tree-node class="ga-two">ETP Consent Form</va-tree-node>
                    <va-tree-node class="ga-two">Job Club Consent Form</va-tree-node>
                  </va-tree-category>
                  <va-tree-category label="Information Sheet">
                    <va-tree-node class="ga-two">Information on CPS</va-tree-node>
                    <va-tree-node class="ga-two">Information on SE</va-tree-node>
                    <va-tree-node class="ga-two">Information on ETP/JOB CLUB</va-tree-node>
                  </va-tree-category>
                </va-tree-category>
                <va-tree-category label="Assessment Forms and Checklist" >
                  <va-tree-category label="Assessment Forms" >
                    <va-tree-node class="ga-two">Job Commencement Report</va-tree-node>
                    <va-tree-node class="ga-two">Job Cessation Report</va-tree-node>
                    <va-tree-node class="ga-two">Job Transition Report</va-tree-node>
                    <va-tree-node class="ga-two">L.A.S.E.R.Form (Motivation)</va-tree-node>
                    <router-link :to="{ name: 'triage_form'}"><va-tree-node class="ga-two">Triage Form</va-tree-node></router-link>
                  </va-tree-category>
                  <va-tree-category label="Checklist" >
                    <va-tree-node class="ga-two">Job Interest Checklist</va-tree-node>
                    <va-tree-node class="ga-two">Work Analysis Form</va-tree-node>
                    <va-tree-node class="ga-two">List of Job Search</va-tree-node>
                    <va-tree-node class="ga-two">List of Employment Transition Program</va-tree-node>
                    <va-tree-node class="ga-two">Log Meeting with Employer</va-tree-node>
                    <va-tree-node class="ga-two">List of Previous or Current Job</va-tree-node>
                  </va-tree-category>
                </va-tree-category>
                <va-tree-category label="Referral letters" >
                  <router-link :to="{ name: 'internal_referral_letter'}"><va-tree-node class="ga-two">Internal Referral (To Hospital/Mentari)</va-tree-node></router-link>
                  <va-tree-node class="ga-two">External Referral Form</va-tree-node>
                  <va-tree-node class="ga-two">CPS Referral Form</va-tree-node>
                  <router-link :to="{ name: 'occupational_therapy_referral_form'}"><va-tree-node class="ga-two">OCCT Referral Form</va-tree-node></router-link>
                  <va-tree-node class="ga-two">Psychology Referral Form</va-tree-node>
                  <va-tree-node class="ga-two">Rehab Referral Form and Clinical Summary</va-tree-node>
                </va-tree-category>
              </va-tree-category>
              <!-- Appointment -->
              <va-tree-category label="Appointment" class="ga-one">
                <router-link :to="{ name: 'appointment-history'}"><va-tree-node class="ga-two">View History</va-tree-node></router-link>
                <router-link :to="{ name: 'patient-appointmentBooking'}"><va-tree-node class="ga-two">Book New Appointment</va-tree-node></router-link>
              </va-tree-category>
              <!-- Attachment -->
              <va-tree-category label="Attachment" class="ga-one">
                <va-tree-node class="ga-two">Add Attachment</va-tree-node>
              </va-tree-category>
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
import visitHistory from '../../../data/visitHistory.json'
import attachments from '../../../data/attachments.json'

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
          name: 'no',
          title: 'No',
          width: '5%',
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
          name: 'no',
          title: 'No',
          width: '5%',
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
      .get('http://127.0.0.1:8000/api/getPatientProfile?patient_id=' + patientId)
      .then((response) => {
        this.pt_data = response.data.data
        this.birthdate = this.getDate(response.data.data.birthdate)
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
