"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiLock, FiMail, FiArrowRight } from "react-icons/fi";
import { loginSchema, LoginInput } from "@/schemas/auth.schema";
import { AuthService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { FormField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { APP_ROUTES } from "@/lib/constants";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  // Read URL query param to redirect back to target route if needed
  const redirectFrom = searchParams.get("from") || APP_ROUTES.DASHBOARD;

  const { control, handleSubmit } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema as any),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginInput) => {
    setErrorMsg(null);
    setIsLoading(true);

    try {
      // Call mock auth service
      const res = await AuthService.login(data);

      // Update state in Zustand auth store
      setAuth(res.user, res.accessToken);

      // Force route navigation to dashboard
      router.push(redirectFrom);
    } catch (err: any) {
      console.error("Login failed:", err);
      setErrorMsg(
        err.response?.data?.error ||
          "Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản hoặc mật khẩu.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[75vh] flex items-center justify-center pt-32 pb-16 px-6 bg-canvas-white dark:bg-zinc-950 transition-colors duration-300">
      <Card className="w-full max-w-[420px] shadow-xl p-8 bg-pure-surface dark:bg-zinc-900 border border-whisper-border dark:border-zinc-800">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold tracking-tighter text-black dark:text-white mb-2">
            Đăng Nhập Đối Tác
          </h2>
          <p className="text-sm text-secondary dark:text-zinc-400">
            Truy cập cổng thông tin hệ thống VDCD Group
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-lg bg-danger-50 dark:bg-danger-950/20 text-danger text-xs font-semibold leading-relaxed border border-danger/10">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            name="email"
            control={control}
            label=""
            placeholder="admin@vdcdgroup.vn"
            type="email"
            autoComplete="email"
            startContent={
              <FiMail className="text-secondary dark:text-zinc-500 mr-1" />
            }
          />

          <FormField
            name="password"
            control={control}
            label=""
            placeholder="••••••••"
            type="password"
            autoComplete="current-password"
            startContent={
              <FiLock className="text-secondary dark:text-zinc-500 mr-1" />
            }
          />

          <div className="pt-2">
            <Button
              type="submit"
              color="success"
              isLoading={isLoading}
              className="w-full bg-accent-red text-white font-mono-label text-xs uppercase tracking-wider font-bold py-6 rounded-lg"
              trailingIcon={
                !isLoading && <FiArrowRight className="w-3.5 h-3.5" />
              }
            >
              Đăng nhập hệ thống
            </Button>
          </div>
        </form>

        <div className="mt-8 text-center text-xs text-secondary/80 dark:text-zinc-500">
          <p>Tài khoản dùng thử mặc định:</p>
          <p className="font-mono mt-1 text-accent-red dark:text-red-400 font-bold">
            admin@vdcdgroup.vn / mật khẩu bất kỳ (≥6 ký tự)
          </p>
        </div>
      </Card>
    </div>
  );
}
