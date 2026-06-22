export const APP_NAME = import.meta.env.VITE_APP_TITLE || 'Vue H5 Template'
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '0.1.0'
export const APP_ENV = import.meta.env.VITE_APP_ENV || import.meta.env.MODE
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'
export const MOCK_ENABLED = import.meta.env.VITE_MOCK_ENABLED === 'true'
export const REQUEST_TIMEOUT = Number(import.meta.env.VITE_REQUEST_TIMEOUT || 10000)
export const STORAGE_PREFIX = 'vue-h5-template:'
