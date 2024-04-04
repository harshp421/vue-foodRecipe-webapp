import axiosClient from '../axiosClient';

export function searchMeals({ commit }, keyword) {
  axiosClient.get(`/search/${keyword}`)
    .then(({ data }) => {
      commit('setSearchedMeals', data.recipes)
    })
}

export function searchMealsByLetter({ commit }, letter) {
  axiosClient.get(`/recipe/alphabate/${letter}`)
    .then(({ data }) => {
      commit('setMealsByLetter', data.recipes)
    })
}

export function searchMealsByIngredient({ commit }, ing) {
  axiosClient.get(`/recipe/ingredients/${ing}`)
    .then(({ data }) => {
      commit('setMealsByIngredients', data.recipes)
    })
}