import { Suspense } from "react"
import { ShopContent } from "@/components/shop/shop-content"

export default function ShopPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <Suspense fallback={<ShopPageSkeleton />}>
        <ShopContent />
      </Suspense>
    </div>
  )
}

function ShopPageSkeleton() {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <div className="h-12 bg-muted rounded-lg mb-4 w-64 mx-auto" />
        <div className="h-6 bg-muted rounded-lg w-full max-w-2xl mx-auto" />
      </div>
      <div className="flex gap-8">
        <div className="hidden lg:block w-64">
          <div className="h-96 bg-muted rounded-lg" />
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-80 bg-muted rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
