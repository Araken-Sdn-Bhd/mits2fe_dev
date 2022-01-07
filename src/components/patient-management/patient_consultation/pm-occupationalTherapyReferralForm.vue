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

            <div class="text-center"><h3 class="mt-4 mb-5 text-dark">OCCUPATIONAL THERAPY REFERRAL FORM</h3></div>

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

      listClinicalAssessment: [
        { name: 'Activites of Daily Living Assessment', value: 1 },
        { name: 'Behaviour Assessment', value: 2 },
        { name: 'Cognitive and Perceptual Assessment', value: 3 },
        { name: 'Child Development', value: 4 },
        { name: 'Psychological Assessment', value: 5 },
        { name: 'Seating and Wheelchair Assessment', value: 6 },
        { name: 'Domestic Assessment', value: 7 },
        { name: 'Driving Assessment', value: 8 },
        { name: 'Hand Function and Upper Limb Assessment', value: 9 },
        { name: 'Work/Home/School Assessment', value: 10 },
        { name: 'Sensory Motor Living Assessment', value: 11 },
        { name: 'Pre School/School Skill Assessment', value: 12 },
        { name: 'Play Leisure Assessment', value: 13 },
        { name: 'Work Assessment', value: 14 },
        { name: 'Others', value: 15 },
      ],
      listIntervention: [
        { name: 'Activity of Daily Living Training', value: 1 },
        { name: 'Aids Adaptation/Assistive Devices', value: 2 },
        { name: 'Behavioural Therapy', value: 3 },
        { name: 'Cognitive and Perceptual Training', value: 4 },
        { name: 'Compression Therapy', value: 5 },
        { name: 'Creative Therapy', value: 6 },
        { name: 'Social Skills Training', value: 7 },
        { name: 'Relaxation Therapy/Stress Management', value: 8 },
        { name: 'Low Vision Rehabilitation', value: 9 },
        { name: 'Domestic Rehabilitation', value: 10 },
        { name: 'Fine Motor/Hand Function Training', value: 11 },
        { name: 'Gross Motor/Functional Mobility', value: 12 },
        { name: 'Patient\'s and Carer\'s Education', value: 13 },
        { name: 'Play and Leisure (Exploration and Training)', value: 14 },
        { name: 'Sensory Integration Training', value: 15 },
        { name: 'Wheelchair Training', value: 16 },
        { name: 'Work Rehabilitation', value: 17 },
        { name: 'Splint', value: 18 },
        { name: 'Others', value: 19 },
      ],
      listPromotiveProgram: [
        { name: 'Special Needs Children Program', value: 1 },
        { name: 'Mental Health Program', value: 2 },
        { name: 'Senior Citizen Program', value: 3 },
        { name: 'Community Program', value: 4 },
        { name: 'Out Patient Program', value: 5 },
        { name: 'Teenagers and School Program', value: 6 },
        { name: 'Diabetes Program', value: 7 },
        { name: 'Hypertension Program', value: 8 },
        { name: 'Antenatal/Mother and Child Program', value: 9 },
        { name: 'Healthy Lifestyle Program', value: 10 },
      ],

      model: {

        MRN: '',
        PATIENT_NAME: '',
        NRIC_PASSPORT: '',
        AGE: '',
        CONTACT_NO: '',
        GENDER: '',
        DOB: '',

        REFERRAL_LOCATION: '',
        REFERRAL_DATE: '',
        DIAGNOSIS: '',
        CLINICAL_ASSESSMENT: '',
        INTERVENTION: '',
        SPECIFY_CLINICAL_ASSESSMENT: '',
        SPECIFY_INTERVENTION: '',
        PROMOTIVE_PROGRAM: '',

        REFERRER_NAME: '',
        DESIGNATION: '',

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
              {
                type: 'label',
                label: 'DOB: ',
                featured: true,
                styleClasses: 'col-lg-2',
              },
              {
                type: 'label',
                model: 'DOB',
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
                type: 'input',
                inputType: 'text',
                label: 'Referral Location',
                model: 'REFERRAL_LOCATION',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'date',
                label: 'Referral Date',
                model: 'REFERRAL_DATE',
                format: 'YYYY/MM/DD',
                required: true,
                validator: 'date',
                styleClasses: ['col-md-6'],
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Diagnosis',
                model: 'DIAGNOSIS',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-6',
              },
              {
                type: 'label',
                label: 'Referral Purpose',
              },
            ],
          },
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'checklist',
                label: 'Checklist Assessment',
                model: 'CLINICAL_ASSESSMENT',
                values: () => {
                  return this.listClinicalAssessment
                },
                listBox: true,
                required: true,
                validator: 'array',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'SPECIFY_CLINICAL_ASSESSMENT',
                placeholder: 'Specify Others',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-6',
                visible: function (model) {
                  return model && model.CLINICAL_ASSESSMENT.includes(15)
                },
              },
            ],
          },
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'checklist',
                label: 'Intervention',
                model: 'INTERVENTION',
                values: () => {
                  return this.listIntervention
                },
                listBox: true,
                required: true,
                validator: 'array',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'SPECIFY_INTERVENTION',
                placeholder: 'Specify Others',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-6',
                visible: function (model) {
                  return model && model.INTERVENTION.includes(19)
                },
              },
            ],
          },
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'checklist',
                label: 'Promotive Program',
                model: 'PROMOTIVE_PROGRAM',
                values: () => {
                  return this.listPromotiveProgram
                },
                listBox: true,
                required: true,
                validator: 'array',
                styleClasses: 'col-md-6',
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
                label: 'Referrer Name',
                model: 'REFERRER_NAME',
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
      .get('http://127.0.0.1:8000/api/getOccupationalTherapyReferralFormMountedData?patient_id=' + patientId)
      .then((response) => {
        this.model.MRN = response.data.patientData[0].mrn
        this.model.PATIENT_NAME = response.data.patientData[0].name
        this.model.NRIC_PASSPORT = response.data.patientData[0].nricPassport
        if (response.data.patientData[0].birthdate !== null) {
          this.model.AGE = new Date().getFullYear() - response.data.patientData[0].birthdate.toString().substring(0, 4)
          this.model.DOB = new Date(response.data.patientData[0].birthdate).toLocaleDateString('en-MY')
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

.vue-form-generator .field-checklist .listbox {
  height: auto;
  max-height: 600px;
  overflow: auto;
}

</style>
