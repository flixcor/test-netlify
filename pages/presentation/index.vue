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
