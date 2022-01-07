<!-- Patient Record (Nurse View) -->
<template>
  <div class="content">
    <div class="container-fluid">
      <router-link :to="{ name: 'patient-profile'}">
        <h2 class="patient-name">{{pt_data.name}}</h2>
      </router-link>

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

                <div class="row mb-3">
                  <div class="col-sm-4"><b>Nationality</b></div>
                  <div class="col-sm-auto"><b>:</b></div>
                  <div class="col-sm-5">{{nationality}}</div>
                </div>
              </div>

              <div class="col-xl-4 mb-3">
                <b>Employment Status :</b>
                <div>{{pt_data.employment_status}}</div>
                <br>
                <b>Household Income Status :</b>
                <div>RM {{pt_data.min}} - RM {{pt_data.max}}</div>
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
        <div class="col-xl-12">
          <div class="row mt-3">
            <!--Visit History--->
            <div class="col-xl-12">
              <va-card :title="$t('SHHARP Registry History')">
                <div class="float-right">
                  <router-link :to="{ name: 'shharp-registry'}">
                    <button type="button" class="btn sizebtn">
                      <div class="fa fa-plus-circle"/>
                    </button>
                  </router-link>
                </div>
                <va-data-table
                  :fields="shharpFields"
                  :data="shharpRecords"
                  :per-page="5"
                >
                  <template slot="no" slot-scope="row">
                    {{ row.rowIndex + 1 }}
                  </template>

                  <template slot="date" slot-scope="props">
                    <div v-if="props.rowData.timestamp_update == null">
                      {{ getDate(props.rowData.timestamp_create) }}
                    </div>
                    <div v-else>
                      {{ getDate(props.rowData.timestamp_update) }}
                    </div>
                  </template>

                  <template slot="time" slot-scope="props">
                    <div v-if="props.rowData.timestamp_update == null">
                      {{ getTime(props.rowData.timestamp_create) }}
                    </div>
                    <div v-else>
                      {{ getTime(props.rowData.timestamp_update) }}
                    </div>
                  </template>

                  <template slot="actions" slot-scope="props">
                    <va-button v-if="props.rowData.shharp_form_status=='COMPLETED'" flat small icon="fa fa-eye" @click="view(props.rowData.shharp_id)" style="color: #51ad5e;">
                    </va-button>
                    <va-button v-if="props.rowData.shharp_form_status=='DRAFT'" flat small color="#75757" icon="fa fa-pencil" @click="editDraft(props.rowData.shharp_id)" class="edit-button">
                    </va-button>
                  </template>
                </va-data-table>
              </va-card>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      pt_data: [],
      birthdate: '',
      age: '',
      date: '',
      time: '',
      nationality: '',
      empty: true,
      shharpId: [],

      shharpRecords: [],
    }
  },
  computed: {
    shharpFields () {
      return [
        {
          name: '__slot:no',
          title: this.$t('NO'),
          width: '5%',
          height: '45px',
          dataClass: 'text-center',
        },
        {
          name: '__slot:date',
          title: 'DATE',
          width: '15%',
        },
        {
          name: '__slot:time',
          title: 'TIME',
          width: '15%',
        },
        {
          name: 'shharp_form_status',
          title: 'STATUS',
          width: '10%',
        },
        {
          name: 'sd_hospital_name',
          title: 'HOSPITAL',
          width: '20%',
        },
        {
          name: 'sd_officer_name',
          title: 'CREATED BY',
          width: '18%',
        },
        {
          name: '__slot:actions',
          title: 'ACTION',
          width: '12%',
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
    getTime (datetime) {
      const d = new Date(datetime)
      const newDate = d.toLocaleTimeString('en-MY')
      return newDate
    },
    view (id) {
      localStorage.setItem('SH', id)
      this.$router.push({ path: 'shharp-registry', query: { st: 'view' } })
    },
    editDraft (id) {
      localStorage.setItem('SH', id)
      this.$router.push({ path: 'shharp-registry', query: { st: 'edit' } })
    },
  },
  mounted () {
    var patientId = JSON.parse(localStorage.getItem('ID'))
    this.$axios
      .get('http://127.0.0.1:8000/api/getSHHARPProfile?patientId=' + patientId)
      .then((response) => {
        this.pt_data = response.data.data
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
      })

    this.$axios
      .get('http://127.0.0.1:8000/api/getSHHARPHistory?patientId=' + patientId)
      .then((response) => {
        this.shharpRecords = (response.data.data).slice()
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

  .sizebtn {
    font-size: 2rem;
  }

  .edit-button:hover {
    background-color: rgb(209, 209, 209);
  }

</style>
