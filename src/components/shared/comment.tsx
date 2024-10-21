"use client";

import { IComment } from '@/work-with-api';
import React from 'react'

export const Comment = ({comment}: {comment: IComment}) => {
  return (
    <div className="flex gap-2">
      <div className="w-8 h-8 rounded-full bg-slate-500" />
      <div>
        <p className="text-sm text-slate-700">{comment.message}</p>
      </div>
    </div>
  )
}
