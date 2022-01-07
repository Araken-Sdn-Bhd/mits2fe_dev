<template>
  <div class="template">
    <div class="header" style="margin-bottom: 4rem; margin-top: 1rem;">
      <img src="./kkmLogo.png" style="width: 200px;">
      <h2 style="margin-top: 2rem;">
      <span contenteditable @keydown="preventLineBreaks">Counsellor Clerking Note</span>
      </h2>
      
      <img src="./mentariLogo.png" style="width: 200px; height: auto;">      
    </div>
    
    <div class="hide-in-print">
      This is Counsellor Clerking Note template. This will hide in print.
    </div>
        <!-- <div class="hide-in-print" style="margin-bottom: 10px;">
          This is Psychiatric Clerking Note template.<br>You can modify the fields highlighted in green and interact with the buttons without having them in the print. 
        </div> -->

      
    
    <table>
      <thead>
        <tr>
          <td>PATIENT DETAILS:</td>
          <td style="text-align: right;"></td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <!-- <div><b>MRN:</b> <span contenteditable @keydown="preventLineBreaks">{{invoice_number}}</span></div> -->
            <div><b>MRN:</b> <span contenteditable @keydown="preventLineBreaks">{{invoice_number}}</span></div>
            <div><b>PATIENT NAME:</b> <span contenteditable @keydown="preventLineBreaks">MR. Muhammad</span></div>
            <div><b>NRIC NO. :</b> <span contenteditable @keydown="preventLineBreaks">810109-12-5873</span></div>
            <div><b>AGE:</b> <span contenteditable @keydown="preventLineBreaks">40</span></div>
            <div><b>CONTACT NO.:</b> <span contenteditable @keydown="preventLineBreaks">012-3456789</span></div>
            <div><b>DATE:</b> <span contenteditable @keydown="preventLineBreaks">{{today}}</span></div>
            <div><b>TIME:</b> <span contenteditable @keydown="preventLineBreaks">9:00 AM</span></div>            
          </td>
          <!-- CONTOH UNTUK ALL TEXT EDITABLE-->
          <!--<td contenteditable>
            <div><b>MyCompany</b></div>
            <div>24 Poazkz Pazoek</div>
            <div>89232 Oijzrazro</div>
            <div>FRIGNEDRY</div>
            <div>AB251648730890</div>
          </td> -->
          <!-- CONTOH EDITABLE COLUMN 2ND WITH TEXT-ALIGN : RIGHT -->
          <!-- <td style="min-width: 250px; text-align: right;">
            <div><b>Invoice number:</b> <span contenteditable @keydown="preventLineBreaks">{{invoice_number}}</span></div>
            <div><b>Invoice date:</b> <span contenteditable @keydown="preventLineBreaks">{{today}}</span></div>
            <div><b>Order number:</b> <span contenteditable @keydown="preventLineBreaks">W210984204</span></div>
            <div><b>Order date:</b> <span contenteditable @keydown="preventLineBreaks">{{today}}</span></div>
            <div><b>Your client number:</b> <span contenteditable @keydown="preventLineBreaks">120948</span></div>
          </td> -->
        </tr>
      </tbody>
    </table>
    <table>
      <thead>
        <tr>
          <td>STAFF DETAILS:</td>
          <td style="text-align: right;"></td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div><b>STAFF NAME:</b> <span contenteditable @keydown="preventLineBreaks">DR. Zahidah binti Hamzah</span></div>
            <div><b>DESIGNATION :</b> <span contenteditable @keydown="preventLineBreaks">Specialist</span></div>
            <div><b>ROOM NO. :</b> <span contenteditable @keydown="preventLineBreaks"></span></div>
          </td>
        </tr>
      </tbody>
    </table>

    <table style="margin-top: 10px;" class="order-table">
      <thead>
        <tr style="font-size: 13px;">
          <td>NO. </td>
          <td>DIAGNOSIS</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) of items" :key="item.key">
          <td><div class="left-btn hide-in-print" @click="() => items.splice(i, 1)">➖</div>{{i+1}}</td>
          <td contenteditable>{{item.desc}}</td>        
        </tr>
        <tr>
          <td><div v-if="items.length < 5" class="left-btn hide-in-print" @click="() => items.push({ key: Math.random(), ref: 'MyRef', desc: 'Enter Diagnosis 2', qty: 1, price: 0 })">➕</div></td>          
        </tr>

      </tbody>
    </table>
    <br />
    <!--<div style="margin-bottom: 20px;">Thank you for your order.</div>
    <div><b>Payment method:</b> <span contenteditable @keydown="preventLineBreaks">Bank transfer</span></div> -->
    <div><b>NEXT VISIT SCHEDULE:</b> <span contenteditable @keydown="preventLineBreaks">{{next_month}}</span></div>
  </div>
</template>

<script>
import Table from '@/components/Table.vue';
export default {
  props: {
    invoice_number: String
  },
  data () {
    return {
      is_shipping_identical: true,
      billing_address: "<b>M. John Doe</b><br>98 Ooezfjefoi Laozdij<br>09823 Ljeiznr<br>FOPKSOFOF<br>AC310592815039",
      items: [{ key: Math.random(), ref: "X3000", desc: "Enter Diagnosis", qty: 1, price: 299 }],
      tax_percent: 20,
      shipping: 15
    }
  },
  mounted () {
    // initialize contenteditable fields manually
    this.$refs.billing_address.innerHTML = this.billing_address;
    this.$refs.tax_percent.innerHTML = this.tax_percent;
    this.$refs.shipping.innerHTML = this.shipping+".00";
  },
  computed: {
    today () {
      var date = new Date();
      return date.toJSON().slice(0,10).replace(/-/g,'.');
    },
    todayTime () {
      var date = new Time();
      return date.toJSON().slice(0,10).replace(/-/g,'.');
    },
    next_month () {
      var date = new Date();
      date.setDate(date.getDate() + 30);
      return date.toJSON().slice(0,10).replace(/-/g,'.');
    },
    sub_total () {
      return this.items.reduce((acc, item) => acc += item.qty * item.price, 0);
    },
    total () {
      return this.sub_total * (1 + this.tax_percent/100) + this.shipping;
    }
  },
  methods: {
    preventLineBreaks (e) { if(e.which == 13) e.preventDefault(); }
  }
}
</script>

<style scoped>
  table {
    width: 100%;
    border-spacing: 0;
  }

  table td {
    position: relative;
    padding: 6px;
    vertical-align: top;
  }

  table.order-table td {
    vertical-align: middle;
  }

  table thead td {
    font-weight: bold;
  }

  table tbody td {
    border-top: solid 1px #cccccc;
  }

  input[type=number] {
    border: none;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    background: rgba(200, 250, 230, 0.2);
    padding: 6px;
  }

  *[contenteditable=true] {
    background: rgba(200, 250, 230, 0.2);
    transition: padding 0.05s linear;
  }

  span[contenteditable=true]:focus {
    padding: 0 4px;
  }

  @media print {
    *[contenteditable=true],
    input {
      background: none;
    }

    .hide-in-print {
      display: none;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input[type=number] {
      -moz-appearance: textfield;
      background: none;
    }
  }

  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .order {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .left-btn {
    position: absolute;
    left: -40px;
    top: 2px;
  }

  .left-btn:hover {
    opacity: 0.6;
  }

</style>