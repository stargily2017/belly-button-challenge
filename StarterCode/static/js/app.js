
// Load the URL into a constant variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
d3.json(url).then(function(data){
    console.log(data);
    //set a variable for the samples
    let sample= data.samples;
    //filter the initial sample id 940 and console log it
    let textSample = sample.filter(x => x.id == 940);

    console.log(textSample);
    //pull up the initial sample data and console log it
    let result = textSample[0];
    console.log(result);
    //set a variable for otu_ids, otu_labels, sample_values
    let otu_ids = result.otu_ids;
    let otu_labels = result.otu_labels;
    let sample_values = result.sample_values;
    
   //plot the bar chart for the top 10 otus
   //collect the otu_ids for y values and  slice for the first ten values. 
   //sample values in x axis , .reverse give to the id in descending order from the origin

    let bar_data =[
        {
          y:otu_ids.slice(0, 10).map(otu_ID => `OTU ${otu_ID}`).reverse(),
          x:sample_values.slice(0,10).reverse(),
          text:otu_labels.slice(0,10).reverse(),
          type:"bar",
          orientation:"h"
    
        }
      ];
    //layout for the top ten otus, title and margin
    let barLayout = {
        title: "The top 10 OTUs",
        margin: { t: 50, l: 200 }
      };

    // Render the plot to the div tag with id "bar"
      Plotly.newPlot("bar", bar_data, barLayout);

    //plot the bubble chart layout with x axix with title and hovermode
    ///Use sample_values for the y values.
    //Use sample_values for the marker size.
    //Use otu_ids for the marker colors.
    //Use otu_labels for the text values.
    // data with x axis otu_id and y axis sample_values  
    let DataBubble = [ 
        {
          x: otu_ids,
          y: sample_values,
          text: otu_labels,
          mode: "markers",
          marker: {
            color: otu_ids,
            size: sample_values,
            colorscale: "Earth"
            }
        }
      ];

      let LayoutBubble = {
        margin: { t: 0 },
        xaxis: { title: "OTU ID" },
        hovermode: "closest",
        };

    // Render the plot to the div tag with id "bubble"
      Plotly.newPlot("bubble", DataBubble, LayoutBubble);
   
      
  });

  d3.json(url).then(function(data){
    console.log(data);
        let metaData = data.metadata;

        // Filter metadata for the initial sample and console log it
        let textmetaData = metaData.filter(x => x.id == 940);

        console.log(textmetaData);

        // Get the first sample 
        let valueData = textmetaData[0];

        // Clear out metadata
        d3.select("#sample-metadata").html("");

        // Use Object.entries to add each key/value pair to the panel
        //console log it to the pair
        Object.entries(valueData).forEach(([key,value]) => {

        console.log(key,value);
        //sample metadata to append to text size h5 to HTML
        d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });


  
