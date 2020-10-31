<template>
  <router-view />
</template>

<style lang="scss">
@import "./sass/_colors";
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app,
html,
body {
  height: 100%;
  background: $dark-blue;
  color: #fff;
}

.btn.btn-circle,
.btn.btn-circle.btn-lg,
.btn-circle.btn-xl {
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn.btn-circle {
  width: 50px;
  height: 50px;
  text-align: center;
  padding: 6px 0;
  font-size: 12px;
  line-height: 1.428571429;
  border-radius: 50%;
}
.btn.btn-circle.btn-lg {
  width: 70px;
  height: 70px;
  padding: 10px 16px;
  font-size: 18px;
  line-height: 1.33;
  border-radius: 50%;
}
.btn-circle.btn-xl {
  width: 90px;
  height: 90px;
  padding: 10px 16px;
  font-size: 24px;
  line-height: 1.33;
  border-radius: 50%;
}
</style>
