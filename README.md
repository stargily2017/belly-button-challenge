# belly-button-challenge

![image](https://github.com/stargily2017/belly-button-challenge/assets/117419179/4b66e290-f045-4b72-957a-a93a84387078)

//Description:
The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

Demographic information is based on the user-selected test subject ID, for example, the initial ID is 940. A bar chart, bubble chart, and bonus gauge chart also update once the ID is changed. I didn't mention here the gauge chart. Code has been written using Plotly, JavaScript, HTML, CSS, and D3.js.
static shows images, app.js, index.html, samples.json

Plotly:

|Draw a bar chart and bubble chart displaying each individual's samplesto retrieve the demographic information for each samples. 

|Read in samples.json using the D3 library

|Retrieve metadata info for each test subject and display this in the form of an unordered list item as a key-value pair on the dashboard.

|Get required data for plotting, including sample_values, otu_ids and otu_labels which were used to create  and plot the bar chart.

|Only plot the top 10 in individual values, arrays were sliced ( .slice(0, 10).map(otu_ID => `OTU ${otu_ID}`).reverse())and reversed to display the chart as below.

![image](https://github.com/stargily2017/belly-button-challenge/assets/117419179/4812af4b-89f3-4af3-8efa-a6fbb07e38a3)


The entire sample arrays were used to plot a bubble chart.

![image](https://github.com/stargily2017/belly-button-challenge/assets/117419179/6dd10fa8-7d47-4700-951a-7903007261ba)


OUTLINE:

| function init() calls the resetData() function, populates the dropdown menu with test subject IDs from the dataset and displays data of the first subject as a starting point.

 names.forEach((id) => {

    dropDown.append("option")
          .text(id)
          .property("value",id);
      });
init();
| function optionChanged() use recall all the data to the dropdown menu(on change), and select any of the samples(new ID) for example, need to get the data 948, in the drop-down menu select 950, can see the changes.we can see the changes in the barchart and bubble diagram for each sample.

<img width="947" alt="image" src="https://github.com/stargily2017/belly-button-challenge/assets/117419179/1117af27-2501-474f-bb40-808721a112b0">

|filter each sample in function ( bar chart , bubble diagram , metadata ): .filter(x => x.id == sample);

final result:

http://localhost:52330/Starter_Code%2014/StarterCode/index.html


