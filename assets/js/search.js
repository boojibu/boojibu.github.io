(() => {
  "use strict";

  const section = document.querySelector("[data-search-index]");
  if (!section) return;
  const form = document.getElementById("search-form");
  const query = document.getElementById("search-query");
  const tag = document.getElementById("tag-filter");
  const project = document.getElementById("project-filter");
  const count = document.getElementById("result-count");
  const empty = document.getElementById("no-results");
  const noPosts = document.getElementById("no-posts");
  const items = [...document.querySelectorAll("[data-post-url]")];
  const normalize = value => String(value || "").normalize("NFKC").toLocaleLowerCase().replace(/\s+/g, " ").trim();

  async function initialize() {
    const response = await fetch(section.dataset.searchIndex, { credentials: "same-origin" });
    if (!response.ok) throw new Error("Search index unavailable");
    const posts = await response.json();
    if (!Array.isArray(posts)) throw new Error("Invalid search index");
    const byUrl = new Map(posts.map(post => [post.url, post]));
    const entries = items.map(element => {
      const post = byUrl.get(element.dataset.postUrl);
      if (!post || !Array.isArray(post.tags)) throw new Error("Incomplete search index");
      return {
        element,
        tags: post.tags,
        project: post.project,
        text: normalize([post.title, post.description, post.content, ...post.tags, post.projectTitle].join(" "))
      };
    });

    function restore() {
      const params = new URLSearchParams(location.search);
      query.value = params.get("q") || "";
      tag.value = params.get("tag") || "";
      project.value = params.get("project") || "";
      // Unknown or removed filters fall back to the complete list.
      if (tag.selectedIndex < 0) tag.value = "";
      if (project.selectedIndex < 0) project.value = "";
    }

    function filter(updateUrl = true) {
      const words = normalize(query.value).split(" ").filter(Boolean);
      let visible = 0;
      for (const entry of entries) {
        const matches = (!tag.value || entry.tags.includes(tag.value))
          && (!project.value || entry.project === project.value)
          && words.every(word => entry.text.includes(word));
        entry.element.hidden = !matches;
        if (matches) visible++;
      }
      count.textContent = visible + "편";
      const active = words.length > 0 || tag.value !== "" || project.value !== "";
      empty.hidden = visible !== 0 || (!active && entries.length === 0);
      if (noPosts) noPosts.hidden = active;
      if (updateUrl) {
        const url = new URL(location.href);
        for (const [key, value] of [["q", query.value.trim()], ["tag", tag.value], ["project", project.value]]) {
          if (value) url.searchParams.set(key, value);
          else url.searchParams.delete(key);
        }
        history.replaceState(null, "", url);
      }
    }

    let timer;
    query.addEventListener("input", () => {
      clearTimeout(timer);
      timer = setTimeout(() => filter(), 120);
    });
    tag.addEventListener("change", () => filter());
    project.addEventListener("change", () => filter());
    form.addEventListener("submit", event => {
      event.preventDefault();
      clearTimeout(timer);
      filter();
    });
    document.getElementById("reset-search").addEventListener("click", () => {
      clearTimeout(timer);
      form.reset();
      filter();
      query.focus();
    });
    window.addEventListener("popstate", () => {
      clearTimeout(timer);
      restore();
      filter(false);
    });
    restore();
    filter(false);
    form.hidden = false;
  }

  initialize().catch(() => {
    document.getElementById("search-error").hidden = false;
  });
})();
