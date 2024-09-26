
<script setup>
import { defineEmits } from '@vue/runtime-core';

const emit = defineEmits(["toggle"]);

const toggleClass = () => {
  emit("toggle");
}

</script>
<template>
  <header class="header">
    <img @click="toggleClass" src="@/assets/menu.svg" alt="Menu Icon" class="icon-image" />

    <div class="header-text">
      <p>New trips on Fall season! Full details on our Instagram accounts.</p>
    </div>

    <div class="header-icon">
      <img src="@/assets/avatar.svg" alt="Profile Icon" class="avatar-icon" />
    </div>
  </header>
</template>


<style scoped>
.header {
  display: flex;
  font-family: Inknut Antiqua;
  font-size: 17px;
  font-weight: 400;
  line-height: 43.84px;
  text-align: left;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255,255,255,.8);
  padding: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header-icon {
  width: 2.3em; /* Fixed size for icons */
  height: 2.3em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #7EEFFF;
  border-radius: 50%;
  flex-shrink: 0;
}

.icon-image {
  width: 2em; /* Size of the icon */
  height: 2em;
}

.avatar-icon {
  width: 1.7em;
  height: 1.7em;
}

.header-text {
  justify-content: center;
  width: 50vw;
  background: linear-gradient(90deg, #E5F67C 0%, #ECEF64 33%, #D2E037 66%, #EAEE3A 100%);
  font-size: 16px;
  font-weight: bold;
  align-items: center;
  display: flex;
  border-radius: 10px;
}

.header-text p {
  background:  linear-gradient(90deg, #FFADAD 0%, #FF774C 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

}
</style>
