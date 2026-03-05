"use client";

import React, { useState } from "react";
import {
  Trash2,
  ShieldAlert,
  Eye,
  Search,
  Info,
  ChevronRight,
  RotateCcw,
  Loader2,
} from "lucide-react";
import {
  useDeleteHandelByAdminMutation,
  useGetAllUserByAdminQuery,
} from "@/lib/api/baseApi";
import LoadingStat from "@/components/admin/LoadingStat";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

const UserManagement = () => {
  const [searchText, setSearchText] = useState("");
  const [cursor, setCursor] = useState("");

  // API Queries
  const { data, isLoading, isFetching } = useGetAllUserByAdminQuery({
    search: searchText,
    lastId: cursor,
    limit: 10,
  });

  const [deleteHandelByAdmin] = useDeleteHandelByAdminMutation();

  const users = data?.data?.allUser || [];
  const isCursorExits = data?.data?.nextCursor;
  
  console.log(users, ' users')

  const confirmDelete = async (userId: string | number, toastId: string) => {
    try {
    
      await deleteHandelByAdmin(userId).unwrap();
      toast.success("User deleted successfully", { id: toastId });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete user", { id: toastId });
    }
  };

  const handleDeleteUser = (userId: string | number) => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-in fade-in zoom-in-95" : "animate-out fade-out zoom-out-95"
          } w-[380px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 pointer-events-auto`}
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
              <Trash2 className="h-5 w-5 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900">Delete User?</h3>
              <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                This action is permanent. All data associated with this user will be{" "}
                <span className="font-semibold text-gray-700">wiped forever</span>.
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all focus:ring-2 focus:ring-gray-200"
            >
              Keep User
            </button>
            <button
              onClick={() => confirmDelete(userId, t.id)}
              className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 shadow-sm transition-all active:scale-95 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      ),
      { duration: Infinity, position: "top-center" }
    );
  };

  
  const handleNextPage = () => {
    if (isCursorExits) setCursor(isCursorExits);
  };

  const handleResetPagination = () => {
    setCursor("");
  };

  if (isLoading) return <LoadingStat />;

  return (
    <div className="p-8 bg-slate-950 min-h-screen font-sans text-slate-200">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          User Management
        </h1>
      </div>

      {/* Control Bar */}
      <div className="bg-slate-900/50 backdrop-blur-md p-4 rounded-2xl border border-slate-800 mb-6 flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            onChange={(e) => {
                setSearchText(e.target.value);
                setCursor(""); // Reset cursor on search
            }}
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
          />
        </div>
        {isFetching && (
            <div className="flex items-center gap-2 text-indigo-400 text-sm animate-pulse">
                <Loader2 size={16} className="animate-spin" />
                Updating list...
            </div>
        )}
      </div>

      {/* Table Container */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/40 border-b border-slate-800">
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">User Profile</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Access Role</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Administrative</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {users.map((user: any) => (
                <tr key={user._id} className="hover:bg-indigo-500/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Image
                          className="rounded-full bg-slate-800"
                          src={"https://img.icons8.com/office/40/gender-neutral-user.png"}
                          alt={user?.name}
                          height={40}
                          width={40}
                        />
                        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-900 ${user.status === "Active" ? "bg-emerald-500" : "bg-slate-500"}`} />
                      </div>
                      <div>
                        <div className="font-bold text-white group-hover:text-indigo-300 transition-colors">{user.name}</div>
                        <div className="text-sm text-slate-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-300">
                    <span className="bg-slate-800 px-3 py-1 rounded-md border border-slate-700 text-xs">{user.role}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-inset ${user.status === "Active" ? "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20" : "bg-rose-500/10 text-rose-400 ring-rose-500/20"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${user.status === "Active" ? "bg-emerald-400" : "bg-rose-400"}`} />
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">

                 
                      <Link className="p-2.5 text-slate-400 hover:text-indigo-400 hover:bg-indigo-400/10 rounded-xl transition-all" href={`/admin/user/${user._id}`}> 
                      <Eye size={20}/>
                      </Link>
                      
                      <button className="p-2.5 text-slate-400 hover:text-amber-400 hover:bg-amber-400/10 rounded-xl transition-all"><ShieldAlert size={20} /></button>
                      <button onClick={() => handleDeleteUser(user._id)} className="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all"><Trash2 size={20} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Bar */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
        <div className="text-sm text-slate-500 flex items-center gap-2">
          {cursor ? (
            <button 
                onClick={handleResetPagination}
                className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
            >
                <RotateCcw size={14} /> Back to Start
            </button>
          ) : (
            <span>Showing initial page</span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            disabled={!cursor}
            onClick={handleResetPagination}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all border ${
              !cursor 
                ? "border-slate-800 text-slate-600 cursor-not-allowed" 
                : "border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600"
            }`}
          >
            Reset
          </button>

          <button
            disabled={!isCursorExits || isFetching}
            onClick={handleNextPage}
            className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-semibold transition-all ${
              !isCursorExits
                ? "bg-slate-800 text-slate-600 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/20 active:scale-95"
            }`}
          >
            {isFetching ? <Loader2 size={16} className="animate-spin" /> : "Next Page"}
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-6 flex items-center gap-2 text-slate-500 text-sm italic border-t border-slate-900 pt-4">
        <Info size={14} />
        <span>Changes to user permissions are logged in the audit trail.</span>
      </div>
    </div>
  );
};

export default UserManagement;