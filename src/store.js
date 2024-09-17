import { createStore } from 'vuex'

export const store = createStore({
    
    endpoints: {
    },
    state: {
        restaurantTypes: [],
        selectedRestaurantTypes: []
      },
      mutations: {
        SET_RESTAURANT_TYPES(state, types) {
          state.restaurantTypes = types;
        },
        SET_SELECTED_RESTAURANT_TYPES(state, types) {
          state.selectedRestaurantTypes = types;
        }
      },
      actions: {
        setRestaurantTypes({ commit }, types) {
          commit('SET_RESTAURANT_TYPES', types);
        },
        setSelectedRestaurantTypes({ commit }, types) {
          commit('SET_SELECTED_RESTAURANT_TYPES', types);
        }
      }
});