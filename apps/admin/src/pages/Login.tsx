import { Button } from '@/components/ui/button';
import { apiClient } from '@/lib/api';
import { useAdminStore } from '@/stores/admin';
import { useMutation } from '@tanstack/react-query';
import { Eye, EyeOff, LockKeyhole, Sprout, UserRound } from 'lucide-react';
import { type FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const setUser = useAdminStore((s) => s.setUser);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await apiClient.POST('/api/v1/auth/login', {
        body: { username, password },
      });
      if (error) throw new Error(t('auth.loginFailed'));
      return data;
    },
    onSuccess: (token) => {
      localStorage.setItem('admin-token', token.access_token);
      setUser({ username, role: 'admin' }, token.access_token);
      navigate('/dashboard');
    },
  });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    loginMutation.mutate();
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7faf5]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(183,236,79,0.24),transparent_30%),radial-gradient(circle_at_78%_22%,rgba(223,244,255,0.82),transparent_28%),linear-gradient(135deg,#fbfaf4_0%,#f4f8ef_48%,#eaf6f3_100%)]" />

      <section className="absolute inset-y-0 left-0 hidden w-[calc(100%-460px)] overflow-hidden lg:block">
        <svg
          className="absolute -left-[9%] top-[2%] h-[92%] w-[86%]"
          viewBox="0 0 960 720"
          role="img"
          aria-label="自然光环视觉占位"
        >
          <defs>
            <linearGradient id="leafRing" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#eef8a8" stopOpacity="0.78" />
              <stop offset="46%" stopColor="#b7ec4f" stopOpacity="0.86" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0.72" />
            </linearGradient>
            <linearGradient id="glassRing" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.82" />
              <stop offset="55%" stopColor="#dff4ff" stopOpacity="0.34" />
              <stop offset="100%" stopColor="#6f7f44" stopOpacity="0.5" />
            </linearGradient>
            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow
                dx="0"
                dy="32"
                stdDeviation="38"
                floodColor="#78a84d"
                floodOpacity="0.24"
              />
            </filter>
          </defs>
          <path
            d="M-40 204 C160 44 470 32 708 154"
            fill="none"
            stroke="url(#glassRing)"
            strokeLinecap="round"
            strokeWidth="74"
          />
          <path
            d="M250 438 C390 548 652 514 810 376"
            fill="none"
            stroke="url(#leafRing)"
            strokeLinecap="round"
            strokeWidth="92"
            filter="url(#softShadow)"
          />
          <path
            d="M568 88 C760 118 898 250 890 424"
            fill="none"
            stroke="url(#leafRing)"
            strokeLinecap="round"
            strokeWidth="58"
            opacity="0.72"
          />
          <path
            d="M618 580 C742 520 834 412 868 294"
            fill="none"
            stroke="url(#glassRing)"
            strokeLinecap="round"
            strokeWidth="44"
            opacity="0.58"
          />
          <g filter="url(#softShadow)">
            <circle cx="438" cy="334" r="120" fill="url(#leafRing)" opacity="0.88" />
            <rect x="354" y="250" width="138" height="158" rx="38" fill="rgba(255,255,255,0.76)" />
            <path d="M426 294 h36 a42 42 0 0 1 0 84 h-36z" fill="rgba(255,255,255,0.82)" />
          </g>
        </svg>

        <div className="absolute bottom-12 left-16 max-w-xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/60 px-4 py-2 text-sm font-semibold text-nature-stem shadow-sm">
            <Sprout className="h-4 w-4 text-lime-500" />
            Cultural Tourism Console
          </div>
          <h1 className="text-5xl font-black leading-tight text-nature-moss">
            景区 AI 眼镜运营，
            <br />
            从这里开始。
          </h1>
        </div>
      </section>

      <main className="relative z-10 flex min-h-screen items-center justify-center px-6 py-8 lg:justify-end lg:px-12">
        <section className="flex min-h-[690px] w-full max-w-[420px] flex-col justify-center rounded-[28px] border border-white/85 bg-white/78 px-10 shadow-[0_28px_90px_rgba(89,116,72,0.16)] backdrop-blur-md">
          <div className="mb-12 flex flex-col items-center text-center">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-nature-moss text-nature-leaf shadow-sm">
              <Sprout className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-black text-nature-moss">森游星球</h2>
            <p className="mt-2 text-sm text-muted-foreground">文旅 AI 眼镜运营后台</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            <label className="block">
              <span className="sr-only">{t('auth.username')}</span>
              <div className="flex h-11 items-center gap-3 rounded-lg border border-white/90 bg-white/90 px-4 shadow-sm transition duration-200 focus-within:border-nature-leaf focus-within:ring-2 focus-within:ring-nature-leaf/20">
                <UserRound className="h-4 w-4 text-muted-foreground" />
                <input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                  placeholder="手机号/账号"
                  className="min-w-0 flex-1 bg-transparent text-sm font-medium text-nature-moss outline-none placeholder:text-stone-400"
                />
              </div>
            </label>

            <label className="block">
              <span className="sr-only">{t('auth.password')}</span>
              <div className="flex h-11 items-center gap-3 rounded-lg border border-white/90 bg-white/90 px-4 shadow-sm transition duration-200 focus-within:border-nature-leaf focus-within:ring-2 focus-within:ring-nature-leaf/20">
                <LockKeyhole className="h-4 w-4 text-muted-foreground" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="密码"
                  className="min-w-0 flex-1 bg-transparent text-sm font-medium text-nature-moss outline-none placeholder:text-stone-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="text-muted-foreground transition duration-200 hover:text-nature-moss"
                  aria-label={showPassword ? '隐藏密码' : '显示密码'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </label>

            {loginMutation.error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
                {loginMutation.error.message}
              </p>
            )}

            <Button
              type="submit"
              className="h-11 w-full rounded-lg bg-[#151a15] text-sm font-black text-white shadow-sm transition duration-200 hover:bg-[#202820] hover:brightness-110 active:translate-y-px"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? t('common.loading') : t('auth.login')}
            </Button>
          </form>

          <p className="mt-28 text-center text-xs text-muted-foreground">
            Copyright 2026 Cultural Tourism
          </p>
        </section>
      </main>
    </div>
  );
}
