## Welcome

Sorry, there's not much to see here yet.

Maybe there never will be? Who knows?

### Posts

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      {{ post.excerpt }}
    </li>
  {% endfor %}
</ul>