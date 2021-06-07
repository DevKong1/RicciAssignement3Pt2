<template>
  <div id="app">
    <router-view id="content"/>
  </div>
</template>

<style>
body {
  margin: 0px;
  height: 100%;
  min-height: 100%;
  background-image: url("./assets/bg.png");
}

#content {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
