// main.js
// 《如何制作可视化网站》课程主页脚本

const chapters = [
  {
    number: "01",
    zh: "可视化网站基础",
    en: "Visualization Website Basics",
    descZh: "了解什么是可视化网站，认识网页结构、开发工具与基本工作流程。",
    descEn: "Learn what a visualization website is and understand its structure, tools, and workflow.",
    tags: ["HTML", "CSS", "JavaScript"],
    link: "lesson-01/index.html"
  },
  {
    number: "02",
    zh: "HTML 页面搭建",
    en: "Building with HTML",
    descZh: "从 HTML 文档结构开始，完成标题、文本、图片、按钮和页面区域的搭建。",
    descEn: "Build page structure with headings, text, images, buttons, and content sections.",
    tags: ["HTML5", "DOM", "页面结构"],
    link: "lesson-02/index.html"
  },
  {
    number: "03",
    zh: "CSS 页面设计",
    en: "Styling with CSS",
    descZh: "学习颜色、字体、布局、卡片、响应式设计，让网页更加美观。",
    descEn: "Use colors, typography, layouts, cards, and responsive design to style a website.",
    tags: ["CSS", "布局", "响应式"],
    link: "lesson-03/index.html"
  },
  {
    number: "04",
    zh: "JavaScript 交互",
    en: "JavaScript Interaction",
    descZh: "使用 JavaScript 为网页添加点击、修改内容、动态更新等交互功能。",
    descEn: "Add clicks, content updates, and dynamic behavior with JavaScript.",
    tags: ["JavaScript", "事件", "交互"],
    link: "lesson-04/index.html"
  },
  {
    number: "05",
    zh: "D3.js 可视化",
    en: "Data Visualization with D3.js",
    descZh: "学习 D3.js 的基本使用方法，从数据出发制作柱状图、折线图等可视化图表。",
    descEn: "Use D3.js to turn data into bar charts, line charts, and other visualizations.",
    tags: ["D3.js", "SVG", "图表"],
    link: "lesson-05/index.html"
  },
  {
    number: "06",
    zh: "数据与交互",
    en: "Data and Interaction",
    descZh: "学习数据加载、数据处理以及图表与用户操作之间的联动。",
    descEn: "Load and process data, then connect charts with user interactions.",
    tags: ["CSV", "JSON", "交互图表"],
    link: "lesson-06/index.html"
  },
  {
    number: "07",
    zh: "完整网站制作与部署",
    en: "Build and Deploy",
    descZh: "综合 HTML、CSS、JavaScript 和 D3.js，完成一个完整的可视化网站并部署上线。",
    descEn: "Combine HTML, CSS, JavaScript, and D3.js to build and deploy a complete visualization website.",
    tags: ["综合项目", "GitHub Pages", "部署"],
    link: "lesson-07/index.html"
  }
];

function getLanguage() {
  return localStorage.getItem("visualization-site-lang") || "zh";
}

function setLanguage(lang) {
  localStorage.setItem("visualization-site-lang", lang);

  const zhBtn = document.getElementById("zhBtn");
  const enBtn = document.getElementById("enBtn");

  if (zhBtn && enBtn) {
    zhBtn.classList.toggle("active", lang === "zh");
    enBtn.classList.toggle("active", lang === "en");
  }

  renderChapters(lang);
}

function renderChapters(lang = getLanguage()) {
  const grid = document.getElementById("chapterGrid");

  if (!grid) {
    return;
  }

  grid.innerHTML = chapters.map((chapter) => {
    const title = lang === "zh"
      ? chapter.zh
      : chapter.en;

    const desc = lang === "zh"
      ? chapter.descZh
      : chapter.descEn;

    const buttonText = lang === "zh"
      ? "进入章节 →"
      : "Open Chapter →";

    return `
      <article class="chapter-card">

        <div class="chapter-top">
          <span class="chapter-number">
            ${chapter.number}
          </span>

          <span class="status">
            ${lang === "zh" ? "课程内容" : "Lesson"}
          </span>
        </div>

        <h3>${title}</h3>

        <p>${desc}</p>

        <div class="tags">
          ${chapter.tags
            .map(tag => `<span class="tag">${tag}</span>`)
            .join("")}
        </div>

        <a class="chapter-link" href="${chapter.link}">
          ${buttonText}
        </a>

      </article>
    `;
  }).join("");
}

document.addEventListener("DOMContentLoaded", () => {

  const zhBtn = document.getElementById("zhBtn");
  const enBtn = document.getElementById("enBtn");

  if (zhBtn) {
    zhBtn.addEventListener("click", () => {
      setLanguage("zh");
    });
  }

  if (enBtn) {
    enBtn.addEventListener("click", () => {
      setLanguage("en");
    });
  }

  setLanguage(getLanguage());
});