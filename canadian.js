// Source: http://www.canadastop100.com/
console.log(Vue.version);
var laptopData = [{
  "name": "3M Canada Company",
  "Community Involvement": 10,
  "Employee Engagement & Performance": 7,
  "Financial Benefits & Compensation": 9,
  "Health & Family-Friendly Benefits": 9,
  "Physical Workplace": 10,
  "Training & Skills Development": 9,
  "Vacation & Personal Time-Off": 6,
  "Work Atmosphere & Communications": 10,
  "Total Score": 70
}, {
  "name": "Aboriginal Peoples Television Network Inc. / APTN",
  "Community Involvement": 9,
  "Employee Engagement & Performance": 6,
  "Financial Benefits & Compensation": 7,
  "Health & Family-Friendly Benefits": 9,
  "Physical Workplace": 7,
  "Training & Skills Development": 9,
  "Vacation & Personal Time-Off": 9,
  "Work Atmosphere & Communications": 9,
  "Total Score": 65
}, {
  "name": "Accenture Inc.",
  "Community Involvement": 10,
  "Employee Engagement & Performance": 9,
  "Financial Benefits & Compensation": 7,
  "Health & Family-Friendly Benefits": 9,
  "Physical Workplace": 7,
  "Training & Skills Development": 7,
  "Vacation & Personal Time-Off": 6,
  "Work Atmosphere & Communications": 9,
  "Total Score": 64
}];
console.log('test');
Vue.component('data-grid', {
  template: '#data-template',
  props: {
    data: Array,
    columns: Array,
    filterKey: String
  },
  data: function() {
    var sortOrders = {}
    this.columns.forEach(function(key) {
      sortOrders[key] = 1
    })
    return {
      sortKey: '',
      sortOrders: sortOrders
    }
  },
  computed: {
    filteredData: function() {
      var sortKey = this.sortKey
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var order = this.sortOrders[sortKey] || 1
      var data = this.data
      if (filterKey) {
        data = data.filter(function(row) {
          return Object.keys(row).some(function(key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) {
        data = data.slice().sort(function(a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return data
    }
  },
  filters: {
    capitalize: function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  methods: {
    sortBy: function(key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    }
  }
})

var vueApp = new Vue({
  el: '#vue-app',
  data: {
    searchQuery: '',
    gridColumns: Object.keys(laptopData[0]),
    gridData: laptopData
  }
})
