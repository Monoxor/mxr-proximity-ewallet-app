import { makeAutoObservable } from 'mobx'
import {
  axiosRestInstance,
  proximityAxiosInstance
} from '../libs/axios/axios.lib'
import objects from './objects.json'
import ProximityStore from './Proximity.store'

class EwalletStore {
  objectName = null
  formFields = null
  showObjectViewMode = null
  showObjectViewModeSecondary = null
  showProcessCard = null
  showSuccessCard = null
  searchQuery = null
  searchPageNum = null
  searchPageObjectCount = null
  searchResultsObjectCount = null
  searchText = null
  objects = null
  selectedObjects = null
  selectedObject = null
  draftObject = null
  filteredObjects = null
  showAddObjectDialog = null
  cancelToken = null
  proximityUrl = null
  constructor(objectName, proximityUrl) {
    this.objectName = objectName
    this.proximityUrl = proximityUrl
    makeAutoObservable(this)
  }

  async objectCreate() {
    const data = this.getFormFields()
    const isProximityEnabled = ProximityStore.getIsProximityEnabled()
    const axiosInstance = isProximityEnabled
      ? proximityAxiosInstance
      : axiosRestInstance
    let response = null
    if (isProximityEnabled) {
      response = await axiosInstance.post(`${this.proximityUrl}/${this.objectName}/create`, {
        data: data
      })
    } else {
      response = await axiosInstance.post(`/${this.objectName}`, {
        data: data
      })
    }

    if (response.status === 200) {
      return response.data
    }
  }

  async objectUpdate() {
    const data = this.getFormFields()
    const response = await axiosRestInstance.put(
      `/${this.objectName}/${data.id}`,
      {
        data: data
      }
    )
    if (response.status === 200) {
      return response.data
    }
  }

  async objectQueryById(id, include = []) {
    const isProximityEnabled = ProximityStore.getIsProximityEnabled()
    const axiosInstance = isProximityEnabled
      ? proximityAxiosInstance
      : axiosRestInstance
    const response = await axiosInstance.get(
      `${isProximityEnabled ? this.proximityUrl : ''}/${this.objectName}/${id}`
    )
    if (response.status === 200) {
      return response.data
    }
  }

  async objectQuery(include) {
    let pageObjectCount = this.getSearchPageObjectCount()
    if (!pageObjectCount) {
      this.setSearchPageObjectCount(10)
      pageObjectCount = this.getSearchPageObjectCount()
    }
    let pageNum = this.getSearchPageNum()
    if (!pageNum) {
      this.setSearchPageNum(0)
      pageNum = this.getSearchPageNum()
    }
    let searchQuery = this.getSearchQuery()
    if (!searchQuery) {
      searchQuery = {}
    }

    let sortQuery = this.getSortQuery()
    if (!sortQuery) {
      sortQuery = []
    }
    const isProximityEnabled = ProximityStore.getIsProximityEnabled()
    const axiosInstance = isProximityEnabled
      ? proximityAxiosInstance
      : axiosRestInstance
    console.log(isProximityEnabled)
    const response = await axiosInstance.post(
      `${isProximityEnabled ? this.proximityUrl : ''}/${
        this.objectName
      }/search`,
      {
        query: {
          where: searchQuery,
          limit: pageObjectCount,
          offset: pageNum * pageObjectCount,
          include: include,
          order: sortQuery
        }
      }
    )

    if (response.status === 200) {
      return response.data
    }
  }

  onClickPageOp(op) {
    let pageNum = this.getSearchPageNum()
    if (op === 'NEXT') {
      pageNum = pageNum + 1
    } else if (op === 'PREV') {
      pageNum = pageNum - 1
    }
    this.setSearchPageNum(pageNum)
  }

  onClickUpdateIcon() {
    const selectedObjects = this.getSelectedObjects()
    if (selectedObjects && Object.keys(selectedObjects).length === 1) {
      this.setShowObjectViewMode('UPDATE')
      const key = Object.keys(selectedObjects)[0]
      const selectedObject = selectedObjects[key]
      this.setFormFields(selectedObject)
      this.setSelectedObjects(null)
    }
  }

  setFormFields(formFields) {
    this.formFields = formFields
    return this.formFields
  }

  getFormFields() {
    return this.formFields
  }

  setShowObjectViewMode(showObjectViewMode) {
    this.showObjectViewMode = showObjectViewMode
    return this.showObjectViewMode
  }

  getShowObjectViewMode() {
    return this.showObjectViewMode
  }

  setShowObjectViewModeSecondary(showObjectViewModeSecondary) {
    this.showObjectViewModeSecondary = showObjectViewModeSecondary
    return this.showObjectViewModeSecondary
  }

