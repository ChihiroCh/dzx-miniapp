import http from '@/utils/request'

export function getUserProfile() {
  return http.get('/user/profile')
}
