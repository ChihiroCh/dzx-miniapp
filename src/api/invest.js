import http from '@/utils/request'

export function getProjectList(params) {
  return http.get('/invest/projects', params)
}

export function getProjectDetail(id) {
  return http.get(`/invest/projects/${id}`)
}
