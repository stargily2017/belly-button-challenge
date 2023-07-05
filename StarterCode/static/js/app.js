function init() {
    // Grab a reference to the dropdown select element
    let selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("samples.json").then((data) => {
      let sampleNames = data.names;
  
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      // Use the first sample from the list to build the initial plots
      let firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
  
  // Initialize the dashboard
  init();
  
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildMetadata(newSample);
    buildCharts(newSample);
    
  }
  
  // Demographics Panel 
  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      let metadata = data.metadata;
      // Filter the data for the object with the desired sample number
      let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      let result = resultArray[0];
      // Use d3 to select the panel with id of `#sample-metadata`
      let PANEL = d3.select("#sample-metadata");
  
      // Use `.html("") to clear any existing metadata
      PANEL.html("");
  
      // Use `Object.entries` to add each key and value pair to the panel
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
  
    });
  }
  
  // Create the buildCharts function.
  function buildCharts(sample) {
    // Use d3.json to load and retrieve the samples.json file 
    d3.json("samples.json").then((data) => {
      // Create a variable that holds the samples array. 
      let samplesArray = data.samples;
      console.log(samplesArray)
  
      // Create a variable that filters the samples for the object with the desired sample number.
      let filtered = samplesArray.filter(sampleObj => sampleObj.id == sample);
      console.log(filtered)
  
      // Create a variable that filters the metadata array for the object with the desired sample number.
      let metadata = data.metadata;
      let filtered2 = metadata.filter(sampleObj => sampleObj.id == sample);
  
      // Create a variable that holds the first sample in the metadata array.
      let result = filtered2[0];
  
      // Create a variable that holds the first sample in the array.
      let theSample = filtered[0]
      console.log(theSample)
  
      // Create variables that hold the otu_ids, otu_labels, and sample_values.
      let otu_ids = theSample.otu_ids
      let otu_labels = theSample.otu_labels
      let sample_values = theSample.sample_values
      console.log(otu_ids)
      console.log(otu_labels)
      console.log(sample_values)
  
      // Create a variable that holds the washing frequency.
      let wfreq = parseFloat(result.wfreq)
      console.log(wfreq)
  
      // Create the y ticks for the bar chart.
      let yticks = otu_ids.slice(0,10).map(ids => `OTU ${ids}`).reverse();
      console.log(yticks);
  
      // Create the trace for the bar chart. 
      let barData = [{
        x: sample_values.slice(0,10).reverse(),
        y: yticks,
        text: otu_labels.slice(0,10).reverse(),
        type: "bar",
        orientation: "h"
      }];
  
      // Create the layout for the bar chart. 
      let barLayout = {
        title : "Top 10 Bacteria Cultures Found",
        margin: { t: 50, l: 200 }
      };
      // Use Plotly to plot the data with the layout. 
      Plotly.newPlot("bar", barData, barLayout);
      
      // Create the trace for the bubble chart.
      let bubbleData = [{
        x: otu_ids ,
        y: sample_values ,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "Earth"
        }
      }];
  
      // Create the layout for the bubble chart.
      let bubbleLayout = {
        margin: { t: 0 },
      xaxis: { title: "OTU ID" },
      hovermode: "closest",
      };
  
      // Use Plotly to plot the data with the layout.
      Plotly.newPlot("bubble", bubbleData, bubbleLayout); 

  });
};