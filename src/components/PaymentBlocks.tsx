import React, { useState } from 'react';
import { Copy, Upload, Clock, XCircle, Loader2 } from 'lucide-react';
import { api } from '../api/axios';

interface Props {
  ticket: {
    orderNumber: string | null;
    event: { price: number | null };
    paymentRejectionReason?: string | null;
  };
  registrationId: string;
  onUploaded: () => void;
}

const CARD_NUMBER = '8600 1234 5678 9012'; // отображаемое значение — реальное лучше подтягивать с бэка через отдельный публичный эндпоинт
const CARD_HOLDER = 'SWITCH COMMUNITY';

export const PaymentPendingBlock: React.FC<Props> = ({ ticket, registrationId, onUploaded }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const copyCard = () => {
    navigator.clipboard.writeText(CARD_NUMBER.replace(/\s/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      await api.post(`/registrations/${registrationId}/receipt`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onUploaded();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Не удалось загрузить чек');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="text-left space-y-4">
      <div className="flex items-center gap-2 justify-center text-amber-600">
        <Clock className="w-5 h-5" />
        <span className="font-bold text-sm">Ожидаем подтверждение оплаты</span>
      </div>

      <div className="bg-amber-50 dark:bg-amber-950/30 rounded-2xl p-4 space-y-3">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-amber-600 font-bold">Сумма к оплате</div>
          <div className="text-lg font-bold text-slate-900 dark:text-white">
            {ticket.event.price?.toLocaleString('ru-RU')} UZS
          </div>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-wider text-amber-600 font-bold">Карта для перевода</div>
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-sm font-bold text-slate-900 dark:text-white">{CARD_NUMBER}</span>
            <button onClick={copyCard} className="text-amber-600 hover:text-amber-700">
              <Copy className="w-4 h-4" />
            </button>
          </div>
          {copied && <span className="text-[10px] text-emerald-600">Скопировано!</span>}
          <div className="text-xs text-slate-500 mt-0.5">{CARD_HOLDER}</div>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-wider text-amber-600 font-bold">
            Назначение платежа (укажите обязательно)
          </div>
          <div className="font-mono text-sm font-bold text-slate-900 dark:text-white">{ticket.orderNumber}</div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300">
          Загрузите скриншот чека
        </label>
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="w-full text-xs file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-purple-50 file:text-purple-700 file:text-xs file:font-semibold"
        />
        {error && <div className="text-xs text-red-600">{error}</div>}
        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
        >
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          {uploading ? 'Загружаем…' : 'Отправить чек на проверку'}
        </button>
      </div>
    </div>
  );
};

export const PaymentRejectedBlock: React.FC<Props> = ({ ticket, registrationId, onUploaded }) => (
  <div className="text-left space-y-4">
    <div className="flex items-center gap-2 justify-center text-red-600">
      <XCircle className="w-5 h-5" />
      <span className="font-bold text-sm">Оплата отклонена</span>
    </div>
    <div className="bg-red-50 dark:bg-red-950/30 rounded-2xl p-4 text-sm text-red-700 dark:text-red-300">
      {ticket.paymentRejectionReason || 'Чек не подтверждён'}
    </div>
    <PaymentPendingBlock ticket={ticket} registrationId={registrationId} onUploaded={onUploaded} />
  </div>
);