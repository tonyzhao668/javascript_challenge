// from data.js
var tableData = data;

//console.log(tableData);

//select tbody, button, input tags
var tbody = d3.select("tbody");
var button = d3.select("#filter-btn");
//var form = d3.select("form");

//relate event with filter function
button.on("click", runFilter);
//form.on("submit", runFilter);

var and_string = "obj.datetime === date && obj.city === city && obj.state === state && obj.country === country && obj.shape === shape";

var and_list = and_string.split(" && ");

function runFilter() {

    // Prevent the page from refreshing
    d3.event.preventDefault();

  
    var date = d3.select("#datetime").property("value");
    var city = d3.select("#city").property("value");
    var state = d3.select("#state").property("value");
    var country = d3.select("#country").property("value");
    var shape = d3.select("#shape").property("value");
    var filter_list = [date, city, state, country, shape];

    var and_del = ["d", "d", "d","d","d"];

    filter_list.forEach((item, index) => item === "" ? and_del[index] = and_list[index] : console.log(index));
    //console.log(and_list);
    console.log(and_del);

    //build the final search string : final_and_string
    var final_and_list = and_list.filter(each => and_del.indexOf(each) === -1);
    
    console.log(final_and_list);

    var final_and_string;

    final_and_list.length > 1 ? final_and_string = final_and_list.join(" && ") : final_and_string = final_and_list[0];
    
    console.log(final_and_string);

    //filter the data as the user's input

     var filtedData = tableData.filter(obj => eval(final_and_string));

    console.log(filtedData);

    //clear the children items
    tbody.html("");

    //fill in the above results into the final table
    filtedData.forEach(obj => {

      //append new table row
      var row = tbody.append("tr");  
      Object.entries(obj).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
        });
      });
}
