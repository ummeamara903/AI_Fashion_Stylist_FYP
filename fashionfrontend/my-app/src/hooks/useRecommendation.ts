'use client'

import { useState } from 'react'

import {
  getRecommendations
} from '@/services/recommendationService'


export const useRecommendation = () => {

  const [data, setData] = useState<any>(null)

  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState<any>(null)


  const fetchData = async (payload: any) => {

    setLoading(true)

    try {

      setFormData(payload)

      const res = await getRecommendations(payload)

      setData(res)

    } catch (err) {

      console.log(err)

    } finally {

      setLoading(false)
    }
  }

  return {
    data,
    loading,
    formData,
    fetchData
  }
}