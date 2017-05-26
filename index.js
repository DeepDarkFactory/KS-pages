import './src/css/index.css';
import 'nprogress/nprogress.css'
import 'normalize.css';


import nprogress from "nprogress";
import d3 from "./src/js/d3.v3.min"
import cloud from "d3-cloud";
import { simple,word } from "./src/js/arr.js"


  let fill = d3.scale.category20();


 window.reset= function (word){
      nprogress.start();
      setTimeout(function(){
        document.querySelectorAll('.svg-contain')[0].innerHTML='';
      cloud().size([300, 300])
      .words(word.map(function(d) {
        return {text: d, size: 10 + Math.random() * 90};
      }))
      .rotate(function() { return ~~(Math.random() * 2) * 90; })
      .font("Impact")
      .fontSize(function(d) { return d.size; })
      .on("end", draw)
      .start();
        nprogress.done();
      },100)
  }

window.word=word;
  function draw(words) {
    let width=800;
    d3.select(".svg-contain").append("svg")
        .attr("width", width)
        .attr("height", width)
      .append("g")
        .attr("transform", "translate(301,300)scale(2.0084033012390137,2.0084033012390137)")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("font-family", "Impact")
        .style("fill", function(d, i) { return fill(i); })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });
  }
  
reset(simple)