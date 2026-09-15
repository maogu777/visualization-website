
const chapterData = {
  "1": { title: "可视化网站基础", subtitle: "认识网站结构，建立从网页到可视化的整体概念。" },
  "2": { title: "HTML 页面搭建", subtitle: "使用 HTML 搭建一个完整的网页骨架。" },
  "3": { title: "CSS 页面设计", subtitle: "使用 CSS 控制颜色、布局、卡片与响应式效果。" },
  "4": { title: "JavaScript 交互", subtitle: "让网页能够响应用户操作并动态改变内容。" },
  "5": { title: "D3.js 可视化", subtitle: "从数据出发，用 D3.js 绘制第一个交互式图表。" },
  "6": { title: "数据与交互", subtitle: "加载、筛选和更新数据，让图表真正与用户联动。" },
  "7": { title: "完整网站制作与部署", subtitle: "综合 HTML、CSS、JavaScript 和 D3.js 完成一个小型项目。" }
};

function initTabs() {
  document.querySelectorAll(".tabs").forEach(tabs => {
    const buttons = tabs.querySelectorAll(".tab-btn");
    const panels = tabs.parentElement.querySelectorAll(":scope > .tab-panel");
    buttons.forEach((btn, i) => {
      btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        panels.forEach(p => p.classList.remove("active"));
        btn.classList.add("active");
        if (panels[i]) panels[i].classList.add("active");
      });
    });
  });
}

function demo1() {
  const title = document.getElementById("demo1Title");
  const input = document.getElementById("demo1Input");
  const btn = document.getElementById("demo1Btn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    title.textContent = input.value.trim() || "我的第一个可视化网站";
  });
}

function demo2() {
  const btn = document.getElementById("demo2Btn");
  const box = document.getElementById("demo2Box");
  if (!btn) return;
  btn.addEventListener("click", () => {
    box.innerHTML = "<h3>HTML 生成的新内容</h3><p>这个区域由 JavaScript 动态插入。</p><button>示例按钮</button>";
  });
}

function demo3() {
  const box = document.getElementById("demo3Box");
  document.querySelectorAll("[data-color]").forEach(btn => {
    btn.addEventListener("click", () => {
      box.style.background = btn.dataset.color;
    });
  });
}

function demo4() {
  let count = 0;
  const value = document.getElementById("counterValue");
  document.querySelectorAll("[data-counter]").forEach(btn => {
    btn.addEventListener("click", () => {
      count += Number(btn.dataset.counter);
      value.textContent = count;
    });
  });
}

function demo5() {
  const svg = document.getElementById("barChart");
  if (!svg || !window.d3) return;
  const data = [
    {name:"HTML", value:70}, {name:"CSS", value:55},
    {name:"JS", value:85}, {name:"D3", value:95}
  ];
  const width = 620, height = 300;
  const margin = {top:20,right:20,bottom:50,left:45};
  const x = d3.scaleBand().domain(data.map(d=>d.name)).range([margin.left,width-margin.right]).padding(.25);
  const y = d3.scaleLinear().domain([0,100]).range([height-margin.bottom,margin.top]);
  const root = d3.select(svg).attr("viewBox", `0 0 ${width} ${height}`);
  root.selectAll("*").remove();
  root.append("g").attr("transform",`translate(0,${height-margin.bottom})`).call(d3.axisBottom(x));
  root.append("g").attr("transform",`translate(${margin.left},0)`).call(d3.axisLeft(y));
  root.selectAll("rect").data(data).join("rect")
    .attr("x",d=>x(d.name)).attr("y",d=>y(d.value))
    .attr("width",x.bandwidth()).attr("height",d=>y(0)-y(d.value))
    .attr("rx",6)
    .on("mouseenter", function(){ d3.select(this).attr("opacity",.65); })
    .on("mouseleave", function(){ d3.select(this).attr("opacity",1); });
}

function demo6() {
  const data = [
    {name:"北京", value:82}, {name:"上海", value:76},
    {name:"广州", value:61}, {name:"深圳", value:88},
    {name:"杭州", value:69}
  ];
  const select = document.getElementById("cityFilter");
  const result = document.getElementById("filterResult");
  if (!select) return;
  const render = () => {
    const v = select.value;
    const rows = v === "all" ? data : data.filter(d => d.name === v);
    result.innerHTML = rows.map(d => `<p><b>${d.name}</b>：${d.value}</p>`).join("");
  };
  select.addEventListener("change", render);
  render();
}

function demo7() {
  const values = [72, 81, 64, 93, 77];
  const avg = values.reduce((a,b)=>a+b,0) / values.length;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const ids = ["projectAvg","projectMax","projectMin"];
  [avg.toFixed(1), max, min].forEach((v,i)=>{
    const el = document.getElementById(ids[i]);
    if (el) el.textContent = v;
  });
  const btn = document.getElementById("randomizeProject");
  if (btn) btn.addEventListener("click", () => {
    const next = Array.from({length:5}, () => Math.floor(50 + Math.random()*50));
    const a = next.reduce((x,y)=>x+y,0)/next.length;
    document.getElementById("projectAvg").textContent = a.toFixed(1);
    document.getElementById("projectMax").textContent = Math.max(...next);
    document.getElementById("projectMin").textContent = Math.min(...next);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initTabs();
  demo1(); demo2(); demo3(); demo4(); demo5(); demo6(); demo7();
});
