<template>
  <div class="content">
    <div class="container-fluid">

      <div class="row">
        <div class="col-12">

          <!-- Notification Alert -->
          <div>
            <div class="mb-3" v-if="tabA==true">
              <va-notification color="danger">
                <va-badge color="danger">
                  {{ $t('Incomplete') }}
                </va-badge>
                <span>Please fill all <b> Risk Factors </b> required fields.</span>
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
                <span>Please fill all <b> Protective Factors </b> required fields.</span>
                <button type="button" class="btn close-button" @click="tabB = false">
                  <span class="fa fa-close"/>
                </button>
              </va-notification>
            </div>
            <div class="mb-3" v-if="tabC==true">
              <va-notification color="danger">
                <va-badge color="danger">
                  {{ $t('Incomplete') }}
                </va-badge>
                <span>Please fill all <b> The Self-Harm Act and Suicidal Intent </b> required fields.</span>
                <button type="button" class="btn close-button" @click="tabC = false">
                  <span class="fa fa-close"/>
                </button>
              </va-notification>
            </div>
            <div class="mb-3" v-if="tabD==true">
              <va-notification color="danger">
                <va-badge color="danger">
                  {{ $t('Incomplete') }}
                </va-badge>
                <span>Please fill all <b> Suicide Risk </b> required fields.</span>
                <button type="button" class="btn close-button" @click="tabD = false">
                  <span class="fa fa-close"/>
                </button>
              </va-notification>
            </div>
            <div class="mb-3" v-if="tabE==true">
              <va-notification color="danger">
                <va-badge color="danger">
                  {{ $t('Incomplete') }}
                </va-badge>
                <span>Please fill all <b> Hospital Management </b> required fields.</span>
                <button type="button" class="btn close-button" @click="tabE = false">
                  <span class="fa fa-close"/>
                </button>
              </va-notification>
            </div>
            <div class="mb-3" v-if="tabF==true">
              <va-notification color="danger">
                <va-badge color="danger">
                  {{ $t('Incomplete') }}
                </va-badge>
                <span>Please fill all <b> Source Data Producer </b> required fields.</span>
                <button type="button" class="btn close-button" @click="tabF = false">
                  <span class="fa fa-close"/>
                </button>
              </va-notification>
            </div>
          </div>

          <!-- Form -->
          <va-card>
            <br>
            <b-tabs content-class="mt-3" v-model="tabIndex" fill>

              <!-- RISK FACTORS -->
              <b-tab title="1. Risk Factors" class="py-3 pr-2" active>
                <br/>
                <vue-form-generator :model="model" :schema="tabASchema" :options="formOptions" ref="riskFactors" v-bind:class="{ readonly: view }">
                </vue-form-generator>
              </b-tab>

              <!-- PROTECTIVE FACTORS -->
              <b-tab title="2. Protective Factors">
                <br/>
                <vue-form-generator :model="model" :schema="tabBSchema" :options="formOptions" ref="protectiveFactors" v-bind:class="{ readonly: view }">
                </vue-form-generator>
              </b-tab>

              <!-- THE SELF-HARM ACT AND SUICIDAL INTENT -->
              <b-tab title="3. The Self-Harm Act and Suicidal Intent" class="py-3">
                <va-accordion >

                  <!-- Section A -->
                  <va-collapse id="secA">
                    <span slot="header" v-bind:class="{ red: tabCsecA }">
                      <div class="fa fa-exclamation-circle" v-if="tabCsecA"/> Section A:<br><b>CURRENT SELF-HARM ACT</b> (within past 2 weeks from time of presentation)
                    </span>
                    <div slot="body">
                      <vue-form-generator :model="model" :schema="tabCASchema" :options="formOptions" ref="selfHarmSectionA" v-bind:class="{ readonly: view }">
                      </vue-form-generator>
                    </div>
                  </va-collapse>

                  <!-- Section B -->
                  <va-collapse>
                    <span slot="header" v-bind:class="{ red: tabCsecB }">
                      <div class="fa fa-exclamation-circle" v-if="tabCsecB"/> Section B:<br><b>METHOD OF SELF-HARM</b> (please document the recent method only)
                    </span>
                    <div slot="body">
                      <h6 class="mt-3 mb-4 ml-3">Instruction: Please tick (/) in the box provided</h6>
                      <div class="row">
                        <div class="col-lg-auto">
                          <vue-form-generator :schema="tabCB1Schema" :model="model" :options="formOptions" ref="selfHarmSectionB1" v-bind:class="{ readonly: view }"></vue-form-generator>
                        </div>
                        <div class="col-lg">
                          <vue-form-generator :schema="tabCB2Schema" :model="model" :options="formOptions" ref="selfHarmSectionB2" v-bind:class="{ readonly: view }"></vue-form-generator>
                        </div>
                      </div>
                    </div>
                  </va-collapse>

                  <!-- Section C -->
                  <va-collapse>
                    <span slot="header" v-bind:class="{ red: tabCsecC }" >
                      <div class="fa fa-exclamation-circle" v-if="tabCsecC"/> Section C:<br><b>HOW DID PATIENT GET IDEA ABOUT METHOD</b>
                    </span>
                    <div slot="body">
                      <h6 class="mt-3 mb-4 ml-3">Instruction: Please tick (/) in the box provided</h6>
                      <vue-form-generator :schema="tabCCSchema" :model="model" :options="formOptions" ref="selfHarmSectionC" v-bind:class="{ readonly: view }"></vue-form-generator>
                    </div>
                  </va-collapse>

                  <!-- Section D -->
                  <va-collapse>
                    <span slot="header" v-bind:class="{ red: tabCsecD }" >
                      <div class="fa fa-exclamation-circle" v-if="tabCsecD"/> Section D:<br><b>SUICIDAL INTENT</b>
                    </span>
                    <div slot="body">
                      <div class="row mt-3">
                        <div class="col-lg-3 mt-2">
                          <vue-form-generator :schema="tabCD1Schema" :model="model" :options="formOptions" ref="selfHarmSectionD1" v-bind:class="{ readonly: view }"></vue-form-generator>
                        </div>
                        <div class="col-lg">
                          <vue-form-generator :schema="tabCD2Schema" :model="model" :options="formOptions" ref="selfHarmSectionD2" v-bind:class="{ readonly: view }"></vue-form-generator>
                        </div>
                      </div>
                    </div>
                  </va-collapse>

                  <!-- Section E -->
                  <va-collapse>
                    <span slot="header" v-bind:class="{ red: tabCsecE }" >
                      <div class="fa fa-exclamation-circle" v-if="tabCsecE"/> Section E:<br><b>LEVEL OF SUICIDAL INTENT</b> (Beck's Suicide Intent Scale)
                    </span>
                    <div slot="body">
                      <vue-form-generator :schema="tabCESchema" :model="model" :options="formOptions" ref="selfHarmSectionE1" v-bind:class="{ readonly: view }"></vue-form-generator>
                      <vue-form-generator :schema="totalScoreSchema" :model="model" :options="formOptions" ref="selfHarmSectionE2" class="mt-5" v-bind:class="{ readonly: view }"></vue-form-generator>
                    </div>
                  </va-collapse>
                </va-accordion>
              </b-tab>

              <!-- SUICIDE RISK -->
              <b-tab title="4. Suicide Risk" class="px-3 py-2 mb-3">
                <h6 class="mb-4">Instruction: Please tick (/) in the box provided</h6>
                <div class="row" >
                  <div class="col-md-3 p-3">
                    <b>Level of Suicide Risk for Current Attempt</b>
                  </div>
                  <div class="col-md mt-3 mr-2 box">
                    <vue-form-generator :schema="tabDSchema" :model="model" :options="formOptions" ref="suicideRisk" v-bind:class="{ readonly: view }"></vue-form-generator>
                  </div>
                </div>
              </b-tab>

              <!-- HOSPITAL MANAGEMENT -->
              <b-tab title="5. Hospital Management" class="p-3">
                <br/>
                <vue-form-generator :model="model" :schema="tabESchema" :options="formOptions" ref="hospitalManagement" v-bind:class="{ readonly: view }">
                </vue-form-generator>
              </b-tab>

              <!-- SOURCE DATA PRODUCER -->
              <b-tab title="6. Source Data Producer" class="p-3">
                <br/>
                <vue-form-generator :model="model" :schema="tabFSchema" :options="formOptions" ref="sourceDataProducer" v-bind:class="{ readonly: view }">
                </vue-form-generator>
              </b-tab>
            </b-tabs>

            <!-- Buttons -->
            <div class="my-3">
              <div class="float-left">
                <button v-if="!tabIndex==0" @click="tabIndex--" type="button" class="btn btn-primary btn-fill btn-md">
                  <div class="fa fa-angle-double-left" /> &nbsp; PREVIOUS
                </button>
              </div>
              <div class="float-right">
                <button v-if="tabIndex < 5" @click="tabIndex++" type="button" class="btn btn-info btn-fill btn-md">
                  NEXT <div class="fa fa-angle-double-right" />
                </button>

                <button v-if="tabIndex==5" @click="showPreviewModal" type="button" class="ml-2 btn btn-warning btn-fill btn-md">
                  <div class="fa fa-play-circle" /> &nbsp;PREVIEW
                </button>

                <button v-if="tabIndex==5 && view==false" @click="saveAsDraft" type="button" class="ml-2 btn btn-fill btn-md btn-yellow">
                  <div class="material-icons align-middle">system_update_alt</div> &nbsp; SAVE AS DRAFT
                </button>

                <button v-if="tabIndex==5 && view==false" @click="validateForm" type="submit" class="ml-2 btn btn-primary btn-fill btn-md">
                  <div class="fa fa-paper-plane" /> &nbsp;SUBMIT
                </button>
              </div>
            </div>
          </va-card>

          <!-- Modal -->
          <va-modal
            v-model="showLargeModal"
            size="large"
            :okText=" $t('Confirm') "
            :cancelText=" $t('Close') "
            :hide-default-actions= "true"
          >
            <div class="modal-preview">
              <!-- RISK FACTORS -->
              <h5 class="sh-tab-title">1. Risk Factors</h5>
              <vue-form-generator class="readonly" :model="model" :schema="tabAModalSchema"></vue-form-generator>

              <!-- PROTECTIVE FACTORS -->
              <h5 class="sh-tab-title">2. Protective Factors</h5>
              <vue-form-generator class="readonly" :model="model" :schema="tabBModalSchema"></vue-form-generator>

              <!-- THE SELF-HARM ACT AND SUICIDAL INTENT -->
              <h5 class="sh-tab-title">3. The Self-Harm Act and Suicidal Intent</h5>
              <h6 class="sh-sub-title">Section A : CURRENT SELF-HARM ACT (within past 2 weeks from time of presentation)</h6>
              <vue-form-generator class="readonly" :model="model" :schema="tabCASchema"></vue-form-generator>
              <h6 class="sh-sub-title">Section B: METHOD OF SELF-HARM (please document the recent method only)</h6>
              <h6 class="mt-3 mb-4 ml-3">Instruction: Please tick (/) in the box provided</h6>
              <div class="row">
                <div class="col-lg-auto">
                  <vue-form-generator class="readonly" :schema="tabCB1Schema" :model="model"></vue-form-generator>
                </div>
                <div class="col-lg">
                  <vue-form-generator class="readonly" :schema="tabCB2Schema" :model="model"></vue-form-generator>
                </div>
              </div>
              <h6 class="sh-sub-title">Section C: HOW DID PATIENT GET IDEA ABOUT METHOD</h6>
              <h6 class="mt-3 mb-4 ml-3">Instruction: Please tick (/) in the box provided</h6>
              <vue-form-generator class="readonly" :schema="tabCCSchema" :model="model"></vue-form-generator>
              <h6 class="sh-sub-title">Section D: SUICIDAL INTENT</h6>
              <div class="row mt-3">
                <div class="col-lg-3 mt-2">
                  <vue-form-generator class="readonly" :schema="tabCD1Schema" :model="model"></vue-form-generator>
                </div>
                <div class="col-lg">
                  <vue-form-generator class="readonly" :schema="tabCD2Schema" :model="model"></vue-form-generator>
                </div>
              </div>
              <h6 class="sh-sub-title">Section E: LEVEL OF SUICIDAL INTENT (Beck's Suicide Intent Scale)</h6>
              <vue-form-generator class="readonly" :schema="tabCEModalSchema" :model="model"></vue-form-generator>
              <vue-form-generator class="readonly mt-3" :schema="totalScoreSchema" :model="model"></vue-form-generator>

              <!-- SUICIDE RISK -->
              <h5 class="sh-tab-title">4. Suicide Risk</h5>
              <b class="p-3">Level of Suicide Risk for Current Attempt</b>
              <vue-form-generator class="readonly m-4 box" :model="model" :schema="tabDModalSchema"></vue-form-generator>

              <!-- HOSPITAL MANAGEMENT -->
              <h5 class="sh-tab-title">5. Hospital Management</h5>
              <vue-form-generator class="readonly" :model="model" :schema="tabEModalSchema"></vue-form-generator>

              <!-- SOURCE DATA PRODUCER -->
              <h5 class="sh-tab-title">6. Source Data Producer</h5>
              <vue-form-generator class="readonly" :model="model" :schema="tabFSchema"></vue-form-generator>
              <div style="float: right;">
                <button @click="showLargeModal = false" type="button" class="ml-2 btn btn-secondary btn-fill btn-md">
                  CLOSE
                </button>
              </div>
            </div>
          </va-modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg-core.css'
import Vue from 'vue'
import { BootstrapVue, IconsPlugin, TabsPlugin } from 'bootstrap-vue'
// import * as servicesModule1 from '../../../app/module1/services01'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-select/dist/vue-select.css'

import VueFormWizard from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
Vue.use(TabsPlugin)
Vue.use(VueFormWizard)

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(VueFormGenerator)
Vue.component('multiselect', Multiselect)

// cleave.js
require('cleave.js')
require('cleave.js/dist/addons/cleave-phone.my')

// register globally
export default {
  name: 'modals',
  components: {
  },
  data () {
    return {
      tabIndex: 1,

      tabA: false,
      tabB: false,
      tabC: false,
      tabCsecA: false,
      tabCsecB: false,
      tabCsecC: false,
      tabCsecD: false,
      tabCsecE: false,
      tabD: false,
      tabE: false,
      tabF: false,

      show: true,
      showLargeModal: false,

      submitPath: false,

      edit: false,
      view: false,

      // Risk Factors Data
      selectDiagnosis: [
        'one',
        'two',
        'three',
        'four',
        'five',
        'six',
      ],

      selectSubstance: [
        { name: 'Alcohol', value: 1 },
        { name: 'Opioids', value: 2 },
        { name: 'Cannabinoids', value: 3 },
        { name: 'Sedatives or hypnotics', value: 4 },
        { name: 'Cocaine', value: 5 },
        { name: 'Other stimulants (including amphetamine-type)', value: 6 },
        { name: 'Hallucinogens', value: 7 },
        { name: 'Volatile solvents', value: 8 },
      ],

      selectStressfulLifeEvents: [
        { name: 'Intimate relationship problems', value: 1 },
        { name: 'Other relationship problems', value: 2 },
        { name: 'Death of loved one', value: 3 },
        { name: 'Job-related problems', value: 4 },
        { name: 'Financial problems', value: 5 },
        { name: 'Academic-related problems', value: 6 },
        { name: 'Criminals/Legal problems', value: 7 },
      ],

      // Protective Factors Data

      // The Self-harm Act and Suicidal Intent Data
      selectOccurance: [],
      listMethod: [],
      listIdea: [],
      listIntent: [],
      selectOverdoseType: [],

      // Suicide Risk Data

      // Hospital Management Data
      selectReferral: [],
      selectArrivalMode: [],

      radioPhysicalConseq: [
        { name: 'No significant physical harm, no medical treatment required', value: 1 },
        { name: 'Medical attention/surgery required, but no danger to life', value: 2 },
        { name: 'Medical attention/surgery required, had/has danger to life', value: 3 },
        { name: 'Lethal', value: 4 },
        { name: 'Aborted (specify)', value: 99 },
      ],

      radioAdmission: [
        { name: 'No', value: 1 },
        { name: 'Yes', value: 2 },
      ],

      radioDischargeStatus: [
        { name: 'Dead', value: 1 },
        { name: 'Alive', value: 2 },
      ],

      listPSYMX: [],

      // Source Data Producer Data

      model: {
        // Risk Factors
        Q1: '',
        Q1_SPECIFY: '',
        Q2: '',
        Q3: '',
        Q3_SPECIFY: '',
        Q4: '',
        Q4_SPECIFY: '',
        Q5: '',
        Q6: '',
        Q6_SPECIFY: '',
        Q7: '',
        Q7_SPECIFY: '',
        Q8: '',
        Q8_SPECIFY: '',
        Q9: '',
        Q10: '',
        Q10_SPECIFY: '',
        Q11: '',
        Q12: '',

        // Protective Factors
        PQ1: '',
        PQ2: '',
        PQ3: '',
        PQ4: '',
        PQ5: '',
        PQ6: '',

        // The Self-harm Act and Suicidal Intent
        SH_DATE: '',
        SH_TIME: '',
        OCCUR: '',
        OCCUR_OTHER_SPECIFY: '',
        METHOD: [],
        OVERDOSE_TYPE: '',
        OVERDOSE_TYPE_SPECIFY: '',
        METHOD_OTHER_SPECIFY: '',
        IDEA: [],
        IDEA_SPECIFY: '',
        INTENT: 2,
        INTENT_YES: [],
        INTENT_OTHER_SPECIFY: '',
        SH1: '',
        SH2: '',
        SH3: '',
        SH4: '',
        SH5: '',
        SH6: '',
        SH7: '',
        SH8: '',
        SH9: '',
        SH10: '',
        SH11: '',
        SH12: '',
        SH13: '',
        SH14: '',
        SH15: '',
        INTENT_SCORE: '',
        INTENT_LEVEL: '',

        // Suicide Risk
        SR_LEVEL: '',

        // Hospital Management
        REFERRAL: '',
        REFERRAL_SPECIFY: '',
        ARRIVAL_MODE: '',
        ARRIVAL_SPECIFY: '',
        FIRST_ASSESSMENT_DATE: '',
        FIRST_ASSESSMENT_TIME: '',
        PHYSICAL_CONSEQ: '',
        PHYSICAL_CONSEQ_SPECIFY: '',
        ADMISSION: '',
        ADMISSION_SPECIFY: '',
        DISCHARGE_STATUS: '',
        DISCHARGE_DATE: '',
        NO_OF_DAYS: '',
        MAIN_DIAGNOSIS: '',
        EXTERNAL_DIAGNOSIS: '',
        PSYMX: [],
        PSYMX_SPECIFY: '',

        // Source Data Producer
        REG_OFF_NAME: '',
        DESIGNATION: '',
        REPORT_DATE: '',
        HOSPITAL_NAME: '',
        PSYCHIATRIST_NAME: '',
        VERIFICATION_DATE: '',

        // Modal Preview Risk Factors
        MD_Q1: '',
        MD_Q2: '',
        MD_Q3: '',
        MD_Q4: '',
        MD_Q5: '',
        MD_Q6: '',
        MD_Q7: '',
        MD_Q8: '',
        MD_Q9: '',
        MD_Q10: '',
        MD_Q11: '',
        MD_Q12: '',

        // Modal Preview Protective Factors
        MD_PQ1: '',
        MD_PQ2: '',
        MD_PQ3: '',
        MD_PQ4: '',
        MD_PQ5: '',
        MD_PQ6: '',

        // Modal Preview Self-Harm Section E
        MD_SH1: '',
        MD_SH2: '',
        MD_SH3: '',
        MD_SH4: '',
        MD_SH5: '',
        MD_SH6: '',
        MD_SH7: '',
        MD_SH8: '',
        MD_SH9: '',
        MD_SH10: '',
        MD_SH11: '',
        MD_SH12: '',
        MD_SH13: '',
        MD_SH14: '',
        MD_SH15: '',

        MD_SR_LEVEL: '',

        MD_PHYSICAL_CONSEQ: '',
        MD_ADMISSION: '',
        MD_DISCHARGE_STATUS: '',
      },

      // RISK FACTORS
      tabASchema: {
        groups: [
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'label',
                label: '1. Presence of psychiatric disorder',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'Q1',
                values: [
                  { name: 'No', value: 1 },
                  { name: 'Yes', value: 2 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto display-inline',
                onChanged: function (model) {
                  model.Q1_SPECIFY = ''
                },
              },
              {
                type: 'vueMultiSelect',
                placeholder: 'Select diagnosis (can select more than 1)',
                model: 'Q1_SPECIFY',
                required: true,
                validator: 'required',
                selectOptions: {
                  multiple: true,
                  closeOnSelect: false,
                  searchable: true,
                  showLabels: false,
                  clearOnSelect: true,
                  limit: 3,
                  maxHeight: 200,
                },
                styleClasses: 'col-md',
                values: () => {
                  return this.selectDiagnosis
                },
                visible: function (model) {
                  return model && model.Q1 === 2
                },
              },
            ],
          },
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'label',
                label: '2. Hopelessness or despair',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'Q2',
                values: [
                  { name: 'No', value: 1 },
                  { name: 'Yes', value: 2 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto display-inline',
              },
            ],
          },
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'label',
                label: '3. Previous suicide attempt',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'Q3',
                values: [
                  { name: 'No', value: 1 },
                  { name: 'Yes', value: 2 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto display-inline',
                onChanged: function (model) {
                  model.Q3_SPECIFY = ''
                },
              },

              {
                type: 'input',
                inputType: 'number',
                placeholder: 'Please specify (times)',
                model: 'Q3_SPECIFY',
                min: 0,
                required: true,
                validator: 'number',
                styleClasses: 'col-md',
                visible: function (model) {
                  return model && model.Q3 === 2
                },
              },
            ],
          },
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'label',
                label: '4. Presence of substance use/abuse',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'Q4',
                values: [
                  { name: 'No', value: 1 },
                  { name: 'Yes', value: 2 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto display-inline',
                onChanged: function (model) {
                  model.Q4_SPECIFY = ''
                },
              },
              {
                type: 'vueMultiSelect',
                placeholder: 'Please specify',
                model: 'Q4_SPECIFY',
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
                styleClasses: 'col-md mb-0',
                values: () => {
                  return this.selectSubstance
                },
                visible: function (model) {
                  return model && model.Q4 === 2
                },
              },
            ],
          },
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'label',
                label: '5. Family history of suicidal behaviour',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'Q5',
                values: [
                  { name: 'No', value: 1 },
                  { name: 'Yes', value: 2 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto display-inline',
              },
            ],
          },
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'label',
                label: '6. Family history of psychiatric disorder',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'Q6',
                values: [
                  { name: 'No', value: 1 },
                  { name: 'Yes', value: 2 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto display-inline',
                onChanged: function (model) {
                  model.Q6_SPECIFY = ''
                },
              },
              {
                type: 'vueMultiSelect',
                placeholder: 'Select diagnosis (can select more than 1)',
                model: 'Q6_SPECIFY',
                required: true,
                validator: 'required',
                selectOptions: {
                  multiple: true,
                  searchable: true,
                  showLabels: false,
                  clearOnSelect: true,
                  closeOnSelect: false,
                  limit: 3,
                  maxHeight: 200,
                },
                styleClasses: 'col-md',
                values: () => {
                  return this.selectDiagnosis
                },
                visible: function (model) {
                  return model && model.Q6 === 2
                },
              },
            ],
          },
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'label',
                label: '7. Family histroy of substance abuse',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'Q7',
                values: [
                  { name: 'No', value: 1 },
                  { name: 'Yes', value: 2 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto display-inline',
                onChanged: function (model) {
                  model.Q7_SPECIFY = ''
                },
              },
              {
                type: 'vueMultiSelect',
                placeholder: 'Please specify',
                model: 'Q7_SPECIFY',
                required: true,
                validator: 'required',
                selectOptions: {
                  multiple: false,
                  closeOnSelect: true,
                  maxHeight: 200,
                  showLabels: false,
                  label: 'name',
                  key: 'value',
                },
                styleClasses: 'col-md',
                values: () => {
                  return this.selectSubstance
                },
                visible: function (model) {
                  return model && model.Q7 === 2
                },
              },
            ],
          },
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'label',
                label: '8. Stressful life events',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'Q8',
                values: [
                  { name: 'No', value: 1 },
                  { name: 'Yes', value: 2 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto display-inline',
                onChanged: function (model) {
                  model.Q8_SPECIFY = ''
                },
              },
              {
                type: 'vueMultiSelect',
                placeholder: 'Please specify',
                model: 'Q8_SPECIFY',
                required: true,
                validator: 'required',
                selectOptions: {
                  multiple: false,
                  closeOnSelect: true,
                  maxHeight: 200,
                  showLabels: false,
                  label: 'name',
                  key: 'value',
                },
                styleClasses: 'col-md',
                values: () => {
                  return this.selectStressfulLifeEvents
                },
                visible: function (model) {
                  return model && model.Q8 === 2
                },
              },
            ],
          },
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'label',
                label: '9. Isolation, rejection, or feelings of shame',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'Q9',
                values: [
                  { name: 'No', value: 1 },
                  { name: 'Yes', value: 2 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto display-inline',
              },
            ],
          },
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'label',
                label: '10. Chronic physical illness or condition',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'Q10',
                values: [
                  { name: 'No', value: 1 },
                  { name: 'Yes', value: 2 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto display-inline',
                onChanged: function (model) {
                  model.Q10_SPECIFY = ''
                },
              },
              {
                type: 'vueMultiSelect',
                placeholder: 'Please specify (can choose more than 1)',
                model: 'Q10_SPECIFY',
                required: true,
                validator: 'required',
                selectOptions: {
                  multiple: true,
                  searchable: true,
                  showLabels: false,
                  closeOnSelect: false,
                  limit: 3,
                  maxHeight: 200,
                },
                styleClasses: 'col-md',
                values: () => {
                  return this.selectDiagnosis
                },
                visible: function (model) {
                  return model && model.Q10 === 2
                },
              },
            ],
          },
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'label',
                label: '11. History of physical, sexual or emotional abuse',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'Q11',
                values: [
                  { name: 'No', value: 1 },
                  { name: 'Yes', value: 2 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto display-inline',
              },
            ],
          },
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'label',
                label: '12. Access to lethal methods/weapons',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'Q12',
                values: [
                  { name: 'No', value: 1 },
                  { name: 'Yes', value: 2 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto display-inline',
              },
            ],
          },
        ],
      },
      // PROTECTIVE FACTORS
      tabBSchema: {
        groups: [
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'label',
                label: '1. Ability to cope with stress/tolerate frustrations',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'PQ1',
                values: [
                  { name: 'No', value: 1 },
                  { name: 'Yes', value: 2 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto display-inline',
              },
            ],
          },
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'label',
                label: '2. Strongly held religious/cultural beliefs',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'PQ2',
                values: [
                  { name: 'No', value: 1 },
                  { name: 'Yes', value: 2 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto display-inline',
              },
            ],
          },
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'label',
                label: '3. Realistic life goals or future plans',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'PQ3',
                values: [
                  { name: 'No', value: 1 },
                  { name: 'Yes', value: 2 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto display-inline',
              },
            ],
          },
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'label',
                label: '4. Responsibility to children/beloved pets',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'PQ4',
                values: [
                  { name: 'No', value: 1 },
                  { name: 'Yes', value: 2 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto display-inline',
              },
            ],
          },
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'label',
                label: '5. Social support',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'PQ5',
                values: [
                  { name: 'No', value: 1 },
                  { name: 'Yes', value: 2 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto display-inline',
              },
            ],
          },
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'label',
                label: '6. Positive therapeutic relationship',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'PQ6',
                values: [
                  { name: 'No', value: 1 },
                  { name: 'Yes', value: 2 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto display-inline',
              },
            ],
          },
        ],
      },
      // THE SELF-HARM ACT AND SUICIDAL INTENT
      // -Section A (1)
      tabCASchema: {
        fields: [
          {
            type: 'input',
            inputType: 'date',
            label: 'Date',
            model: 'SH_DATE',
            format: 'YYYY-MM-DD',
            styleClasses: 'col-sm-6',
            required: true,
            validator: 'required',
          },
          {
            type: 'input',
            inputType: 'time',
            label: 'Time',
            model: 'SH_TIME',
            styleClasses: 'col-sm-6',
            required: true,
            validator: 'required',
          },
          {
            type: 'vueMultiSelect',
            label: 'Place of Occurance',
            model: 'OCCUR',
            values: () => {
              return this.selectOccurance
            },
            selectOptions: {
              hideNoneSelectedText: true,
              multiple: false,
              closeOnSelect: true,
              maxHeight: 100,
              showLabels: false,
              key: 'value',
              label: 'name',
            },
            styleClasses: 'col-sm-6 pb-7',
            required: true,
            validator: 'required',
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Specify',
            model: 'OCCUR_OTHER_SPECIFY',
            placeholder: 'Other specified areas',
            styleClasses: 'col-sm-3',
            visible: function (model) {
              return model && model.OCCUR.value === 9
            },
            required: true,
            validator: 'string',
          },
        ],
      },
      // -Section B (2)
      tabCB1Schema: {
        fields: [
          {
            type: 'checklist',
            model: 'METHOD',
            values: () => {
              return this.listMethod
            },
            listBox: true,
            required: true,
            validator: 'array',
            styleClasses: 'col-md-auto',
          },
        ],
      },
      tabCB2Schema: {
        fields: [
          {
            type: 'vueMultiSelect',
            model: 'OVERDOSE_TYPE',
            placeholder: 'Please select',
            values: () => {
              return this.selectOverdoseType
            },
            selectOptions: {
              multiple: false,
              closeOnSelect: true,
              maxHeight: 100,
              showLabels: false,
              key: 'value',
              label: 'name',
            },
            visible: function (model) {
              return model && model.METHOD.includes(1)
            },
            required: true,
            validator: 'required',
            styleClasses: 'col-md-6',
          },
          {
            type: 'input',
            inputType: 'text',
            model: 'OVERDOSE_TYPE_SPECIFY',
            placeholder: 'Specify overdose/poisoning type',
            visible: function (model) {
              if (model.METHOD.includes(1)) {
                return model && (model.OVERDOSE_TYPE.value === 1 || model.OVERDOSE_TYPE.value === 2 || model.OVERDOSE_TYPE.value === 3)
              }
            },
            required: true,
            validator: 'string',
            styleClasses: 'col-md-6',
          },
          {
            type: 'input',
            inputType: 'text',
            model: 'METHOD_OTHER_SPECIFY',
            placeholder: 'Others, specify',
            visible: function (model) {
              return model && model.METHOD.includes(99)
            },
            required: true,
            validator: 'string',
            styleClasses: 'col-md-6',
          },
        ],
      },
      // -Section C (1)
      tabCCSchema: {
        fields: [
          {
            type: 'checklist',
            model: 'IDEA',
            values: () => {
              return this.listIdea
            },
            listBox: true,
            required: true,
            validator: 'array',
            styleClasses: 'col-sm-auto',
          },
          {
            type: 'input',
            inputType: 'text',
            model: 'IDEA_SPECIFY',
            placeholder: 'Specify patient actual words',
            styleClasses: 'col-sm-4',
            visible: function (model) {
              return model && model.IDEA.includes(99)
            },
            required: true,
            validator: 'string',
          },
        ],
      },
      // -Section D (2)
      tabCD1Schema: {
        fields: [
          {
            type: 'radios',
            label: 'Was there an intent?',
            model: 'INTENT',
            values: [
              { value: 1, name: 'No' },
              { value: 2, name: 'Yes' },
              { value: 3, name: 'Undetermined' },
            ],
            required: true,
            validator: 'required',
            styleClasses: 'col-xl-auto',
          },
        ],
      },
      tabCD2Schema: {
        fields: [
          {
            type: 'label',
            label: '<h6 class="mt-3 mb-4">Instruction: Please tick (/) in the box<br>If yes, mode of expression (can tick more than 1)</h6>',
            visible: function (model) {
              return model && model.INTENT === 2
            },
          },
          {
            type: 'checklist',
            model: 'INTENT_YES',
            values: () => {
              return this.listIntent
            },
            listBox: true,
            visible: function (model) {
              return model && model.INTENT === 2
            },
            required: true,
            validator: 'array',
            styleClasses: 'col-sm-auto',
          },
          {
            type: 'input',
            inputType: 'text',
            model: 'INTENT_OTHER_SPECIFY',
            placeholder: 'Please specify',
            visible: function (model) {
              if (model.INTENT === 2) {
                return model && model.INTENT_YES.includes(99)
              }
            },
            required: true,
            validator: 'string',
            styleClasses: 'col-sm-4',
          },
        ],
      },
      // -Section E (2)
      tabCESchema: {
        fields: [
          {
            type: 'radios',
            label: '<b>1. Isolation</b>',
            model: 'SH1',
            values: [
              { value: 0, name: 'Somebody present' },
              { value: 1, name: 'Somebody nearby, or in visual or vocal contact' },
              { value: 2, name: 'No one nearby or in visual or vocal contact' },
            ],
            onChanged: function (model) {
              model.INTENT_SCORE = ''
              model.INTENT_LEVEL = ''
            },
            required: true,
            validator: 'required',
            styleClasses: ['my-3', 'col-xl-6'],
          },
          {
            type: 'radios',
            label: '<b>2. Timing</b>',
            model: 'SH2',
            values: [
              { value: 0, name: 'Intervention is probable' },
              { value: 1, name: 'Intervention is not likely' },
              { value: 2, name: 'Intervention is highly unlikely' },
            ],
            onChanged: function (model) {
              model.INTENT_SCORE = ''
              model.INTENT_LEVEL = ''
            },
            required: true,
            validator: 'required',
            styleClasses: ['my-3', 'col-xl-6'],
          },
          {
            type: 'radios',
            label: '<b>3. Precautions against discovery / intervention</b>',
            model: 'SH3',
            values: [
              { value: 0, name: 'No precautions' },
              { value: 1, name: 'Passive precautions (eg; alone in room with unlocked door)' },
              { value: 2, name: 'Active precautions (as locked door)' },
            ],
            onChanged: function (model) {
              model.INTENT_SCORE = ''
              model.INTENT_LEVEL = ''
            },
            required: true,
            validator: 'required',
            styleClasses: ['my-3', 'col-xl-6'],
          },
          {
            type: 'radios',
            label: '<b>4. Acting to get help during / after attempt</b>',
            model: 'SH4',
            values: [
              { value: 0, name: 'Notified potential helper regarding attempt' },
              { value: 1, name: 'Contacted but did not specifically notify regarding attempt' },
              { value: 2, name: 'Did not contact or notify potential helper' },
            ],
            onChanged: function (model) {
              model.INTENT_SCORE = ''
              model.INTENT_LEVEL = ''
            },
            required: true,
            validator: 'required',
            styleClasses: ['my-3', 'col-xl-6'],
          },
          {
            type: 'radios',
            label: '<b>5. Final acts in anticipating of death (will, gifts, insurance)</b>',
            model: 'SH5',
            values: [
              { value: 0, name: 'None' },
              { value: 1, name: 'Thought about or made some arrangements' },
              { value: 2, name: 'Made definite plans or completed arrangements' },
            ],
            onChanged: function (model) {
              model.INTENT_SCORE = ''
              model.INTENT_LEVEL = ''
            },
            required: true,
            validator: 'required',
            styleClasses: ['my-3', 'col-xl-6'],
          },
          {
            type: 'radios',
            label: '<b>6. Active preparation for attempt</b>',
            model: 'SH6',
            values: [
              { value: 0, name: 'None' },
              { value: 1, name: 'Minimal to moderate' },
              { value: 2, name: 'Extensive' },
            ],
            onChanged: function (model) {
              model.INTENT_SCORE = ''
              model.INTENT_LEVEL = ''
            },
            required: true,
            validator: 'required',
            styleClasses: ['my-3', 'col-xl-6'],
          },
          {
            type: 'radios',
            label: '<b>7. Suicide note</b>',
            model: 'SH7',
            values: [
              { value: 0, name: 'Absence of note' },
              { value: 1, name: 'Note written, but torn up; note thought about' },
              { value: 2, name: 'Presence of note' },
            ],
            onChanged: function (model) {
              model.INTENT_SCORE = ''
              model.INTENT_LEVEL = ''
            },
            required: true,
            validator: 'required',
            styleClasses: ['my-3', 'col-xl-6'],
          },
          {
            type: 'radios',
            label: '<b>8. Overt communication of intent before the attempt</b>',
            model: 'SH8',
            values: [
              { value: 0, name: 'None' },
              { value: 1, name: 'Equivocal communication' },
              { value: 2, name: 'Unequivocal communication' },
            ],
            onChanged: function (model) {
              model.INTENT_SCORE = ''
              model.INTENT_LEVEL = ''
            },
            required: true,
            validator: 'required',
            styleClasses: ['my-3', 'col-xl-6'],
          },
          {
            type: 'radios',
            label: '<b>9. Allged purpose of attempt</b>',
            model: 'SH9',
            values: [
              { value: 0, name: 'To manipulate environment, get attention, get revenge' },
              { value: 1, name: 'Components of above and below' },
              { value: 2, name: 'To escape, surcease, solve problems' },
            ],
            onChanged: function (model) {
              model.INTENT_SCORE = ''
              model.INTENT_LEVEL = ''
            },
            required: true,
            validator: 'required',
            styleClasses: ['my-3', 'col-xl-6'],
          },
          {
            type: 'radios',
            label: '<b>10. Expectations of fatality</b>',
            model: 'SH10',
            values: [
              { value: 0, name: 'Thought that death was unlikely' },
              { value: 1, name: 'Thought that death was possible but not probable' },
              { value: 2, name: 'Thought that death was probable or certain' },
            ],
            onChanged: function (model) {
              model.INTENT_SCORE = ''
              model.INTENT_LEVEL = ''
            },
            required: true,
            validator: 'required',
            styleClasses: ['my-3', 'col-xl-6'],
          },
          {
            type: 'radios',
            label: "<b>11. Conception of method's lethality</b>",
            model: 'SH11',
            values: [
              { value: 0, name: 'Did less to self that s/he thought would be lethal' },
              { value: 1, name: "Wasn't sure if what s/he did would be lethal" },
              { value: 2, name: 'Equaled or exceed what s/he thought would be lethal' },
            ],
            onChanged: function (model) {
              model.INTENT_SCORE = ''
              model.INTENT_LEVEL = ''
            },
            required: true,
            validator: 'required',
            styleClasses: ['my-3', 'col-xl-6'],
          },
          {
            type: 'radios',
            label: '<b>12. Seriousness of attempt</b>',
            model: 'SH12',
            values: [
              { value: 0, name: 'Did not seriously attempt to end life' },
              { value: 1, name: 'Uncertain about seriousness to end life' },
              { value: 2, name: 'Seriously attempted to end life' },
            ],
            onChanged: function (model) {
              model.INTENT_SCORE = ''
              model.INTENT_LEVEL = ''
            },
            required: true,
            validator: 'required',
            styleClasses: ['my-3', 'col-xl-6'],
          },
          {
            type: 'radios',
            label: '<b>13. Attitude towards living/dying</b>',
            model: 'SH13',
            values: [
              { value: 0, name: 'Did not want to die' },
              { value: 1, name: 'Components of above and below' },
              { value: 2, name: 'Wanted to die' },
            ],
            onChanged: function (model) {
              model.INTENT_SCORE = ''
              model.INTENT_LEVEL = ''
            },
            required: true,
            validator: 'required',
            styleClasses: ['my-3', 'col-xl-6'],
          },
          {
            type: 'radios',
            label: '<b>14. Conception of medical rescuability</b>',
            model: 'SH14',
            values: [
              { value: 0, name: 'Thought death would be unlikely if received medical attention' },
              { value: 1, name: 'Was uncertain if death could be averted by medical attention' },
              { value: 2, name: 'Was certain of death even if received medical attention' },
            ],
            onChanged: function (model) {
              model.INTENT_SCORE = ''
              model.INTENT_LEVEL = ''
            },
            required: true,
            validator: 'required',
            styleClasses: ['my-3', 'col-xl-6'],
          },
          {
            type: 'radios',
            label: '<b>15. Degree of premeditation</b>',
            model: 'SH15',
            values: [
              { value: 0, name: 'None; impulsive' },
              { value: 1, name: 'Suicide contemplated for 3 hours or less prior to attempt' },
              { value: 2, name: 'Suicide contemplated for more than 3 hours prior to attempt' },
            ],
            onChanged: function (model) {
              model.INTENT_SCORE = ''
              model.INTENT_LEVEL = ''
            },
            required: true,
            validator: 'required',
            styleClasses: ['my-3', 'col-xl-12'],
          },
        ],
      },
      totalScoreSchema: {
        fields: [
          {
            type: 'input',
            inputType: 'number',
            label: 'Total Score',
            placeholder: 'Click Calculate',
            model: 'INTENT_SCORE',
            required: true,
            validator: 'number',
            styleClasses: 'col-md-3 readonly',
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Level of Suicidal Intent',
            placeholder: 'Click Calculate',
            model: 'INTENT_LEVEL',
            required: true,
            validator: 'string',
            styleClasses: 'col-md-3 readonly',
          },
          {
            type: 'submit',
            buttonText: 'Calculate',
            onSubmit: (model) => {
              var errors = this.validateTabCE1()
              if (errors) {
                var score = model.SH1 + model.SH2 + model.SH3 + model.SH4 + model.SH5 + model.SH6 + model.SH7 + model.SH8 + model.SH9 + model.SH10 + model.SH11 + model.SH12 + model.SH13 + model.SH14 + model.SH15

                model.INTENT_SCORE = score

                if (score <= 10) {
                  model.INTENT_LEVEL = 'Low Intent'
                } else if (score > 10 && score <= 20) {
                  model.INTENT_LEVEL = 'Medium Intent'
                } else {
                  model.INTENT_LEVEL = 'High Intent'
                }
              }
            },
            styleClasses: 'col-md-auto margin-top',
          },
        ],

      },

      // SUICIDE RISK
      tabDSchema: {
        groups: [
          {
            fields: [
              {
                type: 'radios',
                values: [
                  { value: 1, name: 'High' },
                ],
                model: 'SR_LEVEL',
                required: true,
                styleClasses: 'col-3',
              },
              {
                type: 'label',
                label: 'Psychiatric diagnoses with severe symptoms or acute precipitating events; protective factors not relevant; high suicidal intent',
                styleClasses: 'col-9',
              },
            ],
          },
          {
            fields: [
              {
                type: 'radios',
                values: [
                  { value: 2, name: 'Moderate' },
                ],
                model: 'SR_LEVEL',
                required: true,
                styleClasses: 'col-3',
              },
              {
                type: 'label',
                label: 'Multiple risk factors, few protective factors, moderate suicidal intent',
                styleClasses: 'col-9',
              },
            ],
          },
          {
            fields: [
              {
                type: 'radios',
                values: [
                  { value: 3, name: 'Low' },
                ],
                model: 'SR_LEVEL',
                required: true,
                validator: 'required',
                styleClasses: 'col-3',
              },
              {
                type: 'label',
                label: 'Modifiable risk factors, strong protective factors, no or low suicidal intent',
                styleClasses: 'col-9',
              },
            ],
          },
        ],
      },
      // HOSPITAL MANAGEMENT
      tabESchema: {
        groups: [
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'vueMultiSelect',
                placeholder: 'Please select',
                label: 'Referral or Contact point',
                model: 'REFERRAL',
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
                styleClasses: ['col-md-6'],
                values: () => {
                  return this.selectReferral
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: '',
                placeholder: 'Please specify',
                model: 'REFERRAL_SPECIFY',
                validator: 'string',
                required: true,
                styleClasses: ['col-md-6'],
                visible: function (model) {
                  return model && model.REFERRAL.value === 5
                },
              },
            ],
          },
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'vueMultiSelect',
                placeholder: 'Please select',
                label: 'Mode of Arrival',
                model: 'ARRIVAL_MODE',
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
                styleClasses: ['col-md-6'],
                values: () => {
                  return this.selectArrivalMode
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: '',
                placeholder: 'Please specify',
                model: 'ARRIVAL_SPECIFY',
                validator: 'string',
                required: true,
                styleClasses: ['col-md-6'],
                visible: function (model) {
                  return model && model.ARRIVAL_MODE.value === 7
                },
              },
            ],
          },
          {
            styleClasses: ['row', 'align-items-center'],
            fields: [
              {
                type: 'label',
                label: 'First psychiatry assessment after current attempt',
                styleClasses: ['col-md-2'],
              },
              {
                type: 'input',
                inputType: 'date',
                label: 'Date',
                model: 'FIRST_ASSESSMENT_DATE',
                required: true,
                validator: 'date',
                format: 'YYYY/MM/DD',
                styleClasses: ['col-md-5'],
              },
              {
                type: 'input',
                inputType: 'time',
                label: 'Time',
                model: 'FIRST_ASSESSMENT_TIME',
                required: true,
                validator: 'required',
                styleClasses: ['col-md-5'],
              },
            ],
          },
          {
            styleClasses: ['row', 'align-items-end'],
            fields: [
              {
                type: 'radios',
                label: 'Physical consequences of current attempt',
                model: 'PHYSICAL_CONSEQ',
                required: true,
                validator: 'required',
                styleClasses: ['col-md-6'],
                values: () => {
                  return this.radioPhysicalConseq
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: '',
                placeholder: 'Please specify',
                model: 'PHYSICAL_CONSEQ_SPECIFY',
                validator: 'string',
                required: true,
                styleClasses: ['col-md-6'],
                visible: function (model) {
                  return model && model.PHYSICAL_CONSEQ === 99
                },
              },
            ],
          },
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'radios',
                label: 'Is patient admitted for current attempt?',
                model: 'ADMISSION',
                required: true,
                validator: 'required',
                styleClasses: ['col-md-6', 'display-inline'],
                values: () => {
                  return this.radioAdmission
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: '',
                placeholder: 'Please specify the first admitting ward',
                model: 'ADMISSION_SPECIFY',
                validator: 'string',
                required: true,
                styleClasses: ['col-md-6'],
                visible: function (model) {
                  return model && model.ADMISSION === 2
                },
              },
            ],
          },
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'radios',
                label: 'Status on discharge',
                model: 'DISCHARGE_STATUS',
                required: true,
                validator: 'required',
                styleClasses: ['col-md-6', 'display-inline'],
                values: () => {
                  return this.radioDischargeStatus
                },
              },
            ],
          },
          {
            styleClasses: ['row', 'align-items-center'],
            fields: [
              {
                type: 'label',
                label: 'Discharge details',
                styleClasses: ['col-md-2'],
              },
              {
                type: 'input',
                inputType: 'date',
                label: 'Date',
                model: 'DISCHARGE_DATE',
                required: true,
                validator: 'date',
                format: 'YYYY/MM/DD',
                styleClasses: ['col-md-5'],
              },
              {
                type: 'input',
                inputType: 'number',
                label: 'Number of days in ward',
                model: 'NO_OF_DAYS',
                min: 0,
                required: true,
                validator: 'number',
                styleClasses: ['col-md-5'],
              },
            ],
          },
          {
            styleClasses: ['row', 'align-items-center'],
            fields: [
              {
                type: 'label',
                label: 'Discharge Diagnosis (ICD)',
                styleClasses: ['col-md-2'],
              },
              {
                type: 'vueMultiSelect',
                placeholder: 'Please select',
                label: 'Main diagnosis',
                model: 'MAIN_DIAGNOSIS',
                required: true,
                validator: 'required',
                selectOptions: {
                  multiple: false,
                  closeOnSelect: true,
                  maxHeight: 200,
                  showLabels: false,
                  allowEmpty: false,
                },
                styleClasses: 'col-md-4',
                values: () => {
                  return this.selectDiagnosis
                },
              },
              {
                type: 'vueMultiSelect',
                placeholder: 'Please select',
                label: 'External causes',
                model: 'EXTERNAL_DIAGNOSIS',
                required: true,
                validator: 'required',
                selectOptions: {
                  multiple: false,
                  closeOnSelect: true,
                  maxHeight: 200,
                  showLabels: false,
                  allowEmpty: false,
                },
                styleClasses: 'col-md-4',
                values: () => {
                  return this.selectDiagnosis
                },
              },

            ],
          },
          {
            styleClasses: ['row', 'align-items-end'],
            fields: [
              {
                type: 'checklist',
                label: 'PSY Mx on Discharge',
                model: 'PSYMX',
                listBox: true,
                required: true,
                validator: 'array',
                styleClasses: ['col-md-6'],
                values: () => {
                  return this.listPSYMX
                },
              },
              {
                type: 'input',
                inputType: 'text',
                placeholder: 'Please specify',
                model: 'PSYMX_SPECIFY',
                label: '',
                validator: 'string',
                required: true,
                styleClasses: ['col-md-6'],
                visible: function (model) {
                  return model && model.PSYMX.includes(6)
                },
              },
              // {
              //   type: 'vueMultiSelect',
              //   placeholder: 'Please select (can select more than 1)',
              //   label: 'PSY Mx on Discharge',
              //   model: 'PSYMX',
              //   required: true,
              //   validator: 'required',
              //   selectOptions: {
              //     multiple: true,
              //     closeOnSelect: false,
              //     searchable: true,
              //     showLabels: false,
              //     clearOnSelect: true,
              //     maxHeight: 200,
              //     key: 'value',
              //     label: 'name',
              //   },
              //   styleClasses: ['col-md-6'],
              //   values: () => {
              //     return this.selectPSYMX
              //   },
              // },
              // {
              //   type: 'input',
              //   inputType: 'text',
              //   placeholder: 'Please specify',
              //   model: 'PSYMX_SPECIFY',
              //   label: '',
              //   validator: 'string',
              //   required: true,
              //   styleClasses: ['col-md-6'],
              //   visible: function (model) {
              //     if (model.PSYMX.some(e => e.value === 6)) {
              //       return true
              //     }
              //   },
              // },
            ],
          },
        ],
      },

      // SOURCE DATA PRODUCER
      tabFSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'input',
                inputType: 'text',
                label: 'Name of Registering Officer',
                model: 'REG_OFF_NAME',
                validator: 'string',
                required: true,
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Name of Hospital',
                model: 'HOSPITAL_NAME',
                validator: 'string',
                required: true,
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
                validator: 'string',
                required: true,
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Name of Psychiatrist',
                model: 'PSYCHIATRIST_NAME',
                validator: 'string',
                required: true,
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
                label: 'Date of Reporting',
                model: 'REPORT_DATE',
                min: '1990-01-01',
                required: true,
                validator: 'date',
                format: 'YYYY/MM/DD',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'date',
                label: 'Date of Verification',
                model: 'VERIFICATION_DATE',
                min: '1990-01-01',
                required: true,
                validator: 'date',
                format: 'YYYY/MM/DD',
                styleClasses: 'col-md-6',
              },
            ],
          },
        ],
      },

      // -----Modal Preview------
      tabAModalSchema: {
        groups: [
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'label',
                label: '1. Presence of psychiatric disorder',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'MD_Q1',
                values: [
                  { name: 'No', value: 1 },
                  { name: 'Yes', value: 2 },
                ],
                styleClasses: 'col-md-auto display-inline',
                onChanged: function (model) {
                  model.Q1_SPECIFY = ''
                },
              },
              {
                type: 'vueMultiSelect',
                placeholder: 'Select diagnosis (can select more than 1)',
                model: 'Q1_SPECIFY',
                selectOptions: {
                  multiple: true,
                  closeOnSelect: false,
                  searchable: true,
                  showLabels: false,
                  clearOnSelect: true,
                  limit: 3,
                  maxHeight: 200,
                },
                styleClasses: 'col-md',
                values: () => {
                  return this.selectDiagnosis
                },
                visible: function (model) {
                  return model && model.Q1 === 2
                },
              },
            ],
          },
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'label',
                label: '2. Hopelessness or despair',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'MD_Q2',
                values: [
                  { name: 'No', value: 1 },
                  { name: 'Yes', value: 2 },
                ],
                styleClasses: 'col-md-auto display-inline',
              },
            ],
          },
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'label',
                label: '3. Previous suicide attempt',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'MD_Q3',
                values: [
                  { name: 'No', value: 1 },
                  { name: 'Yes', value: 2 },
                ],
                styleClasses: 'col-md-auto display-inline',
                onChanged: function (model) {
                  model.Q3_SPECIFY = ''
                },
              },

              {
                type: 'input',
                inputType: 'number',
                placeholder: 'Please specify (times)',
                model: 'Q3_SPECIFY',
                min: 0,
                styleClasses: 'col-md',
                visible: function (model) {
                  return model && model.Q3 === 2
                },
              },
            ],
          },
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'label',
                label: '4. Presence of substance use/abuse',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'MD_Q4',
                values: [
                  { name: 'No', value: 1 },
                  { name: 'Yes', value: 2 },
                ],
                styleClasses: 'col-md-auto display-inline',
                onChanged: function (model) {
                  model.Q4_SPECIFY = ''
                },
              },
              {
                type: 'vueMultiSelect',
                placeholder: 'Please specify',
                model: 'Q4_SPECIFY',
                selectOptions: {
                  multiple: false,
                  closeOnSelect: true,
                  maxHeight: 200,
                  showLabels: false,
                  key: 'value',
                  label: 'name',
                },
                styleClasses: 'col-md mb-0',
                values: () => {
                  return this.selectSubstance
                },
                visible: function (model) {
                  return model && model.Q4 === 2
                },
              },
            ],
          },
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'label',
                label: '5. Family history of suicidal behaviour',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'MD_Q5',
                values: [
                  { name: 'No', value: 1 },
                  { name: 'Yes', value: 2 },
                ],
                styleClasses: 'col-md-auto display-inline',
              },
            ],
          },
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'label',
                label: '6. Family history of psychiatric disorder',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'MD_Q6',
                values: [
                  { name: 'No', value: 1 },
                  { name: 'Yes', value: 2 },
                ],
                styleClasses: 'col-md-auto display-inline',
                onChanged: function (model) {
                  model.Q6_SPECIFY = ''
                },
              },
              {
                type: 'vueMultiSelect',
                placeholder: 'Select diagnosis (can select more than 1)',
                model: 'Q6_SPECIFY',
                selectOptions: {
                  multiple: true,
                  searchable: true,
                  showLabels: false,
                  clearOnSelect: true,
                  closeOnSelect: false,
                  limit: 3,
                  maxHeight: 200,
                },
                styleClasses: 'col-md',
                values: () => {
                  return this.selectDiagnosis
                },
                visible: function (model) {
                  return model && model.Q6 === 2
                },
              },
            ],
          },
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'label',
                label: '7. Family histroy of substance abuse',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'MD_Q7',
                values: [
                  { name: 'No', value: 1 },
                  { name: 'Yes', value: 2 },
                ],
                styleClasses: 'col-md-auto display-inline',
                onChanged: function (model) {
                  model.Q7_SPECIFY = ''
                },
              },
              {
                type: 'vueMultiSelect',
                placeholder: 'Please specify',
                model: 'Q7_SPECIFY',
                selectOptions: {
                  multiple: false,
                  closeOnSelect: true,
                  maxHeight: 200,
                  showLabels: false,
                  label: 'name',
                  key: 'value',
                },
                styleClasses: 'col-md',
                values: () => {
                  return this.selectSubstance
                },
                visible: function (model) {
                  return model && model.Q7 === 2
                },
              },
            ],
          },
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'label',
                label: '8. Stressful life events',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'MD_Q8',
                values: [
                  { name: 'No', value: 1 },
                  { name: 'Yes', value: 2 },
                ],
                styleClasses: 'col-md-auto display-inline',
                onChanged: function (model) {
                  model.Q8_SPECIFY = ''
                },
              },
              {
                type: 'vueMultiSelect',
                placeholder: 'Please specify',
                model: 'Q8_SPECIFY',
                selectOptions: {
                  multiple: false,
                  closeOnSelect: true,
                  maxHeight: 200,
                  showLabels: false,
                  label: 'name',
                  key: 'value',
                },
                styleClasses: 'col-md',
                values: () => {
                  return this.selectStressfulLifeEvents
                },
                visible: function (model) {
                  return model && model.Q8 === 2
                },
              },
            ],
          },
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'label',
                label: '9. Isolation, rejection, or feelings of shame',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'MD_Q9',
                values: [
                  { name: 'No', value: 1 },
                  { name: 'Yes', value: 2 },
                ],
                styleClasses: 'col-md-auto display-inline',
              },
            ],
          },
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'label',
                label: '10. Chronic physical illness or condition',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'MD_Q10',
                values: [
                  { name: 'No', value: 1 },
                  { name: 'Yes', value: 2 },
                ],
                styleClasses: 'col-md-auto display-inline',
                onChanged: function (model) {
                  model.Q10_SPECIFY = ''
                },
              },
              {
                type: 'vueMultiSelect',
                placeholder: 'Please specify (can choose more than 1)',
                model: 'Q10_SPECIFY',
                selectOptions: {
                  multiple: true,
                  searchable: true,
                  showLabels: false,
                  closeOnSelect: false,
                  limit: 3,
                  maxHeight: 200,
                },
                styleClasses: 'col-md',
                visible: function (model) {
                  return model && model.Q10 === 2
                },
              },
            ],
          },
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'label',
                label: '11. History of physical, sexual or emotional abuse',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'MD_Q11',
                values: [
                  { name: 'No', value: 1 },
                  { name: 'Yes', value: 2 },
                ],
                styleClasses: 'col-md-auto display-inline',
              },
            ],
          },
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'label',
                label: '12. Access to lethal methods/weapons',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'MD_Q12',
                values: [
                  { name: 'No', value: 1 },
                  { name: 'Yes', value: 2 },
                ],
                styleClasses: 'col-md-auto display-inline',
              },
            ],
          },
        ],
      },
      tabBModalSchema: {
        groups: [
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'label',
                label: '1. Ability to cope with stress/tolerate frustrations',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'MD_PQ1',
                values: [
                  { name: 'No', value: 1 },
                  { name: 'Yes', value: 2 },
                ],
                styleClasses: 'col-md-auto display-inline',
              },
            ],
          },
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'label',
                label: '2. Strongly held religious/cultural beliefs',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'MD_PQ2',
                values: [
                  { name: 'No', value: 1 },
                  { name: 'Yes', value: 2 },
                ],
                styleClasses: 'col-md-auto display-inline',
              },
            ],
          },
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'label',
                label: '3. Realistic life goals or future plans',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'MD_PQ3',
                values: [
                  { name: 'No', value: 1 },
                  { name: 'Yes', value: 2 },
                ],
                styleClasses: 'col-md-auto display-inline',
              },
            ],
          },
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'label',
                label: '4. Responsibility to children/beloved pets',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'MD_PQ4',
                values: [
                  { name: 'No', value: 1 },
                  { name: 'Yes', value: 2 },
                ],
                styleClasses: 'col-md-auto display-inline',
              },
            ],
          },
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'label',
                label: '5. Social support',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'MD_PQ5',
                values: [
                  { name: 'No', value: 1 },
                  { name: 'Yes', value: 2 },
                ],
                styleClasses: 'col-md-auto display-inline',
              },
            ],
          },
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'label',
                label: '6. Positive therapeutic relationship',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'MD_PQ6',
                values: [
                  { name: 'No', value: 1 },
                  { name: 'Yes', value: 2 },
                ],
                styleClasses: 'col-md-auto display-inline',
              },
            ],
          },
        ],
      },
      tabCEModalSchema: {
        fields: [
          {
            type: 'radios',
            label: '<b>1. Isolation</b>',
            model: 'MD_SH1',
            values: [
              { value: 0, name: 'Somebody present' },
              { value: 1, name: 'Somebody nearby, or in visual or vocal contact' },
              { value: 2, name: 'No one nearby or in visual or vocal contact' },
            ],
            styleClasses: ['my-3', 'col-xl-6'],
          },
          {
            type: 'radios',
            label: '<b>2. Timing</b>',
            model: 'MD_SH2',
            values: [
              { value: 0, name: 'Intervention is probable' },
              { value: 1, name: 'Intervention is not likely' },
              { value: 2, name: 'Intervention is highly unlikely' },
            ],
            styleClasses: ['my-3', 'col-xl-6'],
          },
          {
            type: 'radios',
            label: '<b>3. Precautions against discovery / intervention</b>',
            model: 'MD_SH3',
            values: [
              { value: 0, name: 'No precautions' },
              { value: 1, name: 'Passive precautions (eg; alone in room with unlocked door)' },
              { value: 2, name: 'Active precautions (as locked door)' },
            ],
            styleClasses: ['my-3', 'col-xl-6'],
          },
          {
            type: 'radios',
            label: '<b>4. Acting to get help during / after attempt</b>',
            model: 'MD_SH4',
            values: [
              { value: 0, name: 'Notified potential helper regarding attempt' },
              { value: 1, name: 'Contacted but did not specifically notify regarding attempt' },
              { value: 2, name: 'Did not contact or notify potential helper' },
            ],
            styleClasses: ['my-3', 'col-xl-6'],
          },
          {
            type: 'radios',
            label: '<b>5. Final acts in anticipating of death (will, gifts, insurance)</b>',
            model: 'MD_SH5',
            values: [
              { value: 0, name: 'None' },
              { value: 1, name: 'Thought about or made some arrangements' },
              { value: 2, name: 'Made definite plans or completed arrangements' },
            ],
            styleClasses: ['my-3', 'col-xl-6'],
          },
          {
            type: 'radios',
            label: '<b>6. Active preparation for attempt</b>',
            model: 'MD_SH6',
            values: [
              { value: 0, name: 'None' },
              { value: 1, name: 'Minimal to moderate' },
              { value: 2, name: 'Extensive' },
            ],
            styleClasses: ['my-3', 'col-xl-6'],
          },
          {
            type: 'radios',
            label: '<b>7. Suicide note</b>',
            model: 'MD_SH7',
            values: [
              { value: 0, name: 'Absence of note' },
              { value: 1, name: 'Note written, but torn up; note thought about' },
              { value: 2, name: 'Presence of note' },
            ],
            styleClasses: ['my-3', 'col-xl-6'],
          },
          {
            type: 'radios',
            label: '<b>8. Overt communication of intent before the attempt</b>',
            model: 'MD_SH8',
            values: [
              { value: 0, name: 'None' },
              { value: 1, name: 'Equivocal communication' },
              { value: 2, name: 'Unequivocal communication' },
            ],
            styleClasses: ['my-3', 'col-xl-6'],
          },
          {
            type: 'radios',
            label: '<b>9. Allged purpose of attempt</b>',
            model: 'MD_SH9',
            values: [
              { value: 0, name: 'To manipulate environment, get attention, get revenge' },
              { value: 1, name: 'Components of above and below' },
              { value: 2, name: 'To escape, surcease, solve problems' },
            ],
            styleClasses: ['my-3', 'col-xl-6'],
          },
          {
            type: 'radios',
            label: '<b>10. Expectations of fatality</b>',
            model: 'MD_SH10',
            values: [
              { value: 0, name: 'Thought that death was unlikely' },
              { value: 1, name: 'Thought that death was possible but not probable' },
              { value: 2, name: 'Thought that death was probable or certain' },
            ],
            styleClasses: ['my-3', 'col-xl-6'],
          },
          {
            type: 'radios',
            label: "<b>11. Conception of method's lethality</b>",
            model: 'MD_SH11',
            values: [
              { value: 0, name: 'Did less to self that s/he thought would be lethal' },
              { value: 1, name: "Wasn't sure if what s/he did would be lethal" },
              { value: 2, name: 'Equaled or exceed what s/he thought would be lethal' },
            ],
            styleClasses: ['my-3', 'col-xl-6'],
          },
          {
            type: 'radios',
            label: '<b>12. Seriousness of attempt</b>',
            model: 'MD_SH12',
            values: [
              { value: 0, name: 'Did not seriously attempt to end life' },
              { value: 1, name: 'Uncertain about seriousness to end life' },
              { value: 2, name: 'Seriously attempted to end life' },
            ],
            styleClasses: ['my-3', 'col-xl-6'],
          },
          {
            type: 'radios',
            label: '<b>13. Attitude towards living/dying</b>',
            model: 'MD_SH13',
            values: [
              { value: 0, name: 'Did not want to die' },
              { value: 1, name: 'Components of above and below' },
              { value: 2, name: 'Wanted to die' },
            ],
            styleClasses: ['my-3', 'col-xl-6'],
          },
          {
            type: 'radios',
            label: '<b>14. Conception of medical rescuability</b>',
            model: 'MD_SH14',
            values: [
              { value: 0, name: 'Thought death would be unlikely if received medical attention' },
              { value: 1, name: 'Was uncertain if death could be averted by medical attention' },
              { value: 2, name: 'Was certain of death even if received medical attention' },
            ],
            styleClasses: ['my-3', 'col-xl-6'],
          },
          {
            type: 'radios',
            label: '<b>15. Degree of premeditation</b>',
            model: 'MD_SH15',
            values: [
              { value: 0, name: 'None; impulsive' },
              { value: 1, name: 'Suicide contemplated for 3 hours or less prior to attempt' },
              { value: 2, name: 'Suicide contemplated for more than 3 hours prior to attempt' },
            ],
            styleClasses: ['my-3', 'col-xl-12'],
          },
        ],
      },
      tabDModalSchema: {
        groups: [
          {
            fields: [
              {
                type: 'radios',
                values: [
                  { value: 1, name: 'High' },
                ],
                model: 'MD_SR_LEVEL',
                styleClasses: 'col-3',
              },
              {
                type: 'label',
                label: 'Psychiatric diagnoses with severe symptoms or acute precipitating events; protective factors not relevant; high suicidal intent',
                styleClasses: 'col-9',
              },
            ],
          },
          {
            fields: [
              {
                type: 'radios',
                values: [
                  { value: 2, name: 'Moderate' },
                ],
                model: 'MD_SR_LEVEL',
                styleClasses: 'col-3',
              },
              {
                type: 'label',
                label: 'Multiple risk factors, few protective factors, moderate suicidal intent',
                styleClasses: 'col-9',
              },
            ],
          },
          {
            fields: [
              {
                type: 'radios',
                values: [
                  { value: 3, name: 'Low' },
                ],
                model: 'MD_SR_LEVEL',
                styleClasses: 'col-3',
              },
              {
                type: 'label',
                label: 'Modifiable risk factors, strong protective factors, no or low suicidal intent',
                styleClasses: 'col-9',
              },
            ],
          },
        ],
      },
      tabEModalSchema: {
        groups: [
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'vueMultiSelect',
                placeholder: 'Please select',
                label: 'Referral or Contact point',
                model: 'REFERRAL',
                selectOptions: {
                  multiple: false,
                  closeOnSelect: true,
                  maxHeight: 200,
                  showLabels: false,
                  key: 'value',
                  label: 'name',
                },
                styleClasses: ['col-md-6'],
                values: () => {
                  return this.selectReferral
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: '',
                placeholder: 'Please specify',
                model: 'REFERRAL_SPECIFY',
                styleClasses: ['col-md-6'],
                visible: function (model) {
                  return model && model.REFERRAL.value === 5
                },
              },
            ],
          },
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'vueMultiSelect',
                placeholder: 'Please select',
                label: 'Mode of Arrival',
                model: 'ARRIVAL_MODE',
                selectOptions: {
                  multiple: false,
                  closeOnSelect: true,
                  maxHeight: 200,
                  showLabels: false,
                  key: 'value',
                  label: 'name',
                },
                styleClasses: ['col-md-6'],
                values: () => {
                  return this.selectArrivalMode
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: '',
                placeholder: 'Please specify',
                model: 'ARRIVAL_SPECIFY',
                styleClasses: ['col-md-6'],
                visible: function (model) {
                  return model && model.ARRIVAL_MODE.value === 7
                },
              },
            ],
          },
          {
            styleClasses: ['row', 'align-items-center'],
            fields: [
              {
                type: 'label',
                label: 'First psychiatry assessment after current attempt',
                styleClasses: ['col-md-2'],
              },
              {
                type: 'input',
                inputType: 'date',
                label: 'Date',
                model: 'FIRST_ASSESSMENT_DATE',
                format: 'YYYY/MM/DD',
                styleClasses: ['col-md-5'],
              },
              {
                type: 'input',
                inputType: 'time',
                label: 'Time',
                model: 'FIRST_ASSESSMENT_TIME',
                styleClasses: ['col-md-5'],
              },
            ],
          },
          {
            styleClasses: ['row', 'align-items-end'],
            fields: [
              {
                type: 'radios',
                label: 'Physical consequences of current attempt',
                model: 'MD_PHYSICAL_CONSEQ',
                styleClasses: ['col-md-6'],
                values: () => {
                  return this.radioPhysicalConseq
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: '',
                placeholder: 'Please specify',
                model: 'PHYSICAL_CONSEQ_SPECIFY',
                styleClasses: ['col-md-6'],
                visible: function (model) {
                  return model && model.PHYSICAL_CONSEQ === 99
                },
              },
            ],
          },
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'radios',
                label: 'Is patient admitted for current attempt?',
                model: 'MD_ADMISSION',
                styleClasses: ['col-md-6', 'display-inline'],
                values: () => {
                  return this.radioAdmission
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: '',
                placeholder: 'Please specify the first admitting ward',
                model: 'ADMISSION_SPECIFY',
                styleClasses: ['col-md-6'],
                visible: function (model) {
                  return model && model.ADMISSION === 2
                },
              },
            ],
          },
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'radios',
                label: 'Status on discharge',
                model: 'MD_DISCHARGE_STATUS',
                styleClasses: ['col-md-6', 'display-inline'],
                values: () => {
                  return this.radioDischargeStatus
                },
              },
            ],
          },
          {
            styleClasses: ['row', 'align-items-center'],
            fields: [
              {
                type: 'label',
                label: 'Discharge details',
                styleClasses: ['col-md-2'],
              },
              {
                type: 'input',
                inputType: 'date',
                label: 'Date',
                model: 'DISCHARGE_DATE',
                format: 'YYYY/MM/DD',
                styleClasses: ['col-md-5'],
              },
              {
                type: 'input',
                inputType: 'number',
                label: 'Number of days in ward',
                model: 'NO_OF_DAYS',
                min: 0,
                styleClasses: ['col-md-5'],
              },
            ],
          },
          {
            styleClasses: ['row', 'align-items-center'],
            fields: [
              {
                type: 'label',
                label: 'Discharge Diagnosis (ICD)',
                styleClasses: ['col-md-2'],
              },
              {
                type: 'vueMultiSelect',
                placeholder: 'Please select',
                label: 'Main diagnosis',
                model: 'MAIN_DIAGNOSIS',
                selectOptions: {
                  multiple: false,
                  closeOnSelect: true,
                  maxHeight: 200,
                  showLabels: false,
                  allowEmpty: false,
                },
                styleClasses: 'col-md-4',
                values: () => {
                  return this.selectDiagnosis
                },
              },
              {
                type: 'vueMultiSelect',
                placeholder: 'Please select',
                label: 'External causes',
                model: 'EXTERNAL_DIAGNOSIS',
                selectOptions: {
                  multiple: false,
                  closeOnSelect: true,
                  maxHeight: 200,
                  showLabels: false,
                  allowEmpty: false,
                },
                styleClasses: 'col-md-4',
                values: () => {
                  return this.selectDiagnosis
                },
              },

            ],
          },
          {
            styleClasses: ['row', 'align-items-end'],
            fields: [
              {
                type: 'checklist',
                label: 'PSY Mx on Discharge',
                model: 'PSYMX',
                listBox: true,
                styleClasses: ['col-md-6'],
                values: () => {
                  return this.listPSYMX
                },
              },
              {
                type: 'input',
                inputType: 'text',
                placeholder: 'Please specify',
                model: 'PSYMX_SPECIFY',
                label: '',
                styleClasses: ['col-md-6'],
                visible: function (model) {
                  return model && model.PSYMX.includes(6)
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
    if (!this.view) {
      window.onbeforeunload = function () {
        return 'Data will be lost if you leave the page, are you sure?'
      }
    }

    this.$axios
      .get('http://127.0.0.1:8000/api/getSHHARPData')
      .then((response) => {
        this.selectOccurance = response.data.occurance
        this.listMethod = response.data.method
        this.selectOverdoseType = response.data.overdoseType
        this.listIdea = response.data.idea
        this.listIntent = response.data.intent
        this.selectReferral = response.data.referral
        this.selectArrivalMode = response.data.modeArrival
        this.listPSYMX = response.data.psyMX
      })

    if (this.$route.query.st === 'edit') {
      this.edit = true
    }
    if (this.$route.query.st === 'view') {
      this.view = true
    }

    if (this.$route.query.st === 'edit' || this.$route.query.st === 'view') {
      var shharpId = JSON.parse(localStorage.getItem('SH'))

      this.$axios
        .get('http://127.0.0.1:8000/api/getSHHARPFormData?shharpId=' + shharpId)
        .then((response) => {
          const DATA = response.data.data[0]

          // Risk Factors
          this.model.Q1 = DATA.rf1
          if (DATA.rf1 === 2) { this.model.Q1_SPECIFY = DATA.rf1_desc.split(',') }
          this.model.Q2 = DATA.rf2
          this.model.Q3 = DATA.rf3
          this.model.Q3_SPECIFY = DATA.rf3_desc
          this.model.Q4 = DATA.rf4
          this.model.Q4_SPECIFY = this.selectSubstance[DATA.rf4_desc - 1]
          this.model.Q5 = DATA.rf5
          this.model.Q6 = DATA.rf6
          if (DATA.rf6 === 2) { this.model.Q6_SPECIFY = DATA.rf6_desc.split(',') }
          this.model.Q7 = DATA.rf7
          this.model.Q7_SPECIFY = this.selectSubstance[DATA.rf7_desc - 1]
          this.model.Q8 = DATA.rf8
          this.model.Q8_SPECIFY = this.selectStressfulLifeEvents[DATA.rf8_desc - 1]
          this.model.Q9 = DATA.rf9
          this.model.Q10 = DATA.rf10
          if (DATA.rf10 === 2) { this.model.Q10_SPECIFY = DATA.rf10_desc.split(',') }
          this.model.Q11 = DATA.rf11
          this.model.Q12 = DATA.rf12

          // Protective Factors
          this.model.PQ1 = DATA.pf1
          this.model.PQ2 = DATA.pf2
          this.model.PQ3 = DATA.pf3
          this.model.PQ4 = DATA.pf4
          this.model.PQ5 = DATA.pf5
          this.model.PQ6 = DATA.pf6

          // The Self-harm Act and Suicidal Intent
          this.model.SH_DATE = DATA.sh_act_date
          this.model.SH_TIME = DATA.sh_act_time
          if (DATA.place_occurance_fk != null) { this.model.OCCUR = { value: DATA.place_occurance_fk, name: DATA.occurance } }
          this.model.OCCUR_OTHER_SPECIFY = DATA.place_occurance_desc

          // Method
          var tempMethod = response.data.method
          var arrMethod = []

          for (let i = 0; i < tempMethod.length; i++) {
            arrMethod[i] = tempMethod[i].self_harm_method_fk

            if (arrMethod[i] === 1) {
              this.model.OVERDOSE_TYPE = { value: tempMethod[i].overdose_type_fk, name: tempMethod[i].overdose }
              this.model.OVERDOSE_TYPE_SPECIFY = tempMethod[i].self_harm_method_desc
            } else if (arrMethod[i] === 99) {
              this.model.METHOD_OTHER_SPECIFY = tempMethod[i].self_harm_method_desc
            }
          }
          this.model.METHOD = arrMethod

          // Idea
          var tempIdea = response.data.idea
          var arrIdea = []

          for (let i = 0; i < tempIdea.length; i++) {
            arrIdea[i] = tempIdea[i].self_harm_idea_fk

            if (arrIdea[i] === 99) {
              this.model.IDEA_SPECIFY = tempIdea[i].self_harm_idea_desc
            }
          }
          this.model.IDEA = arrIdea

          this.model.INTENT = DATA.sh_intent_exist

          // Intent
          var tempIntent = response.data.intent
          var arrIntent = []

          for (let i = 0; i < tempIntent.length; i++) {
            arrIntent[i] = tempIntent[i].self_harm_intent_fk

            if (arrIntent[i] === 99) {
              this.model.INTENT_OTHER_SPECIFY = tempIntent[i].self_harm_intent_desc
            }
          }
          this.model.INTENT_YES = arrIntent

          this.model.SH1 = DATA.sh_level_1
          this.model.SH2 = DATA.sh_level_2
          this.model.SH3 = DATA.sh_level_3
          this.model.SH4 = DATA.sh_level_4
          this.model.SH5 = DATA.sh_level_5
          this.model.SH6 = DATA.sh_level_6
          this.model.SH7 = DATA.sh_level_7
          this.model.SH8 = DATA.sh_level_8
          this.model.SH9 = DATA.sh_level_9
          this.model.SH10 = DATA.sh_level_10
          this.model.SH11 = DATA.sh_level_11
          this.model.SH12 = DATA.sh_level_12
          this.model.SH13 = DATA.sh_level_13
          this.model.SH14 = DATA.sh_level_14
          this.model.SH15 = DATA.sh_level_15
          this.model.INTENT_SCORE = DATA.sh_level_score

          if (DATA.sh_level_score <= 10) {
            this.model.INTENT_LEVEL = 'Low Intent'
          } else if (DATA.sh_level_score > 10 && DATA.sh_level_score <= 20) {
            this.model.INTENT_LEVEL = 'Medium Intent'
          } else {
            this.model.INTENT_LEVEL = 'High Intent'
          }

          // Suicide Risk
          this.model.SR_LEVEL = DATA.sr_level

          // Hospital Management
          if (DATA.referral_fk != null) { this.model.REFERRAL = { value: DATA.referral_fk, name: DATA.referral } }
          this.model.REFERRAL_SPECIFY = DATA.referral_desc
          if (DATA.mode_arrival_fk != null) { this.model.ARRIVAL_MODE = { value: DATA.mode_arrival_fk, name: DATA.arrival } }
          this.model.ARRIVAL_SPECIFY = DATA.mode_arrival_desc
          this.model.FIRST_ASSESSMENT_DATE = DATA.hm_date_first_psychiatry
          this.model.FIRST_ASSESSMENT_TIME = DATA.hm_time_first_psychiatry
          this.model.PHYSICAL_CONSEQ = DATA.hm_physical_consequence
          this.model.PHYSICAL_CONSEQ_SPECIFY = DATA.hm_physical_consequence_desc
          this.model.ADMISSION = DATA.hm_admitted
          this.model.ADMISSION_SPECIFY = DATA.hm_admitted_desc
          this.model.DISCHARGE_STATUS = DATA.hm_discharge_status
          this.model.DISCHARGE_DATE = DATA.hm_discharge_date
          this.model.NO_OF_DAYS = parseInt(DATA.hm_days_warded)
          this.model.MAIN_DIAGNOSIS = DATA.hm_discharge_diagnosis_main
          this.model.EXTERNAL_DIAGNOSIS = DATA.hm_discharge_diagnosis_external

          // psy_mx
          var tempPSYMX = response.data.psy_mx
          var arrPSYMX = []

          for (let i = 0; i < tempPSYMX.length; i++) {
            arrPSYMX[i] = tempPSYMX[i].hm_psy_mx_fk

            if (arrPSYMX[i] === 6) {
              this.model.PSYMX_SPECIFY = tempPSYMX[i].hm_psy_mx_desc
            }
          }
          this.model.PSYMX = arrPSYMX

          // Source Data Producer
          this.model.REG_OFF_NAME = DATA.sd_officer_name
          this.model.DESIGNATION = DATA.sd_officer_designation
          this.model.REPORT_DATE = DATA.sd_date_reporting
          this.model.HOSPITAL_NAME = DATA.sd_hospital_name
          this.model.PSYCHIATRIST_NAME = DATA.sd_psychiatrist_name
          this.model.VERIFICATION_DATE = DATA.sd_date_verification
        })
    }
  },
  methods: {
    saveAsDraft () {
      var status = 'DRAFT'
      var patientId = JSON.parse(localStorage.getItem('ID'))
      var shharpId = JSON.parse(localStorage.getItem('SH'))
      const data = new FormData()

      data.append('shData', JSON.stringify(this.model))
      data.append('formStatus', status)
      if (this.$route.query.st === 'edit') {
        this.$axios
          .post('http://127.0.0.1:8000/api/updateSHHARP?shharpId=' + shharpId, data)
          .then((response) => {
            return response.data
          })
      } else {
        this.$axios
          .post('http://127.0.0.1:8000/api/registerSHHARP?patientId=' + patientId, data)
          .then((response) => {
            return response.data
          })
      }
      this.launchToast(' Saved As Draft Successful')
      this.submitPath = true
      this.$router.push({ path: 'shharp-history' })
    },

    validateForm () {
      var status = 'COMPLETED'
      var patientId = JSON.parse(localStorage.getItem('ID'))
      var shharpId = JSON.parse(localStorage.getItem('SH'))
      const data = new FormData()

      var tabA = this.validateTabA()
      var tabB = this.validateTabB()
      var tabC = this.validateTabC()
      var tabD = this.validateTabD()
      var tabE = this.validateTabE()
      var tabF = this.validateTabF()

      if (tabA && tabB && tabC && tabD && tabE && tabF) {
        data.append('shData', JSON.stringify(this.model))
        data.append('formStatus', status)
        if (this.$route.query.st === 'edit') {
          this.$axios
            .post('http://127.0.0.1:8000/api/updateSHHARP?shharpId=' + shharpId, data)
            .then((response) => {
              return response.data
            })
        } else {
          this.$axios
            .post('http://127.0.0.1:8000/api/registerSHHARP?patientId=' + patientId + '&shharpId=' + shharpId, data)
            .then((response) => {
              return response.data
            })
        }
        this.launchToast('SHHARP Registry Successful')
        this.submitPath = true
        this.$router.push({ path: 'shharp-history' })
      }
    },
    validateTabA () {
      var errors = this.$refs.riskFactors.validate()
      if (errors) {
        this.tabA = false
        return true
      } else {
        this.tabA = true
        return false
      }
    },
    validateTabB () {
      var errors = this.$refs.protectiveFactors.validate()
      if (errors) {
        this.tabB = false
        return true
      } else {
        this.tabB = true
        return false
      }
    },
    validateTabC () {
      var tabCA = this.validateTabCA()
      var tabCB1 = this.validateTabCB1()
      var tabCB2 = this.validateTabCB2()
      var tabCC = this.validateTabCC()
      var tabCD1 = this.validateTabCD1()
      var tabCD2 = this.validateTabCD2()
      var tabCE1 = this.validateTabCE1()
      var tabCE2 = this.validateTabCE2()

      if (tabCA && tabCB1 && tabCB2 && tabCC && tabCD1 && tabCD2 && tabCE1 && tabCE2) {
        this.tabC = false
        return true
      } else {
        this.tabC = true
        return false
      }
    },
    validateTabCA () {
      var errors = this.$refs.selfHarmSectionA.validate()
      if (errors) {
        this.tabCsecA = false
        return true
      } else {
        this.tabCsecA = true
        return false
      }
    },
    validateTabCB1 () {
      var errors = this.$refs.selfHarmSectionB1.validate()
      if (errors) {
        this.tabCsecB = false
        return true
      } else {
        this.tabCsecB = true
        return false
      }
    },
    validateTabCB2 () {
      var errors = this.$refs.selfHarmSectionB2.validate()
      if (errors) {
        return true
      } else {
        this.tabCsecB = true
        return false
      }
    },
    validateTabCC () {
      var errors = this.$refs.selfHarmSectionC.validate()
      if (errors) {
        this.tabCsecC = false
        return true
      } else {
        this.tabCsecC = true
        return false
      }
    },
    validateTabCD1 () {
      var errors = this.$refs.selfHarmSectionD1.validate()
      if (errors) {
        this.tabCsecD = false
        return true
      } else {
        this.tabCsecD = true
        return false
      }
    },
    validateTabCD2 () {
      var errors = this.$refs.selfHarmSectionD2.validate()
      if (errors) {
        this.tabCsecD = false
        return true
      } else {
        this.tabCsecD = true
        return false
      }
    },
    validateTabCE1 () {
      var errors = this.$refs.selfHarmSectionE1.validate()
      if (errors) {
        this.tabCsecE = false
        return true
      } else {
        this.tabCsecE = true
        return false
      }
    },
    validateTabCE2 () {
      var errors = this.$refs.selfHarmSectionE2.validate()
      if (errors) {
        this.tabCsecE = false
        return true
      } else {
        this.tabCsecE = true
        return false
      }
    },

    validateTabD () {
      var errors = this.$refs.suicideRisk.validate()
      if (errors) {
        this.tabD = false
        return true
      } else {
        this.tabD = true
        return false
      }
    },

    validateTabE () {
      var errors = this.$refs.hospitalManagement.validate()
      if (errors) {
        this.tabE = false
        return true
      } else {
        this.tabE = true
        return false
      }
    },
    validateTabF () {
      var errors = this.$refs.sourceDataProducer.validate()
      if (errors) {
        this.tabF = false
        return true
      } else {
        this.tabF = true
        return false
      }
    },
    showPreviewModal () {
      this.model.MD_Q1 = this.model.Q1
      this.model.MD_Q2 = this.model.Q2
      this.model.MD_Q3 = this.model.Q3
      this.model.MD_Q4 = this.model.Q4
      this.model.MD_Q5 = this.model.Q5
      this.model.MD_Q6 = this.model.Q6
      this.model.MD_Q7 = this.model.Q7
      this.model.MD_Q8 = this.model.Q8
      this.model.MD_Q9 = this.model.Q9
      this.model.MD_Q10 = this.model.Q10
      this.model.MD_Q11 = this.model.Q11
      this.model.MD_Q12 = this.model.Q12

      this.model.MD_PQ1 = this.model.PQ1
      this.model.MD_PQ2 = this.model.PQ2
      this.model.MD_PQ3 = this.model.PQ3
      this.model.MD_PQ4 = this.model.PQ4
      this.model.MD_PQ5 = this.model.PQ5
      this.model.MD_PQ6 = this.model.PQ6

      this.model.MD_SH1 = this.model.SH1
      this.model.MD_SH2 = this.model.SH2
      this.model.MD_SH3 = this.model.SH3
      this.model.MD_SH4 = this.model.SH4
      this.model.MD_SH5 = this.model.SH5
      this.model.MD_SH6 = this.model.SH6
      this.model.MD_SH7 = this.model.SH7
      this.model.MD_SH8 = this.model.SH8
      this.model.MD_SH9 = this.model.SH9
      this.model.MD_SH10 = this.model.SH10
      this.model.MD_SH11 = this.model.SH11
      this.model.MD_SH12 = this.model.SH12
      this.model.MD_SH13 = this.model.SH13
      this.model.MD_SH14 = this.model.SH14
      this.model.MD_SH15 = this.model.SH15

      this.model.MD_SR_LEVEL = this.model.SR_LEVEL

      this.model.MD_PHYSICAL_CONSEQ = this.model.PHYSICAL_CONSEQ
      this.model.MD_ADMISSION = this.model.ADMISSION
      this.model.MD_DISCHARGE_STATUS = this.model.DISCHARGE_STATUS

      this.showLargeModal = true
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
    if (this.view || this.submitPath) {
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
<!-- New step!
     Add Multiselect CSS. Can be added as a static asset or inside a component. -->
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
  .app-layout__main {
    background: hsl(0, 0%, 91%);
  }

  .display-inline label {
    display: inline !important;
    align-content: center;
    margin-right: 10px;
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

  .dropdown {
    box-sizing: border-box;
  }

  .center {
    margin-left: 200px;
  }

  .line + .line {
    border-top: 1px solid rgb(189, 184, 184);
    margin-top: 1rem;
    margin-bottom: 5rem;
  }

  .modal-preview {
    padding: 10px;
  }

  .red {
    color: red;
  }

  .sh-tab-title {
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 10px;
    background-color: #bf1304;
    border-radius: 10px;
    color: white;
  }

  .sh-sub-title {
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 10px;
    background-color: #f0ecec;
    border-radius: 10px;
  }

  .readonly {
    pointer-events: none;
  }

  .readwrite {
    pointer-events: auto;
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

  .stretch-row {
    display: flex !important;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .box {
    border: 1px solid #918f8d;
    padding: 20px;
    border-radius: 10px;
  }

  .vue-form-generator .field-checklist .listbox {
    height: auto;
    max-height: 500px;
    overflow: auto;
  }

  .nav-tabs .nav-link {
    border: 1px solid #918f8d;
    color: #918f8d;
  }

  .nav-tabs .nav-link:hover {
    border: 1px solid #bf1304;
    color: #bf1304;
  }

  .nav-tabs .nav-link.active {
    background-color: #bf1304;
    color: #ffffff;
    border: 1px solid #bf1304;
  }

  .margin-top {
    margin-top: 31px;
  }

  .pb-7 {
    padding-bottom: 70px;
    // .multiselect__content-wrapper {
    //   position: fixed;
    //   width: 37%;
    // }
  }

</style>
