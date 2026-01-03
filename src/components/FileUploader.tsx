import React, { useCallback, useState } from 'react'
import { UploadCloud, FileKey, X } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { cn } from '@/lib/utils'

interface FileUploaderProps {
    onFileSelect: (file: File) => void
    accept?: Record<string, string[]>
    label?: string
    subLabel?: string
    icon?: React.ElementType
    className?: string
    activeClassName?: string
}

export default function FileUploader({
    onFileSelect,
    accept = {
        'image/png': ['.png'],
        'image/jpeg': ['.jpg', '.jpeg'],
    },
    label = "Drop X-Ray or Scan",
    subLabel = "PNG, JPG only",
    icon: Icon = UploadCloud,
    className,
    activeClassName
}: FileUploaderProps) {
    const [selectedFileName, setSelectedFileName] = useState<string | null>(null)

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0]
            setSelectedFileName(file.name)
            onFileSelect(file)
        }
    }, [onFileSelect])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept,
        maxFiles: 1
    })

    const clearFile = (e: React.MouseEvent) => {
        e.stopPropagation()
        setSelectedFileName(null)
        // Reset the file input if needed, though react-dropzone handles this well usually
    }

    return (
        <div
            {...getRootProps()}
            className={cn(
                "border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer relative",
                isDragActive
                    ? "border-blue-500 bg-blue-50 dark:bg-zinc-800"
                    : "border-slate-300 dark:border-zinc-700 hover:border-blue-500 dark:hover:border-cyan-500 bg-slate-50 dark:bg-zinc-950/50",
                activeClassName && isDragActive ? activeClassName : "",
                className
            )}
        >
            <input {...getInputProps()} />

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
