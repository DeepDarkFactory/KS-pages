import './src/css/index.css';
import 'nprogress/nprogress.css'
import 'normalize.css';


import nprogress from "nprogress";
import d3 from "./src/js/d3.min.js"
import cloud from "d3-cloud";
import { simple, word } from "./src/js/arr.js"
import axios from "axios"
let fill = d3.scale.category20();

// Send a POST request 

document.querySelector(".btn-primary").onclick=function(){
  request(document.querySelector('.text-input').value)
}

document.querySelectorAll(".singer-name").forEach(ele=>ele.onclick=function(){request(ele.innerHTML)})

let request=function (val) {
  axios({
    method: 'get',
    url: 'http://112.74.111.33:3000/163',
    params: {
      name: val
    }
  }).then(d => reset(d.data))
    .catch(()=>alert("没有此歌手"));
}

 let reset = function (word) {
  nprogress.start();
  setTimeout(function () {
    document.querySelectorAll('.svg-contain')[0].innerHTML = '';
    cloud().size([950, 550])
      .words(word.slice(0, Math.min(word.length, 250)).map(function (d, i) {
        return { text: d.key, size: d3.scale["log"]().range([10, 30])(d.value) };
      }))
      .padding(5)
      .rotate(function () { return (~~(Math.random() * 6) - 3) * 30; })
      .font("Impact")
      .fontSize(d => d.size)
      .on("end", draw)
      .start();
    nprogress.done();
  }, 50)
}


function draw(words) {
  d3.select(".svg-contain").append("svg")
    .attr("width", 960)
    .attr("height", 600)
    .append("g")
    .attr("transform", "translate(480,280)")
    .selectAll("text")
    .data(words)
    .enter().append("text")
    .style("font-size", function (d) { return d.size + "px"; })
    .style("font-family", "Impact")
    .style("fill", function (d, i) { return fill(i); })
    .attr("text-anchor", "middle")
    .attr("transform", function (d) {
      return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
    })
    .text(function (d) { return d.text; });
}