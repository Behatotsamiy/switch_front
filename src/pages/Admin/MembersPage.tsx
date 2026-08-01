import React, { useEffect, useState } from 'react';
import { api } from '../../api/axios';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'GUEST' | 'MEMBER' | 'ADMIN';
  createdAt: string;
}

export const MembersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchUsers = () => {
    api
      .get<User[]>('/users')
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err.response?.data?.message || err.message))
      .finally(() => setLoading(false));
  };

  useEffect(fetchUsers, []);

  const handleRoleChange = async (id: string, role: User['role']) => {
    try {
      setUpdatingId(id);
      await api.patch(`/users/${id}/role`, { role });
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
    } catch (err: any) {
      alert(err.response?.data?.message || 'Не удалось изменить роль');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Participants</h1>
        <p className="text-sm text-slate-500">Зарегистрированные пользователи</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-400">Загрузка участников...</div>
        ) : users.length === 0 ? (
          <div className="p-8 text-center text-slate-400">Пока никто не зарегистрирован</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-100 text-xs text-slate-400 font-semibold uppercase">
              <tr>
                <th className="p-4">Пользователь</th>
                <th className="p-4">Email</th>
                <th className="p-4">Телефон</th>
                <th className="p-4">Роль</th>
                <th className="p-4">Дата регистрации</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-slate-900">
                    {u.firstName} {u.lastName}
                  </td>
                  <td className="p-4 text-slate-600">{u.email || '—'}</td>
                  <td className="p-4 text-slate-600">{u.phone || '—'}</td>
                  <td className="p-4">
                    <select
                      value={u.role}
                      disabled={updatingId === u.id}
                      onChange={(e) => handleRoleChange(u.id, e.target.value as User['role'])}
                      className={`px-2.5 py-1.5 text-xs font-bold rounded-full border-0 cursor-pointer disabled:opacity-50 ${
                        u.role === 'ADMIN'
                          ? 'bg-purple-100 text-purple-700'
                          : u.role === 'MEMBER'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <option value="GUEST">GUEST</option>
                      <option value="MEMBER">MEMBER</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </td>
                  <td className="p-4 text-slate-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};