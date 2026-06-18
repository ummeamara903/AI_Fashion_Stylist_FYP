'use client'

import { useState } from 'react'

export default function InputForm({ onSubmit }: any) {

  const [formData, setFormData] = useState({
    gender: '',
    season: '',
    occasion: '',
    dress_type: '',
    budget: ''
  })

  const setField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-4 text-sm"
    >

      {/* TITLE */}
      <h2 className="text-base sm:text-lg font-semibold text-gray-700">
        Input Preferences
      </h2>

      {/* GENDER */}
      <div>
        <p className="mb-2 text-xs sm:text-sm">Gender</p>

        <div className="flex gap-2 flex-wrap">
          {['male', 'female'].map((g) => (
            <button
              type="button"
              key={g}
              onClick={() => setField('gender', g)}
              className={`
                px-3 py-1 rounded-full border text-xs sm:text-sm
                ${formData.gender === g
                  ? 'bg-black text-white'
                  : 'bg-gray-100'
                }
              `}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* SEASON */}
      <div>
        <p className="mb-2 text-xs sm:text-sm">Season</p>

        <div className="flex gap-2 flex-wrap">
          {['summer', 'winter', 'autumn', 'spring'].map((s) => (
            <button
              type="button"
              key={s}
              onClick={() => setField('season', s)}
              className={`
                px-3 py-1 rounded-full border text-xs sm:text-sm
                ${formData.season === s
                  ? 'bg-black text-white'
                  : 'bg-gray-100'
                }
              `}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* OCCASION */}
      <div>
        <p className="mb-2 text-xs sm:text-sm">Occasion</p>

        <select
          onChange={(e) => setField('occasion', e.target.value)}
          className="
            w-full
            border
            p-2
            rounded-lg
            text-sm
            bg-white
          "
        >
          <option value="">Select</option>
          <option value="casual">Casual</option>
          <option value="formal">Formal</option>
          <option value="party">Party</option>
          <option value="christmas">Christmas</option>
          <option value="wedding">Wedding</option>
        </select>
      </div>

      {/* DRESS TYPE */}
      <div>
        <p className="mb-2 text-xs sm:text-sm">Dress Type</p>

        <div className="flex gap-2 flex-wrap">
          {['western', 'eastern'].map((d) => (
            <button
              type="button"
              key={d}
              onClick={() => setField('dress_type', d)}
              className={`
                px-3 py-1 rounded-full border text-xs sm:text-sm
                ${formData.dress_type === d
                  ? 'bg-black text-white'
                  : 'bg-gray-100'
                }
              `}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* BUDGET */}
      <div>
        <p className="mb-2 text-xs sm:text-sm">Budget</p>

        <input
          type="number"
          placeholder="PKR"
          onChange={(e) => setField('budget', e.target.value)}
          className="
            w-full
            border
            p-2
            rounded-lg
            text-sm
          "
        />
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        className="
          w-full
          bg-black
          text-white
          py-2
          rounded-lg
          text-sm sm:text-base
          hover:bg-gray-800
          transition
        "
      >
        Generate
      </button>

    </form>
  )
}