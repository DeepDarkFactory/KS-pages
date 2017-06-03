import './src/css/index.css';
// import 'nprogress/nprogress.css'
import 'normalize.css';


// import nprogress from "nprogress";
import d3 from "./src/js/d3.min.js"

import cloud from "d3-cloud";
import { word } from "./src/js/arr.js"
import axios from "axios"
var fill = d3.scale.category20();
// window.word=word

// // Send a POST request 


// document.querySelector(".btn-primary").onclick = function () {
//   request(document.querySelector('.text-input').value)
// }

// document.querySelectorAll(".singer-name").forEach(ele => ele.onclick = function () { request(ele.innerHTML) })

// let request = function (val) {
//   axios({
//     method: 'get',
//     url: 'http://112.74.111.33:3000/163',
//     params: {
//       name: val
//     }
//   }).then(d => {window.a=draw(word)})
//     .catch(() => alert("没有此歌手"));
// }

// let reset = function (word) {
//   // nprogress.start();

//   cloud().size([950, 550])
//     .words(word.slice(0, Math.min(word.length, 250)).map(function (d, i) {
//       return { text: d.key, size: d3.scale["log"]().range([10, 30])(d.value) };
//     }))
//     .padding(5)
//     .rotate(function () { return (~~(Math.random() * 6) - 3) * 30; })
//     .font("Impact")
//     .fontSize(d => d.size)
//     .on("end", draw)
//     .start();
//   // nprogress.done();

// }


// function draw(word) {
//   var svg = d3.select(".svg-contain").append("svg")
//     .attr("width", 960)
//     .attr("height", 600)
//     .append("g")
//     .attr("transform", "translate(480,280)")


//   var clouder = svg.selectAll("g text")
//     .data(word, function (d) { return d.text; })

//   // .selectAll("text")
//   //   .data(words)
//   //   .enter().append("text")
//   //   .style("font-size", function (d) { return d.size + "px"; })
//   //   .style("font-family", "Impact")
//   //   .style("fill", function (d, i) { return fill(i); })
//   //   .attr("text-anchor", "middle")
//   //   .attr("transform", function (d) {
//   //     return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
//   //   })
//   //   .text(function (d) { return d.text; });
//   function transition() {
//     clouder.enter()
//       .append("text")
//       .style("font-family", "Impact")
//       .style("fill", function (d, i) { return fill(i); })
//       .attr("text-anchor", "middle")
//       .attr('font-size', 1)
//       .text(function (d) { return d.key; });


//     clouder
//       .transition()
//       .duration(600)
//       .style("font-size", function (d) { return d.size + "px"; })
//       .attr("transform", function (d) {
//         return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
//       })
//       .style("fill-opacity", 1);


//     //Exiting words
//     clouder.exit()
//       .transition()
//       .duration(200)
//       .style('fill-opacity', 1e-6)
//       .attr('font-size', 1)
//       .remove();

//   }
//   return {
//     update(word) {
//       cloud().size([950, 550])
//         .words(word.slice(0, Math.min(word.length, 250)).map(function (d, i) {
//           console.log(d)
//           return { text: d.key, size: d3.scale["log"]().range([10, 2000])(d.value) };
//         }))
//         .padding(5)
//         .rotate(function () { return (~~(Math.random() * 6) - 3) * 30; })
//         .font("Impact")
//         .fontSize(d => d.size)
//         .on("end", transition)
//         .start();
//     }
//   }
// }

//---------------------------------------------------------------------------------------------------------------------------------


function wordCloud(selector) {


    var fill = d3.scale.category20();


    //Construct the word cloud's SVG element
    var svg = d3.select(selector).append("svg")
        .attr("width", 500)
        .attr("height", 500)
        .attr("transform", "translate(250,50)")
        .append("g")
        .attr("transform", "translate(250,250)");




    //Draw the word cloud
    function draw(words) {
        var cloud = svg.selectAll("g text")
                        .data(words, function(d) { return d.text; })
        //Entering words
        cloud.enter()
            .append("text")
            .style("font-family", "Impact")
            .style("fill", function(d, i) { return fill(i); })
            .attr("text-anchor", "middle")
            .attr('font-size', 1)
            .text(function(d) { return d.text; });


        //Entering and existing words
        cloud
            .transition()
                .duration(600)
                .style("font-size", function(d) { return d.size + "px"; })
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .style("fill-opacity", 1);


        //Exiting words
        cloud.exit()
            .transition()
                .duration(200)
                .style('fill-opacity', 1e-6)
                .attr('font-size', 1)
                .remove();
    }




    //Use the module pattern to encapsulate the visualisation code. We'll
    // expose only the parts that need to be public.
    return {


        //Recompute the word cloud for a new set of words. This method will
        // asycnhronously call draw when the layout has been computed.
        //The outside world will need to call this function, so make it part
        // of the wordCloud return value.
        update: function(words) {
            cloud().size([500, 500])
                .words(words)
                .padding(5)
                .rotate(function () { return (~~(Math.random() * 6) - 3) * 30; })
                .font("Impact")
                .fontSize(function(d) { return d.size; })
                .on("end", draw)
                .start();
        }
    }


}


//Some sample data - http://en.wikiquote.org/wiki/Opening_lines

//Prepare one of the sample sentences by removing punctuation,
// creating an array of words and computing a random size attribute.
function getWords(i) {
  // words[i]
  //           .replace(/[!\.,:;\?]/g, '')
  //           .split(' ')
    return word.map(function(d) {
                return {text: d.key, size: 10 + Math.random() * 60};
            })
}


//This method tells the word cloud to redraw with a new set of words.
//In reality the new words would probably come from a server request,
// user input or some other source.
function showNewWords(vis, i) {
    i = i || 0;


    vis.update(getWords(i ++ % words.length))
    //setTimeout(function() { showNewWords(vis, i + 1)}, 2000)
}


//Create a new instance of the word cloud visualisation.
var myWordCloud = wordCloud('.svg-contain');


//Start cycling through the demo data
showNewWords(myWordCloud);

