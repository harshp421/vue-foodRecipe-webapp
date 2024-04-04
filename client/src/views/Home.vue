<template>
  <div class="home">
    <div class="about_component flex max-w-6xl mx-auto justify-between mt-9">
      <div class="about__text w-[70%]">
        <div class="about__heading mt-9 pl-3">
          <h1 class="text-6xl font-semibold">Recipes for your home cooked meal</h1>
          <p class="text-lg py-3">A recipe is a set of instructions that describe how to prepare a dish, including a list of ingredients and the steps required to turn those ingredients into a finished product.</p>
        </div>
      </div>
      <div class="about__img bg-red-500  w-[30%]">
        <img src="https://img.freepik.com/free-photo/flat-lay-food-ingredients-with-recipe-veggies_23-2148834745.jpg" alt="Recipe Image" class="w-full h-[350px] object-cover">
      </div>
    </div>

    <div class="p-8 pb-0 text-gradient-to-r from-green-400 to-blue-500">
      <h1 class="text-4xl font-bold mb-4">Our All Meals</h1>
    </div>

    <Meals :meals="meals" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import store from "../store";
import Meals from "../components/Meals.vue";
import axiosClient from "../axiosClient.js";

const meals = ref([]);

onMounted(async () => {
  axiosClient
    .get(`recipes`)
    .then(({ data }) => (meals.value = data.recipes));
});
console.log(meals, "meals");
</script>
