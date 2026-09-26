---
title: 프로젝트
permalink: /projects/
---
<section class="page">
  <h1>프로젝트</h1>
  <p class="page-description">프로젝트 소개와 관련 글을 모았습니다.</p>
  {% assign projects = site.projects | sort: "title" %}
  <ul class="project-list">
    {% for project in projects %}
    {% assign related = site.posts | where: "project", project.project_id %}
    <li>
      <div class="project-heading">
        <h2><a href="{{ project.url | relative_url }}">{{ project.title | escape }}</a></h2>
        {% if project.status %}<span class="project-status">{{ project.status | escape }}</span>{% endif %}
      </div>
      {% if project.description %}<p>{{ project.description | escape }}</p>{% endif %}
      <span class="project-count">관련 글 {{ related.size }}편</span>
    </li>
    {% endfor %}
  </ul>
  {% if site.projects.size == 0 %}<p class="empty">아직 공개한 프로젝트가 없습니다.</p>{% endif %}
</section>
