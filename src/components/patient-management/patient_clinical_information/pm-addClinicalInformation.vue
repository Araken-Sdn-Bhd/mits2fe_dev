<template>
  <div class="content">
    <div class="container-fluid">

      <div class="row">
        <div class="col-12">

          <va-card class="clinical-card">
            <h4 class="mt-4 mb-5 text-dark">CLINICAL INFORMATION</h4>
            <vue-form-generator :model="model" :schema="temperatureSchema" :options="formOptions" ref="temperature">
            </vue-form-generator>
            <p>Blood Pressure (mm/Hg)<span style="color: red;"> *</span></p>
            <div class = 'row'>
              <div class = 'col-md'>
                <vue-form-generator :model="model" :schema="mmSchema" :options="formOptions" ref="mm">
                </vue-form-generator>
              </div>
              <div class = 'col-md-auto'>
                /
              </div>
              <div class = 'col-md'>
                <vue-form-generator :model="model" :schema="hgSchema" :options="formOptions" ref="hg">
                </vue-form-generator>
              </div>
            </div>
            <vue-form-generator :model="model" :schema="schema" :options="formOptions" ref="vital">
            </vue-form-generator>

            <!-- Button footer-->
            <div class="mt-3">
              <div class="float-left">
                <button @click="$router.push({ path: 'patient-profile' })" type="button" class="ml-2 btn btn-fill btn-md btn-secondary">
                  <div class="fa fa-undo" /> &nbsp; RETURN
                </button>
              </div>
            </div>

            <div class="mt-3">
              <div class="float-right">
                <button @click="validateVital" type="submit" class="ml-2 btn btn-fill btn-md btn-blue">
                  <div class="fa fa-paper-plane" /> &nbsp; SAVE
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
      submitPath: false,

      model: {
        TEMPERATURE: '',
        BP_MM: '',
        BP_HG: '',
        BLOOD_PRESSURE: '',
        PULSE_RATE: '',
        WEIGHT: '',
        HEIGHT: '',
        BMI: '',
        WAIST: '',
      },
      temperatureSchema: {
        fields: [
          {
            type: 'input',
            inputType: 'number',
            placeholder: 'Enter Temperature',
            label: 'Temperature (in &degC unit)',
            model: 'TEMPERATURE',
            validator: 'number',
            required: true,
          },
        ],
      },
      mmSchema: {
        fields: [
          {
            type: 'input',
            inputType: 'number',
            placeholder: 'mm',
            model: 'BP_MM',
            validator: 'number',
            required: true,
          },
        ],
      },
      hgSchema: {
        fields: [
          {
            type: 'input',
            inputType: 'number',
            placeholder: 'Hg',
            model: 'BP_HG',
            validator: 'number',
            required: true,
          },
        ],
      },
      schema: {
        fields: [
          {
            type: 'input',
            inputType: 'number',
            placeholder: 'Enter Pulse Rate',
            label: 'Pluse Rate (in bpm unit)',
            model: 'PULSE_RATE',
            validator: 'number',
            required: true,
          },
          {
            type: 'input',
            inputType: 'number',
            placeholder: 'Enter Weight',
            label: 'Weight (in kg unit)',
            model: 'WEIGHT',
            validator: 'number',
            required: true,
            onChanged: function (model) {
              model.BMI = ((model.WEIGHT / model.HEIGHT / model.HEIGHT) * 10000).toFixed(2)
            },
          },
          {
            type: 'input',
            inputType: 'number',
            placeholder: 'Enter Height',
            label: 'Height (in cm unit)',
            model: 'HEIGHT',
            validator: 'number',
            required: true,
            onChanged: function (model) {
              model.BMI = ((model.WEIGHT / model.HEIGHT / model.HEIGHT) * 10000).toFixed(2)
            },
          },
          {
            type: 'input',
            inputType: 'number',
            label: 'BMI (in kg/m&sup2 unit)',
            model: 'BMI',
            required: true,
          },
          {
            type: 'input',
            inputType: 'number',
            placeholder: 'Enter Waist Circumference',
            label: 'Waist Circumference (in cm unit)',
            model: 'WAIST',
            validator: 'number',
            required: true,
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
  },
  methods: {
    validateVital () {
      var err1 = this.$refs.temperature.validate()
      var err2 = this.$refs.mm.validate()
      var err3 = this.$refs.hg.validate()
      var err4 = this.$refs.vital.validate()

      if (err1 && err2 && err3 && err4) {
        this.model.BLOOD_PRESSURE = this.model.BP_MM + '/' + this.model.BP_HG

        var patientId = JSON.parse(localStorage.getItem('ID'))
        this.submitPath = true

        const data = new FormData()
        data.append('vitalData', JSON.stringify(this.model))
        this.$axios
          .post('http://127.0.0.1:8000/api/addVital?patientId=' + patientId, data)
          .then((response) => {
            this.$router.push({ path: 'patient-profile' })
          })
        this.launchToast('Vitals Added')
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

.clinical-card {
  padding: 20px;
  width: 60%;
}

@media screen and (max-width: 1000px) {
  .clinical-card {
    width: 100%;
  }
}

</style>
