// visit note -latest

<!-- Template -->

<template>
  <div class="content">
    <div class="container-fluid">
 
      <br/>
      <div class="row">
        <div class="col-12">
          <va-card :title="$t('Visit Note')">
            <br>
            <!-- Form Generator-->
            <vue-form-generator :model="model" :schema="SchemaA" :options="formOptions" ref="SchemaA" @model-updated="onModelUpdated">                   
            </vue-form-generator>
            </va-card>
            <br />
        
            <va-card>
              <vue-form-generator :model="model" :schema="SchemaB" :options="formOptions" ref="SchemaB" @model-updated="onModelUpdated">                   
              </vue-form-generator>
              <br/>
              <!-- Toolbar text editor-->
              <vue-file-toolbar-menu :content="menu" class="bar" /> 
              
              <!-- Text Area -Clerking Note-->
              <div class="d-flex flex-center">    
                <vue-document-editor class="editor" ref="editor"
                :content.sync="content"
                :overlay="overlay"
                :zoom="zoom"
                :page_format_mm="page_format_mm"
                :display="display"
                :page_margins="page_margins"
                />         
              </div>

            </va-card>

            <br/>
            <!-- Text Area -Medication History-->
            <va-card >
              <vue-form-generator :model="model" :schema="SchemaC" :options="formOptions" ref="SchemaC" @model-updated="onModelUpdated">                   
              </vue-form-generator>
            
            </va-card>
            <br />
            <div class="float-right">
              <button type="button" class="btn btn-info btn-fill btn-md">
                <i class="fa fa-edit" /> &nbsp;Save
              </button>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vudal from 'vudal'
import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg-core.css'
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueDocumentEditor from 'vue-document-editor'
import VueFileToolbarMenu from 'vue-file-toolbar-menu';

