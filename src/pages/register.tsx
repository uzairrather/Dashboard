import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/auth/authSlice';
import { useRouter } from 'next/router';
import { RootState } from '../store';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<any>();
  const router = useRouter();

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(registerUser({ email, password }));
    if (result.meta.requestStatus === 'fulfilled') {
      router.push('/dashboard');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-2 w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2 w-full"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-green-600 text-white px-4 py-2 w-full"
          type="submit"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
}
