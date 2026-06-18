import ResultSection from './ResultSection'
import SaveRecommendationButton from './saveRecommendationButton'

export default function ResultCard({
  data,
  formData
}: any) {

  return (

    <div className="w-full space-y-6">

      {/* TITLE */}
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
        Your Recommendations
      </h2>

      {/* SECTIONS WRAPPER */}
      <div className="space-y-5">

        <ResultSection
          title="Products"
          items={data.product}
        />

        <ResultSection
          title="Shoes"
          items={data.shoes}
        />

        <ResultSection
          title="Accessories"
          items={data.accessory}
        />

        <ResultSection
          title="Colors"
          items={data.color}
        />

      </div>

      {/* SAVE BUTTON */}
      <div className="pt-2 sm:pt-4">
        <SaveRecommendationButton
          data={data}
          formData={formData}
        />
      </div>

    </div>
  )
}