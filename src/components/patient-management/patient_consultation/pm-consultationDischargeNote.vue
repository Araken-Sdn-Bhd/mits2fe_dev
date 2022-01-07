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
              <span>Please fill all <b> Dscharge Details </b> required fields.</span>
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
              <span>Please fill all <b> Verification </b> required fields.</span>
              <button type="button" class="btn close-button" @click="tabB = false">
                <span class="fa fa-close"/>
              </button>
            </va-notification>
          </div>

          <va-card>

            <div class="text-center"><h3 class="mt-4 mb-5 text-dark">CONSULTATION DISCHARGE NOTE</h3></div>

            <va-accordion class="my-4">

              <!-- Patient Details -->
              <va-collapse>
                <span slot="header">
                  <b>PATIENT DETAILS</b>
                </span>
                <div slot="body">
                  <vue-form-generator :model="model" :schema="patientSchema" :options="formOptions" ref="patientDetails">
                  </vue-form-generator>
                </div>
              </va-collapse>

              <!-- Staff Details -->
              <va-collapse>
                <span slot="header">
                  <b>REFERRAL DETAILS</b>
                </span>
                <div slot="body">
                  <vue-form-generator :schema="dischargeSchema" :model="model" :options="formOptions" ref="dischargeDetails"></vue-form-generator>
                </div>
              </va-collapse>

              <!-- Verification -->
              <va-collapse>
                <span slot="header">
                  <b>VERIFICATION</b>
                </span>
                <div slot="body">
                  <vue-form-generator :schema="verificationSchema" :model="model" :options="formOptions" ref="verificationDetails"></vue-form-generator>
                </div>
              </va-collapse>

            </va-accordion>

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

      selectDischargeCategory: [],
      selectDiagnosisType: [
        { name: 'One', value: 1 },
        { name: 'Two', value: 2 },
        { name: 'Three', value: 3 },
      ],

      model: {

        MRN: '',
        PATIENT_NAME: '',
        NRIC_PASSPORT: '',
        AGE: '',
        CONTACT_NO: '',
        GENDER: '',

        DIAGNOSIS: '',
        DISCHARGE_CATEGORY: '',
        SPECIFY_DISCHARGE_CATEGORY: '',
        COMMENT: '',

        SPECIALIST_NAME: '',
        DATE: '',

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
      dischargeSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'vueMultiSelect',
                label: 'Diagnosis',
                placeholder: 'Select ICD 10/ICD 11 Code',
                model: 'DIAGNOSIS',
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
              },
            ],
          },
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'vueMultiSelect',
                label: 'Category of Discharge',
                placeholder: 'Please Select',
                model: 'DISCHARGE_CATEGORY',
                required: true,
                validator: 'required',
                selectOptions: {
                  multiple: false,
                  closeOnSelect: true,
                  maxHeight: 180,
                  showLabels: false,
                  key: 'value',
                  label: 'name',
                },
                styleClasses: 'col-md-6',
                values: () => {
                  return this.selectDischargeCategory
                },
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'SPECIFY_DISCHARGE_CATEGORY',
                label: '',
                placeholder: 'to specify',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-6',
                visible: function (model) {
                  return model && (model.DISCHARGE_CATEGORY.value === 4 || model.DISCHARGE_CATEGORY.value === 5)
                },
              },
            ],
          },
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'textArea',
                label: 'COMMENT',
                model: 'COMMENT',
                rows: 3,
                required: true,
                validator: 'string',
                styleClasses: 'col-md-12',
              },
            ],
          },
        ],
      },
      verificationSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'input',
                inputType: 'text',
                label: 'Specialist Name',
                model: 'SPECIALIST_NAME',
                required: true,
                validator: 'string',
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
                format: 'YYYY/MM/DD',
                required: true,
                validator: 'date',
                styleClasses: ['col-md-6'],
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
      .get('http://127.0.0.1:8000/api/getConsultationDischargeNoteMountedData?patient_id=' + patientId)
      .then((response) => {
        this.selectDischargeCategory = response.data.dischargeCategory
        this.model.MRN = response.data.patientData[0].mrn
        this.model.PATIENT_NAME = response.data.patientData[0].name
        this.model.NRIC_PASSPORT = response.data.patientData[0].nricPassport
        if (response.data.patientData[0].birthdate !== null) {
          this.model.AGE = new Date().getFullYear() - response.data.patientData[0].birthdate.toString().substring(0, 4)
        }
        this.model.CONTACT_NO = response.data.patientData[0].contact
        this.model.GENDER = response.data.patientData[0].gender
      })
  },
  methods: {
    validateForm () {
      var tabA = this.validateTabA()
      var tabB = this.validateTabB()

      if (tabA && tabB) {
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
      var errors = this.$refs.dischargeDetails.validate()
      if (errors) {
        this.tabA = false
        return true
      } else {
        this.tabA = true
        return false
      }
    },
    validateTabB () {
      var errors = this.$refs.verificationDetails.validate()
      if (errors) {
        this.tabB = false
        return true
      } else {
        this.tabB = true
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

.vue-form-generator .field-checklist .listbox {
  height: auto;
  max-height: 600px;
  overflow: auto;
}

</style>
