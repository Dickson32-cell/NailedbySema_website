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
                setMessage('Code verified! Downloading your handout...')

                // Trigger file download
                const link = document.createElement('a')
                link.href = '/Training_HandOut.pdf'
                link.download = 'Sema_Training_HandOut.pdf'
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)

                // Close modal after a delay
                setTimeout(() => {
                    onClose()
                    setCode('')
                    setStatus('idle')
                }, 3000)
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
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
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
                                    To download the exclusive Training Handout, please send <strong className="text-charcoal">200 GHS</strong> via MoMo to:
                                </p>
                                <div className="bg-white px-4 py-2 rounded-md border border-gray-200 text-center mb-3">
                                    <span className="font-display text-xl tracking-wider text-charcoal">0539649949</span>
                                </div>
                                <p className="font-body text-sm text-charcoal/80 mb-2">
                                    Once paid, message Sema on WhatsApp to receive your secure, one-time download code.
                                </p>
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

                                <button
                                    type="submit"
                                    disabled={status === 'loading' || status === 'success'}
                                    className="w-full bg-dustyrose text-charcoal font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-champagne hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:hover:scale-100 shadow-md"
                                >
                                    {status === 'loading' ? (
                                        <span className="animate-pulse">Verifying...</span>
                                    ) : status === 'success' ? (
                                        <>Downloading... <Download className="w-5 h-5 animate-bounce" /></>
                                    ) : (
                                        <>Verify & Download <Download className="w-5 h-5" /></>
                                    )}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default HandoutModal
