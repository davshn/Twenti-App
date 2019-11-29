const state = {
    // server:"http://192.168.0.13:3000",
    // server:"http://192.168.1.128:3000", //local mechas
    server:"http://192.168.1.120:4000", //local yo
    // server:"http://192.168.1.016:4000", //local wicho
    // server:"http://ec2-34-220-30-9.us-west-2.compute.amazonaws.com",
    // server: 'http://ec2-35-160-148-232.us-west-2.compute.amazonaws.com',
    // server: 'http://ec2-18-236-143-203.us-west-2.compute.amazonaws.com', //Server FuserewardsV2
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
