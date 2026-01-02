'use client'

import React, { useCallback, useState } from 'react'
import { UploadCloud, FileKey, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FileUploaderProps {
    onFileSelect: (file: File) => void
    accept?: string
    label?: string
    subLabel?: string
    icon?: React.ElementType
    className?: string
    activeClassName?: string
}

export default function FileUploader({
    onFileSelect,
    accept = "image/png, image/jpeg",
    label = "Drop X-Ray or Scan",
    subLabel = "PNG, JPG only",
    icon: Icon = UploadCloud,
    className,
    activeClassName
}: FileUploaderProps) {
    const [isDragOver, setIsDragOver] = useState(false)
    const [selectedFileName, setSelectedFileName] = useState<string | null>(null)

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(true)
    }, [])

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(false)
    }, [])

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(false)

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0]
            setSelectedFileName(file.name)
            onFileSelect(file)
        }
    }, [onFileSelect])

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            setSelectedFileName(file.name)
            onFileSelect(file)
        }
    }, [onFileSelect])

    const clearFile = (e: React.MouseEvent) => {
        e.stopPropagation()
        setSelectedFileName(null)
        // We might want a callback for clearing too, but simplified for now
    }

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-upload')?.click()}
            className={cn(
                "border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer relative",
                isDragOver
                    ? "border-blue-500 bg-blue-50 dark:bg-zinc-800"
                    : "border-slate-300 dark:border-zinc-700 hover:border-blue-500 dark:hover:border-cyan-500 bg-slate-50 dark:bg-zinc-950/50",
                activeClassName && isDragOver ? activeClassName : "",
                className
            )}
        >
            <input
                id="file-upload"
                type="file"
                className="hidden"
                accept={accept}
                onChange={handleChange}
            />

            {selectedFileName ? (
                <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center mb-2">
                        <Icon className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
                    </div>
                    <p className="text-sm font-medium text-slate-700 dark:text-zinc-300 truncate max-w-full px-4">{selectedFileName}</p>
                    <button onClick={clearFile} className="mt-2 text-xs text-red-500 hover:underline flex items-center gap-1">
                        <X className="w-3 h-3" /> Remove
                    </button>
                </div>
            ) : (
                <>
                    <Icon className="w-10 h-10 mx-auto text-slate-400 mb-2" />
                    <p className="text-sm font-medium">{label}</p>
                    <p className="text-xs text-slate-400 mt-1">{subLabel}</p>
                </>
            )}
        </div>
    )
}
