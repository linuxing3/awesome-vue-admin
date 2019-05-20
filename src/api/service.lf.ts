import lfService from '@/util/request.localforage'

/**
 * crud func
 * @param parameter
 * @returns {Promise<any>}
 */
function crud({ url, method, data }) {
  return lfService.request({
    url,
    method,
    data
  })
}

function createItem({ url, data }) {
  return lfService.request({
    url,
    method: 'post',
    data
  })
}

function updateItem({ url, data }) {
  return lfService.request({
    url,
    method: 'patch',
    data
  })
}

function deleteItem({ url, data }) {
  return lfService.request({
    url,
    method: 'delete',
    data
  })
}

function fetchItem({ url, data }) {
  return lfService.request({
    url,
    method: 'get',
    data
  })
}

function fetchItems({ url, data }) {
  return lfService.request({
    url,
    method: 'get'
  })
}

export { crud as axios, createItem, deleteItem, updateItem, fetchItem, fetchItems }
