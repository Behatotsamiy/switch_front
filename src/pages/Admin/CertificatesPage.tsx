import React, { useEffect, useState } from 'react';
import { Award, Download } from 'lucide-react';
import { api } from '../../api/axios';

interface Certificate {
  id: string;
  certificateNumber: string;
  issuedAt: string;
  user: { firstName: string; lastName: string; email: string };
  event: { title: string; startDate: string };
}

export const CertificatesPage: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<Certificate[]>('/certificates')
      .then((res) => setCertificates(res.data))
      .catch((err) => console.error(err.response?.data?.message || err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleDownload = async (id: string, number: string) => {
    try {
      const res = await api.get(`/certificates/${id}/download`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.download = `certificate-${number}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      alert('Не удалось скачать сертификат');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Certificates</h1>
        <p className="text-sm text-slate-500">Сертификаты, выданные участникам после мероприятий</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-400">Загрузка сертификатов...</div>
        ) : certificates.length === 0 ? (
          <div className="p-8 text-center text-slate-400">
            Сертификатов пока нет — они появятся после завершения мероприятий
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-100 text-xs text-slate-400 font-semibold uppercase">
              <tr>
                <th className="p-4">Участник</th>
                <th className="p-4">Мероприятие</th>
                <th className="p-4">Номер</th>
                <th className="p-4">Дата выдачи</th>
                <th className="p-4 text-right">Действие</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {certificates.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-500 shrink-0" />
                    {c.user.firstName} {c.user.lastName}
                  </td>
                  <td className="p-4 text-slate-600">{c.event.title}</td>
                  <td className="p-4 text-slate-500 font-mono text-xs">{c.certificateNumber}</td>
                  <td className="p-4 text-slate-500">{new Date(c.issuedAt).toLocaleDateString()}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDownload(c.id, c.certificateNumber)}
                      className="p-2 text-slate-400 hover:text-purple-600 transition"
                      title="Скачать PDF"
                    >
                      <Download className="w-4 h-4" />
                    </button>
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