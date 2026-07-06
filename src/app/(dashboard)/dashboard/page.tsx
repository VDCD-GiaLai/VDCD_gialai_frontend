"use client";

import * as React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FiUsers,
  FiFolder,
  FiActivity,
  FiCheckCircle,
  FiTrash2,
  FiRefreshCw,
  FiAlertCircle,
} from "react-icons/fi";
import { UserService } from "@/services/user.service";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { User } from "@/types";

export default function DashboardPage() {
  const queryClient = useQueryClient();
  const [deleteTarget, setDeleteTarget] = React.useState<User | null>(null);
  const [isDeleteLoading, setIsDeleteLoading] = React.useState(false);
  const [showEmptyDemo, setShowEmptyDemo] = React.useState(false);

  // React Query Fetch Example
  const {
    data: users,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: UserService.getUsers,
    enabled: !showEmptyDemo, // disable if showing empty state demo
  });

  // React Query Mutation Mock Example
  const deleteMutation = useMutation({
    mutationFn: async (userId: string) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return userId;
    },
    onSuccess: (deletedId) => {
      // Optimistically update query client state
      queryClient.setQueryData<User[]>(["users"], (oldUsers) =>
        (oldUsers || []).filter((u) => u.id !== deletedId),
      );
      setDeleteTarget(null);
      setIsDeleteLoading(false);
    },
    onError: () => {
      setIsDeleteLoading(false);
    },
  });

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    setIsDeleteLoading(true);
    deleteMutation.mutate(deleteTarget.id);
  };

  // Top stats grid data
  const stats = [
    {
      label: "Tổng liên kết",
      value: "63 Tỉnh",
      icon: <FiUsers className="text-blue-500 w-6 h-6" />,
      desc: "+3 liên kết mới tuần này",
    },
    {
      label: "Dự án số",
      value: "542 Dự án",
      icon: <FiFolder className="text-red-500 w-6 h-6" />,
      desc: "98% hoàn thành đúng hạn",
    },
    {
      label: "Băng thông vùng",
      value: "4.8 Gbps",
      icon: <FiActivity className="text-purple-500 w-6 h-6" />,
      desc: "Hoạt động ổn định",
    },
    {
      label: "Hệ thống hạ tầng",
      value: "99.98%",
      icon: <FiCheckCircle className="text-teal-500 w-6 h-6" />,
      desc: "Thời gian hoạt động thực tế",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Welcome banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tighter text-black dark:text-white">
            Trung Tâm Giám Sát Hệ Thống
          </h2>
          <p className="text-secondary dark:text-zinc-400 text-sm">
            Cập nhật dữ liệu thời gian thực cho hạ tầng số và đối tác Gia Lai.
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="flat"
            color="success"
            className="font-mono-label text-[10px] uppercase font-bold"
            onClick={() => setShowEmptyDemo(!showEmptyDemo)}
          >
            {showEmptyDemo ? "Hiện danh sách" : "Demo Trạng thái Trống"}
          </Button>

          <Button
            variant="bordered"
            radius="lg"
            onClick={() => refetch()}
            isDisabled={isLoading || isRefetching}
            className="border-whisper-border text-secondary dark:text-zinc-300 font-mono-label text-[10px] uppercase font-bold"
            trailingIcon={
              <FiRefreshCw
                className={`w-3 h-3 ${isRefetching ? "animate-spin" : ""}`}
              />
            }
          >
            Làm mới
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card
            key={idx}
            className="bg-pure-surface dark:bg-zinc-900 border border-whisper-border/50"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono-label text-[10px] font-bold text-secondary dark:text-zinc-400 uppercase tracking-wider">
                {stat.label}
              </span>
              <div className="p-2 rounded-xl bg-secondary/5 dark:bg-zinc-800">
                {stat.icon}
              </div>
            </div>
            <div className="text-2xl font-bold text-black dark:text-white tracking-tight mb-1">
              {stat.value}
            </div>
            <p className="text-[10px] text-secondary/80 dark:text-zinc-500 font-medium">
              {stat.desc}
            </p>
          </Card>
        ))}
      </div>

      {/* Main Workspace Table & Lists */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold tracking-tighter text-black dark:text-white">
          Danh Sách Thành Viên & Đối Tác Vận Hành
        </h3>

        {showEmptyDemo ? (
          <EmptyState
            title="Chưa cấu hình cơ sở dữ liệu đối tác"
            description="Bản ghi trống. Vui lòng thêm đối tác liên kết hoặc bật lại trạng thái hiển thị danh sách."
            actionLabel="Quay lại danh sách"
            onAction={() => setShowEmptyDemo(false)}
          />
        ) : isLoading ? (
          <div className="h-64 flex items-center justify-center border border-whisper-border rounded-xl bg-pure-surface/50 dark:bg-zinc-950/20">
            <LoadingSpinner label="Đang tải danh sách thành viên..." />
          </div>
        ) : isError ? (
          <ErrorState
            title="Lỗi tải dữ liệu"
            message="Không thể kết nối tới máy chủ mock API. Hãy kiểm tra cài đặt mạng."
            onRetry={() => refetch()}
          />
        ) : (
          <Table>
            <TableHeader>
              <TableColumn>Tên đối tác / Thành viên</TableColumn>
              <TableColumn>Địa chỉ Email</TableColumn>
              <TableColumn>Quyền hạn</TableColumn>
              <TableColumn>Ngày tham gia</TableColumn>
              <TableColumn className="text-right">Hành động</TableColumn>
            </TableHeader>
            <TableBody>
              {(users || []).map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-bold text-black dark:text-white">
                    {row.name}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {row.email}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono-label font-bold uppercase ${
                        row.role === "admin"
                          ? "bg-danger-50 text-danger dark:bg-danger-950/20"
                          : "bg-success-50 text-accent-red dark:bg-success-950/20"
                      }`}
                    >
                      {row.role}
                    </span>
                  </TableCell>
                  <TableCell className="text-secondary">
                    {formatDate(row.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      isIconOnly
                      color="danger"
                      variant="light"
                      size="sm"
                      onClick={() => setDeleteTarget(row)}
                      aria-label="Xóa thành viên"
                      className="text-secondary dark:text-zinc-500 hover:text-danger!"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Confirm Deletion Dialog */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleteLoading}
        isDangerous={true}
        title="Xóa thành viên liên kết?"
        message={`Bạn có chắc chắn muốn loại bỏ đối tác "${deleteTarget?.name}" khỏi hệ thống điều hành số Gia Lai không? Hành động này không thể hoàn tác.`}
        confirmLabel="Loại bỏ đối tác"
        cancelLabel="Hủy"
      />
    </div>
  );
}
