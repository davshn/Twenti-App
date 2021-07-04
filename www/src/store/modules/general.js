const state = {
    server:"http://192.168.0.110:3000", //local yo
    search_words: '',
    client_height: null,
    home_route: "home",
    footer: 'bar',
    radius: true,
    is_changed_voucher: 0,
    is_changed_venue: 0
};

const getters = {
    getServer: function(state){
        return state.server;
    },
    getSearchWords: function(state){
        return state.search_words;
    },
    getClientHeight: function(state){
        return state.client_height;
    },
    getHomeRoute: function(state){
        return state.home_route;
    },
    getFooter: function(state){
        return state.footer;
    },
    getRadius: function(state){
        return state.radius;
    },
    getIsChangedVoucher: function(state){
        return state.is_changed_voucher;
    },
    getIsChangedVenue: function(state){
        return state.is_changed_venue;
    }
};

const mutations = {
    setServer: function(state, payload){
        state.server = payload;
    },
    setSearchWords: function(state, payload){
        state.search_words = payload;
    },
    setClientHeight: function(state, payload){
        state.client_height = payload;
    },
    setHomeRoute: function(state, payload){
        state.home_route = payload;
    },
    setFooter: function(state, payload){
        state.footer = payload;
    },
    setIsChangedVoucher: function(state, payload){
        state.is_changed_voucher = payload;
    },
    setIsChangedVenue: function(state, payload){
        state.is_changed_venue = payload;
    }
};

const actions = {
    updateServer: function({commit}, payload){
        commit("setServer", payload);
    },
    updateSearchWords: function({commit}, payload){
        commit("setSearchWords", payload);
    },
    updateClientHeight: function({commit}, payload){
        commit("setClientHeight", payload);
    },
    updateHomeRoute: function({commit}, payload){
        commit("setHomeRoute",payload);
    },
    updateFooter: function({commit}, payload){
        commit("setFooter", payload);
    },
    updateIsChangedVoucher: function({commit}, payload){
        commit("setIsChangedVoucher", payload);
    },
    updateIsChangedVenue: function({commit}, payload){
        commit("setIsChangedVenue", payload);
    }
};

export default {
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
};
