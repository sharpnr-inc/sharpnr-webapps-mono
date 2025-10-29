export const AUTH = {
    LOGIN: "/login",
    REGISTER: "/register",
    OTP_VERIFY:"/otp-verify",
    COMPLETE_REGISTRATION:"/complete-register",
    RESET_PASSWORD:"/password",
    SIGNUP_STATUS:"/signup/status",
    CHECK_USER:"",
    
}

export const UTILITY = {
    ORG_BUSINESS_TYPE: "utils/org-types",
    ORG_REGISTRATION_TYPE: "utils/org-reg-types",
    COUNTRIES_LIST: "utils/countries",
    STATE_LIST: "utils/countries/${}/states",
    CITIES_LIST: "utils/countries/:countryCode/states/:stateCode/cities"
}