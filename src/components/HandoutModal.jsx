import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, ShieldCheck, AlertCircle } from 'lucide-react'
import { validateHandoutCode } from '../lib/supabase'

const HandoutModal = ({ isOpen, onClose }) => {
    const [code, setCode] = useState('')
    const [status, setStatus] = useState('idle') // idle, loading, success, error
    const [message, setMessage] = useState('')

    if (!isOpen) return null

    const handleDownload = async (e) => {
        e.preventDefault()
        if (!code.trim()) {
            setStatus('error')
            setMessage('Please enter a valid code.')
            return
        }

        setStatus('loading')
        setMessage('Verifying code...')

        try {
            const result = await validateHandoutCode(code)

            if (result.valid) {
                setStatus('success')
                setMessage('Code verified! Click the button below if the download does not start automatically.')

                // Try to trigger file download automatically
                try {
                    const link = document.createElement('a')
                    link.href = 'https://csopcqjsaoxvieepuaqk.supabase.co/storage/v1/object/public/handout_pdfs/Training%20HandOut.pdf'
                    link.target = '_blank' // Important for external URLs
                    link.download = 'Sema_Training_HandOut.pdf'
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                } catch (e) {
                    console.error("Auto-download failed:", e)
                }

                // On mobile, auto-download is often blocked. The manual button handles that.
            } else {
                setStatus('error')
                setMessage(result.message || 'Invalid or expired code.')
            }
        } catch (error) {
            setStatus('error')
            setMessage('An error occurred. Please try again.')
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        {/* Header */}
                        <div className="bg-charcoal px-6 py-4 flex items-center justify-between">
                            <h2 className="font-display text-2xl text-porcelain">Training Handout</h2>
                            <button
                                onClick={onClose}
                                className="text-porcelain/80 hover:text-dustyrose transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6">
                            {/* Instructions */}
                            <div className="bg-dustyrose/10 rounded-lg p-4 mb-6 border border-dustyrose/30">
                                <p className="font-body text-sm text-charcoal/80 mb-2">
                                    To download the exclusive Training Handout, please send <strong className="text-charcoal flex items-center gap-1 inline-flex">200 GHS</strong> via MoMo to:
                                </p>
                                <div className="bg-white px-4 py-2 rounded-md border border-gray-200 text-center mb-3">
                                    <span className="font-display text-xl tracking-wider text-charcoal">0539649949</span>
                                </div>
                                <p className="font-body text-sm text-charcoal/80 mb-3">
                                    Once paid, message Sema on WhatsApp to receive your secure, one-time download code.
                                </p>
                                <a
                                    href={`https://wa.me/233539649949?text=${encodeURIComponent('Hi Sema, I just paid 200 GHS for the Training HandOut via MoMo. Can I get my one-time download code please?')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-[#25D366] text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-[#1ebd5a] transition-colors shadow-sm"
                                >
                                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.878-.788-1.472-1.761-1.645-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
                                    Get Code on WhatsApp
                                </a>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleDownload}>
                                <div className="mb-6">
                                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                                        Enter Your Download Code
                                    </label>
                                    <input
                                        type="text"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value.toUpperCase())}
                                        placeholder="e.g. 8F3A29"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dustyrose focus:border-dustyrose uppercase"
                                        disabled={status === 'loading' || status === 'success'}
                                        required
                                    />
                                </div>

                                {message && (
                                    <div className={`p-3 rounded-lg mb-4 flex items-start gap-2 text-sm ${status === 'success' ? 'bg-green-50 text-green-700' :
                                        status === 'error' ? 'bg-red-50 text-red-700' :
                                            'bg-blue-50 text-blue-700'
                                        }`}>
                                        {status === 'success' ? <ShieldCheck className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
                                        <span>{message}</span>
                                    </div>
                                )}

                                {status === 'success' ? (
                                    <a
                                        href="https://csopcqjsaoxvieepuaqk.supabase.co/storage/v1/object/public/handout_pdfs/Training%20HandOut.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        download="Sema_Training_HandOut.pdf"
                                        className="w-full bg-green-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-green-700 transition-all shadow-md"
                                        onClick={() => {
                                            setTimeout(() => {
                                                onClose()
                                                setCode('')
                                                setStatus('idle')
                                            }, 2000)
                                        }}
                                    >
                                        Download Handout <Download className="w-5 h-5 animate-bounce" />
                                    </a>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="w-full bg-dustyrose text-charcoal font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-champagne hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:hover:scale-100 shadow-md"
                                    >
                                        {status === 'loading' ? (
                                            <span className="animate-pulse">Verifying...</span>
                                        ) : (
                                            <>Verify & Download <Download className="w-5 h-5" /></>
                                        )}
                                    </button>
                                )}
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

export default HandoutModal
