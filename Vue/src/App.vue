<template>

  <div id="app">

    <HeaderComponent />
    <SliderComponent />

    <div class="border">
      <div class="center">

        <router-view />
        <SidebarComponent />
        <!-- LIMPIAR FLOTADOS -->
        <div class="clearfix"></div>

      </div>
    </div>

    <FooterComponent />

  </div>

</template>

<script>

import HeaderComponent from './components/Header.vue';
import SliderComponent from './components/Slider.vue';
import SidebarComponent from './components/Sidebar.vue';
import FooterComponent from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    SliderComponent,
    SidebarComponent,
    FooterComponent
  }
}

</script>

<style>

@import './assets/css/styles.css';

</style>