  getShowObjectViewModeSecondary() {
    return this.showObjectViewModeSecondary
  }

  setShowProcessCard(showProcessCard) {
    this.showProcessCard = showProcessCard
    return this.showProcessCard
  }

  getShowProcessCard() {
    return this.showProcessCard
  }

  setShowSuccessCard(showSuccessCard) {
    this.showSuccessCard = showSuccessCard
    return this.showSuccessCard
  }

  getShowSuccessCard() {
    return this.showSuccessCard
  }

  getSearchQuery() {
    return this.searchQuery
  }

  setSearchQuery(searchQuery) {
    this.searchQuery = searchQuery
    return this.searchQuery
  }

  getSearchPageNum() {
    return this.searchPageNum
  }

  setSearchPageNum(searchPageNum) {
    this.searchPageNum = searchPageNum
    return this.searchPageNum
  }

  getSearchPageObjectCount() {
    return this.searchPageObjectCount
  }

  setSearchPageObjectCount(searchPageObjectCount) {
    this.searchPageObjectCount = searchPageObjectCount
    return this.searchPageObjectCount
  }

  getSearchResultsObjectCount() {
    return this.searchResultsObjectCount
  }

  setSearchResultsObjectCount(searchResultsObjectCount) {
    this.searchResultsObjectCount = searchResultsObjectCount
    return this.searchResultsObjectCount
  }

  getSearchText() {
    return this.searchText
  }

  setSearchText(searchText) {
    if (searchText === '' || searchText === null) {
      searchText = null
      this.searchText = searchText
      this.setSearchQuery({})
      return this.searchText
    }
    this.searchText = searchText
    let searchQuery = { $text: { $search: searchText } }
    this.setSearchQuery(searchQuery)
    return this.searchText
  }

  setObjects(objects) {
    this.objects = objects
    return this.objects
  }

  getObjects() {
    return this.objects
  }

  setSelectedObjects(selectedObjects) {
    this.selectedObjects = selectedObjects
    return this.selectedObjects
  }

  getSelectedObjects() {
    return this.selectedObjects
  }

  setSelectedObject(selectedObject) {
    this.selectedObject = selectedObject
    return this.selectedObject
  }

  getSelectedObject() {
    return this.selectedObject
  }

  setDraftObject(draftObject) {
    this.draftObject = draftObject
    return this.draftObject
  }

  getDraftObject() {
    return this.draftObject
  }

  setFilteredObjects(filteredObjects) {
    this.filteredObjects = filteredObjects
    return this.filteredObjects
  }

  getFilteredObjects() {
    return this.filteredObjects
  }

  setSelectedObject(selectedObject) {
    this.selectedObject = selectedObject
    return this.selectedObject
  }

  getSelectedObject() {
    return this.selectedObject
  }

  setDraftObject(draftObject) {
    this.draftObject = draftObject
    return this.draftObject
  }

  getDraftObject() {
    return this.draftObject
  }

  setFilteredObjects(filteredObjects) {
    this.filteredObjects = filteredObjects
    return this.filteredObjects
  }

  getFilteredObjects() {
    return this.filteredObjects
  }

  setShowAddObjectDialog(showAddObjectDialog) {
    this.showAddObjectDialog = showAddObjectDialog
    return this.showAddObjectDialog
  }

  getShowAddObjectDialog() {
    return this.showAddObjectDialog
  }

  setSortQuery(sortQuery) {
    this.sortQuery = sortQuery
    return this.sortQuery
  }

  getSortQuery() {
    return this.sortQuery
  }

  setCancelToken(cancelToken) {
    this.cancelToken = cancelToken
    return this.cancelToken
  }

  getCancelToken() {
    return this.cancelToken
  }

  resetAllFields() {
    let formFields = this.getFormFields()
    if (!formFields) {
      formFields = {}
    } else {
      for (const key in formFields) {
        formFields[key] = null
      }
    }
    this.setFormFields(formFields)
    this.setShowObjectViewMode(null)
    this.setShowObjectViewModeSecondary(null)
    this.setShowProcessCard(null)
    this.setShowSuccessCard(null)
    this.setSearchQuery(null)
    this.setSortQuery(null)
    this.setSearchPageNum(null)
    this.setSearchPageObjectCount(null)
    this.setSearchResultsObjectCount(null)
    this.setSearchText(null)
    this.setObjects(null)
    this.setSelectedObjects(null)
    this.setSelectedObject(null)
    this.setDraftObject(null)
    this.setFilteredObjects(null)
    this.setShowAddObjectDialog(null)
  }
}

const stores = {}
for (const key in objects) {
  stores[key] = new EwalletStore(objects[key].name, objects[key].proximityUrl)
}

export default stores
