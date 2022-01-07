<template>
  <div class="content">
    <div class="container-fluid">

      <div class="row">
        <div class="col-12">

          <!-- Notification Alert -->
          <div class="mb-3" v-if="tabA==true">
            <va-notification color="danger">
              <va-badge color="danger">
                {{ $t('Incomplete') }}
              </va-badge>
              <span>Please fill all required fields.</span>
              <button type="button" class="btn close-button" @click="tabA = false">
                <span class="fa fa-close"/>
              </button>
            </va-notification>
          </div>

          <div class="mb-3" v-if="patientNotExist==true">
            <va-notification color="danger">
              <va-badge color="danger">
                {{ $t('Incomplete') }}
              </va-badge>
              <span>Patient with the specified NRIC/PASSPORT does not exist.</span>
              <button type="button" class="btn close-button" @click="patientExist = false">
                <span class="fa fa-close"/>
              </button>
            </va-notification>
          </div>

          <va-card>
            <div class="text-center"><h4 class="mt-4 mb-5 text-dark">BOOK APPOINTMENT</h4></div>
            <vue-form-generator :model="model" :schema="schema" :options="formOptions" ref="appointment">
            </vue-form-generator>

            <!-- Button footer-->
            <div class="mt-3">
              <div class="float-left">
                <button @click="cancelAppointment" type="button" class="ml-2 btn btn-fill btn-md btn-red">
                  CANCEL
                </button>
              </div>
              <div class="float-right">
                <button @click="validateForm" type="submit" class="ml-2 btn btn-fill btn-md btn-blue">
                  <div class="fa fa-paper-plane" /> &nbsp; CONFIRM
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
      tabA: false,
      submitPath: false,
      patientNotExist: false,
      requestAppointmentId: '',

      selectAppointmentType: [],
      selectVisitType: [],
      selectPatientCategory: [],
      selectAppointmentDuration: [],

      model: {
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
      .get('http://127.0.0.1:8000/api/getAppointmentMountedData')
      .then((response) => {
        this.selectVisitType = response.data.visitType
        this.selectPatientCategory = response.data.patientCategory
        this.selectAppointmentType = response.data.appointmentType
        this.selectAppointmentDuration = response.data.appointmentDuration
      })

    if (this.$route.query.st === 'edit') {
      var appointmentId = localStorage.getItem('appointmentId')

      this.$axios
        .get('http://127.0.0.1:8000/api/getAppointmentData?appointmentId=' + appointmentId)
        .then((response) => {
          console.log(response.data.data)
          this.model.NRIC_PASSPORT_NO = response.data.data[0].nricPassport
          this.model.DATE = response.data.data[0].date
          this.model.TIME = response.data.data[0].time
          this.model.DURATION = { name: response.data.data[0].durationName, value: response.data.data[0].durationValue }
          this.model.APPOINTMENT_TYPE = { value: response.data.data[0].appointmentTypeValue, name: response.data.data[0].appointmentTypeName }
          this.model.VISIT_TYPE = { value: response.data.data[0].visitTypeValue, name: response.data.data[0].visitTypeName }
          this.model.PATIENT_CATEGORY = { value: response.data.data[0].patientCategoryValue, name: response.data.data[0].patientCategoryName }
          this.model.ASSIGNED_TEAM = { value: response.data.data[0].assignedTeamValue, name: response.data.data[0].assignedTeamName }
          this.model.APPOINTMENT_ID = response.data.data[0].appointment_id
        })
    }

    if (this.$route.query.st === 'reqApp') {
      this.requestAppointmentId = localStorage.getItem('requestAppointmentId')
      this.model.NRIC_PASSPORT_NO = localStorage.getItem('nricPassport')
      this.model.PATIENT_FK = localStorage.getItem('ID')
    }
  },
  methods: {
    async cancelAppointment () {
      if (this.$route.query.st === 'edit') {
        var appointmentId = localStorage.getItem('appointmentId')
        const data = new FormData()
        data.append('appointmentId', appointmentId)
        const url = 'http://127.0.0.1:8000/api/deleteAppointment'
        await this.$axios.post(url, data)
        this.submitPath = true
        this.launchToast(' Appointment has been deleted!')
      }
      this.$router.push({ name: 'patient-appointmentList' })
    },
    async validateForm () {
      var tabA = this.validateTabA()

      if (this.$route.query.st === 'reqApp') {
        if (tabA) {
          const reqAppt = new FormData()
          reqAppt.append('requestAppointmentId', this.requestAppointmentId)
          this.$axios
            .post('http://127.0.0.1:8000/api/deleteRequestAppointment', reqAppt)
            .then((response) => {
              return response.data
            })

          const data = new FormData()
          data.append('apptData', JSON.stringify(this.model))
          this.$axios
            .post('http://127.0.0.1:8000/api/bookAppointment', data)
            .then((response) => {
              return response.data
            })

          this.launchToast(' Appointment for ' + this.model.NRIC_PASSPORT_NO + ' Booked Successful !')
          this.submitPath = true
          this.$router.push({ name: 'patient-appointmentList' })
        }
      } else {
        var patientVerified = await this.validatePatient()
        if (tabA && patientVerified) {
          if (this.$route.query.st === 'edit') {
            const data = new FormData()
            data.append('apptData', JSON.stringify(this.model))
            this.$axios
              .post('http://127.0.0.1:8000/api/updateAppointment', data)
              .then((response) => {
                return response.data
              })
            this.launchToast(' Appointment for ' + this.model.NRIC_PASSPORT_NO + ' Updated Successful !')
          } else {
            const data = new FormData()
            data.append('apptData', JSON.stringify(this.model))
            this.$axios
              .post('http://127.0.0.1:8000/api/bookAppointment', data)
              .then((response) => {
                return response.data
              })

            this.launchToast(' Appointment for ' + this.model.NRIC_PASSPORT_NO + ' Booked Successful !')
          }
          this.submitPath = true
          this.$router.push({ name: 'patient-appointmentList' })
        }
      }
    },
    async validatePatient () {
      const url = 'http://127.0.0.1:8000/api/verifyPatient?id=' + this.model.NRIC_PASSPORT_NO
      const response = await this.$axios.get(url)
      if (response.data.data !== '') {
        this.model.PATIENT_FK = JSON.stringify(response.data.data[0].value)
      }

      if (this.model.PATIENT_FK !== '') {
        this.patientNotExist = false
        return true
      } else {
        this.patientNotExist = true
        return false
      }
    },
    validateTabA () {
      var errors = this.$refs.appointment.validate()
      if (errors) {
        this.tabA = false
        return true
      } else {
        this.tabA = true
        return false
      }
    },
    launchToast (message) {
      this.showToast(
        message,
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
</style>
