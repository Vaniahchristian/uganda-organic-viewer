'use client'

import dynamic from 'next/dynamic'
import SceneProvider from '@/components/providers/SceneProvider'
import ViewerShell from '@/components/ui/ViewerShell'

// three.js has no server runtime — load the canvas client-side only.
const RestaurantViewer = dynamic(() => import('@/components/viewer/RestaurantViewer'), {
  ssr: false,
})

export default function Home() {
  return (
    <main>
      <SceneProvider>
        <ViewerShell>
          <RestaurantViewer />
        </ViewerShell>
      </SceneProvider>
    </main>
  )
}
