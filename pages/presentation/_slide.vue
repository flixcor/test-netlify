<template>
  <div class="card">
    <div class="card-content">
      <h2>Title</h2>
      <p>Paragraph</p>
      <ul>
        <li>List item</li>
        <li>List item two</li>
      </ul>
    </div>
    <div class="card-images">
      <img
        src="https://bulma.io/images/placeholders/1280x960.png"
        alt="Placeholder image"
      />
      <img
        src="https://bulma.io/images/placeholders/1280x960.png"
        alt="Placeholder image"
      />
      <img
        src="https://bulma.io/images/placeholders/1280x960.png"
        alt="Placeholder image"
      />
      <img
        src="https://bulma.io/images/placeholders/1280x960.png"
        alt="Placeholder image"
      />
    </div>
    <a class="previous"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 17.021 29.798"
        enable-background="new 0 0 17.021 29.798"
      >
        <path
          d="M14.899 29.798l2.122-2.121-12.778-12.778 12.778-12.778-2.122-2.121-14.899 14.899z"
        ></path></svg
    ></a>
    <a class="next"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 17.021 29.798"
        enable-background="new 0 0 17.021 29.798"
      >
        <path
          d="M2.121 0l-2.121 2.121 12.778 12.778-12.778 12.778 2.121 2.121 14.9-14.899z"
        ></path></svg
    ></a>
  </div>
</template>

<script>
export default {
  head() {
    return {
      link: [
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap'
        }
      ]
    }
  }
}
</script>

<style>
html {
  background: #ff7b4e; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #ff4e56,
    #ff7b4e
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #ff4e56,
    #ff7b4e
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.card {
  border-radius: 500px;
  margin-top: 100px;
  height: 1000px;
  width: 1000px;
  margin-left: auto;
  margin-right: auto;
  /* text-align: center !important; */
  padding: 175px;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
    0 0px 0 1px rgba(10, 10, 10, 0.02);
}

ul {
  border-width: 0;
  border-left-width: 8px;
  border-left-style: solid;
  border-left-color: #ff7b4e;
  border-image: linear-gradient(to bottom, #ff7b4e, #ff4e56) 1 100%;
  padding: 0 0 0 30px;
  list-style-type: none !important;
}

.card-content {
  position: relative;
  z-index: 2;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 40px;
  font-weight: 400;
  border: 5px solid black;
  height: 100%;
  padding: 50px;
}

h2 {
  font-size: 68px;
  font-weight: 700;
}

.card-images {
  z-index: 0;
  position: absolute;
  display: flex;
  left: -75px;
  top: -75px;
  width: 1150px;
  height: 1150px;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
}

.card-images img {
  width: 300px;
  height: auto;
}

a.previous svg {
  position: absolute;
  width: 80px;
  height: 80px;
  top: calc(50% - 40px);
  left: -100px;
}

a.next svg {
  position: absolute;
  width: 80px;
  height: 80px;
  top: calc(50% - 40px);
  right: -100px;
}
</style>