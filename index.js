

function makeChart(id) {

    let width = 800;
    let height = 600;

    let margins = {top: 20, right: 20, bottom: 40, left: 40};
    let innerWidth = width - margins.left - margins.right;
    let innerHeight = height - margins.top - margins.bottom;

    let chart = d3.select("#" + id);
    chart.append("rect")
        .attr("x", margins.left)
        .attr("y", margins.top)
        .attr('width', width)
        .attr("height", height)
        .style("fill", "white");




    d3.csv("impeachment-polls.csv", function (d) {
        var parseDate = d3.timeParse("%Y-%m-%d");
        return {
            rYes: +d["Rep Yes"],
            dYes: +d["Dem Yes"],
            iYes: +d["Ind Yes"],
            date: parseDate(d.End),
            category: d.Category
        }
    }).then(function (dataset) {

        let xScale = d3.scaleBand().domain(dataset.map(d => d.category)).range([0, innerWidth])
            .padding(0.2);
        yScale = d3.scaleLinear().domain([0, 100]).range([innerHeight, 0]);
        let scaleBand = d3.scaleBand();


        chart.append("g")
            .attr("transform",`translate(${margins.left},${margins.top + innerHeight})`)
            .call(d3.axisBottom(xScale));

        chart.append("g")
            .attr("transform", `translate(${margins.left},${margins.top})`)
            .call(d3.axisLeft(yScale));


        scaleBand.domain(['category1','category2','category3']).range([0,xScale.bandwidth()]);
        var model = chart.selectAll(".model")
            .data(dataset).enter().append("g").attr("class", "model")
            .attr("transform", d => `translate(${xScale(d.category)},0)`);

        model.selectAll(".bar1").data(d=> [d]).enter().append("rect").attr("class", "bar_1")
            .attr("width", scaleBand.bandwidth())
            .attr("height", d => {
                return height -40 - yScale(d.rYes)})
            .attr("x", d => scaleBand('category1'))
            .attr("y",  d => yScale(d.rYes))
            .style("fill", "darkred");

        model.selectAll(".bar2").data(d=> [d]).enter().append("rect").attr("class", "bar_2")
            .attr("width", scaleBand.bandwidth())
            .attr("height", d => {
                return height -40 - yScale(d.dYes)})
            .attr("x", d => scaleBand('category2'))
            .attr("y",  d => yScale(d.dYes))
            .style("fill", "darkblue");

        model.selectAll(".bar3").data(d=> [d]).enter().append("rect").attr("class", "bar_3")
            .attr("width", scaleBand.bandwidth())
            .attr("height", d => {
                return height -40 - yScale(d.iYes)})
            .attr("x", d => scaleBand('category3'))
            .attr("y",  d => yScale(d.iYes))
            .style("fill", "darkgreen");
    });
}
