<template>
  <div>
    <va-card>
      <div class="text-center"><h4 class="mt-4 mb-5 text-dark">CUSTOMIZED BUTTONS</h4></div>

      <div class="row">
        <div class="col-md-4">

          <div class="mt-4">
            <h6>Submit</h6>
            <button @click="showSmallModal = true" type="submit" class="ml-2 btn btn-fill btn-md btn-blue">
              <div class="fa fa-paper-plane" /> &nbsp; SUBMIT
            </button>
          </div>

          <div class="mt-4">
            <h6>Save As Draft</h6>
            <button @click="showSmallModal = true" type="button" class="ml-2 btn btn-fill btn-md btn-yellow">
              <div class="material-icons align-middle">system_update_alt</div> &nbsp; SAVE AS DRAFT
            </button>
          </div>

          <div class="mt-4">
            <h6>Next</h6>
            <button @click="showSmallModal = true" type="button" class="ml-2 btn btn-fill btn-md btn-blue">
              NEXT &nbsp; <div class="fa fa-angle-double-right" />
            </button>
          </div>

          <div class="mt-4">
            <h6>Previous/Back</h6>
            <button @click="showSmallModal = true" type="button" class="ml-2 btn btn-fill btn-md btn-blue">
              <div class="fa fa-angle-double-left" /> &nbsp; PREVIOUS
            </button>
          </div>

          <div class="mt-4">
            <h6>Add - Blue Version</h6>
            <button @click="showSmallModal = true" type="button" class="ml-2 btn btn-fill btn-md btn-blue">
              <div class="fa fa-plus" />
            </button>
          </div>

          <div class="mt-4">
            <h6>Add - Yellow Version</h6>
            <button @click="showSmallModal = true" type="button" class="ml-2 btn btn-fill btn-md btn-yellow btn-circle">
              <div class="fa fa-plus" />
            </button>
          </div>

          <div class="mt-4">
            <h6>Preview</h6>
            <button @click="showSmallModal = true" type="button" class="ml-2 btn btn-fill btn-md btn-yellow">
              <div class="fa fa-play" /> &nbsp; PREVIEW
            </button>
          </div>

          <div class="mt-4">
            <h6>Search</h6>
            <button @click="showSmallModal = true" type="button" class="ml-2 btn btn-fill btn-md">
              <div class="fa fa-search" />
            </button>
          </div>

          <div class="mt-4">
            <h6>Approve</h6>
            <button @click="showSmallModal = true" type="button" class="ml-2 btn btn-fill btn-md btn-green">
              <div class="fa fa-check" /> &nbsp; APPROVE
            </button>
          </div>

        </div>

        <div class="col-md-4">

          <div class="mt-4">
            <h6>View Details</h6>
            <button @click="showSmallModal = true" type="button" class="ml-2 btn btn-fill btn-md btn-blue">
              <div class="fa fa-eye" />
            </button>
          </div>

          <div class="mt-4">
            <h6>View Details</h6>
            <button @click="showSmallModal = true" type="button" class="ml-2 btn btn-fill btn-md btn-blue">
              OK
            </button>
          </div>

          <div class="mt-4">
            <h6>PDF</h6>
            <button @click="showSmallModal = true" type="button" class="ml-2 btn btn-fill btn-md" style="color: #ff0000;">
              <div class="fa fa-file-pdf-o" />
            </button>
          </div>

          <div class="mt-4">
            <h6>EXCEL</h6>
            <button @click="showSmallModal = true" type="button" class="ml-2 btn btn-fill btn-md" style="color: #1d6f42;">
              <div class="fa fa-file-excel-o" />
            </button>
          </div>

          <div class="mt-4">
            <h6>Setting</h6>
            <button @click="showSmallModal = true" type="button" class="ml-2 btn btn-fill btn-md">
              <div class="fa fa-cog" />
            </button>
          </div>

          <div class="mt-4">
            <h6>Add Parameter</h6>
            <button @click="showSmallModal = true" type="button" class="ml-2 btn btn-fill btn-md btn-yellow">
              <div class="fa fa-plus" /> &nbsp; ADD PARAMETER
            </button>
          </div>

          <div class="mt-4">
            <h6>Delete</h6>
            <button @click="showSmallModal = true" type="button" class="ml-2 btn btn-fill btn-md btn-red">
              <div class="fa fa-trash-o" />
            </button>
          </div>

          <div class="mt-4">
            <h6>Save</h6>
            <button @click="showSmallModal = true" type="button" class="ml-2 btn btn-fill btn-md btn-yellow">
              <div class="material-icons align-middle">system_update_alt</div> &nbsp; SAVE
            </button>
          </div>

          <div class="mt-4">
            <h6>Print</h6>
            <button @click="showSmallModal = true" type="button" class="ml-2 btn btn-fill btn-md btn-blue">
              <div class="fa fa-print" /> &nbsp; PRINT
            </button>
          </div>

        </div>

        <div class="col-md-4">

          <div class="mt-4">
            <h6>Download</h6>
            <button @click="showSmallModal = true" type="button" class="ml-2 btn btn-fill btn-md btn-green">
              <div class="va-icon vuestic-iconset vuestic-iconset-auth icon-rotate-90" /> &nbsp; &nbsp; DOWNLOAD
            </button>
          </div>

          <div class="mt-4">
            <h6>Display</h6>
            <button @click="showSmallModal = true" type="button" class="ml-2 btn btn-fill btn-md" style="color: #51ad5e;">
              <div class="fa fa-eye" />
            </button>
          </div>

          <div class="mt-4">
            <h6>Delete</h6>
            <button @click="showSmallModal = true" type="button" class="ml-2 btn btn-fill btn-md btn-red">
              CANCEL
            </button>
          </div>

          <div class="mt-4">
            <h6>Edit</h6>
            <button @click="showSmallModal = true" type="button" class="ml-2 btn btn-fill btn-md">
              <div class="fa fa-pencil-square-o" />
            </button>
          </div>

          <div class="mt-4">
            <h6>Reject</h6>
            <button @click="showSmallModal = true" type="button" class="ml-2 btn btn-fill btn-md btn-red">
              <div class="fa fa-ban" /> &nbsp; REJECT
            </button>
          </div>

          <div class="mt-4">
            <h6>Calendar</h6>
            <button @click="showSmallModal = true" type="button" class="ml-2 btn btn-fill btn-md">
              <div class="fa fa-calendar-o" />
            </button>
          </div>

          <div class="mt-4">
            <h6>History Record</h6>
            <button @click="showSmallModal = true" type="button" class="ml-2 btn btn-fill btn-md">
              <div class="fa fa-bars" />
            </button>
          </div>

          <div class="mt-4">
            <h6>Close</h6>
            <button @click="showSmallModal = true" type="button" class="ml-2 btn btn-fill btn-md btn-red">
              <div class="fa fa-remove" />
            </button>
          </div>

          <div class="mt-4">
            <h6>ON/OFF Toggle</h6>
            <va-button-toggle
              v-model="toggle"
              :options="options"
              color="#1ba1a1"
            />
          </div>

        </div>

      </div>

    </va-card>

    <va-modal
      v-model="showSmallModal"
      size="small"
      :title=" $t('Customized Buttons') "
      :message=" $t('Use appropriate buttons for the development..') "
      :okText=" $t('Confirm') "
      :cancelText=" $t('Close') "
    />
  </div>

</template>

<script>
export default {
  name: 'modals',
  data () {
    return {
      show: true,
      showSmallModal: false,
      options: [
        { label: 'ON', value: 1 },
        { label: 'OFF', value: 0 },
      ],
      toggle: '',
    }
  },
}
</script>

<style>

</style>
