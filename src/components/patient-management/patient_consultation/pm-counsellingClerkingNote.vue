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
              <span>Please fill all <b> Clinical Note </b> required fields.</span>
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
              <span>Please fill all <b> Consultation Details </b> required fields.</span>
              <button type="button" class="btn close-button" @click="tabB = false">
                <span class="fa fa-close"/>
              </button>
            </va-notification>
          </div>

          <va-card>
            <div class="text-center"><h3 class="mt-4 mb-5 text-dark">CLINICAL NOTE</h3></div>
            <vue-form-generator :model="model" :schema="clinicalNote1Schema" :options="formOptions" ref="clinicalNote1">
            </vue-form-generator>

            <va-accordion class="my-4">

              <!-- Staff Details -->
              <va-collapse>
                <span slot="header">
                  <b>STAFF DETAILS</b>
                </span>
                <div slot="body">
                  <vue-form-generator :schema="staffSchema" :model="model" :options="formOptions" ref="staffDetails"></vue-form-generator>
                </div>
              </va-collapse>

              <!-- Patient Details -->
              <va-collapse>
                <span slot="header">
                  <b>PATIENT DETAILS</b>
                </span>
                <div slot="body">
                  <vue-form-generator :schema="patientSchema" :model="model" :options="formOptions" ref="patientDetails"></vue-form-generator>
                </div>
              </va-collapse>

              <!-- Consultation Details -->
              <va-collapse>
                <span slot="header">
                  <b>CONSULTATION DETAILS</b>
                </span>
                <div slot="body">
                  <vue-form-generator :schema="consultationSchema" :model="model" :options="formOptions" ref="consultationDetails"></vue-form-generator>
                </div>
              </va-collapse>

            </va-accordion>

            <vue-form-generator :model="model" :schema="clinicalNote2Schema" :options="formOptions" ref="clinicalNote2">
            </vue-form-generator>

            <h6>{{model}}</h6>

            <!-- Button footer-->
            <div class="mt-3">
              <div class="float-right">
                <button @click="validateForm" type="submit" class="ml-2 btn btn-fill btn-md btn-blue">
                  <div class="fa fa-paper-plane" /> &nbsp; SUBMIT
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
      tabB: false,
      submitPath: false,

      selectServiceLocation: [],
      selectDiagnosisType: [
        { name: 'One', value: 1 },
        { name: 'Two', value: 2 },
        { name: 'Three', value: 3 },
      ],
      selectICD9Code: [
        { name: 'One', value: 1 },
        { name: 'Two', value: 2 },
        { name: 'Three', value: 3 },
      ],
      selectICD9Subcode: [
        { name: 'One', value: 1 },
        { name: 'Two', value: 2 },
        { name: 'Three', value: 3 },
      ],
      selectServiceComplexity: [],
      selectOutcome: [],

      radioServiceCategory: [],

      model: {
        selectServiceCategory1: '',
        selectServiceCategory3: '',

        SERVICE_LOCATION: '',
        SPECIFY_SERVICE_LOCATION: '',
        TITLE: 'COUNSELLING CLERKING NOTE',
        DIAGNOSIS_TYPE: '',
        SERVICE_CATEGORY: '',
        SERVICE_COMPLEXITY: '',
        SERVICES: '',
        ICD9_CODE: '',
        ICD9_SUBCODE: '',
        OUTCOME: '',
        MEDICATION: '',

        STAFF_NAME: '',
        DESIGNATION: '',
        ROOM: '',
        DATE: '',
        TIME: '',

        MRN: '',
        PATIENT_NAME: '',
        NRIC_PASSPORT: '',
        AGE: '',
        CONTACT_NO: '',
        GENDER: '',

        DIAGNOSIS: '',
        CLINICAL_SUMMARY: '',
        BACKGROUND_HISTORY: '',
        CLINICAL_NOTES: '',
        MANAGEMENT: '',

      },
      clinicalNote1Schema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'vueMultiSelect',
                label: 'Location of Services',
                placeholder: 'Select Location of Services',
                model: 'SERVICE_LOCATION',
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
                  return this.selectServiceLocation
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: '',
                required: true,
                validator: 'string',
                model: 'SPECIFY_SERVICE_LOCATION',
                placeholder: 'Please Specify Location of Services',
                styleClasses: 'col-md-6',
                visible: (model) => {
                  return model && model.SERVICE_LOCATION.value === 7
                },
              },
            ],
          },
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'label',
                label: 'Title: ',
                featured: true,
                styleClasses: 'col-lg-2',
              },
              {
                type: 'label',
                model: 'TITLE',
                styleClasses: 'col-lg-4',
              },
            ],
          },
        ],
      },
      staffSchema: {
        groups: [
          {
            fields: [
              {
                type: 'label',
                label: 'Staff Name/Seen By: ',
                featured: true,
                styleClasses: 'col-lg-2',
              },
              {
                type: 'label',
                model: 'STAFF_NAME',
                styleClasses: 'col-lg-4',
              },
              {
                type: 'label',
                label: 'Designation: ',
                featured: true,
                styleClasses: 'col-lg-2',
              },
              {
                type: 'label',
                model: 'DESIGNATION',
                styleClasses: 'col-lg-4',
              },
              {
                type: 'label',
                label: 'Room: ',
                featured: true,
                styleClasses: 'col-lg-2',
              },
              {
                type: 'label',
                model: 'ROOM',
                styleClasses: 'col-lg-4',
              },
              {
                type: 'label',
                label: 'Date: ',
                featured: true,
                styleClasses: 'col-lg-2',
              },
              {
                type: 'label',
                model: 'DATE',
                styleClasses: 'col-lg-4',
              },
              {
                type: 'label',
                label: 'Time: ',
                featured: true,
                styleClasses: 'col-lg-2',
              },
              {
                type: 'label',
                model: 'TIME',
                styleClasses: 'col-lg-4',
              },
            ],
          },
        ],
      },
      patientSchema: {
        groups: [
          {
            fields: [
              {
                type: 'label',
                label: 'MRN: ',
                featured: true,
                styleClasses: 'col-lg-2',
              },
              {
                type: 'label',
                model: 'MRN',
                styleClasses: 'col-lg-4',
              },
              {
                type: 'label',
                label: 'Patient Name: ',
                featured: true,
                styleClasses: 'col-lg-2',
              },
              {
                type: 'label',
                model: 'PATIENT_NAME',
                styleClasses: 'col-lg-4',
              },
              {
                type: 'label',
                label: 'NRIC/Passport No: ',
                featured: true,
                styleClasses: 'col-lg-2',
              },
              {
                type: 'label',
                model: 'NRIC_PASSPORT',
                styleClasses: 'col-lg-4',
              },
              {
                type: 'label',
                label: 'Age: ',
                featured: true,
                styleClasses: 'col-lg-2',
              },
              {
                type: 'label',
                model: 'AGE',
                styleClasses: 'col-lg-4',
              },
              {
                type: 'label',
                label: 'Contact No: ',
                featured: true,
                styleClasses: 'col-lg-2',
              },
              {
                type: 'label',
                model: 'CONTACT_NO',
                styleClasses: 'col-lg-4',
              },
              {
                type: 'label',
                label: 'Gender: ',
                featured: true,
                styleClasses: 'col-lg-2',
              },
              {
                type: 'label',
                model: 'GENDER',
                styleClasses: 'col-lg-4',
              },
            ],
          },
        ],
      },
      consultationSchema: {
        groups: [
          {
            fields: [
              {
                type: 'input',
                inputType: 'text',
                label: 'Diagnosis',
                model: 'DIAGNOSIS',
                readonly: true,
                styleClasses: 'col-md-6',
              },
              {
                type: 'textArea',
                label: 'Clinical Summary',
                model: 'CLINICAL_SUMMARY',
                placeholder: 'Enter Description',
                rows: 3,
                required: true,
                validator: 'string',
                styleClasses: 'col-md-12',
              },
              {
                type: 'textArea',
                label: 'Background History',
                model: 'BACKGROUND_HISTORY',
                placeholder: 'Enter Description',
                rows: 3,
                required: true,
                validator: 'string',
                styleClasses: 'col-md-12',
              },
              {
                type: 'textArea',
                label: 'Clinical Notes',
                model: 'CLINICAL_NOTES',
                placeholder: 'Enter Description',
                rows: 3,
                required: true,
                validator: 'string',
                styleClasses: 'col-md-12',
              },
              {
                type: 'textArea',
                label: 'Management',
                model: 'MANAGEMENT',
                placeholder: 'Enter Description',
                rows: 3,
                required: true,
                validator: 'string',
                styleClasses: 'col-md-12',
              },
            ],
          },
        ],
      },
      clinicalNote2Schema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'vueMultiSelect',
                label: 'Type of Diagnosis',
                placeholder: 'Select ICD 10/ICD 11 Code',
                model: 'DIAGNOSIS_TYPE',
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
                  return this.selectDiagnosisType
                },
                onChanged: function (model, newVal, oldVal, field) {
                  model.DIAGNOSIS = newVal.name
                },
              },
            ],
          },
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'radios',
                label: 'Category of Service',
                model: 'SERVICE_CATEGORY',
                required: true,
                validator: 'required',
                styleClasses: ['col-md-6', 'display-inline'],
                values: () => {
                  return this.radioServiceCategory
                },
                onChanged: function (model, newVal, oldVal, field) {
                  if (newVal === 1) {
                    this.$axios
                      .get('http://127.0.0.1:8000/api/getServiceBasedOnCategory?id=' + model.SERVICE_CATEGORY)
                      .then((response) => {
                        this.model.selectServiceCategory1 = response.data.data
                      })
                    model.ICD9_CODE = ''
                    model.ICD9_SUBCODE = ''
                    model.SERVICES = ''
                  } else if (newVal === 2) {
                    model.SERVICES = ''
                  } else if (newVal === 3) {
                    this.$axios
                      .get('http://127.0.0.1:8000/api/getServiceBasedOnCategory?id=' + model.SERVICE_CATEGORY)
                      .then((response) => {
                        model.selectServiceCategory3 = response.data.data
                      })
                    model.ICD9_CODE = ''
                    model.ICD9_SUBCODE = ''
                    model.SERVICES = ''
                  }
                },
              },
            ],
          },
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'vueMultiSelect',
                label: 'Services',
                placeholder: 'Select Services',
                model: 'SERVICES',
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
                  return this.model.selectServiceCategory1
                },
                visible: function (model) {
                  return model && model.SERVICE_CATEGORY === 1
                },
              },
              {
                type: 'vueMultiSelect',
                label: 'ICD9 Code',
                placeholder: 'Select Code',
                model: 'ICD9_CODE',
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
                  return this.selectICD9Code
                },
                visible: function (model) {
                  return model && model.SERVICE_CATEGORY === 2
                },
              },
              {
                type: 'vueMultiSelect',
                label: 'ICD9 Sub Code',
                placeholder: 'Select Sub Code',
                model: 'ICD9_SUBCODE',
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
                  return this.selectICD9Subcode
                },
                visible: function (model) {
                  return model && model.SERVICE_CATEGORY === 2
                },
              },
              {
                type: 'vueMultiSelect',
                label: 'Services',
                placeholder: 'Select Services',
                model: 'SERVICES',
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
                  return this.model.selectServiceCategory3
                },
                visible: function (model) {
                  return model && model.SERVICE_CATEGORY === 3
                },
              },
            ],
          },
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'vueMultiSelect',
                label: 'Complexity of Service',
                placeholder: 'Select Complexity of Service',
                model: 'SERVICE_COMPLEXITY',
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
                  return this.selectServiceComplexity
                },
              },
              {
                type: 'vueMultiSelect',
                label: 'Outcome',
                placeholder: 'Select Outcome',
                model: 'OUTCOME',
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
                  return this.selectOutcome
                },
              },
            ],
          },
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'textArea',
                label: 'Medication',
                model: 'MEDICATION',
                placeholder: 'Please Type Prescription Here',
                rows: 4,
                required: true,
                validator: 'string',
                styleClasses: 'col-md-12',
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
    var patientId = JSON.parse(localStorage.getItem('ID'))
    this.$axios
      .get('http://127.0.0.1:8000/api/getCounsellingClerkingNoteMountedData?patient_id=' + patientId)
      .then((response) => {
        this.selectServiceLocation = response.data.serviceLocation
        this.selectServiceComplexity = response.data.serviceComplexity
        this.selectOutcome = response.data.serviceOutcome
        this.radioServiceCategory = response.data.serviceCategory
        this.model.MRN = response.data.patientData[0].mrn
        this.model.PATIENT_NAME = response.data.patientData[0].name
        this.model.NRIC_PASSPORT = response.data.patientData[0].nricPassport
        if (response.data.patientData[0].birthdate !== null) {
          this.model.AGE = new Date().getFullYear() - response.data.patientData[0].birthdate.toString().substring(0, 4)
        }
        this.model.CONTACT_NO = response.data.patientData[0].contact
        this.model.GENDER = response.data.patientData[0].gender
        this.model.DATE = new Date().toLocaleDateString('en-MY')
        this.model.TIME = new Date().toLocaleTimeString('en-MY')
      })
  },
  methods: {
    validateForm () {
      var tabA = this.validateTabA()
      var tabB = this.validateTabB()
      var tabC = this.validateTabC()

      if (tabA && tabB && tabC) {
        const data = new FormData()
        data.append('psychiatryClerkingNote', JSON.stringify(this.model))
        this.$axios
          .post('http://127.0.0.1:8000/api/savePsychiatryClerkingNote', data)
          .then((response) => {
            return response.data
          })
        this.launchToast('Pyschiatry Clerking Note for the Patient Saved Successfully!')
        this.submitPath = true
        this.$router.push({ name: 'patient-appointmentList' })
      }
    },
    validateTabA () {
      var errors = this.$refs.clinicalNote1.validate()
      if (errors) {
        this.tabA = false
        return true
      } else {
        this.tabA = true
        return false
      }
    },
    validateTabB () {
      var errors = this.$refs.consultationDetails.validate()
      if (errors) {
        this.tabB = false
        return true
      } else {
        this.tabB = true
        return false
      }
    },
    validateTabC () {
      var errors = this.$refs.clinicalNote2.validate()
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
