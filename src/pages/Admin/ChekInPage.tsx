import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle2, XCircle, ScanLine, Keyboard, Loader2 } from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';
import { api } from '../../api/axios';

interface CheckInResult {
  success: boolean;
  message: string;
  holder?: string;
  eventTitle?: string;
}

export const CheckInPage: React.FC = () => {
  const [mode, setMode] = useState<'manual' | 'scan'>('manual');
  const [ticketNumber, setTicketNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CheckInResult | null>(null);

  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scanningRef = useRef(false); // защита от повторного срабатывания на одном кадре

  const doCheckIn = async (rawTicket: string) => {
    // QR кодирует JSON {"ticket": "...", "eventId": "..."} — вытаскиваем ticketNumber,
    // но если ввели вручную — это просто голая строка номера
    let ticket = rawTicket.trim();
    try {
      const parsed = JSON.parse(rawTicket);
      if (parsed.ticket) ticket = parsed.ticket;
    } catch {
      // не JSON — значит это уже сам номер билета, ок
    }

    if (!ticket) return;

    setLoading(true);
    setResult(null);
    try {
      const { data } = await api.post('/registrations/check-in', { ticketNumber: ticket });
      setResult({
        success: true,
        message: 'Вход подтверждён',
        holder: `${data.user?.firstName ?? ''} ${data.user?.lastName ?? ''}`.trim(),
        eventTitle: data.event?.title,
      });
    } catch (err: any) {
      setResult({
        success: false,
        message: err.response?.data?.message || 'Билет не найден или недействителен',
      });
    } finally {
      setLoading(false);
      setTicketNumber('');
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    doCheckIn(ticketNumber);
  };

  // Камера-сканер
  useEffect(() => {
    if (mode !== 'scan') {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
        scannerRef.current = null;
      }
      return;
    }

    const scanner = new Html5Qrcode('qr-reader');
    scannerRef.current = scanner;

scanner
  .start(
    { facingMode: 'environment' },
    { fps: 10, qrbox: { width: 260, height: 260 } },
    (decodedText) => {
      if (scanningRef.current) return;
      scanningRef.current = true;
      scanner.pause(true); // явно останавливаем сканирование кадров, а не только флагом

      doCheckIn(decodedText).finally(() => {
        setTimeout(() => {
          scanningRef.current = false;
          scanner.resume(); // возобновляем только когда предыдущий запрос завершён
        }, 1500);
      });
    },
    () => {},
  )

    return () => {
      scanner.stop().catch(() => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Check-in</h1>
        <p className="text-sm text-slate-500">Отметка входа участников по билету</p>
      </div>

      <div className="flex bg-slate-100 p-1 rounded-xl">
        <button
          onClick={() => setMode('manual')}
          className={`flex-1 py-2.5 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition ${
            mode === 'manual' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-500'
          }`}
        >
          <Keyboard className="w-4 h-4" /> Вручную
        </button>
        <button
          onClick={() => setMode('scan')}
          className={`flex-1 py-2.5 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition ${
            mode === 'scan' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-500'
          }`}
        >
          <ScanLine className="w-4 h-4" /> Камера
        </button>
      </div>

      {mode === 'manual' ? (
        <form onSubmit={handleManualSubmit} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Номер билета</label>
            <input
              type="text"
              autoFocus
              value={ticketNumber}
              onChange={(e) => setTicketNumber(e.target.value)}
              placeholder="SW-TCK-A1B2C3"
              className="w-full p-3 border border-slate-200 rounded-xl text-sm font-mono focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !ticketNumber.trim()}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Отметить вход
          </button>
        </form>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
          <div id="qr-reader" className="rounded-xl overflow-hidden" />
          <p className="text-xs text-slate-400 text-center mt-3">Наведите камеру на QR-код билета</p>
        </div>
      )}

      {result && (
        <div
          className={`rounded-2xl p-5 flex items-start gap-3 border ${
            result.success ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'
          }`}
        >
          {result.success ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
          ) : (
            <XCircle className="w-6 h-6 text-red-600 shrink-0" />
          )}
          <div>
            <div className={`font-bold text-sm ${result.success ? 'text-emerald-700' : 'text-red-700'}`}>
              {result.message}
            </div>
            {result.success && result.holder && (
              <div className="text-sm text-slate-600 mt-1">
                {result.holder} — {result.eventTitle}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};