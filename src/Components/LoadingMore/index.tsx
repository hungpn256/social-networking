import React from 'react'
import loadingMore from '../../Assets/loading.svg'
export default function LoadingMore() {
  return (
    <div className="flex justify-center">
      <img src={loadingMore} alt="loading more..." className="w-[100px]" />
    </div>
  )
}
