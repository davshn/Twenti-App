// import Vue from 'vue';
// import Vuex from 'vuex';


const state = {
    email: '',
    token: '',
    mobile: '',
    device_token: '',
    db: '',
    role: '',
    user_id: '',
    registrationId: '',
    notifications: 0,
    name: "",
    lastname: "",
    gender: "",
    age: null,
    picture: "",
    user_email: "",
    user_mobile:"",
    password: "",
    rewards_count: 0,
    locations_count: 0,
    redemptions_count: 0,
    favorites_count: 0,
    server_image: "",
    // server_image: "http://192.168.1.116:4000",
    device_id: '',
    categories: [],
    show_drawer: false,
    agent_id: null,
    current_offer: null,
    birthday: '',
    in_blocks: true,
    fcm_id: '',
    nationality: '',
    current_favorites: 0,
    latitude: -33.399792,
    longitude: -70.513665,
    current_category: '',
    current_tab: 'my_offers',
    terms_and_conditions: false,
    user_rut: '123K',
    show_toast: false,
    rut_validator: false,
    schedule_image: '',
    schedule_modal: false,
    selected_section: 0,
    user_info_id: '',
    location_user: '',
    locations: [],
    show_user_key: false,
    invitation_validate: true,
    user_access_state: 'DENIED',
    code_modal: false,
    profile_picture: './src/assets/images/backgrounds/menu_foto.svg',
    schedule_loading: false,
    user_id_encrypt: null
};
const getters = {
    getUserToken: function(state){
        return state.token;
    },
    getUserDeviceToken: function(state){
        return state.device_token;
    },
    getUserEmail: function(state){
        return state.email;
    },
    getUserPassword: function(state){
        return state.password;
    },
    getUserEmailSignup: function(state){
        return state.user_email;
    },
    getUserMobileSignup: function(state){
        return state.user_mobile;
    },
    getDB: function(state){
        return state.db;
    },
    getUserMobile: function(state){
        return state.mobile;
    },
    getRole: function(state){
        return state.role;
    },
    getUserId: function(state){
        return state.user_id;
    },
    getUserRegistrationId: function(state){
        return state.registrationId;
    },
    getNotifications: function(state){
        return state.notifications;
    },
    getUserName: function(state){
        return state.name;
    },
    getUserLastName: function(state){
        return state.lastname;
    },
    getUserGender: function(state){
        return state.gender;
    },
    getUserAge: function(state){
        return state.age;
    },
    getUserPicture: function(state){
        return state.picture;
    },
    getRewardsCount: function(state){
      if (state.rewards_count != undefined) {
        return state.rewards_count;
      } else {
        return '0';
      }
    },
    getLocationsCount: function(state){
        return state.locations_count;
    },
    getFavoritesCount: function(state){
        return state.favorites_count;
    },
    getRedemptionsCount: function(state){
        return state.redemptions_count;
    },
    getServerImage: function(state){
      return state.server_image
    },
    getDeviceId: function(state){
      // return state.device_id
      return localStorage.device_id
    },
    getCategories: function(state){
      return state.categories
    },
    getShowDrawer: function(state){
      return state.show_drawer
    },
    getAgentId: function(state){
      return state.agent_id
    },
    getCurrentOffer: function(state){
      return state.current_offer
    },
    getUserBirthday: function(state){
      return state.birthday
    },
    getInBlocks: function(state){
      return state.in_blocks
    },
    getFcmId(state){
      return state.fcm_id
    },
    getNationality(state){
      return state.nationality
    },
    getCurrentFavorites(state){
      return state.current_favorites
    },
    getLatitude(state){
      return state.latitude
    },
    getLongitude(state){
      return state.longitude
    },
    getCurrentCategory(state) {
      return state.current_category
    },
    getCurrentTab(state){
      return state.current_tab
    },
    getTermsAndConditions(state){
      return state.terms_and_conditions
    },
    getUserRut(state){
      return state.user_rut
    },
    getShowToast(state){
      return state.show_toast
    },
    getRutValidator(state){
      return state.rut_validator
    },
    getScheduleImage(state){
      return state.schedule_image
    },
    getScheduleModal(state){
      return state.schedule_modal
    },
    getSelectedSection(state){
      return state.selected_section
    },
    getLocationUser(state){
      return state.location_user
    },
    getLocations(state){
      return state.locations
    },
    getUserInfoId(state){
      return state.user_info_id
    },
    getShowUserKey(state){
      return state.show_user_key
    },
    getInvitationValidate(state){
      return state.invitation_validate
    },
    getUserAccessState(state){
      return state.user_access_state
    },
    getCodeModal(state){
      return state.code_modal
    },
    getProfilePicture(state){
      return state.profile_picture
    },
    getScheduleLoading(state){
      return state.schedule_loading
    },
    getUserIdEncrypt(state){
      return state.user_id_encrypt
    }
};
const mutations = {
    setUserToken: function(state, payload){
      state.token = payload;
      localStorage.current_token = state.token;
    },
    setUserDeviceToken: function(state, payload){
      state.device_token = payload;
    },
    setUserEmail: function(state, payload){
      state.email = payload;
    },
    setUserPassword: function(state, payload){
      state.password = payload;
    },
    setUserEmailSignup: function(state, payload){
      state.user_email = payload;
    },
    setUserMobileSignup: function(state, payload){
      state.user_mobile = payload;
    },
    setDB: function(state, payload){
      state.db = payload;
    },
    setUserMobile: function(state, payload){
      state.mobile = payload;
    },
    setRole: function(state, payload){
      state.role = payload;
    },
    setUserId: function(state, payload){
      state.user_id = payload;
    },
    setUserRegistrationId: function(state, payload){
      state.registrationId = payload.rid;
    },
    setNotifications: function(state, payload){
      state.notifications = payload;
    },
    setUserName: function(state,payload){
      state.name = payload;
    },
    setUserLastName: function(state,payload){
      state.lastname = payload;
    },
    setUserGender: function(state,payload){
      state.gender = payload;
    },
    setUserBirthday: function(state,payload){
      state.birthday = payload;
    },
    setRewardsCount: function(state, payload){
      state.rewards_count = payload;
    },
    setLocationsCount: function(state, payload){
      state.locations_count = payload;
    },
    setFavoritesCount: function(state, payload){
      state.favorites_count = payload;
    },
    setRedemptionsCount: function(state, payload){
      state.redemptions_count = payload;
    },
    setServerImage: function(state, payload) {
      state.server_image = payload;
    },
    setDeviceId: function(state, payload) {
      state.device_id = payload;
    },
    setCategories: function(state, payload) {
      state.categories = payload;
    },
    setShowDrawer: function(state, payload) {
      state.show_drawer = payload
    },
    setAgentId: function(state, payload) {
      state.agent_id = payload
    },
    setCurrentOffer: function(state, payload) {
      state.current_offer = payload
    },
    setInBlocks: function(state, payload) {
      state.in_blocks = payload
    },
    setFcmId: function(state, payload) {
      state.fcm_id = payload
    },
    setNationality: function(state, payload) {
      state.nationality = payload
    },
    setCurrentFavorites: function(state, payload) {
      state.current_favorites = payload
    },
    setLatitude: function(state, payload) {
      state.latitude = payload
    },
    setLongitude: function(state, payload) {
      state.longitude = payload
    },
    setCurrentCategory: function(state, payload) {
      state.current_category = payload
    },
    setCurrentTab: function(state, payload) {
      state.current_tab = payload
    },
    setTermsAndConditions: function(state, payload) {
      state.terms_and_conditions = payload
    },
    setUserRut: function(state, payload){
      state.user_rut = payload
    },
    setShowToast: function(state, payload){
      state.show_toast = payload
    },
    setRutValidator: function(state, payload){
      state.rut_validator = payload
    },
    setScheduleImage: function(state, payload){
      state.schedule_image = payload
    },
    setScheduleModal: function(state, payload){
      state.schedule_modal = payload
    },
    setSelectedSection: function(state, payload){
      state.selected_section = payload
    },
    setLocationUser: function(state, payload){
      state.location_user = payload
    },
    setLocations: function(state, payload){
      state.locations = payload
    },
    setUserInfoId: function(state, payload){
      state.user_info_id = payload
    },
    setShowUserKey: function(state, payload){
      state.show_user_key = payload
    },
    setInvitationValidate: function(state, payload){
      state.invitation_validate = payload
    },
    setUserAccessState: function(state, payload){
      state.user_access_state = payload
    },
    setCodeModal(state, payload){
      state.code_modal = payload
    },
    setProfilePicture(state, payload){
      state.profile_picture = payload
    },
    setScheduleLoading(state, payload){
      state.schedule_loading = payload
    },
    setUserIdEncrypt(state, payload){
      state.user_id_encrypt = payload
    }
};
const actions = {
    updateUserToken: function({commit}, payload){
        commit("setUserToken", payload);
    },
    updateUserDeviceToken: function({commit}, payload){
        commit("setUserDeviceToken", payload);
    },
    updateUserEmail: function({commit}, payload){
        commit("setUserEmail", payload);
    },
    updateUserPassword: function({commit}, payload){
        commit("setUserPassword", payload);
    },
    updateUserEmailSignup: function({commit}, payload){
        commit("setUserEmailSignup", payload);
    },
    updateUserMobileSignup: function({commit}, payload){
        commit("setUserMobileSignup", payload);
    },
    updateDB: function({commit}, payload){
        commit("setDB", payload);
    },
    updateUserMobile: function({commit}, payload){
        commit("setUserMobile", payload);
    },
    updateRole: function({commit}, payload){
        commit("setRole", payload);
    },
    updateUserId: function({commit}, payload){
        commit("setUserId", payload);
    },
    updateUserRegistrationId: function({commit}, payload){
        commit("setUserRegistrationId", payload);
    },
    updateNotifications: function({commit}, payload){
       commit("setNotifications", payload);
    },
    updateUserName: function({commit}, payload){
        commit("setUserName", payload);
    },
    updateUserLastName: function({commit}, payload){
        commit("setUserLastName", payload);
    },
    updateUserGender: function({commit}, payload){
        commit("setUserGender", payload);
    },
    updateUserBirthday: function({commit}, payload){
        commit("setUserBirthday", payload);
    },

    updateRewardsCount: function({commit}, payload){
        commit("setRewardsCount", payload);
    },
    updateLocationsCount: function({commit}, payload){
        commit("setLocationsCount", payload);
    },
    updateFavoritesCount: function({commit}, payload){
        commit("setFavoritesCount", payload);
    },
    updateRedemptionsCount: function({commit}, payload){
        commit("setRedemptionsCount", payload);
    },
    updateServerImage: function({commit}, payload){
      commit("setServerImage", payload);
    },
    updateDeviceId: function({commit}, payload){
      commit("setDeviceId", payload)
    },
    updateCategories: function({commit}, payload) {
      commit("setCategories", payload)
    },
    updateShowDrawer: function({commit}, payload) {
      commit('setShowDrawer', payload)
    },
    updateAgentId: function({commit}, payload) {
      commit('setAgentId', payload)
    },
    updateCurrentOffer: function({commit}, payload) {
      commit('setCurrentOffer', payload)
    },
    updateInBlocks: function({commit}, payload) {
      commit('setInBlocks', payload)
    },
    updateFcmId: function({commit}, payload) {
      commit('setFcmId', payload)
    },
    updateNationality: function({commit}, payload) {
      commit('setNationality', payload)
    },
    updateCurrentFavorites: function({commit}, payload) {
      commit('setCurrentFavorites', payload)
    },
    updateLatitude: function({commit}, payload) {
      commit('setLatitude', payload)
    },
    updateLongitude: function({commit}, payload) {
      commit('setLongitude', payload)
    },
    updateCurrentCategory: function({commit}, payload) {
      commit('setCurrentCategory', payload)
    },
    updateCurrentTab: function({commit}, payload) {
      commit('setCurrentTab', payload)
    },
    updateTermsAndConditions: function({commit}, payload) {
      commit('setTermsAndConditions', payload)
    },
    updateUserRut: function({commit}, payload) {
      commit('setUserRut', payload)
    },
    updateShowToast: function({commit}, payload) {
      commit('setShowToast', payload)
    },
    updateRutValidator: function({commit}, payload) {
      commit('setRutValidator', payload)
    },
    updateScheduleImage: function({commit}, payload) {
      commit('setScheduleImage', payload)
    },
    updateScheduleModal: function({commit}, payload) {
      commit('setScheduleModal', payload)
    },
    updateSelectedSection: function({commit}, payload) {
      commit('setSelectedSection', payload)
    },
    updateLocationUser: function({commit}, payload) {
      commit('setLocationUser', payload)
    },
    updateLocations: function({commit}, payload) {
      commit('setLocations', payload)
    },
    updateUserInfoId: function({commit}, payload) {
      commit('setUserInfoId', payload)
    },
    updateShowUserKey: function({commit}, payload) {
      commit('setShowUserKey', payload)
    },
    updateInvitationValidate: function({commit}, payload) {
      commit('setInvitationValidate', payload)
    },
    updateUserAccessState: function({commit}, payload) {
      commit('setUserAccessState', payload)
    },
    updateCodeModal({commit}, payload) {
      commit('setCodeModal', payload)
    },
    updateProfilePicture({commit}, payload) {
      commit('setProfilePicture', payload)
    },
    updateScheduleLoading({commit}, payload) {
      commit('setScheduleLoading', payload)
    },
    updateUserIdEncrypt({commit}, payload) {
      commit('setUserIdEncrypt', payload)
    }
}


export default {
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions,

}
