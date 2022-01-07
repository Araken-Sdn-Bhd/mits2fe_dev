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

          <va-card>

            <div class="text-center"><h3 class="mt-4 mb-5 text-dark">INTERNAL REFERRAL LETTER</h3></div>

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
                  <b>FROM</b>
                </span>
                <div slot="body">
                  <vue-form-generator :schema="referralSchema" :model="model" :options="formOptions" ref="referral"></vue-form-generator>
                </div>
              </va-collapse>

            </va-accordion>

            <vue-form-generator :schema="staffSchema" :model="model" :options="formOptions" ref="staffDetails"></vue-form-generator>

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
      submitPath: false,

      model: {

        PATIENT_NAME: '',
        NRIC_PASSPORT: '',
        AGE: '',
        CONTACT_NO: '',
        ADDRESS: '',

        MENTARI_ADDRESS: '',
        DIAGNOSIS: '',
        REFERRAL_REASON: '',
        SUMMARY: '',
        MANAGEMENT: '',
        MEDICATION: '',

        NAME: '',
        DESIGNATION: '',
        HOSPITAL: '',

      },
      patientSchema: {
        groups: [
          {
            fields: [
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
                label: 'Address: ',
                featured: true,
                styleClasses: 'col-lg-2',
              },
              {
                type: 'label',
                model: 'ADDRESS',
                styleClasses: 'col-lg-4',
              },
            ],
          },
        ],
      },
      referralSchema: {
        groups: [
          {
            fields: [
              {
                type: 'label',
                model: 'MENTARI_ADDRESS',
              },
              {
                type: 'label',
                label: 'Dear Dr, <br> Thank you for seeing this patient.',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Diagnosis',
                model: 'DIAGNOSIS',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-12',
              },
              {
                type: 'textArea',
                label: 'Reason for Referral',
                model: 'REFERRAL_REASON',
                rows: 3,
                required: true,
                validator: 'string',
                styleClasses: 'col-md-12',
              },
              {
                type: 'textArea',
                label: 'Summary',
                model: 'SUMMARY',
                rows: 2,
                required: true,
                validator: 'string',
                styleClasses: 'col-md-12',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Management',
                model: 'MANAGEMENT',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-12',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Medication',
                model: 'MEDICATION',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-12',
              },
              {
                type: 'label',
                label: 'Thank you,',
              },
            ],
          },
        ],
      },
      staffSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'input',
                inputType: 'text',
                label: 'Name',
                model: 'NAME',
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
                inputType: 'text',
                label: 'Designation',
                model: 'DESIGNATION',
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
                inputType: 'text',
                label: 'Hospital',
                model: 'HOSPITAL',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-6',
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
      .get('http://127.0.0.1:8000/api/getInternalReferralLetterMountedData?patient_id=' + patientId)
      .then((response) => {
        this.model.PATIENT_NAME = response.data.patientData[0].name
        this.model.NRIC_PASSPORT = response.data.patientData[0].nricPassport
        if (response.data.patientData[0].birthdate !== null) {
          this.model.AGE = new Date().getFullYear() - response.data.patientData[0].birthdate.toString().substring(0, 4)
        }
        this.model.CONTACT_NO = response.data.patientData[0].contact
        this.model.ADDRESS = response.data.patientData[0].address
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
      var errors = this.$refs.referral.validate()
      if (errors) {
        this.tabA = false
        return true
      } else {
        this.tabA = true
        return false
      }
    },
    validateTabB () {
      var errors = this.$refs.staffDetails.validate()
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
