import React, { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, Eye, Loader2 } from 'lucide-react';
import { api } from '../../api/axios';

interface PendingPayment {
  id: string;
  orderNumber: string;
  createdAt: string;
  user: { firstName: string; lastName: string; phone: string };
  event: { title: string; price: number };
}

export const PaymentsPage: React.FC = () => {
  const [payments, setPayments] = useState<PendingPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchPayments = () => {
    setLoading(true);
    api
      .get<PendingPayment[]>('/registrations/pending-payments')
      .then((res) => setPayments(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(fetchPayments, []);

  const handleApprove = async (id: string) => {
    setProcessingId(id);
    try {
      await api.patch(`/registrations/${id}/approve-payment`);
      setPayments((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      alert(err.response?.data?.message || 'Ошибка подтверждения');
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id: string) => {
    const reason = prompt('Причина отклонения (необязательно):') || undefined;
    setProcessingId(id);
    try {
      await api.patch(`/registrations/${id}/reject-payment`, { reason });
      setPayments((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      alert(err.response?.data?.message || 'Ошибка отклонения');
    } finally {
      setProcessingId(null);
    }
  };

  const viewReceipt = (id: string) => {
    // отдельный защищённый эндпоинт — открываем с токеном через blob, не прямой ссылкой
    api.get(`/registrations/${id}/receipt`, { responseType: 'blob' }).then((res) => {
      const url = window.URL.createObjectURL(res.data);
      window.open(url, '_blank');
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Payments</h1>
        <p className="text-sm text-slate-500">Заявки на подтверждение оплаты</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-400">Загрузка…</div>
        ) : payments.length === 0 ? (
          <div className="p-8 text-center text-slate-400">Нет заявок на подтверждение</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-100 text-xs text-slate-400 font-semibold uppercase">
              <tr>
                <th className="p-4">Участник</th>
                <th className="p-4">Событие</th>
                <th className="p-4">Заказ</th>
                <th className="p-4">Сумма</th>
                <th className="p-4 text-right">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-slate-900">
                    {p.user.firstName} {p.user.lastName}
                    <div className="text-xs text-slate-400 font-normal">{p.user.phone}</div>
                  </td>
                  <td className="p-4 text-slate-600">{p.event.title}</td>
                  <td className="p-4 font-mono text-xs text-slate-500">{p.orderNumber}</td>
                  <td className="p-4 text-slate-600">{p.event.price?.toLocaleString('ru-RU')} UZS</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-1.5">
                      <button
                        onClick={() => viewReceipt(p.id)}
                        title="Посмотреть чек"
                        className="p-2 text-slate-400 hover:text-purple-600 transition"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleApprove(p.id)}
                        disabled={processingId === p.id}
                        title="Подтвердить"
                        className="p-2 text-slate-400 hover:text-emerald-600 transition disabled:opacity-50"
                      >
                        {processingId === p.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleReject(p.id)}
                        disabled={processingId === p.id}
                        title="Отклонить"
                        className="p-2 text-slate-400 hover:text-red-600 transition disabled:opacity-50"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};