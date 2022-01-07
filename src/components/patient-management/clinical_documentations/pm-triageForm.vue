<!--
This page is not fully completed [last updated by Humaira': 27/12/2021]
  1. No validation
  2. Add Screening on button click is functioning(new row is added) but only the first data inserted is stored (using vue-form-generator)
-->
<template>
  <div class="content">
    <div class="container-fluid">

      <div class="row">
        <div class="col-12">
          <!--Notification-->
          <div class="mb-3" v-if="tabA==true">
            <va-notification color="danger">
              <va-badge color="danger">
                {{ $t('Incomplete') }}
              </va-badge>
              <span>Please fill all <b> Triage Form </b> required fields.</span>
              <button type="button" class="btn close-button" @click="tabA = false">
                <span class="fa fa-close"/>
              </button>
            </va-notification>
          </div>
          <div class="mb-3" v-if="tabB==true">
            <va-notification color="danger">
              <va-badge color="danger">
                {{ $t('Incomplete') }}
              </va-badge>
              <span>Please fill all <b> Outcome </b> required fields.</span>
              <button type="button" class="btn close-button" @click="tabA = false">
                <span class="fa fa-close"/>
              </button>
            </va-notification>
          </div>
          <div class="mb-3" v-if="tabC==true">
            <va-notification color="danger">
              <va-badge color="danger">
                {{ $t('Incomplete') }}
              </va-badge>
              <span>Please fill all <b> Book Appointment </b> required fields.</span>
              <button type="button" class="btn close-button" @click="tabA = false">
                <span class="fa fa-close"/>
              </button>
            </va-notification>
          </div>

          <va-card>
            <br>
            <b-tabs content-class="mt-3 px-5 pb-5" v-model="tabIndex" fill>

              <b-tab title="1. Triage Form" active>
                <div class="text-center"><h4 class="mt-5 mb-5 text-dark">TRIAGE FORM</h4></div>
                <h5>Part A: Risk Evaluation</h5>
                <table class="triage-table mb-3">
                  <tr>
                    <th>Risk Assessment Descriptions</th>
                    <th></th>
                  </tr>
                  <tr>
                    <td>History of aggressive and impulsive behaviour</td>
                    <td><input type="checkbox" true-value=1 false-value=0 v-model="model.HISTORY"></td>
                  </tr>
                  <tr>
                    <td>History of criminal case</td>
                    <td><input type="checkbox" true-value=1 false-value=0 v-model="model.CRIMINAL"></td>
                  </tr>
                  <tr>
                    <td>Detereoration of clinical condition</td>
                    <td><input type="checkbox" true-value=1 false-value=0 v-model="model.CLINICAL"></td>
                  </tr>
                  <tr>
                    <td>Neglect of self-care</td>
                    <td><input type="checkbox" true-value=1 false-value=0 v-model="model.SELFCARE"></td>
                  </tr>
                </table>

                <table class="triage-table mt-3" >
                  <tr>
                    <th>Criteria</th>
                    <th class="center">Idea (Yes)</th>
                    <th class="center">Attempt (Yes)</th>
                  </tr>
                  <tr>
                    <td>Suicidal behaviour</td>
                    <td class="center"><input type="checkbox" true-value=1 false-value=0 v-model="model.IDEA_SUICIDAL"></td>
                    <td class="center"><input type="checkbox" true-value=1 false-value=0 v-model="model.ATTEMPT_SUICIDAL"></td>
                  </tr>
                  <tr>
                    <td>Homicidal</td>
                    <td class="center"><input type="checkbox" true-value=1 false-value=0 v-model="model.IDEA_HOMICIDAL"></td>
                    <td class="center"><input type="checkbox" true-value=1 false-value=0 v-model="model.ATTEMPT_HOMICIDAL"></td>
                  </tr>
                  <tr>
                    <td>Aggressive</td>
                    <td class="center"><input type="checkbox" true-value=1 false-value=0 v-model="model.IDEA_AGGRESIVE"></td>
                    <td class="center"><input type="checkbox" true-value=1 false-value=0 v-model="model.ATTEMPT_AGGRESIVE"></td>
                  </tr>
                </table>

                <h5>Part B: Social Support</h5>
                <input type="checkbox" id="no-family" true-value=1 false-value=0 v-model="model.NO_FAMILY" class="ml-3">
                <label for="no-family" class="ml-4">Has no family, friends or guardian</label>
                <br>
                <input type="checkbox" id="homeless" true-value=1 false-value=0 v-model="model.HOMELESS" class="ml-3">
                <label for="homeless" class="ml-4">Homeless</label>

                <h5>Part C: Capacity to Work Together</h5>
                <input type="checkbox" id="no-family" true-value=1 false-value=0 v-model="model.TOGETHER" class="ml-3">
                <label for="no-family" class="ml-4">Cannot give commitment to work together</label>
                <br>
                <input type="checkbox" id="homeless" true-value=1 false-value=0 v-model="model.INTEREST" class="ml-3">
                <label for="homeless" class="ml-4">Showed no interest in treatment</label>
                <br>

                <h5 style="float: left;">Part D: Screening</h5>
                <div class="float-right">
                  <button type="button" class="btn sizebtn" @click="addNewScreening">
                    <div class="fa fa-plus-circle"/>
                  </button>
                </div>
                <table class=" triage-table mt-3" >
                  <tr>
                    <th>Screening Test</th>
                    <th>Score</th>
                  </tr>
                  <tr v-for="(screening, s) in screenings" :key="s">
                    <td><vue-form-generator :model="model" :schema="testSchema" :options="formOptions" ref="test"></vue-form-generator></td>
                    <td><vue-form-generator :model="model" :schema="scoreSchema" :options="formOptions" ref="score"></vue-form-generator></td>
                    <td scope="row" class="trashIconContainer"><div class="fa fa-trash" @click="deleteRow(s, screening)" style="cursor: pointer;"></div> </td>
                  </tr>
                  <!-- <tr v-for="(screening, s) in screenings" :key="s">
                    <td><select class="test-options" v-model="screenings.test">
                      <option v-for="test  in selectScreening" :key="test.id" v-bind:value="key" >{{test.name}}</option>
                    </select></td>
                    <td><input type="text" v-model="screening.score" class="form-control"></td>
                  </tr> -->
                </table>

              </b-tab>

              <b-tab title="2. Outcome">
                <h5>Part E: Outcome</h5>
                <vue-form-generator :model="model" :schema="schema" :options="formOptions" ref="triageOutcome">
                </vue-form-generator>
              </b-tab>

              <b-tab title="3. Book Appointment">
                <div class="text-center"><h4 class="mt-5 mb-5 text-dark">BOOK APPOINTMENT</h4></div>
                <vue-form-generator :model="model" :schema="apptSchema" :options="formOptions" ref="appointment">
                </vue-form-generator>
              </b-tab>
            </b-tabs>

            <!-- Buttons -->
            <div class="my-3">
              <div class="float-left">
                <button v-if="!tabIndex==0" @click="tabIndex--" type="button" class="btn btn-primary btn-fill btn-md">
                  <div class="fa fa-step-backward" /> &nbsp; Previous
                </button>
              </div>
              <div class="float-right">
                <button v-if="tabIndex < 2" @click="tabIndex++" type="button" class="btn btn-info btn-fill btn-md">
                  Next <div class="fa fa-step-forward" />
                </button>

                <button v-if="tabIndex==2" @click="validateTriage" type="submit" class="ml-2 btn btn-primary btn-fill btn-md">
                  <div class="fa fa-paper-plane" /> &nbsp;Submit
                </button>
              </div>
            </div>
          </va-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabIndex: 1,
      submitPath: false,
      patientNotExist: false,
      tabA: false,
      tabB: false,
      tabC: false,
      requestAppointmentId: '',

      selectScreening: [],
      selectAppointmentType: [],
      selectVisitType: [],
      selectPatientCategory: [],
      selectAppointmentDuration: [],

      screenings: [
        {
          test: '',
          score: '',
        },
      ],

      model: {
        // Triage
        HISTORY: 0,
        CRIMINAL: 0,
        CLINICAL: 0,
        SELFCARE: 0,

        IDEA_SUICIDAL: 0,
        ATTEMPT_SUICIDAL: 0,
        IDEA_HOMICIDAL: 0,
        ATTEMPT_HOMICIDAL: 0,
        IDEA_AGGRESIVE: 0,
        ATTEMPT_AGGRESIVE: 0,

        NO_FAMILY: 0,
        HOMELESS: 0,
        TOGETHER: 0,
        INTEREST: 0,

        // Screening
        TEST: '',
        SCORE: '',

        // Outcome
        TREATMENT: '',
        PLACEMENT: '',

        // Book Appointment
        NRIC_PASSPORT_NO: '',
        DATE: '',
        TIME: '',
        DURATION: '',
        APPOINTMENT_TYPE: '',
        VISIT_TYPE: '',
        PATIENT_CATEGORY: '',
        ASSIGNED_TEAM: '',
        PATIENT_FK: '',
        APPOINTMENT_ID: '',
        selectAssignedTeam: [],
      },

      schema: {
        fields: [
          {
            type: 'radios',
            label: '<b>Treatment</b>',
            model: 'TREATMENT',
            values: [
              { value: 0, name: 'Checked immediately' },
              { value: 1, name: 'Given an appointment (within 2 weeks)' },
              { value: 2, name: 'Given a regular appointment (within 2-6 weeks)' },
            ],
            required: true,
            validator: 'required',
            styleClasses: 'ml-3',
          },
          {
            type: 'radios',
            label: '<b>Placement<b>',
            model: 'PLACEMENT',
            values: [
              { value: 0, name: 'Referred to the main hospital' },
              { value: 1, name: 'Discharge with treatment' },
            ],
            required: true,
            validator: 'required',
            styleClasses: 'ml-3',
          },
        ],
      },
      testSchema: {
        fields: [
          {
            type: 'select',
            model: 'TEST',
            values: () => {
              return this.selectScreening
            },
            selectOptions: {
              noneSelectedText: 'Please Select',
            },
            required: true,
            validator: 'required',
            styleClasses: 'mr-5',
          },
        ],
      },
      scoreSchema: {
        fields: [
          {
            type: 'input',
            inputType: 'number',
            placeholder: 'Enter score',
            min: 0,
            model: 'SCORE',
            required: true,
            validator: 'number',
          },
        ],
      },
      apptSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'input',
                inputType: 'text',
                label: 'NRIC/Passport Number',
                model: 'NRIC_PASSPORT_NO',
                required: true,
                validator: 'string',
                hint: "Without ''-''",
                styleClasses: 'col-md-6',
              },
            ],
          },
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'input',
                inputType: 'date',
                label: 'Date',
                model: 'DATE',
                placeholder: 'Enter Date',
                required: true,
                validator: 'date',
                format: 'YYYY/MM/DD',
                styleClasses: 'col-md-4',
              },
              {
                type: 'input',
                inputType: 'time',
                label: 'Time',
                model: 'TIME',
                required: true,
                validator: 'required',
                styleClasses: ['col-md-4'],
              },
              {
                type: 'vueMultiSelect',
                label: 'Duration',
                placeholder: 'Please select',
                model: 'DURATION',
                required: true,
                validator: 'required',
                selectOptions: {
                  multiple: false,
                  closeOnSelect: true,
                  maxHeight: 200,
                  showLabels: false,
                  key: 'value',
                  label: 'name',
                },
                styleClasses: 'col-md-4',
                values: () => {
                  return this.selectAppointmentDuration
                },
              },
            ],
          },
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'vueMultiSelect',
                label: 'Appointment Type',
                placeholder: 'Please select',
                model: 'APPOINTMENT_TYPE',
                required: true,
                validator: 'required',
                selectOptions: {
                  multiple: false,
                  closeOnSelect: true,
                  maxHeight: 200,
                  showLabels: false,
                  key: 'value',
                  label: 'name',
                },
                styleClasses: 'col-md-6',
                values: () => {
                  return this.selectAppointmentType
                },
              },
              {
                type: 'vueMultiSelect',
                label: 'Type of Visit',
                placeholder: 'Please select',
                model: 'VISIT_TYPE',
                required: true,
                validator: 'required',
                selectOptions: {
                  multiple: false,
                  closeOnSelect: true,
                  maxHeight: 200,
                  showLabels: false,
                  key: 'value',
                  label: 'name',
                },
                styleClasses: 'col-md-6',
                values: () => {
                  return this.selectVisitType
                },
              },
            ],
          },
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'vueMultiSelect',
                label: 'Category of Patient',
                placeholder: 'Please select',
                model: 'PATIENT_CATEGORY',
                required: true,
                validator: 'required',
                selectOptions: {
                  multiple: false,
                  closeOnSelect: true,
                  maxHeight: 200,
                  showLabels: false,
                  key: 'value',
                  label: 'name',
                },
                styleClasses: 'col-md-6',
                values: () => {
                  return this.selectPatientCategory
                },
                onChanged: function (model) {
                  this.$axios
                    .get('http://127.0.0.1:8000/api/getAssignedTeam?id=' + model.PATIENT_CATEGORY.value)
                    .then((response) => {
                      this.model.selectAssignedTeam = response.data.data
                    })
                },
              },
              {
                type: 'vueMultiSelect',
                label: 'Assigned Team',
                placeholder: 'Please select',
                model: 'ASSIGNED_TEAM',
                required: true,
                validator: 'required',
                selectOptions: {
                  multiple: false,
                  closeOnSelect: true,
                  maxHeight: 200,
                  showLabels: false,
                  key: 'value',
                  label: 'name',
                },
                styleClasses: 'col-md-6',
                values: () => {
                  return this.model.selectAssignedTeam
                },
              },
            ],
          },
        ],
      },
      formOptions: {
        validateAfterLoad: false,
        validateAfterChanged: true,
      },
    }
  },
  mounted () {
    this.$axios
      .get('http://127.0.0.1:8000/api/getPsychometricTest')
      .then((response) => {
        this.selectScreening = response.data.data
      })
    this.$axios
      .get('http://127.0.0.1:8000/api/getAppointmentMountedData')
      .then((response) => {
        this.selectVisitType = response.data.visitType
        this.selectPatientCategory = response.data.patientCategory
        this.selectAppointmentType = response.data.appointmentType
        this.selectAppointmentDuration = response.data.appointmentDuration
      })
  },
  methods: {
    addNewScreening () {
      this.screenings.push({
        test: '',
        score: '',
      })
    },
    deleteRow (index, screening) {
      var idx = this.screenings.indexOf(screening)
      console.log(idx, index)
      if (idx > -1) {
        this.screenings.splice(idx, 1)
      }
    },
    validateTriage () {
      var outcome = this.validateOutcome()
      // var test = this.validateTest()
      // var score = this.validateScore()
      var appt = this.validateAppointment()

      if (outcome /* && test && score */ && appt) {
        var patientId = JSON.parse(localStorage.getItem('ID'))
        this.submitPath = true

        const data = new FormData()
        data.append('triageData', JSON.stringify(this.model))
        this.$axios
          .post('http://127.0.0.1:8000/api/addTriage?patientId=' + patientId, data)
          .then((response) => {
            this.$router.push({ path: 'patient-profile' })
          })
        this.launchToast('Triage Form Added')
      }
    },
    validateOutcome () {
      var errors = this.$refs.triageOutcome.validate()
      if (errors) {
        this.tabB = false
        return true
      } else {
        this.tabB = true
        return false
      }
    },
    validateTest () {
      var errors = this.$refs.test.validate()
      if (errors) {
        return true
      } else {
        return false
      }
    },
    validateScore () {
      var errors = this.$refs.score.validate()
      if (errors) {
        return true
      } else {
        return false
      }
    },
    validateAppointment () {
      var errors = this.$refs.appointment.validate()
      if (errors) {
        this.tabC = false
        return true
      } else {
        this.tabC = true
        return false
      }
    },
    launchToast (text) {
      this.showToast(
        text,
        {
          icon: 'fa-check',
          position: 'top-center',
          duration: 2500,
          fullWidth: false,
        },
      )
    },
  },
  beforeRouteLeave (to, from, next) {
    if (this.submitPath === true) {
      next(true)
    } else {
      const answer = window.confirm('Changes you made may not be saved.')
      if (answer) {
        next(true)
      } else {
        next(false)
      }
    }
  },
}
</script>

<style>
.app-layout__main {
  background: hsl(0, 0%, 91%);
}

ul.va-unordered > li::before,
.content ul > li::before {
  content: "";
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  position: absolute;
  left: 0;
  top: 0;
  margin-top: 0.5rem;
  background-color: #2c82e000;
}

ul.va-unordered > li,
.content ul > li {
  padding-left: 0;
}

.triage-table {
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

.center {
  text-align: center;
}

.nav-tabs .nav-link {
  border: 1px solid #918f8d;
  color: #918f8d;
}

.nav-tabs .nav-link:hover {
  border: 1px solid #f2a444;
  color: #f2a444;
}

.nav-tabs .nav-link.active {
  background-color: #f2a444;
  color: #ffffff;
  border: 1px solid #f2a444;
}

.test-options {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #ffffff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}

.close-button {
  color: rgb(227, 75, 74);
  position: absolute;
  right: 0;
  width: 70px;
}

.close-button:hover {
  color: black;
}

.close-button:focus {
  box-shadow: none !important;
}

</style>
