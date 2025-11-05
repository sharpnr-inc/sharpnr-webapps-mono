export const AUTH = {
    LOGIN: "/login",
    REGISTER: "/register",
    OTP_VERIFY:"/otp-verify",
    COMPLETE_REGISTRATION:"/complete-register",
    RESET_PASSWORD:"/password",
    SIGNUP_STATUS:"/signup/status",
    CHECK_USER:"",
    GET_UI:"/get-org-render-tree"
    
}

export const UTILITY = {
    ORG_BUSINESS_TYPE: "utils/org-types",
    ORG_REGISTRATION_TYPE: "utils/org-reg-types",
    COUNTRIES_LIST: "utils/countries",
    STATE_LIST: "utils/countries/${}/states",
    CITIES_LIST: "utils/countries/:countryCode/states/:stateCode/cities",
    GET_SUB_MODULES:"utils/get-submodules"
}