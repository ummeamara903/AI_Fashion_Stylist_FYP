import { useState, useEffect } from 'react'
import { getSavedImages } from '@/services/savedImageService'

export const useSavedImages = () => {
  const [savedImages, setSavedImages] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const fetchSaved = async () => {
    setLoading(true)
    const data = await getSavedImages()
    setSavedImages(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchSaved()
  }, [])

  return { savedImages, loading, fetchSaved, setSavedImages }
}
