import { apiParams } from '../api'

export const getCarousel = async (params) => {
  const res = await apiParams('GET', params, `carousel/`, '')
  if (res.status === 200) {
    const data = res?.data
    return data
  }
}