// Clerking Note Template
import PsychiatryClerking from './PsychiatryClerking.vue';
import CounsellorClerking from './CounsellorClerking.vue';

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(VueFormGenerator)
Vue.component(Vudal)
Vue.use(VueDocumentEditor)
Vue.use(VueFileToolbarMenu)
// register globally
export default {
  components: {
    Vudal,
    VueDocumentEditor,
    VueFileToolbarMenu,

  },
  mounted () {
    this.mounted = true; 
    // this.$refs.wizard.maxStep = 5
    // this.$refs.wizard.navigateToTab(5)
    
  },
  computed: {
    // This is the menu content
    menu () {
      return [
        // Main commands
        { text: "New", title: "New", icon: "description", click: () => { if(confirm("This will create an empty document. Are you sure?")){ this.content = [""]; this.resetContentHistory(); } } },
        { text: "Print", title: "Print", icon: "print", click: () => window.print() },
        { is: "spacer" },

        // Undo / redo commands
        { title: "Undo", icon: "undo", disabled: !this.can_undo, hotkey: this.isMacLike ? "command+z" : "ctrl+z", click: () => this.undo() },
        { title: "Redo", icon: "redo", disabled: !this.can_redo, hotkey: this.isMacLike ? "shift+command+z" : "ctrl+y", click: () => this.redo() },
        { is: "spacer" },

        // Rich text menus
        { icon: "format_align_left", title: "Align left", active: this.isLeftAligned, disabled: !this.current_text_style, hotkey: this.isMacLike ? "shift+command+l" : "ctrl+shift+l", click: () => document.execCommand("justifyLeft") },
        { icon: "format_align_center", title: "Align center", active: this.isCentered, disabled: !this.current_text_style, hotkey: this.isMacLike ? "shift+command+e" : "ctrl+shift+e", click: () => document.execCommand("justifyCenter") },
        { icon: "format_align_right", title: "Align right", active: this.isRightAligned, disabled: !this.current_text_style, hotkey: this.isMacLike ? "shift+command+r" : "ctrl+shift+r", click: () => document.execCommand("justifyRight") },
        { icon: "format_align_justify", title: "Justify content", active: this.isJustified, disabled: !this.current_text_style, hotkey: this.isMacLike ? "shift+command+j" : "ctrl+shift+j", click: () => document.execCommand("justifyFull") },
        { is: "separator" },
        { icon: "format_bold", title: "Bold", active: this.isBold, disabled: !this.current_text_style, hotkey: this.isMacLike ? "command+b" : "ctrl+b", click: () => document.execCommand("bold") },
        { icon: "format_italic", title: "Italic", active: this.isItalic, disabled: !this.current_text_style, hotkey: this.isMacLike ? "command+i" : "ctrl+i", click: () => document.execCommand("italic") },
        { icon: "format_underline", title: "Underline", active: this.isUnderline, disabled: !this.current_text_style, hotkey: this.isMacLike ? "command+u" : "ctrl+u", click: () => document.execCommand("underline") },
        { icon: "format_strikethrough", title: "Strike through", active: this.isStrikeThrough, disabled: !this.current_text_style, click: () => document.execCommand("strikethrough") },
        { is: "button-color", type: "compact", menu_class: "align-center", disabled: !this.current_text_style, color: this.curColor, update_color: (new_color) => document.execCommand('foreColor', false, new_color.hex8) },
        { is: "separator" },
        { icon: "format_list_numbered", title: "Numbered list", active: this.isNumberedList, disabled: !this.current_text_style, click: () => document.execCommand("insertOrderedList") },
        { icon: "format_list_bulleted", title: "Bulleted list", active: this.isBulletedList, disabled: !this.current_text_style, click: () => document.execCommand("insertUnorderedList") },
        { html: "<b>H1</b>", title: "Header 1", active: this.isH1, disabled: !this.current_text_style, click: () => document.execCommand('formatBlock', false, '<h1>') },
        { html: "<b>H2</b>", title: "Header 2", active: this.isH2, disabled: !this.current_text_style, click: () => document.execCommand('formatBlock', false, '<h2>') },
        { html: "<b>H3</b>", title: "Header 3", active: this.isH3, disabled: !this.current_text_style, click: () => document.execCommand('formatBlock', false, '<h3>') },
        { icon: "format_clear", title: "Clear format", disabled: !this.current_text_style, click () { document.execCommand('removeFormat'); document.execCommand('formatBlock', false, '<div>'); } },
        { icon: "splitscreen", title: "Page break", disabled: !this.current_text_style, click: () => this.insertPageBreak() },
  
        { is: "separator" },

        { // Upload Media
          title: "Image",
          icon: "image"

        },
        { // Link
          title: "Link",
          icon: "link"

        },
        { // Table
          title: "Table",
          icon: "table"

        },
        { is: "spacer" },
        { is: "separator" },
        
        
        { // Zoom menu
          text: Math.floor(this.zoom * 100) + "%",
          title: "Zoom",
          icon: "zoom_in",
          chevron: true,
          menu: [
            ["200%", 2.0],
            ["150%", 1.5],
            ["125%", 1.25],
            ["100%", 1.0],
            ["75%", 0.75],
            ["50%", 0.5],
            ["25%", 0.25]
          ].map(([text, zoom]) => {
            return {
              text,
              active: this.zoom == zoom,
              click: () => { this.zoom = zoom; }
            }
          }),
          menu_width: 80,
          menu_height: 280,
          menu_class: "align-center"
        },
        { // Display mode menu
          title: "Display",
          icon: this.display == "horizontal" ? "view_column" : (this.display == "vertical" ? "view_stream" : "view_module"),
          chevron: true,
          menu: [{
            icon: "view_module",
            active: this.display == "grid",
            click: () => { this.display = "grid"; }
          }, {
            icon: "view_column",
            active: this.display == "horizontal",
            click: () => { this.display = "horizontal"; }
          }, {
            icon: "view_stream",
            active: this.display == "vertical",
            click: () => { this.display = "vertical"; }
          }],
          menu_width: 55,
          menu_class: "align-right"
        },
        { // Format menu
          text: this.current_format_name,
          title: "Format",
          icon: "crop_free",
          chevron: true,
          menu: this.formats.map(([text, w, h]) => {
            return {
              text,
              active: (this.page_format_mm[0] == w && this.page_format_mm[1] == h),
              click: () => { this.page_format_mm = [w, h]; }
            }
          }),
          menu_width: 80,
          menu_height: 280
        },
        { // Margins menu
          text: this.current_margins_name,
          title: "Margins",
          icon: "select_all",
          chevron: true,
          menu: this.margins.map(([text, value]) => {
            return {
              text: text+" ("+value+")",
              active: (this.page_margins == value),
              click: () => { this.page_margins = value; }
            }
          }),
          menu_width: 200,
          menu_class: "align-center"
        },
        
      ]
    },
    // Formats management
    current_format_name () {
      const format = this.formats.find(([, width_mm, height_mm]) => (this.page_format_mm[0] == width_mm && this.page_format_mm[1] == height_mm));
      return format ? format[0] : (this.page_format_mm[0]+"mm x "+this.page_format_mm[1]+"mm");
    },
    formats: () => [
      ["A0", 841, 1189],
      ["A0L", 1189, 841],
      ["A1", 594, 841],
      ["A1L", 841, 594],
      ["A2", 420, 594],
      ["A2L", 594, 420],
      ["A3", 297, 420],
      ["A3L", 420, 297],
      ["A4", 210, 297],
      ["A4L", 297, 210],
      ["A5", 148, 210],
      ["A5L", 210, 148],
      ["A6", 105, 148],
      ["A6L", 148, 105]
    ],
    // Margins management
    current_margins_name () {
      const margins = this.margins.find(([, margins]) => (this.page_margins == margins));
      return margins ? margins[0] : margins[1];
    },
    margins: () => [
      ["Medium", "20mm"],
      ["Small", "15mm"],
      ["Slim", "10mm 15mm"],
      ["Tiny", "5mm"]
    ],
    // Current text style management
    current_text_style () { return this.mounted ? this.$refs.editor.current_text_style : false; },
    isLeftAligned () { return ["start", "left", "-moz-left"].includes(this.current_text_style.textAlign); },
    isRightAligned () { return ["end", "right", "-moz-right"].includes(this.current_text_style.textAlign); },
    isCentered () { return ["center", "-moz-center"].includes(this.current_text_style.textAlign); },
    isJustified () { return ["justify", "justify-all"].includes(this.current_text_style.textAlign); },
    isBold () {
      const fontWeight = this.current_text_style.fontWeight;
      return fontWeight && (parseInt(fontWeight) > 400 || fontWeight.indexOf("bold") == 0);
    },
    isItalic () { return this.current_text_style.fontStyle == "italic"; },
    isUnderline () { // text-decoration is not overridden by children, so we query the parent stack
      const stack = this.current_text_style.textDecorationStack;
      return stack && stack.some(d => (d.indexOf("underline") == 0));
    },
    isStrikeThrough () { // text-decoration is not overridden by children, so we query the parent stack
      const stack = this.current_text_style.textDecorationStack;
      return stack && stack.some(d => (d.indexOf("line-through") == 0));
    },
    isNumberedList () { return this.current_text_style.isList && this.current_text_style.listStyleType == "decimal"; },
    isBulletedList () { return this.current_text_style.isList && ["disc", "circle"].includes(this.current_text_style.listStyleType); },
    isH1 () { return this.current_text_style.headerLevel == 1; },
    isH2 () { return this.current_text_style.headerLevel == 2; },
    isH3 () { return this.current_text_style.headerLevel == 3; },
    curColor () { return this.current_text_style.color || "transparent"; },
    // Platform management
    isMacLike: () => /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform),
    // Undo / redo flags
    can_undo () { return this.undo_count > 0; },
    can_redo () { return this.content_history.length - this.undo_count - 1 > 0; }
  },

  props: {
    value: File,
  },
  data () {
    return {
      show: false,
      show_second: false,
      show_third: false,
      modalClass: 'modal-90per',
      // Text editor
      content: [
        // Every item below produce a page break
         { template: PsychiatryClerking, props: { invoice_number: "MS10001" } },
         //{ template: CounsellorClerking, props: { invoice_number: "MS10001" } },
        //'<h1>Psychiatric Clerking Note</h1><h2></h2><p>This is a rich-text editor built on top of <span contenteditable="false"><a href="https://vuejs.org/" target="_blank">Vue.js</a></span> using the native <span contenteditable="false"><a href="https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Editable_content" target="_blank"><i>contenteditable</i></a></span> browser implementation and some JavaScript trickery to spread content over paper-sized pages.</p><p>Built-in functionality includes:</p><ul><li>Using Vue.js components as interactive page templates (see next page)</li><li>Word-by-word page splitting with forward and backward propagation (<u>still experimental</u>)</li><li>Native Print compatible</li><li>Dynamic document format and margins in millimeters</li><li>Custom page overlays (headers, footers, page numbers)</li><li>Page breaks</li><li>Smart zoom and page display modes</li><li>Computes text style at caret position</li></ul><p>This library may be useful if you design an application that generate documents and you would let the user to modify them slightly before printing / saving, but with limited / interactive possibilities. It does not intend to replace a proper document editor with full functionality.<br>Make sure this project is suitable to your needs before using it.</p><p>This demo adds:</p><ul><li>The top bar (<span contenteditable="false"><a href="https://github.com/motla/vue-file-toolbar-menu" target="_blank">vue-file-toolbar-menu</a></span> component) and the functions associated with it</li><li>Rewritten history stack (undo/redo) compatible with native commands</li><li>Pinch and trackpad zooming</li></ul><p>Check out the <span contenteditable="false"><a href="https://github.com/motla/vue-document-editor/blob/master/src/Demo/Demo.vue" target="_blank">Demo.vue</a></span> file if you need to add these functionalities to your application.</p><p>The link below is an example of non-editable block set with <code>contenteditable="false"</code>:</p><p style="text-align:center" contenteditable="false"><a href="https://github.com/motla/vue-document-editor">View docs on Github</a>, you can\'t edit me.</p><p>But you can still edit this.</p>',  
       
        
      ],
      zoom: 0.8,
      zoom_min: 0.10,
      zoom_max: 5.0,
      page_format_mm: [200, 297],
      page_margins: "10mm 15mm",
      display: "vertical", // ["grid", "vertical", "horizontal"]
      mounted: false, // will be true after this component is mounted
      undo_count: -1, // contains the number of times user can undo (= current position in content_history)
      content_history: [], // contains the content states for undo/redo operations

      currentPage: 1,
      filter: null,

      fields: [

      ],
      showView: false,
      selectCategory: [
        {
          name: 'Assisstance / Supervision',
          value: '1',
        },
        {
          name: 'Clinical Work / Procedure',
          value: '2',
        },
        {
          name: 'External',
          value: '3',
        },
      ],

      selectComplexity: [
        {
          name: 'Supportive Contact',
          id: '1',
        },
        {
          name: 'Active Contact (Monthly)',
          id: '2',
        },
        {
          name: 'Intensive Contact (2-weekly)',
          id: '3',
        },
        {
          name: 'Crisis Contact',
          id: '4',
        },
      ],

      selectOutcome: [
        {
          name: 'Ongoing Therapeutic Intervention',
          id: '1',
        },
        {
          name: 'Referred Internal',
          id: '2',
        },
        {
          name: 'Client Not In',
          id: '3',
        },
        {
          name: 'Client Sent to ED',
          id: '4',
        },
        {
          name: 'Discharge for Function',
          id: '5',
        },
        {
          name: 'Others',
          id: '6',
        },
      ],

      selectDischargeType: [
        {
          name: 'Well',
          id: '1',
        },
        {
          name: 'Transfer',
          id: '2',
        },
        {
          name: 'Technical (lost to follow-up)',
          id: '3',
        },
        {
          name: 'DAMA (Discharge Against Medical Advice)',
          id: '4',
        },
        {
          name: 'Died',
          id: '5',
        },
      ],

      selectICD10Code: [
        {
          name: 'F00 - Dementia in Alzheimer Disease',
          id: '1',
        },
        
      ],

      selectICD10Code: [
        {
          name: 'F00 - Dementia in Alzheimer Disease',
          id: '1',
        },
        
      ],

      selectICD9Code: [
        {
          name: '93.8 - Other Rehabilitation Therapy',
          id: '1',
        },
        {
          name: '94.0 - Psychologic Evaluation and Testing',
          id: '2',
        },
        {
          name: '94.1 - Psychiatric Interviews, Consultations and Evaluations',
          id: '3',
        },
        {
          name: '94.3 - Individual Psychotherapy',
          id: '4',
        },
        {
          name: '94.39 - Other Individual Psychotherapy',
          id: '5',
        },
        {
          name: '94.4 - Other Psychotherapy and Counselling',
          id: '6',
        },
        {
          name: '94.5 - Referral for Psychologic Rehabilitation',
          id: '7',
        },
      ],

      selectSubCode: [
        {
          name: '93.81 - Recreation Therapy',
          id: '1',
        },
        {
          name: '93.82 - Education Therapy',
          id: '2',
        },
        {
          name: '93.83 - Occupational Therapy',
          id: '3',
        },
        {
          name: '94.84 - Music Therapy',
          id: '4',
        },
        {
          name: '94.85 - Vocational Rehabilitation (include sheltered employment; vocational; assessment; retraining; training)',
          id: '5',
        },
        {
          name: '93.89 - Rehabilitation (not elsewhere classified)',
          id: '6',
        },
        {
          name: '94.5 - Referral for Psychologic Rehabilitation',
          id: '7',
        },
      ],

      selectServices1: [
        {
          name: 'Making Referral',
          id: '1',
        },
        {
          name: 'Care Planning',
          id: '2',
        },
        {
          name: 'Welfare Assisstance',
          id: '3',
        },
        {
          name: 'Case Review',
          id: '4',
        },
      ],

      selectServices3: [
        {
          name: 'Employer',
          id: '1',
        },
        {
          name: 'Benefit Agency',
          id: '2',
        },
        {
          name: 'PERKESO: Job Agency',
          id: '3',
        },
        {
          name: 'Non Government Organization',
          id: '4',
        },
        {
          name: 'Unspecified 3rd Party Contact',
          id: '5',
        },
      ],

      selectLocation: [
        {
          name: 'On-site (MENTARI)',
          id: '1',
        },
        {
          name: 'Home Visit',
          id: '2',
        },
        {
          name: 'Workplace Visit',
          id: '3',
        },
        {
          name: 'Telephone or Virtual',
          id: '4',
        },
        {
          name: 'Main Hospital (Usually for CPS)',
          id: '5',
        },
        {
          name: 'Correspondence (Memo, Online Platform)',
          id: '6',
        },
        {
          name: 'External',
          id: '7',
        },
      ],

      selectClerking: [
        {
          name: 'Psychiatry Clerking',
          id: '1',
        },
        {
          name: 'Counsellor Clerking',
          id: '2',
        },
        {
          name: 'Patient Care Plan (For Consultation)',
          id: '3',
        },
        {
          name: 'Progress Note',
          id: '4',
        },
        {
          name: 'Counsellor Progress Note',
          id: '5',
        },
      ],


    

      model: {
        show1: true,
        //Visit Note
        //categoryServices: '',

      },
      formOptions: {
        // validationErrorClass: "has-error",
        // validationSuccessClass: "has-`success`",
        validateAfterChanged: true,
      },
      SchemaA:{
        groups: [
        // ICD10 -Type of Diagnosis
        {
          styleClasses: 'row col',
          legend: '',
          fields: [         
            {
                type: 'select',
                model: 'icd10Code',
                label: 'Type of Diagnosis',
                required: true,
                styleClasses: 'col-md-5',
                selectOptions: {
                  multiple: false,
                  key: 'name',
                  label: 'name',
                  searchable: true,
                  noneSelectedText: 'Select ICD 10 Code'
                },        
                values: () => {
                  return this.selectICD10Code
                },
                //To display sub code of ICD 10 (if required)
                // visible: (model, field, form) => {
                // return this.visibleServices2            
                // },   
            },
          ],
        },

          {
            styleClasses: 'row col',
            legend: '',
            fields: [
                {
                    type: 'radios',
                    label: 'Category of Services',
                    model: 'categoryServices',
                    required: true,
                    values: () => {
                        return this.selectCategory
                    },
                    styleClasses: 'col-md-12 display-inline spacing',
                },
            ],

        },
        
        {
            styleClasses: 'row col',
            legend: '',
            fields: [
                // Assisstance / Supervision
                {
                    type: 'select',
                    model: 'services1',
                    label: 'Select Category',
                    required: true,
                    styleClasses: 'col-md-5',
                    selectOptions: {
                        multiple: false,
                        key: 'name',
                        label: 'name',
                        searchable: true,
                        noneSelectedText: 'Select Category'
                    },        
                    values: () => {
                    return this.selectServices1
                    },
                    visible: (model, field, form) => {
                    return this.visibleServices1            
                    },            
                },
                // Clinical Work / Procedure             
                
                // External
                {
                    type: 'select',
                    model: 'services3',
                    label: 'Select Category',
                    required: true,
                    styleClasses: 'col-md-5',
                    selectOptions: {
                        multiple: false,
                        key: 'name',
                        label: 'name',
                        searchable: true,
                        noneSelectedText: 'Select Category'
                    },        
                    values: () => {
                    return this.selectServices3
                    },
                    visible: (model, field, form) => {
                    return this.visibleServices3           
                    },            
                },
            ],

        },
        // Clinical Work / Procedure
        {
            styleClasses: 'row col',
            legend: '',
            fields: [
              {
                    type: 'select',
                    model: 'icd9Code',
                    label: 'ICD 9 Code',
                    required: true,
                    styleClasses: 'col-md-5',
                    selectOptions: {
                        multiple: false,
                        key: 'name',
                        label: 'name',
                        searchable: true,
                        noneSelectedText: 'Select Code'
                    },        
                    values: () => {
                    return this.selectICD9Code
                    },
                    visible: (model, field, form) => {
                    return this.visibleServices2            
                    },            
                },
                {
                    type: 'select',
                    model: 'icd9subCode',
                    label: 'ICD 9 Sub Code',
                    required: true,
                    styleClasses: 'col-md-5',
                    selectOptions: {
                        multiple: false,
                        key: 'name',
                        label: 'name',
                        searchable: true,
                        noneSelectedText: 'Select Sub Code'
                    },        
                    values: () => {
                      return this.selectSubCode
                    },
                    visible: (model, field, form) => {                  
                        return this.visibleSubCode                      
                            
                    },            
                },
            ],
        },
        
        


        /*{
            styleClasses: 'row col',
            legend: '',
            fields: [
                {
                    type: 'select',
                    model: 'locationServices',
                    label: 'Location of Services',                   
                    required: true,
                    styleClasses: 'col-md-5',
                    selectOptions: {
                        multiple: false,
                        key: 'name',
                        label: 'name',
                        searchable: true,
                        noneSelectedText: 'Select Location of Services',
                    },        
                    values: () => {
                    return this.selectLocation
                    },
            
                },
            ],
        },*/
        
                   
        ]
      },
      SchemaB:{
        groups: [
        {
            styleClasses: 'row col',
            legend: '',
            fields: [
                {
                    type: 'select',
                    model: 'clerkingTemplate',
                    label: 'Clerking Template',
                    
                    required: true,
                    styleClasses: 'col-md-5',
                    selectOptions: {
                        multiple: false,
                        key: 'name',
                        label: 'name',
                        searchable: true,
                        noneSelectedText: 'Select Clerking Template',
                    },        
                    values: () => {
                    return this.selectClerking
                    },
            
                },
                {
                  type: 'input',
                  inputType: 'text',
                  label: 'Title',
                  model: 'title',
                  placeholder: 'Enter Title',
                  styleClasses: 'col-md-5',
                },
                
            ],
        },
                   
        ]
      },

      SchemaC:{
        groups: [
        {
            styleClasses: 'row col',
            legend: '',
            fields: [
              {
                type: 'textArea',
                model: 'medicationHistory',
                label: 'Medication History',
                //hint: 'Max 500 characters',
                max: 500,
                placeholder: 'Enter Medication History',
                rows: 4,
                required: true,
                styleClasses: 'col-md-12',
            
              }, 
                    
                
            ],
        },
        {
            styleClasses: 'row col',
            legend: '',
            fields: [
              {
                type: 'select',
                model: 'complexityService',
                label: 'Complexity of Service',
                    
                required: true,
                styleClasses: 'col-md-4',
                selectOptions: {
                  multiple: false,
                  key: 'name',
                  label: 'name',
                  searchable: true,
                  noneSelectedText: 'Select Complexity of Service',
                },

                values: () => {
                  return this.selectComplexity
                },
            
              }, 
              {
                type: 'select',
                model: 'outcome',
                label: 'Outcome',
                    
                required: true,
                styleClasses: 'col-md-4',
                selectOptions: {
                  multiple: false,
                  key: 'name',
                  label: 'name',
                  searchable: true,
                  noneSelectedText: 'Select Outcome',
                },

                values: () => {
                  return this.selectOutcome
                },
            
              }, 
              {
                type: 'select',
                model: 'dischargeOpt',
                label: 'Discharge Type',
                    
                required: true,
                styleClasses: 'col-md-4',
                selectOptions: {
                  multiple: false,
                  key: 'name',
                  label: 'name',
                  searchable: true,
                  noneSelectedText: 'Select Discharge Type',
                },

                values: () => {
                  return this.selectDischargeType
                },

                visible: (model, field, form) => {
                  return this.visibleDischargeType           
                },           
              },   
              {
                type: 'input',
                inputType: 'text',
                label: 'To Specify',
                model: 'title',
                placeholder: 'To Specify',
                styleClasses: 'col-md-4',
                visible: (model, field, form) => {
                  return this.visibleDischargeOthers           
                }, 
              },    
                
            ],
        },
                   
        ]
      },
      

    }
  },
  methods: {
    showmodal () {
      this.$modals.simpleModal.$show()
    },

    handleFileChange (e) {
      this.$emit('input', e.target.files[0])
      this.fileName1 = e.target.files[0].name
      console.log(e.target.files[0].name)

    },
    onComplete () {
      alert(JSON.stringify(this.model))
      // this.$router.push("/admin/director-details");
    },

    onModelUpdated (newVal, schema) {
        console.log(newVal)
        //services1
        if (schema === 'categoryServices') {
            if (newVal === '1'){
                this.visibleServices1 = true
            }else{
                this.visibleServices1 = false
                this.visibleSubCode = false
            }
            if (newVal === '2'){
                this.visibleServices2 = true
                this.visibleSubCode = false
            }else{
                this.visibleServices2 = false
                this.visibleSubCode = false
            }
            if (newVal === '3'){
                this.visibleServices3 = true
                this.visibleSubCode = false
            }else{
                this.visibleServices3 = false
                this.visibleSubCode = false
            }                        
        }

        if (schema === 'icd9Code') {
            if (newVal === '1'){
                this.visibleSubCode = true
            }else{
                this.visibleSubCode = false
            }
        }

        if (schema === 'outcome') {
            if (newVal === '5'){
                this.visibleDischargeType = true
            }
            else{
                this.visibleDischargeType = false
            }
            if (newVal === '6'){
                this.visibleDischargeOthers = true
            }
            else{
                this.visibleDischargeOthers = false
            }
        }
    },

  },
}
</script>
<!-- New step!
     Add Multiselect CSS. Can be added as a static asset or inside a component. -->
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
.app-layout__main {
  background: #e8e8e8;
}

.display-inline label {
  display: inline !important;
  align-content: center;
  margin-right: 10px;
}

.spacing label {
  margin-right: 200px;
}

.bar {
  position: sticky;
  left: 0;
  top: 0;
  height: auto;
  width: auto;
  z-index: 1000;
  background: rgba(248, 249, 250, 0.8);
  border-bottom: solid 1px rgb(248, 249, 250);
  backdrop-filter: blur(10px);

  --bar-button-active-color: #188038;
  --bar-button-open-color: #188038;
  --bar-button-active-bkg: #e6f4ea;
  --bar-button-open-bkg: #e6f4ea;
  --bar-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

.main {
  width: fit-content;
  min-width: 100%;
}

</style>
