<template>
  <div id="app">
    <nav>
      <span>Mini Vlog</span>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Politics</a></li>
        <li><a href="#">Entertainment</a></li>
        <li><a href="#">Tech</a></li>
        <li><a href="#">Travel</a></li>
        <li><a href="#">Sports</a></li>
      </ul>
    </nav>

    <section>
      <article v-for="post in posts" :key="post.id">
        <div class='bottom' v-if="(post.id - 2) % 5 === 0">
        <img :src="require(`${post.image}`)" alt="Post Image">
          <div class="topic-container">
          <div class="topic"  v-for="a in post.topic" :key="a.id" :style="{ backgroundColor: a.color }">
            <div>{{a.text}}</div>
          </div>
          </div>
          <div class="overlay">
            <h3>{{ post.title }}</h3>
            <p>{{ post.date }}</p>
          </div>
        </div>
        <div v-else>
          <img :src="require(`${post.image}`)" alt="Post Image">
          <div class="overlay">
          <h3>{{ post.title }}</h3>
          <p>{{ post.date }}</p></div>
          </div>
      </article>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [
        {
          id: 1,
          title: 'The AI Magically Removes Moving Objects from Videos',
          date: 'July 18, 2019',
          image: './assets/img1.png'
        },
        {
          id: 2,
          title: 'The AI Magically Removes Moving Objects from Videos',
          date: 'July 18, 2019',
          image: './assets/img2.jpg',
          topic:[{id:1,text:'пп', color:'red'},{id:2,text:'newsss', color:'white'}]
        },
        {
          id: 3,
          title: 'The AI Magically Removes Moving Objects from Videos',
          date: 'July 18, 2019',
          image: './assets/img3.jpg'
        },
        {
          id: 4,
          title: 'The AI Magically Removes Moving Objects from Videos',
          date: 'July 18, 2019',
          image: './assets/img4.jpg'
        },
        {
          id: 5,
          title: 'The AI Magically Removes Moving Objects from Videos',
          date: 'July 18, 2019',
          image: './assets/img5.jpg'


        },
      ]
    };
  }
};
</script>


<style>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  background-color: #f4f4f4;
  color: #333;
}

/* Navigation styling */
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

nav span {
  font-size: 1.5rem;
  font-weight: bold;
}

nav ul {
  list-style: none;
  display: flex;
  margin: 0;
}

nav ul li {
  margin-right: 20px;
}

nav ul li:last-child {
  margin-right: 0;
}

nav ul li a {
  text-decoration: none;
  color: #333;
  font-size: 1rem;
  transition: color 0.3s ease;
}

nav ul li a:hover {
  color: #ff6347;
}

/* Section for the article layout */
section {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 20px;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

article {
  position: relative;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

article:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
article img {
  display: block;
  width: 100%;
  height: 365px;
  object-fit: cover; /* Изображение заполняет контейнер, сохраняя пропорции */
}

article h3 {
  position: absolute;
  bottom: 50px;
  font-size: 1.25rem;
  margin: 10px;
}

article p {
  position: absolute;
  bottom: 10px;
  color: #666;
  font-size: 0.9rem;
  margin: 10px;
}

/* Layout specifics */

article:nth-child(1) {
  grid-column: span 2;
}

article:nth-child(3) {
  grid-column: span 2;
}


article:nth-child(2) {
  grid-column: span 2;
  grid-row: span 2;
}


article:nth-child(4) {
  grid-column: span 2;
}

article:nth-child(5) {
  grid-column: span 2;
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%); /* Градиент снизу вверх */
  color: white;
  text-align: left;
}

.overlay h3,
.overlay p {
  margin: 0;
  padding: 0;
}
.topic-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 20px;
  position: absolute;
  bottom: 10px;
}
.topic {
  position: relative;
  padding: 5px 10px;
  border-radius: 5px;
  bottom: 100px;
}
.bottom img {
  height: 750px;
}
</style>
