<template>
  <nav>
    <div class="routes-container">
      <div class="route">
        <router-link to="/home" class="nav__button mb-2 d-inline-block">
          <span class="nav__button-icon mx-2 d-inline-block"
            ><svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="css-i6dzq1"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline></svg
          ></span>
          <span class="nav__button-text my-2 mr-3 d-inline-block">Home</span>
        </router-link>
      </div>
      <div class="route">
        <router-link to="/user" class="nav__button mb-2 d-inline-block">
          <span class="nav__button-icon mx-2 d-inline-block "
            ><svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="css-i6dzq1"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline></svg
          ></span>
          <span class="nav__button-text my-2 mr-3 d-inline-block">Profile</span>
        </router-link>
      </div>
    </div>
    <!-- <button class="btn btn-primary btn-block mb-1" @click="toggleNewWoofForm">
      Woof
    </button> -->
  </nav>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
@import "../sass/_colors";
nav {
  display: block;
  .nav__button {
    background: transparent;
    border-radius: 2rem;
    outline: none;
    font-weight: bold;
    color: #fff;
    cursor: pointer;
    &:hover {
      background: $kinda-transparent-blue;
      color: $light-blue;
      svg {
        stroke: $light-blue;
      }
    }
  }
}
@media only screen and (max-width: 768px) {
  nav {
    display: none;
  }
}
</style>
