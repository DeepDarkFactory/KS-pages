import 'normalize.css';                                     //css reset
import 'pure-css-loader/dist/css-loader.css'                //css-loading 样式


import d3 from "./src/js/d3.min.js"
import cloud from "d3-cloud";
import axios from "axios";
var fill = d3.scale.category20();
var loader = d3.select('.loader'); //css loader
var msg = ['服务器君tm射爆卡 (╯‵□′)╯︵┻━┻', '你快回来，把我的数据还回来(⊙ˍ⊙)', '假猪套天下第一 🐷', '把他娘的意大利....面拿出来 ?ω?', '我反手就是一个....小心心你要吗💗']

var fill = d3.scale.category20();

//构造词云容器svg元素
var svg = d3.select('.svg-contain').append("svg")
    .attr("width", 960)
    .attr("height", 500)
    .attr("transform", "translate(0,35)")
    .append("g")
    .attr("transform", "translate(480,250)");



document.querySelector('.text-input').onkeydown = function (e) {

    if (e.keyCode == 13) {
        request(this.value)
    }
}

document.querySelector(".btn-primary").onclick = function () {
    request(document.querySelector('.text-input').value)
}


{
    if (!NodeList.prototype.forEach) {
        NodeList.prototype.forEach = Array.prototype.forEach;
    }
    document.querySelectorAll(".singer-name").forEach(ele => ele.onclick = function () {
        request(ele.innerHTML)
    })
}

let request = function (val) {
    loader.classed('is-active', true)
        .attr('data-curtain-text', msg[Math.floor(msg.length * Math.random())])
    axios({
        method: 'get',
        url: 'https://kspider.nbsaw.com/163',
        params: {
            name: val
        }
    }).then(d => {
        showNewWords(wordCloud(), d.data);
    })
        .catch(() => {
            loader.classed('is-active', () => false);
            alert("没有此歌手")
        });
}



function wordCloud(selector) {
    //画出词云函数

    function draw(words) {
        var cloud = svg.selectAll("g text")
            .data(words, function (d) {
                return d.text;
            })
        /**
         * 给每个词赋上css属性，添加进容器里
         */
        cloud.enter()
            .append("text")
            .style("font-family", "Impact")
            .style("fill", function (d, i) {
                return fill(i);
            })
            .attr("text-anchor", "middle")
            .attr('font-size', 1)
            .text(function (d) {
                return d.text;
            })



        //词云入场动画
        cloud.transition()
            .duration(600)
            .style("font-size", function (d) {
                return d.size + "px";
            })
            .attr("transform", "transform: translate(0,0)")
            .attr("transform", function (d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .style("fill-opacity", 1);



        cloud.exit()
            .transition()
            .duration(200)
            .style('fill-opacity', 1e-6)
            .attr('font-size', 1)
            .remove();
    }



    return {

        update: function (words) {
            cloud().size([960, 500])
                .words(words)
                .padding(5)
                .rotate(function () {
                    return (~~(Math.random() * 6) - 3) * 30;
                })
                .font("Impact")
                .fontSize(function (d) {
                    return d.size;
                })
                .on("end", draw)
                .start();

            loader.classed('is-active', () => false);
        }
    }


}

function showNewWords(vis, word) {

    vis.update(word.slice(0, Math.min(200, word.length)).map(function (d) {
        return {
            text: d.key,
            size: d3.scale["log"]().range([10, 30])(d.value)
        };
    }))

}

